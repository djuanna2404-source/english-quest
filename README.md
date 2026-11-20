# ENGLISH QUEST — версия для своего сайта (Supabase)

Семейное приложение для изучения английского: профили, ежедневный план, 12 времён, словарь с мнемоникой и интервальным повторением, 17 игр, кабинет учителя, AI Teacher.

**Как устроено:** файлы сайта лежат на хостинге (Netlify / Vercel / любой статический), а Supabase хранит данные, отвечает за вход по почте и (по желанию) запускает AI-учителя.

## Файлы
| Файл | Что это |
|---|---|
| `index.html` | Страница приложения и стили (4 темы) |
| `app.js` | Логика приложения |
| `data.js` | Учебный контент: 31 тема грамматики, слова с мнемониками, тексты |
| `sb.js` | Вход, семьи, приглашения, связь с базой, AI |
| `config.js` | **Сюда вписать URL и anon key вашего проекта** |
| `supabase/functions/eq-ai/index.ts` | Функция AI-учителя (необязательно) |

## Шаг 1. База данных
Supabase → **SQL Editor** → New query → вставьте SQL ниже → **Run**. Скрипт можно запускать повторно.

```sql
-- =====================================================================
-- ENGLISH QUEST — схема базы данных для Supabase
-- Выполните целиком: Supabase → SQL Editor → New query → Run.
-- Скрипт можно запускать повторно — он ничего не сломает.
-- =====================================================================

-- 1. Семьи (одно пространство = одна семья)
create table if not exists public.eq_families (
  id         uuid primary key default gen_random_uuid(),
  name       text not null default 'Наша семья',
  owner      uuid not null references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

-- 2. Кто имеет доступ: owner — владелец, member — член семьи, teacher — учитель
create table if not exists public.eq_members (
  family_id  uuid not null references public.eq_families(id) on delete cascade,
  user_id    uuid not null references auth.users(id) on delete cascade,
  role       text not null check (role in ('owner','member','teacher')),
  email      text,
  created_at timestamptz not null default now(),
  primary key (family_id, user_id)
);
create index if not exists eq_members_user_idx on public.eq_members (user_id);

-- 3. Приглашения по email (учитель или член семьи)
create table if not exists public.eq_invites (
  id         uuid primary key default gen_random_uuid(),
  family_id  uuid not null references public.eq_families(id) on delete cascade,
  email      text not null,
  role       text not null check (role in ('member','teacher')),
  created_at timestamptz not null default now(),
  unique (family_id, email)
);

-- 4. Данные приложения: профили, словари, задания, ответы, проверки
--    path: family/state, family/state/profiles/<id>, family/state/words/<id>,
--          tasks/<id>, subs/<id>, reviews/<id>
create table if not exists public.eq_docs (
  family_id  uuid not null references public.eq_families(id) on delete cascade,
  path       text not null,
  coll       text not null,
  data       jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  updated_by uuid default auth.uid(),
  primary key (family_id, path)
);
create index if not exists eq_docs_coll_idx on public.eq_docs (family_id, coll);

create or replace function public.eq_touch() returns trigger
language plpgsql set search_path = public as $$
begin
  new.updated_at := now();
  new.updated_by := auth.uid();
  return new;
end $$;
drop trigger if exists eq_docs_touch on public.eq_docs;
create trigger eq_docs_touch before update on public.eq_docs
  for each row execute function public.eq_touch();

-- 5. Вспомогательные функции для правил доступа
create or replace function public.eq_role(fid uuid) returns text
language sql stable security definer set search_path = public as $$
  select m.role from public.eq_members m where m.family_id = fid and m.user_id = auth.uid()
$$;

create or replace function public.eq_can_write(fid uuid, p text) returns boolean
language sql stable security definer set search_path = public as $$
  select coalesce(case
    when p like 'family/%' or p like 'subs/%' then public.eq_role(fid) in ('owner','member')
    when p like 'tasks/%'                       then public.eq_role(fid) in ('owner','member','teacher')
    when p like 'reviews/%'                     then public.eq_role(fid) in ('owner','teacher')
    else false end, false)
$$;

-- 6. Создать семью (вызывается из приложения)
create or replace function public.eq_create_family(fname text) returns uuid
language plpgsql security definer set search_path = public as $$
declare new_id uuid;
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  insert into public.eq_families (name, owner)
    values (coalesce(nullif(trim(fname), ''), 'Наша семья'), auth.uid())
    returning id into new_id;
  insert into public.eq_members (family_id, user_id, role, email)
    values (new_id, auth.uid(), 'owner', lower(auth.jwt() ->> 'email'));
  return new_id;
end $$;

-- 7. При входе: принять приглашения на подтверждённый email и вернуть список семей
create or replace function public.eq_bootstrap()
returns table (fid uuid, frole text, fname text)
language plpgsql security definer set search_path = public as $$
declare
  em text := lower(coalesce(auth.jwt() ->> 'email', ''));
  confirmed boolean;
begin
  if auth.uid() is null then raise exception 'not authenticated'; end if;
  select (u.email_confirmed_at is not null) into confirmed from auth.users u where u.id = auth.uid();
  if coalesce(confirmed, false) and em <> '' then
    insert into public.eq_members (family_id, user_id, role, email)
      select i.family_id, auth.uid(), i.role, em
      from public.eq_invites i where lower(i.email) = em
      on conflict (family_id, user_id) do nothing;
    delete from public.eq_invites i where lower(i.email) = em;
  end if;
  return query
    select m.family_id, m.role, f.name
    from public.eq_members m join public.eq_families f on f.id = m.family_id
    where m.user_id = auth.uid()
    order by m.created_at;
end $$;

revoke all on function public.eq_create_family(text) from public, anon;
revoke all on function public.eq_bootstrap() from public, anon;
grant execute on function public.eq_create_family(text) to authenticated;
grant execute on function public.eq_bootstrap() to authenticated;
grant execute on function public.eq_role(uuid) to authenticated;
grant execute on function public.eq_can_write(uuid, text) to authenticated;

-- 8. Row Level Security — каждый видит только свою семью
alter table public.eq_families enable row level security;
alter table public.eq_members  enable row level security;
alter table public.eq_invites  enable row level security;
alter table public.eq_docs     enable row level security;

drop policy if exists eq_families_select on public.eq_families;
create policy eq_families_select on public.eq_families for select to authenticated
  using (public.eq_role(id) is not null);
drop policy if exists eq_families_update on public.eq_families;
create policy eq_families_update on public.eq_families for update to authenticated
  using (public.eq_role(id) = 'owner') with check (public.eq_role(id) = 'owner');

drop policy if exists eq_members_select on public.eq_members;
create policy eq_members_select on public.eq_members for select to authenticated
  using (public.eq_role(family_id) is not null);
drop policy if exists eq_members_delete on public.eq_members;
create policy eq_members_delete on public.eq_members for delete to authenticated
  using (public.eq_role(family_id) = 'owner' and role <> 'owner');

drop policy if exists eq_invites_owner on public.eq_invites;
create policy eq_invites_owner on public.eq_invites for all to authenticated
  using (public.eq_role(family_id) = 'owner') with check (public.eq_role(family_id) = 'owner');

drop policy if exists eq_docs_select on public.eq_docs;
create policy eq_docs_select on public.eq_docs for select to authenticated
  using (public.eq_role(family_id) is not null);
drop policy if exists eq_docs_insert on public.eq_docs;
create policy eq_docs_insert on public.eq_docs for insert to authenticated
  with check (public.eq_can_write(family_id, path));
drop policy if exists eq_docs_update on public.eq_docs;
create policy eq_docs_update on public.eq_docs for update to authenticated
  using (public.eq_can_write(family_id, path)) with check (public.eq_can_write(family_id, path));
drop policy if exists eq_docs_delete on public.eq_docs;
create policy eq_docs_delete on public.eq_docs for delete to authenticated
  using (public.eq_can_write(family_id, path));

grant select, update on public.eq_families to authenticated;
grant select, delete on public.eq_members to authenticated;
grant select, insert, update, delete on public.eq_invites to authenticated;
grant select, insert, update, delete on public.eq_docs to authenticated;

-- 9. Мгновенная синхронизация между устройствами (Realtime)
do $$
begin
  if exists (select 1 from pg_publication where pubname = 'supabase_realtime')
     and not exists (select 1 from pg_publication_tables
                     where pubname = 'supabase_realtime' and schemaname = 'public' and tablename = 'eq_docs') then
    execute 'alter publication supabase_realtime add table public.eq_docs';
  end if;
end $$;
```

## Шаг 2. Вход по почте
Supabase → **Authentication → Sign In / Providers → Email** — включено (по умолчанию так и есть).
Supabase → **Authentication → URL Configuration → Site URL** — впишите адрес сайта из шага 4 (чтобы ссылки из писем вели на ваш сайт).

## Шаг 3. config.js
Supabase → **Project Settings → API** (или кнопка Connect). Скопируйте **Project URL** и **anon / publishable key** в `config.js`.
Этот ключ публичный — данные защищены правилами доступа (RLS): каждый видит только свою семью.

## Шаг 4. Выложить сайт (GitHub Pages)
1. Репозиторий `english-quest` → **Add file → Upload files** → перетащите все файлы и папку `supabase` → **Commit changes**.
2. **Settings → Pages** → Source: **Deploy from a branch** → ветка `main`, папка `/ (root)` → **Save**.
3. Через 1–2 минуты сайт откроется по адресу `https://<ваш-логин>.github.io/english-quest/`.
4. Обновление: снова **Add file → Upload files**, перетащите изменённые файлы с теми же именами — GitHub заменит их, сайт обновится сам.

## Шаг 5 (по желанию). AI Teacher
1. Supabase → **Edge Functions → Deploy a new function → Via Editor**, имя **`eq-ai`**, вставьте код из `supabase/functions/eq-ai/index.ts`, Deploy. Оставьте включённой проверку JWT — так AI доступен только вошедшим пользователям.
2. Edge Functions → **Secrets**: добавьте `ANTHROPIC_API_KEY` (ключ с https://console.anthropic.com). Модель по умолчанию — `claude-haiku-5-5`; другую можно задать секретом `ANTHROPIC_MODEL`.
3. Запросы к AI оплачиваются по тарифам Anthropic API.

Без этого шага работает всё, кроме AI: игры, грамматика, словарь, задания учителя.

## Логины без почты (функция eq-admin)
Владелец семьи в **Настройки → Доступ → Выдать логин и пароль** создаёт логин (например `timur`) и пароль для сына или учителя. Почта не нужна, письма не отправляются. Вход — на том же сайте: в поле «Логин или email» вводится просто логин. Там же можно сменить пароль или убрать доступ.
Для этого в Supabase должна быть развёрнута функция `eq-admin` (код в `supabase/functions/eq-admin/index.ts`).

## Как пользоваться
1. Откройте сайт → **Регистрация** → подтвердите почту → войдите → **Создать семью** → создайте профили (ваш и сына).
2. **Учитель:** Настройки → Доступ → email учителя, роль «Учитель». Отправьте учителю ссылку на сайт — он регистрируется с этой почтой и сразу попадает в кабинет учителя: видит прогресс, выдаёт задания, проверяет и ставит оценки.
3. **Сын со своим аккаунтом (по желанию):** пригласите его email с ролью «Член семьи». Или он просто занимается под вашим аккаунтом.
4. Прогресс синхронизируется между устройствами автоматически.

## Права доступа
| Роль | Профили и словари | Задания | Проверка | Приглашения |
|---|---|---|---|---|
| Владелец | ✏️ | ✏️ | ✏️ | ✏️ |
| Член семьи | ✏️ | ✏️ (выполнять) | — | — |
| Учитель | 👁 только просмотр | ✏️ | ✏️ | — |
