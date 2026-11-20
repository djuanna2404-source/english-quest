/* ENGLISH QUEST — подключение к Supabase: вход, семья, учитель, база, AI */
(function () {
  'use strict';
  window.EQ_STANDALONE = true;
  const $ = s => document.querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const app = () => $('#app');
  let cfg = window.EQ_CONFIG || {};
  try { const saved = JSON.parse(localStorage.getItem('eq.cfg') || 'null'); if (saved && (!cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY)) cfg = saved; } catch (e) { }
  let sb = null, USER = null, FID = null, ROLE = null, FAMS = [], ACC = { members: [], invites: [] };

  function screen(inner) { document.body.dataset.theme = 'quest'; app().innerHTML = `<div class="onboard"><div class="ob-hero"><div class="logo xl">EQ</div><h1>ENGLISH QUEST</h1><p>Learn together. Play every day. Speak with confidence.</p></div><div class="card ob-form" style="max-width:460px;margin:0 auto">${inner}</div></div>`; }
  function msg(t, bad) { const el = $('#sbMsg'); if (el) { el.textContent = t; el.style.color = bad ? 'var(--bad)' : 'var(--ok)'; } }

  /* ---------- 1. Настройка подключения ---------- */
  function setupScreen() {
    screen(`<h2>Подключение к Supabase</h2><p class="muted small">Впишите данные проекта (Supabase → Project Settings → API). Их можно один раз указать в файле config.js, тогда этот экран не появится.</p>
    <form id="cfgForm"><label>Project URL<input name="u" placeholder="https://xxxx.supabase.co" required></label><label>anon / publishable key<input name="k" required></label><button class="btn wide">Подключить</button></form>`);
    $('#cfgForm').onsubmit = e => { e.preventDefault(); const f = e.target; localStorage.setItem('eq.cfg', JSON.stringify({ SUPABASE_URL: f.u.value.trim(), SUPABASE_ANON_KEY: f.k.value.trim() })); location.reload(); };
  }

  /* ---------- 2. Вход ---------- */
  function authScreen(mode = 'in', note = '') {
    const t = { in: 'Вход', up: 'Регистрация', reset: 'Восстановить пароль', newpass: 'Новый пароль' }[mode];
    screen(`<div class="tabs">${mode === 'newpass' ? '' : `<button class="${mode === 'in' ? 'on' : ''}" data-m="in">Вход</button><button class="${mode === 'up' ? 'on' : ''}" data-m="up">Регистрация</button>`}</div>
    <h2>${t}</h2>${note ? `<p class="muted">${esc(note)}</p>` : ''}
    <form id="authForm">${mode !== 'newpass' ? (mode === 'in' ? '<label>Логин или email<input name="e" autocomplete="username" autocapitalize="off" spellcheck="false" required></label>' : '<label>Email<input name="e" type="email" autocomplete="email" required></label>') : ''}
    ${mode !== 'reset' ? `<label>Пароль<input name="p" type="password" minlength="6" autocomplete="${mode === 'in' ? 'current-password' : 'new-password'}" required></label>` : ''}
    <button class="btn wide">${mode === 'in' ? 'Войти' : mode === 'up' ? 'Создать аккаунт' : mode === 'reset' ? 'Прислать ссылку' : 'Сохранить пароль'}</button></form>
    <p id="sbMsg" class="small"></p>${mode === 'in' ? '<button class="btn small ghost" data-m="reset">Забыли пароль?</button>' : ''}
    <p class="muted small">${mode === 'in' ? 'Сыну и учителю: войдите с логином и паролем, которые выдала семья.' : 'Регистрация нужна только владельцу семьи. Сыну и учителю логин и пароль выдаются в приложении.'}</p>`);
    app().querySelectorAll('[data-m]').forEach(b => b.onclick = () => authScreen(b.dataset.m));
    $('#authForm').onsubmit = async e => {
      e.preventDefault(); const f = e.target; msg('Подождите…');
      let r;
      if (mode === 'in') r = await sb.auth.signInWithPassword({ email: toEmail(f.e.value), password: f.p.value });
      else if (mode === 'up') { r = await sb.auth.signUp({ email: f.e.value.trim(), password: f.p.value, options: { emailRedirectTo: location.href.split('#')[0] } }); if (!r.error && r.data.user && Array.isArray(r.data.user.identities) && !r.data.user.identities.length) return msg('Этот email уже зарегистрирован. Нажмите «Вход» и введите свой пароль (или «Забыли пароль?»).', true); if (!r.error && !r.data.session) return msg('Готово! Мы отправили письмо — подтвердите почту и войдите. Проверьте и папку «Спам».'); }
      else if (mode === 'reset') { r = await sb.auth.resetPasswordForEmail(f.e.value.trim(), { redirectTo: location.href.split('#')[0] }); if (!r.error) return msg('Ссылка для смены пароля отправлена на почту.'); }
      else { r = await sb.auth.updateUser({ password: f.p.value }); if (!r.error) { location.hash = ''; return boot(); } }
      if (r.error) return msg(ruErr(r.error.message), true);
      boot();
    };
  }
  const LOGIN_DOMAIN = 'eq.local';
  const toEmail = v => { v = String(v).trim().toLowerCase(); return v.includes('@') ? v : v + '@' + LOGIN_DOMAIN; };
  const shown = e => String(e || '').replace('@' + LOGIN_DOMAIN, '');
  function ruErr(m) { if (/Invalid login/i.test(m)) return 'Неверный логин или пароль.'; if (/already registered/i.test(m)) return 'Этот email уже зарегистрирован — войдите.'; if (/Email not confirmed/i.test(m)) return 'Подтвердите email по ссылке из письма.'; if (/Password should/i.test(m)) return 'Пароль должен быть не короче 6 символов.'; return m; }

  /* ---------- 3. Семья ---------- */
  async function boot() {
    const { data: { session } } = await sb.auth.getSession();
    if (!session) return authScreen();
    USER = session.user;
    screen('<p class="center">Загружаем…</p>');
    const { data, error } = await sb.rpc('eq_bootstrap');
    if (error) return screen(`<h2>База не настроена</h2><p>Похоже, в Supabase не выполнен SQL из файла <b>supabase/schema.sql</b>.</p><p class="muted small">${esc(error.message)}</p><button class="btn ghost" id="lo">Выйти</button>`), ($('#lo').onclick = logout);
    FAMS = data || [];
    if (!FAMS.length) return newFamily();
    const last = localStorage.getItem('eq.fam.' + USER.id);
    const f = FAMS.find(x => x.fid === last) || (FAMS.length === 1 ? FAMS[0] : null);
    if (f) return start(f); choose();
  }
  function choose() {
    screen(`<h2>Выберите семью</h2>${FAMS.map(f => `<button class="btn ghost wide" data-f="${f.fid}">${esc(f.fname)} · ${f.frole === 'teacher' ? 'учитель' : f.frole === 'owner' ? 'владелец' : 'участник'}</button>`).join('')}<button class="btn small ghost mt" id="nf">+ Создать свою семью</button>`);
    app().querySelectorAll('[data-f]').forEach(b => b.onclick = () => start(FAMS.find(x => x.fid === b.dataset.f)));
    $('#nf').onclick = newFamily;
  }
  function newFamily() {
    screen(`<h2>Добро пожаловать!</h2><p>Создайте пространство для вашей семьи — там будут профили, словари и прогресс.</p>
    <form id="famForm"><label>Название<input name="n" value="Наша семья" required></label><button class="btn wide">Создать семью</button></form><p id="sbMsg" class="small"></p>
    <div class="notice soft mt">👩‍🏫 Вы учитель? Семья должна пригласить ваш email (${esc(USER.email)}) в разделе «Настройки → Доступ». После этого обновите страницу. <button class="btn small" id="rf">Обновить</button></div>
    <button class="btn small ghost" id="lo">Выйти</button>`);
    $('#famForm').onsubmit = async e => { e.preventDefault(); const { error } = await sb.rpc('eq_create_family', { fname: e.target.n.value }); if (error) return msg(error.message, true); boot(); };
    $('#rf').onclick = boot; $('#lo').onclick = logout;
  }
  async function logout() { await sb.auth.signOut(); location.reload(); }

  /* ---------- 4. Хранилище документов поверх таблицы eq_docs ---------- */
  const collOf = p => p.split('/').slice(0, -1).join('/');
  const snapDoc = (path, d) => ({ id: path.split('/').pop(), exists: d !== undefined && d !== null, data: () => d == null ? undefined : JSON.parse(JSON.stringify(d)), metadata: { fromCache: false, hasPendingWrites: false } });
  const err = e => ({ code: (e && (e.code === '42501' || /row-level security/i.test(e.message || ''))) ? 'invalid_argument' : 'unavailable', message: e && e.message });
  const listeners = new Set();
  function bump(coll) { listeners.forEach(l => { if (!coll || l.coll === coll) l.refresh(); }); }
  async function fetchColl(coll, filters) {
    const { data, error } = await sb.from('eq_docs').select('path,data').eq('family_id', FID).eq('coll', coll).order('path');
    if (error) throw err(error);
    return (data || []).map(r => snapDoc(r.path, r.data)).filter(d => filters.every(([f, , v]) => (d.data() || {})[f] === v));
  }
  function qsnap(docs, prev) {
    return { docs, size: docs.length, empty: !docs.length, metadata: { fromCache: false, hasPendingWrites: false },
      docChanges: () => { const out = []; docs.forEach((d, i) => { const was = prev && prev[d.id]; const now = JSON.stringify(d.data()); if (!was) out.push({ type: 'added', doc: d, oldIndex: -1, newIndex: i }); else if (was !== now) out.push({ type: 'modified', doc: d, oldIndex: i, newIndex: i }); }); return out; } };
  }
  function docRef(path) {
    return {
      id: path.split('/').pop(), path,
      async get() { const { data, error } = await sb.from('eq_docs').select('data').eq('family_id', FID).eq('path', path).maybeSingle(); if (error) throw err(error); return snapDoc(path, data ? data.data : undefined); },
      async set(d) { const { error } = await sb.from('eq_docs').upsert({ family_id: FID, path, coll: collOf(path), data: d }); if (error) throw err(error); bump(collOf(path)); },
      async update(d) { const cur = await this.get(); if (!cur.exists) throw { code: 'invalid_argument' }; return this.set(Object.assign(cur.data(), d)); },
      async delete() { const { error } = await sb.from('eq_docs').delete().eq('family_id', FID).eq('path', path); if (error) throw err(error); bump(collOf(path)); },
      collection: c => colRef(path + '/' + c),
      onSnapshot(next, onErr) { let last; const l = { coll: collOf(path), refresh: async () => { try { const s = await docRef(path).get(); const v = JSON.stringify(s.data()); if (v !== last) { last = v; next(s); } } catch (e) { } } }; listeners.add(l); l.refresh(); return () => listeners.delete(l); }
    };
  }
  function colRef(path, filters = []) {
    return {
      path,
      doc: id => docRef(path + '/' + (id || (Math.random().toString(36).slice(2) + Date.now().toString(36)))),
      add: async d => { const r = docRef(path + '/' + Math.random().toString(36).slice(2)); await r.set(d); return r; },
      where: (f, op, v) => colRef(path, filters.concat([[f, op, v]])),
      orderBy() { return this; }, limit() { return this; },
      async get() { return qsnap(await fetchColl(path, filters)); },
      onSnapshot(next, onErr) {
        let prev = null, last;
        const l = { coll: path, refresh: async () => { try { const docs = await fetchColl(path, filters); const v = JSON.stringify(docs.map(d => [d.id, d.data()])); if (v !== last) { last = v; next(qsnap(docs, prev)); prev = {}; docs.forEach(d => prev[d.id] = JSON.stringify(d.data())); } } catch (e) { } } };
        listeners.add(l); l.refresh(); return () => listeners.delete(l);
      }
    };
  }
  function realtime() {
    try { sb.channel('eq-' + FID).on('postgres_changes', { event: '*', schema: 'public', table: 'eq_docs', filter: 'family_id=eq.' + FID }, p => { const c = (p.new && p.new.coll) || (p.old && p.old.coll); bump(c || null); }).subscribe(); } catch (e) { }
    setInterval(() => { if (!document.hidden) bump(null); }, 30000);
    document.addEventListener('visibilitychange', () => { if (!document.hidden) bump(null); });
  }

  /* ---------- 5. AI через Edge Function eq-ai ---------- */
  let aiReady = null;
  async function aiCheck() {
    if (aiReady !== null) return aiReady;
    try { const r = await Promise.race([sb.functions.invoke('eq-ai', { body: { ping: true } }), new Promise(res => setTimeout(() => res({ error: 'timeout' }), 8000))]); aiReady = !!(r && !r.error && r.data && r.data.ok); } catch (e) { aiReady = false; }
    return aiReady;
  }
  async function sample(input) {
    const { data, error } = await sb.functions.invoke('eq-ai', { body: { input } });
    if (error || !data || data.error) { const m = (data && data.error) || (error && error.message) || ''; throw { code: /rate|429|overloaded/i.test(m) ? 'rate_limited' : 'ai_error', message: m }; }
    return { text: data.text || '', truncated: false };
  }

  /* ---------- 6. Доступ (настройки) ---------- */
  async function adminCall(body) {
    try { const { data, error } = await sb.functions.invoke('eq-admin', { body: Object.assign({ family_id: FID }, body) }); if (error) return { error: 'Функция eq-admin недоступна. Проверьте, что она развёрнута в Supabase.' }; return data || { error: 'Нет ответа' }; }
    catch (e) { return { error: 'Нет связи с сервером' }; }
  }
  async function loadAccess() {
    if (ROLE !== 'owner') return;
    const [m, i] = await Promise.all([sb.from('eq_members').select('user_id,role,email').eq('family_id', FID), sb.from('eq_invites').select('id,email,role').eq('family_id', FID)]);
    ACC.members = m.data || []; ACC.invites = i.data || [];
    if (window.EQ_APP) window.EQ_APP.render();
  }
  const roleRu = r => ({ owner: 'владелец', member: 'член семьи', teacher: 'учитель' })[r] || r;
  window.EQ_SETTINGS_HTML = () => `<div class="card"><h3>🔐 Доступ и аккаунт</h3><p class="small">Вы вошли как <b>${esc(shown(USER.email))}</b> · ${roleRu(ROLE)}</p>
    ${ROLE === 'owner' ? `<h4>Кто имеет доступ</h4>${ACC.members.map(m => `<div class="fb-row wrap"><span>${m.email && !m.email.includes('@') ? '🔑 ' : ''}${esc(m.email || m.user_id.slice(0, 8))}</span><span class="cat">${roleRu(m.role)}</span>${m.role !== 'owner' ? `${m.email && !m.email.includes('@') ? (ACC.pwFor === m.user_id ? `<form data-sbform="pw" data-arg="${m.user_id}" class="row gap"><input name="p" type="text" minlength="6" placeholder="Новый пароль" required style="max-width:180px"><button class="btn small">Сохранить</button></form>` : `<button class="btn small ghost" data-sb="pwOpen" data-arg="${m.user_id}">Сменить пароль</button>`) : ''}<button class="btn small ghost danger" data-sb="rmMember" data-arg="${m.user_id}">Убрать</button>` : ''}</div>`).join('')}
    <h4 class="mt">🔑 Выдать логин и пароль (без почты)</h4>
    <form data-sbform="login" class="row gap wrap"><label class="grow">Логин<input name="l" required pattern="[A-Za-z0-9][A-Za-z0-9._\-]{2,29}" placeholder="timur" autocapitalize="off" spellcheck="false"></label><label class="grow">Пароль<input name="p" type="text" minlength="6" required placeholder="минимум 6 символов"></label><label>Роль<select name="r"><option value="member">👦 Член семьи (сын)</option><option value="teacher">👩‍🏫 Учитель</option></select></label><button class="btn">Создать</button></form>
    ${ACC.created ? `<div class="notice soft mt">✅ Логин создан. Передайте: адрес сайта <b>${esc(location.origin + location.pathname)}</b>, логин <b>${esc(ACC.created.l)}</b>, пароль <b>${esc(ACC.created.p)}</b></div>` : ''}
    <h4 class="mt">✉️ Или пригласить по email</h4>
    ${ACC.invites.map(i => `<div class="fb-row"><span>${esc(i.email)}</span><span class="cat">приглашён · ${roleRu(i.role)}</span><button class="btn small ghost danger" data-sb="rmInvite" data-arg="${i.id}">Отменить</button></div>`).join('')}
    <form data-sbform="invite" class="row gap wrap mt"><label class="grow">Email<input name="e" type="email" required placeholder="teacher@mail.com"></label><label>Роль<select name="r"><option value="teacher">👩‍🏫 Учитель</option><option value="member">👦 Член семьи (напр. сын со своим аккаунтом)</option></select></label><button class="btn">Пригласить</button></form>
    <p class="muted small">Отправьте приглашённому ссылку на сайт. Он зарегистрируется с этим email и сразу получит доступ: учитель — к кабинету учителя, член семьи — к профилям семьи.</p>` : ''}
    <div class="row gap wrap mt">${FAMS.length > 1 ? '<button class="btn ghost" data-sb="switchFam">Сменить семью</button>' : ''}<button class="btn ghost" data-sb="logout">Выйти из аккаунта</button></div></div>`;
  window.EQ_TEACHER_EXTRA = () => `<span class="muted small">${esc(shown(USER.email))}</span> ${FAMS.length > 1 ? '<button class="btn small ghost" data-sb="switchFam">Семья</button>' : ''}<button class="btn small ghost" data-sb="logout">Выйти</button>`;
  document.addEventListener('click', async e => {
    const el = e.target.closest('[data-sb]'); if (!el) return; e.preventDefault();
    const a = el.dataset.sb, arg = el.dataset.arg;
    if (a === 'logout') return logout();
    if (a === 'switchFam') { localStorage.removeItem('eq.fam.' + USER.id); return location.reload(); }
    if (a === 'rmInvite') { await sb.from('eq_invites').delete().eq('id', arg); return loadAccess(); }
    if (a === 'pwOpen') { ACC.pwFor = arg; return window.EQ_APP && window.EQ_APP.render(); }
    if (a === 'rmMember') { if (el.dataset.c !== '1') { el.dataset.c = '1'; el.textContent = 'Точно убрать?'; return; } const r = await adminCall({ action: 'delete', user_id: arg }); if (r.error) await sb.from('eq_members').delete().eq('family_id', FID).eq('user_id', arg); return loadAccess(); }
  }, true);
  document.addEventListener('submit', async e => {
    const f = e.target.closest('[data-sbform]'); if (!f) return; e.preventDefault(); e.stopPropagation();
    const toast = t => window.EQ_APP && window.EQ_APP.toast(t);
    if (f.dataset.sbform === 'login') { const l = f.l.value.trim().toLowerCase(), p = f.p.value; f.querySelector('button').disabled = true; const r = await adminCall({ action: 'create', login: l, password: p, role: f.r.value }); if (r.error) { toast(esc(r.error)); f.querySelector('button').disabled = false; return; } ACC.created = { l, p }; toast('✅ Логин создан'); return loadAccess(); }
    if (f.dataset.sbform === 'pw') { const r = await adminCall({ action: 'password', user_id: f.dataset.arg, password: f.p.value }); toast(r.error ? esc(r.error) : '🔑 Пароль изменён'); ACC.pwFor = null; ACC.created = null; return loadAccess(); }
    const { error } = await sb.from('eq_invites').insert({ family_id: FID, email: f.e.value.trim().toLowerCase(), role: f.r.value });
    if (window.EQ_APP) window.EQ_APP.toast(error ? (/duplicate/i.test(error.message) ? 'Этот email уже приглашён' : 'Не удалось пригласить: ' + esc(error.message)) : '✉️ Приглашение создано. Отправьте человеку ссылку на сайт.');
    loadAccess();
  }, true);

  /* ---------- 7. Запуск приложения ---------- */
  function start(f) {
    FID = f.fid; ROLE = f.frole; localStorage.setItem('eq.fam.' + USER.id, FID);
    window.EQ_LS_KEY = 'eq.data.' + FID;
    const db = { doc: docRef, collection: p => colRef(p) };
    const user = { isOwner: async () => ROLE === 'owner' || ROLE === 'member', canEdit: async () => ROLE !== 'teacher', can: async () => !!ROLE, id: async () => USER.id, me: async () => ({ id: USER.id, name: USER.email }) };
    window.claude = { use: async n => n === 'db' ? db : n === 'user' ? user : n === 'sample' ? ((await aiCheck()) ? sample : null) : null };
    realtime();
    const s = document.createElement('script'); s.src = 'app.js'; s.onload = () => loadAccess(); document.body.appendChild(s);
  }

  /* ---------- init ---------- */
  if (!window.supabase || !window.supabase.createClient) { screen('<h2>Нет связи</h2><p>Не удалось загрузить библиотеку Supabase. Проверьте интернет и обновите страницу.</p>'); return; }
  if (!cfg.SUPABASE_URL || !cfg.SUPABASE_ANON_KEY) return setupScreen();
  sb = window.supabase.createClient(cfg.SUPABASE_URL, cfg.SUPABASE_ANON_KEY, { auth: { persistSession: true, autoRefreshToken: true, detectSessionInUrl: true } });
  let recovering = false;
  sb.auth.onAuthStateChange(ev => { if (ev === 'PASSWORD_RECOVERY') { recovering = true; authScreen('newpass', 'Придумайте новый пароль'); } });
  setTimeout(() => { if (!recovering) boot(); }, 50);
})();
