const START_DATE = new Date(2026, 6, 7);
const TOTAL_DAYS = 15;
const DAILY_WORD_LIMIT = 20;
const DAILY_SENTENCE_LIMIT = 10;
const BLANKS_PER_SENTENCE = 2;
const STORAGE_KEY = "mosa_hsfz_local_v5";
const NAME_STORAGE_KEY = "mosa_challenger_name_v3";
const DEFAULT_NAME = "Ann";
const LOCAL_API_BASE =
  window.location.protocol === "http:" && /^(localhost|127\.0\.0\.1)$/.test(window.location.hostname)
    ? `${window.location.origin}/api`
    : "";

let state = defaultState();
let currentTesterName = DEFAULT_NAME;
let persistTimer = null;
let currentWord = null;
let currentWordPool = [];
let currentSentenceTask = null;
let currentSentenceTasks = [];
let currentSentenceIndex = 0;
let wordAnswered = false;
let sentenceAnswered = false;
let sentenceSelections = {};

function defaultState() {
  return {
    days: {},
    wrongWords: {},
    wrongWordStats: {},
    errorEvents: [],
    fixedWords: {},
    totalCorrect: 0,
    totalWrong: 0,
  };
}

function defaultDayState() {
  return {
    wordIds: [],
    sentenceTaskIds: [],
    wordAttempts: 0,
    sentenceAttempts: 0,
    points: 0,
    completed: false,
  };
}

function mergeState(rawState) {
  return Object.assign(defaultState(), rawState || {});
}

function migrateDayState(rawDay) {
  const day = Object.assign(defaultDayState(), rawDay || {});
  if (!Array.isArray(day.wordIds)) day.wordIds = [];
  if (!Array.isArray(day.sentenceTaskIds)) {
    day.sentenceTaskIds = Array.isArray(day.sentenceIds) ? day.sentenceIds.map(String) : [];
  }
  return day;
}

function normalize(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[.?!,;:]/g, "");
}

function unique(values) {
  return [...new Set(values)];
}

function shuffle(values) {
  const arr = [...values];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function htmlEscape(value) {
  return String(value || "").replace(/[&<>"']/g, (ch) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  }[ch]));
}

function escapeRegex(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function loadStateFromLocalStorage() {
  try {
    const parsed = mergeState(JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"));
    Object.keys(parsed.days || {}).forEach((key) => {
      parsed.days[key] = migrateDayState(parsed.days[key]);
    });
    return parsed;
  } catch (error) {
    return defaultState();
  }
}

function loadNameFromLocalStorage() {
  return localStorage.getItem(NAME_STORAGE_KEY) || DEFAULT_NAME;
}

function saveStateToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  localStorage.setItem(NAME_STORAGE_KEY, currentTesterName);
}

async function loadPersistedSession() {
  if (!LOCAL_API_BASE) {
    state = loadStateFromLocalStorage();
    currentTesterName = loadNameFromLocalStorage();
    return;
  }

  try {
    const response = await fetch(`${LOCAL_API_BASE}/session`);
    if (!response.ok) throw new Error(`session load failed: ${response.status}`);
    const payload = await response.json();
    state = mergeState(payload.state);
    Object.keys(state.days || {}).forEach((key) => {
      state.days[key] = migrateDayState(state.days[key]);
    });
    currentTesterName = payload.name || DEFAULT_NAME;
    saveStateToLocalStorage();
  } catch (error) {
    state = loadStateFromLocalStorage();
    currentTesterName = loadNameFromLocalStorage();
  }
}

function schedulePersist() {
  if (!LOCAL_API_BASE) return;
  clearTimeout(persistTimer);
  persistTimer = setTimeout(() => {
    persistSession().catch(() => {});
  }, 200);
}

async function persistSession() {
  if (!LOCAL_API_BASE) return;
  await fetch(`${LOCAL_API_BASE}/session`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: currentTesterName,
      state,
      updatedAt: new Date().toISOString(),
    }),
  });
}

function saveState() {
  saveStateToLocalStorage();
  updateDashboard();
  schedulePersist();
}

function dayIndex() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = Math.floor((today - START_DATE) / 86400000) + 1;
  return Math.max(1, Math.min(TOTAL_DAYS, diff));
}

function dayState(day = dayIndex()) {
  state.days[day] = migrateDayState(state.days[day]);
  return state.days[day];
}

function wordRangeForDay(day) {
  const start = (day - 1) * DAILY_WORD_LIMIT + 1;
  return [start, start + DAILY_WORD_LIMIT - 1];
}

function sentenceRangeForDay(day) {
  const start = (day - 1) * DAILY_SENTENCE_LIMIT + 1;
  return [start, start + DAILY_SENTENCE_LIMIT - 1];
}

function speak(text, rate = 1) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = "en-US";
  utterance.rate = rate;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

function speakerButton(text, disabled = false) {
  return `<button class="mini-speaker" type="button" data-speak="${htmlEscape(text)}" ${disabled ? "disabled" : ""} onclick="speak(this.dataset.speak)">🔊</button>`;
}

function setFeedback(id, text, cls = "") {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = `feedback ${cls}`.trim();
  el.textContent = text;
}

function lockButton(id) {
  const el = document.getElementById(id);
  if (el) el.disabled = true;
}

function unlockButton(id) {
  const el = document.getElementById(id);
  if (el) el.disabled = false;
}

function cleanWord(word) {
  return {
    no: Number(word?.no || 0),
    en: String(word?.en || ""),
    zh: String(word?.zh || ""),
    form: String(word?.form || ""),
  };
}

function wordsForCurrentDay() {
  const [start, end] = wordRangeForDay(dayIndex());
  return (WORDS || [])
    .filter((word) => word.no >= start && word.no <= end)
    .map(cleanWord);
}

function unresolvedWordPool() {
  const ds = dayState();
  return currentWordPool.filter((word) => !ds.wordIds.includes(word.no));
}

function sentenceTaskId(day, slot) {
  return `${day}-${slot}`;
}

function pickSentence(day, slot) {
  const sentenceStart = (day - 1) * 4;
  const daySentencePool = (SENTENCES || []).slice(sentenceStart, sentenceStart + 4);
  const fallbackPool = daySentencePool.length ? daySentencePool : SENTENCES || [];
  return fallbackPool[slot % fallbackPool.length];
}

function getSentenceWordPool(day) {
  return wordsForCurrentDay().map((word) => normalize(word.en));
}

function sentenceContainsWord(sentenceText, word) {
  const pattern = new RegExp(`\\b${escapeRegex(word)}\\b`, "i");
  return pattern.test(sentenceText);
}

function createSentenceTask(day, slot) {
  const sentence = pickSentence(day, slot);
  const sentenceWords = unique((sentence.words || []).map(normalize));
  const dayWords = getSentenceWordPool(day);
  const visibleWords = sentenceWords.filter(
    (word) => dayWords.includes(word) && sentenceContainsWord(sentence.en, word)
  );
  const fallbackVisibleWords = dayWords.filter((word) => sentenceContainsWord(sentence.en, word));
  const candidateWords =
    visibleWords.length >= BLANKS_PER_SENTENCE ? visibleWords : unique([...visibleWords, ...fallbackVisibleWords]);
  const shuffled = shuffle(candidateWords);
  const blankWords = shuffled.slice(0, BLANKS_PER_SENTENCE);

  while (blankWords.length < BLANKS_PER_SENTENCE && shuffled.length) {
    blankWords.push(shuffled[blankWords.length % shuffled.length]);
  }

  return {
    id: sentenceTaskId(day, slot),
    slot,
    sentence,
    blankWords,
  };
}

function sentenceTasksForCurrentDay() {
  const day = dayIndex();
  return Array.from({ length: DAILY_SENTENCE_LIMIT }, (_, slot) => createSentenceTask(day, slot));
}

function remainingSentenceTasks() {
  const doneIds = dayState().sentenceTaskIds;
  return currentSentenceTasks.filter((task) => !doneIds.includes(task.id));
}

function replaceBlank(text, target, blankIndex) {
  const label = String.fromCharCode(65 + blankIndex);
  const pattern = new RegExp(`\\b${escapeRegex(target)}\\b`, "i");
  return text.replace(
    pattern,
    `<span class="sentence-blank" data-blank="${blankIndex}" aria-label="blank ${label}">${label}</span>`
  );
}

function buildSentencePrompt(sentence, blankWords) {
  let output = sentence.en;
  blankWords.forEach((word, index) => {
    output = replaceBlank(output, word, index);
  });
  return output;
}

function getSentenceChoices(correctWord, blankWords) {
  const dayWords = wordsForCurrentDay().map((word) => normalize(word.en));
  const distractors = shuffle(
    dayWords.filter((word) => word !== normalize(correctWord) && !blankWords.includes(word))
  ).slice(0, 3);
  return shuffle([normalize(correctWord), ...distractors]);
}

function detectTense(sentenceText) {
  const text = String(sentenceText || "").toLowerCase();
  if (/\b(has|have)\s+\w+ed\b/.test(text) || /\bhas been\b|\bhave been\b/.test(text)) return "現在完成式";
  if (/\bwill\b/.test(text)) return "未來式";
  if (/\b(is|am|are)\b/.test(text) && /\b\w+ing\b/.test(text)) return "現在進行式";
  if (/\b(was|were|did|had)\b/.test(text) || /\b\w+ed\b/.test(text)) return "過去式";
  return "現在式或一般敘述句";
}

function buildSentenceExplanation(task, wrongCount) {
  const sentence = task.sentence || {};
  const tense = detectTense(sentence.en);
  const blankLabels = (task.blankWords || []).map((_, index) => String.fromCharCode(65 + index)).join("、");
  const words = sentence.words || [];
  const subjectWord = words[0] || "這個主詞";
  const objectWord = words[1] || "這個受詞";

  const grammarLine1 = /helps/i.test(sentence.en)
    ? `${subjectWord} 是主詞單數，所以 help 這個動詞要變成 helps。`
    : /did not/i.test(sentence.en)
      ? "句中有 did not，所以後面的動詞會回到原形。"
      : "先找出主詞和動詞，再看動詞是否需要跟著主詞做變化。";

  const grammarLine2 = words.length > 1
    ? `${objectWord} 在句子裡和前後文有搭配關係，作答時要注意它在句中的角色與單複數意思。`
    : "再看句中其他字和空格的搭配，判斷應填入的詞性與意思。";

  const grammarLine3 = blankLabels
    ? `空格 ${blankLabels} 要放能和前後文自然連接的字，不能只看單字本身意思。`
    : "";

  const tenseLine = tense === "現在式或一般敘述句"
    ? "這一句主要時態是 現在式或一般敘述句。因為句中的主要動詞 helps 是現在式，用來描述平常會發生的情況、一般事實，或習慣性的行為。看到這種句子時，可以先找主詞是誰，再看動詞有沒有加 s，最後再用上下文確認整句意思。"
    : tense === "過去式"
      ? "這一句主要時態是 過去式，因為句中的主要動詞有過去式線索。作答時先看動詞型態，再看上下文意思。"
      : `這一句主要時態是 ${tense}，作答時先看動詞型態，再看上下文意思。`;

  return [
    `這題錯了 ${wrongCount} 格，請先看正確答案，再回頭讀完整句子。`,
    "",
    "文法說明：",
    `1. ${grammarLine1}`,
    `2. ${grammarLine2}`,
    grammarLine3 ? `3. ${grammarLine3}` : "",
    "",
    "時態說明：",
    tenseLine,
  ].filter(Boolean).join("\n");
}

function recordWrongWord(word, source, extra = {}) {
  const key = normalize(word.en);
  const existing = state.wrongWordStats[key] || {
    wordNo: word.no || null,
    en: word.en,
    zh: word.zh || "",
    count: 0,
    sources: {},
    lastWrongAt: "",
  };

  existing.count += 1;
  existing.sources[source] = (existing.sources[source] || 0) + 1;
  existing.lastWrongAt = new Date().toISOString();
  state.wrongWordStats[key] = existing;

  state.errorEvents.unshift({
    at: existing.lastWrongAt,
    tester: currentTesterName,
    day: dayIndex(),
    source,
    wordNo: existing.wordNo,
    en: existing.en,
    zh: existing.zh,
    ...extra,
  });
  state.errorEvents = state.errorEvents.slice(0, 200);
}

function buildCalendar() {
  const cal = document.getElementById("calendar");
  if (!cal) return;
  cal.innerHTML = "";

  ["日", "一", "二", "三", "四", "五", "六"].forEach((weekday) => {
    const el = document.createElement("div");
    el.className = "day-name";
    el.textContent = weekday;
    cal.appendChild(el);
  });

  const startWeekday = START_DATE.getDay();
  for (let i = 0; i < startWeekday; i += 1) {
    const spacer = document.createElement("div");
    spacer.className = "day day-empty";
    spacer.setAttribute("aria-hidden", "true");
    cal.appendChild(spacer);
  }

  const currentDay = dayIndex();
  for (let day = 1; day <= TOTAL_DAYS; day += 1) {
    const date = new Date(START_DATE);
    date.setDate(START_DATE.getDate() + day - 1);
    const ds = dayState(day);
    const [wordStart, wordEnd] = wordRangeForDay(day);
    const [sentenceStart, sentenceEnd] = sentenceRangeForDay(day);

    const el = document.createElement("div");
    el.className = `day${ds.completed ? " done" : ""}${day === currentDay && !ds.completed ? " active" : ""}`;
    el.innerHTML = `
      <div class="date"><span>7/${date.getDate()}</span><span>Day ${day}</span></div>
      <div class="task">${wordStart}-${wordEnd} 字<br>句子 ${sentenceStart}-${sentenceEnd}</div>
      <div class="check">${ds.completed ? "✓" : ""}</div>
    `;
    cal.appendChild(el);
  }
}

function getWordChoices(word) {
  const pool = currentWordPool.filter((item) => item.no !== word.no);
  return shuffle([word, ...shuffle(pool).slice(0, 3)]);
}

function renderWord() {
  const ds = dayState();
  if (!currentWordPool.length) currentWordPool = shuffle(wordsForCurrentDay());

  const remainingWords = unresolvedWordPool();
  wordAnswered = false;

  if (!remainingWords.length) {
    currentWord = null;
    document.getElementById("wordMeta").textContent = `Word ${DAILY_WORD_LIMIT}/${DAILY_WORD_LIMIT}`;
    document.getElementById("wordPrompt").textContent = "今日完成";
    document.getElementById("wordForm").textContent = "單字 20/20";
    document.getElementById("wordOptions").innerHTML = "";
    document.getElementById("wordSpeakBtn").onclick = null;
    setFeedback("wordFeedback", "今天的 20 個單字都完成了。", "ok");
    lockButton("nextWordBtn");
    return;
  }

  currentWord = remainingWords[0];
  document.getElementById("wordMeta").textContent = `Word ${ds.wordIds.length + 1}/${DAILY_WORD_LIMIT}`;
  document.getElementById("wordPrompt").textContent = currentWord.en;
  document.getElementById("wordForm").textContent = currentWord.form || "";
  document.getElementById("wordSpeakBtn").onclick = () => speak(currentWord.en);

  const choices = getWordChoices(currentWord);
  const box = document.getElementById("wordOptions");
  box.innerHTML = choices
    .map(
      (choice, index) =>
        `<button class="option" type="button" data-en="${htmlEscape(choice.en)}"><span class="option-main"><span class="opt-num">${index + 1}</span><span class="option-word">${htmlEscape(choice.zh)}</span></span></button>`
    )
    .join("");

  box.querySelectorAll(".option").forEach((btn) => {
    btn.onclick = () => checkWord(btn, btn.dataset.en);
  });

  setFeedback("wordFeedback", "選出正確中文。");
  lockButton("nextWordBtn");
}

function checkWord(button, chosen) {
  if (wordAnswered || !currentWord) return;
  wordAnswered = true;

  document.querySelectorAll("#wordOptions .option").forEach((option) => {
    option.disabled = true;
  });

  const ok = chosen === currentWord.en;
  const ds = dayState();
  ds.wordAttempts += 1;

  if (ok) {
    if (!ds.wordIds.includes(currentWord.no)) ds.wordIds.push(currentWord.no);
    state.totalCorrect += 1;
    button.classList.add("correct");
    setFeedback("wordFeedback", `答對了：${currentWord.en} = ${currentWord.zh}`, "ok");
  } else {
    state.wrongWords[currentWord.no] = (state.wrongWords[currentWord.no] || 0) + 1;
    state.totalWrong += 1;
    button.classList.add("wrong");
    recordWrongWord(currentWord, "word-challenge");
    setFeedback("wordFeedback", `答錯了：${currentWord.en} = ${currentWord.zh}`, "bad");
  }

  document.querySelectorAll("#wordOptions .option").forEach((option) => {
    if (option.dataset.en === currentWord.en) option.classList.add("correct");
  });

  markDayIfComplete();
  saveState();
  unlockButton("nextWordBtn");
}

function nextWord() {
  const remainingWords = unresolvedWordPool();
  if (!remainingWords.length) {
    renderWord();
    return;
  }
  currentWordPool = shuffle(remainingWords);
  renderWord();
}

function renderSentenceOptionGrid() {
  const box = document.getElementById("sentenceOptions");
  box.innerHTML = currentSentenceTask.blankWords
    .map((correctWord, blankIndex) => {
      const label = String.fromCharCode(65 + blankIndex);
      const choices = getSentenceChoices(correctWord, currentSentenceTask.blankWords);
      const optionsHtml = choices
        .map(
          (choice, choiceIndex) =>
            `<div class="sentence-option-row"><button class="option sentence-choice" type="button" data-group="${blankIndex}" data-word="${htmlEscape(choice)}"><span class="option-main"><span class="opt-num">${choiceIndex + 1}</span><span class="option-word">${htmlEscape(choice)}</span></span></button>${speakerButton(choice)}</div>`
        )
        .join("");
      return `<div class="sentence-option-group" data-group="${blankIndex}"><div class="sentence-option-title">${label}</div>${optionsHtml}</div>`;
    })
    .join("");

  box.querySelectorAll(".sentence-choice").forEach((btn) => {
    btn.onclick = (event) => {
      if (event.target.closest(".mini-speaker")) return;
      selectSentenceChoice(btn);
    };
  });
}

function renderSentence() {
  const remainingTasks = remainingSentenceTasks();
  sentenceSelections = {};
  sentenceAnswered = false;

  if (!remainingTasks.length) {
    currentSentenceTask = null;
    document.getElementById("sentMeta").textContent = `Sentence ${DAILY_SENTENCE_LIMIT}/${DAILY_SENTENCE_LIMIT}`;
    document.getElementById("sentPrompt").innerHTML = "<strong>今日句子完成</strong>";
    document.getElementById("sentenceOptions").innerHTML = "";
    document.getElementById("sentenceExplainBlock").classList.add("answer-explain-hidden");
    document.getElementById("sentenceExplainBlock").classList.remove("warning");
    document.getElementById("sentWords").innerHTML = "";
    document.getElementById("sentZh").textContent = "";
    document.getElementById("sentZh").classList.add("sent-zh-hidden");
    document.getElementById("sentWords").classList.add("sent-words-hidden");
    document.getElementById("sentGrammar").textContent = "";
    document.getElementById("sentGrammar").classList.add("sent-grammar-hidden");
    setFeedback("sentenceFeedback", "今天的 10 個句子都完成了。", "ok");
    lockButton("nextSentenceBtn");
    document.getElementById("blankSpeakBtn").disabled = true;
    document.getElementById("sentenceSpeakBtn").disabled = true;
    return;
  }

  currentSentenceIndex %= remainingTasks.length;
  currentSentenceTask = remainingTasks[currentSentenceIndex];
  const { sentence, blankWords, slot } = currentSentenceTask;

  document.getElementById("sentMeta").textContent = `Sentence ${slot + 1}/${DAILY_SENTENCE_LIMIT}`;
  document.getElementById("sentPrompt").innerHTML = buildSentencePrompt(sentence, blankWords);
  document.getElementById("sentenceExplainBlock").classList.add("answer-explain-hidden");
  document.getElementById("sentenceExplainBlock").classList.remove("warning");
  document.getElementById("sentZh").textContent = "";
  document.getElementById("sentZh").classList.add("sent-zh-hidden");
  document.getElementById("sentWords").innerHTML = sentence.words
    .map((word) => `<span class="chip">${htmlEscape(word)} ${speakerButton(word)}</span>`)
    .join("");
  document.getElementById("sentWords").classList.add("sent-words-hidden");
  document.getElementById("sentGrammar").textContent = "";
  document.getElementById("sentGrammar").classList.add("sent-grammar-hidden");

  renderSentenceOptionGrid();

  setFeedback("sentenceFeedback", "請完成 A、B 兩個空格。");
  lockButton("nextSentenceBtn");
  document.getElementById("blankSpeakBtn").onclick = () => speak(blankWords.join(" "), 0.9);
  document.getElementById("sentenceSpeakBtn").onclick = () => speak(sentence.en, 0.9);
  document.getElementById("blankSpeakBtn").disabled = true;
  document.getElementById("sentenceSpeakBtn").disabled = true;
}

function selectSentenceChoice(button) {
  if (sentenceAnswered) return;
  const group = Number(button.dataset.group);
  sentenceSelections[group] = normalize(button.dataset.word);

  document.querySelectorAll(`.sentence-choice[data-group="${group}"]`).forEach((choice) => {
    choice.classList.remove("selected");
  });
  button.classList.add("selected");

  if (Object.keys(sentenceSelections).length === BLANKS_PER_SENTENCE) {
    checkSentence();
  }
}

function setSentenceAudioEnabled(enabled) {
  document.querySelectorAll("#sentWords .mini-speaker").forEach((btn) => {
    btn.disabled = !enabled;
  });
  document.querySelectorAll("#sentenceOptions .mini-speaker").forEach((btn) => {
    btn.disabled = false;
  });
  document.getElementById("blankSpeakBtn").disabled = !enabled;
  document.getElementById("sentenceSpeakBtn").disabled = !enabled;
}

function checkSentence() {
  if (sentenceAnswered || !currentSentenceTask) return;
  sentenceAnswered = true;

  const ds = dayState();
  ds.sentenceAttempts += 1;

  let wrongCount = 0;
  currentSentenceTask.blankWords.forEach((correctWord, blankIndex) => {
    const expected = normalize(correctWord);
    const chosen = sentenceSelections[blankIndex];

    document.querySelectorAll(`.sentence-choice[data-group="${blankIndex}"]`).forEach((option) => {
      option.disabled = true;
      option.classList.add("locked");
      if (normalize(option.dataset.word) === expected) option.classList.add("correct");
    });

    if (chosen !== expected) {
      wrongCount += 1;
      const matchedWord = cleanWord((WORDS || []).find((word) => normalize(word.en) === expected) || { en: correctWord });
      recordWrongWord(matchedWord, "sentence-challenge", { sentenceNo: currentSentenceTask.sentence.no });
    }
  });

  if (wrongCount === 0) {
    ds.sentenceTaskIds.push(currentSentenceTask.id);
    state.totalCorrect += 1;
    setFeedback("sentenceFeedback", "答對了，A、B 兩格都正確。", "ok");
    document.getElementById("sentGrammar").textContent = "";
    document.getElementById("sentGrammar").classList.add("sent-grammar-hidden");
    document.getElementById("sentenceExplainBlock").classList.remove("warning");
  } else {
    state.totalWrong += 1;
    setFeedback("sentenceFeedback", `這題錯了 ${wrongCount} 格，請看正確答案後再下一題。`, "bad");
    document.getElementById("sentGrammar").textContent = buildSentenceExplanation(currentSentenceTask, wrongCount);
    document.getElementById("sentGrammar").classList.remove("sent-grammar-hidden");
    document.getElementById("sentenceExplainBlock").classList.add("warning");
  }

  document.getElementById("sentenceExplainBlock").classList.remove("answer-explain-hidden");
  document.getElementById("sentWords").classList.remove("sent-words-hidden");
  document.getElementById("sentZh").textContent = currentSentenceTask.sentence.zh || "";
  document.getElementById("sentZh").classList.remove("sent-zh-hidden");

  setSentenceAudioEnabled(true);
  markDayIfComplete();
  saveState();
  unlockButton("nextSentenceBtn");
}

function nextSentence() {
  const remainingTasks = remainingSentenceTasks();
  if (!remainingTasks.length) {
    renderSentence();
    return;
  }
  currentSentenceIndex = (currentSentenceIndex + 1) % remainingTasks.length;
  renderSentence();
}

function completedDays() {
  return Object.entries(state.days)
    .filter(([, value]) => migrateDayState(value).completed)
    .map(([key]) => Number(key));
}

function markDayIfComplete() {
  const ds = dayState();
  const wordsDone = ds.wordIds.length >= DAILY_WORD_LIMIT;
  const sentencesDone = ds.sentenceTaskIds.length >= DAILY_SENTENCE_LIMIT;
  ds.completed = wordsDone && sentencesDone;
  if (ds.completed) ds.points = Math.max(ds.points || 0, 10);
}

function updateDashboard() {
  buildCalendar();

  let totalWords = 0;
  let totalSentences = 0;
  Object.values(state.days).forEach((value) => {
    const day = migrateDayState(value);
    totalWords += day.wordIds.length;
    totalSentences += day.sentenceTaskIds.length;
  });

  const fixed = Object.keys(state.wrongWordStats || {}).length;
  const rewardPoints = completedDays().slice(-5).length * 10;
  const attempts = (state.totalCorrect || 0) + (state.totalWrong || 0);
  const accuracy = attempts ? Math.round(((state.totalCorrect || 0) / attempts) * 100) : 0;
  const today = dayState();
  const [wordStart, wordEnd] = wordRangeForDay(dayIndex());

  const setText = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };

  const setWidth = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.style.width = value;
  };

  setWidth("levelBar", `${Math.min((totalWords / 300) * 100, 100)}%`);
  setWidth("wordBar", `${Math.min((totalWords / 300) * 100, 100)}%`);
  setWidth("fixBar", `${Math.min((fixed / 10) * 100, 100)}%`);

  setText("rewardText", `${Math.min(rewardPoints, 50)} / 50 元`);
  setText("wordNote", `${totalWords} / 300 字`);
  setText("fixNote", `${Math.min(fixed, 10)} / 10 字`);
  setText("todayWordsRange", `${wordStart}-${wordEnd}`);
  setText("todayWordNote", `今日 ${today.wordIds.length} / ${DAILY_WORD_LIMIT}`);
  setText("xpNow", Math.min(totalWords, 300));
  setText("statDays", completedDays().length);
  setText("statScore", (totalWords * 5 + totalSentences * 20).toLocaleString("en-US"));
  setText("statAccuracy", accuracy);
  setText("streakDays", completedDays().length);
}

function resetRuntimeCollections() {
  currentWord = null;
  currentWordPool = shuffle(wordsForCurrentDay());
  currentSentenceTasks = sentenceTasksForCurrentDay();
  currentSentenceIndex = 0;
  currentSentenceTask = null;
  wordAnswered = false;
  sentenceAnswered = false;
  sentenceSelections = {};
}

async function init() {
  await loadPersistedSession();
  resetRuntimeCollections();

  document.getElementById("nextWordBtn").onclick = () => {
    if (!document.getElementById("nextWordBtn").disabled) nextWord();
  };
  document.getElementById("nextSentenceBtn").onclick = () => {
    if (!document.getElementById("nextSentenceBtn").disabled) nextSentence();
  };

  const nameInput = document.getElementById("challengerName");
  nameInput.value = currentTesterName;
  nameInput.addEventListener("input", () => {
    currentTesterName = nameInput.value || DEFAULT_NAME;
    saveStateToLocalStorage();
    schedulePersist();
  });

  updateDashboard();
  renderWord();
  renderSentence();
}

document.addEventListener("DOMContentLoaded", () => {
  init().catch(() => {
    state = loadStateFromLocalStorage();
    currentTesterName = loadNameFromLocalStorage();
    resetRuntimeCollections();
    updateDashboard();
    renderWord();
    renderSentence();
  });
});
