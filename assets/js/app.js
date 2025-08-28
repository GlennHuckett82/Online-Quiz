// app.js
// Core quiz logic: randomization, navigation, scoring, rendering.
// Custom code authored for Online Quiz project. No external libraries used.

import { QUESTION_BANK, QUIZ_LENGTH } from './questions.js';

const state = {
  order: [],
  currentIndex: 0,
  answers: {},
  score: 0,
  complete: false,
  topics: []
};

// DOM references
const questionContainer = document.getElementById('question-container');
const progressEl = document.getElementById('progress');
const scoreEl = document.getElementById('score');
const nextBtn = document.getElementById('next-btn');
const submitBtn = document.getElementById('submit-btn');
const restartBtn = document.getElementById('restart-btn');
const resultsSection = document.getElementById('results');
const summaryEl = document.getElementById('summary');
const reviewList = document.getElementById('review-list');
const playAgainBtn = document.getElementById('play-again-btn');
// Removed settings form (fixed quiz length)
const highScoresList = document.getElementById('highscores-list');
const clearScoresBtn = document.getElementById('clear-scores-btn');

function getSelectedTopics() {
  try {
    return JSON.parse(localStorage.getItem('quizTopics') || '[]') || [];
  } catch {
    return [];
  }
}

// Fisher-Yates shuffle (returns new array, leaves original untouched)
function fyShuffle(arr) {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

function buildBalancedSelection(pool, topics, length) {
  if (!topics.length) {
    topics = [...new Set(pool.map(q => q.topic))];
  }
  const byTopic = Object.fromEntries(topics.map(t => [t, fyShuffle(pool.filter(q => q.topic === t))]));
  topics = topics.filter(t => byTopic[t] && byTopic[t].length);
  if (!topics.length) {
    return fyShuffle(pool).slice(0, length);
  }
  const baseCount = Math.floor(length / topics.length);
  const selection = [];
  topics.forEach(t => {
    const take = Math.min(baseCount, byTopic[t].length);
    selection.push(...byTopic[t].splice(0, take));
  });
  let topicIndex = 0;
  while (selection.length < length) {
    const t = topics[topicIndex % topics.length];
    if (byTopic[t].length) {
      selection.push(byTopic[t].shift());
    }
    if (!topics.some(tp => byTopic[tp].length)) {
      break;
    }
    topicIndex++;
  }
  if (selection.length < length) {
    const remaining = pool.filter(q => !selection.includes(q));
    selection.push(...fyShuffle(remaining).slice(0, length - selection.length));
  }
  return fyShuffle(selection).slice(0, length);
}

const quizLength = QUIZ_LENGTH; // fixed to 10 via questions.js

function initQuiz() {
  state.topics = getSelectedTopics();
  let pool = state.topics.length ? QUESTION_BANK.filter(q => state.topics.includes(q.topic)) : QUESTION_BANK;
  if (!pool.length) {
    pool = QUESTION_BANK;
  }
  const balanced = buildBalancedSelection(pool, state.topics, quizLength);
  state.order = balanced.map(q => {
    if (q.type === 'mcq') {
      const mapped = fyShuffle(q.choices.map((c, i) => ({ c, i })));
      const newChoices = mapped.map(m => m.c);
      const newAnswer = mapped.findIndex(m => m.i === q.answer);
      return { ...q, choices: newChoices, answer: newAnswer };
    }
    return q;
  });
  state.currentIndex = 0;
  state.answers = {};
  state.score = 0;
  state.complete = false;
  if (questionContainer) {
    renderCurrentQuestion();
  }
  updateMeta();
  updateControls();
  hideResults();
}

function renderCurrentQuestion() {
  const q = state.order[state.currentIndex];
  if (!q) {
    return;
  }
  questionContainer.innerHTML = '';
  const h2 = document.createElement('h2');
  h2.id = 'question-text';
  h2.textContent = q.question;
  questionContainer.appendChild(h2);
  const topicTag = document.createElement('p');
  topicTag.className = 'topic-tag';
  topicTag.textContent = `Topic: ${q.topic}`;
  questionContainer.appendChild(topicTag);
  if (q.type === 'mcq' || q.type === 'boolean') {
    const ul = document.createElement('ul');
    ul.className = 'answers';
    const choices = q.type === 'boolean' ? ['True', 'False'] : q.choices;
    choices.forEach((choiceText, idx) => {
      const li = document.createElement('li');
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'answer-option';
      btn.textContent = choiceText;
      btn.setAttribute('data-index', idx);
      btn.setAttribute('aria-pressed', state.answers[q.id] === idx ? 'true' : 'false');
      btn.addEventListener('click', () => selectAnswer(q, idx));
      li.appendChild(btn);
      ul.appendChild(li);
    });
    questionContainer.appendChild(ul);
  } else if (q.type === 'fill') {
    const input = document.createElement('input');
    input.type = 'text';
    input.className = 'fill-blank-input';
    input.setAttribute('aria-describedby', 'fill-hint');
    input.value = state.answers[q.id] || '';
    input.addEventListener('input', (e) => {
      state.answers[q.id] = e.target.value.trim();
      updateControls();
    });
    questionContainer.appendChild(input);
    const hint = document.createElement('p');
    hint.id = 'fill-hint';
    hint.className = 'hint';
    hint.textContent = 'Type your answer then press Next or Submit.';
    questionContainer.appendChild(hint);
  }
}

function selectAnswer(question, idx) {
  state.answers[question.id] = idx;
  document.querySelectorAll('.answer-option').forEach(btn => {
    btn.setAttribute('aria-pressed', btn.getAttribute('data-index') === String(idx) ? 'true' : 'false');
  });
  updateControls();
}

function updateMeta() {
  if (progressEl) {
    progressEl.textContent = `Question ${state.currentIndex + 1} of ${state.order.length}`;
  }
  if (scoreEl) {
    scoreEl.textContent = `Score: ${state.score}`;
  }
}

function updateControls() {
  if (!nextBtn) {
    return;
  }
  const q = state.order[state.currentIndex];
  const answered = state.answers[q.id] !== undefined && state.answers[q.id] !== '';
  nextBtn.disabled = !(answered && state.currentIndex < state.order.length - 1);
  submitBtn.disabled = !(answered && state.currentIndex === state.order.length - 1);
}

function nextQuestion() {
  if (state.currentIndex < state.order.length - 1) {
    state.currentIndex++;
    renderCurrentQuestion();
    updateMeta();
    updateControls();
  }
}

function calculateScore() {
  let score = 0;
  state.order.forEach(q => {
    const userAns = state.answers[q.id];
    if (q.type === 'mcq' && userAns === q.answer) {
      score++;
    } else if (q.type === 'boolean') {
      if ((userAns === 0 ? true : false) === q.answer) {
        score++;
      }
    } else if (q.type === 'fill') {
      if (typeof userAns === 'string' && userAns.toLowerCase() === q.answer.toLowerCase()) {
        score++;
      }
    }
  });
  state.score = score;
  updateMeta();
}

function submitQuiz() {
  calculateScore();
  state.complete = true;
  showResults();
}

function showResults() {
  if (!resultsSection) {
    return;
  }
  resultsSection.hidden = false;
  const quizEl = document.getElementById('quiz');
  if (quizEl) {
    quizEl.hidden = true;
  }
  const total = state.order.length;
  const topicsInfo = state.topics.length ? ` (Topics: ${state.topics.join(', ')})` : '';
  summaryEl.textContent = `You scored ${state.score} out of ${total} (${Math.round((state.score / total) * 100)}%).${topicsInfo}`;
  reviewList.innerHTML = '';
  state.order.forEach(q => {
    const li = document.createElement('li');
    const userAns = state.answers[q.id];
    let correct = false;
    let userView = '';
    if (q.type === 'mcq') {
      correct = userAns === q.answer;
      userView = q.choices[userAns];
    } else if (q.type === 'boolean') {
      const boolUser = userAns === 0 ? true : false;
      correct = boolUser === q.answer;
      userView = boolUser ? 'True' : 'False';
    } else if (q.type === 'fill') {
      correct = typeof userAns === 'string' && userAns.toLowerCase() === q.answer.toLowerCase();
      userView = userAns || '(blank)';
    }
    li.innerHTML = `<strong>${q.question}</strong> <em>(Topic: ${q.topic})</em><br>Your answer: <code>${userView || ''}</code><br>Result: <span class="${correct ? 'feedback correct' : 'feedback incorrect'}">${correct ? 'Correct' : 'Incorrect'}</span><br><em>Explanation: ${q.explanation}</em>`;
    reviewList.appendChild(li);
  });
  playAgainBtn.focus();
  recordHighScore();
}

function hideResults() {
  if (!resultsSection) {
    return;
  }
  resultsSection.hidden = true;
  const quizSection = document.getElementById('quiz');
  if (quizSection) {
    quizSection.hidden = false;
  }
}

function handleKeyShortcuts(e) {
  if (!questionContainer) {
    return;
  }
  const q = state.order[state.currentIndex];
  if (!q || (q.type !== 'mcq' && q.type !== 'boolean')) {
    return;
  }
  const keyNum = parseInt(e.key, 10);
  if (!isNaN(keyNum)) {
    const idx = keyNum - 1;
    const max = q.type === 'boolean' ? 2 : q.choices.length;
    if (idx >= 0 && idx < max) {
      selectAnswer(q, idx);
    }
  }
}

function loadHighScores() {
  try {
    return JSON.parse(localStorage.getItem('highScores') || '[]');
  } catch { return []; }
}
function saveHighScores(scores) {
  try { localStorage.setItem('highScores', JSON.stringify(scores)); } catch { /* ignore */ }
}
function renderHighScores() {
  if (!highScoresList) {
    return;
  }
  const scores = loadHighScores();
  highScoresList.innerHTML = '';
  scores.slice(0, 10).forEach(s => {
    const li = document.createElement('li');
    li.textContent = `${s.percent}% - ${s.correct}/${s.total} (${s.topics || 'all'}) on ${new Date(s.date).toLocaleDateString()}`;
    highScoresList.appendChild(li);
  });
  if (!scores.length) {
    const li = document.createElement('li');
    li.textContent = 'No scores yet.';
    highScoresList.appendChild(li);
  }
}
function recordHighScore() {
  const percent = Math.round((state.score / state.order.length) * 100);
  const entry = {
    date: Date.now(),
    percent,
    correct: state.score,
    total: state.order.length,
    topics: state.topics.length ? state.topics.join(',') : 'all'
  };
  const scores = loadHighScores();
  scores.push(entry);
  scores.sort((a, b) => b.percent - a.percent || a.total - b.total);
  saveHighScores(scores.slice(0, 50));
  renderHighScores();
}

document.addEventListener('keydown', handleKeyShortcuts);
if (nextBtn) {
  nextBtn.addEventListener('click', nextQuestion);
}
if (submitBtn) {
  submitBtn.addEventListener('click', submitQuiz);
}
if (restartBtn) {
  restartBtn.addEventListener('click', initQuiz);
}
if (playAgainBtn) {
  playAgainBtn.addEventListener('click', initQuiz);
}
// settings form removed
if (clearScoresBtn) {
  clearScoresBtn.addEventListener('click', () => {
    try { localStorage.removeItem('highScores'); } catch { /* ignore */ }
    renderHighScores();
  });
}
if (questionContainer) {
  initQuiz();
  restartBtn.hidden = false;
  renderHighScores();
}
