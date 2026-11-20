/* ENGLISH QUEST — учебный контент */
window.EQ_DATA = (function () {
  // items: [вопрос с ___, ответ, [варианты], объяснение]
  // errors: [предложение с ошибкой, неверное слово, исправленное предложение, объяснение]
  const T = [];
  T.push({
    id: "ps", name: "Present Simple", ru: "Настоящее простое", level: "A1", kid: true, tense: true, row: "Present", col: "Simple",
    intro: "Говорим о том, что происходит регулярно, всегда или является фактом: привычки, расписания, законы природы.",
    use: ["Привычки и регулярные действия: I drink coffee every morning.", "Факты и общие истины: Water boils at 100 degrees.", "Расписания: The train leaves at 7 a.m.", "Состояния и чувства: I like music. She knows English."],
    formula: [["+", "I / You / We / They + V   •   He / She / It + V-s/-es"], ["−", "I / You / We / They + don't + V   •   He / She / It + doesn't + V"], ["?", "Do + I/you/we/they + V?   •   Does + he/she/it + V?"]],
    markers: ["always", "usually", "often", "sometimes", "never", "every day", "on Mondays", "twice a week"],
    examples: [["I drink coffee every morning", "Я пью кофе каждое утро."], ["She works in a big company", "Она работает в большой компании."], ["We do not watch TV in the evening", "Мы не смотрим телевизор вечером."], ["Does your son like football", "Твой сын любит футбол?"]],
    compare: "Present Simple — «вообще, обычно». Present Continuous — «прямо сейчас». I work in a bank (это моя работа) ↔ I am working now (в эту минуту).",
    tip: "С he/she/it добавляем -s: she works, he goes. После does/doesn't глагол без -s.",
    items: [
      ["She ___ to work by bus.", "goes", ["go", "goes", "is go", "going"], "He/She/It в Present Simple → глагол + -s/-es: go → goes."],
      ["They ___ football on Sundays.", "play", ["plays", "play", "playing", "is playing"], "They — множественное число, глагол без -s."],
      ["___ you like coffee?", "Do", ["Do", "Does", "Are", "Is"], "Вопрос с you строится с Do."],
      ["My brother ___ like fish.", "doesn't", ["don't", "doesn't", "isn't", "not"], "Brother = he → doesn't."],
      ["The shop ___ at 9 a.m.", "opens", ["open", "opens", "opening", "are open"], "Расписание → Present Simple; the shop = it → opens."],
      ["How often ___ she visit her parents?", "does", ["do", "does", "is", "has"], "She → does в вопросе."],
      ["Water ___ at 100 degrees.", "boils", ["boil", "boils", "is boil", "boiling"], "Научный факт → Present Simple, water = it."]
    ],
    errors: [["He like music very much.", "like", "He likes music very much.", "He → like + s = likes."], ["Does she works here?", "works", "Does she work here?", "После does глагол без -s."], ["I doesn't know the answer.", "doesn't", "I don't know the answer.", "С I используется don't."]]
  });
  T.push({
    id: "pc", name: "Present Continuous", ru: "Настоящее длительное", level: "A1", kid: true, tense: true, row: "Present", col: "Continuous",
    intro: "Действие происходит прямо сейчас, в момент речи, или временно в этот период.",
    use: ["Сейчас, в момент речи: I am reading now.", "Временная ситуация: She is living with her parents this month.", "Запланированное будущее: We are meeting the client tomorrow."],
    formula: [["+", "I am / He-She-It is / You-We-They are + V-ing"], ["−", "am not / isn't / aren't + V-ing"], ["?", "Am I / Is he / Are you + V-ing?"]],
    markers: ["now", "right now", "at the moment", "today", "Look!", "Listen!", "these days", "this week"],
    examples: [["I am learning English now", "Я сейчас учу английский."], ["Look the children are playing in the garden", "Смотри, дети играют в саду."], ["She is not working today", "Она сегодня не работает."], ["What are you doing at the moment", "Что ты делаешь в данный момент?"]],
    compare: "Глаголы состояния (know, like, want, need, understand) обычно НЕ используются в Continuous: I know (не I am knowing).",
    tip: "Нужны ДВЕ части: am/is/are + глагол с -ing.",
    items: [
      ["Look! It ___ .", "is raining", ["rains", "is raining", "rained", "rain"], "Look! — действие прямо сейчас → is + V-ing."],
      ["I ___ a book at the moment.", "am reading", ["read", "am reading", "reads", "have read"], "At the moment → Present Continuous: I am reading."],
      ["What ___ you doing now?", "are", ["do", "are", "is", "does"], "You → are."],
      ["Listen! The baby ___ .", "is crying", ["cries", "is crying", "cry", "crying"], "Listen! → прямо сейчас."],
      ["We ___ dinner. Can you call later?", "are having", ["have", "are having", "has", "having"], "Сейчас заняты → are having."],
      ["She isn't ___ today, she is at home.", "working", ["work", "works", "working", "worked"], "После is/isn't нужен V-ing."]
    ],
    errors: [["I am work now.", "work", "I am working now.", "После am нужен глагол с -ing."], ["She are reading a book.", "are", "She is reading a book.", "She → is."], ["Why you are laughing?", "you", "Why are you laughing?", "В вопросе are ставится перед подлежащим."]]
  });
  T.push({
    id: "pp", name: "Present Perfect", ru: "Настоящее совершённое", level: "A2", kid: false, tense: true, row: "Present", col: "Perfect",
    intro: "Действие уже совершилось, и важен его результат сейчас. Время действия не называется.",
    use: ["Результат к настоящему: I have lost my keys (и сейчас не могу войти).", "Жизненный опыт: Have you ever been to London?", "Недавние события: She has just arrived.", "Период, который ещё не закончился: I have drunk three cups of coffee today."],
    formula: [["+", "I/You/We/They have + V3   •   He/She/It has + V3"], ["−", "haven't / hasn't + V3"], ["?", "Have / Has + подлежащее + V3?"]],
    markers: ["already", "yet", "just", "ever", "never", "recently", "so far", "since", "for", "this week"],
    examples: [["I have already finished the report", "Я уже закончила отчёт."], ["Have you ever been to London", "Ты когда-нибудь был в Лондоне?"], ["She has just called me", "Она только что мне позвонила."], ["We have not seen this film yet", "Мы ещё не видели этот фильм."]],
    compare: "Past Simple — есть конкретное время в прошлом (yesterday, in 2020, two days ago). Present Perfect — время не названо, важен результат: I have seen it ↔ I saw it yesterday.",
    tip: "have/has + 3-я форма глагола (done, seen, gone, written, worked).",
    items: [
      ["I have already ___ my homework.", "done", ["did", "done", "do", "doing"], "После have нужна 3-я форма: do → did → done."],
      ["___ you ever been to London?", "Have", ["Did", "Have", "Has", "Were"], "Опыт (ever) → Have you ever been...?"],
      ["She ___ just arrived.", "has", ["have", "has", "is", "did"], "She → has."],
      ["We haven't finished the report ___ .", "yet", ["already", "yet", "just", "ago"], "Yet — в отрицаниях и вопросах, в конце предложения."],
      ["They ___ here since 2020.", "have lived", ["live", "lived", "have lived", "are living"], "Since 2020 и до сих пор → Present Perfect."],
      ["I ___ my keys. I can't open the door.", "have lost", ["lose", "have lost", "am losing", "loses"], "Результат сейчас (не могу открыть) → have lost."],
      ["He has never ___ sushi.", "eaten", ["ate", "eat", "eaten", "eating"], "Never + have/has + V3: eat → ate → eaten."]
    ],
    errors: [["I have saw this film.", "saw", "I have seen this film.", "После have — 3-я форма: see → saw → seen."], ["She have finished her work.", "have", "She has finished her work.", "She → has."], ["I have seen him yesterday.", "have", "I saw him yesterday.", "Yesterday — конкретное время → Past Simple."]]
  });
  T.push({
    id: "ppc", name: "Present Perfect Continuous", ru: "Настоящее совершённое длительное", level: "B1", kid: false, tense: true, row: "Present", col: "Perfect Continuous",
    intro: "Действие началось в прошлом и продолжается до сих пор (или только что закончилось). Важна ДЛИТЕЛЬНОСТЬ.",
    use: ["Как долго длится действие: I have been learning English for two years.", "Видимый результат длительного действия: I'm tired because I have been working all day."],
    formula: [["+", "have / has + been + V-ing"], ["−", "haven't / hasn't + been + V-ing"], ["?", "Have / Has + подлежащее + been + V-ing?"]],
    markers: ["for", "since", "all day", "how long", "lately", "recently", "all morning"],
    examples: [["I have been waiting for an hour", "Я жду уже час."], ["How long have you been working here", "Как долго ты здесь работаешь?"], ["She has been studying since morning", "Она занимается с утра."]],
    compare: "Present Perfect — результат (I have written 3 letters). Present Perfect Continuous — процесс и длительность (I have been writing letters all morning).",
    tip: "for + период (for two hours), since + начальная точка (since Monday).",
    items: [
      ["I ___ English for two years.", "have been learning", ["learn", "am learning", "have been learning", "was learning"], "For two years и до сих пор → have been + V-ing."],
      ["How long ___ you been waiting?", "have", ["did", "are", "have", "has"], "How long + have you been...?"],
      ["She is tired because she ___ all day.", "has been working", ["works", "has been working", "is working", "work"], "Длительное действие с результатом (устала)."],
      ["It ___ raining since morning.", "has been", ["is", "has been", "was", "have been"], "It → has been."],
      ["They have been ___ the house for a week.", "painting", ["paint", "painted", "painting", "paints"], "После been → V-ing."],
      ["We ___ for you since 5 o'clock!", "have been waiting", ["wait", "are waiting", "have been waiting", "waits"], "Since 5 o'clock до сих пор → have been waiting."]
    ],
    errors: [["I have been work here since May.", "work", "I have been working here since May.", "После been → V-ing."], ["She has been studying for 2020.", "for", "She has been studying since 2020.", "С точкой во времени — since."], ["They has been playing all day.", "has", "They have been playing all day.", "They → have."]]
  });
  T.push({
    id: "pas", name: "Past Simple", ru: "Прошедшее простое", level: "A1", kid: true, tense: true, row: "Past", col: "Simple",
    intro: "Действие произошло и закончилось в прошлом. Обычно понятно КОГДА.",
    use: ["Законченное действие в прошлом: I visited Samarkand last summer.", "Цепочка событий: I came home, cooked dinner and went to bed.", "Привычки в прошлом: When I was a child, I played the piano."],
    formula: [["+", "V-ed (правильные) / V2 (неправильные): worked, went, saw"], ["−", "didn't + V"], ["?", "Did + подлежащее + V?"]],
    markers: ["yesterday", "last week", "last year", "ago", "in 2015", "when I was a child", "then"],
    examples: [["I watched a film yesterday", "Я вчера смотрела фильм."], ["We went to the mountains last summer", "Прошлым летом мы ездили в горы."], ["Did you call him last week", "Ты звонил ему на прошлой неделе?"], ["She did not come to the meeting", "Она не пришла на встречу."]],
    compare: "Past Simple — конкретный момент в прошлом. Present Perfect — результат сейчас, время не указано.",
    tip: "После did / didn't глагол в начальной форме: Did you go? (не Did you went?)",
    items: [
      ["I ___ to Samarkand last summer.", "went", ["go", "went", "have gone", "goes"], "Last summer → Past Simple, go → went."],
      ["She ___ the email yesterday.", "sent", ["send", "sent", "has sent", "sends"], "Yesterday → Past Simple, send → sent."],
      ["___ you see the film last night?", "Did", ["Do", "Did", "Have", "Were"], "Вопрос в прошлом → Did."],
      ["We didn't ___ the meeting.", "attend", ["attended", "attend", "attends", "attending"], "После didn't — глагол без -ed."],
      ["They ___ in London two years ago.", "lived", ["live", "lived", "have lived", "living"], "Ago → Past Simple."],
      ["What time ___ you get up yesterday?", "did", ["do", "did", "have", "were"], "Yesterday → did."],
      ["My son ___ a picture for me.", "drew", ["draw", "drew", "drawed", "drawn"], "draw → drew → drawn. drawed — такой формы нет."]
    ],
    errors: [["I goed to the park.", "goed", "I went to the park.", "Go — неправильный глагол: go → went."], ["Did she called you?", "called", "Did she call you?", "После did — начальная форма глагола."], ["We didn't went home.", "went", "We didn't go home.", "После didn't — go."]]
  });
  T.push({
    id: "pac", name: "Past Continuous", ru: "Прошедшее длительное", level: "A2", kid: false, tense: true, row: "Past", col: "Continuous",
    intro: "Процесс, который шёл в определённый момент прошлого. Часто — фон, на который «наступает» другое событие.",
    use: ["Процесс в момент прошлого: At 8 p.m. I was having dinner.", "Фон для события: I was sleeping when the phone rang.", "Два параллельных процесса: While she was cooking, he was reading."],
    formula: [["+", "I/He/She/It was + V-ing   •   You/We/They were + V-ing"], ["−", "wasn't / weren't + V-ing"], ["?", "Was / Were + подлежащее + V-ing?"]],
    markers: ["at 5 p.m. yesterday", "while", "when", "all evening", "at that moment"],
    examples: [["I was reading when you called", "Я читала, когда ты позвонил."], ["What were you doing at five o'clock", "Что ты делал в пять часов?"], ["They were playing in the park", "Они играли в парке."]],
    compare: "Past Continuous — длинный процесс (was sleeping), Past Simple — короткое событие, которое его прервало (rang).",
    tip: "was — для I/he/she/it, were — для you/we/they.",
    items: [
      ["At 8 p.m. yesterday I ___ dinner.", "was having", ["had", "was having", "am having", "have"], "Конкретный момент в прошлом → was + V-ing."],
      ["They ___ TV when I came.", "were watching", ["watched", "were watching", "was watching", "watch"], "They → were; процесс прерван событием."],
      ["What ___ you doing at 10 o'clock last night?", "were", ["was", "were", "did", "are"], "You → were."],
      ["I ___ sleeping when the phone rang.", "was", ["were", "was", "am", "did"], "I → was."],
      ["It ___ raining all evening yesterday.", "was", ["is", "were", "was", "has"], "It → was."],
      ["We were ___ in the park when it started to rain.", "walking", ["walk", "walked", "walking", "walks"], "После were → V-ing."]
    ],
    errors: [["They was playing football.", "was", "They were playing football.", "They → were."], ["I was cook dinner at 7.", "cook", "I was cooking dinner at 7.", "После was → V-ing."]]
  });
  T.push({
    id: "pap", name: "Past Perfect", ru: "Прошедшее совершённое", level: "B1", kid: false, tense: true, row: "Past", col: "Perfect",
    intro: "«Предпрошедшее»: действие произошло РАНЬШЕ другого действия или момента в прошлом.",
    use: ["Что было раньше: When I arrived, the film had already started.", "К моменту в прошлом: By 5 p.m. she had finished the report."],
    formula: [["+", "had + V3"], ["−", "hadn't + V3"], ["?", "Had + подлежащее + V3?"]],
    markers: ["before", "after", "by the time", "already", "by 5 o'clock yesterday", "never ... before"],
    examples: [["The train had left before we arrived", "Поезд ушёл до того, как мы приехали."], ["I had never seen the sea before", "Я никогда раньше не видела море."], ["She had finished the work by six o'clock", "Она закончила работу к шести часам."]],
    compare: "Сначала (раньше) — Past Perfect, потом — Past Simple: When I came (2), they had left (1).",
    tip: "had одинаково для всех лиц + 3-я форма глагола.",
    items: [
      ["When I arrived, the film ___ already started.", "had", ["has", "had", "was", "have"], "Фильм начался раньше моего прихода → had started."],
      ["She had ___ the report before the meeting.", "written", ["wrote", "written", "write", "writing"], "had + V3: write → wrote → written."],
      ["By the time we got to the station, the train ___ .", "had left", ["leaves", "had left", "has left", "is leaving"], "By the time + прошлое → had left."],
      ["I didn't know him because I ___ him before.", "had never met", ["don't meet", "had never met", "have never met", "never meets"], "До момента в прошлом не встречала → had never met."],
      ["He was hungry because he ___ eaten all day.", "hadn't", ["didn't", "hadn't", "hasn't", "wasn't"], "Отрицание в Past Perfect: hadn't + V3."],
      ["___ you finished the work before he called?", "Had", ["Have", "Had", "Did", "Were"], "Вопрос: Had + подлежащее + V3."]
    ],
    errors: [["She had went home before I came.", "went", "She had gone home before I came.", "После had — 3-я форма: go → went → gone."], ["When we arrived, the party has already started.", "has", "When we arrived, the party had already started.", "Раньше другого действия в прошлом → had."]]
  });
  T.push({
    id: "papc", name: "Past Perfect Continuous", ru: "Прошедшее совершённое длительное", level: "B2", kid: false, tense: true, row: "Past", col: "Perfect Continuous",
    intro: "Действие длилось какое-то время ДО момента в прошлом. Важна длительность.",
    use: ["Длительность до момента в прошлом: I had been waiting for an hour when he came.", "Причина состояния в прошлом: Her eyes were red — she had been crying."],
    formula: [["+", "had been + V-ing"], ["−", "hadn't been + V-ing"], ["?", "Had + подлежащее + been + V-ing?"]],
    markers: ["for", "since", "how long", "before", "by the time", "all day"],
    examples: [["I had been waiting for an hour before he came", "Я ждала уже час, когда он пришёл."], ["They had been living there for ten years", "Они прожили там десять лет (к тому моменту)."], ["She was tired because she had been working all night", "Она устала, потому что работала всю ночь."]],
    compare: "Past Perfect — что успели сделать (had written 3 letters). Past Perfect Continuous — как долго делали (had been writing for 2 hours).",
    tip: "had been + V-ing для всех лиц.",
    items: [
      ["She was tired because she ___ all night.", "had been working", ["has been working", "had been working", "works", "is working"], "Длительное действие до момента в прошлом."],
      ["They had been ___ for two hours when the bus came.", "waiting", ["wait", "waited", "waiting", "waits"], "had been + V-ing."],
      ["How long ___ you been living there before you moved?", "had", ["have", "had", "did", "were"], "До момента в прошлом (before you moved) → had."],
      ["I ___ been studying for an hour when she called.", "had", ["have", "had", "was", "has"], "Past Perfect Continuous: had been."],
      ["His eyes were red. He ___ crying.", "had been", ["has been", "had been", "is", "was being"], "Причина состояния в прошлом → had been crying."],
      ["We had been ___ in Tashkent for five years before we moved.", "living", ["live", "lived", "living", "lives"], "had been + V-ing."]
    ],
    errors: [["She had been work there for 3 years.", "work", "She had been working there for 3 years.", "После been → V-ing."], ["They had being playing all day.", "being", "They had been playing all day.", "Нужно been, а не being."]]
  });
  T.push({
    id: "fs", name: "Future Simple", ru: "Будущее простое", level: "A1", kid: true, tense: true, row: "Future", col: "Simple",
    intro: "Будущее: решения в момент речи, обещания, предсказания, факты о будущем.",
    use: ["Решение прямо сейчас: The phone is ringing — I will answer it.", "Обещание: I will help you.", "Предсказание: I think it will rain tomorrow.", "Факт в будущем: Next year he will be 10."],
    formula: [["+", "will + V (для всех лиц)"], ["−", "won't (will not) + V"], ["?", "Will + подлежащее + V?"]],
    markers: ["tomorrow", "next week", "next year", "soon", "in 2030", "I think", "probably"],
    examples: [["I will call you tomorrow", "Я позвоню тебе завтра."], ["Will you help me with this task", "Ты поможешь мне с этим заданием?"], ["It will not be easy", "Это будет нелегко."], ["I think our team will win", "Думаю, наша команда победит."]],
    compare: "will — решение сейчас или прогноз. be going to — план, решённый заранее: I'm going to visit my mom on Sunday.",
    tip: "После will — глагол без to и без -s: She will go.",
    items: [
      ["I think it ___ rain tomorrow.", "will", ["will", "is", "does", "was"], "Предсказание → will + V."],
      ["Don't worry, I ___ you.", "will help", ["help", "will help", "helped", "helps"], "Обещание → will help."],
      ["She ___ come to the party, she is busy.", "won't", ["won't", "doesn't", "isn't", "didn't"], "Отрицание в будущем: won't + V."],
      ["___ you call me tomorrow?", "Will", ["Do", "Will", "Are", "Did"], "Tomorrow → Will you...?"],
      ["Next year my son ___ 10 years old.", "will be", ["is", "will be", "will", "be"], "Будущий факт → will be."],
      ["The phone is ringing. — I ___ answer it!", "will", ["will", "am", "do", "did"], "Решение в момент речи → will."]
    ],
    errors: [["I will to call you.", "to", "I will call you.", "После will — без to."], ["She will goes to school.", "goes", "She will go to school.", "После will — начальная форма без -s."]]
  });
  T.push({
    id: "fc", name: "Future Continuous", ru: "Будущее длительное", level: "B1", kid: false, tense: true, row: "Future", col: "Continuous",
    intro: "Процесс, который будет идти в определённый момент в будущем.",
    use: ["Процесс в момент будущего: At this time tomorrow I will be flying to Paris.", "Вежливый вопрос о планах: Will you be using the car tonight?"],
    formula: [["+", "will be + V-ing"], ["−", "won't be + V-ing"], ["?", "Will + подлежащее + be + V-ing?"]],
    markers: ["at this time tomorrow", "at 5 p.m. tomorrow", "this time next week", "all day tomorrow"],
    examples: [["This time tomorrow I will be working", "Завтра в это время я буду работать."], ["Do not call at eight we will be having dinner", "Не звони в восемь — мы будем ужинать."], ["Will you be using the car tonight", "Ты будешь пользоваться машиной вечером?"]],
    compare: "Future Simple — факт (I will call). Future Continuous — процесс в момент будущего (I will be calling clients at 10).",
    tip: "will be + V-ing.",
    items: [
      ["At this time tomorrow I ___ to Paris.", "will be flying", ["will fly", "will be flying", "flew", "fly"], "Процесс в момент будущего → will be + V-ing."],
      ["Don't call at 8 – we ___ dinner.", "will be having", ["were having", "will be having", "had", "have"], "В 8 будем в процессе ужина."],
      ["This time next week she ___ on the beach.", "will be lying", ["lies", "will be lying", "lay", "is lain"], "This time next week → will be + V-ing."],
      ["Will you ___ using the car tonight?", "be", ["be", "been", "being", "to"], "Will + подлежащее + be + V-ing."],
      ["I will be ___ all day tomorrow.", "working", ["work", "worked", "working", "works"], "will be + V-ing."],
      ["At 10 a.m. tomorrow they ___ an exam.", "will be taking", ["take", "took", "will be taking", "taken"], "Процесс в точный момент будущего."]
    ],
    errors: [["I will be work at 5 tomorrow.", "work", "I will be working at 5 tomorrow.", "После will be → V-ing."], ["She will working tomorrow morning.", "working", "She will be working tomorrow morning.", "Пропущено be: will be working."]]
  });
  T.push({
    id: "fp", name: "Future Perfect", ru: "Будущее совершённое", level: "B2", kid: false, tense: true, row: "Future", col: "Perfect",
    intro: "Действие будет ЗАВЕРШЕНО к определённому моменту в будущем.",
    use: ["Результат к моменту в будущем: By Friday I will have finished the report.", "К моменту другого действия: By the time you come, I will have cooked dinner."],
    formula: [["+", "will have + V3"], ["−", "won't have + V3"], ["?", "Will + подлежащее + have + V3?"]],
    markers: ["by tomorrow", "by Friday", "by 2030", "by the time", "by the end of the year"],
    examples: [["I will have finished the work by Monday", "Я закончу работу к понедельнику."], ["By 2030 they will have built a new school", "К 2030 году они построят новую школу."], ["Will you have cooked dinner by eight", "Ты приготовишь ужин к восьми?"]],
    compare: "Future Simple — просто сделаю (I will finish). Future Perfect — уже будет сделано к сроку (I will have finished by 5).",
    tip: "Ключевое слово — by (к): by Monday, by 5 o'clock.",
    items: [
      ["By Friday I ___ the report.", "will have finished", ["will finish", "will have finished", "finished", "have finished"], "By Friday — к сроку → will have + V3."],
      ["She will have ___ home by 6.", "arrived", ["arrive", "arrived", "arriving", "arrives"], "will have + V3."],
      ["By 2030 they ___ the new metro line.", "will have built", ["will build", "will have built", "built", "are building"], "К 2030 будет завершено."],
      ["Will you have ___ dinner by 8?", "cooked", ["cook", "cooked", "cooking", "cooks"], "have + V3."],
      ["By the time you come, I ___ .", "will have left", ["leave", "will have left", "left", "leaves"], "К моменту твоего прихода уже уйду."],
      ["By the end of the year he ___ 50 books.", "will have read", ["reads", "will have read", "read", "will reading"], "К концу года — результат."]
    ],
    errors: [["By Monday I will have finish it.", "finish", "By Monday I will have finished it.", "После have — 3-я форма."], ["She will has done it by 5.", "has", "She will have done it by 5.", "После will всегда have, не has."]]
  });
  T.push({
    id: "fpc", name: "Future Perfect Continuous", ru: "Будущее совершённое длительное", level: "C1", kid: false, tense: true, row: "Future", col: "Perfect Continuous",
    intro: "Как ДОЛГО действие будет длиться к определённому моменту в будущем.",
    use: ["Длительность к моменту в будущем: By June I will have been working here for ten years."],
    formula: [["+", "will have been + V-ing"], ["−", "won't have been + V-ing"], ["?", "Will + подлежащее + have been + V-ing?"]],
    markers: ["for ... by", "by the time", "by next year", "for 10 years"],
    examples: [["By May I will have been working here for two years", "К маю я буду работать здесь уже два года."], ["Next month we will have been living together for five years", "В следующем месяце мы будем жить вместе уже пять лет."]],
    compare: "Future Perfect — результат к сроку. Future Perfect Continuous — длительность к сроку (for ... by ...).",
    tip: "will have been + V-ing, обычно с for и by.",
    items: [
      ["By June I ___ here for ten years.", "will have been working", ["will work", "will have been working", "have worked", "am working"], "Длительность (for ten years) к моменту в будущем (by June)."],
      ["By 6 p.m. she will have been ___ for three hours.", "driving", ["drive", "drove", "driving", "driven"], "will have been + V-ing."],
      ["Next month we ___ together for 5 years.", "will have been living", ["live", "will have been living", "lived", "are living"], "Длительность к моменту в будущем."],
      ["How long ___ you have been studying by the end of the course?", "will", ["do", "will", "have", "did"], "Вопрос: How long will you have been...?"],
      ["By the time he retires, he will have ___ teaching for 40 years.", "been", ["be", "been", "being", "was"], "will have been + V-ing."],
      ["In an hour I ___ for this bus for 2 hours!", "will have been waiting", ["will wait", "wait", "will have been waiting", "waited"], "Через час будет 2 часа ожидания."]
    ],
    errors: [["By 2027 I will have been live here for 5 years.", "live", "By 2027 I will have been living here for 5 years.", "После been → V-ing."], ["She will has been working for 3 hours.", "has", "She will have been working for 3 hours.", "После will — have."]]
  });

  // Дополнительные темы
  const G = [];
  G.push({ id: "tobe", name: "Verb to be", ru: "Глагол быть: am / is / are / was / were", level: "A1", kid: true,
    intro: "To be — «быть, являться, находиться». В русском часто опускается, в английском — обязателен!",
    use: ["Кто/что: I am a manager.", "Где: She is at home.", "Какой: They are happy.", "Прошлое: I was tired, we were at school."],
    formula: [["Present", "I am • he/she/it is • you/we/they are"], ["Past", "I/he/she/it was • you/we/they were"], ["−/?", "I'm not, isn't, aren't • Is she...? Are you...?"]],
    markers: [], examples: [["I am a teacher", "Я учитель."], ["My son is ten years old", "Моему сыну десять лет."], ["We were at home yesterday", "Вчера мы были дома."]],
    tip: "Я — am, он/она/оно — is, мы/вы/они — are.",
    items: [["I ___ a teacher.", "am", ["am", "is", "are", "be"], "I → am."], ["They ___ at home yesterday.", "were", ["was", "were", "are", "is"], "They + прошлое → were."], ["___ she your sister?", "Is", ["Am", "Is", "Are", "Do"], "She → Is."], ["We ___ not tired.", "are", ["am", "is", "are", "be"], "We → are."], ["It ___ cold last night.", "was", ["is", "was", "were", "are"], "It + прошлое → was."], ["My cat ___ black and white.", "is", ["am", "is", "are", "be"], "Cat = it → is."]],
    errors: [["She are my mother.", "are", "She is my mother.", "She → is."], ["I very happy today.", "very", "I am very happy today.", "Пропущен глагол to be: I am very happy."]] });
  G.push({ id: "have", name: "Have / Has / Had", ru: "Иметь", level: "A1", kid: true,
    intro: "Have — «иметь, есть у кого-то». He/She/It → has. В прошлом — had.",
    use: ["Владение: I have a car. She has two sons.", "Устойчивые выражения: have breakfast, have a shower, have fun."],
    formula: [["+", "I/you/we/they have • he/she/it has • прошлое: had"], ["−", "don't have / doesn't have / didn't have"], ["?", "Do you have...? Does she have...?"]],
    markers: [], examples: [["She has two brothers", "У неё два брата."], ["Do you have a pen", "У тебя есть ручка?"], ["We had a party last week", "На прошлой неделе у нас была вечеринка."]],
    tip: "После does / doesn't — have, а не has.",
    items: [["She ___ two brothers.", "has", ["have", "has", "is", "having"], "She → has."], ["I ___ a cat.", "have", ["have", "has", "am", "is"], "I → have."], ["___ he have a car?", "Does", ["Do", "Does", "Has", "Is"], "He → Does he have...?"], ["They don't ___ time.", "have", ["has", "have", "had", "having"], "После don't — have."], ["We ___ a party last week.", "had", ["have", "has", "had", "haved"], "Прошлое → had."]],
    errors: [["He have a dog.", "have", "He has a dog.", "He → has."], ["Does she has a car?", "has", "Does she have a car?", "После does — have."]] });
  G.push({ id: "there", name: "There is / There are", ru: "Есть, находится", level: "A1", kid: true,
    intro: "Используем, чтобы сказать, что что-то ГДЕ-ТО есть или находится.",
    use: ["There is + единственное число: There is a cat in the garden.", "There are + множественное: There are many people here."],
    formula: [["+", "There is (There's) + ед.ч. • There are + мн.ч."], ["−", "There isn't / There aren't any..."], ["?", "Is there...? Are there any...?"]],
    markers: [], examples: [["There is a cat in the garden", "В саду кошка."], ["There are three books on the table", "На столе три книги."], ["Is there a bank near here", "Здесь рядом есть банк?"]],
    tip: "Русские фразы «в комнате есть…» строим с конца: There is ... in the room.",
    items: [["There ___ a cat in the garden.", "is", ["is", "are", "be", "am"], "A cat — единственное число → is."], ["There ___ many people in the park.", "are", ["is", "are", "be", "was"], "Many people → are."], ["___ there any milk?", "Is", ["Is", "Are", "Do", "Have"], "Milk — неисчисляемое → Is there."], ["There ___ a party yesterday.", "was", ["is", "was", "were", "are"], "Прошлое ед.ч. → was."], ["There aren't ___ apples.", "any", ["some", "any", "a", "many of"], "В отрицаниях — any."]],
    errors: [["There is two cats.", "is", "There are two cats.", "Two cats — мн.ч. → are."]] });
  G.push({ id: "articles", name: "Articles a / an / the", ru: "Артикли", level: "A1", kid: true,
    intro: "a/an — «один, какой-то» (впервые упоминаем). the — «тот самый, конкретный».",
    use: ["a — перед согласным звуком: a car, a university.", "an — перед гласным звуком: an apple, an hour.", "the — конкретное, единственное в своём роде: the sun, the door (эта дверь).", "Без артикля — общие понятия во мн.ч. и неисчисляемые: I like music."],
    formula: [["a / an", "один из многих, впервые"], ["the", "конкретный, известный"], ["—", "без артикля: имена, города, общие понятия"]],
    markers: [], examples: [["I saw an elephant at the zoo", "Я видел слона в зоопарке."], ["The sun is very hot today", "Солнце сегодня очень жаркое."], ["She is a doctor", "Она врач."]],
    tip: "Ориентируйся на ЗВУК: an hour (h не читается), a university (звук «ю»).",
    items: [["I saw ___ elephant at the zoo.", "an", ["a", "an", "the", "—"], "Elephant начинается с гласного звука → an."], ["___ sun is very hot today.", "The", ["A", "An", "The", "—"], "Солнце единственное → the."], ["She is ___ doctor.", "a", ["a", "an", "the", "—"], "Профессия → a."], ["I like ___ music.", "—", ["a", "an", "the", "—"], "Музыка вообще — без артикля."], ["Can you close ___ door, please?", "the", ["a", "an", "the", "—"], "Конкретная дверь (эта) → the."], ["Wait ___ hour, please.", "an", ["a", "an", "the", "—"], "В hour буква h не читается → an."]],
    errors: [["She is a engineer.", "a", "She is an engineer.", "Engineer начинается с гласного звука → an."]] });
  G.push({ id: "nouns", name: "Nouns: plural & countable", ru: "Множественное число, исчисляемые и неисчисляемые", level: "A1", kid: true,
    intro: "Обычно мн.ч. = +s (cats). Есть исключения: child → children, man → men. Неисчисляемые (water, money, information) не имеют мн.ч.",
    use: ["much — с неисчисляемыми: How much water?", "many — с исчисляемыми: How many apples?", "a lot of — с любыми."],
    formula: [["+s / +es", "cat → cats, box → boxes, city → cities"], ["Исключения", "child → children, man → men, woman → women, tooth → teeth, mouse → mice"], ["Неисчисляемые", "water, money, information, advice, furniture"]],
    markers: [], examples: [["There are three children in the room", "В комнате трое детей."], ["How much money do you need", "Сколько денег тебе нужно?"], ["I need some information", "Мне нужна информация."]],
    tip: "Information, advice, news — всегда единственное число!",
    items: [["There are three ___ in the room.", "children", ["childs", "children", "childrens", "child"], "child → children."], ["How ___ water do you drink?", "much", ["much", "many", "a few", "few"], "Water — неисчисляемое → much."], ["How ___ apples do you have?", "many", ["much", "many", "little", "a little"], "Apples — исчисляемые → many."], ["I need some ___ .", "information", ["informations", "information", "an information", "a informations"], "Information — неисчисляемое."], ["We bought two ___ .", "boxes", ["boxs", "boxes", "boxies", "box"], "После x → +es."]],
    errors: [["I have many money.", "many", "I have a lot of money.", "Money — неисчисляемое: much / a lot of."], ["She has two childs.", "childs", "She has two children.", "child → children."]] });
  G.push({ id: "pronouns", name: "Pronouns", ru: "Местоимения", level: "A1", kid: true,
    intro: "I/me/my/mine — разные формы одного местоимения.",
    use: ["Подлежащее: I, you, he, she, it, we, they", "Дополнение: me, you, him, her, it, us, them", "Притяжательные: my, your, his, her, its, our, their", "Без существительного: mine, yours, his, hers, ours, theirs"],
    formula: [["Кто?", "I • you • he • she • we • they"], ["Кого/кому?", "me • you • him • her • us • them"], ["Чей?", "my/mine • your/yours • his • her/hers • our/ours • their/theirs"]],
    markers: [], examples: [["This is my book it is mine", "Это моя книга, она моя."], ["Give me the pen please", "Дай мне ручку, пожалуйста."], ["They did it themselves", "Они сделали это сами."]],
    tip: "«Я и мой сын» по-английски: My son and I (себя — в конце).",
    items: [["This is my book. It's ___ .", "mine", ["my", "mine", "me", "I"], "Без существительного → mine."], ["Give ___ the pen, please.", "me", ["I", "me", "my", "mine"], "Кому? → me."], ["Tell ___ about it, they are waiting.", "them", ["they", "their", "them", "theirs"], "Кому? (им) → them."], ["___ is my brother.", "He", ["Him", "His", "He", "Her"], "Подлежащее → He."], ["They did it ___ .", "themselves", ["themself", "theirselves", "themselves", "them"], "Сами → themselves."]],
    errors: [["Me and my son like English.", "Me", "My son and I like English.", "В роли подлежащего — I, и себя ставим в конец."]] });
  G.push({ id: "prep", name: "Prepositions of time & place", ru: "Предлоги времени и места", level: "A1", kid: true,
    intro: "at — точка, on — поверхность/день, in — внутри/период.",
    use: ["Время: at 5 o'clock, on Monday, in May, in 2020, in the morning, at night.", "Место: at the bus stop, on the table, in the box, in Tashkent."],
    formula: [["at", "точное время, точка: at 7, at home, at work"], ["on", "дни и даты, поверхность: on Friday, on 5 May, on the wall"], ["in", "месяцы, годы, внутри: in June, in 1990, in the room"]],
    markers: [], examples: [["I was born in 1990", "Я родилась в 1990 году."], ["The meeting is on Monday", "Встреча в понедельник."], ["The book is on the table", "Книга на столе."]],
    tip: "Пирамида: IN (большое) → ON (среднее) → AT (точка).",
    items: [["I was born ___ 1990.", "in", ["in", "on", "at", "to"], "Год → in."], ["The meeting is ___ Monday.", "on", ["in", "on", "at", "by"], "День недели → on."], ["See you ___ 5 o'clock.", "at", ["in", "on", "at", "for"], "Точное время → at."], ["The book is ___ the table.", "on", ["in", "on", "at", "under of"], "На поверхности → on."], ["She lives ___ Tashkent.", "in", ["in", "on", "at", "to"], "Город → in."]],
    errors: [["I will see you in Monday.", "in", "I will see you on Monday.", "День недели → on."]] });
  G.push({ id: "modals", name: "Modal verbs", ru: "Модальные глаголы: can, must, should, may, have to", level: "A2", kid: true,
    intro: "Модальные глаголы выражают умение, разрешение, необходимость, совет. После них — глагол без to.",
    use: ["can / could — умею, могу (could — в прошлом)", "must — должен (внутреннее убеждение, правило); mustn't — нельзя", "have to — приходится (обстоятельства)", "should — следует (совет)", "may — можно? (вежливо), возможно"],
    formula: [["+", "can / must / should / may + V"], ["−", "can't, mustn't, shouldn't • don't have to = не обязательно"], ["?", "Can I...? Should we...? Must I...?"]],
    markers: [], examples: [["She can speak three languages", "Она говорит на трёх языках."], ["You should see a doctor", "Тебе следует сходить к врачу."], ["Can I open the window", "Можно я открою окно?"]],
    tip: "mustn't = нельзя, don't have to = не обязательно. Не путай!",
    items: [["You ___ smoke here. It's forbidden.", "mustn't", ["mustn't", "don't have to", "can", "should"], "Запрещено → mustn't."], ["___ I open the window?", "Can", ["Can", "Must", "Should to", "Have"], "Просьба/разрешение → Can I...?"], ["You look ill. You ___ see a doctor.", "should", ["should", "mustn't", "can't", "don't"], "Совет → should."], ["She ___ swim when she was five.", "could", ["can", "could", "must", "should"], "Умение в прошлом → could."], ["We ___ wear a uniform at school. It's a rule.", "have to", ["have to", "don't have to", "can't", "may"], "Правило → have to."]],
    errors: [["She can to speak English.", "to", "She can speak English.", "После can — глагол без to."], ["He musts go now.", "musts", "He must go now.", "Модальные глаголы не меняются: he must."]] });
  G.push({ id: "comp", name: "Comparative & Superlative", ru: "Сравнительная и превосходная степень", level: "A2", kid: true,
    intro: "Сравниваем: bigger (больше), the biggest (самый большой).",
    use: ["Короткие прилагательные: tall → taller → the tallest", "Длинные: beautiful → more beautiful → the most beautiful", "Исключения: good → better → the best; bad → worse → the worst"],
    formula: [["Короткие", "+er than / the + est"], ["Длинные", "more ... than / the most ..."], ["Исключения", "good–better–best, bad–worse–worst, many–more–most"]],
    markers: ["than", "the"], examples: [["My car is faster than yours", "Моя машина быстрее твоей."], ["This is the best day of my life", "Это лучший день в моей жизни."], ["English is easier than Chinese", "Английский легче китайского."]],
    tip: "Never: more taller. Либо -er, либо more.",
    items: [["My car is ___ than yours.", "faster", ["fast", "faster", "more fast", "fastest"], "Короткое: fast → faster than."], ["This is the ___ day of my life.", "best", ["good", "better", "best", "goodest"], "good → better → the best."], ["She is ___ beautiful than her sister.", "more", ["most", "more", "much", "very"], "Длинное прилагательное → more beautiful than."], ["Tashkent is ___ city in Uzbekistan.", "the biggest", ["bigger", "the biggest", "the most big", "biggest than"], "Самый → the biggest."], ["This test is ___ than the last one.", "easier", ["easy", "easier", "more easy", "easiest"], "easy → easier (y → i)."]],
    errors: [["He is more tall than me.", "more", "He is taller than me.", "Короткое прилагательное: taller, без more."]] });
  G.push({ id: "passive", name: "Passive Voice", ru: "Страдательный залог (и Active Voice)", level: "B1", kid: false,
    intro: "Active: кто делает (They built the house). Passive: что с объектом сделали (The house was built).",
    use: ["Когда важно действие, а не исполнитель: English is spoken all over the world.", "Деловой и научный стиль: The report was approved."],
    formula: [["Формула", "to be (в нужном времени) + V3"], ["Present", "is/are + V3: is spoken"], ["Past", "was/were + V3: was built"], ["Perfect", "has been + V3: has been finished"]],
    markers: ["by (кем)"], examples: [["The letter was sent yesterday", "Письмо отправили вчера."], ["English is spoken all over the world", "На английском говорят во всём мире."], ["The report has been approved", "Отчёт утверждён."]],
    tip: "Всегда две части: форма to be + 3-я форма глагола.",
    items: [["The letter ___ yesterday.", "was sent", ["sent", "was sent", "is sent", "was send"], "Прошлое пассив: was + V3."], ["English ___ all over the world.", "is spoken", ["speaks", "is spoken", "is speaking", "spoken"], "Present passive: is + V3."], ["The house ___ in 1990.", "was built", ["built", "was built", "is built", "was building"], "In 1990 → was built."], ["The new office ___ now.", "is being built", ["is building", "is being built", "builds", "was built"], "Сейчас в процессе → is being + V3."], ["The report has ___ finished.", "been", ["be", "been", "being", "was"], "Present Perfect passive: has been + V3."]],
    errors: [["The car was wash yesterday.", "wash", "The car was washed yesterday.", "Пассив: was + V3 (washed)."]] });
  G.push({ id: "cond", name: "Conditionals 0, 1, 2, 3 & Mixed", ru: "Условные предложения", level: "B1", kid: false,
    intro: "Если..., то... Тип зависит от реальности условия.",
    use: ["0 — всегда правда: If you heat ice, it melts.", "1 — реально в будущем: If it rains, we will stay at home.", "2 — нереально сейчас: If I were rich, I would travel.", "3 — нереально в прошлом: If she had studied, she would have passed.", "Mixed: If I had studied medicine, I would be a doctor now."],
    formula: [["0", "If + Present, Present"], ["1", "If + Present, will + V"], ["2", "If + Past, would + V"], ["3", "If + had V3, would have V3"]],
    markers: ["if", "unless", "when"], examples: [["If it rains we will stay at home", "Если пойдёт дождь, мы останемся дома."], ["If I were you I would accept the offer", "На твоём месте я бы приняла предложение."], ["If she had studied she would have passed the exam", "Если бы она готовилась, она бы сдала экзамен."]],
    tip: "В части с if НИКОГДА не ставим will!",
    items: [["If you heat ice, it ___ .", "melts", ["melts", "will melt", "would melt", "melted"], "Закон природы → 0 тип: Present."], ["If it rains, we ___ at home.", "will stay", ["stay", "will stay", "would stay", "stayed"], "Реальное будущее → 1 тип: will + V."], ["If I ___ rich, I would travel.", "were", ["am", "were", "will be", "had been"], "2 тип: If + Past (were для всех лиц)."], ["If she had studied, she ___ the exam.", "would have passed", ["would pass", "will pass", "would have passed", "passed"], "3 тип: would have + V3."], ["If you ___ hard, you will succeed.", "work", ["work", "will work", "would work", "worked"], "1 тип: в части с if — Present."]],
    errors: [["If I will see him, I will tell him.", "will", "If I see him, I will tell him.", "В части с if не ставим will."]] });
  G.push({ id: "gerinf", name: "Gerund & Infinitive", ru: "Герундий и инфинитив", level: "B1", kid: false,
    intro: "После одних глаголов — V-ing (enjoy reading), после других — to V (want to read).",
    use: ["V-ing после: enjoy, finish, stop, mind, avoid, suggest, предлогов (good at swimming)", "to V после: want, decide, plan, hope, agree, would like"],
    formula: [["V-ing", "enjoy / finish / avoid / keep + V-ing"], ["to V", "want / decide / hope / plan + to V"], ["После предлога", "interested in learning, good at swimming"]],
    markers: [], examples: [["I enjoy reading books", "Я люблю читать книги."], ["She decided to leave early", "Она решила уйти пораньше."], ["He is good at swimming", "Он хорошо плавает."]],
    tip: "После предлога — всегда V-ing.",
    items: [["I enjoy ___ .", "reading", ["read", "to read", "reading", "reads"], "enjoy + V-ing."], ["She decided ___ .", "to leave", ["leave", "leaving", "to leave", "left"], "decide + to V."], ["Stop ___ , please!", "talking", ["talk", "to talk", "talking", "talked"], "stop + V-ing (перестать)."], ["I want ___ English.", "to learn", ["learn", "learning", "to learn", "learned"], "want + to V."], ["He is good at ___ .", "swimming", ["swim", "to swim", "swimming", "swims"], "После предлога at → V-ing."]],
    errors: [["I enjoy to read books.", "to", "I enjoy reading books.", "enjoy + V-ing."]] });
  G.push({ id: "reported", name: "Reported Speech", ru: "Косвенная речь", level: "B2", kid: false,
    intro: "Передаём чужие слова: время «сдвигается» на шаг назад.",
    use: ["am/is → was: «I am tired» → He said he was tired.", "will → would: «I will call» → She said she would call.", "Past Simple → Past Perfect: «I saw it» → He said he had seen it.", "Вопросы — прямой порядок слов: He asked where I lived."],
    formula: [["say", "say (that) ... — без «кому»"], ["tell", "tell somebody (that) ..."], ["Сдвиг", "Present → Past, Past → Past Perfect, will → would"]],
    markers: ["said", "told", "asked"], examples: [["He said that he was tired", "Он сказал, что устал."], ["She told me she would call later", "Она сказала мне, что позвонит позже."], ["He asked me where I lived", "Он спросил меня, где я живу."]],
    tip: "said me — ошибка! told me или said to me.",
    items: [["He said that he ___ tired.", "was", ["is", "was", "were", "has been"], "is → was."], ["She told me she ___ me later.", "would call", ["will call", "would call", "calls", "called"], "will → would."], ["They said they ___ the film.", "had seen", ["saw", "have seen", "had seen", "see"], "Past → Past Perfect."], ["He asked me where I ___ .", "lived", ["lived", "do live", "did live", "live do"], "В косвенном вопросе — прямой порядок и сдвиг времени."], ["She ___ me that she was busy.", "told", ["said", "told", "spoke", "talked"], "С «кому» → told me."]],
    errors: [["She said me that she was busy.", "said", "She told me that she was busy.", "С «кому» — tell: told me."]] });
  G.push({ id: "relative", name: "Relative Clauses", ru: "Придаточные с who / which / that / where / whose", level: "B1", kid: false,
    intro: "Связываем две части: The man who lives next door is a doctor.",
    use: ["who — люди", "which — предметы, животные", "that — люди и предметы (неформально)", "where — места", "whose — чей", "when — время"],
    formula: [["who", "люди"], ["which/that", "предметы"], ["where / when / whose", "место / время / принадлежность"]],
    markers: [], examples: [["The man who lives next door is a doctor", "Мужчина, который живёт по соседству, — врач."], ["This is the house where I was born", "Это дом, где я родилась."], ["The book which I bought is interesting", "Книга, которую я купила, интересная."]],
    tip: "Для людей — who, для вещей — which.",
    items: [["The man ___ lives next door is a doctor.", "who", ["who", "which", "where", "whose"], "Человек → who."], ["The book ___ I bought is interesting.", "which", ["who", "which", "where", "whose"], "Предмет → which."], ["This is the house ___ I was born.", "where", ["which", "who", "where", "when"], "Место → where."], ["The girl ___ bag was stolen called the police.", "whose", ["who", "whose", "which", "that"], "Чей → whose."], ["2020 was the year ___ we met.", "when", ["where", "which", "when", "who"], "Время → when."]],
    errors: [["The woman which works here is nice.", "which", "The woman who works here is nice.", "Для людей — who."]] });
  G.push({ id: "phrasal", name: "Phrasal Verbs", ru: "Фразовые глаголы", level: "A2", kid: false,
    intro: "Глагол + частица = новое значение: give up — бросить, look after — присматривать.",
    use: ["turn on / off — включить / выключить", "get up — вставать", "look after — заботиться", "put off — откладывать", "give up — бросать", "find out — узнать", "look forward to — ждать с нетерпением"],
    formula: [["Глагол + частица", "get + up = вставать"]],
    markers: [], examples: [["Please turn on the light", "Пожалуйста, включи свет."], ["I get up at seven every day", "Я встаю в семь каждый день."], ["We need to put off the meeting", "Нам нужно отложить встречу."]],
    tip: "Учи фразовые глаголы с примером, а не по отдельности.",
    items: [["Please ___ the light, it's dark.", "turn on", ["turn on", "turn off", "turn up", "turn back"], "Включить → turn on."], ["I ___ at 7 every day.", "get up", ["get up", "get on", "get off", "get over"], "Вставать → get up."], ["Can you ___ my cat while I'm away?", "look after", ["look for", "look after", "look at", "look up"], "Присматривать → look after."], ["We need to ___ the meeting until Monday.", "put off", ["put on", "put off", "put up", "put in"], "Отложить → put off."], ["She ___ smoking last year.", "gave up", ["gave up", "gave in", "gave out", "gave back"], "Бросить → give up."]],
    errors: [["I look forward to see you.", "see", "I look forward to seeing you.", "look forward to + V-ing."]] });
  G.push({ id: "tags", name: "Question Tags", ru: "Разделительные вопросы («не так ли?»)", level: "B1", kid: false,
    intro: "Короткий хвостик в конце: You are tired, aren't you?",
    use: ["Утверждение + → хвостик −: She is nice, isn't she?", "Утверждение − → хвостик +: You don't smoke, do you?"],
    formula: [["+ , −?", "You are a teacher, aren't you?"], ["− , +?", "She doesn't smoke, does she?"], ["Особые", "I am → aren't I? • Let's → shall we?"]],
    markers: [], examples: [["You are a teacher aren't you", "Вы ведь учитель, не так ли?"], ["She doesn't smoke does she", "Она ведь не курит?"]],
    tip: "Хвостик повторяет вспомогательный глагол и местоимение.",
    items: [["You are a teacher, ___ ?", "aren't you", ["aren't you", "are you", "don't you", "isn't it"], "+ → − хвостик: aren't you?"], ["She doesn't smoke, ___ ?", "does she", ["doesn't she", "does she", "is she", "did she"], "− → + хвостик: does she?"], ["They went home, ___ ?", "didn't they", ["didn't they", "did they", "weren't they", "don't they"], "Past Simple → didn't they?"], ["He can swim, ___ ?", "can't he", ["can he", "can't he", "doesn't he", "isn't he"], "can → can't he?"], ["Let's go, ___ ?", "shall we", ["shall we", "will we", "do we", "don't we"], "Let's → shall we?"]],
    errors: [["She is nice, isn't it?", "it", "She is nice, isn't she?", "She → she в хвостике."]] });
  G.push({ id: "wordorder", name: "Word order", ru: "Порядок слов в предложении", level: "A1", kid: true,
    intro: "Английский порядок жёсткий: Кто → Что делает → Что → Где → Когда.",
    use: ["Подлежащее + сказуемое + дополнение: I like tea.", "Наречия частоты — перед смысловым глаголом, но после to be: I often drink tea. She is always late.", "Вопрос: вспомогательный глагол + подлежащее: Do you live here?"],
    formula: [["Утверждение", "S + V + O + Place + Time"], ["Вопрос", "(Wh) + aux + S + V?"]],
    markers: [], examples: [["She is always late", "Она всегда опаздывает."], ["I often drink coffee in the morning", "Я часто пью кофе утром."], ["Where do you live", "Где ты живёшь?"]],
    tip: "Very much — в конце: I like tea very much.",
    items: [["She ___ late.", "is always", ["is always", "always is", "always", "always are"], "После to be: is always."], ["I ___ coffee.", "often drink", ["drink often", "often drink", "often am drink", "am often drink"], "Наречие частоты — перед глаголом."], ["Where ___ ?", "do you live", ["you live", "do you live", "you do live", "live you"], "Вопрос: do + you + live."], ["I don't know where ___ .", "he lives", ["does he live", "he lives", "lives he", "he does live"], "Косвенный вопрос — прямой порядок."], ["___ me, please?", "Can you help", ["You can help", "Can you help", "Help you can", "Do you can help"], "Вопрос: Can + you + V."]],
    errors: [["I like very much tea.", "very", "I like tea very much.", "Very much — в конце предложения."]] });
  G.push({ id: "conj", name: "Conjunctions", ru: "Союзы и сложные предложения", level: "A2", kid: false,
    intro: "Союзы соединяют части предложения: and, but, or, so, because, although.",
    use: ["and — и", "but — но", "or — или", "so — поэтому", "because — потому что", "although — хотя", "if — если", "when — когда"],
    formula: [["Причина", "because"], ["Следствие", "so"], ["Противопоставление", "but / although"]],
    markers: [], examples: [["I was tired so I went to bed", "Я устала, поэтому легла спать."], ["I stayed at home because it was raining", "Я осталась дома, потому что шёл дождь."], ["Although it was late we continued working", "Хотя было поздно, мы продолжили работать."]],
    tip: "because — причина, so — следствие.",
    items: [["I was tired, ___ I went to bed.", "so", ["so", "because", "but", "or"], "Следствие → so."], ["She is rich ___ unhappy.", "but", ["and", "but", "so", "because"], "Противопоставление → but."], ["I stayed home ___ it was raining.", "because", ["so", "because", "although", "or"], "Причина → because."], ["___ it was late, we continued working.", "Although", ["Because", "So", "Although", "Or"], "Хотя → although."], ["You can have tea ___ coffee.", "or", ["or", "but", "so", "because"], "Выбор → or."]],
    errors: [["Because I was tired, so I went to bed.", "so", "Because I was tired, I went to bed.", "because и so вместе не используются."]] });
  G.push({ id: "wordform", name: "Word Formation", ru: "Словообразование", level: "B1", kid: false,
    intro: "Суффиксы и приставки меняют часть речи: teach → teacher, use → useful, happy → unhappy.",
    use: ["-er/-or — человек: teacher, actor", "-ful / -less — прилагательные: useful, useless", "-ly — наречия: quick → quickly", "-tion / -ment — существительные: decision, improvement", "un- / in- / dis- — «не»: unhappy, incorrect, dislike"],
    formula: [["Глагол → человек", "-er / -or"], ["Прилагательное → наречие", "-ly"], ["Отрицание", "un-, in-, im-, dis-"]],
    markers: [], examples: [["He is a good teacher", "Он хороший учитель."], ["This app is very useful", "Это приложение очень полезное."], ["She sings beautifully", "Она красиво поёт."]],
    tip: "Определи, какая часть речи нужна в пропуске.",
    items: [["He is a good ___ (teach).", "teacher", ["teach", "teacher", "teaching", "teachful"], "Человек → -er."], ["This is very ___ (use).", "useful", ["use", "useful", "using", "usely"], "Прилагательное → -ful."], ["She sings ___ (beautiful).", "beautifully", ["beautiful", "beautifully", "beauty", "beautifuly"], "Как? → наречие -ly."], ["It was an ___ (excite) game.", "exciting", ["excite", "excited", "exciting", "excitement"], "Игра (что-то) захватывающая → -ing."], ["Your answer is wrong. It's ___ (correct).", "incorrect", ["uncorrect", "incorrect", "discorrect", "correctless"], "correct → incorrect."]],
    errors: [["The film was very interested.", "interested", "The film was very interesting.", "Предмет — interesting, человек — interested."]] });

  const TOPICS = T.concat(G);
  // порядок программы
  const CURRICULUM = ["tobe", "ps", "pc", "have", "there", "articles", "pronouns", "prep", "nouns", "pas", "wordorder", "fs", "comp", "modals", "pp", "pac", "conj", "phrasal", "ppc", "pap", "fc", "passive", "cond", "gerinf", "relative", "tags", "wordform", "fp", "papc", "reported", "fpc"];

  // Слова: [en, ru, cat, ipa, pos, мнемоника, пример en, пример ru, emoji]
  const ADULT_WORDS = [
    ["recruitment", "подбор персонала", "HR & Recruitment", "/rɪˈkruːtmənt/", "noun", "РЕКРУТ — рекрутов набирали в армию. Представь, как ты набираешь «рекрутов» в свою компанию — это и есть recruitment.", "Recruitment takes a lot of time in our company.", "Подбор персонала занимает много времени в нашей компании."],
    ["candidate", "кандидат", "HR & Recruitment", "/ˈkændɪdət/", "noun", "Слово-близнец: КАНДИДАТ = candidate. Запомни ударение на первый слог: КЭН-ди-дэт.", "The candidate has five years of experience.", "У кандидата пять лет опыта."],
    ["vacancy", "вакансия", "HR & Recruitment", "/ˈveɪkənsi/", "noun", "ВЭЙ-кэн-си ≈ ВАКАНСИЯ. Представь пустое (vacant) кресло в офисе — его ждёт новый сотрудник.", "We have a vacancy for a sales manager.", "У нас есть вакансия менеджера по продажам."],
    ["negotiation", "переговоры", "Business English", "/nɪˌɡəʊʃiˈeɪʃn/", "noun", "НИ-ГОУ-ши-эйшн: партнёр кричит «НЕ ГОУ!» (не пойдёт!), а ты на переговорах убеждаешь его сказать «GO».", "The negotiation lasted three hours.", "Переговоры длились три часа."],
    ["reliable", "надёжный", "Business English", "/rɪˈlaɪəbl/", "adjective", "ри-ЛАЙ-эбл: собака ЛАЙка — самый надёжный друг, она никогда не подведёт.", "She is a reliable employee.", "Она надёжный сотрудник."],
    ["achievement", "достижение", "Business English", "/əˈtʃiːvmənt/", "noun", "э-ЧИВ-мент: птичка «ЧИВ-ЧИВ!» радостно чирикает, празднуя твоё достижение.", "Getting this job was a great achievement.", "Получить эту работу было большим достижением."],
    ["improve", "улучшать", "Business English", "/ɪmˈpruːv/", "verb", "им-ПРУВ ≈ «ИМ ПРУФ» (proof — доказательство): ты доказываешь им, что можешь улучшить результат.", "I want to improve my English.", "Я хочу улучшить свой английский."],
    ["postpone", "откладывать, переносить", "Business English", "/pəˈspəʊn/", "verb", "пост-ПОУН ≈ «ПОСТ на ПОНедельник»: встречу переносят на понедельник.", "We need to postpone the meeting.", "Нам нужно перенести встречу."],
    ["interview", "собеседование, интервью", "HR & Recruitment", "/ˈɪntəvjuː/", "noun", "INTER (между) + VIEW (взгляд): два человека изучающе смотрят друг на друга — это собеседование.", "I have a job interview tomorrow.", "Завтра у меня собеседование."],
    ["salary", "зарплата", "HR & Recruitment", "/ˈsæləri/", "noun", "САЛ-эри ≈ СОЛЬ: в Древнем Риме солдатам выдавали деньги на соль (salt). Зарплата = «соляные деньги».", "The salary is paid twice a month.", "Зарплата выплачивается два раза в месяц."],
    ["deadline", "крайний срок", "Business English", "/ˈdedlaɪn/", "noun", "DEAD (мёртвый) + LINE (линия): «мёртвая линия» — переступишь её, и проект «мёртв».", "The deadline is next Friday.", "Крайний срок — следующая пятница."],
    ["colleague", "коллега", "Business English", "/ˈkɒliːɡ/", "noun", "КОЛ-лиг ≈ КОЛЛЕГА по ЛИГЕ: вы играете в одной лиге — одной команде.", "My colleague helped me with the report.", "Коллега помогла мне с отчётом."],
    ["schedule", "расписание, график", "Business English", "/ˈʃedjuːl/", "noun", "ШЕДЬ-ЮЛ ≈ «ШЕДевр ЮЛи»: Юля составила шедевральный график на неделю.", "My schedule is very busy this week.", "У меня очень плотный график на этой неделе."],
    ["hire", "нанимать", "HR & Recruitment", "/ˈhaɪə/", "verb", "ХАЙ-э ≈ «ХАЙ!» — так ты приветствуешь нового сотрудника, которого только что наняла.", "We hired two new developers.", "Мы наняли двух новых разработчиков."],
    ["skill", "навык", "HR & Recruitment", "/skɪl/", "noun", "СКИЛ ≈ СКАЛка: мастер ловко крутит скалку — вот это навык!", "Communication is an important skill.", "Коммуникация — важный навык."],
    ["experience", "опыт", "HR & Recruitment", "/ɪkˈspɪəriəns/", "noun", "икс-ПИ-риенс ≈ ЭКСПЕРИМЕНТ: каждый эксперимент даёт тебе опыт.", "She has a lot of experience in sales.", "У неё большой опыт в продажах."],
    ["requirement", "требование", "HR & Recruitment", "/rɪˈkwaɪəmənt/", "noun", "ри-КВАЙ-эмент: в вакансии написано «КВАЙ!» — квота требований, которую нужно выполнить.", "Fluent English is a requirement for this job.", "Свободный английский — требование для этой работы."],
    ["feedback", "обратная связь", "HR & Recruitment", "/ˈfiːdbæk/", "noun", "FEED (кормить) + BACK (назад): тебя «кормят» ответом обратно — это обратная связь.", "Thank you for your feedback.", "Спасибо за обратную связь."],
    ["apply", "подавать заявку", "HR & Recruitment", "/əˈplaɪ/", "verb", "э-ПЛАЙ ≈ АППЛИКАЦИЯ: ты «приклеиваешь» своё резюме к вакансии — подаёшь заявку.", "He applied for the job last week.", "Он подал заявку на работу на прошлой неделе."],
    ["benefits", "льготы, преимущества", "HR & Recruitment", "/ˈbenɪfɪts/", "noun", "БЕНЕ-фитс ≈ БЕНЕФИС: на бенефисе артист получает все подарки — как льготы сотрудника.", "The company offers good benefits.", "Компания предлагает хорошие льготы."],
    ["onboarding", "адаптация новых сотрудников", "HR & Recruitment", "/ˈɒnbɔːdɪŋ/", "noun", "ON BOARD — «на борт»: нового сотрудника принимают на борт корабля и показывают, где что.", "Onboarding lasts two weeks.", "Адаптация длится две недели."],
    ["arrange", "организовывать, договариваться", "Business English", "/əˈreɪndʒ/", "verb", "э-РЕЙНДЖ ≈ РЕЙНДЖЕР: рейнджер всё организует в лагере.", "I will arrange a meeting with the client.", "Я организую встречу с клиентом."],
    ["approve", "одобрять, утверждать", "Business English", "/əˈpruːv/", "verb", "э-ПРУВ ≈ ПРУФ (доказательство): покажи пруф — и директор одобрит.", "The director approved the budget.", "Директор утвердил бюджет."],
    ["budget", "бюджет", "Finance", "/ˈbʌdʒɪt/", "noun", "БАДЖ-ит ≈ БЮДЖЕТ — почти одинаково, только звук «а».", "We need to plan the budget for next year.", "Нам нужно спланировать бюджет на следующий год."],
    ["profit", "прибыль", "Finance", "/ˈprɒfɪt/", "noun", "ПРО-фит: прибыль держит компанию «FIT» — в отличной форме.", "The company made a big profit this year.", "В этом году компания получила большую прибыль."],
    ["appointment", "встреча (по записи), приём", "Daily Life", "/əˈpɔɪntmənt/", "noun", "э-ПОЙНТ-мент: POINT — точка в календаре, назначенное время приёма.", "I have a doctor's appointment at 3 p.m.", "У меня приём у врача в 15:00."],
    ["remind", "напоминать", "Daily Life", "/rɪˈmaɪnd/", "verb", "RE (снова) + MIND (ум): снова вернуть мысль в ум — напомнить.", "Please remind me to call him.", "Пожалуйста, напомни мне ему позвонить."],
    ["challenge", "вызов, сложная задача", "General Vocabulary", "/ˈtʃælɪndʒ/", "noun", "ЧЕЛ-индж ≈ ЧЕЛЛЕНДЖ из соцсетей — бросить вызов.", "Learning a new language is a challenge.", "Изучать новый язык — это вызов."],
    ["suggest", "предлагать", "Business English", "/səˈdʒest/", "verb", "сэ-ДЖЕСТ ≈ ЖЕСТ: широким жестом ты предлагаешь идею.", "I suggest starting the meeting earlier.", "Я предлагаю начать встречу раньше."],
    ["manage", "управлять, справляться", "Business English", "/ˈmænɪdʒ/", "verb", "МЭН-идж ≈ МЕНЕДЖЕР: менеджер управляет и со всем справляется.", "She manages a team of ten people.", "Она управляет командой из десяти человек."],
    ["responsibility", "ответственность", "Business English", "/rɪˌspɒnsəˈbɪləti/", "noun", "RESPONSE (ответ) + ability (способность): способность отвечать за свои дела.", "It is my responsibility to check the documents.", "Проверять документы — моя ответственность."],
    ["luggage", "багаж", "Travel", "/ˈlʌɡɪdʒ/", "noun", "ЛАГ-идж ≈ ЛЯГушка: в твоём багаже сидит лягушка-путешественница.", "My luggage is too heavy.", "Мой багаж слишком тяжёлый."],
    ["book", "бронировать", "Travel", "/bʊk/", "verb", "BOOK — книга: администратор записывает твою бронь в большую книгу.", "I booked a hotel in Istanbul.", "Я забронировала отель в Стамбуле."],
    ["departure", "отправление, вылет", "Travel", "/dɪˈpɑːtʃə/", "noun", "ди-ПАР-чер ≈ ПАРОХОД отправляется от причала.", "The departure is at 6 a.m.", "Вылет в 6 утра."],
    ["neighbour", "сосед", "Daily Life", "/ˈneɪbə/", "noun", "НЕЙ-бэ ≈ «НЕ БЕЙ» соседа, даже если он шумит!", "Our neighbour has a big dog.", "У нашего соседа большая собака."],
    ["borrow", "брать взаймы", "Daily Life", "/ˈbɒrəʊ/", "verb", "БО-роу ≈ БОРОДА: бородатый сосед взял у тебя бритву взаймы.", "Can I borrow your pen?", "Можно одолжить твою ручку?"],
    ["relative", "родственник", "Family", "/ˈrelətɪv/", "noun", "РЕЛ-этив ≈ РЕЛЬСЫ: родственники связаны, как рельсы одной железной дороги.", "All our relatives came to the wedding.", "Все наши родственники пришли на свадьбу."],
    ["raise", "растить (детей), поднимать", "Family", "/reɪz/", "verb", "РЕЙЗ ≈ РЕЙС: ты растишь ребёнка, как самолёт набирает высоту в рейсе.", "She raised two children alone.", "Она одна вырастила двоих детей."]
  ];
  const KID_WORDS = [
    ["cat", "кошка", "Animals", "/kæt/", "noun", "КЭТ — кошку зовут Кэт. Мяу, я Кэт!", "The cat is sleeping.", "Кошка спит.", "🐱"],
    ["dog", "собака", "Animals", "/dɒɡ/", "noun", "ДОГ — огромная собака дог говорит «гав»!", "My dog likes to run.", "Моя собака любит бегать.", "🐶"],
    ["horse", "лошадь", "Animals", "/hɔːs/", "noun", "ХОРС ≈ «ХОРОШО СКачет» — лошадь хорошо скачет!", "The horse is very fast.", "Лошадь очень быстрая.", "🐴"],
    ["lion", "лев", "Animals", "/ˈlaɪən/", "noun", "ЛАЙ-ОН: лев не лает (лай), он рычит — «ЛАЙ? ОН? Нет, РРР!»", "The lion is the king of animals.", "Лев — царь зверей.", "🦁"],
    ["bird", "птица", "Animals", "/bɜːd/", "noun", "БЁРД ≈ БЕРЁЗА: птица сидит на берёзе.", "The bird is singing.", "Птица поёт.", "🐦"],
    ["fish", "рыба", "Animals", "/fɪʃ/", "noun", "ФИШ ≈ ФИШКА: рыбка — главная фишка аквариума.", "I have a little fish.", "У меня есть маленькая рыбка.", "🐟"],
    ["apple", "яблоко", "Food", "/ˈæpl/", "noun", "ЭПЛ — как яблочко на телефоне!", "I eat an apple every day.", "Я ем яблоко каждый день.", "🍎"],
    ["banana", "банан", "Food", "/bəˈnɑːnə/", "noun", "Банан и есть BANANA — только «а» в конце!", "The monkey likes bananas.", "Обезьяна любит бананы.", "🍌"],
    ["milk", "молоко", "Food", "/mɪlk/", "noun", "МИЛК ≈ МИЛАЯ корова даёт молоко.", "I drink milk in the morning.", "Утром я пью молоко.", "🥛"],
    ["bread", "хлеб", "Food", "/bred/", "noun", "БРЕД: «Хлеб — это бред?» — «Нет, это вкусный хлеб!»", "Mum buys bread every day.", "Мама покупает хлеб каждый день.", "🍞"],
    ["water", "вода", "Food", "/ˈwɔːtə/", "noun", "УО-ТЕР ≈ ВОДА: и там, и там есть «В» и «Т/Д».", "Can I have some water?", "Можно мне воды?", "💧"],
    ["ice cream", "мороженое", "Food", "/ˌaɪs ˈkriːm/", "noun", "АЙС КРИМ ≈ «АЙ! КРИК!» — мороженое такое холодное, что хочется крикнуть «Ай!»", "I love chocolate ice cream.", "Я люблю шоколадное мороженое.", "🍦"],
    ["sun", "солнце", "Nature", "/sʌn/", "noun", "САН ≈ «САМ»: солнце светит САМО, без батареек.", "The sun is hot.", "Солнце горячее.", "☀️"],
    ["moon", "луна", "Nature", "/muːn/", "noun", "МУН ≈ «МУУУ!» — корова прыгнула до самой луны.", "The moon is big tonight.", "Сегодня луна большая.", "🌙"],
    ["star", "звезда", "Nature", "/stɑː/", "noun", "СТАР ≈ СТАРАЯ: звёзды очень старые, им миллионы лет.", "I can see a star.", "Я вижу звезду.", "⭐"],
    ["tree", "дерево", "Nature", "/triː/", "noun", "ТРИ: во дворе растут ТРИ дерева — tree, tree, tree!", "There is a tall tree in the park.", "В парке растёт высокое дерево.", "🌳"],
    ["flower", "цветок", "Nature", "/ˈflaʊə/", "noun", "ФЛАУ-э ≈ ФЛАКОН: духи во флаконе пахнут цветами.", "This flower is red.", "Этот цветок красный.", "🌸"],
    ["rain", "дождь", "Nature", "/reɪn/", "noun", "РЕЙН ≈ РЕЙКИ: дождь стучит по рейкам забора — тук-тук.", "I don't like rain.", "Я не люблю дождь.", "🌧️"],
    ["house", "дом", "Home", "/haʊs/", "noun", "ХАУС ≈ ХАОС: дома хаос, когда все играют!", "This is my house.", "Это мой дом.", "🏠"],
    ["car", "машина", "Toys & Things", "/kɑː/", "noun", "КАР! — каркает ворона, сидя на машине.", "Dad has a white car.", "У папы белая машина.", "🚗"],
    ["ball", "мяч", "Toys & Things", "/bɔːl/", "noun", "БОЛ ≈ БОЛЬНО: мяч попал в нос — больно!", "Let's play with the ball.", "Давай поиграем с мячом.", "⚽"],
    ["bike", "велосипед", "Toys & Things", "/baɪk/", "noun", "БАЙК ≈ БАЙКЕР: маленький байкер едет на велосипеде.", "I ride my bike in the park.", "Я катаюсь на велосипеде в парке.", "🚲"],
    ["book", "книга", "School", "/bʊk/", "noun", "БУК ≈ «БУХ!» — тяжёлая книга упала на пол.", "This book is interesting.", "Эта книга интересная.", "📚"],
    ["pencil", "карандаш", "School", "/ˈpensl/", "noun", "ПЕН-сл ≈ ПЕНАЛ: карандаш живёт в пенале.", "I need a pencil.", "Мне нужен карандаш.", "✏️"],
    ["school", "школа", "School", "/skuːl/", "noun", "СКУЛ ≈ ШКОЛА: «ск» и «шк» звучат похоже!", "I go to school every day.", "Я хожу в школу каждый день.", "🏫"],
    ["teacher", "учитель", "School", "/ˈtiːtʃə/", "noun", "ТИ-ЧЕР ≈ «ТИШЕ!» — говорит учитель в классе.", "Our teacher is kind.", "Наш учитель добрый.", "🧑‍🏫"],
    ["friend", "друг", "Family", "/frend/", "noun", "ФРЕНД ≈ ФРЕНДЫ в игре — твои друзья.", "Tom is my best friend.", "Том — мой лучший друг.", "🤝"],
    ["mother", "мама", "Family", "/ˈmʌðə/", "noun", "МА-ЗЕ ≈ МАЗЬ: мама мажет ранку мазью.", "My mother is a manager.", "Моя мама — менеджер.", "👩"],
    ["father", "папа", "Family", "/ˈfɑːðə/", "noun", "ФА-ЗЕ ≈ ФАЗА: папа чинит розетку и проверяет фазу.", "My father plays football.", "Мой папа играет в футбол.", "👨"],
    ["brother", "брат", "Family", "/ˈbrʌðə/", "noun", "БРА-ЗЕ ≈ БРАТ: brother и брат начинаются одинаково — БР!", "I have a little brother.", "У меня есть младший брат.", "👦"],
    ["sister", "сестра", "Family", "/ˈsɪstə/", "noun", "СИС-ТЕ ≈ СЕСТРА: С-С-Т, почти одно слово!", "My sister is five.", "Моей сестре пять лет.", "👧"],
    ["red", "красный", "Colours", "/red/", "adjective", "РЭД ≈ РЕДИСКА — она красная!", "My bag is red.", "Мой рюкзак красный.", "🔴"],
    ["blue", "синий", "Colours", "/bluː/", "adjective", "БЛЮ ≈ БЛЮДЦЕ: синее блюдце с синей каёмкой.", "The sky is blue.", "Небо синее.", "🔵"],
    ["green", "зелёный", "Colours", "/ɡriːn/", "adjective", "ГРИН ≈ ГРИБ: гриб растёт в зелёной траве.", "The grass is green.", "Трава зелёная.", "🟢"],
    ["yellow", "жёлтый", "Colours", "/ˈjeləʊ/", "adjective", "ЙЕ-ЛОУ ≈ «ЕЛ, О!»: съел жёлтый банан и сказал «О!»", "The banana is yellow.", "Банан жёлтый.", "🟡"],
    ["happy", "счастливый", "Feelings", "/ˈhæpi/", "adjective", "ХЭП-пи — как «Happy birthday!»: на дне рождения все счастливы.", "I am happy today.", "Я сегодня счастлив.", "😊"],
    ["sad", "грустный", "Feelings", "/sæd/", "adjective", "СЭД ≈ СЕЛ: грустный мальчик сел в уголок.", "Why are you sad?", "Почему ты грустный?", "😢"],
    ["big", "большой", "Describing", "/bɪɡ/", "adjective", "БИГ — огромный БИГ-бургер, очень большой!", "An elephant is big.", "Слон большой.", "🐘"],
    ["small", "маленький", "Describing", "/smɔːl/", "adjective", "СМОЛ ≈ СМОЛА: маленькая капелька смолы на дереве.", "A mouse is small.", "Мышка маленькая.", "🐭"],
    ["run", "бегать", "Actions", "/rʌn/", "verb", "РАН ≈ РАНО: рано утром я бегаю.", "I can run fast.", "Я умею быстро бегать.", "🏃"],
    ["swim", "плавать", "Actions", "/swɪm/", "verb", "СВИМ ≈ СВИНКА: розовая свинка плавает в бассейне.", "Fish can swim.", "Рыбы умеют плавать.", "🏊"],
    ["sleep", "спать", "Actions", "/sliːp/", "verb", "СЛИП ≈ СЛИПАЮТСЯ: глаза слипаются — пора спать.", "The baby is sleeping.", "Малыш спит.", "😴"],
    ["play", "играть", "Actions", "/pleɪ/", "verb", "ПЛЕЙ — кнопка PLAY в игре: нажми и играй!", "Let's play a game.", "Давай сыграем в игру.", "🎮"],
    ["eat", "есть, кушать", "Actions", "/iːt/", "verb", "ИТ ≈ «ИТак, ем!» — сказал мальчик и съел пирог.", "I eat breakfast at 7.", "Я завтракаю в 7.", "🍽️"]
  ];
  const WOTD = [
    ["resilient", "стойкий, жизнестойкий", "Resilient people recover quickly from problems."],
    ["thorough", "тщательный", "She did a thorough analysis of the market."],
    ["eager", "стремящийся, жаждущий", "He is eager to start his new job."],
    ["outcome", "результат, итог", "We are happy with the outcome of the meeting."],
    ["straightforward", "простой, прямолинейный", "The instructions are straightforward."],
    ["to keep in touch", "поддерживать связь", "Let's keep in touch after the conference."],
    ["accomplish", "выполнить, достичь", "We accomplished all our goals this quarter."],
    ["insight", "понимание, инсайт", "The survey gave us valuable insights."],
    ["to figure out", "разобраться, понять", "I need to figure out how this works."],
    ["persuade", "убеждать", "She persuaded the client to sign the contract."],
    ["reluctant", "неохотный", "He was reluctant to change his plans."],
    ["essential", "необходимый, важнейший", "Sleep is essential for good health."],
    ["to run out of", "закончиться (о запасах)", "We have run out of coffee."],
    ["consistent", "последовательный, стабильный", "Consistent practice is the key to success."],
    ["overwhelmed", "перегруженный, ошеломлённый", "I feel overwhelmed with work this week."],
    ["approach", "подход", "We need a new approach to recruitment."],
    ["to come up with", "придумать", "She came up with a great idea."],
    ["opportunity", "возможность", "This is a great opportunity for your career."],
    ["commitment", "приверженность, обязательство", "Learning English requires commitment."],
    ["genuine", "искренний, подлинный", "He showed genuine interest in the project."]
  ];
  const READING = [
    { id: "r1", level: "A1", kid: true, title: "My Family", text: "Hello! My name is Sam. I am ten years old. I live in a big house with my mother, my father and my little sister. My mother is a manager. She works in an office. My father is a doctor. My sister is five. She likes cats and ice cream. We have a dog. His name is Rex. Rex is big and very friendly. Every Sunday we go to the park together. I love my family!",
      q: [["How old is Sam?", "ten", ["five", "ten", "twelve"]], ["Who is a doctor?", "his father", ["his mother", "his father", "his sister"]], ["What do they do on Sundays?", "go to the park", ["go to school", "go to the park", "watch TV"]]] },
    { id: "r2", level: "A1", kid: true, title: "A Day at School", text: "Lola gets up at seven o'clock. She eats breakfast and goes to school by bus. Her first lesson is English. Lola likes English because her teacher is funny and they play games. At twelve o'clock the children have lunch. After school, Lola plays football with her friends. In the evening she does her homework and reads a book. She goes to bed at nine.",
      q: [["How does Lola go to school?", "by bus", ["by car", "by bus", "on foot"]], ["Why does Lola like English?", "her teacher is funny", ["it is easy", "her teacher is funny", "her mum is a teacher"]], ["What time does she go to bed?", "at nine", ["at seven", "at twelve", "at nine"]]] },
    { id: "r3", level: "A2", kid: false, title: "A Job Interview", text: "Last week Dilnoza had a job interview with an international company. She was nervous, so she prepared carefully. She read about the company, practised answers to common questions and chose a smart outfit. The interview lasted forty minutes. The manager asked about her experience, her skills and her biggest achievement. Dilnoza talked about a project she had managed, which increased sales by twenty percent. At the end, she asked about the team and the onboarding process. Two days later the company called her: she got the job!",
      q: [["How did Dilnoza feel before the interview?", "nervous", ["relaxed", "nervous", "angry"]], ["What was her biggest achievement?", "a project that increased sales", ["a new office", "a project that increased sales", "a university degree"]], ["What did she ask at the end?", "about the team and onboarding", ["about the salary", "about holidays", "about the team and onboarding"]]] },
    { id: "r4", level: "B1", kid: false, title: "Working From Home", text: "More and more companies now allow their employees to work from home. Many people say they are more productive because they don't waste time travelling to the office. They can also spend more time with their families. However, working from home has some challenges. It can be difficult to separate work and personal life, and some people feel lonely without their colleagues. Experts suggest creating a clear schedule, having a separate workspace and keeping in touch with the team through regular video calls. A hybrid model, where people work both at home and in the office, is becoming the most popular choice.",
      q: [["Why are some people more productive at home?", "they don't travel to the office", ["they work longer", "they don't travel to the office", "they have a better computer"]], ["What is one challenge of working from home?", "feeling lonely", ["feeling lonely", "high salary", "too many meetings"]], ["Which model is becoming the most popular?", "hybrid", ["office only", "home only", "hybrid"]]] }
  ];
  const SCENARIOS = [
    { id: "intro", kid: true, title: "Познакомься", icon: "👋", role: "a friendly new classmate", goal: "Расскажи о себе: имя, возраст, хобби." },
    { id: "animal", kid: true, title: "Любимое животное", icon: "🐾", role: "a curious zoo keeper", goal: "Опиши своё любимое животное." },
    { id: "school", kid: true, title: "Мой школьный день", icon: "🏫", role: "a friendly teacher", goal: "Расскажи, как проходит твой день в школе." },
    { id: "toyshop", kid: true, title: "Магазин игрушек", icon: "🧸", role: "a shop assistant in a toy shop", goal: "Купи игрушку: спроси цену и цвет." },
    { id: "interview", kid: false, title: "Собеседование", icon: "💼", role: "an HR manager interviewing a candidate for a manager position", goal: "Пройди собеседование: опыт, навыки, достижения." },
    { id: "hr", kid: false, title: "Ты — рекрутер", icon: "🧑‍💼", role: "a job candidate for a sales manager position (the user is the recruiter)", goal: "Проведи интервью с кандидатом сама." },
    { id: "meeting", kid: false, title: "Деловая встреча", icon: "📊", role: "a business partner from a foreign company", goal: "Обсуди сотрудничество и договорись о следующих шагах." },
    { id: "negotiation", kid: false, title: "Переговоры", icon: "🤝", role: "a supplier negotiating prices", goal: "Договорись о лучшей цене и сроках." },
    { id: "restaurant", kid: true, title: "Ресторан", icon: "🍽️", role: "a waiter in a restaurant", goal: "Закажи еду и напитки, попроси счёт." },
    { id: "hotel", kid: false, title: "Отель", icon: "🏨", role: "a hotel receptionist", goal: "Забронируй номер и уточни детали." },
    { id: "family", kid: true, title: "Моя семья", icon: "👨‍👩‍👦", role: "a friendly new neighbour", goal: "Расскажи о своей семье." },
    { id: "past", kid: false, title: "История из прошлого", icon: "📖", role: "an old friend you haven't seen for years", goal: "Расскажи историю в прошедшем времени." },
    { id: "future", kid: false, title: "Планы на будущее", icon: "🚀", role: "a career coach", goal: "Обсуди свои планы на 5 лет." },
    { id: "work", kid: false, title: "Мой рабочий день", icon: "🗓️", role: "a colleague from the London office", goal: "Опиши свой рабочий день и задачи." }
  ];
  // Тест уровня: [вопрос, ответ, варианты, уровень]
  const PLACEMENT = [
    ["My name ___ Anna.", "is", ["am", "is", "are", "be"], "A1"],
    ["She ___ in a bank.", "works", ["work", "works", "working", "is work"], "A1"],
    ["I ___ TV now.", "am watching", ["watch", "am watching", "watches", "watched"], "A1"],
    ["We ___ to the cinema yesterday.", "went", ["go", "went", "gone", "goes"], "A1"],
    ["There ___ two cats in the garden.", "are", ["is", "are", "be", "am"], "A1"],
    ["Have you ever ___ to Paris?", "been", ["be", "was", "been", "being"], "A2"],
    ["He is ___ than his brother.", "taller", ["tall", "taller", "more tall", "tallest"], "A2"],
    ["If it rains, we ___ at home.", "will stay", ["stay", "will stay", "would stay", "stayed"], "A2"],
    ["I was reading when you ___ .", "called", ["call", "called", "were calling", "have called"], "A2"],
    ["The letter ___ yesterday.", "was sent", ["sent", "was sent", "is sent", "has sent"], "B1"],
    ["When I arrived, they ___ already left.", "had", ["have", "had", "were", "did"], "B1"],
    ["If I ___ you, I would accept the offer.", "were", ["am", "were", "will be", "be"], "B1"],
    ["I've been working here ___ 2019.", "since", ["for", "since", "from", "during"], "B1"],
    ["She told me that she ___ the next day.", "would come", ["will come", "would come", "comes", "came"], "B2"],
    ["If he had left earlier, he ___ the train.", "wouldn't have missed", ["won't miss", "wouldn't miss", "wouldn't have missed", "didn't miss"], "B2"],
    ["By next June I ___ my degree.", "will have finished", ["finish", "will finish", "will have finished", "am finishing"], "B2"],
    ["Hardly ___ the meeting started when the lights went out.", "had", ["did", "had", "was", "has"], "C1"],
    ["I'd rather you ___ smoke here.", "didn't", ["don't", "didn't", "won't", "not"], "C1"]
  ];
  const ACH = [
    ["first_word", "🌱", "Первое слово", "Добавить первое своё слово"],
    ["words_10", "📗", "Vocabulary Explorer", "10 слов в словаре"],
    ["words_100", "📚", "First 100 Words", "100 слов в словаре"],
    ["mastered_10", "🧠", "Крепкая память", "10 слов со статусом Mastered"],
    ["streak_3", "🔥", "3 Days Streak", "Заниматься 3 дня подряд"],
    ["streak_7", "🔥", "7 Days Streak", "Заниматься 7 дней подряд"],
    ["streak_30", "🌋", "30 Days Streak", "Заниматься 30 дней подряд"],
    ["xp_500", "⭐", "500 XP", "Набрать 500 XP"],
    ["xp_3000", "🌟", "3000 XP", "Набрать 3000 XP"],
    ["perfect_day", "🎯", "Perfect Day", "Выполнить весь план дня"],
    ["perfect_week", "🏅", "Perfect Week", "План выполнен 7 дней подряд"],
    ["boss", "👹", "Boss Slayer", "Победить Daily Boss (80%+)"],
    ["grammar_5", "🎮", "Grammar Fighter", "Пройти 5 тем грамматики на 80%+"],
    ["grammar_12", "👑", "Grammar Master", "Все 12 времён на 80%+"],
    ["listening", "🎧", "Listening Hero", "30 верных ответов в аудировании"],
    ["speaking", "🗣️", "Speaking Champion", "20 реплик в разговорной практике"],
    ["diary_5", "📔", "Writer", "5 записей в English Diary"],
    ["duel", "⚔️", "Family Champion", "Победить в семейной дуэли"],
    ["teacher", "🍎", "Отличник", "Выполнить задание учителя"],
    ["mnemo", "💡", "Мастер ассоциаций", "Придумать 5 своих мнемоник"]
  ];
  const CATS_ADULT = ["Business English", "HR & Recruitment", "Daily Life", "Family", "Travel", "Education", "Finance", "General Vocabulary"];
  const CATS_KID = ["Animals", "Food", "Nature", "Home", "Toys & Things", "School", "Family", "Colours", "Feelings", "Describing", "Actions"];
  return { TOPICS, CURRICULUM, ADULT_WORDS, KID_WORDS, WOTD, READING, SCENARIOS, PLACEMENT, ACH, CATS_ADULT, CATS_KID };
})();

/* ===== Расширение программы: сложные задания, новые темы, слова, тексты ===== */
(function (D) {
  const T = Object.fromEntries(D.TOPICS.map(t => [t.id, t]));
  const add = (id, items, errors) => { T[id].items.push(...items); if (errors) T[id].errors.push(...errors); };
  add('ps', [
    ["My daughter ___ getting up early.", "doesn't like", ["doesn't like", "don't like", "isn't liking", "not likes"], "She → doesn't + глагол без -s."],
    ["What ___ your husband do for a living?", "does", ["do", "does", "is", "did"], "Your husband = he → does."],
    ["I ___ what you mean.", "understand", ["understand", "am understanding", "understands", "have understood"], "Understand — глагол состояния, в Continuous не используется."]
  ]);
  add('pc', [
    ["I ___ of changing my job.", "am thinking", ["think", "am thinking", "thinks", "thought"], "Think в значении «обдумывать» — это процесс → Continuous."],
    ["Prices ___ rising these days.", "are", ["is", "are", "do", "have"], "These days — временная тенденция → are rising."],
    ["We ___ our relatives this weekend — it's all arranged.", "are visiting", ["visit", "are visiting", "visits", "have visited"], "Договорённость на ближайшее будущее → Present Continuous."]
  ]);
  add('pp', [
    ["This is the best film I have ever ___ .", "seen", ["saw", "seen", "see", "seeing"], "Превосходная степень + ever → Present Perfect: have seen."],
    ["How long ___ you known each other?", "have", ["do", "have", "did", "are"], "How long + know (состояние) → have known."],
    ["She ___ to Dubai. She isn't here now.", "has gone", ["has been", "has gone", "went", "is gone"], "Has gone — уехала и сейчас там; has been — была и вернулась."],
    ["I ___ three cups of coffee today.", "have drunk", ["drank", "have drunk", "have drank", "drink"], "Today ещё не закончился → Present Perfect; drink → drank → drunk."]
  ]);
  add('ppc', [
    ["You look exhausted! What ___ you been doing?", "have", ["did", "have", "are", "had"], "Видимый результат длительного действия → have been doing."],
    ["I ___ this book for weeks and I still haven't finished it.", "have been reading", ["read", "am reading", "have been reading", "had read"], "For weeks и до сих пор → have been reading."],
    ["She has been working here ___ three years.", "for", ["for", "since", "during", "from"], "For + период (три года)."]
  ]);
  add('pas', [
    ["When I was a child, I ___ in the countryside.", "lived", ["lived", "have lived", "live", "was live"], "Закончившийся период в прошлом → Past Simple."],
    ["I ___ him at the party last night.", "didn't see", ["didn't see", "haven't seen", "didn't saw", "not saw"], "Last night → Past Simple; после didn't — see."],
    ["Where ___ you buy this dress?", "did", ["do", "did", "have", "were"], "Покупка уже совершена, вопрос о прошлом → did."]
  ]);
  add('pac', [
    ["While I ___ dinner, the lights went out.", "was cooking", ["cooked", "was cooking", "were cooking", "am cooking"], "While + длительный процесс → was cooking."],
    ["What were you doing when I ___ you?", "called", ["called", "was calling", "call", "have called"], "Короткое событие, прервавшее процесс → Past Simple."],
    ["At midnight we ___ still working on the report.", "were", ["was", "were", "are", "had"], "We → were + V-ing."]
  ]);
  add('pap', [
    ["By the time the police arrived, the thief ___ .", "had escaped", ["escaped", "had escaped", "has escaped", "was escaping"], "Вор сбежал раньше приезда полиции → had escaped."],
    ["It was the first time I ___ snow.", "had seen", ["see", "had seen", "have seen", "was seeing"], "It was the first time + Past Perfect."],
    ["She told me she had already ___ the tickets.", "bought", ["buy", "bought", "buyed", "buying"], "had + V3: buy → bought → bought."]
  ]);
  add('papc', [
    ["The ground was wet because it ___ all night.", "had been raining", ["rained", "has been raining", "had been raining", "was rain"], "Длительное действие до момента в прошлом с видимым результатом."],
    ["I ___ for an hour when the doctor finally called me in.", "had been waiting", ["waited", "have been waiting", "had been waiting", "was waited"], "Час ожидания до момента в прошлом."],
    ["How long had they been ___ before they got married?", "dating", ["date", "dated", "dating", "dates"], "had been + V-ing."]
  ]);
  add('fs', [
    ["I'm sure you ___ the exam.", "will pass", ["pass", "will pass", "passed", "are passing"], "Уверенность о будущем → will."],
    ["___ I help you with your bags?", "Shall", ["Shall", "Will", "Do", "Am"], "Предложение помощи → Shall I...?"],
    ["Look at those black clouds! It ___ rain.", "is going to", ["will", "is going to", "rains", "is raining"], "Есть признаки сейчас → be going to."]
  ]);
  add('fc', [
    ["This time next year I ___ in London.", "will be living", ["will live", "will be living", "live", "lived"], "Процесс в момент будущего → will be + V-ing."],
    ["Will you ___ the car tonight? I need it.", "be using", ["be using", "using", "use", "been using"], "Вежливый вопрос о планах → Will you be using...?"],
    ["Don't phone me between 9 and 10 — I ___ a meeting.", "will be having", ["will have", "will be having", "have", "had"], "В это время буду в процессе встречи."]
  ]);
  add('fp', [
    ["By the time we get there, the film ___ .", "will have started", ["starts", "will start", "will have started", "has started"], "К моменту нашего прихода → will have started."],
    ["I ___ the book by next Monday.", "will have read", ["read", "will read", "will have read", "have read"], "By next Monday → результат к сроку."],
    ["By 2030, scientists ___ a cure, I hope.", "will have found", ["find", "will have found", "found", "are finding"], "By 2030 → Future Perfect."]
  ]);
  add('fpc', [
    ["By December she ___ English for three years.", "will have been learning", ["will learn", "will have been learning", "learns", "has learned"], "for + by → Future Perfect Continuous."],
    ["Next month I will have been ___ at this company for five years.", "working", ["work", "worked", "working", "works"], "will have been + V-ing."],
    ["By 8 p.m. they ___ for twelve hours non-stop.", "will have been driving", ["drive", "will drive", "will have been driving", "have driven"], "Длительность к моменту в будущем."]
  ]);

  const NEW = [
    { id: "mixed", name: "Mixed Tenses", ru: "Микс времён: выбери правильное время", level: "B1", kid: false,
      intro: "Самое сложное — не знать формулы, а выбрать нужное время. Здесь все 12 времён вперемешку.",
      use: ["Ищи маркеры: yesterday → Past Simple, since/for → Perfect, now → Continuous, by → Perfect.", "Спроси себя: важен результат, процесс или факт?", "Что было раньше в прошлом — Past Perfect."],
      formula: [["Факт / привычка", "Present Simple"], ["Сейчас / процесс", "Continuous"], ["Результат / опыт", "Perfect"], ["Длительность до момента", "Perfect Continuous"]],
      markers: ["now", "yesterday", "since", "for", "by", "already", "while", "when"],
      examples: [["I have known him since we were at school", "Я знаю его со школы."], ["We were having dinner when the phone rang", "Мы ужинали, когда зазвонил телефон."], ["She had lived in Paris before she moved to London", "До переезда в Лондон она жила в Париже."]],
      tip: "Сначала найди слово-маркер — оно почти всегда подсказывает время.",
      items: [
        ["I ___ him since we were at school.", "have known", ["know", "have known", "knew", "am knowing"], "Since + до сих пор, know — состояние → have known."],
        ["I ___ my keys yesterday, but I found them this morning.", "lost", ["lost", "have lost", "had lost", "was losing"], "Yesterday → Past Simple."],
        ["Listen! Someone ___ at the door.", "is knocking", ["knocks", "is knocking", "knocked", "has knocked"], "Listen! → прямо сейчас."],
        ["She ___ in Paris for five years before she moved to London.", "had lived", ["lived", "has lived", "had lived", "was living"], "Раньше другого действия в прошлом → Past Perfect."],
        ["By next summer we ___ the new office.", "will have opened", ["open", "will open", "will have opened", "are opening"], "By next summer → Future Perfect."],
        ["I usually ___ to work, but today I'm taking a taxi.", "walk", ["walk", "am walking", "walked", "have walked"], "Usually → привычка → Present Simple."],
        ["How long ___ you been learning English?", "have", ["do", "have", "are", "did"], "How long + до сих пор → have been learning."],
        ["This time tomorrow I ___ on the beach.", "will be lying", ["lie", "will lie", "will be lying", "am lying"], "This time tomorrow → Future Continuous."],
        ["He ___ the report yet.", "hasn't finished", ["didn't finish", "hasn't finished", "doesn't finish", "hadn't finished"], "Yet → Present Perfect."],
        ["We ___ dinner when the phone rang.", "were having", ["had", "were having", "have", "are having"], "Процесс, прерванный событием → Past Continuous."],
        ["The company ___ in 1998.", "was founded", ["founded", "has founded", "was founded", "is founded"], "Компанию основали (пассив) в 1998 → was founded."],
        ["I'm tired because I ___ since 6 a.m.", "have been working", ["work", "worked", "have been working", "am working"], "Since + длительность + результат → Present Perfect Continuous."]
      ],
      errors: [["I am knowing the answer.", "knowing", "I know the answer.", "Know — глагол состояния, не бывает в Continuous."], ["When I came home, my wife already cooked dinner.", "cooked", "When I came home, my wife had already cooked dinner.", "Раньше другого действия в прошлом → had cooked."], ["I live here since 2015.", "live", "I have lived here since 2015.", "Since + до сих пор → Present Perfect."]] },
    { id: "business", name: "Business English", ru: "Деловой английский: письма и встречи", level: "B1", kid: false,
      intro: "Готовые фразы для писем, звонков и встреч — то, что нужно на работе каждый день.",
      use: ["Начало письма: I'm writing to enquire about... / Following our call...", "Вложения: Please find attached...", "Конец: I look forward to hearing from you.", "Встречи: Could we reschedule...? Let's move on to the next point."],
      formula: [["Письмо", "Dear… → I'm writing to… → Please find attached… → I look forward to hearing from you. → Best regards"], ["Встреча", "Let's get started → Moving on to… → To sum up…"]],
      markers: ["Dear", "regarding", "attached", "as mentioned", "kind regards", "ASAP", "EOD"],
      examples: [["I look forward to hearing from you", "Жду вашего ответа."], ["Please find the report attached", "Отчёт во вложении."], ["Could we reschedule the meeting to Friday", "Можем ли мы перенести встречу на пятницу?"]],
      tip: "После look forward to — всегда V-ing: looking forward to hearing.",
      items: [
        ["I'm writing to ___ about the vacancy.", "enquire", ["enquire", "ask you", "question", "wonder"], "Официально: I'm writing to enquire about..."],
        ["Please find the report ___ .", "attached", ["attached", "attaching", "in attach", "attach"], "Please find ... attached — устойчивая фраза."],
        ["I look forward to ___ from you.", "hearing", ["hearing", "hear", "heard", "be hearing"], "look forward to + V-ing."],
        ["Could we ___ the meeting to Friday?", "reschedule", ["reschedule", "rename", "return", "repeat"], "Перенести встречу → reschedule."],
        ["Let me ___ you to our new colleague.", "introduce", ["introduce", "present to", "meet", "know"], "Представить кого-то → introduce somebody to somebody."],
        ["As ___ in my previous email, the deadline is Monday.", "mentioned", ["mentioned", "told", "said to", "spoken"], "As mentioned — как упоминалось."],
        ["Could you send me the figures by the end of the ___ ?", "day", ["day", "time", "night", "hour"], "By the end of the day (EOD) — до конца дня."]
      ],
      errors: [["I look forward to hear from you.", "hear", "I look forward to hearing from you.", "look forward to + V-ing."], ["Please find attach the file.", "attach", "Please find attached the file.", "Устойчивая фраза: Please find attached."]] },
    { id: "idioms", name: "Idioms", ru: "Идиомы и устойчивые выражения", level: "B2", kid: false,
      intro: "Идиомы нельзя переводить дословно — их нужно запоминать целиком, как картинку.",
      use: ["a piece of cake — проще простого", "under the weather — неважно себя чувствовать", "call it a day — закончить на сегодня", "hit the nail on the head — попасть в точку", "keep fingers crossed — держать кулаки"],
      formula: [["Правило", "Значение идиомы ≠ сумма слов. Учим фразу целиком."]],
      markers: [],
      examples: [["The test was a piece of cake", "Тест был проще простого."], ["Let's call it a day", "На сегодня хватит."], ["I'll keep my fingers crossed for you", "Буду держать за тебя кулаки."]],
      tip: "Нарисуй идиому в голове дословно — смешная картинка поможет запомнить.",
      items: [
        ["Don't worry, the exam was a piece of ___ .", "cake", ["cake", "bread", "pie", "sugar"], "A piece of cake — очень легко."],
        ["I'm feeling under the ___ today, I think I've got a cold.", "weather", ["weather", "rain", "sun", "sky"], "Under the weather — неважно себя чувствовать."],
        ["Let's call it a ___ and go home.", "day", ["day", "night", "time", "work"], "Call it a day — закончить на сегодня."],
        ["You hit the ___ on the head — that's exactly the problem.", "nail", ["nail", "hammer", "head", "point"], "Hit the nail on the head — попасть в точку."],
        ["We're all in the same ___ .", "boat", ["boat", "ship", "house", "room"], "In the same boat — в одной лодке, в одинаковом положении."],
        ["Break a ___ ! Good luck at the concert!", "leg", ["leg", "arm", "hand", "foot"], "Break a leg — ни пуха ни пера."],
        ["I'll keep my fingers ___ for you.", "crossed", ["crossed", "closed", "tight", "together"], "Keep fingers crossed — держать кулаки."]
      ],
      errors: [["It's raining dogs and cats.", "dogs", "It's raining cats and dogs.", "Устойчивый порядок: cats and dogs — льёт как из ведра."]] },
    { id: "inversion", name: "Inversion & Emphasis", ru: "Инверсия и эмфаза (продвинутый уровень)", level: "C1", kid: false,
      intro: "В формальной и эмоциональной речи порядок слов меняется: Never have I seen... Это признак уровня C1.",
      use: ["После Never, Rarely, Seldom, Hardly, Not only, Only later в начале — вопросительный порядок.", "Условия без if: Had I known... = If I had known...; Should you need... = If you need..."],
      formula: [["Инверсия", "Never/Hardly/Not only + вспомогательный глагол + подлежащее + V"], ["Условие", "Had + S + V3 … / Should + S + V …"]],
      markers: ["never", "rarely", "hardly", "not only", "only later", "had I known", "should you"],
      examples: [["Never have I seen such a beautiful place", "Никогда я не видела такого красивого места."], ["Had I known I would have come", "Если бы я знала, я бы пришла."], ["Not only is she smart but she is also kind", "Она не только умная, но и добрая."]],
      tip: "Строй как вопрос: Never + have I + seen.",
      items: [
        ["Never ___ such a beautiful sunset.", "have I seen", ["have I seen", "I have seen", "I saw", "did I saw"], "Never в начале → инверсия: have I seen."],
        ["Not only ___ late, but he also forgot the documents.", "was he", ["was he", "he was", "he is", "did he was"], "Not only в начале → was he."],
        ["Hardly ___ arrived when the meeting started.", "had we", ["had we", "we had", "we have", "did we"], "Hardly … when + Past Perfect с инверсией."],
        ["Only later ___ the truth.", "did I realise", ["did I realise", "I realised", "I did realise", "realised I"], "Only later → did + I + V."],
        ["Should you ___ any questions, please contact me.", "have", ["have", "had", "having", "to have"], "Should you have = If you have."],
        ["Had I known, I ___ earlier.", "would have come", ["will come", "would come", "would have come", "had come"], "Had I known = If I had known → would have + V3."]
      ],
      errors: [["Never I have seen such a mess.", "I", "Never have I seen such a mess.", "После Never в начале — инверсия: have I."]] }
  ];
  NEW.forEach(t => { if (!T[t.id]) D.TOPICS.push(t); });
  const ins = (after, id) => { if (D.CURRICULUM.includes(id)) return; const i = D.CURRICULUM.indexOf(after); D.CURRICULUM.splice(i < 0 ? D.CURRICULUM.length : i + 1, 0, id); };
  ins('pap', 'mixed'); ins('phrasal', 'business'); ins('relative', 'idioms'); ins('fpc', 'inversion');

  D.ADULT_WORDS.push(
    ["appraisal", "оценка работы сотрудника", "HR & Recruitment", "/əˈpreɪzl/", "noun", "э-ПРЕЙ-зл ≈ «ПРАЙС»: на оценке решают, какая «цена» у твоей работы.", "Annual appraisals take place in December.", "Ежегодная оценка проходит в декабре."],
    ["promotion", "повышение в должности", "HR & Recruitment", "/prəˈməʊʃn/", "noun", "ПРОМО-шн ≈ ПРОМОАКЦИЯ: тебя «продвигают», как лучший товар.", "She got a promotion last month.", "В прошлом месяце её повысили."],
    ["resign", "увольняться по собственному желанию", "HR & Recruitment", "/rɪˈzaɪn/", "verb", "ри-ЗАЙН ≈ «РИС и ЗАЙЧИК»: зайчик сложил свой рис в коробку и ушёл с работы.", "He resigned to start his own business.", "Он уволился, чтобы открыть своё дело."],
    ["turnover", "текучесть кадров; оборот", "HR & Recruitment", "/ˈtɜːnəʊvə/", "noun", "TURN (повернуться) + OVER: сотрудники «поворачиваются» и уходят — текучесть.", "Staff turnover is high in retail.", "В рознице высокая текучесть кадров."],
    ["headhunter", "хедхантер", "HR & Recruitment", "/ˈhedhʌntə/", "noun", "HEAD (голова) + HUNTER (охотник): охотник за головами — ищет лучших.", "A headhunter called me with a job offer.", "Мне позвонил хедхантер с предложением работы."],
    ["probation", "испытательный срок", "HR & Recruitment", "/prəˈbeɪʃn/", "noun", "ПРОБА-шн ≈ ПРОБА: пробный период, проба сил.", "The probation period is three months.", "Испытательный срок — три месяца."],
    ["workload", "рабочая нагрузка", "Business English", "/ˈwɜːkləʊd/", "noun", "WORK + LOAD (груз): груз работы на твоих плечах.", "My workload is very heavy this week.", "На этой неделе у меня очень большая нагрузка."],
    ["delegate", "делегировать, поручать", "Business English", "/ˈdelɪɡeɪt/", "verb", "ДЕЛЕГАТ: отправляешь делегата сделать работу вместо тебя.", "A good manager knows how to delegate.", "Хороший руководитель умеет делегировать."],
    ["efficient", "эффективный", "Business English", "/ɪˈfɪʃnt/", "adjective", "и-ФИШ-нт ≈ ФИШКА: у эффективного человека есть фишка — он всё делает быстро.", "We need a more efficient process.", "Нам нужен более эффективный процесс."],
    ["agenda", "повестка дня", "Business English", "/əˈdʒendə/", "noun", "э-ДЖЕН-да ≈ «А, ДЕЛА!»: список дел на встречу.", "What's on the agenda for today's meeting?", "Что в повестке сегодняшней встречи?"],
    ["employee", "сотрудник", "HR & Recruitment", "/ɪmˈplɔɪiː/", "noun", "им-ПЛОЙ-и ≈ «ИМ ПЛАТЯТ»: сотрудник — тот, кому платят.", "The company has 200 employees.", "В компании 200 сотрудников."],
    ["employer", "работодатель", "HR & Recruitment", "/ɪmˈplɔɪə/", "noun", "-ER — тот, кто делает: employer нанимает, а employee — тот, кого наняли.", "My employer pays for my English lessons.", "Работодатель оплачивает мои уроки английского."],
    ["recruit", "нанимать, набирать", "HR & Recruitment", "/rɪˈkruːt/", "verb", "РЕКРУТ: набираешь рекрутов в свою команду.", "We recruit new staff every spring.", "Мы набираем новых сотрудников каждую весну."],
    ["shortlist", "короткий список кандидатов", "HR & Recruitment", "/ˈʃɔːtlɪst/", "noun", "SHORT (короткий) + LIST: короткий список финалистов.", "Three candidates are on the shortlist.", "В шорт-листе три кандидата."],
    ["reference", "рекомендация", "HR & Recruitment", "/ˈrefrəns/", "noun", "РЕФЕРЕНС ≈ РЕФЕРАТ: о тебе пишут «реферат» — рекомендацию.", "Can you give me a reference?", "Можете дать мне рекомендацию?"],
    ["flexible", "гибкий", "Business English", "/ˈfleksəbl/", "adjective", "ФЛЕКС ≈ «флексить» в танце — гнуться: гибкий график.", "I have flexible working hours.", "У меня гибкий рабочий график."],
    ["remote", "удалённый", "Business English", "/rɪˈməʊt/", "adjective", "ри-МОУТ ≈ remote control — пульт: управляешь работой издалека.", "She works remotely from home.", "Она работает удалённо из дома."],
    ["commute", "ездить на работу", "Daily Life", "/kəˈmjuːt/", "verb", "ком-МЬЮТ ≈ «КОМ И МУТЬ»: каждое утро в транспорте — ком и муть.", "I commute to work by metro.", "Я езжу на работу на метро."],
    ["overtime", "сверхурочные", "HR & Recruitment", "/ˈəʊvətaɪm/", "noun", "OVER (сверх) + TIME (время): сверх рабочего времени.", "He often works overtime.", "Он часто работает сверхурочно."],
    ["sick leave", "больничный", "HR & Recruitment", "/ˈsɪk liːv/", "noun", "SICK (больной) + LEAVE (уйти): ушёл, потому что болен.", "She is on sick leave this week.", "На этой неделе она на больничном."],
    ["negotiate", "вести переговоры", "Business English", "/nɪˈɡəʊʃieɪt/", "verb", "Родственник negotiation: партнёр кричит «НЕ ГОУ!», а ты торгуешься.", "We negotiated a better price.", "Мы договорились о лучшей цене."],
    ["contract", "договор, контракт", "Business English", "/ˈkɒntrækt/", "noun", "КОНТРАКТ — то же слово, только ударение на первый слог.", "Please sign the contract.", "Пожалуйста, подпишите договор."],
    ["invoice", "счёт к оплате", "Finance", "/ˈɪnvɔɪs/", "noun", "ИН-ВОЙС ≈ «И — ВОЙ!»: увидел счёт и завыл.", "Please send us the invoice.", "Пожалуйста, пришлите нам счёт."],
    ["revenue", "выручка, доход", "Finance", "/ˈrevənjuː/", "noun", "РЕВЕ-нью ≈ «РЕВЕНЬ НОВЫЙ»: продали новый ревень — получили выручку.", "Our revenue grew by 20 percent.", "Наша выручка выросла на 20 процентов."],
    ["expense", "расход", "Finance", "/ɪkˈspens/", "noun", "икс-ПЕНС ≈ ПЕНСЫ: уходят пенсы-копейки — это расходы.", "Travel expenses are paid by the company.", "Командировочные расходы оплачивает компания."],
    ["afford", "позволить себе (по деньгам)", "Finance", "/əˈfɔːd/", "verb", "э-ФОРД ≈ ФОРД: могу ли я позволить себе Форд?", "We can't afford a new car this year.", "В этом году мы не можем позволить себе новую машину."],
    ["receipt", "чек, квитанция", "Daily Life", "/rɪˈsiːt/", "noun", "ри-СИТ (p не читается!) ≈ «РИС и СИТО»: купил рис и сито — вот чек.", "Keep the receipt, please.", "Сохраните чек, пожалуйста."],
    ["discount", "скидка", "Daily Life", "/ˈdɪskaʊnt/", "noun", "ДИСКАУНТ — магазин-дискаунтер со скидками.", "Is there a discount for children?", "Есть ли скидка для детей?"],
    ["complain", "жаловаться", "Daily Life", "/kəmˈpleɪn/", "verb", "ком-ПЛЕЙН ≈ «КОМ и ПЛЕН»: в горле ком, ты как в плену — жалуешься.", "The client complained about the delay.", "Клиент пожаловался на задержку."],
    ["apologise", "извиняться", "Business English", "/əˈpɒlədʒaɪz/", "verb", "э-ПОЛО-джайз ≈ АПОЛОГИЯ: оправдательная речь — извиняешься.", "I apologise for the late reply.", "Прошу прощения за поздний ответ."],
    ["explain", "объяснять", "General Vocabulary", "/ɪkˈspleɪn/", "verb", "икс-ПЛЕЙН ≈ ПЛАН: объясняешь план по пунктам.", "Can you explain the rules?", "Можешь объяснить правила?"],
    ["lend", "одалживать (кому-то)", "Daily Life", "/lend/", "verb", "ЛЕНД ≈ ЛЕНТЯЙ: ленивому соседу даёшь взаймы. Lend — дать, borrow — взять.", "Can you lend me some money?", "Можешь одолжить мне немного денег?"],
    ["neighbourhood", "район", "Daily Life", "/ˈneɪbəhʊd/", "noun", "NEIGHBOUR (сосед) + HOOD: место, где живут соседи.", "We live in a quiet neighbourhood.", "Мы живём в тихом районе."],
    ["household", "домашнее хозяйство", "Family", "/ˈhaʊshəʊld/", "noun", "HOUSE + HOLD (держать): то, на чём держится дом.", "Every household needs a budget.", "Каждой семье нужен бюджет."],
    ["chores", "домашние дела", "Family", "/tʃɔːz/", "noun", "ЧОРЗ ≈ «ЧЁРТ!»: опять мыть посуду — чёрт!", "My son helps with the chores.", "Сын помогает с домашними делами."],
    ["upbringing", "воспитание", "Family", "/ˈʌpbrɪŋɪŋ/", "noun", "UP (вверх) + BRING (приносить): «поднимать» ребёнка — воспитывать.", "Parents are responsible for a child's upbringing.", "Родители отвечают за воспитание ребёнка."],
    ["sibling", "брат или сестра", "Family", "/ˈsɪblɪŋ/", "noun", "СИБ-линг ≈ СИБИРЬ: братья и сёстры из Сибири — сиблинги.", "Do you have any siblings?", "У тебя есть братья или сёстры?"],
    ["look after", "присматривать, заботиться", "Family", "/lʊk ˈɑːftə/", "phrasal", "LOOK (смотреть) + AFTER (за): смотреть за кем-то.", "Grandma looks after my son on Fridays.", "По пятницам бабушка присматривает за сыном."],
    ["itinerary", "маршрут поездки", "Travel", "/aɪˈtɪnərəri/", "noun", "ай-ТИ-нерери ≈ «АЙ, ТИНА!»: маршрут через болото с тиной.", "Here is our travel itinerary.", "Вот маршрут нашей поездки."],
    ["boarding pass", "посадочный талон", "Travel", "/ˈbɔːdɪŋ pɑːs/", "noun", "BOARD (борт) + PASS (пропуск): пропуск на борт.", "Show your boarding pass at the gate.", "Покажите посадочный талон у выхода."],
    ["delay", "задержка", "Travel", "/dɪˈleɪ/", "noun", "ди-ЛЕЙ ≈ «ДИ, ЛЕЙ!»: дождь льёт — рейс задерживается.", "The flight has a two-hour delay.", "Рейс задерживается на два часа."],
    ["cancel", "отменять", "Business English", "/ˈkænsl/", "verb", "КЭН-сл ≈ КАНЦЕЛЯРИЯ: в канцелярии отменили встречу.", "They cancelled the meeting.", "Они отменили встречу."],
    ["available", "доступный, свободный", "Business English", "/əˈveɪləbl/", "adjective", "э-ВЕЙ-лэбл ≈ «А, ВЕЙ — БЫЛ!»: свободен ли кит (whale)? Был! Значит, доступен.", "Is the manager available now?", "Менеджер сейчас свободен?"],
    ["require", "требовать", "HR & Recruitment", "/rɪˈkwaɪə/", "verb", "Родственник requirement: ри-КВАЙ-э — «требовать».", "This job requires experience.", "Для этой работы требуется опыт."],
    ["goal", "цель", "General Vocabulary", "/ɡəʊl/", "noun", "ГОУЛ ≈ ГОЛ: цель футболиста — гол!", "My goal is to speak English fluently.", "Моя цель — свободно говорить по-английски."],
    ["succeed", "добиться успеха", "General Vocabulary", "/səkˈsiːd/", "verb", "сэк-СИД ≈ «СЕКРЕТАРЬ СИДИТ» в кресле директора — добилась успеха.", "If you practise every day, you will succeed.", "Если заниматься каждый день, всё получится."],
    ["failure", "неудача", "General Vocabulary", "/ˈfeɪljə/", "noun", "ФЕЙЛ — «фейл» в интернете: неудача.", "Failure is part of learning.", "Неудачи — часть обучения."],
    ["confident", "уверенный", "General Vocabulary", "/ˈkɒnfɪdənt/", "adjective", "КОНФИДЕНТ — тот, кому доверяют: он уверен в себе.", "She feels confident speaking English now.", "Теперь она уверенно говорит по-английски."],
    ["encourage", "поощрять, поддерживать", "Education", "/ɪnˈkʌrɪdʒ/", "verb", "ин-КА-ридж ≈ КУРАЖ: даёшь человеку кураж — поддерживаешь.", "Teachers should encourage their students.", "Учителя должны поддерживать учеников."],
    ["honest", "честный", "General Vocabulary", "/ˈɒnɪst/", "adjective", "ОНИСТ (h не читается) ≈ «ОНИ ЧИСТЫ»: честные люди чисты.", "Please give me an honest answer.", "Пожалуйста, ответь честно."],
    ["punctual", "пунктуальный", "Business English", "/ˈpʌŋktʃuəl/", "adjective", "ПАНК-чуал ≈ ПУНКТУАЛЬНЫЙ — слово-близнец.", "Our teacher is always punctual.", "Наш учитель всегда пунктуален."],
    ["estimate", "оценивать (примерно)", "Business English", "/ˈestɪmeɪt/", "verb", "ЭСТИ-мейт ≈ «ЕСТЬ И МЕТР»: есть метр — примерно оценишь.", "Can you estimate the cost?", "Можете примерно оценить стоимость?"],
    ["implement", "внедрять", "Business English", "/ˈɪmplɪment/", "verb", "ИМПЛ-имент ≈ ИМПЛАНТ: новое внедряют, как имплант.", "We implemented a new HR system.", "Мы внедрили новую HR-систему."],
    ["survey", "опрос", "HR & Recruitment", "/ˈsɜːveɪ/", "noun", "СЁР-вей ≈ «СЭР, ВЕЙ!»: сэр, ответьте на опрос!", "We ran an employee survey.", "Мы провели опрос сотрудников."],
    ["fulfil", "выполнять (обещание, обязательство)", "Business English", "/fʊlˈfɪl/", "verb", "FULL (полный) + FILL (наполнить): наполнить до конца — выполнить.", "He fulfilled all his promises.", "Он выполнил все свои обещания."]
  );
  D.KID_WORDS.push(
    ["elephant", "слон", "Animals", "/ˈelɪfənt/", "noun", "ЭЛЕ-ФАНТ ≈ «ЭЛЬ И ФАНТА»: слон пьёт фанту хоботом.", "The elephant is very big.", "Слон очень большой.", "🐘"],
    ["monkey", "обезьяна", "Animals", "/ˈmʌŋki/", "noun", "МАН-ки ≈ МАНКА: обезьянка ест манную кашу.", "The monkey is eating a banana.", "Обезьяна ест банан.", "🐒"],
    ["rabbit", "кролик", "Animals", "/ˈræbɪt/", "noun", "РЭБ-ит ≈ РЕБЯТА: ребята кормят кролика морковкой.", "My rabbit is white.", "Мой кролик белый.", "🐰"],
    ["bear", "медведь", "Animals", "/beə/", "noun", "БЭА ≈ БЕРЛОГА: медведь спит в берлоге.", "The bear likes honey.", "Медведь любит мёд.", "🐻"],
    ["frog", "лягушка", "Animals", "/frɒɡ/", "noun", "ФРОГ ≈ ФРАК: лягушка в зелёном фраке.", "The frog can jump.", "Лягушка умеет прыгать.", "🐸"],
    ["duck", "утка", "Animals", "/dʌk/", "noun", "ДАК — «дак-дак»: так крякает утка.", "The duck is swimming.", "Утка плавает.", "🦆"],
    ["butterfly", "бабочка", "Animals", "/ˈbʌtəflaɪ/", "noun", "BUTTER (масло) + FLY (летать): масляная летунья.", "Look at the butterfly!", "Посмотри на бабочку!", "🦋"],
    ["orange", "апельсин", "Food", "/ˈɒrɪndʒ/", "noun", "ОРИНДЖ ≈ ОРАНЖЕВЫЙ: апельсин оранжевый.", "I want an orange.", "Я хочу апельсин.", "🍊"],
    ["cake", "торт", "Food", "/keɪk/", "noun", "КЕЙК ≈ КЕКС: торт — это большой кекс.", "Mum made a birthday cake.", "Мама испекла торт на день рождения.", "🍰"],
    ["egg", "яйцо", "Food", "/eɡ/", "noun", "ЭГ ≈ «ЭГЕ-ГЕЙ!» — кричит цыплёнок из яйца.", "I eat an egg for breakfast.", "На завтрак я ем яйцо.", "🥚"],
    ["juice", "сок", "Food", "/dʒuːs/", "noun", "ДЖУС — как сок в рекламе.", "Apple juice, please.", "Яблочный сок, пожалуйста.", "🧃"],
    ["carrot", "морковь", "Food", "/ˈkærət/", "noun", "КЭР-от ≈ КАРАТЭ: кролик-каратист ест морковку.", "Rabbits like carrots.", "Кролики любят морковку.", "🥕"],
    ["cloud", "облако", "Nature", "/klaʊd/", "noun", "КЛАУД ≈ КЛАД: за облаком спрятан клад.", "There is a cloud in the sky.", "В небе облако.", "☁️"],
    ["snow", "снег", "Nature", "/snəʊ/", "noun", "СНОУ ≈ «СНОВА»: снова пошёл снег!", "We play in the snow.", "Мы играем в снегу.", "❄️"],
    ["sea", "море", "Nature", "/siː/", "noun", "СИ ≈ «СИНЕЕ»: море синее.", "I swim in the sea in summer.", "Летом я плаваю в море.", "🌊"],
    ["mountain", "гора", "Nature", "/ˈmaʊntən/", "noun", "МАУН-тен ≈ «МАУНТИН-БАЙК»: горный велосипед для гор.", "The mountain is very high.", "Гора очень высокая.", "⛰️"],
    ["bed", "кровать", "Home", "/bed/", "noun", "БЭД ≈ «БЕДА»: беда — не хочу вылезать из кровати!", "It's time for bed.", "Пора спать.", "🛏️"],
    ["door", "дверь", "Home", "/dɔː/", "noun", "ДОР ≈ ДОРОГА: за дверью начинается дорога.", "Close the door, please.", "Закрой дверь, пожалуйста.", "🚪"],
    ["window", "окно", "Home", "/ˈwɪndəʊ/", "noun", "ВИН-доу ≈ ВИНДОУС — «окна» на компьютере.", "Open the window, please.", "Открой окно, пожалуйста.", "🪟"],
    ["chair", "стул", "Home", "/tʃeə/", "noun", "ЧЕА ≈ ЧАЙ: сидим на стуле и пьём чай.", "Sit on the chair.", "Садись на стул.", "🪑"],
    ["clock", "часы", "Home", "/klɒk/", "noun", "КЛОК ≈ «КЛАК-КЛАК»: тикают часы.", "The clock is on the wall.", "Часы висят на стене.", "⏰"],
    ["phone", "телефон", "Toys & Things", "/fəʊn/", "noun", "ФОУН ≈ ФОН: телефон с красивым фоном.", "Where is my phone?", "Где мой телефон?", "📱"],
    ["robot", "робот", "Toys & Things", "/ˈrəʊbɒt/", "noun", "РОУ-бот ≈ РОБОТ — то же слово!", "My robot can dance.", "Мой робот умеет танцевать.", "🤖"],
    ["kite", "воздушный змей", "Toys & Things", "/kaɪt/", "noun", "КАЙТ ≈ КАЙТСЁРФИНГ: змей тянет по воде.", "We fly a kite in the park.", "Мы запускаем змея в парке.", "🪁"],
    ["hat", "шляпа, шапка", "Toys & Things", "/hæt/", "noun", "ХЭТ ≈ ХАТА: шапка — маленький домик для головы.", "Put on your hat, it's cold.", "Надень шапку, холодно.", "🎩"],
    ["shoes", "обувь", "Toys & Things", "/ʃuːz/", "noun", "ШУЗ ≈ ШУРШАТ: новые кроссовки шуршат.", "My shoes are new.", "У меня новые ботинки.", "👟"],
    ["grandma", "бабушка", "Family", "/ˈɡrænmɑː/", "noun", "GRAND (большая) + MA (мама): большая мама.", "My grandma makes pancakes.", "Бабушка печёт блины.", "👵"],
    ["grandpa", "дедушка", "Family", "/ˈɡrænpɑː/", "noun", "GRAND (большой) + PA (папа): большой папа.", "My grandpa tells funny stories.", "Дедушка рассказывает смешные истории.", "👴"],
    ["baby", "малыш", "Family", "/ˈbeɪbi/", "noun", "БЕЙ-би ≈ «БЕЙБИ» — малыш.", "The baby is sleeping.", "Малыш спит.", "👶"],
    ["jump", "прыгать", "Actions", "/dʒʌmp/", "verb", "ДЖАМП ≈ ДЖАМПИНГ — прыжки на батуте.", "I can jump very high.", "Я умею высоко прыгать.", "🦘"],
    ["sing", "петь", "Actions", "/sɪŋ/", "verb", "СИНГ ≈ СИНИЦА: синица поёт.", "We sing a song.", "Мы поём песню.", "🎤"],
    ["dance", "танцевать", "Actions", "/dɑːns/", "verb", "ДАНС ≈ ДЭНС-БАТЛ.", "Let's dance!", "Давай танцевать!", "💃"],
    ["draw", "рисовать", "Actions", "/drɔː/", "verb", "ДРОО ≈ ДРОВА: рисую дрова для камина.", "I like to draw animals.", "Я люблю рисовать животных.", "🎨"],
    ["cook", "готовить", "Actions", "/kʊk/", "verb", "КУК ≈ КУКЛА: кукла готовит обед.", "Dad can cook pizza.", "Папа умеет готовить пиццу.", "👩‍🍳"],
    ["cold", "холодный", "Describing", "/kəʊld/", "adjective", "КОУЛД ≈ КОЛЮЧИЙ: холодный ветер колючий.", "The water is cold.", "Вода холодная.", "🥶"],
    ["hot", "горячий, жаркий", "Describing", "/hɒt/", "adjective", "ХОТ ≈ ХОТ-ДОГ: горячий хот-дог.", "The tea is hot.", "Чай горячий.", "🔥"],
    ["funny", "смешной", "Feelings", "/ˈfʌni/", "adjective", "ФАН-ни ≈ ФАНТИК: смешной фантик.", "The clown is funny.", "Клоун смешной.", "😂"]
  );
  D.WOTD.push(
    ["meticulous", "дотошный, скрупулёзный", "She is meticulous about details."], ["procrastinate", "откладывать на потом", "Stop procrastinating and start the task."],
    ["leverage", "использовать как преимущество", "We can leverage our experience."], ["candid", "откровенный", "Thank you for your candid feedback."],
    ["streamline", "упрощать, оптимизировать", "We streamlined the hiring process."], ["benchmark", "ориентир, эталон", "This salary is above the market benchmark."],
    ["undermine", "подрывать", "Constant criticism undermines motivation."], ["thriving", "процветающий", "Tashkent has a thriving IT sector."],
    ["feasible", "осуществимый", "Is this plan feasible?"], ["prioritise", "расставлять приоритеты", "Learn to prioritise your tasks."],
    ["accountable", "ответственный, подотчётный", "Managers are accountable for results."], ["burnout", "выгорание", "Burnout is common among recruiters."],
    ["acknowledge", "признавать", "She acknowledged her mistake."], ["ambiguous", "двусмысленный", "The instructions were ambiguous."],
    ["anticipate", "предвидеть, ожидать", "We anticipate strong growth next year."], ["seamless", "плавный, без сбоев", "The onboarding was seamless."],
    ["foster", "развивать, поощрять", "We foster a culture of learning."], ["incentive", "стимул", "Bonuses are a strong incentive."],
    ["boost", "повышать, усиливать", "Exercise boosts your energy."], ["versatile", "разносторонний", "He is a versatile specialist."]
  );
  D.READING.push(
    { id: "r5", level: "A1", kid: true, title: "The Lost Kitten", text: "One morning Ali found a small grey kitten in the garden. The kitten was hungry and sad. Ali gave it some milk. Then he made a poster with a photo: 'Lost kitten! Is it yours?' The next day a girl from the next street came to Ali's house. 'That's my kitten, Luna!' she said. She was very happy. Now Ali and the girl are friends, and Ali often visits Luna.",
      q: [["Where did Ali find the kitten?", "in the garden", ["in the park", "in the garden", "at school"]], ["What did Ali give the kitten?", "milk", ["milk", "fish", "water"]], ["What is the kitten's name?", "Luna", ["Ali", "Luna", "Grey"]]] },
    { id: "r6", level: "A1", kid: true, title: "My Birthday", text: "Today is my birthday. I am nine years old! In the morning my mum and dad give me a big box. There is a red bike in it. I am so happy. In the afternoon my friends come to my house. We eat chocolate cake and drink juice. We play games and dance. My grandma gives me a book about dinosaurs. It is the best day of the year!",
      q: [["How old is the child?", "nine", ["eight", "nine", "ten"]], ["What is in the big box?", "a red bike", ["a robot", "a red bike", "a book"]], ["What does grandma give?", "a book about dinosaurs", ["a cake", "a ball", "a book about dinosaurs"]]] },
    { id: "r7", level: "A2", kid: true, title: "A Day at the Zoo", text: "Last Saturday our class went to the zoo. First we saw the lions. They were sleeping in the sun. Then we watched the monkeys. They were jumping and playing, and one monkey took a boy's hat! Everybody laughed. After lunch we visited the elephants. The zookeeper told us that elephants can drink 200 litres of water a day. It was a great trip, and I want to go again.",
      q: [["What were the lions doing?", "sleeping", ["eating", "sleeping", "running"]], ["What did the monkey take?", "a hat", ["a bag", "a hat", "a banana"]], ["How much water can elephants drink a day?", "200 litres", ["20 litres", "200 litres", "2 litres"]]] },
    { id: "r8", level: "B1", kid: false, title: "Learning a Language as an Adult", text: "Many adults believe it is too late to learn a new language. Research shows the opposite: adults often learn faster than children at the beginning, because they can understand grammar rules and use learning strategies. The main difference is time and habit. Children are surrounded by the language all day, while adults have jobs and families. That is why short daily practice works better than long lessons once a week. Experts recommend fifteen to thirty minutes a day, mixing vocabulary, listening and speaking. Mistakes are not a problem — they show that you are trying to use the language.",
      q: [["Why can adults learn fast at the beginning?", "they understand grammar rules", ["they have more free time", "they understand grammar rules", "they are surrounded by the language"]], ["What works better for adults?", "short daily practice", ["long weekly lessons", "short daily practice", "only reading"]], ["What do mistakes show?", "that you are trying", ["that you are lazy", "that you are trying", "that the method is wrong"]]] },
    { id: "r9", level: "B1", kid: false, title: "The Great Silk Road", text: "For more than a thousand years, the Silk Road connected China with the Mediterranean. Merchants carried silk, spices, paper and glass across deserts and mountains. Cities such as Samarkand and Bukhara became rich trading centres where people from many cultures met. Along with goods, ideas travelled too: science, religion, art and new technologies. Today Uzbekistan is reviving this heritage. Restored madrasahs and caravanserais attract tourists from all over the world, and modern railways once again link East and West.",
      q: [["What did the Silk Road connect?", "China and the Mediterranean", ["India and Russia", "China and the Mediterranean", "Europe and America"]], ["What else travelled along the road besides goods?", "ideas", ["animals only", "ideas", "nothing"]], ["What attracts tourists today?", "restored madrasahs and caravanserais", ["new shopping malls", "restored madrasahs and caravanserais", "beaches"]]] },
    { id: "r10", level: "B2", kid: false, title: "Feedback That Works", text: "Giving feedback is one of the most difficult tasks for a manager. Vague comments such as 'good job' or 'you need to improve' rarely change behaviour. Effective feedback is specific, timely and focused on actions rather than personality. One popular model is SBI: Situation, Behaviour, Impact. For example: 'In yesterday's client meeting (situation), you interrupted the client several times (behaviour), and he seemed frustrated (impact).' This approach reduces defensiveness because it describes facts instead of judging the person. Equally important is asking the employee for their view and agreeing on next steps together.",
      q: [["Why do vague comments rarely work?", "they don't change behaviour", ["they are too long", "they don't change behaviour", "they are too specific"]], ["What does SBI stand for?", "Situation, Behaviour, Impact", ["Skills, Budget, Ideas", "Situation, Behaviour, Impact", "Speak, Build, Improve"]], ["Why does SBI reduce defensiveness?", "it describes facts, not the person", ["it is anonymous", "it describes facts, not the person", "it is very short"]]] },
    { id: "r11", level: "C1", kid: false, title: "Trust in Remote Teams", text: "The shift to remote and hybrid work has forced organisations to rethink how trust is built. In an office, trust often grows from informal encounters — a chat by the coffee machine or a shared lunch. Remotely, those moments disappear unless they are deliberately designed. Paradoxically, managers who compensate by monitoring their employees more closely tend to erode trust rather than strengthen it. Research suggests that the most cohesive distributed teams combine clear, outcome-based goals with rituals of connection: short check-ins that are not about tasks, transparent communication about decisions, and leaders who openly admit uncertainty. Trust, in other words, is less a by-product of proximity than a result of consistent, visible behaviour.",
      q: [["Where does trust often grow in an office?", "informal encounters", ["formal reports", "informal encounters", "salary reviews"]], ["What happens when managers monitor employees more closely?", "trust erodes", ["trust grows", "trust erodes", "nothing changes"]], ["According to the text, trust results from…", "consistent, visible behaviour", ["sitting close together", "consistent, visible behaviour", "strict control"]]] }
  );
  D.ACH.push(["hard_mode", "🔥", "Сложный режим", "Победить Daily Boss в сложном режиме"]);
  D.SEED_VERSION = 2;
})(window.EQ_DATA);
