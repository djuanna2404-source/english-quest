/* ENGLISH QUEST — app core */
(function () {
'use strict';
const D = window.EQ_DATA;
const TOP = Object.fromEntries(D.TOPICS.map(t => [t.id, t]));
const TENSES = D.TOPICS.filter(t => t.tense);
const LEVELS = ["A1", "A2", "B1", "B2", "C1", "C2"];
const INTERVALS = [1, 2, 3, 7, 16, 30, 60];
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const rnd = n => Math.floor(Math.random() * n);
const shuffle = a => { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = rnd(i + 1); [a[i], a[j]] = [a[j], a[i]]; } return a; };
const pick = a => a[rnd(a.length)];
const uid = () => Math.random().toString(36).slice(2, 9) + Date.now().toString(36).slice(-5);
const dstr = d => d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0');
const today = () => dstr(new Date());
const addDays = (s, n) => { const [y, m, d] = s.split('-').map(Number); return dstr(new Date(y, m - 1, d + n)); };
const daysBetween = (a, b) => { const pa = a.split('-').map(Number), pb = b.split('-').map(Number); return Math.round((new Date(pb[0], pb[1] - 1, pb[2]) - new Date(pa[0], pa[1] - 1, pa[2])) / 86400000); };
const weekStart = (d = today()) => { const [y, m, dd] = d.split('-').map(Number); const wd = (new Date(y, m - 1, dd).getDay() + 6) % 7; return addDays(d, -wd); };
const hash = s => { let h = 0; for (let i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) | 0; return h + ':' + s.length; };
const norm = s => String(s || '').toLowerCase().replace(/[’`]/g, "'").replace(/[.,!?;:"«»()—–]/g, ' ').replace(/\s+/g, ' ').trim();
const CONTR = [[/\bwon't\b/g, 'will not'], [/\bcan't\b/g, 'cannot'], [/\bcan not\b/g, 'cannot'], [/\bshan't\b/g, 'shall not'], [/\b(\w+)n't\b/g, '$1 not'], [/\bi'm\b/g, 'i am'], [/\b(\w+)'re\b/g, '$1 are'], [/\b(\w+)'ve\b/g, '$1 have'], [/\b(\w+)'ll\b/g, '$1 will']];
const canon = s => { let v = norm(s); CONTR.forEach(([r, t]) => { v = v.replace(r, t); }); return v; };
const normWord = s => norm(s).replace(/^(to|a|an|the) /, '');
const fmtDate = s => { if (!s) return ''; const [y, m, d] = s.split('-'); return d + '.' + m + '.' + y; };
const sentence = s => { s = String(s).trim(); if (/[.?!]$/.test(s)) return s; return s + (/^(do|does|did|have|has|had|is|are|am|was|were|can|could|will|would|should|what|where|when|why|how|who|which)\b/i.test(s) ? '?' : '.'); };
const plural = (n, f) => { const a = Math.abs(n) % 100, b = a % 10; return n + ' ' + (a > 10 && a < 20 ? f[2] : b === 1 ? f[0] : b >= 2 && b <= 4 ? f[1] : f[2]); };

/* ---------- Темы оформления ---------- */
const THEMES = {
  quest: { name: 'Quest', desc: 'Светлая, спокойная', ranks: ['Explorer', 'Traveller', 'Pathfinder', 'Adventurer', 'Navigator', 'Hero', 'Legend'], hello: 'Your English adventure continues', win: 'Миссия выполнена!', lose: 'Ещё одна попытка — и получится!', xp: 'XP' },
  kids: { name: 'Sunny Kids', desc: 'Яркая для детей', ranks: ['Юный исследователь', 'Знаток слов', 'Капитан English', 'Супергерой', 'Чемпион', 'Легенда'], hello: 'Готов к приключению?', win: 'Ура! Ты молодец! 🎉', lose: 'Не сдавайся, у тебя получится! 💪', xp: 'XP' },
  hc: { name: 'Human & Capital', desc: 'Горчичный и чёрный — стиль H&C', ranks: ['Intern', 'Junior', 'Middle', 'Senior', 'Team Lead', 'Head', 'C-level'], hello: 'Invest in your human capital — every day', win: 'Performance review: отлично!', lose: 'Точка роста найдена — добавим в ИПР', xp: 'XP' },
  blade: { name: 'Путь клинка', desc: 'Светлая: васи, багрянец, глициния', chars: [['🦉', 'Сэнсэй Хоро', 'Мудрая сова, хранитель додзё', ['Терпение — тоже клинок. Повтори слово трижды.', 'Ошибка — лучший учитель. Запомни правило и иди дальше.', 'Каждый день понемногу — так закаляется сталь.']], ['🐯', 'Тора', 'Тигр-страж, мастер скорости', ['Быстрее! Демоны ошибок не ждут!', 'Вот это удар! Так держать!', 'Вдох — и снова в бой!']], ['🐱', 'Мико', 'Кошка-лучница, знаток слов', ['Мур! Это слово я тоже помню по ассоциации.', 'Придумай свою картинку — так слово не убежит.', 'Ещё чуть-чуть, и ты мастер словаря!']], ['🐉', 'Рю', 'Дракон-хранитель грамматики', ['Времена — как ступени горы. Шаг за шагом.', 'Present Perfect не страшен тому, кто знает have + V3.', 'Повторение каждый день — сила дракона.']]], ranks: ['Ученик додзё', 'Новичок клинка', 'Мечник', 'Страж ночи', 'Мастер клинка', 'Сэнсэй', 'Легенда'], hello: 'Каждый день — новая тренировка клинка', win: 'Демоны ошибок повержены! ⚔️', lose: 'Демон устоял. Заточи клинок и вернись!', xp: 'XP' }
};
const AVATARS = ['🦊', '🦉', '🐯', '🦁', '🐼', '🐨', '🦄', '🐲', '🌸', '🌟', '👩‍💼', '🧑‍🚀', '🥷', '⚔️', '🐱', '🚀', '⚽', '🎮'];

/* ---------- Состояние ---------- */
const LS = window.EQ_LS_KEY || 'englishQuest.v2';
let S = null;
const UI = { view: 'home', arg: null, game: null, modal: null, chat: null, vocab: { q: '', cat: '', status: '' }, teacher: { tab: 'overview', pid: null }, mode: 'family' };
const blankState = () => ({ v: 2, updatedAt: 0, profiles: [], activeId: null, family: { goal: 2000, reward: 'Семейный вечер кино с пиццей 🍕', cats: [] } });
function mkWord(o) {
  return Object.assign({ id: uid(), en: '', ru: '', ipa: '', pos: '', meaning: '', mnemo: '', myMnemo: '', examples: [], syn: [], ant: [], coll: [], cat: 'General Vocabulary', type: 'word', emoji: '', added: today(), stage: 0, due: null, reps: 0, lapses: 0, ok: 0, bad: 0, own: false }, o);
}
const seedWord = a => mkWord({ en: a[0], ru: a[1], cat: a[2], ipa: a[3], pos: a[4], mnemo: a[5], examples: a[6] ? [{ en: a[6], ru: a[7] }] : [], emoji: a[8] || '' });
function newProfile(kind, o = {}) {
  const child = kind === 'child';
  return Object.assign({
    id: uid(), kind, name: child ? 'Сын' : 'Я', avatar: child ? '🦁' : '🦊', age: child ? 9 : 30, level: 'A1', minutes: child ? 20 : 45, newPerDay: child ? 5 : 8,
    theme: child ? 'kids' : 'quest', voice: 'claude', rate: 0.9, xp: 0, xpLog: {}, timeLog: {}, streak: { count: 0, last: null, best: 0 },
    topics: {}, plans: {}, ach: {}, intro: {}, stats: { listen: 0, speak: 0, diary: 0, duelWins: 0, reviews: 0, mnemos: 0, ok: 0, bad: 0, rewarded: {} },
    diary: [], tests: [], words: (child ? D.KID_WORDS : D.ADULT_WORDS).map(seedWord), seedV: D.SEED_VERSION || 1, created: today(), updatedAt: Date.now()
  }, o);
}
function migrateSeeds(p) {
  const ver = D.SEED_VERSION || 1; if ((p.seedV || 1) >= ver) return false;
  const have = new Set(p.words.map(w => norm(w.en)));
  (p.kind === 'child' ? D.KID_WORDS : D.ADULT_WORDS).forEach(a => { if (!have.has(norm(a[0]))) p.words.push(seedWord(a)); });
  p.seedV = ver; return true;
}
function isMine(p) { if (!Cloud.uid) return true; if (Cloud.role === 'member') return p.uid === Cloud.uid; return p.uid === Cloud.uid || (!p.uid && p.kind !== 'child'); }
function canSave(p) { return !Cloud.uid || isMine(p) || (Cloud.role === 'owner' && !p.uid); }
const myProfiles = () => S ? S.profiles.filter(isMine) : [];
const otherProfiles = () => S ? S.profiles.filter(p => !isMine(p)) : [];
const P = () => { if (!S) return null; const m = myProfiles(); return m.find(p => p.id === S.activeId) || m[0] || null; };
function claimProfiles() {
  if (!S || !Cloud.uid) return;
  const changed = [];
  if (Cloud.role === 'owner') S.profiles.forEach(p => { if (!p.uid && p.kind !== 'child') { p.uid = Cloud.uid; changed.push(p); } });
  if (Cloud.role === 'member' && !S.profiles.some(p => p.uid === Cloud.uid)) {
    let c = S.profiles.find(p => !p.uid && p.kind === 'child');
    if (!c) { c = newProfile('child', { name: 'Ученик' }); S.profiles.push(c); }
    c.uid = Cloud.uid; changed.push(c);
  }
  const mine = myProfiles(); if (mine.length && !mine.some(p => p.id === S.activeId)) S.activeId = mine[0].id;
  changed.forEach(p => save(p));
}
const profById = id => S.profiles.find(p => p.id === id);
const isKid = (p = P()) => p && p.kind === 'child';
const lvlRank = l => Math.max(0, LEVELS.indexOf(l));

function loadLocal() { try { const s = JSON.parse(localStorage.getItem(LS)); return s && s.profiles ? s : null; } catch (e) { return null; } }
let saveTimer = null;
function save(p) {
  if (!S) return;
  const prof = p === undefined ? P() : p;
  if (prof) prof.updatedAt = Date.now();
  S.updatedAt = Date.now();
  try { localStorage.setItem(LS, JSON.stringify(S)); } catch (e) { }
  clearTimeout(saveTimer); saveTimer = setTimeout(() => Cloud.save(), 1200);
}

/* ---------- Облако (db) ---------- */
const Cloud = {
  db: null, user: null, on: false, hashes: {}, chunks: {}, busy: false, again: false, owner: true, status: 'local', subs: [], tasks: [], submissions: {}, reviews: {}, writable: null,
  root() { return this.db.doc('family/state'); },
  async init() {
    if (!(window.claude && typeof window.claude.use === 'function')) { setSync('local'); return; }
    let db = null, user = null;
    try { [db, user] = await Promise.all([window.claude.use('db'), window.claude.use('user')]); } catch (e) { }
    this.db = db; this.user = user;
    if (user) { try { this.owner = !!(await user.isOwner()); } catch (e) { this.owner = true; } }
    if (user && window.EQ_STANDALONE) { try { this.uid = await user.id(); this.role = user.role ? await user.role() : (this.owner ? 'owner' : 'teacher'); } catch (e) { } }
    if (!db) { setSync('local'); return; }
    if (!this.owner) { UI.mode = 'teacher'; Teacher.start(); return; }
    setSync('loading');
    const t = setTimeout(() => setSync('slow'), 10000);
    try { await this.load(); clearTimeout(t); this.on = true; claimProfiles(); setSync('cloud'); this.subscribe(); this.subscribeTasks(); }
    catch (e) { clearTimeout(t); console.warn('cloud', e); setSync('local'); }
  },
  profDoc(p) { const o = Object.assign({}, p); delete o.words; o.summary = wordSummary(p); return JSON.parse(JSON.stringify(o)); },
  meta() { return { v: 2, order: S.profiles.map(p => p.id), activeId: S.activeId, family: S.family, updatedAt: S.updatedAt }; },
  async load() {
    if (!S) S = blankState();
    const root = this.root();
    const rs = await root.get();
    if (!rs.exists) { await this.saveNow(); return; }
    const meta = rs.data() || {};
    const ps = await root.collection('profiles').get();
    const ws = await root.collection('words').get();
    const words = {};
    ws.docs.forEach(d => { const x = d.data(); if (!x) return; (words[x.pid] = words[x.pid] || []).push(x); this.hashes['w/' + d.id] = hash(JSON.stringify(x)); this.chunks[x.pid] = Math.max(this.chunks[x.pid] || 0, x.i + 1); });
    const remote = {};
    ps.docs.forEach(d => { const x = d.data(); if (!x) return; const p = JSON.parse(JSON.stringify(x)); delete p.summary; p.words = (words[p.id] || []).sort((a, b) => a.i - b.i).flatMap(c => c.list || []); remote[p.id] = p; this.hashes['p/' + d.id] = hash(JSON.stringify(x)); });
    if (!S || !S.profiles.length) { S = blankState(); }
    const order = (meta.order || []).concat(S.profiles.map(p => p.id)).filter((v, i, a) => a.indexOf(v) === i);
    const merged = [];
    for (const id of order) {
      const l = S.profiles.find(p => p.id === id), r = remote[id];
      if (r && (!l || (r.updatedAt || 0) >= (l.updatedAt || 0))) merged.push(r); else if (l) merged.push(l);
    }
    S.profiles = merged.filter(p => !(meta.deleted || []).includes(p.id));
    if ((meta.updatedAt || 0) > (S.updatedAt || 0)) { S.family = meta.family || S.family; }
    if (!S.activeId || !profById(S.activeId)) S.activeId = meta.activeId || (S.profiles[0] && S.profiles[0].id);
    try { localStorage.setItem(LS, JSON.stringify(S)); } catch (e) { }
    render();
    this.saveNow();
  },
  subscribe() {
    const root = this.root();
    this.subs.push(root.collection('profiles').onSnapshot(snap => {
      let changed = false;
      snap.docChanges().forEach(ch => {
        if (ch.type === 'removed') return;
        const x = ch.doc.data(); if (!x || snap.metadata.hasPendingWrites) return;
        const l = profById(x.id);
        if (!l || (x.updatedAt || 0) > (l.updatedAt || 0)) {
          this.hashes['p/' + x.id] = hash(JSON.stringify(x));
          root.collection('words').where('pid', '==', x.id).get().then(ws => {
            const p = JSON.parse(JSON.stringify(x)); delete p.summary;
            const ch2 = ws.docs.map(d => d.data()).filter(Boolean).sort((a, b) => a.i - b.i);
            ws.docs.forEach(d => { this.hashes['w/' + d.id] = hash(JSON.stringify(d.data())); });
            p.words = ch2.flatMap(c => c.list || []);
            const i = S.profiles.findIndex(q => q.id === p.id);
            if (i >= 0) S.profiles[i] = p; else S.profiles.push(p);
            try { localStorage.setItem(LS, JSON.stringify(S)); } catch (e) { }
            if (!UI.game) render(); else UI.needRender = true;
          }).catch(() => { });
          changed = true;
        }
      });
    }, () => { }));
  },
  subscribeTasks() {
    const c = this.db;
    this.subs.push(c.collection('tasks').onSnapshot(s => { this.tasks = s.docs.map(d => Object.assign({ id: d.id }, d.data())); refreshSoft(); }, () => { }));
    this.subs.push(c.collection('subs').onSnapshot(s => { this.submissions = {}; s.docs.forEach(d => this.submissions[d.id] = d.data()); refreshSoft(); rewardReviews(); }, () => { }));
    this.subs.push(c.collection('reviews').onSnapshot(s => { this.reviews = {}; s.docs.forEach(d => this.reviews[d.id] = d.data()); refreshSoft(); rewardReviews(); }, () => { }));
  },
  async save() { if (!this.on) return; if (this.busy) { this.again = true; return; } this.busy = true; try { await this.saveNow(); setSync('cloud'); } catch (e) { console.warn(e); setSync(e && e.code === 'quota_exceeded' ? 'quota' : 'error'); } this.busy = false; if (this.again) { this.again = false; this.save(); } },
  async saveNow() {
    const root = this.root();
    const m = this.meta(); m.deleted = S.deleted || [];
    const hm = hash(JSON.stringify(Object.assign({}, m, { updatedAt: 0 })));
    if (this.hashes.meta !== hm) { await root.set(m); this.hashes.meta = hm; }
    for (const p of S.profiles) {
      if (!canSave(p)) continue;
      const pd = this.profDoc(p); const h = hash(JSON.stringify(pd));
      if (this.hashes['p/' + p.id] !== h) { await root.collection('profiles').doc(p.id).set(pd); this.hashes['p/' + p.id] = h; }
      const size = 120, n = Math.max(1, Math.ceil(p.words.length / size));
      for (let i = 0; i < n; i++) {
        const body = JSON.parse(JSON.stringify({ pid: p.id, i, list: p.words.slice(i * size, (i + 1) * size) }));
        const id = p.id + '_' + i, hh = hash(JSON.stringify(body));
        if (this.hashes['w/' + id] !== hh) { await root.collection('words').doc(id).set(body); this.hashes['w/' + id] = hh; }
      }
      const old = this.chunks[p.id] || 0;
      for (let i = n; i < old; i++) { await root.collection('words').doc(p.id + '_' + i).delete(); delete this.hashes['w/' + p.id + '_' + i]; }
      this.chunks[p.id] = n;
    }
    for (const id of (S.deleted || [])) { if (this.hashes['del/' + id]) continue; await root.collection('profiles').doc(id).delete(); for (let i = 0; i < (this.chunks[id] || 3); i++) await root.collection('words').doc(id + '_' + i).delete(); this.hashes['del/' + id] = 1; }
  }
};
function setSync(s) { Cloud.status = s; const el = $('#syncDot'); if (el) { el.dataset.s = s; el.title = syncLabel(); el.querySelector('span').textContent = syncLabel(true); } }
function syncLabel(short) {
  return ({ local: short ? 'Это устройство' : 'Прогресс хранится в этом браузере', loading: 'Загрузка…', slow: short ? 'Нет связи' : 'Облако пока недоступно — сохраняем локально', cloud: short ? 'Облако' : 'Синхронизировано с облаком', error: short ? 'Ошибка' : 'Не удалось сохранить в облако — данные есть локально', quota: short ? 'Нет места' : 'Облачное хранилище заполнено' })[Cloud.status] || Cloud.status;
}
function refreshSoft() { if (UI.game || UI.modal) { UI.needRender = true; return; } if (['home', 'tasks', 'tview'].includes(UI.view) || UI.mode === 'teacher') render(); }

/* ---------- AI и озвучка ---------- */
let AI = null, TTS = null;
async function initCaps() {
  if (!(window.claude && typeof window.claude.use === 'function')) return;
  try { AI = await window.claude.use('sample'); } catch (e) { AI = null; }
  try { TTS = await window.claude.use('tts'); } catch (e) { TTS = null; }
  if (!UI.game) render();
}
function speak(text) {
  const p = P();
  const v = p ? p.voice : 'claude';
  if (TTS && v === 'claude') { TTS.speak(String(text).slice(0, 1900), { language: 'en', rate: (p && p.rate) || 0.9 }).catch(e => { if (e && e.code !== 'viewer_stopped') browserSpeak(text); }); return; }
  browserSpeak(text);
}
function browserSpeak(text) {
  try {
    const p = P(); const u = new SpeechSynthesisUtterance(text);
    u.lang = (p && p.voice && p.voice !== 'claude') ? p.voice : 'en-GB'; u.rate = (p && p.rate) || 0.9;
    const vs = speechSynthesis.getVoices().filter(x => x.lang.replace('_', '-').startsWith(u.lang)); if (vs[0]) u.voice = vs[0];
    speechSynthesis.cancel(); speechSynthesis.speak(u);
  } catch (e) { toast('Озвучка недоступна в этом браузере'); }
}
const canSpeak = () => !!TTS || ('speechSynthesis' in window);
async function ask(input, opts = {}) {
  if (!AI) throw { code: 'no_ai' };
  const r = await AI(input, opts);
  return r.text;
}
async function askJSON(prompt) {
  if (!AI) throw { code: 'no_ai' };
  if (typeof AI.json === 'function') { try { return await AI.json(prompt); } catch (e) { if (e && (e.code === 'not_granted' || e.code === 'rate_limited')) throw e; } }
  const t = await ask(prompt + '\n\nВерни ТОЛЬКО валидный JSON без пояснений и без ```.');
  const m = t.match(/[\[{][\s\S]*[\]}]/); return JSON.parse(m ? m[0] : t);
}
function aiErr(e) { if (e && e.code === 'not_granted') return 'Доступ к AI не разрешён. Разрешите его в окне Claude, чтобы пользоваться AI Teacher.'; if (e && e.code === 'rate_limited') return 'AI немного устал — попробуйте через минуту.'; if (e && e.code === 'no_ai') return window.EQ_STANDALONE ? 'AI не подключён.' : 'AI доступен, когда приложение открыто в Claude.'; return 'Не получилось связаться с AI. Попробуйте ещё раз.'; }
function md(t) {
  let h = esc(t).replace(/\*\*(.+?)\*\*/g, '<b>$1</b>').replace(/(^|[\s(])\*(?!\s)(.+?)\*(?=[\s).,!?]|$)/g, '$1<i>$2</i>');
  return h.split(/\n/).map(l => /^\s*[-•]\s+/.test(l) ? '<li>' + l.replace(/^\s*[-•]\s+/, '') + '</li>' : l).join('\n').replace(/(<li>[\s\S]*?<\/li>)(?!\n<li>)/g, '<ul>$1</ul>').replace(/\n/g, '<br>').replace(/<\/li><br><li>/g, '</li><li>').replace(/<br><ul>/g, '<ul>').replace(/<\/ul><br>/g, '</ul>');
}
function learnerDesc(p = P()) { return isKid(p) ? `ребёнок ${p.age || 9} лет, уровень ${p.level}` : `взрослый, уровень ${p.level}`; }

/* ---------- XP, уровни, серии, достижения ---------- */
const levelOf = xp => { let n = 1; while (xp >= 50 * n * (n + 1)) n++; return n; };
const levelProgress = xp => { const n = levelOf(xp), a = 50 * (n - 1) * n, b = 50 * n * (n + 1); return { n, pct: Math.round((xp - a) / (b - a) * 100), left: b - xp }; };
const rankOf = p => { const r = THEMES[p.theme || 'quest'].ranks; return r[Math.min(r.length - 1, Math.floor((levelOf(p.xp) - 1) / 3))]; };
function streakNow(p) { const s = p.streak; if (!s.last) return 0; const d = daysBetween(s.last, today()); return d <= 1 ? s.count : 0; }
function addXP(n, p = P(), silent) {
  if (!p || !n) return;
  p.xp += n; const d = today(); p.xpLog[d] = (p.xpLog[d] || 0) + n;
  if (p.streak.last !== d) { p.streak.count = (p.streak.last && daysBetween(p.streak.last, d) === 1) ? p.streak.count + 1 : 1; p.streak.last = d; p.streak.best = Math.max(p.streak.best || 0, p.streak.count); }
  if (!silent) xpPop(n);
  checkAch(p);
}
function grant(p, id) { if (p.ach[id]) return; p.ach[id] = today(); const a = D.ACH.find(x => x[0] === id); if (a) toast(`${a[1]} Новое достижение: <b>${esc(a[2])}</b>`, 'ach'); }
function wordSummary(p) { const c = { total: p.words.length, new: 0, learning: 0, review: 0, mastered: 0 }; p.words.forEach(w => c[wStatus(w)]++); return c; }
function checkAch(p = P()) {
  if (!p) return;
  const own = p.words.filter(w => w.own).length, ws = wordSummary(p);
  if (own >= 1) grant(p, 'first_word');
  if (ws.total >= 10 && own >= 1) grant(p, 'words_10');
  if (ws.total >= 100) grant(p, 'words_100');
  if (ws.mastered >= 10) grant(p, 'mastered_10');
  const st = p.streak.count; if (st >= 3) grant(p, 'streak_3'); if (st >= 7) grant(p, 'streak_7'); if (st >= 30) grant(p, 'streak_30');
  if (p.xp >= 500) grant(p, 'xp_500'); if (p.xp >= 3000) grant(p, 'xp_3000');
  const passed = Object.keys(p.topics).filter(k => p.topics[k].best >= 80);
  if (passed.length >= 5) grant(p, 'grammar_5');
  if (TENSES.every(t => passed.includes(t.id))) grant(p, 'grammar_12');
  if (p.stats.listen >= 30) grant(p, 'listening');
  if (p.stats.speak >= 20) grant(p, 'speaking');
  if (p.stats.diary >= 5) grant(p, 'diary_5');
  if (p.stats.duelWins >= 1) grant(p, 'duel');
  if (p.stats.mnemos >= 5) grant(p, 'mnemo');
  let run = 0; for (let i = 0; i < 7; i++) { const pl = p.plans[addDays(today(), -i)]; if (pl && pl.steps.every(s => s.done)) run++; else break; }
  if (run >= 1) grant(p, 'perfect_day'); if (run >= 7) grant(p, 'perfect_week');
}

/* ---------- Слова и интервальное повторение ---------- */
function wStatus(w) { if (!w.stage) return 'new'; if (w.due && w.due <= today()) return 'review'; if (w.stage >= 6) return 'mastered'; return 'learning'; }
const ST_LABEL = { new: 'New', learning: 'Learning', review: 'Review', mastered: 'Mastered' };
const dueWords = p => p.words.filter(w => w.ru && w.stage > 0 && w.due && w.due <= today());
function srs(w, r) { // r: 0 не помню, 1 сложно, 2 помню, 3 легко
  const d = today(); w.reps++; w.last = d;
  if (!w.stage) { w.stage = r === 3 ? 2 : 1; w.due = addDays(d, r === 3 ? 2 : 1); return; }
  if (r === 0) { w.lapses++; w.stage = 1; w.due = d; return; }
  if (r === 1) { w.due = addDays(d, Math.max(1, Math.round(INTERVALS[Math.max(0, w.stage - 1)] / 2))); return; }
  const s = Math.min(INTERVALS.length - 1, w.stage);
  w.due = addDays(d, r === 3 ? INTERVALS[Math.min(INTERVALS.length - 1, s + 1)] : INTERVALS[s]);
  w.stage = Math.min(7, w.stage + (r === 3 ? 2 : 1));
}
function wordResult(p, id, ok) { const w = p.words.find(x => x.id === id); if (!w) return; if (ok) w.ok++; else { w.bad++; if (w.stage >= 3) { w.stage = Math.max(1, w.stage - 2); w.due = today(); } } }
function topicResult(p, id, ok) { const t = p.topics[id] = p.topics[id] || { ok: 0, bad: 0, best: 0 }; if (ok) t.ok++; else t.bad++; t.last = today(); }
const acc = t => t && (t.ok + t.bad) ? Math.round(t.ok / (t.ok + t.bad) * 100) : null;
function weakTopics(p) { return Object.entries(p.topics).filter(([k, t]) => TOP[k] && (t.ok + t.bad) >= 5 && acc(t) < 70).sort((a, b) => acc(a[1]) - acc(b[1])).map(([k]) => k); }
function curriculum(p) { return D.CURRICULUM.filter(id => !isKid(p) || TOP[id].kid); }
function focusTopic(p) {
  const list = curriculum(p), weak = weakTopics(p);
  const fresh = list.filter(id => !(p.topics[id] && p.topics[id].best >= 80) && (isKid(p) || lvlRank(TOP[id].level) >= lvlRank(p.level) - 0 || weak.includes(id)));
  if (fresh.length) return fresh[0];
  const rem = list.filter(id => !(p.topics[id] && p.topics[id].best >= 80));
  if (rem.length) return rem[0];
  return list[parseInt(hash(today()), 10) % list.length] || list[0];
}

/* ---------- Ежедневный план ---------- */
const STEP_META = {
  vocab: ['🧠', 'Vocabulary Quest', 'Мнемо-карточки: новые слова + повторение'],
  grammar: ['⚔️', 'Grammar Battle', ''],
  drill: ['🎯', 'Работа над ошибками', ''],
  listen: ['🎧', 'Listening Mission', 'Слушай и выбирай'],
  builder: ['🧱', 'Sentence Builder', 'Собери предложение по-английски'],
  translate: ['🏁', 'Translation Race', 'Переведи слова на скорость'],
  speak: ['🗣️', 'Speaking Arena', 'Разговор с AI-собеседником'],
  error: ['🔍', 'Error Hunter', 'Найди ошибку в предложении'],
  diary: ['📔', 'English Diary', 'Напиши 3–5 предложений о своём дне'],
  picture: ['🖼️', 'Picture Quiz', 'Угадай слово по картинке'],
  match: ['🧩', 'Word Match', 'Соедини слово и перевод'],
  memory: ['🃏', 'Memory Game', 'Найди пары'],
  read: ['📖', 'Reading', 'Прочитай текст и ответь на вопросы'],
  sentences: ['✍️', 'Предложения с новыми словами', 'Собери и составь фразы с сегодняшними словами'],
  lesson: ['📘', 'Урок дня: теория', ''],
  consolidate: ['🔁', 'Закрепление темы', ''],
  mixed: ['🎲', 'Mixed Challenge', 'Задания по всем темам вперемешку'],
  dictation: ['✍️', 'Диктант', 'Запиши услышанные предложения'],
  boss: ['👹', 'Daily Boss', 'Микс всех времён и тем — каждый день']
};
function planFor(p, date = today()) {
  if (p.plans[date] && (p.plans[date].v === 3 || p.plans[date].steps.some(s => s.done))) return p.plans[date];
  const kid = isKid(p), short = p.minutes <= (kid ? 15 : 20), odd = parseInt(hash(date), 10) % 2;
  const focus = focusTopic(p), weak = weakTopics(p).filter(x => x !== focus)[0];
  let keys;
  const intensive = !kid && p.intensive !== false;
  if (kid) keys = short ? ['vocab', 'picture', 'boss'] : ['vocab', 'picture', 'grammar', 'match', 'read', 'boss'];
  else if (intensive) keys = ['vocab', 'sentences', 'lesson', 'grammar', 'consolidate', ...(weak ? ['drill'] : []), 'read', 'listen', AI ? (odd ? 'speak' : 'diary') : 'error', ...(p.hard ? ['mixed'] : []), 'boss'];
  else keys = short ? ['vocab', 'grammar', 'boss'] : ['vocab', 'grammar', ...(weak ? ['drill'] : []), 'listen', odd ? 'builder' : 'translate', AI ? (odd ? 'speak' : 'diary') : 'error', ...(p.hard ? ['mixed', 'read'] : []), 'boss'];
  const steps = keys.map(k => ({ k, topic: ['grammar', 'lesson', 'consolidate'].includes(k) ? focus : k === 'drill' ? weak : null, done: false }));
  p.plans[date] = { date, steps, v: 3 };
  Object.keys(p.plans).forEach(d => { if (daysBetween(d, date) > 60) delete p.plans[d]; });
  return p.plans[date];
}
function stepInfo(s) {
  const m = STEP_META[s.k] || ['⭐', s.k, ''];
  let sub = m[2];
  if (['grammar', 'drill', 'lesson', 'consolidate'].includes(s.k)) sub = TOP[s.topic] ? TOP[s.topic].name + ' · ' + TOP[s.topic].ru : '';
  if (s.k === 'vocab') { const p = P(); sub = `${Math.min(newLeft(p), newPool(p).length)} новых + ${Math.min(40, dueWords(p).length)} на повторение`; }
  return { icon: m[0], title: m[1], sub };
}
function newPool(p) { return p.words.filter(w => !w.stage && w.ru && w.ru.trim()).sort((a, b) => (b.own - a.own) || (a.added < b.added ? -1 : 1)); }
function newLeft(p) { return Math.max(0, p.newPerDay - (p.intro[today()] || 0)); }

/* ---------- Генераторы вопросов ---------- */
function kidPack() { return D.KID_WORDS.map(a => ({ id: null, en: a[0], ru: a[1], emoji: a[8], examples: [{ en: a[6], ru: a[7] }] })); }
function wordPool(p) { const w = p.words.filter(x => x.ru); return w.length >= 4 ? w : w.concat(kidPack()); }
function introduced(p) { const w = p.words.filter(x => x.stage > 0 && x.ru); return w.length >= 4 ? w : wordPool(p); }
function distract(pool, w, field, n = 3) { const seen = new Set([norm(w[field])]); const out = []; for (const x of shuffle(pool)) { const v = x[field]; if (!v || seen.has(norm(v))) continue; seen.add(norm(v)); out.push(v); if (out.length >= n) break; } return out; }
function qGrammar(t, it) {
  const pr = typeof P === 'function' ? P() : null;
  if (pr && pr.hard && !isKid(pr) && !UI.noHardInput && Math.random() < 0.5) return { kind: 'input', prompt: it[0], sub: t.name + ' · 🔥 впиши ответ', answer: it[1], alts: [it[1]], explain: it[3] || t.tip, tag: { topic: t.id } };
  return { kind: 'mcq', prompt: it[0], sub: t.name, options: shuffle(it[2]), answer: it[1], explain: it[3] || t.tip, tag: { topic: t.id } };
}
function topicQs(id, n) { const t = TOP[id]; return shuffle(t.items).slice(0, n || t.items.length).map(it => qGrammar(t, it)); }
function qWordMCQ(w, pool, dir) {
  if (dir === 'ru') return { kind: 'mcq', prompt: w.ru, sub: 'Выбери английское слово', options: shuffle([w.en].concat(distract(pool, w, 'en'))), answer: w.en, explain: mnemoOf(w), tag: { word: w.id }, say: w.en, sayAfter: true };
  return { kind: 'mcq', prompt: w.en, sub: (w.ipa ? w.ipa + ' · ' : '') + 'Выбери перевод', options: shuffle([w.ru].concat(distract(pool, w, 'ru'))), answer: w.ru, explain: mnemoOf(w), tag: { word: w.id }, say: w.en };
}
function findInSentence(sent, en) {
  const toks = sent.split(/\s+/), base = normWord(en);
  if (base.includes(' ')) { const i = norm(sent).indexOf(base); return i >= 0 ? { phrase: true } : null; }
  let idx = toks.findIndex(t => norm(t) === base);
  if (idx < 0 && base.length >= 4) { const stem = base.slice(0, Math.max(4, base.length - 2)); idx = toks.findIndex(t => norm(t).startsWith(stem)); }
  return idx < 0 ? null : { idx, toks };
}
function qMissing(w, pool) {
  const ex = (w.examples || []).find(e => e.en && findInSentence(e.en, w.en)); if (!ex) return null;
  const f = findInSentence(ex.en, w.en); let text;
  if (f.phrase) text = ex.en.replace(new RegExp(normWord(w.en).replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i'), '___');
  else { const t = f.toks.slice(); const m = t[f.idx].match(/[.,!?]+$/); t[f.idx] = '___' + (m ? m[0] : ''); text = t.join(' '); }
  return { kind: 'mcq', prompt: text, sub: 'Вставь пропущенное слово (в нужной форме)' + (ex.ru ? ' · ' + ex.ru : ''), options: shuffle([w.en].concat(distract(pool, w, 'en'))), answer: w.en, explain: `${w.en} — ${w.ru}. ${ex.en}`, tag: { word: w.id }, say: ex.en, sayAfter: true };
}
function qType(w) { return { kind: 'input', prompt: w.ru, sub: 'Напиши по-английски' + (w.emoji ? ' ' + w.emoji : ''), answer: w.en, alts: [normWord(w.en)], explain: mnemoOf(w), tag: { word: w.id }, say: w.en, sayAfter: true }; }
function qDetective(w) {
  const clue = w.meaning || w.ru; const n = normWord(w.en);
  return { kind: 'input', prompt: '🕵️ ' + clue, sub: `Начинается на «${n[0]}», букв: ${n.replace(/ /g, '').length}` + (w.meaning ? ' · перевод: ' + w.ru : ''), answer: w.en, alts: [n], explain: mnemoOf(w), tag: { word: w.id }, say: w.en, sayAfter: true };
}
function qListenWord(w, pool) {
  const kid = isKid();
  if (kid && w.emoji) { const opts = shuffle([w].concat(shuffle(pool.filter(x => x.emoji && x.en !== w.en)).slice(0, 3))); return { kind: 'mcq', listen: w.en, prompt: '🎧 Послушай и выбери картинку', options: opts.map(x => x.emoji), answer: w.emoji, explain: `${w.emoji} ${w.en} — ${w.ru}`, tag: { word: w.id, listen: 1 }, big: true }; }
  return { kind: 'mcq', listen: w.en, prompt: '🎧 Какое слово ты услышал?', options: shuffle([w.en].concat(distract(pool, w, 'en'))), answer: w.en, explain: `${w.en} — ${w.ru}`, tag: { word: w.id, listen: 1 } };
}
function exPool(p) { return curriculum(p).flatMap(id => TOP[id].examples.map(e => ({ en: e[0], ru: e[1], topic: id }))); }
function qListenSentence(p, ex) {
  const pool = exPool(p), e = ex || pick(pool), others = shuffle(pool.filter(x => x.en !== e.en)).slice(0, 2);
  return { kind: 'mcq', listen: sentence(e.en), prompt: '🎧 Какое предложение прозвучало?', options: shuffle([e].concat(others)).map(x => sentence(x.en)), answer: sentence(e.en), explain: sentence(e.en) + ' — ' + e.ru, tag: { topic: e.topic, listen: 1 } };
}
function qDictation(p, ex) { const e = ex || pick(exPool(p)); return { kind: 'input', listen: sentence(e.en), prompt: '✍️ Запиши предложение, которое услышишь', answer: sentence(e.en), alts: [norm(e.en)], explain: e.ru, tag: { topic: e.topic, listen: 1 }, long: true }; }
function qBuilderTopic(id, ex) { const t = TOP[id], e = ex || pick(t.examples); return { kind: 'builder', prompt: e[1], sub: t.name, tokens: e[0].split(' '), answer: e[0], explain: t.tip, tag: { topic: id } }; }
function qBuilderWord(w) { const ex = (w.examples || []).find(e => e.en && e.en.split(' ').length <= 10 && e.ru); if (!ex) return null; const s = ex.en.replace(/[.!?]$/, ''); return { kind: 'builder', prompt: ex.ru, sub: 'Слово: ' + w.en, tokens: s.split(' '), answer: s, explain: mnemoOf(w), tag: { word: w.id } }; }
function qError(id, err) { const t = TOP[id]; if (!t.errors || !t.errors.length) return null; const e = err || pick(t.errors); const toks = e[0].split(' '); const bi = toks.findIndex(x => x.replace(/[.,!?]/g, '') === e[1]); return { kind: 'error', prompt: 'Нажми на слово с ошибкой', sub: t.name, toks, bad: bi, answer: e[2], explain: e[3], tag: { topic: id } }; }
function qPicture(w, pool) { const opts = shuffle([w.en].concat(distract(pool.filter(x => x.emoji), w, 'en'))); return { kind: 'mcq', prompt: w.emoji, big: true, sub: 'Что на картинке?', options: opts, answer: w.en, explain: `${w.emoji} ${w.en} — ${w.ru}. ${mnemoOf(w)}`, tag: { word: w.id }, say: w.en, sayAfter: true }; }
const mnemoOf = w => w.myMnemo ? '💡 ' + w.myMnemo : w.mnemo ? '💡 ' + w.mnemo : '';
function studiedTopics(p) { const c = curriculum(p); const f = c.indexOf(focusTopic(p)); const s = c.filter((id, i) => i <= f || (p.topics[id] && (p.topics[id].ok + p.topics[id].bad))); return s.length ? s : c.slice(0, 3); }

function bossQs(p) {
  const qs = [];
  if (isKid(p)) {
    shuffle(studiedTopics(p)).slice(0, 5).forEach(id => qs.push(qGrammar(TOP[id], pick(TOP[id].items))));
  } else {
    TENSES.forEach(t => shuffle(t.items).slice(0, p.hard ? 2 : 1).forEach(it => qs.push(qGrammar(t, it))));
    shuffle(studiedTopics(p).filter(id => !TOP[id].tense)).slice(0, 3).forEach(id => qs.push(qGrammar(TOP[id], pick(TOP[id].items))));
  }
  const pool = wordPool(p);
  shuffle(introduced(p)).slice(0, 3).forEach(w => qs.push(qWordMCQ(w, pool, isKid(p) ? 'en' : rnd(2) ? 'ru' : 'en')));
  return shuffle(qs);
}
function mixedQs(p, n = 12) {
  const pool = wordPool(p), ws = introduced(p), tps = studiedTopics(p), qs = [];
  const gens = [() => qGrammar(TOP[pick(tps)], pick(TOP[pick(tps)].items)), () => qWordMCQ(pick(ws), pool, 'en'), () => qWordMCQ(pick(ws), pool, 'ru'), () => qMissing(pick(ws), pool), () => qError(pick(tps)), () => qBuilderTopic(pick(tps)), () => canSpeak() ? qListenWord(pick(ws), pool) : null];
  let guard = 0; while (qs.length < n && guard++ < 200) { const q = pick(gens)(); if (q && !qs.some(x => qKey(x) === qKey(q) || x.prompt === q.prompt || (q.tag && q.tag.word && x.tag && x.tag.word === q.tag.word))) qs.push(q); }
  return qs;
}
function wordExercises(w, p) {
  const pool = wordPool(p), qs = [qWordMCQ(w, pool, 'en'), qWordMCQ(w, pool, 'ru')];
  const m = qMissing(w, pool); if (m) qs.push(m);
  if (canSpeak()) qs.push(Object.assign(qListenWord(w, pool), {}));
  const b = qBuilderWord(w); if (b) qs.push(b);
  qs.push(qType(w));
  qs.push({ kind: 'free', prompt: `Составь своё предложение со словом «${w.en}»`, sub: w.ru, word: w.en, tag: { word: w.id } });
  return qs;
}

/* ---------- Игры ---------- */
const GAMES = [
  { id: 'flash', icon: '🧠', name: 'Мнемо-карточки', desc: 'Учим новые слова через ассоциации и повторяем по интервалам', kid: true },
  { id: 'match', icon: '🧩', name: 'Word Match', desc: 'Соедини слово и перевод', kid: true },
  { id: 'missing', icon: '🕳️', name: 'Missing Word', desc: 'Вставь пропущенное слово в предложение', kid: true },
  { id: 'builder', icon: '🧱', name: 'Sentence Builder', desc: 'Собери предложение из слов', kid: true },
  { id: 'battle', icon: '⚔️', name: 'Grammar Battle', desc: 'Выбери правильную грамматику', kid: true },
  { id: 'speed', icon: '⚡', name: 'Speed Challenge', desc: '10 секунд на ответ!', kid: true },
  { id: 'translate', icon: '🏁', name: 'Translation Race', desc: 'Переведи слова на английский', kid: true },
  { id: 'detective', icon: '🕵️', name: 'Word Detective', desc: 'Угадай слово по описанию', kid: true },
  { id: 'listen', icon: '🎧', name: 'Listening Challenge', desc: 'Послушай и выбери', kid: true },
  { id: 'dictation', icon: '✍️', name: 'Диктант', desc: 'Запиши услышанное предложение', kid: false },
  { id: 'error', icon: '🔍', name: 'Error Hunter', desc: 'Найди ошибку в предложении', kid: true },
  { id: 'memory', icon: '🃏', name: 'Memory Game', desc: 'Найди пары карточек', kid: true },
  { id: 'picture', icon: '🖼️', name: 'Picture Quiz', desc: 'Угадай слово по картинке', kid: true },
  { id: 'story', icon: '📜', name: 'Story Builder', desc: 'Сочини историю из 5 слов', kid: true, ai: true },
  { id: 'mixed', icon: '🎲', name: 'Mixed Challenge', desc: 'Смешанные задания по всем темам', kid: true },
  { id: 'boss', icon: '👹', name: 'Daily Boss', desc: 'Большой тест дня: все 12 времён', kid: true },
  { id: 'aiwords', icon: '✨', name: 'AI-упражнения', desc: 'AI создаёт задания из ваших слов', kid: true, ai: true }
];
function startGame(id, opt = {}) {
  const p = P(), pool = wordPool(p), ws = introduced(p);
  const topic = opt.topic || null;
  const T = (title, icon, qs, extra) => runQuiz(Object.assign({ title, icon, questions: qs.filter(Boolean), step: opt.step }, extra || {}));
  switch (id) {
    case 'flash': return runFlash(opt);
    case 'match': return runMatch(opt);
    case 'memory': return runMemory(opt);
    case 'story': return openAI('story');
    case 'diary': return openAI('diary');
    case 'speak': return openAI('speak', opt);
    case 'read': return go('read');
    case 'aiwords': return aiWordsGame(opt);
    case 'missing': { const qs = shuffle(p.words.filter(w => w.ru)).map(w => qMissing(w, pool)).filter(Boolean).slice(0, 8); return T('Missing Word', '🕳️', qs.length ? qs : mixedQs(p, 6)); }
    case 'builder': { const tps = topic ? [topic] : studiedTopics(p); const tq = shuffle(tps.flatMap(id => TOP[id].examples.map(e => qBuilderTopic(id, e)))); const wq = topic ? [] : shuffle(ws).map(qBuilderWord).filter(Boolean).slice(0, 2); return T('Sentence Builder', '🧱', shuffle(tq.slice(0, 6 - wq.length).concat(wq))); }
    case 'battle': case 'grammar': case 'drill': { const t = topic || focusTopic(p); const qs = topicQs(t, isKid(p) ? 5 : p.hard ? 12 : 8); return T('Grammar Battle · ' + TOP[t].name, '⚔️', qs, { topic: t }); }
    case 'speed': return T('Speed Challenge', '⚡', mixedQs(p, 12).filter(q => q.kind === 'mcq' && !q.listen), { timer: P().hard ? 7 : 10 });
    case 'translate': return T('Translation Race', '🏁', shuffle(ws).slice(0, 10).map(qType), { race: true });
    case 'detective': return T('Word Detective', '🕵️', shuffle(ws).slice(0, 8).map(qDetective));
    case 'listen': { if (!canSpeak()) return toast('Озвучка недоступна в этом браузере'); const qs = shuffle(ws).slice(0, 6).map(w => qListenWord(w, pool)); shuffle(exPool(p)).slice(0, 2).forEach(e => qs.push(qListenSentence(p, e))); return T('Listening Challenge', '🎧', isKid(p) ? qs.slice(0, 7) : qs); }
    case 'dictation': { if (!canSpeak()) return toast('Озвучка недоступна в этом браузере'); return T('Диктант', '✍️', shuffle(exPool(p)).slice(0, 5).map(e => qDictation(p, e))); }
    case 'error': { let tps = topic ? [topic] : studiedTopics(p).filter(id => TOP[id].errors.length); let all = tps.flatMap(id => TOP[id].errors.map(e => qError(id, e))); if (!topic && all.length < 7) all = all.concat(curriculum(p).filter(id => !tps.includes(id)).flatMap(id => TOP[id].errors.map(e => qError(id, e)))); return T('Error Hunter', '🔍', shuffle(all).slice(0, 7)); }
    case 'picture': { const pp = pool.filter(w => w.emoji); const src = pp.length >= 4 ? pp : kidPack(); return T('Picture Quiz', '🖼️', shuffle(src).slice(0, 8).map(w => qPicture(w, src))); }
    case 'mixed': return T('Mixed Challenge', '🎲', mixedQs(p, 12));
    case 'boss': return T('Daily Boss', '👹', bossQs(p), { boss: true });
    case 'short': return T('Короткий Daily Challenge', '⏱️', mixedQs(p, 8));
    case 'wordtrain': { const w = p.words.find(x => x.id === opt.word); return T('Тренировка: ' + w.en, '🎯', wordExercises(w, p)); }
    case 'placement': return runPlacement(p);
  }
}
function recentNew(p) { const ids = (p.introIds && p.introIds[today()]) || []; let ws = ids.map(id => p.words.find(w => w.id === id)).filter(w => w && w.ru); if (ws.length < 3) ws = ws.concat(p.words.filter(w => w.stage > 0 && w.ru && !ws.includes(w)).sort((a, b) => (b.last || '') > (a.last || '') ? 1 : -1)).slice(0, Math.max(5, ws.length)); return ws.slice(0, 8); }
function sentencesGame(opt) {
  const p = P(), ws = recentNew(p); if (!ws.length) return toast('Сначала выучите новые слова в шаге «Vocabulary Quest»');
  const qs = ws.map(qBuilderWord).filter(Boolean).slice(0, 5);
  ws.slice(0, 3).forEach(w => qs.push({ kind: 'free', prompt: `Составь своё предложение со словом «${w.en}»`, sub: w.ru, word: w.en, tag: { word: w.id } }));
  runQuiz({ title: 'Предложения с новыми словами', icon: '✍️', questions: qs, step: opt.step });
}
function consolidateGame(opt) {
  const p = P(), id = opt.topic || focusTopic(p), t = TOP[id];
  const qs = shuffle(t.examples).slice(0, 3).map(e => qBuilderTopic(id, e)).concat(t.errors.map(e => qError(id, e)), shuffle(t.items).slice(0, 5).map(it => isKid(p) ? qGrammar(t, it) : { kind: 'input', prompt: it[0], sub: t.name + ' · впиши ответ', answer: it[1], alts: [it[1]], explain: it[3] || t.tip, tag: { topic: id } }));
  runQuiz({ title: 'Закрепление · ' + t.name, icon: '🔁', questions: shuffle(qs), step: opt.step, topic: id });
}
function pickText(p) {
  const kid = isKid(p), done = p.readDone || {}, r = lvlRank(p.level);
  let pool = D.READING.filter(x => kid ? x.kid : !x.kid);
  if (!kid) { const fit = pool.filter(x => lvlRank(x.level) <= r + 1 && lvlRank(x.level) >= r - 1); if (fit.length) pool = fit; if (p.intensive !== false && r >= 2) { const ie = pool.filter(x => x.ielts); if (ie.some(x => !done[x.id])) pool = ie; } }
  return pool.find(x => !done[x.id]) || pool[parseInt(hash(today()), 10) % pool.length];
}
function runStep(i) {
  const p = P(), pl = planFor(p), s = pl.steps[i]; if (!s) return;
  if (s.k === 'lesson') { UI.lessonStep = i; return go('topic', s.topic); }
  if (s.k === 'read') { const t = pickText(p); UI.readStep = i; return go('reader', 'reader:' + t.id); }
  if (s.k === 'sentences') return sentencesGame({ step: i });
  if (s.k === 'consolidate') return consolidateGame({ step: i, topic: s.topic });
  const map = { vocab: 'flash', grammar: 'grammar', drill: 'drill' };
  startGame(map[s.k] || s.k, { topic: s.topic, step: i });
}
function completeStep(i, extraXP = 0) {
  const p = P(), pl = planFor(p); const s = pl.steps[i]; if (!s || s.done) return;
  s.done = true; addXP(20 + extraXP, p);
  if (pl.steps.every(x => x.done)) { addXP(50, p); toast('🎯 План на сегодня выполнен! +50 XP', 'ach'); }
  checkAch(p);
}

/* ---------- Движок викторины ---------- */
function qKey(q) { return [q.kind, q.listen || '', q.prompt, q.kind === 'error' ? q.toks.join(' ') : '', q.answer].join('|'); }
function uniqQs(list) { const seen = new Set(); return list.filter(q => { if (!q) return false; const k = qKey(q); if (seen.has(k)) return false; seen.add(k); return true; }); }
function runQuiz(cfg) {
  cfg.questions = uniqQs(cfg.questions);
  if (!cfg.questions.length) { toast('Пока не хватает материала для этой игры — добавьте слова'); return; }
  UI.game = { type: 'quiz', cfg, i: 0, score: 0, wrong: [], answered: false, start: Date.now(), xp: 0, sel: [], slain: 0 };
  render(); autoListen();
}
function autoListen() { const g = UI.game; if (!g || g.type !== 'quiz') return; const q = g.cfg.questions[g.i]; if (q && q.listen) setTimeout(() => speak(q.listen), 350); startTimer(); }
let timerInt = null;
function startTimer() {
  clearInterval(timerInt); const g = UI.game; if (!g || !g.cfg.timer) return;
  g.tLeft = g.cfg.timer; const bar = () => { const el = $('#qTimer'); if (el) el.style.width = (g.tLeft / g.cfg.timer * 100) + '%'; const n = $('#qTimerN'); if (n) n.textContent = Math.ceil(g.tLeft); };
  bar(); timerInt = setInterval(() => { if (UI.game !== g || g.answered) { clearInterval(timerInt); return; } g.tLeft -= 0.1; bar(); if (g.tLeft <= 0) { clearInterval(timerInt); answer(null); } }, 100);
}
function answer(val, extra) {
  const g = UI.game; if (!g || g.answered) return;
  const q = g.cfg.questions[g.i]; const p = q.pid ? profById(q.pid) : P();
  let ok;
  if (q.kind === 'mcq') ok = val === q.answer;
  else if (q.kind === 'input') { const v = canon(val); ok = v === canon(q.answer) || (q.alts || []).some(a => canon(a) === v || normWord(a) === normWord(val)); }
  else if (q.kind === 'builder') ok = canon(g.sel.map(i => q.tokens[i]).join(' ')) === canon(q.answer);
  else if (q.kind === 'error') ok = val === q.bad;
  else if (q.kind === 'free') ok = !!extra;
  g.answered = true; g.given = val; g.ok = ok;
  if (ok) { g.score++; const xp = g.cfg.noXP ? 0 : 10; g.xp += xp; if (xp) addXP(xp, p, true); g.slain++; p.stats.ok++; }
  else { g.wrong.push({ q, given: val }); p.stats.bad++; }
  if (q.tag) { if (q.tag.topic && !g.cfg.noXP) topicResult(p, q.tag.topic, ok); if (q.tag.word) wordResult(p, q.tag.word, ok); if (q.tag.listen && ok) p.stats.listen++; }
  if (g.cfg.duel) { const d = g.cfg.duel; d.score[q.pid] = (d.score[q.pid] || 0) + (ok ? 1 : 0); }
  if (g.cfg.answers) g.cfg.answers.push({ q: q.prompt, given: q.kind === 'builder' ? g.sel.map(i => q.tokens[i]).join(' ') : q.kind === 'error' ? (q.toks[val] || '') : String(val == null ? '—' : val), right: q.answer, ok });
  if (q.say && q.sayAfter) setTimeout(() => speak(q.say), 200);
  render();
  if (ok && P().theme === 'blade') { const c = $('.q-card'); if (c) { c.classList.add('slash'); } }
}
function nextQ() {
  const g = UI.game; if (!g) return;
  g.i++; g.answered = false; g.sel = []; g.given = null; g.aiWhy = null;
  if (g.i >= g.cfg.questions.length) return finishQuiz();
  render(); autoListen();
  const inp = $('#qInput'); if (inp) inp.focus();
}
function finishQuiz() {
  const g = UI.game, cfg = g.cfg, p = P(), n = cfg.questions.length, pct = Math.round(g.score / n * 100);
  const mins = (Date.now() - g.start) / 60000; p.timeLog[today()] = (p.timeLog[today()] || 0) + mins;
  if (cfg.topic) { const t = p.topics[cfg.topic] = p.topics[cfg.topic] || { ok: 0, bad: 0, best: 0 }; t.best = Math.max(t.best || 0, pct); t.seen = true; }
  let bonus = 0;
  if (cfg.boss && pct >= 80) { grant(p, 'boss'); if (p.hard) grant(p, 'hard_mode'); bonus += p.hard ? 100 : 50; }
  if (pct === 100 && n >= 5) bonus += 20;
  if (bonus && !cfg.noXP) addXP(bonus, p, true);
  if (cfg.step != null) completeStep(cfg.step);
  if (cfg.onFinish) cfg.onFinish({ score: g.score, total: n, pct, answers: cfg.answers });
  g.done = { pct, bonus, secs: Math.round((Date.now() - g.start) / 1000) };
  checkAch(p); save(); render();
}
function closeGame() { clearInterval(timerInt); const g = UI.game; UI.game = null; if (g && g.type !== 'quiz' && g.step != null && g.done) { } save(); render(); }

function renderQuiz() {
  const g = UI.game, cfg = g.cfg, th = THEMES[P().theme || 'quest'];
  if (g.done) {
    const pct = g.done.pct;
    return `<div class="game"><div class="game-top"><button class="icon-btn" data-act="closeGame">✕</button><div class="game-title">${cfg.icon} ${esc(cfg.title)}</div><div></div></div>
    <div class="result card">
      <div class="result-ring" style="--p:${pct}"><b>${pct}%</b></div>
      <h2>${pct >= 70 ? th.win : th.lose}</h2>
      <p class="muted">${g.score} из ${cfg.questions.length} верно${cfg.race ? ' · ' + g.done.secs + ' сек' : ''}${P().theme === 'blade' ? ' · повержено демонов: ' + g.slain : ''}</p>
      ${cfg.noXP ? '' : `<div class="xp-earned">+${g.xp + g.done.bonus + (cfg.step != null ? 20 : 0)} XP</div>`}
      ${cfg.resultHTML ? cfg.resultHTML(g) : ''}
      ${g.wrong.length ? `<div class="review-list"><h3>Разбор ошибок</h3>${g.wrong.map(w => `<div class="review-item"><div>${esc(qText(w.q))}</div><div class="ok-t">✓ ${esc(w.q.answer)}</div>${w.q.explain ? `<div class="muted small">${esc(w.q.explain)}</div>` : ''}</div>`).join('')}</div>` : ''}
      <div class="row center gap"><button class="btn ghost" data-act="closeGame">Готово</button>${cfg.step != null ? `<button class="btn" data-act="nextStep">Следующий шаг →</button>` : cfg.replay !== false ? `<button class="btn" data-act="replay">Ещё раз</button>` : ''}</div>
    </div></div>`;
  }
  const q = cfg.questions[g.i], n = cfg.questions.length;
  let body = '';
  const fb = g.answered ? (g.ok ? 'ok' : 'bad') : '';
  if (q.kind === 'mcq') {
    body = `<div class="opts ${q.big ? 'big' : ''}">${q.options.map(o => { let c = ''; if (g.answered) { if (o === q.answer) c = 'right'; else if (o === g.given) c = 'wrong'; } return `<button class="opt ${c}" data-act="ans" data-arg="${esc(o)}" ${g.answered ? 'disabled' : ''}>${esc(o)}</button>`; }).join('')}</div>`;
  } else if (q.kind === 'input') {
    body = `<form data-form="ansInput" class="ans-form">${q.long ? `<textarea id="qInput" rows="2" ${g.answered ? 'disabled' : ''} placeholder="Пиши здесь…">${g.answered ? esc(g.given) : ''}</textarea>` : `<input id="qInput" autocomplete="off" autocapitalize="off" spellcheck="false" ${g.answered ? 'disabled' : ''} value="${g.answered ? esc(g.given) : ''}" placeholder="Ответ по-английски">`}${g.answered ? '' : '<button class="btn">Проверить</button>'}</form>${g.answered && !g.ok ? `<div class="right-ans">Правильно: <b>${esc(q.answer)}</b></div>` : ''}`;
  } else if (q.kind === 'builder') {
    const rest = q.order || (q.order = shuffle(q.tokens.map((t, i) => i)));
    body = `<div class="build-line ${fb}">${g.sel.map((i, k) => `<button class="tok on" data-act="unTok" data-arg="${k}" ${g.answered ? 'disabled' : ''}>${esc(q.tokens[i])}</button>`).join('') || '<span class="muted">Нажимай на слова по порядку</span>'}</div>
    <div class="toks">${rest.filter(i => !g.sel.includes(i)).map(i => `<button class="tok" data-act="tok" data-arg="${i}" ${g.answered ? 'disabled' : ''}>${esc(q.tokens[i])}</button>`).join('')}</div>
    ${g.answered ? (g.ok ? '' : `<div class="right-ans">Правильно: <b>${esc(sentence(q.answer))}</b></div>`) : `<div class="row center gap"><button class="btn ghost" data-act="resetTok">Сбросить</button><button class="btn" data-act="checkBuild" ${g.sel.length ? '' : 'disabled'}>Проверить</button></div>`}`;
  } else if (q.kind === 'error') {
    body = `<div class="err-line">${q.toks.map((t, i) => { let c = ''; if (g.answered) { if (i === q.bad) c = 'wrong'; else if (i === g.given) c = 'picked'; } return `<button class="tok ${c}" data-act="ansErr" data-arg="${i}" ${g.answered ? 'disabled' : ''}>${esc(t)}</button>`; }).join(' ')}</div>${g.answered ? `<div class="right-ans">Правильно: <b>${esc(q.answer)}</b></div>` : ''}`;
  } else if (q.kind === 'free') {
    body = `<form data-form="ansFree" class="ans-form col"><textarea id="qInput" rows="3" ${g.answered ? 'disabled' : ''} placeholder="Напиши предложение по-английски…">${g.answered ? esc(g.given) : ''}</textarea>${g.answered ? '' : `<button class="btn" ${g.checking ? 'disabled' : ''}>${g.checking ? 'AI проверяет…' : AI ? 'Проверить с AI' : 'Готово'}</button>`}</form>${g.freeFb ? `<div class="ai-box">${md(g.freeFb)}</div>` : ''}`;
  }
  const expl = g.answered ? `<div class="feedback ${fb}">${P().theme === 'blade' ? charLine(g.ok) : ''}<div class="fb-head">${g.ok ? (P().theme === 'blade' ? '⚔️ Удар точен!' : '✅ Верно!') : (P().theme === 'blade' ? '👹 Демон ошибки!' : g.given === null ? '⏰ Время вышло' : '❌ Не совсем')}</div>${q.explain ? `<div>${esc(q.explain)}</div>` : ''}${!g.ok && AI && q.kind !== 'free' ? (g.aiWhy ? `<div class="ai-box">${md(g.aiWhy)}</div>` : `<button class="btn small ghost" data-act="aiWhy">🤖 Объясни подробнее</button>`) : ''}<button class="btn wide" data-act="nextQ" id="nextBtn">${g.i + 1 < n ? 'Дальше →' : 'Результат'}</button></div>` : '';
  const duel = cfg.duel ? `<div class="duel-bar">${cfg.duel.players.map(id => { const pr = profById(id); return `<div class="duel-p ${q.pid === id ? 'turn' : ''}">${pr.avatar} ${esc(pr.name)} <b>${cfg.duel.score[id] || 0}</b></div>`; }).join('<span>⚔️</span>')}</div>` : '';
  return `<div class="game"><div class="game-top"><button class="icon-btn" data-act="closeGame" title="Выйти">✕</button><div class="game-title">${cfg.icon} ${esc(cfg.title)}</div><div class="game-count">${g.i + 1}/${n}</div></div>
    <div class="progress thin"><i style="width:${(g.i + (g.answered ? 1 : 0)) / n * 100}%"></i></div>
    ${cfg.timer ? `<div class="timer"><i id="qTimer"></i><span id="qTimerN"></span></div>` : ''}
    ${duel}
    <div class="q-card card ${fb}">
      ${q.pid ? `<div class="turn-tag">Ход: ${profById(q.pid).avatar} ${esc(profById(q.pid).name)}</div>` : ''}
      ${q.sub ? `<div class="q-sub">${esc(q.sub)}</div>` : ''}
      <div class="q-prompt ${q.big ? 'emoji-big' : ''}">${q.big || q.listen || !/[A-Za-z]/.test(q.prompt) || q.tag && q.tag.word ? fmtBlank(q.prompt) : clickEn(q.prompt).replace(/___/g, '<span class="blank">____</span>')}</div>
      ${q.listen ? `<button class="btn ghost speak-btn" data-act="say" data-arg="${esc(q.listen)}">🔊 Послушать ещё раз</button>` : q.say && !q.sayAfter ? `<button class="icon-btn say" data-act="say" data-arg="${esc(q.say)}">🔊</button>` : ''}
      ${body}
    </div>${expl}</div>`;
}
function charLine(ok) { const cs = THEMES.blade.chars, c = cs[(UI.game ? UI.game.i : 0) % cs.length]; const ln = ok ? c[3][1 + (UI.game.i % 2)] : c[3][0 + (UI.game.i % 2 ? 1 : 0)]; return `<div class="char-line"><span>${c[0]}</span><div><b>${c[1]}</b>${esc(ln)}</div></div>`; }
const qText = q => q.kind === 'error' ? q.toks.join(' ') : q.kind === 'builder' ? q.prompt : q.listen ? '🎧 ' + q.listen : q.prompt;
const fmtBlank = s => esc(s).replace(/___/g, '<span class="blank">____</span>');

/* ---------- Мнемо-карточки (Flashcards + SRS) ---------- */
function runFlash(opt = {}) {
  const p = P();
  let queue;
  if (opt.words) queue = opt.words.map(id => ({ id, learn: !p.words.find(w => w.id === id).stage }));
  else {
    const nw = newPool(p).slice(0, newLeft(p)).map(w => ({ id: w.id, learn: true }));
    const dw = shuffle(dueWords(p)).slice(0, 40).map(w => ({ id: w.id, learn: false }));
    queue = nw.concat(dw);
  }
  if (!queue.length) {
    if (opt.step != null) { completeStep(opt.step); save(); render(); toast('Все слова на сегодня повторены! Отличная работа ✨'); return; }
    return toast('Сейчас нечего повторять — все слова выучены по графику. Добавьте новые слова или загляните завтра!');
  }
  queue = queue.filter(q => { const w = p.words.find(x => x.id === q.id); return w && w.ru; });
  if (!queue.length) return toast('У этих слов нет перевода — добавьте его в разделе «Мои слова»');
  UI.game = { type: 'flash', after: opt.after, afterLabel: opt.afterLabel, queue, i: 0, phase: 0, flipped: false, step: opt.step, start: Date.now(), learned: 0, reviewed: 0, xp: 0, requeued: {} };
  render(); setTimeout(() => { const c = flashCur(); if (c) speak(c.w.en); }, 400);
}
function flashCur() { const g = UI.game; if (!g || g.type !== 'flash') return null; const it = g.queue[g.i]; if (!it) return null; return { it, w: P().words.find(w => w.id === it.id) }; }
function flashNext() {
  const g = UI.game; g.i++; g.phase = 0; g.flipped = false; g.check = null; g.dir = null;
  if (g.i >= g.queue.length) {
    const p = P(); p.timeLog[today()] = (p.timeLog[today()] || 0) + (Date.now() - g.start) / 60000;
    if (g.step != null) completeStep(g.step);
    g.done = true; checkAch(p); save(); render(); return;
  }
  render(); const c = flashCur(); if (c && (c.it.learn || g.dirFor(c) === 'en')) speak(c.w.en);
}
function renderFlash() {
  const g = UI.game, p = P();
  g.dirFor = g.dirFor || (c => (!c.it.learn && c.w.stage >= 3 && c.w.reps % 2) ? 'ru' : 'en');
  if (g.done) return `<div class="game"><div class="game-top"><button class="icon-btn" data-act="closeGame">✕</button><div class="game-title">🧠 Мнемо-карточки</div><div></div></div>
    <div class="result card"><div class="big-emoji">🧠✨</div><h2>${THEMES[p.theme].win}</h2><p class="muted">Новых слов: ${g.learned} · Повторено: ${g.reviewed}</p><div class="xp-earned">+${g.xp + (g.step != null ? 20 : 0)} XP</div>
    <p class="muted small">Слова вернутся по графику: через 1 → 2 → 3 → 7 → 16 → 30 → 60 дней.</p>
    <div class="row center gap">${g.after ? `<button class="btn" data-act="flashAfter">${esc(g.afterLabel || 'Дальше →')}</button>` : `<button class="btn ghost" data-act="closeGame">Готово</button>${g.step != null ? '<button class="btn" data-act="nextStep">Следующий шаг →</button>' : ''}`}</div></div></div>`;
  const { it, w } = flashCur();
  const n = g.queue.length;
  const head = `<div class="game"><div class="game-top"><button class="icon-btn" data-act="closeGame">✕</button><div class="game-title">🧠 ${it.learn ? 'Новое слово' : 'Повторение'}</div><div class="game-count">${g.i + 1}/${n}</div></div><div class="progress thin"><i style="width:${g.i / n * 100}%"></i></div>`;
  const ex = (w.examples || [])[0];
  if (it.learn) {
    const steps = ['Слушай', 'Значение', 'Ассоциация', 'Пример', 'Проверка'];
    const ph = g.phase;
    let inner = '';
    if (ph === 0) inner = `<div class="fc-word">${esc(w.en)}</div><div class="fc-ipa">${esc(w.ipa || '')} ${w.pos ? '· ' + esc(w.pos) : ''}</div><button class="btn ghost" data-act="say" data-arg="${esc(w.en)}">🔊 Послушать</button><p class="muted">Повтори слово вслух 3 раза</p>`;
    if (ph === 1) inner = `<div class="fc-word sm">${esc(w.en)}</div>${w.emoji ? `<div class="big-emoji">${w.emoji}</div>` : ''}<div class="fc-ru">${esc(w.ru)}</div>${w.meaning ? `<p class="muted">${esc(w.meaning)}</p>` : ''}`;
    if (ph === 2) inner = `<div class="fc-word sm">${esc(w.en)} <span class="muted">— ${esc(w.ru)}</span></div>
      <div class="mnemo"><div class="mnemo-h">🧠 Мнемоника: созвучие → яркий образ</div><div>${esc(w.mnemo || 'Для этого слова пока нет ассоциации — придумай свою! Найди русское слово, похожее по звучанию, и свяжи его с переводом в смешную или яркую картинку.')}</div></div>
      ${w.myMnemo ? `<div class="mnemo mine"><div class="mnemo-h">💡 Моя ассоциация</div>${esc(w.myMnemo)}</div>` : ''}
      <form data-form="myMnemo" class="ans-form"><input name="m" placeholder="Своя ассоциация (необязательно)" value=""><button class="btn ghost small">Сохранить</button></form>
      ${AI && !w.mnemo ? `<button class="btn small ghost" data-act="aiMnemo" data-arg="${w.id}">✨ Придумать с AI</button>` : ''}
      <p class="muted small">Закрой глаза на 5 секунд и представь эту картинку как можно ярче.</p>`;
    if (ph === 3) inner = ex ? `<div class="fc-word sm">${esc(w.en)}</div><div class="fc-ex">${esc(ex.en)} <button class="icon-btn" data-act="say" data-arg="${esc(ex.en)}">🔊</button></div><div class="muted">${esc(ex.ru || '')}</div>` : `<div class="fc-word sm">${esc(w.en)}</div><p class="muted">Придумай фразу с этим словом и скажи её вслух.</p>`;
    if (ph === 4) {
      g.check = g.check || shuffle([w.ru].concat(distract(wordPool(p), w, 'ru')));
      inner = `<p class="muted">Что означает…</p><div class="fc-word">${esc(w.en)}</div><div class="opts">${g.check.map(o => { let c = ''; if (g.checked) { if (o === w.ru) c = 'right'; else if (o === g.checked) c = 'wrong'; } return `<button class="opt ${c}" data-act="flashCheck" data-arg="${esc(o)}" ${g.checked ? 'disabled' : ''}>${esc(o)}</button>`; }).join('')}</div>${g.checked ? `<button class="btn wide" data-act="flashLearnDone">Дальше →</button>` : ''}`;
    }
    return head + `<div class="steps-dots">${steps.map((s, i) => `<span class="${i < ph ? 'done' : i === ph ? 'cur' : ''}">${s}</span>`).join('')}</div><div class="card fc learn">${inner}</div>${ph < 4 ? `<button class="btn wide" data-act="flashPhase">${ph === 3 ? 'Я запомнил(а) — проверить' : 'Дальше →'}</button>` : ''}</div>`;
  }
  const dir = g.dirFor({ it, w });
  const front = dir === 'en' ? `<div class="fc-word">${esc(w.en)}</div><div class="fc-ipa">${esc(w.ipa || '')}</div><button class="icon-btn" data-act="say" data-arg="${esc(w.en)}">🔊</button>` : `<div class="fc-word sm">${esc(w.ru)}</div><p class="muted">Вспомни английское слово</p>`;
  const back = `<div class="fc-back">${dir === 'ru' ? `<div class="fc-word">${esc(w.en)}</div>` : `<div class="fc-ru">${esc(w.ru)}</div>`}${w.emoji ? `<div class="big-emoji sm">${w.emoji}</div>` : ''}${(w.myMnemo || w.mnemo) ? `<div class="mnemo small"><div class="mnemo-h">🧠 Ассоциация</div>${esc(w.myMnemo || w.mnemo)}</div>` : ''}${ex ? `<div class="fc-ex sm">${esc(ex.en)}</div>` : ''}</div>`;
  return head + `<div class="card fc">${front}${g.flipped ? back : ''}</div>${g.flipped ? `<div class="rate"><button class="r0" data-act="rate" data-arg="0">😵<br>Не помню</button><button class="r1" data-act="rate" data-arg="1">😬<br>Сложно</button><button class="r2" data-act="rate" data-arg="2">🙂<br>Помню</button><button class="r3" data-act="rate" data-arg="3">😎<br>Легко</button></div>` : `<button class="btn wide" data-act="flip">Показать ответ</button>`}</div>`;
}

/* ---------- Word Match ---------- */
function runMatch(opt = {}) {
  const p = P(), ws = shuffle(introduced(p)).filter((w, i, a) => a.findIndex(x => norm(x.ru) === norm(w.ru)) === i).slice(0, isKid(p) ? 4 : 6);
  if (ws.length < 3) return toast('Нужно больше слов');
  UI.game = { type: 'match', ws, left: shuffle(ws), right: shuffle(ws), sel: null, done: {}, mist: 0, step: opt.step, start: Date.now() };
  render();
}
function renderMatch() {
  const g = UI.game, kid = isKid();
  const all = Object.keys(g.done).length === g.ws.length;
  if (all) {
    return `<div class="game"><div class="game-top"><button class="icon-btn" data-act="closeGame">✕</button><div class="game-title">🧩 Word Match</div><div></div></div><div class="result card"><div class="big-emoji">🧩</div><h2>${THEMES[P().theme].win}</h2><p class="muted">Ошибок: ${g.mist}</p><div class="xp-earned">+${g.ws.length * 5 + (g.step != null ? 20 : 0)} XP</div><div class="row center gap"><button class="btn ghost" data-act="closeGame">Готово</button>${g.step != null ? '<button class="btn" data-act="nextStep">Следующий шаг →</button>' : '<button class="btn" data-act="replayMatch">Ещё раз</button>'}</div></div></div>`;
  }
  const cell = (w, side) => { const id = w.id || w.en; const d = g.done[id]; const s = g.sel && g.sel.side === side && g.sel.id === id; return `<button class="match-c ${d ? 'done' : ''} ${s ? 'sel' : ''} ${g.bad === side + id ? 'shake' : ''}" data-act="matchPick" data-arg="${side}|${esc(id)}" ${d ? 'disabled' : ''}>${side === 'L' ? esc(w.en) : (kid && w.emoji ? w.emoji + ' ' : '') + esc(w.ru)}</button>`; };
  return `<div class="game"><div class="game-top"><button class="icon-btn" data-act="closeGame">✕</button><div class="game-title">🧩 Word Match</div><div class="game-count">${Object.keys(g.done).length}/${g.ws.length}</div></div><p class="muted center">Нажми слово слева, затем его перевод справа</p><div class="match"><div>${g.left.map(w => cell(w, 'L')).join('')}</div><div>${g.right.map(w => cell(w, 'R')).join('')}</div></div></div>`;
}
function matchPick(arg) {
  const g = UI.game, [side, id] = arg.split('|'); const p = P();
  if (!g.sel || g.sel.side === side) { g.sel = { side, id }; if (side === 'L') { const w = g.ws.find(x => (x.id || x.en) === id); speak(w.en); } render(); return; }
  if (g.sel.id === id) { g.done[id] = 1; addXP(5, p, true); const w = g.ws.find(x => (x.id || x.en) === id); if (w.id) wordResult(p, w.id, true); g.sel = null; if (Object.keys(g.done).length === g.ws.length) { if (g.step != null) completeStep(g.step); xpPop(g.ws.length * 5); save(); } }
  else { g.mist++; g.bad = side + id; const w = g.ws.find(x => (x.id || x.en) === g.sel.id); g.sel = null; setTimeout(() => { if (UI.game === g) { g.bad = null; render(); } }, 500); }
  render();
}

/* ---------- Memory ---------- */
function runMemory(opt = {}) {
  const p = P(), kid = isKid(p);
  let ws = shuffle(introduced(p)).slice(0, kid ? 6 : 8);
  if (ws.length < 4) return toast('Нужно больше слов');
  const cards = shuffle(ws.flatMap((w, i) => [{ pair: i, text: w.en, en: w.en }, { pair: i, text: (kid && w.emoji) ? w.emoji : w.ru, emoji: kid && w.emoji }]));
  UI.game = { type: 'memory', cards, open: [], found: {}, moves: 0, ws, step: opt.step };
  render();
}
function renderMemory() {
  const g = UI.game, n = g.ws.length, f = Object.keys(g.found).length;
  if (f === n) return `<div class="game"><div class="game-top"><button class="icon-btn" data-act="closeGame">✕</button><div class="game-title">🃏 Memory</div><div></div></div><div class="result card"><div class="big-emoji">🃏</div><h2>${THEMES[P().theme].win}</h2><p class="muted">Ходов: ${g.moves}</p><div class="xp-earned">+${n * 5 + (g.step != null ? 20 : 0)} XP</div><div class="row center gap"><button class="btn ghost" data-act="closeGame">Готово</button>${g.step != null ? '<button class="btn" data-act="nextStep">Следующий шаг →</button>' : '<button class="btn" data-act="replayMemory">Ещё раз</button>'}</div></div></div>`;
  return `<div class="game"><div class="game-top"><button class="icon-btn" data-act="closeGame">✕</button><div class="game-title">🃏 Memory Game</div><div class="game-count">${f}/${n}</div></div><div class="mem-grid">${g.cards.map((c, i) => { const up = g.open.includes(i) || g.found[c.pair]; return `<button class="mem ${up ? 'up' : ''} ${g.found[c.pair] ? 'found' : ''} ${c.emoji ? 'emo' : ''}" data-act="memFlip" data-arg="${i}">${up ? esc(c.text) : '?'}</button>`; }).join('')}</div></div>`;
}
function memFlip(i) {
  const g = UI.game; i = +i; const c = g.cards[i];
  if (g.found[c.pair] || g.open.includes(i) || g.open.length >= 2) return;
  g.open.push(i); if (c.en) speak(c.en);
  if (g.open.length === 2) {
    g.moves++; const [a, b] = g.open.map(k => g.cards[k]);
    if (a.pair === b.pair) { g.found[a.pair] = 1; g.open = []; addXP(5, P(), true); if (Object.keys(g.found).length === g.ws.length) { if (g.step != null) completeStep(g.step); xpPop(g.ws.length * 5); save(); } }
    else setTimeout(() => { if (UI.game === g) { g.open = []; render(); } }, 900);
  }
  render();
}

/* ---------- Тест уровня ---------- */
function runPlacement(p) {
  UI.noHardInput = true; setTimeout(() => { UI.noHardInput = false; }, 0);
  let qs;
  if (isKid(p)) {
    const pk = kidPack();
    qs = shuffle(pk).slice(0, 4).map(w => qPicture(w, pk)).concat(shuffle(pk).slice(0, 3).map(w => qWordMCQ(w, pk, 'en')), ['tobe', 'have', 'ps', 'pas', 'there'].map(id => qGrammar(TOP[id], pick(TOP[id].items))));
    qs.forEach(q => { if (q.kind !== 'mcq') q.kind = 'mcq'; });
  } else qs = D.PLACEMENT.map(a => ({ kind: 'mcq', prompt: a[0], sub: 'Тест уровня', options: shuffle(a[2]), answer: a[1], explain: '', lvl: a[3] }));
  runQuiz({ title: isKid(p) ? 'Тест: что ты уже знаешь?' : 'Тест уровня', icon: '📏', questions: qs, noXP: true, replay: false, onFinish: r => {
    let lvl; const s = r.score;
    if (isKid(p)) { lvl = s >= 10 ? 'A2' : 'A1'; p.newPerDay = s <= 4 ? 3 : s <= 8 ? 4 : 5; p.kidStart = s <= 4 ? 'beginner' : s <= 8 ? 'basic' : 'good'; }
    else lvl = s <= 4 ? 'A1' : s <= 8 ? 'A2' : s <= 12 ? 'B1' : s <= 15 ? 'B2' : 'C1';
    p.level = lvl; p.tests.push({ date: today(), level: lvl, score: s, total: r.total });
    delete p.plans[today()];
  }, resultHTML: () => isKid(p) ? `<div class="level-badge">${p.kidStart === 'beginner' ? '🌱 Начинаем с самых основ!' : p.kidStart === 'basic' ? '⭐ Ты уже кое-что знаешь!' : '🚀 Отличный результат!'}</div><p class="muted small">Уровень: <b>${p.level}</b>. Программа подстроена под тебя: ${p.newPerDay} новых слова в день.</p>` : `<div class="level-badge">Ваш уровень: <b>${p.level}</b></div><p class="muted small">Программа на сегодня перестроена под этот уровень.</p>` });
}

/* ---------- Каркас и навигация ---------- */
const NAV = [
  ['home', '🏠', 'Главная'], ['vocab', '📚', 'Мои слова'], ['grammar', '🗺️', 'Grammar World'], ['games', '🎮', 'Игры'],
  ['listen', '🎧', 'Аудирование'], ['read', '📖', 'Чтение'], ['ai', '🤖', 'AI Teacher'], ['tasks', '🍎', 'Задания учителя'],
  ['arena', '👨‍👩‍👦', 'Family Arena'], ['progress', '📊', 'Прогресс'], ['ach', '🏆', 'Достижения'], ['settings', '⚙️', 'Настройки']
];
const MOBILE_NAV = ['home', 'vocab', 'grammar', 'games', 'more'];
function navFor(p) {
  let n = NAV;
  if (isKid(p)) n = NAV.filter(x => ['home', 'vocab', 'grammar', 'games', 'read', 'tasks', 'ach', 'settings'].includes(x[0]));
  if (otherProfiles().length && Cloud.role !== 'member') n = n.slice(0, 1).concat([['results', '👦', 'Результаты: ' + otherProfiles().map(q => q.name).join(', ')]], n.slice(1));
  return n;
}
function go(view, arg) { UI.view = view; UI.arg = arg == null ? null : arg; UI.menu = false; render(); window.scrollTo(0, 0); }
function render() {
  const app = $('#app'); if (!app) return;
  UI.needRender = false;
  if (UI.mode === 'teacher') { document.body.dataset.theme = 'quest'; app.innerHTML = Teacher.render() + modalHTML(); return; }
  if (!S || !S.profiles.length) { document.body.dataset.theme = 'quest'; app.innerHTML = viewOnboard(); return; }
  const p = P();
  if (!p) { document.body.dataset.theme = 'quest'; app.innerHTML = `<div class="onboard"><div class="card ob-form" style="max-width:520px;margin:40px auto"><h2>Ваш профиль ещё не создан</h2><p class="muted">Профили детей видны вам как результаты. Создайте свой профиль, чтобы заниматься самой.</p><button class="btn wide" data-act="makeMine">+ Создать мой профиль</button>${otherProfiles().length ? '<button class="btn ghost wide" data-act="go" data-arg="results">👦 Посмотреть результаты</button>' : ''}${window.EQ_SETTINGS_HTML ? window.EQ_SETTINGS_HTML() : ''}</div></div>` + modalHTML(); if (UI.view === 'results') { app.innerHTML = `<div class="content" style="margin:0 auto"><button class="btn ghost small" data-act="makeMine">+ Создать мой профиль</button>${viewResults()}</div>`; } return; }
  document.body.dataset.theme = p.theme || 'quest'; document.body.dataset.kind = p.kind;
  if (!UI.autoTr && UI.mode !== 'teacher' && p.words.some(w => !w.ru)) { UI.autoTr = true; setTimeout(() => translateMissing(true), 1500); }
  if (UI.mode !== 'teacher') S.profiles.filter(canSave).forEach(q => { if (migrateSeeds(q)) setTimeout(() => save(q), 0); });
  if (UI.game) {
    const t = UI.game.type;
    app.innerHTML = (t === 'quiz' ? renderQuiz() : t === 'flash' ? renderFlash() : t === 'match' ? renderMatch() : renderMemory()) + modalHTML();
    if (t === 'quiz') { const inp = $('#qInput'); if (inp && !UI.game.answered) inp.focus(); const nb = $('#nextBtn'); if (nb) nb.focus({ preventScroll: true }); }
    return;
  }
  const V = { results: viewResults, home: viewHome, vocab: viewVocab, grammar: viewGrammar, topic: viewTopic, games: viewGames, listen: viewListen, read: viewRead, reader: viewReader, ai: viewAI, tasks: viewTasks, arena: viewArena, progress: viewProgress, ach: viewAch, settings: viewSettings };
  const body = (V[UI.view] || viewHome)();
  const pending = myTasks(p).filter(t => !Cloud.submissions[t.id]).length;
  app.innerHTML = `
  <aside class="side">
    <div class="brand"><div class="logo">${p.theme === 'hc' ? 'H&C' : p.theme === 'blade' ? '刀' : 'EQ'}</div><div><b>ENGLISH QUEST</b><small>${p.theme === 'hc' ? 'Human &amp; Capital edition' : 'Our Family English Adventure'}</small></div></div>
    <nav>${navFor(p).map(n => `<button class="nav-i ${UI.view === n[0] || (UI.view === 'topic' && n[0] === 'grammar') || (UI.view === 'reader' && n[0] === 'read') ? 'on' : ''}" data-act="go" data-arg="${n[0]}"><span>${n[1]}</span>${n[2]}${n[0] === 'tasks' && pending ? `<em class="badge">${pending}</em>` : ''}${n[0] === 'vocab' && dueWords(p).length ? `<em class="badge soft">${dueWords(p).length}</em>` : ''}</button>`).join('')}</nav>
    <div class="sync" id="syncDot" data-s="${Cloud.status}" title="${esc(syncLabel())}"><i></i><span>${esc(syncLabel(true))}</span></div>
  </aside>
  <main class="main">
    <header class="top">
      <div class="profiles">${myProfiles().map(q => `<button class="pchip ${q.id === p.id ? 'on' : ''}" data-act="switchP" data-arg="${q.id}"><span class="av">${q.avatar}</span><span class="pn">${esc(q.name)}<small>${q.level} · ур. ${levelOf(q.xp)}</small></span></button>`).join('')}</div>
      <div class="stats-mini"><span title="Серия дней">🔥 ${streakNow(p)}</span><span title="XP">⭐ ${p.xp}</span></div>
    </header>
    <div class="content">${body}</div>
  </main>
  <nav class="bottom">${MOBILE_NAV.map(k => { const n = NAV.find(x => x[0] === k) || ['more', '☰', 'Ещё']; return `<button class="${UI.view === k ? 'on' : ''}" data-act="${k === 'more' ? 'menu' : 'go'}" data-arg="${k}"><span>${n[1]}</span><small>${n[2].replace('Grammar World', 'Грамматика').replace('Мои слова', 'Слова')}</small></button>`; }).join('')}</nav>
  ${UI.menu ? `<div class="sheet-bg" data-act="menuClose"></div><div class="sheet">${navFor(p).map(n => `<button class="nav-i" data-act="go" data-arg="${n[0]}"><span>${n[1]}</span>${n[2]}${n[0] === 'tasks' && pending ? `<em class="badge">${pending}</em>` : ''}</button>`).join('')}</div>` : ''}
  ${modalHTML()}`;
}
const sec = (title, inner, extra = '') => `<section class="sec"><div class="sec-h"><h2>${title}</h2>${extra}</div>${inner}</section>`;
const bar = (pct, cls = '') => `<div class="progress ${cls}"><i style="width:${Math.max(0, Math.min(100, pct))}%"></i></div>`;

/* ---------- Онбординг ---------- */
function viewOnboard() {
  const av = (name, sel) => `<div class="av-pick">${AVATARS.map(a => `<label><input type="radio" name="${name}" value="${a}" ${a === sel ? 'checked' : ''}><span>${a}</span></label>`).join('')}</div>`;
  const th = (name, sel) => `<select name="${name}">${Object.entries(THEMES).map(([k, t]) => `<option value="${k}" ${k === sel ? 'selected' : ''}>${t.name} — ${t.desc}</option>`).join('')}</select>`;
  return `<div class="onboard">
   <div class="ob-hero"><div class="logo xl">EQ</div><h1>ENGLISH QUEST</h1><p>Learn together. Play every day. Speak with confidence.</p>
   <div class="chips"><span>👨‍👩‍👦 Для всей семьи</span><span>📅 Ежедневные задания</span><span>🧠 Мнемоника</span><span>🎮 17 игр</span><span>🍎 Кабинет учителя</span></div></div>
   <form data-form="onboard" class="card ob-form">
     <h2>Создадим два профиля</h2>
     <div class="ob-grid">
      <fieldset><legend>👩 Взрослый профиль</legend>
        <label>Имя или никнейм<input name="aName" value="Анна" required maxlength="24"></label>
        <label>Аватар</label>${av('aAv', '🦊')}
        <label>Уровень английского<select name="aLevel"><option value="test">Определить тестом (рекомендую)</option>${LEVELS.slice(0, 5).map(l => `<option ${l === 'A2' ? '' : ''}>${l}</option>`).join('')}</select></label>
        <label>Минут в день<select name="aMin"><option value="20">15–20 минут</option><option value="40">30–45 минут</option><option value="55" selected>45–60 минут</option><option value="75">Больше часа</option></select></label>
        <label>Тема оформления${th('aTheme', 'quest')}</label>
      </fieldset>
      <fieldset><legend>👦 Детский профиль <label class="inline"><input type="checkbox" name="kidOn" checked> добавить</label></legend>
        <label>Имя или никнейм<input name="kName" value="" placeholder="Имя сына" maxlength="24"></label>
        <label>Аватар</label>${av('kAv', '🦁')}
        <label>Возраст<input name="kAge" type="number" min="4" max="17" value="9"></label>
        <label>Минут в день<select name="kMin"><option value="15">10–15 минут</option><option value="25" selected>20–30 минут</option><option value="40">30–45 минут</option></select></label>
        <label>Тема оформления${th('kTheme', 'kids')}</label>
      </fieldset>
     </div>
     <button class="btn big wide">Начать приключение 🚀</button>
     <p class="muted small center">Всё можно изменить позже в настройках. В каждый профиль уже добавлены стартовые слова с мнемониками.</p>
   </form></div>`;
}

/* ---------- Главная ---------- */
function viewHome() {
  const p = P(), pl = planFor(p), th = THEMES[p.theme], lp = levelProgress(p.xp);
  const done = pl.steps.filter(s => s.done).length, nxt = pl.steps.findIndex(s => !s.done);
  const ws = weekStart(); let wDone = 0; for (let i = 0; i < 7; i++) { const x = p.plans[addDays(ws, i)]; if (x) wDone += x.steps.filter(s => s.done).length / x.steps.length; }
  const weekPct = Math.round(wDone / 7 * 100);
  const due = dueWords(p).length;
  const wd = wotd(p);
  const lastTest = p.tests.length ? p.tests[p.tests.length - 1].date : null;
  const tasks = myTasks(p).filter(t => !Cloud.submissions[t.id]);
  if (isKid(p) && !p.tests.length) return `<div class="hero card"><div class="hero-l"><div class="hello">Hello, ${esc(p.name)}! ${p.avatar}</div><div class="muted">Давай познакомимся! Ответь на 12 вопросов — так я узнаю, что ты уже знаешь, и подберу задания именно для тебя.</div></div></div><div class="card center"><div class="big-emoji">🎯</div><h2>Сначала маленький тест</h2><p class="muted">Это не экзамен — ошибаться можно! Картинки, слова и чуть-чуть грамматики.</p><button class="btn big" data-act="game" data-arg="placement">Начать тест 🚀</button></div>`;
  const lastAch = Object.entries(p.ach).sort((a, b) => a[1] < b[1] ? 1 : -1).slice(0, 4);
  return `
  <div class="hero card">
    <div class="hero-l"><div class="hello">Hello, ${esc(p.name)}! ${p.theme === 'blade' ? '⚔️' : '👋'}</div><div class="muted">${esc(th.hello)}</div>
      <div class="rank">${esc(rankOf(p))} · уровень ${lp.n} · ${p.level}</div>${bar(lp.pct, 'lvl')}<div class="muted small">${lp.left} XP до уровня ${lp.n + 1}</div></div>
    <div class="hero-stats">
      <div class="hs"><b>⭐ ${p.xp}</b><span>XP</span></div>
      <div class="hs"><b>🔥 ${streakNow(p)}</b><span>дней подряд</span></div>
      <div class="hs"><b>${weekPct}%</b><span>недельный план</span></div>
    </div>
  </div>
  ${!lastTest && !isKid(p) && p.xp < 50 ? `<div class="notice">📏 Пройдите короткий тест уровня — программа подстроится под вас. <button class="btn small" data-act="game" data-arg="placement">Пройти тест</button></div>` : lastTest && daysBetween(lastTest, today()) >= 30 ? `<div class="notice">📏 Прошло 30 дней — пора проверить, насколько вырос ваш уровень! <button class="btn small" data-act="game" data-arg="placement">Проверить уровень</button></div>` : ''}
  ${p.theme === 'blade' ? (() => { const cs = THEMES.blade.chars; const n = parseInt(hash(today()), 10); const c = cs[n % cs.length]; return `<div class="chars card"><div class="chars-row">${cs.map(x => `<div class="char ${x === c ? 'on' : ''}"><span>${x[0]}</span><b>${x[1]}</b><small>${x[2]}</small></div>`).join('')}</div><div class="char-say">${c[0]} <b>${c[1]}:</b> «${esc(c[3][n % c[3].length])}»</div></div>`; })() : ''}
  <div class="home-grid">
    <div>
      ${sec(`Today's mission <span class="pill">${done} / ${pl.steps.length}</span>`, `
        ${bar(done / pl.steps.length * 100)}
        <div class="path">${pl.steps.map((s, i) => { const inf = stepInfo(s); return `<div class="node ${s.done ? 'done' : i === nxt ? 'cur' : ''}"><div class="n-num">${s.done ? '✓' : String(i + 1).padStart(2, '0')}</div><div class="n-ico">${inf.icon}</div><div class="n-t"><b>${esc(inf.title)}</b><small>${esc(inf.sub)}</small></div><button class="btn ${s.done ? 'ghost' : ''} small" data-act="step" data-arg="${i}">${s.done ? 'Ещё раз' : i === nxt ? 'Начать' : 'Открыть'}</button></div>`; }).join('')}</div>
        <div class="row gap wrap">${nxt >= 0 ? `<button class="btn big" data-act="step" data-arg="${nxt}">▶ Продолжить обучение</button>` : `<div class="done-msg">🎉 Вся программа на сегодня выполнена!</div>`}<button class="btn ghost" data-act="game" data-arg="short">⏱️ Мало времени? Короткий Challenge</button></div>
        <p class="muted small">Пропустили день? Ничего страшного — задания не копятся, а повторение слов само распределится на ближайшие дни.</p>
      `)}
    </div>
    <div class="col-cards">
      ${tasks.length ? `<div class="card mini accent-card" data-act="go" data-arg="tasks"><div class="mini-h">🍎 Задания учителя</div><b>${plural(tasks.length, ['новое задание', 'новых задания', 'новых заданий'])}</b><div class="muted small">${esc(tasks[0].title)}</div></div>` : ''}
      <div class="card mini"><div class="mini-h">🔁 На повторение</div><b class="big-n">${due}</b><div class="muted small">${plural(due, ['слово ждёт', 'слова ждут', 'слов ждут'])} повторения</div>${due ? `<button class="btn small" data-act="game" data-arg="flash">Повторить</button>` : ''}</div>
      <div class="card mini wotd"><div class="mini-h">✨ Слово дня</div><div class="w-big">${esc(wd.en)} <button class="icon-btn" data-act="say" data-arg="${esc(wd.en)}">🔊</button></div><div>${wd.emoji || ''} ${esc(wd.ru)}</div>${wd.ex ? `<div class="muted small">${esc(wd.ex)}</div>` : ''}${p.words.some(w => norm(w.en) === norm(wd.en)) ? '<div class="muted small">✓ уже в словаре</div>' : `<button class="btn small ghost" data-act="addWotd">+ В мой словарь</button>`}</div>
      ${S.profiles.length > 1 && !isKid(p) ? `<div class="card mini" data-act="go" data-arg="arena"><div class="mini-h">👨‍👩‍👦 Семейный рейтинг недели</div>${famBoard()}</div>` : ''}
      <div class="card mini"><div class="mini-h">🏆 Последние достижения</div>${lastAch.length ? `<div class="ach-row">${lastAch.map(([id]) => { const a = D.ACH.find(x => x[0] === id); return a ? `<span title="${esc(a[2])}">${a[1]}</span>` : ''; }).join('')}</div>` : '<div class="muted small">Первое достижение совсем близко!</div>'}</div>
    </div>
  </div>`;
}
function wotd(p) {
  if (isKid(p)) { const a = D.KID_WORDS[parseInt(hash(today() + 'k'), 10) % D.KID_WORDS.length]; return { en: a[0], ru: a[1], ex: a[6], emoji: a[8] }; }
  const a = D.WOTD[parseInt(hash(today()), 10) % D.WOTD.length]; return { en: a[0], ru: a[1], ex: a[2] };
}
function weekXP(p, ws = weekStart()) { let s = 0; for (let i = 0; i < 7; i++) s += p.xpLog[addDays(ws, i)] || 0; return s; }
function famBoard() { const arr = S.profiles.map(p => ({ p, x: weekXP(p) })).sort((a, b) => b.x - a.x); const mx = Math.max(1, ...arr.map(a => a.x)); return arr.map((a, i) => `<div class="fb-row"><span>${i === 0 && a.x ? '👑' : ''}${a.p.avatar} ${esc(a.p.name)}</span>${bar(a.x / mx * 100, 'sm')}<b>${a.x}</b></div>`).join(''); }

/* ---------- Мои слова ---------- */
function allCats(p) { const base = isKid(p) ? D.CATS_KID : D.CATS_ADULT; return base.concat(S.family.cats || [], p.words.map(w => w.cat)).filter((v, i, a) => v && a.indexOf(v) === i); }
function viewVocab() {
  const p = P(), f = UI.vocab, sm = wordSummary(p);
  let ws = p.words.slice().sort((a, b) => (b.added > a.added ? 1 : b.added < a.added ? -1 : 0));
  if (f.q) ws = ws.filter(w => norm(w.en + ' ' + w.ru).includes(norm(f.q)));
  if (f.cat) ws = ws.filter(w => w.cat === f.cat);
  if (f.status) ws = ws.filter(w => wStatus(w) === f.status);
  return `${sec('📚 My Vocabulary', `
    <div class="stat-chips">${['new', 'learning', 'review', 'mastered'].map(k => `<button class="schip s-${k} ${f.status === k ? 'on' : ''}" data-act="vStatus" data-arg="${k}"><b>${sm[k]}</b>${ST_LABEL[k]}</button>`).join('')}</div>
    <div class="row gap wrap"><button class="btn" data-act="modal" data-arg="addWord">+ Добавить слово</button><button class="btn ghost" data-act="modal" data-arg="import">📊 Из таблицы / списком</button><button class="btn ghost" data-act="exportXlsx">⬇ Скачать словарь (Excel)</button>${dueWords(p).length ? `<button class="btn ghost" data-act="game" data-arg="flash">🔁 Повторить (${dueWords(p).length})</button>` : ''}<button class="btn ghost" data-act="game" data-arg="flash">🧠 Учить новые</button>${AI ? `<button class="btn ghost" data-act="game" data-arg="aiwords">✨ AI-упражнения по моим словам</button>` : ''}</div>
    ${p.words.some(w => !w.ru) ? `<div class="notice">⚠️ У ${plural(p.words.filter(w => !w.ru).length, ['слова', 'слов', 'слов'])} нет перевода — они не попадут в упражнения, пока вы его не добавите. Можно перевести их автоматически. <button class="btn small" data-act="translateMissing" ${UI.translating ? 'disabled' : ''}>🌐 Перевести автоматически</button> <span class="small muted" id="trProgress">${UI.translating ? 'Перевожу…' : ''}</span></div>` : ''}
    <div class="filters"><input placeholder="🔍 Поиск слова…" data-input="vq" value="${esc(f.q)}"><select data-change="vcat"><option value="">Все категории</option>${allCats(p).map(c => `<option ${c === f.cat ? 'selected' : ''}>${esc(c)}</option>`).join('')}</select></div>
    <div class="words">${ws.length ? ws.map(w => `<div class="wcard" data-act="word" data-arg="${w.id}"><div class="wc-top"><b>${w.emoji ? w.emoji + ' ' : ''}${esc(w.en)}</b><span class="st s-${wStatus(w)}">${ST_LABEL[wStatus(w)]}</span></div><div class="muted">${w.ru ? esc(w.ru) : '<span class="bad-t">⚠️ добавьте перевод</span>'}</div><div class="wc-b"><span class="cat">${esc(w.cat)}</span>${w.own ? '<span class="cat own">моё</span>' : ''}${(w.myMnemo || w.mnemo) ? '<span title="Есть мнемоника">🧠</span>' : ''}</div></div>`).join('') : '<p class="muted">Ничего не найдено.</p>'}</div>
  `, `<span class="muted">${sm.total} слов</span>`)}`;
}
function wordModal(w) {
  const p = P(), ex = w.examples || [];
  return `<div class="m-word"><div class="mw-h"><div><div class="fc-word">${w.emoji ? w.emoji + ' ' : ''}${esc(w.en)}</div><div class="fc-ipa">${esc(w.ipa)} ${w.pos ? '· ' + esc(w.pos) : ''}</div></div><button class="icon-btn" data-act="say" data-arg="${esc(w.en)}">🔊</button></div>
  <div class="fc-ru">${esc(w.ru)}</div>${w.meaning ? `<p>${esc(w.meaning)}</p>` : ''}
  <div class="mnemo"><div class="mnemo-h">🧠 Мнемоника</div>${w.mnemo ? esc(w.mnemo) : '<span class="muted">Нет ассоциации</span>'}${AI ? ` <button class="btn small ghost" data-act="aiMnemo" data-arg="${w.id}">✨ ${w.mnemo ? 'Другая' : 'Придумать'} с AI</button>` : ''}</div>
  <form data-form="myMnemoW" data-arg="${w.id}" class="ans-form"><input name="m" placeholder="💡 Моя ассоциация" value="${esc(w.myMnemo)}"><button class="btn small ghost">Сохранить</button></form>
  ${ex.length ? `<h4>Примеры</h4>${ex.map(e => `<div class="ex"><span>${esc(e.en)}</span> <button class="icon-btn sm" data-act="say" data-arg="${esc(e.en)}">🔊</button><div class="muted small">${esc(e.ru || '')}</div></div>`).join('')}` : ''}
  ${w.senses ? `<h4>Значения</h4><p class="small">${esc(w.senses)}</p>` : ''}
  ${w.syn && w.syn.length ? `<div class="small"><b>Синонимы:</b> ${esc(w.syn.join(', '))}</div>` : ''}${w.ant && w.ant.length ? `<div class="small"><b>Антонимы:</b> ${esc(w.ant.join(', '))}</div>` : ''}${w.coll && w.coll.length ? `<div class="small"><b>Словосочетания:</b> ${esc(w.coll.join(' · '))}</div>` : ''}
  <div class="muted small mt">Категория: ${esc(w.cat)} · Статус: ${ST_LABEL[wStatus(w)]}${w.due ? ' · Повторение: ' + fmtDate(w.due) : ''} · Добавлено ${fmtDate(w.added)}</div>
  <div class="row gap wrap mt"><button class="btn" data-act="trainWord" data-arg="${w.id}">🎯 Тренировать это слово</button>${!w.stage ? `<button class="btn ghost" data-act="learnWord" data-arg="${w.id}">🧠 Выучить сейчас</button>` : ''}${AI ? `<button class="btn ghost" data-act="aiFillExisting" data-arg="${w.id}">✨ Дополнить с AI</button>` : ''}<button class="btn ghost" data-act="modal" data-arg="editWord:${w.id}">✏️ Изменить</button><button class="btn ghost danger" data-act="delWord" data-arg="${w.id}">Удалить</button></div></div>`;
}
function wordForm(w) {
  const p = P(); w = w || mkWord({ cat: allCats(p)[0] });
  const ex = (w.examples || []).map(e => e.en + (e.ru ? ' | ' + e.ru : '')).join('\n');
  return `<form data-form="saveWord" data-arg="${w.id}" class="wform"><h3>${w.en ? 'Изменить слово' : 'Новое слово'}</h3>
  <div class="row gap"><label class="grow">Слово / фраза (EN)<input name="en" required value="${esc(w.en)}" placeholder="to postpone"></label>${AI ? `<button type="button" class="btn ghost ai-fill" data-act="aiFill">✨ Заполнить с AI</button>` : ''}</div>
  <div class="ai-status" id="aiFillStatus"></div>
  <label>Перевод${AI ? ' (AI заполнит сам)' : ''}<input name="ru" value="${esc(w.ru)}" placeholder="откладывать, переносить"></label>
  <div class="row gap"><label class="grow">Категория<select name="cat">${allCats(p).map(c => `<option ${c === w.cat ? 'selected' : ''}>${esc(c)}</option>`).join('')}<option value="__new">+ Новая категория…</option></select></label><label class="grow">Тип<select name="type">${[['word', 'Слово'], ['phrase', 'Фраза'], ['idiom', 'Идиома'], ['phrasal', 'Фразовый глагол'], ['sentence', 'Предложение']].map(t => `<option value="${t[0]}" ${t[0] === w.type ? 'selected' : ''}>${t[1]}</option>`).join('')}</select></label></div>
  <label class="newcat hidden">Название новой категории<input name="newcat" placeholder="Например: Мой проект"></label>
  <div class="row gap"><label class="grow">Транскрипция<input name="ipa" value="${esc(w.ipa)}" placeholder="/pəˈspəʊn/"></label><label class="grow">Часть речи<input name="pos" value="${esc(w.pos)}" placeholder="verb"></label><label style="max-width:90px">Эмодзи<input name="emoji" value="${esc(w.emoji)}"></label></div>
  <label>Объяснение значения<textarea name="meaning" rows="2">${esc(w.meaning)}</textarea></label>
  <label>🧠 Мнемоника (созвучие + образ)<textarea name="mnemo" rows="2" placeholder="пост-ПОУН ≈ «ПОСТ на ПОНедельник»: встречу переносят на понедельник">${esc(w.mnemo)}</textarea></label>
  <label>Примеры (каждый с новой строки: English | перевод)<textarea name="ex" rows="3">${esc(ex)}</textarea></label>
  <div class="row gap"><label class="grow">Синонимы<input name="syn" value="${esc((w.syn || []).join(', '))}"></label><label class="grow">Антонимы<input name="ant" value="${esc((w.ant || []).join(', '))}"></label></div>
  <label>Словосочетания<input name="coll" value="${esc((w.coll || []).join(', '))}"></label>
  <input type="hidden" name="senses" value="${esc(w.senses || '')}">
  <div class="row gap"><button class="btn">Сохранить</button><button type="button" class="btn ghost" data-act="modalClose">Отмена</button></div></form>`;
}
function importForm() {
  const p = P();
  return `<form data-form="import"><h3>Добавить слова из таблицы или списка</h3>
  <div class="card soft"><b>📊 Загрузить таблицу</b> <span class="muted small">Excel (.xlsx), CSV или таблица Google (Файл → Скачать → .xlsx или .csv)</span>
   <p class="muted small">Колонки по порядку: <b>English</b> | <b>Перевод</b> | Категория | Пример | Перевод примера. Обязательна только первая колонка. Строка с заголовками распознаётся сама.</p>
   <div class="row gap wrap"><input type="file" id="impFile" accept=".xlsx,.xls,.csv,.tsv,.txt" style="max-width:340px"><button type="button" class="btn small ghost" data-act="tplDownload">⬇ Скачать шаблон таблицы</button></div>
   <div class="ai-status" id="impFileInfo"></div></div>
  <p class="muted small mt">…или вставь список: каждое слово с новой строки <code>word - перевод</code>. Можно скопировать две колонки прямо из Excel или Google Таблиц и вставить сюда.</p>
  <textarea name="list" rows="7" placeholder="recruitment - подбор персонала&#10;candidate - кандидат&#10;to postpone"></textarea>
  <label>Категория (для слов, где она не указана)<select name="cat">${allCats(p).map(c => `<option>${esc(c)}</option>`).join('')}</select></label>
  ${AI ? '<label class="inline"><input type="checkbox" name="ai" checked> Дополнить слова через AI (перевод, мнемоника, примеры)</label>' : ''}
  <div class="ai-status" id="impStatus"></div>
  <div class="row gap"><button class="btn">Добавить слова</button><button type="button" class="btn ghost" data-act="modalClose">Отмена</button></div></form>`;
}
/* ---------- Таблицы: импорт и экспорт ---------- */
let XLSXlib = null;
function loadXLSX() {
  if (window.XLSX) return Promise.resolve(window.XLSX);
  if (XLSXlib) return XLSXlib;
  XLSXlib = new Promise((res, rej) => { const s = document.createElement('script'); s.src = 'https://cdnjs.cloudflare.com/ajax/libs/xlsx/0.18.5/xlsx.full.min.js'; s.onload = () => res(window.XLSX); s.onerror = () => { XLSXlib = null; rej(new Error('xlsx')); }; document.head.appendChild(s); });
  return XLSXlib;
}
function parseDelimited(text) {
  const lines = text.replace(/^\ufeff/, '').split(/\r?\n/).filter(l => l.trim());
  const first = lines[0] || '';
  const d = first.includes('\t') ? '\t' : (first.split(';').length > first.split(',').length ? ';' : ',');
  return lines.map(l => { const out = []; let cur = '', q = false; for (let i = 0; i < l.length; i++) { const c = l[i]; if (c === '"') { if (q && l[i + 1] === '"') { cur += '"'; i++; } else q = !q; } else if (c === d && !q) { out.push(cur); cur = ''; } else cur += c; } out.push(cur); return out.map(x => x.trim()); });
}
async function readTableFile(file) {
  const name = file.name.toLowerCase();
  if (/\.(xlsx|xls)$/.test(name)) { const X = await loadXLSX(); const wb = X.read(await file.arrayBuffer(), { type: 'array' }); const ws = wb.Sheets[wb.SheetNames[0]]; return X.utils.sheet_to_json(ws, { header: 1, defval: '', raw: false }).map(r => r.map(c => String(c).trim())); }
  return parseDelimited(await file.text());
}
function rowsToWords(rows) {
  rows = rows.filter(r => r.some(c => c));
  if (!rows.length) return [];
  const h = rows[0].map(c => c.toLowerCase());
  const find = (...keys) => h.findIndex(c => keys.some(k => c.includes(k)));
  let map = { en: 0, ru: 1, cat: 2, ex: 3, exru: 4 };
  const isHeader = h.some(c => /english|англ|word|слово|перевод|translation|категор|category/.test(c));
  if (isHeader) {
    const en = find('english', 'англ', 'word', 'слово'), ru = find('перевод', 'translation', 'russian', 'рус');
    map = { en: en >= 0 ? en : 0, ru: ru >= 0 && ru !== en ? ru : 1, cat: find('категор', 'category', 'тема', 'topic'), ex: find('пример', 'example'), exru: h.findIndex((c, i) => /перевод примера|example translation/.test(c)) };
    if (map.exru === map.ru) map.exru = -1; if (map.ex === map.exru) map.ex = find('example');
    rows = rows.slice(1);
  }
  return rows.map(r => ({ en: r[map.en] || '', ru: map.ru >= 0 ? r[map.ru] || '' : '', cat: map.cat >= 0 ? r[map.cat] || '' : '', ex: map.ex >= 0 ? r[map.ex] || '' : '', exru: map.exru >= 0 ? r[map.exru] || '' : '' })).filter(x => x.en && x.en.length < 120);
}
async function importWords(items, defCat, useAI) {
  const p = P(), added = []; let skipped = 0;
  items.slice(0, 1000).forEach(x => {
    const en = x.en.trim(); if (!en) return;
    const ex = p.words.find(w => norm(w.en) === norm(en));
    if (ex) { if (!ex.ru && x.ru) { ex.ru = x.ru; added.push(ex); } else skipped++; return; }
    const cat = x.cat || defCat;
    if (x.cat && !allCats(p).includes(x.cat)) S.family.cats = (S.family.cats || []).concat([x.cat]);
    const w = mkWord({ en, ru: (x.ru || '').trim(), cat, own: true, examples: x.ex ? [{ en: x.ex, ru: x.exru || '' }] : [] });
    p.words.unshift(w); added.push(w);
  });
  save(); toast(`Добавлено слов: ${added.length}${skipped ? ` · уже были в словаре: ${skipped}` : ''}`);
  if (useAI && AI && added.length) {
    const st = $('#impStatus');
    for (let i = 0; i < added.length; i++) { if (st) st.textContent = `✨ AI дополняет слова: ${i + 1} / ${added.length}…`; try { await aiFillWord(added[i]); if (i % 5 === 4) save(); } catch (e) { if (e && (e.code === 'not_granted' || e.code === 'rate_limited')) break; } }
  }
  if (!(useAI && AI)) { const need = added.filter(w => !w.ru); const st = $('#impStatus'); for (let i = 0; i < need.length; i++) { if (st) st.textContent = `🌐 Перевожу: ${i + 1} / ${need.length}…`; await freeFill(need[i]); if (i % 5 === 4) save(); } }
  const noRu = added.filter(w => !w.ru).length;
  if (noRu) toast(`У ${noRu} слов нет перевода — добавьте его, чтобы они попали в упражнения`);
  UI.modal = null; checkAch(p); save(); render();
}
function downloadBlob(blob, name) { try { const a = document.createElement('a'); a.href = URL.createObjectURL(blob); a.download = name; document.body.appendChild(a); a.click(); setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000); return true; } catch (e) { return false; } }
async function exportTable(rows, name) {
  try { const X = await loadXLSX(); const ws = X.utils.aoa_to_sheet(rows); ws['!cols'] = rows[0].map((_, i) => ({ wch: i === 0 || i === 1 ? 24 : 30 })); const wb = X.utils.book_new(); X.utils.book_append_sheet(wb, ws, 'Words'); const out = X.write(wb, { bookType: 'xlsx', type: 'array' }); if (downloadBlob(new Blob([out], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }), name + '.xlsx')) return; }
  catch (e) { }
  const csv = '\ufeff' + rows.map(r => r.map(c => /[",;\n]/.test(String(c)) ? '"' + String(c).replace(/"/g, '""') + '"' : c).join(';')).join('\n');
  if (!downloadBlob(new Blob([csv], { type: 'text/csv;charset=utf-8' }), name + '.csv')) openModal('exportWords');
}
function wordsTableRows(p) {
  return [['English', 'Перевод', 'Категория', 'Транскрипция', 'Статус', 'Пример', 'Перевод примера', 'Мнемоника', 'Моя ассоциация', 'Добавлено', 'Следующее повторение']].concat(
    p.words.map(w => [w.en, w.ru, w.cat, w.ipa || '', ST_LABEL[wStatus(w)], (w.examples[0] || {}).en || '', (w.examples[0] || {}).ru || '', w.mnemo || '', w.myMnemo || '', w.added || '', w.due || '']));
}
/* ---------- Бесплатный автоперевод (без AI) ---------- */
const MM = q => 'https://api.mymemory.translated.net/get?q=' + encodeURIComponent(q) + '&langpair=en|ru';
const badTr = x => !x || /[A-Za-z]{3,}/.test(x) || x.length > 60;
async function freeFill(w) {
  const q = w.en.trim(); if (!q) return false;
  if (!w.ru) {
    try {
      const d = await (await fetch(MM(q))).json();
      const cand = [((d.responseData || {}).translatedText) || ''].concat((d.matches || []).filter(m => norm(m.segment) === norm(q)).sort((a, b) => (b.quality || 0) - (a.quality || 0)).map(m => m.translation || ''));
      const out = [];
      cand.forEach(x => { x = String(x).trim().replace(/[.!]+$/, ''); if (badTr(x)) return; if (q === q.toLowerCase()) x = x.charAt(0).toLowerCase() + x.slice(1); if (!out.some(y => y.toLowerCase() === x.toLowerCase())) out.push(x); });
      if (out.length) w.ru = out.slice(0, 3).join(', ');
    } catch (e) { }
  }
  if (!q.includes(' ') && (!w.ipa || !w.examples.length)) {
    try {
      const r = await fetch('https://api.dictionaryapi.dev/api/v2/entries/en/' + encodeURIComponent(q.toLowerCase()));
      if (r.ok) {
        const e = (await r.json())[0] || {}; const ms = e.meanings || [];
        if (!w.ipa) w.ipa = e.phonetic || ((e.phonetics || []).find(x => x.text) || {}).text || '';
        if (!w.pos && ms[0]) w.pos = ms[0].partOfSpeech || '';
        if (!w.meaning && ms[0] && ms[0].definitions && ms[0].definitions[0]) w.meaning = '(EN) ' + ms[0].definitions[0].definition;
        if (!w.examples.length) { const ex = ms.flatMap(m => m.definitions || []).find(x => x.example && x.example.length < 140); if (ex) { const ee = { en: ex.example, ru: '' }; try { const d2 = await (await fetch(MM(ex.example))).json(); const t = ((d2.responseData || {}).translatedText) || ''; if (!/[A-Za-z]{4,}/.test(t)) ee.ru = t; } catch (e2) { } w.examples = [ee]; } }
        const syn = ms.flatMap(m => m.synonyms || []).slice(0, 3); if (!w.syn.length && syn.length) w.syn = syn;
      }
    } catch (e) { }
  }
  return !!w.ru;
}
async function autoFill(w) { if (AI) { try { await aiFillWord(w); if (w.ru) return true; } catch (e) { } } return freeFill(w); }
async function ensureTranslations(ids) { const p = P(); const ws = ids.map(id => p.words.find(w => w.id === id)).filter(w => w && !w.ru); for (const w of ws) await autoFill(w); if (ws.length) save(); return ids.filter(id => { const w = p.words.find(x => x.id === id); return w && w.ru; }); }
async function translateMissing(silent) {
  const p = P(), ws = p.words.filter(w => !w.ru); if (!ws.length || UI.translating) return;
  if (silent) toast(`🌐 Перевожу слова без перевода: ${ws.length}…`);
  UI.translating = true; let ok = 0;
  for (let i = 0; i < ws.length; i++) { const el = $('#trProgress'); if (el) el.textContent = `Перевожу: ${i + 1} / ${ws.length}…`; if (await autoFill(ws[i])) ok++; if (i % 5 === 4) save(); }
  UI.translating = false; save(); render();
  toast(ok ? `🌐 Переведено слов: ${ok}${ok < ws.length ? ` · не удалось: ${ws.length - ok} (добавьте вручную)` : ''}` : 'Не удалось получить переводы — проверьте интернет или добавьте вручную');
}
const clickEn = text => esc(text).replace(/[A-Za-z][A-Za-z'’-]*/g, m => `<span class="rw" data-act="rword" data-arg="${m.replace(/[’']s$/, '')}">${m}</span>`);
function pendingFor(key) { return UI.pending && UI.pending.key === key ? UI.pending.ids : []; }
function markPending(key, id) { if (!UI.pending || UI.pending.key !== key) UI.pending = { key, ids: [] }; if (!UI.pending.ids.includes(id)) UI.pending.ids.push(id); }
async function learnPending(key, after) {
  const ids = pendingFor(key); if (!ids.length) return after();
  toast('🌐 Готовлю карточки…');
  const ready = await ensureTranslations(ids);
  UI.pending = null;
  if (!ready.length) { toast('Не удалось перевести слова — добавьте перевод вручную в «Моих словах»'); return after(); }
  runFlash({ words: ready, after, afterLabel: 'Дальше к заданиям →' });
}
async function aiWordData(en, p = P()) {
  const prompt = `Ты — помощник в приложении для изучения английского. Ученик: ${learnerDesc(p)}, родной язык русский.
Слово или выражение: "${en}".
Верни JSON-объект с полями:
"ru" — основной перевод на русский (кратко, 1–3 варианта через запятую),
"ipa" — британская транскрипция IPA в слэшах,
"pos" — часть речи по-английски (noun, verb, adjective, phrase…),
"meaning" — простое объяснение значения по-русски (1 предложение),
"senses" — если у слова несколько важных значений, кратко перечисли их по-русски с контекстом; иначе пустая строка,
"mnemo" — мнемоника методом ключевых слов: найди русское слово или фразу, СОЗВУЧНЫЕ английскому слову (выдели созвучие ЗАГЛАВНЫМИ буквами), и придумай короткий яркий, смешной образ, который связывает это созвучие со значением. 1–2 предложения${isKid(p) ? ', понятно ребёнку' : ''},
"examples" — массив из 3 объектов {"en","ru"}: простые примеры уровня ${p.level}${isKid(p) ? ' для ребёнка' : ', один из деловой жизни'},
"syn" — до 3 синонимов, "ant" — до 2 антонимов, "coll" — до 4 типичных словосочетаний,
"emoji" — один подходящий эмодзи или пустая строка.`;
  const r = await askJSON(prompt);
  return { ru: r.ru || '', ipa: r.ipa || '', pos: r.pos || '', meaning: r.meaning || '', senses: r.senses || '', mnemo: r.mnemo || '', examples: (r.examples || []).filter(e => e && e.en).slice(0, 3).map(e => ({ en: String(e.en), ru: String(e.ru || '') })), syn: (r.syn || []).slice(0, 3).map(String), ant: (r.ant || []).slice(0, 2).map(String), coll: (r.coll || []).slice(0, 4).map(String), emoji: r.emoji || '' };
}

/* ---------- Grammar World ---------- */
function viewGrammar() {
  const p = P(), kid = isKid(p);
  const cols = ['Simple', 'Continuous', 'Perfect', 'Perfect Continuous'], rows = ['Present', 'Past', 'Future'];
  const tcell = t => { const st = p.topics[t.id]; const b = st ? st.best || 0 : 0; const locked = kid && !t.kid; return `<button class="tcell ${b >= 80 ? 'passed' : ''} ${locked ? 'locked' : ''}" data-act="topic" data-arg="${t.id}"><b>${t.name}</b><small>${esc(t.formula[0][1].split('•')[0].trim())}</small><span class="lvl">${t.level}${b ? ' · ' + b + '%' : ''}${locked ? ' · 🔒 для старших' : ''}</span></button>`; };
  const other = D.TOPICS.filter(t => !t.tense && (!kid || t.kid));
  const focus = focusTopic(p);
  return `${sec('🗺️ Grammar World', `
    <div class="notice soft">🎯 Тема программы сейчас: <b>${TOP[focus].name}</b> — ${esc(TOP[focus].ru)}. <button class="btn small" data-act="topic" data-arg="${focus}">Открыть</button></div>
    <h3>12 времён английского языка</h3>
    <div class="tense-table"><div></div>${cols.map(c => `<div class="th">${c}</div>`).join('')}${rows.map(r => `<div class="th row-h">${r}</div>${cols.map(c => tcell(TENSES.find(t => t.row === r && t.col === c))).join('')}`).join('')}</div>
    <h3>Другие темы грамматики</h3>
    <div class="topic-grid">${other.map(t => { const b = (p.topics[t.id] || {}).best || 0; return `<button class="tgrid ${b >= 80 ? 'passed' : ''}" data-act="topic" data-arg="${t.id}"><b>${t.name}</b><small>${esc(t.ru)}</small><span class="lvl">${t.level}${b ? ' · ' + b + '%' : ''}</span>${bar(b, 'sm')}</button>`; }).join('')}</div>
    <p class="muted small">Каждая тема возвращается в ежедневном Daily Boss: все 12 времён — каждый день, поэтому изученное не забывается.</p>
  `)}`;
}
function viewTopic() {
  const t = TOP[UI.arg], p = P(); if (!t) return viewGrammar();
  const st = p.topics[t.id] || { ok: 0, bad: 0, best: 0 };
  if (!st.seen) { p.topics[t.id] = Object.assign(st, { seen: true }); }
  const ls = UI.lessonStep != null && planFor(p).steps[UI.lessonStep] && planFor(p).steps[UI.lessonStep].topic === t.id && !planFor(p).steps[UI.lessonStep].done;
  return `<button class="btn ghost small" data-act="go" data-arg="${ls ? 'home' : 'grammar'}">← ${ls ? 'Главная' : 'Grammar World'}</button>
  ${ls ? `<div class="notice">📘 <b>Урок дня.</b> Прочитай теорию, послушай примеры и посмотри типичные ошибки. Нажимай на незнакомые английские слова — они попадут в список, и перед заданиями ты сначала их выучишь. ${pendingFor('topic:' + t.id).length ? `<b>Отмечено слов: ${pendingFor('topic:' + t.id).length}</b> (${esc(pendingFor('topic:' + t.id).map(id => (p.words.find(w => w.id === id) || {}).en).join(', '))}). ` : ''}<button class="btn small" data-act="lessonDone">${pendingFor('topic:' + t.id).length ? '🧠 Выучить слова, затем задания' : '✅ Я изучил(а) тему'}</button></div>` : ''}
  <div class="card topic-head"><div><h1>${t.name}</h1><div class="muted">${esc(t.ru)} · уровень ${t.level}</div></div><div class="th-st"><b>${st.best || 0}%</b><small>лучший результат</small>${acc(st) != null ? `<small>точность ${acc(st)}%</small>` : ''}</div></div>
  ${!ls && pendingFor('topic:' + t.id).length ? `<div class="notice">🧠 Отмечено слов: <b>${pendingFor('topic:' + t.id).length}</b>. <button class="btn small" data-act="learnPendingTopic">Выучить их сейчас</button></div>` : ''}
  <div class="row gap wrap"><button class="btn" data-act="gameT" data-arg="battle">⚔️ Grammar Battle</button><button class="btn ghost" data-act="gameT" data-arg="builder">🧱 Собери предложение</button>${t.errors.length ? '<button class="btn ghost" data-act="gameT" data-arg="error">🔍 Найди ошибку</button>' : ''}${AI ? `<button class="btn ghost" data-act="aiTopic" data-arg="${t.id}">🤖 Объясни проще</button>` : ''}</div>
  <div class="topic-body">
    <div class="card"><h3>Что это</h3><p>${esc(t.intro)}</p><h3>Когда используется</h3><ul>${t.use.map(u => `<li>${clickEn(u)}</li>`).join('')}</ul></div>
    <div class="card"><h3>Формула</h3><table class="formula">${t.formula.map(f => `<tr><th>${esc(f[0])}</th><td>${esc(f[1])}</td></tr>`).join('')}</table>${t.markers.length ? `<h3>Слова-маркеры</h3><div class="chips">${t.markers.map(m => `<span>${esc(m)}</span>`).join('')}</div>` : ''}${t.tip ? `<div class="tip">💡 ${esc(t.tip)}</div>` : ''}</div>
    <div class="card"><h3>Примеры с переводом</h3>${t.examples.map(e => `<div class="ex"><span>${clickEn(sentence(e[0]))}</span> <button class="icon-btn sm" data-act="say" data-arg="${esc(sentence(e[0]))}">🔊</button><div class="muted small">${esc(e[1])}</div></div>`).join('')}</div>
    ${t.errors.length ? `<div class="card"><h3>Типичные ошибки</h3>${t.errors.map(e => `<div class="err-ex"><div class="bad-t">✗ ${esc(e[0])}</div><div class="ok-t">✓ ${esc(e[2])}</div><div class="muted small">${esc(e[3])}</div></div>`).join('')}</div>` : ''}
    ${t.compare ? `<div class="card"><h3>Сравнение с похожими временами</h3><p>${esc(t.compare)}</p></div>` : ''}
    <div class="card"><h3>Практика из реальной жизни</h3><p>${t.tense ? `Напиши 3 предложения о себе в ${t.name}: ${esc(t.use[0].split(':')[0].toLowerCase())}.` : 'Составь 3 своих предложения на эту тему.'}</p>${AI ? `<button class="btn small" data-act="practiceTopic" data-arg="${t.id}">✍️ Написать и проверить с AI</button>` : '<p class="muted small">Подключите AI (откройте приложение в Claude), чтобы он проверял ваши предложения.</p>'}</div>
  </div>
  <div id="aiTopicBox"></div>`;
}

/* ---------- Игры ---------- */
function viewGames() {
  const p = P(), kid = isKid(p);
  return sec('🎮 Игры и упражнения', `<div class="games">${GAMES.filter(g => (!kid || g.kid) && (!g.ai || AI)).map(g => `<button class="gcard" data-act="game" data-arg="${g.id}"><span class="g-ico">${g.icon}</span><b>${g.name}</b><small>${g.desc}</small></button>`).join('')}
  ${myProfiles().length > 1 ? `<button class="gcard" data-act="go" data-arg="arena"><span class="g-ico">⚔️</span><b>Семейная дуэль</b><small>Викторина друг против друга</small></button>` : ''}</div>
  <p class="muted small">Все игры строятся из ваших слов и изученных тем. Каждый правильный ответ — +10 XP.</p>`);
}
function viewListen() {
  const p = P();
  return sec('🎧 Listening', `
  ${canSpeak() ? '' : '<div class="notice">Озвучка недоступна в этом браузере.</div>'}
  <div class="games">
   <button class="gcard" data-act="game" data-arg="listen"><span class="g-ico">🎧</span><b>Listening Challenge</b><small>Слова и предложения на слух</small></button>
   ${isKid(p) ? '' : '<button class="gcard" data-act="game" data-arg="dictation"><span class="g-ico">✍️</span><b>Диктант</b><small>Запиши услышанное предложение</small></button>'}
   <button class="gcard" data-act="go" data-arg="read"><span class="g-ico">📖</span><b>Тексты с озвучкой</b><small>Читай и слушай</small></button>
  </div>
  <div class="card"><h3>Голос</h3><div class="row gap wrap">${[['claude', 'Голос Claude' + (TTS ? '' : ' (недоступен)')], ['en-GB', '🇬🇧 British (браузер)'], ['en-US', '🇺🇸 American (браузер)']].map(v => `<button class="btn small ${p.voice === v[0] ? '' : 'ghost'}" data-act="setVoice" data-arg="${v[0]}">${v[1]}</button>`).join('')}</div>
  <div class="row gap mt">Скорость: ${[0.7, 0.9, 1, 1.2].map(r => `<button class="btn small ${p.rate === r ? '' : 'ghost'}" data-act="setRate" data-arg="${r}">${r}×</button>`).join('')} <button class="btn small ghost" data-act="say" data-arg="Hello! Let's learn English together.">🔊 Проверить</button></div></div>`);
}
function viewRead() {
  const p = P(), kid = isKid(p);
  const texts = D.READING.filter(r => !kid || r.kid).concat(p.aiTexts || []);
  return sec('📖 Reading', `<div class="games">${texts.map(r => `<button class="gcard" data-act="go" data-arg="reader:${r.id}"><span class="g-ico">${(p.readDone || {})[r.id] ? '✅' : r.ielts ? '🎓' : '📄'}</span><b>${esc(r.title)}</b><small>Уровень ${r.level}${r.ielts ? ' · IELTS' : ''}${(p.readDone || {})[r.id] ? ' · прочитано' : ''}</small></button>`).join('')}
  ${AI ? `<button class="gcard ai" data-act="aiText"><span class="g-ico">✨</span><b>Новый текст с AI</b><small>Из ваших слов, уровень ${p.level}</small></button>` : ''}</div>
  <p class="muted small">Нажми на любое слово в тексте, чтобы послушать его и добавить в свой словарь. Отмеченные слова ты выучишь до вопросов.</p><div id="aiTextStatus"></div>`);
}
function viewReader() {
  const p = P(), id = String(UI.arg).replace('reader:', ''); const r = D.READING.concat(p.aiTexts || []).find(x => x.id === id); if (!r) return viewRead();
  const wrap = par => par.split(/(\s+)/).map(t => /\s+/.test(t) ? t : `<span class="rw" data-act="rword" data-arg="${esc(t.replace(/[^A-Za-z'-]/g, ''))}">${esc(t)}</span>`).join('');
  const words = r.text.split(/\n\n+/).map(wrap).join('</p><p class="read-text">');
  UI.readQ = UI.readQ && UI.readQ.id === id ? UI.readQ : { id, ans: {} };
  return `<button class="btn ghost small" data-act="go" data-arg="read">← Тексты</button>
  <div class="card reader"><div class="row between"><h2>${esc(r.title)}</h2>${r.ielts ? '<span class="pill">IELTS-формат · ' + r.text.split(/\s+/).length + ' слов</span>' : ''}<button class="btn small ghost" data-act="say" data-arg="${esc(r.text)}">🔊 Слушать текст</button></div><p class="read-text">${words}</p></div>
  ${pendingFor('read:' + r.id).length ? `<div class="card accent-card"><h3>🧠 Сначала выучи отмеченные слова (${pendingFor('read:' + r.id).length})</h3><p class="muted">${esc(pendingFor('read:' + r.id).map(id => (p.words.find(w => w.id === id) || {}).en).join(', '))}</p><p class="small muted">Вопросы к тексту откроются после изучения слов.</p><div class="row gap"><button class="btn" data-act="learnPendingRead" data-arg="${r.id}">Выучить слова</button><button class="btn ghost small" data-act="skipPending">Пропустить</button></div></div>` : ''}
  ${r.q && r.q.length && !pendingFor('read:' + r.id).length ? `<div class="card"><h3>Вопросы на понимание</h3>${r.ielts ? '<p class="muted small">True — так сказано в тексте; False — в тексте сказано обратное; Not Given — в тексте об этом нет информации.</p>' : ''}${r.q.map((q, i) => { const a = UI.readQ.ans[i]; return `<div class="rq"><b>${i + 1}. ${esc(q[0])}</b><div class="opts sm">${q[2].map(o => { let c = ''; if (a != null) { if (o === q[1]) c = 'right'; else if (o === a) c = 'wrong'; } return `<button class="opt ${c}" data-act="readAns" data-arg="${i}|${esc(o)}" ${a != null ? 'disabled' : ''}>${esc(o)}</button>`; }).join('')}</div></div>`; }).join('')}</div>` : ''}`;
}

/* ---------- AI Teacher ---------- */
function openAI(mode, opt = {}) { UI.chat = { mode, scenario: opt.scenario || null, messages: [], busy: false, step: opt.step }; if (mode === 'story') UI.chat.words = shuffle(introduced(P())).slice(0, 5).map(w => w.en); go('ai'); if (mode === 'speak' && opt.scenario) startScenario(opt.scenario); }
function viewAI() {
  const p = P();
  if (!AI) return sec('🤖 AI English Teacher', `<div class="card"><p>AI Teacher объясняет грамматику простым языком, исправляет ошибки, ведёт диалоги и проверяет дневник.</p><p class="muted">${window.EQ_STANDALONE ? 'AI пока не подключён: администратору нужно добавить функцию eq-ai и ключ Anthropic API в Supabase (см. README).' : 'Он работает, когда приложение открыто в Claude, и попросит разрешение при первом вопросе.'} Все игры, грамматика и словарь работают и без него.</p></div>`);
  const c = UI.chat || (UI.chat = { mode: 'teacher', messages: [], busy: false });
  const tabs = [['teacher', '💬 Учитель'], ['speak', '🗣️ Speaking Arena'], ['diary', '📔 Дневник'], ['story', '📜 Story Builder'], ['check', '✅ Проверить текст']];
  let body = '';
  if (c.mode === 'speak' && !c.scenario) {
    body = `<p class="muted">Выбери ситуацию — AI сыграет роль собеседника, а после каждой реплики подскажет, как сказать правильнее.</p><div class="games">${D.SCENARIOS.filter(s => !isKid(p) || s.kid).map(s => `<button class="gcard" data-act="scenario" data-arg="${s.id}"><span class="g-ico">${s.icon}</span><b>${esc(s.title)}</b><small>${esc(s.goal)}</small></button>`).join('')}</div>`;
  } else if (c.mode === 'diary' && !c.messages.length) {
    body = `<p class="muted">Напиши 3–5 предложений о своём дне по-английски. AI исправит ошибки и предложит более естественные выражения.</p>${p.diary.length ? `<details><summary>Мои записи (${p.diary.length})</summary>${p.diary.slice().reverse().slice(0, 10).map(d => `<div class="diary-e"><b>${fmtDate(d.date)}</b><div>${esc(d.text)}</div></div>`).join('')}</details>` : ''}`;
  } else if (c.mode === 'story' && !c.messages.length) {
    c.words = c.words && c.words.length ? c.words : shuffle(introduced(p)).slice(0, 5).map(w => w.en);
    body = `<p>Сочини короткую историю, используя эти слова:</p><div class="chips big">${c.words.map(w => `<span>${esc(w)}</span>`).join('')}</div><button class="btn small ghost" data-act="newStoryWords">🎲 Другие слова</button>`;
  } else if (c.mode === 'check' && !c.messages.length) {
    body = `<p class="muted">Вставь предложение, письмо или сообщение на английском — AI найдёт ошибки и объяснит их.</p>`;
  } else if (c.mode === 'teacher' && !c.messages.length) {
    body = `<p class="muted">Задай любой вопрос об английском. Например:</p><div class="chips click">${['Чем отличается Present Perfect от Past Simple?', 'Когда ставить the?', 'Объясни Conditionals как ребёнку', 'Как вежливо перенести встречу по-английски?'].map(s => `<button data-act="aiSuggest" data-arg="${esc(s)}">${esc(s)}</button>`).join('')}</div>`;
  }
  const sc = c.scenario && D.SCENARIOS.find(s => s.id === c.scenario);
  const msgs = c.messages.filter(m => !m.hidden).map(m => `<div class="msg ${m.role}">${m.role === 'assistant' ? `<div class="bubble">${md(m.content)}${c.mode === 'speak' ? ` <button class="icon-btn sm" data-act="sayClean" data-arg="${esc(m.content.split(/💡|Feedback/i)[0].slice(0, 600))}">🔊</button>` : ''}</div>` : `<div class="bubble">${esc(m.content)}</div>`}</div>`).join('');
  const ph = { teacher: 'Спроси учителя…', speak: 'Ответь по-английски…', diary: 'Today I…', story: 'Once upon a time…', check: 'Вставь текст на английском…' }[c.mode];
  const showInput = !(c.mode === 'speak' && !c.scenario);
  return sec('🤖 AI English Teacher', `<div class="tabs">${tabs.map(t => `<button class="${c.mode === t[0] ? 'on' : ''}" data-act="aiMode" data-arg="${t[0]}">${t[1]}</button>`).join('')}</div>
   ${sc ? `<div class="notice soft">${sc.icon} <b>${esc(sc.title)}</b> — ${esc(sc.goal)} <button class="btn small ghost" data-act="aiMode" data-arg="speak">Сменить ситуацию</button></div>` : ''}
   <div class="chat card">${body}${msgs}${c.busy ? '<div class="msg assistant"><div class="bubble typing" id="aiLive">…</div></div>' : ''}</div>
   ${showInput ? `<form data-form="chat" class="chat-in"><textarea name="t" rows="${['diary', 'story', 'check'].includes(c.mode) && !c.messages.length ? 4 : 2}" placeholder="${ph}" ${c.busy ? 'disabled' : ''}></textarea><button class="btn" ${c.busy ? 'disabled' : ''}>Отправить</button></form>${c.messages.length ? '<button class="btn small ghost" data-act="aiReset">Начать заново</button>' : ''}` : ''}`);
}
function sysPrompt(mode, p) {
  const kid = isKid(p);
  const base = `Ты — AI English Teacher в семейном приложении ENGLISH QUEST. Ученик: ${esc(p.name)}, ${learnerDesc(p)}. Родной язык ученика — русский. Будь дружелюбным, терпеливым, никогда не критикуй и не стыди. ${kid ? 'Пиши очень просто, коротко, с эмодзи, как добрый учитель для ребёнка.' : 'Пиши кратко и по делу.'} Объяснения — на русском, примеры — на английском. Не используй таблицы.`;
  const fix = 'Если в английском тексте ученика есть ошибки, используй формат: ❌ что было → ✅ как правильно, и коротко объясни правило по-русски. Если ошибок нет — похвали.';
  if (mode === 'teacher') return base + ' Отвечай на вопросы об английском языке. ' + fix + ' В конце можешь дать одно маленькое задание.';
  if (mode === 'diary') return base + ' Ученик пишет дневник на английском. ' + fix + ' Затем дай исправленную версию целиком под заголовком **Исправленный текст** и 1–2 более естественных выражения.';
  if (mode === 'story') return base + ' Ученик пишет историю, используя заданные слова. Проверь, все ли слова использованы правильно. ' + fix + ' Оцени историю по шкале из 5 звёзд и дай исправленную версию.';
  if (mode === 'check') return base + ' ' + fix + ' Затем дай исправленную версию целиком.';
  if (mode === 'speak') { const sc = D.SCENARIOS.find(s => s.id === (UI.chat && UI.chat.scenario)) || D.SCENARIOS[0]; return base + ` Сейчас разговорная практика. Ситуация: «${sc.title}» (${sc.goal}). Ты играешь роль: ${sc.role}. Говори на английском уровня ${p.level}, коротко (1–3 предложения) и задавай по одному вопросу, чтобы поддерживать диалог. После своей реплики, если в последнем ответе ученика были ошибки или его фразу можно сказать естественнее, добавь блок, начинающийся с «💡 Feedback:», с исправлением и объяснением по-русски. Если ошибок нет — коротко похвали в этом блоке.`; }
  return base;
}
async function sendChat(text) {
  const p = P(), c = UI.chat; if (!text.trim() || c.busy) return;
  let content = text.trim();
  if (c.mode === 'story' && !c.messages.length) content = `Слова: ${c.words.join(', ')}.\nМоя история:\n${content}`;
  c.messages.push({ role: 'user', content: text.trim(), sent: content }); c.busy = true; render();
  if (c.mode === 'speak') p.stats.speak++;
  if (c.mode === 'diary' && c.messages.filter(m => m.role === 'user').length === 1) { p.diary.push({ date: today(), text: text.trim().slice(0, 2000) }); if (p.diary.length > 60) p.diary.shift(); p.stats.diary++; addXP(30, p); }
  if (c.mode === 'story' && c.messages.filter(m => m.role === 'user').length === 1) addXP(30, p);
  await chatTurn();
  if (c.step != null && !c.stepDone) { c.stepDone = true; completeStep(c.step); }
  checkAch(p); save();
}
async function chatTurn() {
  const p = P(), c = UI.chat;
  const msgs = [{ role: 'user', content: sysPrompt(c.mode, p) + '\n\n(Это инструкция для тебя. Ответь «OK».)' }, { role: 'assistant', content: 'OK' }].concat(c.messages.map(m => ({ role: m.role, content: m.sent || m.content })));
  try {
    const t = await ask(msgs, { onText: ({ text }) => { const el = $('#aiLive'); if (el) el.innerHTML = md(text); } });
    c.messages.push({ role: 'assistant', content: t });
    if (c.mode === 'speak') { const say = t.split(/💡|Feedback/i)[0]; if (say.trim()) speak(say.slice(0, 600)); }
  } catch (e) { c.messages.push({ role: 'assistant', content: '⚠️ ' + aiErr(e) }); }
  c.busy = false; if (UI.view === 'ai' && !UI.game) render();
}
function startScenario(id) { const c = UI.chat; c.scenario = id; c.messages = [{ role: 'user', content: 'Начни диалог: поздоровайся и задай первый вопрос.', hidden: true }]; c.busy = true; render(); chatTurn(); }

/* ---------- Задания учителя (сторона семьи) ---------- */
function myTasks(p) { return (Cloud.tasks || []).filter(t => t.target === p.id || t.target === 'all').sort((a, b) => (b.created || 0) - (a.created || 0)); }
const TASK_TYPES = { grammar: ['⚔️', 'Грамматика'], words: ['📚', 'Слова'], writing: ['✍️', 'Письменное задание'], quiz: ['❓', 'Тест учителя'] };
function viewTasks() {
  const p = P();
  if (!Cloud.on) return sec('🍎 Задания учителя', `<div class="card"><p>Кабинет учителя работает через облачную синхронизацию.</p><p class="muted">${window.EQ_STANDALONE ? 'Нет связи с базой данных. Проверьте интернет и обновите страницу.' : 'Откройте приложение по ссылке в Claude — тогда учитель сможет выдавать задания, а вы увидите их здесь.'}</p></div>`);
  const ts = myTasks(p);
  return sec('🍎 Задания учителя', `
  ${window.EQ_STANDALONE ? '<div class="notice soft">👩‍🏫 Чтобы подключить учителя, откройте <b>Настройки → Доступ</b> и пригласите учителя по его email. Учитель зарегистрируется на сайте с этой почтой и сразу попадёт в свой кабинет.</div>' : `<div class="notice soft">👩‍🏫 Чтобы подключить учителя: нажмите «Поделиться» на странице приложения в Claude и пригласите учителя по email с ролью <b>Редактор</b>. Учитель откроет ту же ссылку и попадёт в свой кабинет: будет видеть прогресс, выдавать задания и проверять ответы.</div>`}
  ${ts.length ? ts.map(t => taskCard(t, p)).join('') : '<p class="muted">Пока заданий нет.</p>'}
  <details class="card"><summary><b>+ Создать задание самостоятельно</b> <span class="muted small">(например, для сына)</span></summary>${taskForm()}</details>`);
}
function taskCard(t, p) {
  const sub = Cloud.submissions[t.id], rev = Cloud.reviews[t.id], tt = TASK_TYPES[t.type] || ['📌', ''];
  const tgt = t.target === 'all' ? 'всем' : (profById(t.target) || {}).name;
  return `<div class="card task"><div class="task-h"><span class="t-ico">${tt[0]}</span><div class="grow"><b>${esc(t.title)}</b><div class="muted small">${tt[1]}${t.due ? ' · срок ' + fmtDate(t.due) : ''} · для: ${esc(tgt || '')}</div></div>
    ${rev ? `<span class="grade">${'★'.repeat(rev.grade || 0)}${'☆'.repeat(5 - (rev.grade || 0))}</span>` : sub ? `<span class="pill ok">Сдано ${sub.total ? sub.score + '/' + sub.total : ''}</span>` : `<button class="btn small" data-act="doTask" data-arg="${t.id}">Выполнить</button>`}</div>
    ${t.prompt ? `<p>${esc(t.prompt)}</p>` : ''}${rev && rev.comment ? `<div class="teacher-c">👩‍🏫 ${esc(rev.comment)}</div>` : ''}${sub && !rev ? '<div class="muted small">Ждёт проверки учителем</div>' : ''}</div>`;
}
function taskForm(target) {
  const ps = S ? S.profiles : (Teacher.state ? Teacher.state.profiles : []);
  return `<form data-form="newTask" class="wform"><div class="row gap wrap"><label class="grow">Название<input name="title" required placeholder="Повторить Past Simple"></label><label>Для кого<select name="target">${ps.map(q => `<option value="${q.id}" ${target === q.id || (!target && q.kind === 'child') ? 'selected' : ''}>${esc(q.avatar + ' ' + q.name)}</option>`).join('')}<option value="all">Всем</option></select></label><label>Срок<input type="date" name="due"></label></div>
  <label>Тип задания<select name="type" data-change="ttype"><option value="grammar">⚔️ Грамматика — упражнения по теме</option><option value="words">📚 Слова — выучить список</option><option value="writing">✍️ Письменное задание</option><option value="quiz">❓ Свой тест</option></select></label>
  <div class="tt tt-grammar"><label>Тема<select name="topic">${D.TOPICS.map(t => `<option value="${t.id}">${t.name} (${t.level})</option>`).join('')}</select></label></div>
  <div class="tt tt-words hidden"><label>Слова (каждое с новой строки: word - перевод)<textarea name="words" rows="5" placeholder="apple - яблоко"></textarea></label></div>
  <div class="tt tt-writing hidden"><label>Задание<textarea name="prompt" rows="3" placeholder="Напиши 5 предложений о своих выходных в Past Simple"></textarea></label></div>
  <div class="tt tt-quiz hidden"><label>Вопросы (каждый с новой строки: вопрос | правильный ответ | неверный | неверный)<textarea name="quiz" rows="5" placeholder="I ___ to school yesterday. | went | go | goes"></textarea></label></div>
  <button class="btn">Выдать задание</button><div class="ai-status" id="taskStatus"></div></form>`;
}
function doTask(id) {
  const t = Cloud.tasks.find(x => x.id === id), p = P(); if (!t) return;
  const answers = [];
  const submit = async (res) => {
    try { await Cloud.db.collection('subs').doc(t.id).set(JSON.parse(JSON.stringify({ taskId: t.id, pid: p.id, score: res.score || 0, total: res.total || 0, answers: (res.answers || answers).slice(0, 60), text: res.text || '', at: Date.now() }))); toast('📨 Задание отправлено учителю'); grant(p, 'teacher'); addXP(30, p); save(); }
    catch (e) { toast('Не удалось отправить задание. Попробуйте ещё раз.'); }
  };
  if (t.type === 'grammar') runQuiz({ title: t.title, icon: '🍎', questions: topicQs(t.topic, 8), topic: t.topic, answers, onFinish: r => submit(r) });
  else if (t.type === 'quiz') runQuiz({ title: t.title, icon: '🍎', answers, questions: (t.questions || []).map(q => ({ kind: 'mcq', prompt: q[0], options: shuffle(q.slice(1).filter(Boolean)), answer: q[1], sub: 'Задание учителя' })), onFinish: r => submit(r) });
  else if (t.type === 'words') {
    const ids = [];
    (t.words || []).forEach(([en, ru]) => { let w = p.words.find(x => norm(x.en) === norm(en)); if (!w) { w = mkWord({ en, ru: ru || '', cat: 'От учителя', own: true }); p.words.unshift(w); } ids.push(w.id); });
    save();
    const pool = wordPool(p), qs = ids.map(i => p.words.find(w => w.id === i)).filter(w => w && w.ru).flatMap(w => [qWordMCQ(w, pool, 'en'), qType(w)]);
    runQuiz({ title: t.title, icon: '🍎', answers, questions: shuffle(qs), onFinish: r => submit(r) });
  } else if (t.type === 'writing') { UI.modal = { kind: 'writeTask', id }; render(); }
  Teacher.submit = submit;
}
function rewardReviews() { if (!S) return; S.profiles.filter(canSave).forEach(p => { let ch = false; p.stats.rewarded = p.stats.rewarded || {}; Object.entries(Cloud.reviews).forEach(([id, r]) => { const sub = Cloud.submissions[id]; if (!sub || sub.pid !== p.id || p.stats.rewarded[id]) return; p.stats.rewarded[id] = 1; ch = true; addXP((r.grade || 0) * 10, p, true); if (p.id === S.activeId) toast(`👩‍🏫 Учитель проверил задание: ${'★'.repeat(r.grade || 0)} (+${(r.grade || 0) * 10} XP)`, 'ach'); }); if (ch) save(p); }); }

/* ---------- Результаты ребёнка (для родителя и учителя) ---------- */
function resultsHTML(p) {
  const sm = p.summary || (p.words ? wordSummary(p) : {}); const days = []; for (let i = 13; i >= 0; i--) days.push(addDays(today(), -i)); const mx = Math.max(10, ...days.map(d => (p.xpLog || {})[d] || 0));
  const rows = Object.entries(p.topics || {}).filter(([k, x]) => TOP[k] && (x.ok + x.bad)).sort((a, b) => acc(a[1]) - acc(b[1]));
  const pl = p.plans && p.plans[today()]; const mins = Math.round(Object.values(p.timeLog || {}).reduce((a, b) => a + b, 0));
  const tot = ((p.stats || {}).ok || 0) + ((p.stats || {}).bad || 0);
  const test = (p.tests || []).slice(-1)[0];
  const tasks = (Cloud.tasks || []).filter(x => x.target === p.id || x.target === 'all');
  return `<div class="kpis"><div class="card kpi"><b>${p.level}</b><span>уровень${test ? ' · тест ' + test.score + '/' + test.total : ' · тест не пройден'}</span></div><div class="card kpi"><b>${p.xp}</b><span>XP · ур. ${levelOf(p.xp)}</span></div><div class="card kpi"><b>${streakNow(p)}</b><span>дней подряд</span></div><div class="card kpi"><b>${sm.total || 0}</b><span>слов · ${sm.mastered || 0} усвоено</span></div><div class="card kpi"><b>${tot ? Math.round(p.stats.ok / tot * 100) : 0}%</b><span>верных ответов</span></div><div class="card kpi"><b>${mins}</b><span>минут занятий</span></div></div>
  <div class="prog-grid"><div class="card"><h3>Активность за 2 недели</h3><div class="chart">${days.map(d => `<div class="cbar" title="${fmtDate(d)}: ${(p.xpLog || {})[d] || 0} XP"><i style="height:${((p.xpLog || {})[d] || 0) / mx * 100}%"></i><small>${d.slice(8)}</small></div>`).join('')}</div>
  <p class="muted small">План сегодня: ${pl ? pl.steps.filter(s => s.done).length + ' / ' + pl.steps.length + ' шагов' : 'ещё не начат'}</p></div>
  <div class="card"><h3>Грамматика (слабые сверху)</h3>${rows.length ? rows.slice(0, 10).map(([k, x]) => `<div class="fb-row"><span>${TOP[k].name}</span>${bar(acc(x), 'sm ' + (acc(x) < 70 ? 'bad' : ''))}<b>${acc(x)}%</b></div>`).join('') : '<p class="muted">Пока нет данных.</p>'}</div>
  <div class="card"><h3>Задания учителя</h3>${tasks.length ? tasks.map(x => { const sub = Cloud.submissions[x.id], rev = Cloud.reviews[x.id]; return `<div class="fb-row"><span>${esc(x.title)}</span><b>${rev ? '★'.repeat(rev.grade) : sub ? (sub.total ? sub.score + '/' + sub.total : 'сдано') : '⏳'}</b></div>`; }).join('') : '<p class="muted">Заданий нет.</p>'}</div>
  <div class="card"><h3>Достижения</h3><div class="ach-row">${Object.keys(p.ach || {}).map(id => { const a = D.ACH.find(x => x[0] === id); return a ? `<span title="${esc(a[2])}">${a[1]}</span>` : ''; }).join('') || '<span class="muted small">Пока нет</span>'}</div></div>
  <div class="card wide"><h3>Дневник ученика</h3>${(p.diary || []).slice(-5).reverse().map(d => `<div class="diary-e"><b>${fmtDate(d.date)}</b><div>${esc(d.text)}</div></div>`).join('') || '<p class="muted">Записей пока нет.</p>'}</div></div>`;
}
function viewResults() {
  const ps = otherProfiles(); if (!ps.length) return sec('👦 Результаты', '<p class="muted">Здесь появятся результаты сына, когда он войдёт под своим логином.</p>');
  const cur = ps.find(x => x.id === UI.arg) || ps[0];
  return sec(`👦 Результаты: ${esc(cur.avatar + ' ' + cur.name)}`, `${ps.length > 1 ? `<div class="tabs">${ps.map(x => `<button class="${x.id === cur.id ? 'on' : ''}" data-act="go" data-arg="results:${x.id}">${x.avatar} ${esc(x.name)}</button>`).join('')}</div>` : ''}
  <p class="muted small">Только просмотр: ${esc(cur.name)} занимается под своим логином, а вы видите его прогресс. Задания для него можно выдать в разделе «Задания учителя».</p>${resultsHTML(cur)}`);
}

/* ---------- Family Arena ---------- */
function viewArena() {
  const ps = S.profiles;
  const canDuel = myProfiles().length > 1;
  if (ps.length < 2) return sec('👨‍👩‍👦 Family Arena', `<div class="card"><p>Добавьте второй профиль в настройках, чтобы соревноваться всей семьёй.</p><button class="btn" data-act="go" data-arg="settings">Настройки</button></div>`);
  const ws = weekStart(), lw = addDays(ws, -7);
  const total = ps.reduce((s, p) => s + weekXP(p), 0), goal = S.family.goal || 2000;
  const last = ps.map(p => ({ p, x: weekXP(p, lw) })).sort((a, b) => b.x - a.x)[0];
  const joint = ps.map(p => ({ p, done: !!(p.plans[today()] && p.plans[today()].steps.find(s => s.k === 'boss' && s.done)) }));
  return sec('👨‍👩‍👦 Family Arena', `
  <div class="arena-grid">
   <div class="card"><h3>🏆 Турнир недели</h3>${famBoard()}<p class="muted small">Неделя с ${fmtDate(ws)}. ${last && last.x ? `Чемпион прошлой недели: ${last.p.avatar} ${esc(last.p.name)} (${last.x} XP)` : ''}</p></div>
   <div class="card"><h3>🎯 Семейная цель недели</h3><div class="big-n">${total} / ${goal} XP</div>${bar(total / goal * 100, 'lvl')}<p>Награда: <b>${esc(S.family.reward)}</b></p>${total >= goal ? '<div class="done-msg">🎉 Цель достигнута! Время награды!</div>' : `<p class="muted small">Осталось ${goal - total} XP — вместе вы справитесь!</p>`}</div>
   <div class="card"><h3>🤝 Совместное задание дня</h3><p>Каждый побеждает своего Daily Boss.</p>${joint.map(j => `<div class="fb-row"><span>${j.p.avatar} ${esc(j.p.name)}</span><b>${j.done ? '✅' : '⏳'}</b></div>`).join('')}${joint.every(j => j.done) ? '<div class="done-msg">Командная победа! 🎉</div>' : ''}</div>
   ${canDuel ? '<div class="card duel-card"><h3>⚔️ Семейная дуэль</h3><p>Викторина друг против друга на одном устройстве. Каждый получает вопросы своего уровня — честно и весело!</p><button class="btn big" data-act="duel">Начать дуэль</button></div>' : ''}
  </div>`);
}
function startDuel() {
  const ps = myProfiles().slice(0, 2), qs = [];
  for (let r = 0; r < 6; r++) ps.forEach(p => {
    const pool = wordPool(p), ws = introduced(p), tps = studiedTopics(p);
    const q = rnd(2) ? qGrammar(TOP[pick(tps)], pick(TOP[pick(tps)].items)) : qWordMCQ(pick(ws), pool, rnd(2) ? 'ru' : 'en');
    q.pid = p.id; qs.push(q);
  });
  const duel = { players: ps.map(p => p.id), score: {} };
  runQuiz({ title: 'Семейная дуэль', icon: '⚔️', questions: qs, duel, replay: false, onFinish: () => {
    const [a, b] = duel.players; const sa = duel.score[a] || 0, sb = duel.score[b] || 0;
    if (sa !== sb) { const w = profById(sa > sb ? a : b); w.stats.duelWins++; addXP(50, w, true); checkAch(w); save(w); }
  }, resultHTML: () => { const [a, b] = duel.players; const sa = duel.score[a] || 0, sb = duel.score[b] || 0; const A = profById(a), B = profById(b); return `<div class="duel-res"><div>${A.avatar}<b>${sa}</b>${esc(A.name)}</div><span>:</span><div>${B.avatar}<b>${sb}</b>${esc(B.name)}</div></div><h3>${sa === sb ? 'Ничья! Дружба победила 🤝' : '👑 Победитель: ' + esc((sa > sb ? A : B).name) + ' (+50 XP)'}</h3>`; } });
}

/* ---------- Прогресс ---------- */
function viewProgress() {
  const p = P(), sm = wordSummary(p);
  const days = []; for (let i = 13; i >= 0; i--) days.push(addDays(today(), -i));
  const mx = Math.max(10, ...days.map(d => p.xpLog[d] || 0));
  const rows = Object.entries(p.topics).filter(([k, t]) => TOP[k] && (t.ok + t.bad)).sort((a, b) => acc(a[1]) - acc(b[1]));
  const weak = weakTopics(p);
  const rep = n => { let xp = 0, act = 0, mins = 0; for (let i = 0; i < n; i++) { const d = addDays(today(), -i); xp += p.xpLog[d] || 0; if (p.xpLog[d]) act++; mins += p.timeLog[d] || 0; } const added = p.words.filter(w => w.own && daysBetween(w.added, today()) < n).length; return { xp, act, mins: Math.round(mins), added }; };
  const w7 = rep(7), m30 = rep(30);
  const tot = p.stats.ok + p.stats.bad;
  return sec('📊 My Progress', `
  <div class="kpis">
    <div class="card kpi"><b>${sm.total}</b><span>слов в словаре</span></div>
    <div class="card kpi"><b>${sm.mastered}</b><span>усвоено (Mastered)</span></div>
    <div class="card kpi"><b>${tot ? Math.round(p.stats.ok / tot * 100) : 0}%</b><span>верных ответов</span></div>
    <div class="card kpi"><b>${Math.round(Object.values(p.timeLog).reduce((a, b) => a + b, 0))}</b><span>минут обучения</span></div>
    <div class="card kpi"><b>${p.level}</b><span>уровень CEFR</span></div>
    <div class="card kpi"><b>${p.streak.best || 0}</b><span>лучшая серия</span></div>
  </div>
  <div class="prog-grid">
   <div class="card"><h3>Активность за 2 недели</h3><div class="chart">${days.map(d => `<div class="cbar" title="${fmtDate(d)}: ${p.xpLog[d] || 0} XP"><i style="height:${(p.xpLog[d] || 0) / mx * 100}%"></i><small>${d.slice(8)}</small></div>`).join('')}</div></div>
   <div class="card"><h3>Слова по статусам</h3>${['new', 'learning', 'review', 'mastered'].map(k => `<div class="fb-row"><span class="st s-${k}">${ST_LABEL[k]}</span>${bar(sm.total ? sm[k] / sm.total * 100 : 0, 'sm')}<b>${sm[k]}</b></div>`).join('')}</div>
   <div class="card"><h3>🔎 Weakness Detector</h3>${weak.length ? `<p>Эти темы даются труднее всего — они автоматически добавлены в ваш план:</p>${weak.slice(0, 4).map(id => `<div class="fb-row"><span>${TOP[id].name}</span><b class="bad-t">${acc(p.topics[id])}%</b><button class="btn small" data-act="topic" data-arg="${id}">Тренировать</button></div>`).join('')}` : '<p class="muted">Слабых мест пока не найдено. Продолжайте заниматься — система следит за ошибками.</p>'}
     ${p.words.filter(w => w.bad > w.ok && w.bad >= 2).length ? `<p class="mt">Трудные слова: ${p.words.filter(w => w.bad > w.ok && w.bad >= 2).slice(0, 8).map(w => `<span class="cat">${esc(w.en)}</span>`).join(' ')}</p>` : ''}</div>
   <div class="card"><h3>Отчёты</h3><table class="formula"><tr><th></th><th>7 дней</th><th>30 дней</th></tr><tr><td>XP</td><td>${w7.xp}</td><td>${m30.xp}</td></tr><tr><td>Активных дней</td><td>${w7.act}</td><td>${m30.act}</td></tr><tr><td>Минут</td><td>${w7.mins}</td><td>${m30.mins}</td></tr><tr><td>Новых своих слов</td><td>${w7.added}</td><td>${m30.added}</td></tr></table></div>
   <div class="card wide"><h3>Грамматика</h3>${rows.length ? rows.map(([k, t]) => `<div class="fb-row"><span>${TOP[k].name}</span>${bar(acc(t), 'sm ' + (acc(t) < 70 ? 'bad' : ''))}<b>${acc(t)}%</b><small class="muted">лучший ${t.best || 0}%</small></div>`).join('') : '<p class="muted">Пройдите первые упражнения — здесь появится статистика по темам.</p>'}</div>
   <div class="card"><h3>Уровень CEFR</h3>${p.tests.length ? p.tests.slice(-5).map(t => `<div class="fb-row"><span>${fmtDate(t.date)}</span><b>${t.level}</b><small class="muted">${t.score}/${t.total}</small></div>`).join('') : '<p class="muted">Тест ещё не пройден.</p>'}<button class="btn small" data-act="game" data-arg="placement">Пройти тест уровня</button></div>
  </div>`);
}
function viewAch() {
  const p = P();
  return sec('🏆 Achievements', `<div class="ach-grid">${D.ACH.map(a => `<div class="ach ${p.ach[a[0]] ? 'got' : ''}"><span>${a[1]}</span><b>${esc(a[2])}</b><small>${esc(a[3])}</small>${p.ach[a[0]] ? `<em>${fmtDate(p.ach[a[0]])}</em>` : ''}</div>`).join('')}</div>`, `<span class="muted">${Object.keys(p.ach).length}/${D.ACH.length}</span>`);
}

/* ---------- Настройки ---------- */
function viewSettings() {
  const p = P();
  return sec('⚙️ Настройки', `
  <form data-form="profile" class="card wform"><h3>Профиль: ${esc(p.name)}</h3>
   <div class="row gap wrap"><label class="grow">Имя<input name="name" value="${esc(p.name)}" maxlength="24"></label><label>Тип<select name="kind"><option value="adult" ${p.kind === 'adult' ? 'selected' : ''}>Взрослый</option><option value="child" ${p.kind === 'child' ? 'selected' : ''}>Ребёнок</option></select></label><label style="max-width:100px">Возраст<input name="age" type="number" value="${p.age || ''}"></label></div>
   <label>Аватар</label><div class="av-pick">${AVATARS.map(a => `<label><input type="radio" name="avatar" value="${a}" ${a === p.avatar ? 'checked' : ''}><span>${a}</span></label>`).join('')}</div>
   <div class="row gap wrap"><label>Уровень<select name="level">${LEVELS.map(l => `<option ${l === p.level ? 'selected' : ''}>${l}</option>`).join('')}</select></label><label>Минут в день<input name="minutes" type="number" min="5" max="120" value="${p.minutes}"></label><label>Новых слов в день<input name="newPerDay" type="number" min="1" max="30" value="${p.newPerDay}"></label></div>
   ${p.kind !== 'child' ? `<label class="inline"><input type="checkbox" name="intensive" ${p.intensive !== false ? 'checked' : ''}> ⚡ Интенсив: каждый день — новые слова, предложения с ними, урок по теме, закрепление, IELTS-чтение, аудирование и Daily Boss (около 60–75 минут)</label>` : ''}
   <label class="inline"><input type="checkbox" name="hard" ${p.hard ? 'checked' : ''}> 🔥 Сложный режим: грамматику вписываешь сам, больше заданий в бою и в Daily Boss (по 2 вопроса на каждое время), таймер 7 секунд, больше шагов в плане дня</label>
   <label>Тема оформления</label><div class="theme-pick">${Object.entries(THEMES).map(([k, t]) => `<label class="th-opt th-${k}"><input type="radio" name="theme" value="${k}" ${k === p.theme ? 'checked' : ''}><span><b>${t.name}</b><small>${t.desc}</small></span></label>`).join('')}</div>
   <button class="btn">Сохранить</button></form>
  <div class="card"><h3>Семья</h3><form data-form="family" class="wform"><div class="row gap wrap"><label>Семейная цель недели (XP)<input name="goal" type="number" value="${S.family.goal}"></label><label class="grow">Награда<input name="reward" value="${esc(S.family.reward)}"></label></div><label>Свои категории слов (через запятую)<input name="cats" value="${esc((S.family.cats || []).join(', '))}"></label><button class="btn small">Сохранить</button></form>
   <div class="row gap wrap mt"><button class="btn ghost" data-act="addProfile" data-arg="adult">+ Взрослый профиль</button><button class="btn ghost" data-act="addProfile" data-arg="child">+ Детский профиль</button>${myProfiles().length > 1 ? `<button class="btn ghost danger" data-act="delProfile">Удалить профиль «${esc(p.name)}»</button>` : ''}</div></div>
  <div class="card"><h3>Данные и резервная копия</h3><p class="muted small">${esc(syncLabel())}.</p>
   <div class="row gap wrap"><button class="btn ghost" data-act="modal" data-arg="export">⇩ Резервная копия</button><button class="btn ghost" data-act="modal" data-arg="importAll">⇧ Восстановить из копии</button><button class="btn ghost" data-act="modal" data-arg="exportWords">📋 Экспорт словаря</button><button class="btn ghost danger" data-act="resetProfile">Сбросить прогресс профиля</button></div></div>${window.EQ_SETTINGS_HTML ? window.EQ_SETTINGS_HTML() : ''}`);
}

/* ---------- Модальные окна ---------- */
function modalHTML() {
  const m = UI.modal; if (!m) return '';
  const p = P(); let inner = '';
  if (m.kind === 'word') { const w = p.words.find(x => x.id === m.id); if (!w) { UI.modal = null; return ''; } inner = wordModal(w); }
  else if (m.kind === 'addWord') inner = wordForm(m.prefill ? mkWord(m.prefill) : null);
  else if (m.kind === 'editWord') inner = wordForm(p.words.find(x => x.id === m.id));
  else if (m.kind === 'import') inner = importForm();
  else if (m.kind === 'export') inner = `<h3>Резервная копия</h3><p class="muted small">Скопируйте текст и сохраните в заметках или файле.</p><textarea id="expTxt" rows="10" readonly>${esc(JSON.stringify(S))}</textarea><button class="btn" data-act="copy" data-arg="expTxt">Копировать</button>`;
  else if (m.kind === 'exportWords') inner = `<h3>Экспорт словаря</h3><textarea id="expW" rows="12" readonly>${esc(p.words.map(w => w.en + ' - ' + w.ru).join('\n'))}</textarea><button class="btn" data-act="copy" data-arg="expW">Копировать</button>`;
  else if (m.kind === 'importAll') inner = `<form data-form="importAll"><h3>Восстановить из копии</h3><p class="muted small">Вставьте текст резервной копии. Текущие данные будут заменены.</p><textarea name="j" rows="8"></textarea><button class="btn">Восстановить</button></form>`;
  else if (m.kind === 'rword') { const ex = p.words.find(x => norm(x.en) === norm(m.w)); inner = `<h3>${esc(m.w)} <button class="icon-btn" data-act="say" data-arg="${esc(m.w)}">🔊</button></h3>${ex ? `<p>✓ Слово уже в словаре${ex.ru ? ': <b>' + esc(ex.ru) + '</b>' : ''}. Статус: ${ST_LABEL[wStatus(ex)]}.</p>${UI.wordCtx && wStatus(ex) !== 'mastered' ? `<button class="btn" data-act="addRword" data-arg="${esc(m.w)}">🧠 Добавить к изучению перед заданиями</button>` : ''}` : `<p class="muted">Добавить слово в словарь${UI.wordCtx ? ' и выучить его перед заданиями' : ''}? Перевод подставится автоматически.</p><button class="btn" data-act="addRword" data-arg="${esc(m.w)}">+ Я не знаю это слово</button>`}`; }
  else if (m.kind === 'writeTask') { const t = Cloud.tasks.find(x => x.id === m.id); inner = `<form data-form="writeTask" data-arg="${m.id}"><h3>✍️ ${esc(t.title)}</h3><p>${esc(t.prompt || '')}</p><textarea name="t" rows="8" required placeholder="Пиши по-английски…"></textarea><div class="row gap"><button class="btn">Отправить учителю</button><button type="button" class="btn ghost" data-act="modalClose">Отмена</button></div></form>`; }
  else if (m.kind === 'ai') inner = `<h3>${esc(m.title || '🤖 AI Teacher')}</h3><div class="ai-box" id="aiModalBox">${m.text ? md(m.text) : 'Думаю…'}</div>${m.form ? `<form data-form="aiPractice" data-arg="${m.topic}" class="ans-form col"><textarea name="t" rows="4" placeholder="Напиши свои предложения…"></textarea><button class="btn">Проверить</button></form>` : ''}`;
  else if (m.kind === 'review') inner = Teacher.reviewHTML(m.id);
  return `<div class="modal-bg" data-act="modalClose"></div><div class="modal card"><button class="icon-btn m-close" data-act="modalClose">✕</button>${inner}</div>`;
}
function openModal(kind, extra) { UI.modal = Object.assign({ kind }, extra || {}); render(); }

/* ---------- Кабинет учителя ---------- */
const Teacher = {
  state: null, words: {},
  start() {
    const root = Cloud.db.doc('family/state');
    render();
    Cloud.subs.push(root.collection('profiles').onSnapshot(s => { const ps = s.docs.map(d => d.data()).filter(Boolean); this.state = { profiles: ps }; if (!UI.teacher.pid) { const c = ps.find(p => p.kind === 'child') || ps[0]; UI.teacher.pid = c && c.id; } if (!UI.modal) render(); }, () => { this.state = this.state || { profiles: [] }; render(); }));
    Cloud.subscribeTasks();
    setTimeout(() => { if (!this.state) { this.state = { profiles: [] }; render(); } }, 10000);
    (async () => { try { const ok = Cloud.user && await Cloud.user.can('data.write'); Cloud.writable = ok; render(); } catch (e) { } })();
  },
  render() {
    const st = this.state, t = UI.teacher;
    if (!st) return `<div class="teacher"><div class="t-head"><div class="logo">EQ</div><div><b>ENGLISH QUEST</b><small>Кабинет учителя</small></div></div><div class="card center"><p>Загружаем данные учеников…</p></div></div>`;
    if (!st.profiles.length) return `<div class="teacher"><div class="t-head"><div class="logo">EQ</div><div><b>ENGLISH QUEST</b><small>Кабинет учителя</small></div></div><div class="card"><p>Пока нет данных учеников, или у вас нет доступа к ним.</p><p class="muted">${window.EQ_STANDALONE ? 'Попросите семью пригласить ваш email в разделе «Настройки → Доступ», затем обновите страницу.' : 'Попросите владельца приложения пригласить вас по email с ролью «Редактор».'}</p></div></div>`;
    const p = st.profiles.find(x => x.id === t.pid) || st.profiles[0];
    const tasks = Cloud.tasks.filter(x => x.target === p.id || x.target === 'all').sort((a, b) => (b.created || 0) - (a.created || 0));
    const toReview = tasks.filter(x => Cloud.submissions[x.id] && !Cloud.reviews[x.id]);
    let body = '';
    if (t.tab === 'overview') {
      body = resultsHTML(p);
    } else if (t.tab === 'tasks') {
      body = `<div class="card"><h3>Новое задание</h3>${taskForm(p.id)}</div>${tasks.map(x => this.taskRow(x)).join('') || '<p class="muted">Заданий пока нет.</p>'}`;
    } else {
      body = toReview.length ? toReview.map(x => this.taskRow(x)).join('') : '<p class="muted">Все работы проверены 👍</p>';
    }
    return `<div class="teacher"><div class="t-head"><div class="logo">EQ</div><div><b>ENGLISH QUEST</b><small>Кабинет учителя</small></div><div class="grow"></div>${window.EQ_TEACHER_EXTRA ? window.EQ_TEACHER_EXTRA() : ''}<div class="profiles">${st.profiles.map(q => `<button class="pchip ${q.id === p.id ? 'on' : ''}" data-act="tPid" data-arg="${q.id}"><span class="av">${q.avatar}</span><span class="pn">${esc(q.name)}<small>${q.level}</small></span></button>`).join('')}</div></div>
    ${Cloud.writable === false ? '<div class="notice">У вас доступ только для просмотра. Чтобы выдавать задания, попросите владельца дать роль «Редактор».</div>' : ''}
    <div class="tabs">${[['overview', '📊 Обзор'], ['tasks', '📝 Задания'], ['review', `✅ Проверка${toReview.length ? ' (' + toReview.length + ')' : ''}`]].map(x => `<button class="${t.tab === x[0] ? 'on' : ''}" data-act="tTab" data-arg="${x[0]}">${x[1]}</button>`).join('')}</div>${body}</div>`;
  },
  taskRow(x) {
    const sub = Cloud.submissions[x.id], rev = Cloud.reviews[x.id], tt = TASK_TYPES[x.type] || ['📌', ''];
    return `<div class="card task"><div class="task-h"><span class="t-ico">${tt[0]}</span><div class="grow"><b>${esc(x.title)}</b><div class="muted small">${tt[1]}${x.type === 'grammar' && TOP[x.topic] ? ' · ' + TOP[x.topic].name : ''}${x.due ? ' · срок ' + fmtDate(x.due) : ''}</div></div>${rev ? `<span class="grade">${'★'.repeat(rev.grade)}${'☆'.repeat(5 - rev.grade)}</span>` : sub ? `<button class="btn small" data-act="tReview" data-arg="${x.id}">Проверить</button>` : '<span class="pill">Ожидает</span>'}<button class="icon-btn sm" data-act="tDel" data-arg="${x.id}" title="Удалить">🗑</button></div>${sub ? `<div class="muted small">Сдано ${new Date(sub.at).toLocaleString('ru-RU')}${sub.total ? ` · результат ${sub.score}/${sub.total}` : ''}</div>` : ''}${rev && rev.comment ? `<div class="teacher-c">💬 ${esc(rev.comment)}</div>` : ''}</div>`;
  },
  reviewHTML(id) {
    const x = Cloud.tasks.find(t => t.id === id), sub = Cloud.submissions[id], rev = Cloud.reviews[id] || {};
    if (!x || !sub) return '<p>Нет данных</p>';
    return `<h3>Проверка: ${esc(x.title)}</h3>${sub.total ? `<p>Результат: <b>${sub.score} / ${sub.total}</b></p>` : ''}
    ${(sub.answers || []).length ? `<div class="review-list">${sub.answers.map(a => `<div class="review-item"><div>${esc(a.q)}</div><div class="${a.ok ? 'ok-t' : 'bad-t'}">${a.ok ? '✓' : '✗'} ${esc(a.given)}</div>${a.ok ? '' : `<div class="muted small">Правильно: ${esc(a.right)}</div>`}</div>`).join('')}</div>` : ''}
    ${sub.text ? `<div class="card soft"><b>Ответ ученика:</b><p class="pre">${esc(sub.text)}</p></div>` : ''}
    ${AI && sub.text ? `<button class="btn small ghost" data-act="tAiCheck" data-arg="${id}">🤖 Черновик проверки от AI</button><div id="tAiBox"></div>` : ''}
    <form data-form="review" data-arg="${id}" class="wform"><label>Оценка</label><div class="stars">${[1, 2, 3, 4, 5].map(n => `<label><input type="radio" name="grade" value="${n}" ${n === (rev.grade || 5) ? 'checked' : ''}><span>★</span></label>`).join('')}</div><label>Комментарий учителя<textarea name="comment" id="tComment" rows="4">${esc(rev.comment || '')}</textarea></label><button class="btn">Сохранить проверку</button></form>`;
  }
};
async function createTask(f) {
  const type = f.type.value, id = uid();
  const t = { id, title: f.title.value.trim(), type, target: f.target.value, due: f.due.value || '', created: Date.now() };
  if (type === 'grammar') t.topic = f.topic.value;
  if (type === 'words') t.words = f.words.value.split('\n').map(l => l.split(/\s+[-–—]\s+|\t/)).filter(a => a[0] && a[0].trim()).map(a => [a[0].trim(), (a[1] || '').trim()]).slice(0, 50);
  if (type === 'writing') t.prompt = f.prompt.value.trim();
  if (type === 'quiz') t.questions = f.quiz.value.split('\n').map(l => l.split('|').map(x => x.trim())).filter(a => a.length >= 3 && a[0] && a[1]).slice(0, 30);
  if (type === 'words' && !t.words.length) return toast('Добавьте хотя бы одно слово');
  if (type === 'quiz' && !t.questions.length) return toast('Добавьте вопросы в формате: вопрос | ответ | неверный | неверный');
  if (type === 'writing' && !t.prompt) return toast('Опишите задание');
  try { await Cloud.db.collection('tasks').doc(id).set(JSON.parse(JSON.stringify(t))); toast('✅ Задание выдано'); f.reset(); }
  catch (e) { toast(e && e.code === 'invalid_argument' ? 'Нет прав на запись.' : 'Не удалось сохранить задание'); }
}

/* ---------- Тосты ---------- */
function toast(html, kind) { const box = $('#toasts'); if ([...box.children].some(c => c.innerHTML === html)) return; while (box.children.length >= 3) box.firstChild.remove(); const el = document.createElement('div'); el.className = 'toast ' + (kind || ''); el.innerHTML = html; box.appendChild(el); setTimeout(() => el.classList.add('out'), 3200); setTimeout(() => el.remove(), 3800); }
function xpPop(n) { const el = document.createElement('div'); el.className = 'xp-pop'; el.textContent = '+' + n + ' XP'; document.body.appendChild(el); setTimeout(() => el.remove(), 1300); }

/* ---------- AI-действия ---------- */
async function aiWordsGame(opt) {
  const p = P(); const ws = shuffle(p.words.filter(w => w.ru && w.stage > 0)).slice(0, 6); const src = ws.length >= 3 ? ws : shuffle(p.words).slice(0, 6);
  toast('✨ AI готовит упражнения из ваших слов…');
  try {
    const arr = await askJSON(`Создай 6 упражнений «вставь слово» для ученика (${learnerDesc(p)}). Используй эти английские слова (по одному на упражнение): ${src.map(w => w.en + ' (' + w.ru + ')').join(', ')}.
Каждое — JSON-объект: {"q": предложение на английском с пропуском ___ вместо слова (слово в нужной форме), "a": пропущенное слово точно как в предложении, "o": массив из 4 вариантов, включая правильный (остальные — другие слова из списка в той же форме), "e": короткое объяснение по-русски с переводом предложения}. Предложения жизненные${isKid(p) ? ', детские' : ', часть — про работу и семью'}. Верни JSON-массив.`);
    const qs = (Array.isArray(arr) ? arr : arr.items || []).filter(x => x && x.q && x.a && Array.isArray(x.o)).map(x => { const o = x.o.map(String); if (!o.includes(x.a)) o[0] = x.a; const w = src.find(w => norm(x.a).startsWith(normWord(w.en).slice(0, 4))); return { kind: 'mcq', prompt: x.q, sub: '✨ AI-упражнение', options: shuffle(o), answer: String(x.a), explain: x.e || '', tag: w ? { word: w.id } : {} }; });
    if (!qs.length) throw {};
    runQuiz({ title: 'AI-упражнения', icon: '✨', questions: qs, step: opt.step });
  } catch (e) { toast(aiErr(e)); }
}
async function aiWhy() {
  const g = UI.game, q = g.cfg.questions[g.i]; g.aiWhy = 'Думаю…'; render();
  try { g.aiWhy = await ask(`${sysPrompt('teacher', P())}\nУченик ответил на задание неправильно.\nЗадание: ${qText(q)}\nОтвет ученика: ${q.kind === 'error' ? q.toks[g.given] : q.kind === 'builder' ? g.sel.map(i => q.tokens[i]).join(' ') : g.given}\nПравильный ответ: ${q.answer}\nОбъясни коротко (3–4 предложения), почему так, и дай ещё один пример.`); } catch (e) { g.aiWhy = aiErr(e); }
  if (UI.game === g) render();
}
async function aiModal(title, prompt, extra) {
  UI.modal = Object.assign({ kind: 'ai', title, text: '' }, extra || {}); render();
  try { const t = await ask(prompt, { onText: ({ text }) => { const el = $('#aiModalBox'); if (el) el.innerHTML = md(text); } }); if (UI.modal && UI.modal.kind === 'ai') { UI.modal.text = t; render(); } }
  catch (e) { if (UI.modal) { UI.modal.text = aiErr(e); render(); } }
}
async function aiFillForm() {
  const f = $('form[data-form="saveWord"]'); const en = f.en.value.trim(); if (!en) return toast('Сначала введите слово');
  const st = $('#aiFillStatus'); st.textContent = '✨ AI подбирает перевод, мнемонику и примеры…';
  try {
    const d = await aiWordData(en);
    if (d.ru && !f.ru.value) f.ru.value = d.ru; f.ipa.value = f.ipa.value || d.ipa; f.pos.value = f.pos.value || d.pos; f.meaning.value = f.meaning.value || d.meaning; f.mnemo.value = f.mnemo.value || d.mnemo; f.emoji.value = f.emoji.value || d.emoji;
    if (!f.ex.value) f.ex.value = d.examples.map(e => e.en + ' | ' + e.ru).join('\n');
    f.syn.value = f.syn.value || d.syn.join(', '); f.ant.value = f.ant.value || d.ant.join(', '); f.coll.value = f.coll.value || d.coll.join(', '); f.senses.value = d.senses || '';
    st.textContent = '✓ Готово — проверьте и сохраните';
  } catch (e) { st.textContent = aiErr(e); }
}
async function aiFillWord(w, p = P()) { const d = await aiWordData(w.en, p); ['ru', 'ipa', 'pos', 'meaning', 'mnemo', 'emoji', 'senses'].forEach(k => { if (!w[k] && d[k]) w[k] = d[k]; }); if (!w.examples.length) w.examples = d.examples; if (!w.syn.length) w.syn = d.syn; if (!w.ant.length) w.ant = d.ant; if (!w.coll.length) w.coll = d.coll; }
async function aiMnemo(id) {
  const p = P(), w = p.words.find(x => x.id === id); if (!w) return;
  toast('✨ Придумываю ассоциацию…');
  try { const r = await askJSON(`Придумай мнемонику для английского слова "${w.en}" (перевод: ${w.ru}) методом ключевых слов для ученика (${learnerDesc(p)}): найди русское слово или фразу, созвучные английскому (выдели созвучие ЗАГЛАВНЫМИ буквами), и придумай яркий, смешной образ, связывающий созвучие со значением. 1–2 предложения. ${w.mnemo ? 'Не повторяй эту: ' + w.mnemo : ''} Верни JSON {"mnemo": "..."}`); if (r.mnemo) { w.mnemo = r.mnemo; save(); render(); } }
  catch (e) { toast(aiErr(e)); }
}
async function aiText() {
  const p = P(), st = $('#aiTextStatus'); if (st) st.innerHTML = '<p class="muted">✨ AI пишет текст…</p>';
  const ws = shuffle(p.words.filter(w => w.stage > 0)).slice(0, 8).map(w => w.en);
  try {
    const r = await askJSON(`Напиши короткий интересный текст на английском (${isKid(p) ? '60–90 слов, для ребёнка ' + (p.age || 9) + ' лет' : '100–150 слов'}) уровня ${p.level}${ws.length ? ', используя слова: ' + ws.join(', ') : ''}. Верни JSON: {"title": заголовок, "text": текст, "q": [3 вопроса на понимание, каждый — массив [вопрос на английском, правильный ответ, [3 варианта ответа включая правильный]]]}`);
    const t = { id: 'ai' + uid(), level: p.level, kid: isKid(p), title: r.title || 'AI Story', text: r.text || '', q: (r.q || []).filter(q => Array.isArray(q) && Array.isArray(q[2]) && q[2].includes(q[1])) };
    p.aiTexts = (p.aiTexts || []).concat([t]).slice(-6); save(); go('reader', 'reader:' + t.id);
  } catch (e) { if (st) st.innerHTML = `<p class="muted">${aiErr(e)}</p>`; }
}

/* ---------- События ---------- */
const ACT = {
  go: a => { if (a.startsWith('reader:')) return go('reader', a); if (a.startsWith('results:')) return go('results', a.slice(8)); go(a); },
  makeMine: () => { const p = newProfile('adult', { name: 'Я', uid: Cloud.uid || undefined }); S.profiles.push(p); S.activeId = p.id; save(p); go('settings'); },
  lessonDone: () => { const i = UI.lessonStep, tid = UI.arg; if (pendingFor('topic:' + tid).length) return learnPending('topic:' + tid, () => ACT.lessonDone()); UI.lessonStep = null; completeStep(i); save(); const p = P(), pl = planFor(p); let nx = pl.steps.findIndex((s, k) => k > i && !s.done); if (nx < 0) nx = pl.steps.findIndex(s => !s.done); if (nx >= 0) runStep(nx); else go('home'); },
  menu: () => { UI.menu = true; render(); }, menuClose: () => { UI.menu = false; render(); },
  switchP: a => { S.activeId = a; UI.chat = null; save(null); render(); },
  step: a => runStep(+a),
  nextStep: () => { const p = P(); UI.game = null; save(); const i = planFor(p).steps.findIndex(s => !s.done); if (i >= 0) runStep(i); else { render(); toast('🎉 Вся программа на сегодня выполнена!', 'ach'); } },
  game: a => startGame(a),
  gameT: a => startGame(a, { topic: UI.arg }),
  topic: a => go('topic', a),
  closeGame, replay: () => { const c = UI.game.cfg; UI.game = null; const t = c.title; if (c.boss) startGame('boss'); else if (c.topic) startGame('battle', { topic: c.topic }); else { const g = GAMES.find(x => t.startsWith(x.name)); g ? startGame(g.id) : closeGame(); } },
  replayMatch: () => runMatch(), replayMemory: () => runMemory(),
  ans: a => answer(a), ansErr: a => answer(+a), nextQ,
  tok: a => { UI.game.sel.push(+a); render(); }, unTok: a => { UI.game.sel.splice(+a, 1); render(); }, resetTok: () => { UI.game.sel = []; render(); }, checkBuild: () => answer(null),
  say: a => speak(a), sayClean: a => speak(a.replace(/[*_#>]/g, '')),
  aiWhy,
  flip: () => { UI.game.flipped = true; render(); const c = flashCur(); if (c && UI.game.dirFor(c) === 'ru') speak(c.w.en); },
  rate: a => { const g = UI.game, { it, w } = flashCur(); const r = +a; srs(w, r); g.reviewed++; P().stats.reviews++; if (r === 0 && !g.requeued[w.id]) { g.requeued[w.id] = 1; g.queue.push({ id: w.id, learn: false }); } const xp = r ? 5 : 2; g.xp += xp; addXP(xp, P(), true); flashNext(); },
  flashPhase: () => { const g = UI.game; g.phase++; render(); const c = flashCur(); if (g.phase === 3 && c.w.examples[0]) speak(c.w.examples[0].en); },
  flashCheck: a => { const g = UI.game, { w } = flashCur(); g.checked = a; if (a === w.ru) speak(w.en); render(); },
  flashLearnDone: () => { const g = UI.game, { it, w } = flashCur(), p = P(); const ok = g.checked === w.ru; g.checked = null;
    if (ok) { srs(w, 2); g.learned++; p.introIds = p.introIds && p.introIds[today()] ? p.introIds : { [today()]: [] }; p.introIds[today()].push(w.id); p.intro[today()] = (p.intro[today()] || 0) + 1; Object.keys(p.intro).forEach(d => { if (daysBetween(d, today()) > 7) delete p.intro[d]; }); g.xp += 10; addXP(10, p, true); }
    else if (!g.requeued[w.id]) { g.requeued[w.id] = 1; g.queue.push({ id: w.id, learn: true }); toast('Ничего страшного — это слово вернётся в конце 🔁'); }
    else { srs(w, 1); g.learned++; p.intro[today()] = (p.intro[today()] || 0) + 1; }
    flashNext(); },
  aiMnemo: a => aiMnemo(a),
  matchPick, memFlip,
  vStatus: a => { UI.vocab.status = UI.vocab.status === a ? '' : a; render(); },
  word: a => openModal('word', { id: a }),
  modal: a => { const [k, id] = a.split(':'); openModal(k, { id }); },
  modalClose: () => { UI.modal = null; render(); if (UI.needRender) render(); },
  trainWord: a => { UI.modal = null; startGame('wordtrain', { word: a }); },
  learnWord: a => { UI.modal = null; runFlash({ words: [a] }); },
  delWord: a => { const p = P(); const w = p.words.find(x => x.id === a); if (UI.modal.confirm !== a) { UI.modal.confirm = a; toast(`Нажмите «Удалить» ещё раз, чтобы удалить «${esc(w.en)}»`); return; } p.words = p.words.filter(x => x.id !== a); UI.modal = null; save(); render(); },
  aiFill: aiFillForm,
  aiFillExisting: async a => { const w = P().words.find(x => x.id === a); toast('✨ AI дополняет слово…'); try { await aiFillWord(w); save(); render(); toast('✓ Слово дополнено'); } catch (e) { toast(aiErr(e)); } },
  addWotd: () => { const p = P(), d = wotd(p); const w = mkWord({ en: d.en, ru: d.ru, examples: d.ex ? [{ en: d.ex, ru: '' }] : [], own: true, cat: isKid(p) ? 'Animals' : 'General Vocabulary', emoji: d.emoji || '' }); const seed = (isKid(p) ? D.KID_WORDS : D.ADULT_WORDS).find(a => a[0] === d.en); if (seed) Object.assign(w, { mnemo: seed[5], ipa: seed[3] }); p.words.unshift(w); checkAch(p); save(); render(); toast('Слово добавлено в словарь'); if (AI && !w.mnemo) aiFillWord(w).then(() => { save(); render(); }).catch(() => { }); },
  rword: a => { if (!a) return; speak(a); UI.wordCtx = UI.game ? null : UI.view === 'topic' ? 'topic:' + UI.arg : UI.view === 'reader' ? 'read:' + String(UI.arg).replace('reader:', '') : null; openModal('rword', { w: a }); },
  translateMissing: () => translateMissing(),
  flashAfter: () => { const f = UI.game && UI.game.after; UI.game = null; save(); if (f) f(); else render(); },
  learnPendingTopic: () => { const id = UI.arg; learnPending('topic:' + id, () => go('topic', id)); },
  learnPendingRead: a => learnPending('read:' + a, () => go('reader', 'reader:' + a)),
  skipPending: () => { UI.pending = null; render(); },
  addRword: async a => {
    const p = P(), ctx = UI.wordCtx; let w = p.words.find(x => norm(x.en) === norm(a));
    if (!w) { w = mkWord({ en: a.toLowerCase(), own: true, cat: allCats(p)[0] }); p.words.unshift(w); }
    if (ctx) markPending(ctx, w.id);
    UI.modal = null; save(); render(); toast(`«${esc(a)}» добавлено${ctx ? ' — выучишь перед заданиями' : ' в словарь'}`);
    if (!w.ru) { const ok = await autoFill(w); save(); if (UI.view !== 'reader' && UI.view !== 'topic' || !UI.game) render(); toast(ok ? `🌐 ${esc(w.en)} — ${esc(w.ru)}` : 'Перевод не найден — добавьте вручную'); }
  },
  readAns: a => { const [i, o] = a.split('|'); UI.readQ.ans[i] = o; const pp = P(); pp.readDone = pp.readDone || {}; const r = D.READING.concat(P().aiTexts || []).find(x => x.id === UI.readQ.id); if (r && r.q[i][1] === o) addXP(10); else P().stats.bad++; if (Object.keys(UI.readQ.ans).length === r.q.length) { pp.readDone[r.id] = today(); toast('📖 Текст прочитан! +' + (r.ielts ? 30 : 15) + ' XP', 'ach'); addXP(r.ielts ? 30 : 15, pp, true); const st = planFor(P()).steps.findIndex(s => s.k === 'read' && !s.done); if (st >= 0) completeStep(st); } save(); render(); },
  aiText,
  exportXlsx: () => { const p = P(); exportTable(wordsTableRows(p), 'english-quest-' + (p.name || 'words') + '-' + today()); toast('⬇ Словарь скачивается'); },
  tplDownload: () => exportTable([['English', 'Перевод', 'Категория', 'Пример', 'Перевод примера'], ['to postpone', 'откладывать', 'Work', 'We need to postpone the meeting.', 'Нам нужно перенести встречу.'], ['luggage', 'багаж', 'Travel', '', '']], 'english-quest-шаблон'),
  aiMode: a => { UI.chat = { mode: a, messages: [], busy: false }; render(); },
  scenario: a => startScenario(a),
  aiSuggest: a => sendChat(a),
  aiReset: () => { const c = UI.chat; UI.chat = { mode: c.mode, messages: [], busy: false, scenario: c.mode === 'speak' ? null : null }; render(); },
  newStoryWords: () => { UI.chat.words = shuffle(introduced(P())).slice(0, 5).map(w => w.en); render(); },
  aiTopic: a => { const t = TOP[a]; aiModal('🤖 ' + t.name + ' — простыми словами', `${sysPrompt('teacher', P())}\nОбъясни тему «${t.name}» (${t.ru}) очень простыми словами, как будто объясняешь ${isKid() ? 'ребёнку' : 'другу'}. Дай образ или аналогию из жизни, 3 примера с переводом и одну подсказку, как не путать с похожими темами.`); },
  practiceTopic: a => { UI.modal = { kind: 'ai', title: '✍️ Практика: ' + TOP[a].name, text: 'Напиши 3 предложения о себе в ' + TOP[a].name + '. AI проверит и объяснит ошибки.', form: true, topic: a }; render(); },
  setVoice: a => { P().voice = a; save(); render(); speak('Hello!'); }, setRate: a => { P().rate = +a; save(); render(); },
  duel: startDuel,
  doTask: a => doTask(a),
  copy: a => { const el = $('#' + a); el.select(); try { navigator.clipboard.writeText(el.value).then(() => toast('Скопировано'), () => toast('Выделите текст и скопируйте вручную')); } catch (e) { toast('Выделите текст и скопируйте вручную'); } },
  addProfile: a => { const p = newProfile(a, { name: a === 'child' ? 'Новый ученик' : 'Новый профиль', uid: a === 'child' ? undefined : (Cloud.uid || undefined) }); S.profiles.push(p); if (isMine(p)) { S.activeId = p.id; save(p); go('settings'); } else { save(p); toast('Детский профиль создан. Выдайте ребёнку логин в «Доступ и аккаунт» — при входе профиль станет его.'); render(); } },
  delProfile: () => { if (UI.confirmDel !== S.activeId) { UI.confirmDel = S.activeId; toast('Нажмите ещё раз, чтобы удалить профиль со всем прогрессом'); return; } const id = S.activeId; S.profiles = S.profiles.filter(p => p.id !== id); S.deleted = (S.deleted || []).concat([id]); S.activeId = S.profiles[0].id; save(null); go('home'); },
  resetProfile: () => { const p = P(); if (UI.confirmReset !== p.id) { UI.confirmReset = p.id; toast('Нажмите ещё раз, чтобы сбросить прогресс (слова останутся)'); return; } Object.assign(p, { xp: 0, xpLog: {}, timeLog: {}, streak: { count: 0, last: null, best: 0 }, topics: {}, plans: {}, ach: {}, intro: {} }); p.words.forEach(w => Object.assign(w, { stage: 0, due: null, reps: 0, lapses: 0, ok: 0, bad: 0 })); save(); render(); toast('Прогресс сброшен'); },
  tPid: a => { UI.teacher.pid = a; render(); }, tTab: a => { UI.teacher.tab = a; render(); },
  tReview: a => openModal('review', { id: a }),
  tDel: async a => { if (UI.tConfirm !== a) { UI.tConfirm = a; toast('Нажмите 🗑 ещё раз, чтобы удалить задание'); return; } try { await Cloud.db.collection('tasks').doc(a).delete(); toast('Задание удалено'); } catch (e) { toast('Не удалось удалить'); } },
  tAiCheck: async a => { const sub = Cloud.submissions[a], x = Cloud.tasks.find(t => t.id === a); const box = $('#tAiBox'); box.innerHTML = '<p class="muted">AI проверяет…</p>'; try { const t = await ask(`Ты помогаешь учителю английского проверить работу ученика. Задание: ${x.prompt || x.title}\nОтвет ученика:\n${sub.text}\n\nНапиши по-русски: найденные ошибки (❌ → ✅ с кратким объяснением), сильные стороны и предложи оценку от 1 до 5. Коротко.`); box.innerHTML = `<div class="ai-box">${md(t)}</div>`; const c = $('#tComment'); if (c && !c.value) c.value = t.slice(0, 1500); } catch (e) { box.innerHTML = `<p class="muted">${aiErr(e)}</p>`; } }
};
const FORMS = {
  onboard: f => {
    S = blankState();
    const a = newProfile('adult', { name: f.aName.value.trim() || 'Я', avatar: (f.querySelector('[name=aAv]:checked') || {}).value || '🦊', level: f.aLevel.value === 'test' ? 'A2' : f.aLevel.value, minutes: +f.aMin.value, theme: f.aTheme.value, newPerDay: +f.aMin.value >= 40 ? 10 : 6 });
    S.profiles.push(a);
    if (f.kidOn.checked) S.profiles.push(newProfile('child', { name: f.kName.value.trim() || 'Сын', avatar: (f.querySelector('[name=kAv]:checked') || {}).value || '🦁', age: +f.kAge.value || 9, minutes: +f.kMin.value, theme: f.kTheme.value, newPerDay: +f.kMin.value >= 25 ? 5 : 4 }));
    if (Cloud.uid) a.uid = Cloud.uid;
    S.activeId = a.id; save(null); S.profiles.forEach(p => p.updatedAt = Date.now());
    if (Cloud.db && Cloud.owner && !Cloud.on) { Cloud.on = true; setSync('cloud'); Cloud.subscribe(); Cloud.subscribeTasks(); Cloud.save(); }
    if (f.aLevel.value === 'test') startGame('placement'); else render();
  },
  ansInput: f => { answer($('#qInput').value); },
  ansFree: async f => {
    const g = UI.game, q = g.cfg.questions[g.i], v = $('#qInput').value.trim(); if (!v) return;
    if (!AI) { const ok = norm(v).includes(normWord(q.word).split(' ')[0].slice(0, 4)); g.freeFb = ok ? 'Отлично! Слово использовано. 👍' : `Попробуй использовать слово «${q.word}» в предложении.`; answer(v, ok); return; }
    g.checking = true; render();
    try { const r = await askJSON(`Ученик (${learnerDesc(P())}) составил предложение со словом "${q.word}": "${v}". Проверь грамматику и правильность употребления слова. Верни JSON {"ok": true/false (true, если предложение понятное и слово употреблено правильно, мелкие ошибки допустимы), "feedback": краткий отзыв по-русски: что хорошо, ошибки в формате ❌ → ✅, исправленный вариант}`); g.freeFb = r.feedback || ''; g.checking = false; answer(v, !!r.ok); }
    catch (e) { g.checking = false; g.freeFb = aiErr(e); answer(v, norm(v).includes(normWord(q.word).slice(0, 4))); }
  },
  myMnemo: f => { const { w } = flashCur(); const v = f.m.value.trim(); if (!v) return; if (!w.myMnemo) P().stats.mnemos++; w.myMnemo = v; checkAch(); save(); render(); toast('💡 Ассоциация сохранена'); },
  myMnemoW: f => { const w = P().words.find(x => x.id === f.dataset.arg); const v = f.m.value.trim(); if (v && !w.myMnemo) P().stats.mnemos++; w.myMnemo = v; checkAch(); save(); render(); toast('💡 Сохранено'); },
  saveWord: async f => {
    const p = P(); let w = p.words.find(x => x.id === f.dataset.arg); const isNew = !w;
    let cat = f.cat.value; if (cat === '__new') { cat = f.newcat.value.trim() || 'My Own Category'; S.family.cats = (S.family.cats || []).concat([cat]); }
    const data = { en: f.en.value.trim(), ru: f.ru.value.trim(), cat, type: f.type.value, ipa: f.ipa.value.trim(), pos: f.pos.value.trim(), emoji: f.emoji.value.trim(), meaning: f.meaning.value.trim(), mnemo: f.mnemo.value.trim(), senses: f.senses.value, examples: f.ex.value.split('\n').map(l => l.split('|')).filter(a => a[0].trim()).map(a => ({ en: a[0].trim(), ru: (a[1] || '').trim() })), syn: f.syn.value.split(',').map(s => s.trim()).filter(Boolean), ant: f.ant.value.split(',').map(s => s.trim()).filter(Boolean), coll: f.coll.value.split(',').map(s => s.trim()).filter(Boolean) };
    if (!data.en) return;
    if (isNew && p.words.some(x => norm(x.en) === norm(data.en))) return toast('Такое слово уже есть в словаре');
    if (isNew) { w = mkWord(Object.assign(data, { own: true })); p.words.unshift(w); } else Object.assign(w, data);
    UI.modal = null; checkAch(p); save(); render(); toast(isNew ? `«${esc(w.en)}» добавлено — упражнения из него уже готовы` : 'Сохранено');
    if (isNew && (AI ? (!w.ru || !w.mnemo || !w.examples.length) : (!w.ru || !w.examples.length))) { await autoFill(w); save(); render(); }
  },
  import: async f => {
    const fileIn = $('#impFile'); let items = [];
    if (fileIn && fileIn.files && fileIn.files[0]) { const info = $('#impFileInfo'); try { if (info) info.textContent = 'Читаю таблицу…'; items = rowsToWords(await readTableFile(fileIn.files[0])); } catch (e) { if (info) info.textContent = 'Не удалось прочитать файл. Сохраните таблицу как .xlsx или .csv и попробуйте ещё раз.'; return; } }
    const lines = f.list.value.split('\n').map(l => l.trim()).filter(Boolean);
    lines.forEach(l => { const a = l.includes('\t') ? l.split('\t') : l.split(/\s+[-–—=:]\s+/); items.push({ en: (a[0] || '').trim(), ru: (a[1] || '').trim(), cat: (a[2] || '').trim() }); });
    if (!items.length) return toast('Выберите файл или вставьте слова');
    await importWords(items, f.cat.value, !!(f.ai && f.ai.checked));
  },
  importAll: f => { try { const s = JSON.parse(f.j.value); if (!s.profiles) throw 0; S = s; S.profiles.forEach(p => p.updatedAt = Date.now()); UI.modal = null; save(null); render(); toast('Данные восстановлены'); } catch (e) { toast('Не удалось прочитать копию'); } },
  chat: f => { const v = f.t.value; f.t.value = ''; sendChat(v); },
  profile: f => { const p = P(); const kindChanged = p.kind !== f.kind.value; Object.assign(p, { name: f.name.value.trim() || p.name, kind: f.kind.value, age: +f.age.value || p.age, avatar: (f.querySelector('[name=avatar]:checked') || {}).value || p.avatar, level: f.level.value, minutes: +f.minutes.value || p.minutes, newPerDay: +f.newPerDay.value || p.newPerDay, theme: (f.querySelector('[name=theme]:checked') || {}).value || p.theme, hard: !!(f.hard && f.hard.checked), intensive: f.intensive ? f.intensive.checked : p.intensive }); if (kindChanged || true) { const pl = p.plans[today()]; if (pl && !pl.steps.some(s => s.done)) delete p.plans[today()]; } save(); render(); toast('Сохранено'); },
  family: f => { S.family.goal = +f.goal.value || 2000; S.family.reward = f.reward.value.trim(); S.family.cats = f.cats.value.split(',').map(s => s.trim()).filter(Boolean); save(null); render(); toast('Сохранено'); },
  newTask: f => createTask(f),
  writeTask: f => { const id = f.dataset.arg, text = f.t.value.trim(); if (!text) return; UI.modal = null; render(); if (!Teacher.submit) doTask(id); Teacher.submit({ text }); },
  review: async f => { const id = f.dataset.arg; const grade = +((f.querySelector('[name=grade]:checked') || {}).value || 5); try { await Cloud.db.collection('reviews').doc(id).set({ taskId: id, grade, comment: f.comment.value.trim(), at: Date.now() }); UI.modal = null; render(); toast('✅ Проверка сохранена'); } catch (e) { toast('Не удалось сохранить. Нужна роль «Редактор».'); } },
  aiPractice: async f => { const t = f.t.value.trim(); if (!t) return; const top = TOP[f.dataset.arg]; UI.modal.form = false; aiModal('✍️ Проверка: ' + top.name, `${sysPrompt('check', P())}\nУченик тренирует тему «${top.name}». Его предложения:\n${t}\nПроверь, правильно ли использовано время/конструкция, и объясни ошибки.`); addXP(20); save(); }
};
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]'); if (!el) return;
  if (el.classList.contains('modal-bg') && e.target !== el) return;
  const fn = ACT[el.dataset.act]; if (!fn) return;
  e.preventDefault(); try { fn(el.dataset.arg, el, e); } catch (err) { console.error(err); }
});
document.addEventListener('submit', e => { const f = e.target.closest('[data-form]'); if (!f) return; e.preventDefault(); const fn = FORMS[f.dataset.form]; if (fn) try { fn(f); } catch (err) { console.error(err); } });
document.addEventListener('input', e => { const el = e.target; if (el.dataset.input === 'vq') { UI.vocab.q = el.value; const pos = el.selectionStart; render(); const n = $('[data-input="vq"]'); if (n) { n.focus(); n.setSelectionRange(pos, pos); } } });
document.addEventListener('change', e => {
  const el = e.target;
  if (el.dataset.change === 'vcat') { UI.vocab.cat = el.value; render(); }
  if (el.id === 'impFile' && el.files[0]) { const info = $('#impFileInfo'); readTableFile(el.files[0]).then(r => { const ws = rowsToWords(r); if (info) info.innerHTML = ws.length ? `Найдено слов: <b>${ws.length}</b> (например: ${esc(ws.slice(0, 3).map(w => w.en + (w.ru ? ' — ' + w.ru : '')).join('; '))}). Нажмите «Добавить слова».` : 'В файле не найдено слов. Проверьте, что английские слова в первой колонке.'; }).catch(() => { if (info) info.textContent = 'Не удалось прочитать файл. Сохраните как .xlsx или .csv.'; }); }
  if (el.dataset.change === 'ttype') { const f = el.form; $$('.tt', f).forEach(x => x.classList.toggle('hidden', !x.classList.contains('tt-' + el.value))); }
  if (el.name === 'cat' && el.form && el.form.dataset.form === 'saveWord') { const nc = $('.newcat', el.form); if (nc) nc.classList.toggle('hidden', el.value !== '__new'); }
});
document.addEventListener('keydown', e => {
  if (!UI.game) { if (e.key === 'Escape' && UI.modal) { UI.modal = null; render(); } return; }
  const g = UI.game;
  if (g.type === 'quiz' && g.answered && e.key === 'Enter' && !(e.target.tagName === 'TEXTAREA')) { e.preventDefault(); nextQ(); }
  else if (g.type === 'quiz' && !g.answered && /^[1-4]$/.test(e.key) && !/INPUT|TEXTAREA/.test(e.target.tagName)) { const q = g.cfg.questions[g.i]; if (q.kind === 'mcq' && q.options[+e.key - 1]) answer(q.options[+e.key - 1]); }
  else if (g.type === 'flash' && g.flipped && /^[1-4]$/.test(e.key)) ACT.rate(String(+e.key - 1));
  else if (g.type === 'flash' && !g.flipped && e.key === ' ' && !g.queue[g.i].learn) { e.preventDefault(); ACT.flip(); }
});

/* ---------- Запуск ---------- */
S = loadLocal();
if (S) S.profiles.forEach(p => { p.stats = Object.assign({ listen: 0, speak: 0, diary: 0, duelWins: 0, reviews: 0, mnemos: 0, ok: 0, bad: 0, rewarded: {} }, p.stats); p.intro = p.intro || {}; });
render();
Cloud.init().then(() => render());
initCaps();
window.EQ_APP = { render: () => render(), toast };
})();
