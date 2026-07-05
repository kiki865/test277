const START_DATE = new Date(2026, 6, 6); // 2026/07/06
const TOTAL_DAYS = 15;
const STORAGE_KEY = 'mosa_hsfz_github_v3_20260706';
const WORD_FALLBACK = {
  although: { zh: '雖然', form: 'conj.' },
  central: { zh: '中央的；主要的', form: 'adj.' },
  square: { zh: '廣場；正方形的', form: 'n./adj.' },
  happen: { zh: '發生', form: 'v.' },
};

let state = loadState();
let currentWord = null;
let currentSentence = null;
let currentBlank = '';
let wordIndex = 13;
let sentenceIndex = 2;
let wordAnswered = false;
let sentenceAnswered = false;

function allWords() {
  return typeof WORDS !== 'undefined' ? WORDS : [];
}

function allSentences() {
  return typeof SENTENCES !== 'undefined' ? SENTENCES : [];
}

function defaultState() {
  return { days: {}, wrongWords: {}, fixedWords: {}, totalCorrect: 0, totalWrong: 0 };
}

function loadState() {
  try {
    return Object.assign(defaultState(), JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}'));
  } catch (e) {
    return defaultState();
  }
}

function saveState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  updateDashboard();
}

function dayIndex() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const diff = Math.floor((today - START_DATE) / 86400000) + 1;
  return Math.max(1, Math.min(TOTAL_DAYS, diff));
}

function dayState(d = dayIndex()) {
  state.days[d] ||= { wordIds: [], sentenceIds: [], wordAttempts: 0, sentenceAttempts: 0, points: 0, completed: false };
  return state.days[d];
}

function wordRangeForDay(d) {
  const start = (d - 1) * 20 + 1;
  return [start, start + 19];
}

function sentenceRangeForDay(d) {
  const start = (d - 1) * 4 + 1;
  return [start, start + 3];
}

function htmlEscape(value) {
  return String(value || '').replace(/[&<>"']/g, (ch) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[ch]));
}

function normalize(value) {
  return String(value || '').trim().toLowerCase().replace(/[.?!,;:]/g, '');
}

function shuffle(values) {
  const arr = [...values];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function speak(text, rate = 1) {
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'en-US';
  utterance.rate = rate;
  speechSynthesis.cancel();
  speechSynthesis.speak(utterance);
}

function speakerButton(text, disabled = false) {
  return `<button class="mini-speaker" type="button" data-speak="${htmlEscape(text)}" ${disabled ? 'disabled' : ''} onclick="speak(this.dataset.speak)">🔊</button>`;
}

function setFeedback(id, text, cls = '') {
  const el = document.getElementById(id);
  if (el) {
    el.className = `feedback ${cls}`;
    el.textContent = text;
  }
}

function lockNextButton(id) {
  const btn = document.getElementById(id);
  if (btn) btn.disabled = true;
}

function unlockNextButton(id) {
  const btn = document.getElementById(id);
  if (btn) btn.disabled = false;
}

function buildCalendar() {
  const cal = document.getElementById('calendar');
  if (!cal) return;
  cal.innerHTML = '';

  ['日', '一', '二', '三', '四', '五', '六'].forEach((w) => {
    const el = document.createElement('div');
    el.className = 'day-name';
    el.textContent = w;
    cal.appendChild(el);
  });

  // 2026/07/06 是星期一，補一格空白讓 Day 1 對齊星期一。
  for (let i = 0; i < START_DATE.getDay(); i++) {
    const spacer = document.createElement('div');
    spacer.className = 'calendar-spacer';
    spacer.setAttribute('aria-hidden', 'true');
    spacer.style.visibility = 'hidden';
    spacer.style.minHeight = '58px';
    cal.appendChild(spacer);
  }

  const current = dayIndex();
  for (let i = 1; i <= TOTAL_DAYS; i++) {
    const date = new Date(START_DATE);
    date.setDate(START_DATE.getDate() + i - 1);
    const ds = state.days[i] || { wordIds: [], sentenceIds: [], completed: false };
    const [wa, wb] = wordRangeForDay(i);
    const [sa, sb] = sentenceRangeForDay(i);
    const el = document.createElement('div');
    el.className = `day${ds.completed ? ' done' : ''}${i === current && !ds.completed ? ' active' : ''}`;
    el.innerHTML = `<div class="date"><span>${date.getMonth() + 1}/${date.getDate()}</span><span>Day ${i}</span></div><div class="task">${wa}-${wb} 字<br>句子 ${sa}-${sb}</div><div class="check">${ds.completed ? '✓' : ''}</div>`;
    cal.appendChild(el);
  }
}

function cleanWord(word) {
  const fallback = WORD_FALLBACK[word?.en] || {};
  return { ...word, zh: fallback.zh || word?.zh || '', form: fallback.form || word?.form || '' };
}

function getWordChoices(word) {
  if (word.no === 14) {
    return ['although', 'central', 'square', 'happen']
      .map((en) => cleanWord(allWords().find((w) => w.en === en) || { no: 0, en }))
      .filter(Boolean);
  }
  const pool = allWords().filter((w) => w.no !== word.no);
  return shuffle([word, ...shuffle(pool).slice(0, 3)]).map(cleanWord);
}

function renderWord() {
  currentWord = cleanWord(allWords()[wordIndex] || { no: 14, en: 'although', form: 'conj.', zh: '雖然' });
  wordAnswered = false;
  document.getElementById('wordMeta').textContent = `Word #${currentWord.no}`;
  document.getElementById('wordPrompt').textContent = currentWord.en;
  document.getElementById('wordForm').textContent = currentWord.form;
  document.getElementById('wordSpeakBtn').onclick = () => speak(currentWord.en);
  const box = document.getElementById('wordOptions');
  const choices = getWordChoices(currentWord);
  box.innerHTML = choices.map((choice, i) => `<button class="option" data-en="${htmlEscape(choice.en)}"><span class="opt-num">${i + 1}</span>${htmlEscape(choice.zh)}</button>`).join('');
  box.querySelectorAll('.option').forEach((btn) => {
    btn.onclick = () => checkWord(btn, btn.dataset.en);
  });
  setFeedback('wordFeedback', '選出正確中文。');
  lockNextButton('nextWordBtn');
}

function checkWord(btn, chosen) {
  if (wordAnswered) return;
  wordAnswered = true;
  document.querySelectorAll('#wordOptions .option').forEach((option) => { option.disabled = true; });
  const ok = chosen === currentWord.en;
  btn.classList.add(ok ? 'correct' : 'wrong');
  document.querySelectorAll('#wordOptions .option').forEach((option) => {
    if (option.dataset.en === currentWord.en) option.classList.add('correct');
  });

  const ds = dayState();
  ds.wordAttempts++;
  if (ok) {
    if (!ds.wordIds.includes(currentWord.no)) ds.wordIds.push(currentWord.no);
    state.totalCorrect++;
    setFeedback('wordFeedback', `正確！${currentWord.en} = ${currentWord.zh}`, 'ok');
  } else {
    state.wrongWords[currentWord.no] = (state.wrongWords[currentWord.no] || 0) + 1;
    state.totalWrong++;
    setFeedback('wordFeedback', `再修復一次：${currentWord.en} = ${currentWord.zh}`, 'bad');
  }
  markDayIfComplete();
  saveState();
  unlockNextButton('nextWordBtn');
}

function nextWord() {
  const words = allWords();
  wordIndex = (wordIndex + 1) % (words.length || 1);
  renderWord();
}

function sentenceFallback(sentence) {
  if (sentence?.no === 3) {
    return {
      ...sentence,
      en: 'Although many people were against the plan, the class agreed to allow a small amount of time for discussion.',
      zh: '雖然許多人反對這個計畫，班上仍同意留一點時間討論。',
      words: ['although', 'against', 'allow', 'amount', 'agree'],
    };
  }
  return sentence;
}

function renderSentence() {
  currentSentence = sentenceFallback(allSentences()[sentenceIndex] || {
    no: 3,
    en: 'Although many people were against the plan, the class agreed to allow a small amount of time for discussion.',
    zh: '',
    words: ['although'],
  });
  sentenceAnswered = false;
  currentBlank = currentSentence.no === 3 ? 'Although' : currentSentence.words[0];
  const prompt = currentSentence.en.replace(new RegExp(currentBlank, 'i'), '<span class="sentence-blank" aria-label="blank">____</span>');
  document.getElementById('sentMeta').textContent = `Sentence #${currentSentence.no}`;
  document.getElementById('sentPrompt').innerHTML = prompt;
  document.getElementById('sentZh').textContent = '';
  document.getElementById('sentZh').classList.add('sent-zh-hidden');
  document.getElementById('sentGrammar').textContent = '';
  document.getElementById('sentGrammar').classList.add('sent-grammar-hidden');
  document.getElementById('sentWords').innerHTML = currentSentence.words.map((w) => `<span class="chip">${htmlEscape(w)} ${speakerButton(w, false)}</span>`).join('');
  document.getElementById('sentWords').classList.add('sent-words-hidden');
  renderSentenceOptions();
  lockNextButton('nextSentenceBtn');
  document.getElementById('blankSpeakBtn').disabled = true;
  document.getElementById('blankSpeakBtn').onclick = () => speak(currentBlank);
  document.getElementById('sentenceSpeakBtn').disabled = true;
  document.getElementById('sentenceSpeakBtn').onclick = () => speak(currentSentence.en, 0.9);
  setSentenceAudioEnabled(false);
  setFeedback('sentenceFeedback', '選出空格中的正確單字。');
}

function renderSentenceOptions() {
  const choices = currentSentence.no === 3 ? ['schedule', 'double', 'similar', 'although'] : shuffle([currentBlank, ...shuffle(allWords().map((w) => w.en).filter((w) => !currentSentence.words.includes(w))).slice(0, 3)]);
  const box = document.getElementById('sentenceOptions');
  box.innerHTML = choices.map((choice, i) => `<div class="option sentence-choice" role="button" tabindex="0" data-word="${htmlEscape(choice)}"><span class="opt-num">${i + 1}</span><span class="option-word">${htmlEscape(choice)}</span>${speakerButton(choice, false)}</div>`).join('');
  box.querySelectorAll('.option').forEach((btn) => {
    btn.onclick = (ev) => {
      if (ev.target.closest('.mini-speaker')) return;
      checkSentence(btn, btn.dataset.word);
    };
    btn.onkeydown = (ev) => {
      if (ev.key === 'Enter' || ev.key === ' ') {
        ev.preventDefault();
        checkSentence(btn, btn.dataset.word);
      }
    };
  });
}

function setSentenceAudioEnabled(enabled) {
  document.querySelectorAll('#sentWords .mini-speaker').forEach((btn) => { btn.disabled = !enabled; });
  document.querySelectorAll('#sentenceOptions .mini-speaker').forEach((btn) => { btn.disabled = false; });
  document.getElementById('blankSpeakBtn').disabled = !enabled;
  document.getElementById('sentenceSpeakBtn').disabled = !enabled;
}

function checkSentence(btn, chosen) {
  if (sentenceAnswered) return;
  sentenceAnswered = true;
  document.querySelectorAll('#sentenceOptions .option').forEach((option) => option.classList.add('locked'));
  const ok = normalize(chosen) === normalize(currentBlank);
  btn.classList.add(ok ? 'correct' : 'wrong');
  document.querySelectorAll('#sentenceOptions .option').forEach((option) => {
    if (normalize(option.dataset.word) === normalize(currentBlank)) option.classList.add('correct');
  });

  const ds = dayState();
  ds.sentenceAttempts++;
  if (ok) {
    if (!ds.sentenceIds.includes(currentSentence.no)) ds.sentenceIds.push(currentSentence.no);
    state.totalCorrect++;
    setFeedback('sentenceFeedback', `正確！${currentBlank}`, 'ok');
  } else {
    state.totalWrong++;
    setFeedback('sentenceFeedback', `再想一次，正確答案是 ${currentBlank}`, 'bad');
  }

  document.getElementById('sentWords').classList.remove('sent-words-hidden');
  document.getElementById('sentZh').textContent = currentSentence.zh;
  document.getElementById('sentZh').classList.remove('sent-zh-hidden');
  document.getElementById('sentGrammar').textContent = 'Although 放在句首引導讓步子句，後面主句仍要完整表達結果。';
  document.getElementById('sentGrammar').classList.remove('sent-grammar-hidden');
  setSentenceAudioEnabled(true);
  markDayIfComplete();
  saveState();
  unlockNextButton('nextSentenceBtn');
}

function nextSentence() {
  const sentences = allSentences();
  sentenceIndex = (sentenceIndex + 1) % (sentences.length || 1);
  renderSentence();
}

function completedDays() {
  return Object.entries(state.days).filter(([, d]) => d.completed).map(([k]) => Number(k));
}

function markDayIfComplete() {
  const ds = dayState();
  if ((ds.wordIds || []).length >= 20 && (ds.sentenceIds || []).length >= 4) {
    ds.completed = true;
    ds.points = Math.max(ds.points || 0, 10);
  }
}

function updateDashboard() {
  buildCalendar();
  const done = completedDays().length;
  const today = dayState();
  let totalWords = 0;
  let totalSentences = 0;
  Object.values(state.days).forEach((d) => {
    totalWords += (d.wordIds || []).length;
    totalSentences += (d.sentenceIds || []).length;
  });
  const fixed = Object.keys(state.fixedWords || {}).length;
  const reward = Object.values(state.days).slice(-7).reduce((sum, d) => sum + (d.points || 0), 0);
  const set = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.textContent = value;
  };
  const width = (id, value) => {
    const el = document.getElementById(id);
    if (el) el.style.width = value;
  };

  width('levelBar', `${Math.min((totalWords / 300) * 100, 100)}%`);
  set('rewardText', `${Math.round((Math.min(reward, 70) / 70) * 50)} / 50 元`);
  width('wordBar', `${Math.min((totalWords / 300) * 100, 100)}%`);
  set('wordNote', `${totalWords} / 300 字`);
  width('fixBar', `${Math.min((fixed / 10) * 100, 100)}%`);
  set('fixNote', `${Math.min(fixed, 10)} / 10 字`);
  const [wa, wb] = wordRangeForDay(dayIndex());
  set('todayWordsRange', `${wa}-${wb}`);
  set('todayWordNote', `今日 ${today.wordIds.length} / 20`);
  set('xpNow', Math.min(totalWords, 300));
  set('statDays', done);
  set('statScore', (totalWords * 5 + totalSentences * 20).toLocaleString('en-US'));
  const attempts = (state.totalCorrect || 0) + (state.totalWrong || 0);
  set('statAccuracy', attempts ? Math.round(((state.totalCorrect || 0) / attempts) * 100) : 0);
  set('streakDays', done);
}

function init() {
  document.getElementById('nextWordBtn').onclick = () => {
    if (!document.getElementById('nextWordBtn').disabled) nextWord();
  };
  document.getElementById('nextSentenceBtn').onclick = () => {
    if (!document.getElementById('nextSentenceBtn').disabled) nextSentence();
  };
  const name = document.getElementById('challengerName');
  name.value = localStorage.getItem('mosa_challenger_name') || 'Rider_01';
  name.addEventListener('input', () => localStorage.setItem('mosa_challenger_name', name.value));
  updateDashboard();
  renderWord();
  renderSentence();
}

document.addEventListener('DOMContentLoaded', init);
