// ENGLISH QUEST — логины без почты (Supabase Edge Function "eq-admin")
// Владелец семьи создаёт логин и пароль для сына или учителя. Письма не отправляются.
import { createClient } from "npm:@supabase/supabase-js@2";

const DOMAIN = "eq.local"; // логин anna-son превращается во внутренний адрес anna-son@eq.local
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (b: unknown) => new Response(JSON.stringify(b), { headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const admin = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!, { auth: { persistSession: false } });
  const token = (req.headers.get("Authorization") || "").replace(/^Bearer\s+/i, "");
  const { data: who, error: we } = await admin.auth.getUser(token);
  if (we || !who?.user) return json({ error: "Нужно войти в аккаунт" });
  let b: any = {};
  try { b = await req.json(); } catch (_) { /* пусто */ }
  const fid = String(b.family_id || "");
  const { data: me } = await admin.from("eq_members").select("role").eq("family_id", fid).eq("user_id", who.user.id).maybeSingle();
  if (!me || me.role !== "owner") return json({ error: "Управлять логинами может только владелец семьи" });
  const pwOk = (p: string) => typeof p === "string" && p.length >= 6 && p.length <= 72;

  if (b.action === "create") {
    const login = String(b.login || "").trim().toLowerCase();
    if (!/^[a-z0-9][a-z0-9._-]{2,29}$/.test(login)) return json({ error: "Логин: 3–30 символов — латинские буквы, цифры, точка, дефис, подчёркивание" });
    if (!pwOk(b.password)) return json({ error: "Пароль — минимум 6 символов" });
    const role = b.role === "teacher" ? "teacher" : "member";
    const { data: cu, error: ce } = await admin.auth.admin.createUser({
      email: `${login}@${DOMAIN}`, password: b.password, email_confirm: true,
      user_metadata: { eq_login: login, eq_family: fid },
    });
    if (ce || !cu?.user) return json({ error: /already|exists|registered/i.test(ce?.message || "") ? "Такой логин уже занят — придумайте другой" : (ce?.message || "Не удалось создать логин") });
    const { error: ie } = await admin.from("eq_members").insert({ family_id: fid, user_id: cu.user.id, role, email: login });
    if (ie) { await admin.auth.admin.deleteUser(cu.user.id); return json({ error: ie.message }); }
    return json({ ok: true, login });
  }

  const uid = String(b.user_id || "");
  const { data: target } = await admin.from("eq_members").select("role").eq("family_id", fid).eq("user_id", uid).maybeSingle();
  if (!target || target.role === "owner") return json({ error: "Пользователь не найден в семье" });
  const { data: tu } = await admin.auth.admin.getUserById(uid);
  const managed = !!tu?.user?.email?.endsWith("@" + DOMAIN) && tu.user.user_metadata?.eq_family === fid;

  if (b.action === "password") {
    if (!managed) return json({ error: "Пароль можно менять только у логинов, созданных в этой семье" });
    if (!pwOk(b.password)) return json({ error: "Пароль — минимум 6 символов" });
    const { error } = await admin.auth.admin.updateUserById(uid, { password: b.password });
    return json(error ? { error: error.message } : { ok: true });
  }
  if (b.action === "delete") {
    await admin.from("eq_members").delete().eq("family_id", fid).eq("user_id", uid);
    if (managed) await admin.auth.admin.deleteUser(uid);
    return json({ ok: true });
  }
  return json({ error: "Неизвестное действие" });
});
