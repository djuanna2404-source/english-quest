// ENGLISH QUEST — AI Teacher (Supabase Edge Function "eq-ai")
// Ключ Anthropic хранится в секретах Supabase и никогда не попадает в браузер.
// Секреты: ANTHROPIC_API_KEY (обязательно), ANTHROPIC_MODEL (необязательно).
const cors = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};
const json = (b: unknown, status = 200) =>
  new Response(JSON.stringify(b), { status, headers: { ...cors, "Content-Type": "application/json" } });

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response("ok", { headers: cors });
  const key = Deno.env.get("ANTHROPIC_API_KEY");
  let body: any = {};
  try { body = await req.json(); } catch (_) { /* пустое тело */ }
  if (body.ping) return json({ ok: !!key });
  if (!key) return json({ error: "AI не настроен: нет ANTHROPIC_API_KEY" }, 500);

  let messages = typeof body.input === "string" ? [{ role: "user", content: body.input }] : body.input;
  if (!Array.isArray(messages) || !messages.length) return json({ error: "bad_input" }, 400);
  // приводим к чередованию user/assistant, начиная с user
  const clean: { role: string; content: string }[] = [];
  for (const m of messages.slice(-40)) {
    const role = m?.role === "assistant" ? "assistant" : "user";
    const content = String(m?.content ?? "").slice(0, 8000);
    if (!content) continue;
    if (clean.length && clean[clean.length - 1].role === role) clean[clean.length - 1].content += "\n\n" + content;
    else clean.push({ role, content });
  }
  while (clean.length && clean[0].role !== "user") clean.shift();
  if (!clean.length) return json({ error: "bad_input" }, 400);

  const r = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "x-api-key": key, "anthropic-version": "2023-06-01", "content-type": "application/json" },
    body: JSON.stringify({ model: Deno.env.get("ANTHROPIC_MODEL") || "claude-haiku-5-5", max_tokens: 1500, messages: clean }),
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) return json({ error: d?.error?.message || `api_error_${r.status}` }, r.status === 429 ? 429 : 502);
  const text = (d.content || []).filter((c: any) => c.type === "text").map((c: any) => c.text).join("");
  return json({ text });
});
