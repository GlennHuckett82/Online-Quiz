# Online Quiz Project - Code Documentation

This document provides a comprehensive breakdown of all HTML, CSS, and JavaScript code blocks in the Online Quiz project, explaining what each component does and how they work together to create an interactive, accessible quiz application.

## Table of Contents

1. [Project Overview](#project-overview)
2. [HTML Files](#html-files)
3. [CSS Styling](#css-styling)
4. [JavaScript Logic](#javascript-logic)
5. [How Components Work Together](#how-components-work-together)

---

## Project Overview

The Online Quiz is a client-side web application that provides an interactive quiz experience with:
- Multiple question types (Multiple Choice, True/False, Fill-in-the-blank)
- Random question selection and answer shuffling
- Topic-based filtering
- Accessibility features
- Score tracking and high scores
- Responsive design

---

## HTML Files

### 1. index.html - Landing Page

#### Document Structure
```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Online Quiz</title>
  <meta name="description" content="Accessible online quiz application" />
```
**Purpose**: Sets up the HTML5 document with proper encoding, responsive viewport, SEO title, and description for search engines.

#### Font Loading
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
```
**Purpose**: Preconnects to Google Fonts servers for performance, then loads the Inter font family with multiple weights. The `display=swap` ensures text remains visible during font loading.

#### Site Header and Navigation
```html
<header class="site-header" role="banner">
  <h1 id="site-title">Online Quiz</h1>
  <nav aria-label="Primary" class="main-nav">
    <ul>
      <li><a href="index.html" aria-current="page">Home</a></li>
      <li><a href="how-to.html">How To</a></li>
      <li><a href="topics.html">Topics</a></li>
      <li><a href="quiz.html">Start Quiz</a></li>
    </ul>
  </nav>
</header>
```
**Purpose**: Creates the site header with semantic `role="banner"` for accessibility. Navigation uses `aria-label` and `aria-current="page"` to help screen readers understand the current page context.

#### Main Content Sections
```html
<main id="main" tabindex="-1">
  <section class="intro" aria-labelledby="intro-heading">
    <h2 id="intro-heading">Welcome to the Quiz</h2>
    <p>Test your knowledge with our interactive quiz...</p>
    <a class="btn primary" href="quiz.html">Begin Quiz</a>
  </section>

  <section class="features" aria-labelledby="features-heading">
    <h2 id="features-heading">Features</h2>
    <ul class="feature-list">
      <li>Randomized questions & answers</li>
      <li>Accessible, keyboard-friendly navigation</li>
      <li>Multiple question types (MCQ, True/False, Fill-in)</li>
      <li>Progress tracking & scoring</li>
      <li>Review with explanations</li>
    </ul>
  </section>
</main>
```
**Purpose**: The main content area uses semantic sectioning with `aria-labelledby` to associate headings with their sections. The `tabindex="-1"` allows programmatic focus for accessibility.

#### Footer and Scripts
```html
<footer class="site-footer" role="contentinfo">
  <p>&copy; <span id="year"></span> Online Quiz. All rights reserved.</p>
</footer>
<script src="assets/js/app.js" type="module"></script>
<script>document.getElementById('year').textContent = new Date().getFullYear();</script>
```
**Purpose**: Semantic footer with copyright. JavaScript modules are loaded with `type="module"`. An inline script dynamically sets the current year.

### 2. quiz.html - Main Quiz Interface

#### Quiz Structure
```html
<section id="quiz" class="quiz" aria-live="polite">
  <div id="quiz-header" class="quiz-header">
    <p id="progress" class="progress" aria-live="polite"></p>
    <p id="score" class="score" aria-live="polite"></p>
  </div>
  <div id="question-container" class="question-container" role="group" aria-labelledby="question-text"></div>
  <div class="controls">
    <button id="next-btn" class="btn" type="button" disabled>Next</button>
    <button id="submit-btn" class="btn primary" type="button" disabled>Submit</button>
    <button id="restart-btn" class="btn" type="button" hidden>Restart</button>
  </div>
</section>
```
**Purpose**: Main quiz interface with `aria-live="polite"` for screen reader announcements. Progress and score elements also have live regions. Question container uses `role="group"` for grouping related form elements.

#### Results Section
```html
<section id="results" class="results" hidden aria-labelledby="results-heading">
  <h2 id="results-heading">Your Results</h2>
  <p id="summary"></p>
  <ol id="review-list" class="review-list"></ol>
  <button id="play-again-btn" class="btn primary" type="button">Play Again</button>
</section>
```
**Purpose**: Results area that's initially hidden, using an ordered list for question review to provide numbered context to screen readers.

#### High Scores Section
```html
<section id="high-scores" class="results" aria-labelledby="highscores-heading">
  <h2 id="highscores-heading">High Scores</h2>
  <ol id="highscores-list"></ol>
  <button id="clear-scores-btn" class="btn" type="button">Clear Scores</button>
</section>
```
**Purpose**: Displays historical high scores using an ordered list for ranking context.

### 3. how-to.html - Instructions Page

#### Instructions Content
```html
<article class="howto" aria-labelledby="howto-heading">
  <h2 id="howto-heading">How to Take the Quiz</h2>
  <ol class="steps">
    <li>Click "Start Quiz" to load a random set of questions.</li>
    <li>For multiple-choice questions, select one answer then click Next.</li>
    <!-- More steps... -->
  </ol>
  <h3>Accessibility & Keyboard Shortcuts</h3>
  <ul>
    <li>Use Tab / Shift+Tab to move between interactive elements.</li>
    <li>Press Enter or Space to activate buttons and choices.</li>
    <li>Press 1-4 to quickly select an answer option (MCQ only).</li>
  </ul>
</article>
```
**Purpose**: Uses semantic `<article>` element for standalone instructional content. Ordered list provides step-by-step guidance, while unordered list explains accessibility features.

### 4. topics.html - Topic Selection Page

#### Topic Selection Form
```html
<form id="topics-form">
  <fieldset>
    <legend>Available Topics</legend>
    <label><input type="checkbox" name="topic" value="music"> Music</label><br>
    <label><input type="checkbox" name="topic" value="history"> History</label><br>
    <label><input type="checkbox" name="topic" value="science"> Science</label><br>
    <label><input type="checkbox" name="topic" value="maths"> Maths</label><br>
    <label><input type="checkbox" name="topic" value="coding"> Coding</label><br>
  </fieldset>
  <div class="controls" style="margin-top:1rem;">
    <button type="submit" class="btn primary">Save Topics</button>
    <button type="button" id="clear-topics" class="btn">Clear</button>
  </div>
  <p id="topics-status" aria-live="polite"></p>
</form>
```
**Purpose**: Accessible form using `<fieldset>` and `<legend>` to group related checkboxes. Status message uses `aria-live="polite"` for screen reader feedback.

#### Inline JavaScript for Topic Management
```html
<script>
  const form = document.getElementById('topics-form');
  const statusEl = document.getElementById('topics-status');
  const clearBtn = document.getElementById('clear-topics');
  let stored = [];
  try { stored = JSON.parse(localStorage.getItem('quizTopics') || '[]'); } catch { stored = []; }
  if (Array.isArray(stored) && stored.length) {
    [...form.elements].forEach(el => { if (el.name === 'topic' && stored.includes(el.value)) el.checked = true; });
  }
</script>
```
**Purpose**: Loads saved topic preferences from localStorage and pre-checks corresponding checkboxes. Uses try-catch for error handling if localStorage is unavailable.

---

## CSS Styling

### CSS Custom Properties (CSS Variables)
```css
:root {
  --color-bg: #0f172a; /* Slate navy */
  --color-surface: #1e293b;
  --color-accent: #f59e0b; /* Amber accent */
  --color-text: #f1f5f9;
  --radius: 8px;
  --transition: 150ms ease-in-out;
  font-size: 16px;
}
```
**Purpose**: Defines a consistent color scheme and design system using CSS custom properties. The dark theme uses high-contrast colors for accessibility.

### Reset and Base Styles
```css
* { box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  margin: 0;
  font-family: 'Inter', system-ui, Arial, sans-serif;
  background: var(--color-bg);
  color: var(--color-text);
  line-height: 1.5;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}
```
**Purpose**: CSS reset with border-box sizing, smooth scrolling. Body uses flexbox for sticky footer layout with the Inter font family and fallbacks.

### Accessibility Helper Classes
```css
.visually-hidden { 
  position:absolute; 
  left:-9999px; 
  top:auto; 
  width:1px; 
  height:1px; 
  overflow:hidden; 
}
```
**Purpose**: Hides content visually while keeping it available to screen readers - used for headings that provide context without visual noise.

### Header and Navigation Styling
```css
.site-header, .site-footer {
  background: var(--color-surface);
  padding: 0.75rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.main-nav ul { list-style: none; margin:0; padding:0; display:flex; gap:1rem; }
.main-nav a {
  color: var(--color-text);
  text-decoration: none;
  padding: 0.5rem 0.75rem;
  border-radius: var(--radius);
}
.main-nav a[aria-current="page"], .main-nav a:focus, .main-nav a:hover {
  background: var(--color-accent);
  color: #000;
}
```
**Purpose**: Flexible layout for header/footer. Navigation uses flexbox with gap for spacing. Current page and interactive states use accent color with high contrast.

### Button System
```css
.btn {
  background: var(--color-surface);
  color: var(--color-text);
  border: 2px solid var(--color-accent);
  padding: 0.6rem 1.1rem;
  border-radius: var(--radius);
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  font-size: 1rem;
}
.btn.primary { background: var(--color-accent); color:#000; }
.btn:disabled { opacity: 0.4; cursor: not-allowed; }
.btn:not(:disabled):hover, .btn:not(:disabled):focus { 
  transform: translateY(-2px); 
  box-shadow:0 4px 12px -4px #000; 
}
```
**Purpose**: Consistent button styling with primary variant. Disabled state reduces opacity. Interactive feedback includes subtle transform and shadow effects.

### Quiz Interface Styling
```css
.quiz-header { display:flex; justify-content: space-between; flex-wrap:wrap; gap:1rem; }
.question-container { 
  margin-top:1.5rem; 
  background: var(--color-surface); 
  padding:1.25rem 1rem; 
  border-radius: var(--radius); 
}
.answers { list-style:none; margin:1rem 0; padding:0; display:grid; gap:0.75rem; }
.answer-option {
  width:100%; text-align:left; border:2px solid var(--color-accent); 
  background:transparent; color:var(--color-text);
  padding:0.75rem 0.85rem; border-radius: var(--radius); 
  font-size:1rem; cursor:pointer; position:relative;
}
.answer-option:hover, .answer-option:focus { background: rgba(245,158,11,0.15); }
.answer-option[aria-pressed="true"] { background: var(--color-accent); color:#000; }
```
**Purpose**: Quiz header uses flexbox for responsive layout. Question container has distinct background. Answer options use CSS Grid for consistent spacing and button-like styling with ARIA state indication.

### Form Inputs
```css
.fill-blank-input { 
  width:100%; 
  padding:0.75rem; 
  font-size:1rem; 
  border-radius: var(--radius); 
  border:2px solid var(--color-accent); 
  background: #0f1d33; 
  color: var(--color-text); 
}
```
**Purpose**: Text input styling matches the design system with consistent border and background colors.

### Feedback and Status Styling
```css
.feedback { font-weight:600; margin-top:0.5rem; }
.feedback.correct { color: #22c55e; }
.feedback.incorrect { color: #ef4444; }
.topic-tag { 
  display:inline-block; 
  margin:0.25rem 0 0.75rem; 
  font-size:0.75rem; 
  letter-spacing:0.5px; 
  text-transform:uppercase; 
  background:rgba(245,158,11,0.15); 
  color:var(--color-accent); 
  padding:0.25rem 0.5rem; 
  border-radius:999px; 
}
```
**Purpose**: Visual feedback uses semantic colors (green for correct, red for incorrect). Topic tags have pill-shaped styling with transparency.

### Responsive Design
```css
@media (max-width: 600px) {
  .feature-list { columns:1; }
  .answers { gap:0.5rem; }
}
```
**Purpose**: Mobile-first responsive design reduces column count and spacing on smaller screens.

### Focus and Accessibility
```css
:focus-visible { outline:3px solid var(--color-accent); outline-offset:3px; }
```
**Purpose**: High-contrast focus outline for keyboard navigation accessibility, using `:focus-visible` to show only for keyboard users.

---

## JavaScript Logic

### Module Structure and Imports
```javascript
// app.js
// Core quiz logic: randomization, navigation, scoring, rendering.
// Custom code authored for Online Quiz project. No external libraries used.

import { QUESTION_BANK, QUIZ_LENGTH } from './questions.js';
```
**Purpose**: ES6 module system imports question data and quiz configuration. Comments document the purpose and authorship of the code.

### Application State Management
```javascript
const state = {
  order: [],
  currentIndex: 0,
  answers: {},
  score: 0,
  complete: false,
  topics: []
};
```
**Purpose**: Centralized state object manages quiz progression, user answers, scoring, and selected topics. This pattern makes state changes predictable and debuggable.

### DOM Element References
```javascript
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
const highScoresList = document.getElementById('highscores-list');
const clearScoresBtn = document.getElementById('clear-scores-btn');
```
**Purpose**: Caches DOM element references at module load for performance. Avoids repeated `getElementById` calls during runtime.

### Local Storage Management
```javascript
function getSelectedTopics() {
  try {
    return JSON.parse(localStorage.getItem('quizTopics') || '[]') || [];
  } catch {
    return [];
  }
}
```
**Purpose**: Safely retrieves topic preferences from localStorage with error handling. Defaults to empty array if parsing fails or storage is unavailable.

### Fisher-Yates Shuffle Algorithm
```javascript
// Fisher-Yates shuffle (returns new array, leaves original untouched)
function fyShuffle(arr) {
  const out = [...arr];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}
```
**Purpose**: Implements the Fisher-Yates shuffle algorithm for random array ordering. Creates a copy to avoid mutating the original array. Used for randomizing questions and answer choices.

### Balanced Question Selection
```javascript
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
```
**Purpose**: Complex algorithm that ensures balanced representation of selected topics in the quiz. Distributes questions evenly across topics, then fills remaining slots. Handles edge cases like insufficient questions in selected topics.

### Quiz Initialization
```javascript
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
```
**Purpose**: Initializes a new quiz session. Filters questions by selected topics, creates balanced selection, randomizes MCQ answer order while tracking correct answers, resets state, and triggers initial rendering.

### Question Rendering
```javascript
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
```
**Purpose**: Dynamically creates question interface based on question type. Clears previous content, creates semantic HTML with proper ARIA attributes, handles different input types (buttons for MCQ/boolean, text input for fill-in), and preserves user's previous answers.

### Answer Selection and State Updates
```javascript
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
```
**Purpose**: Manages user interaction state. `selectAnswer` updates both internal state and visual ARIA states. `updateMeta` keeps progress/score displays current. `updateControls` enables/disables navigation buttons based on answer state and position.

### Navigation and Scoring
```javascript
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
```
**Purpose**: `nextQuestion` advances quiz state and triggers re-rendering. `calculateScore` evaluates answers based on question type - exact match for MCQ, boolean logic for True/False, case-insensitive string comparison for fill-in questions.

### Results Display
```javascript
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
```
**Purpose**: Displays final results by hiding quiz interface and showing results section. Calculates percentage score, generates detailed review with user answers, correctness, and explanations. Sets focus to "Play Again" button for accessibility.

### Keyboard Shortcuts
```javascript
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

document.addEventListener('keydown', handleKeyShortcuts);
```
**Purpose**: Provides keyboard shortcuts (1-4 keys) for quick answer selection on MCQ and boolean questions. Improves accessibility and user efficiency.

### High Score Management
```javascript
function loadHighScores() {
  try {
    return JSON.parse(localStorage.getItem('highScores') || '[]');
  } catch { return []; }
}

function saveHighScores(scores) {
  try { localStorage.setItem('highScores', JSON.stringify(scores)); } catch { /* ignore */ }
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
```
**Purpose**: Manages persistent high score storage in localStorage. Records score with metadata (date, percentage, topic filters), sorts by percentage then total questions, keeps top 50 scores.

### Event Listeners and Initialization
```javascript
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
```
**Purpose**: Sets up event listeners with null checking for elements that may not exist on all pages. Automatically initializes quiz if question container is present (quiz.html).

### Question Database (questions.js)

#### Question Structure
```javascript
export const QUESTION_BANK = [
  {
    id: 1,
    topic: 'coding',
    type: 'mcq',
    question: 'Which HTML element is used to create a hyperlink?',
    choices: ['<hyper>', '<a>', '<link>', '<href>'],
    answer: 1,
    explanation: 'The <a> (anchor) tag defines a hyperlink that links one page to another.'
  },
  {
    id: 2,
    topic: 'coding',
    type: 'boolean',
    question: 'CSS stands for Cascading Style Sheets.',
    answer: true,
    explanation: 'CSS is the standard language for describing the look of a document written in HTML.'
  },
  {
    id: 4,
    topic: 'coding',
    type: 'fill',
    question: 'In JavaScript, the keyword used to declare a block-scoped variable is ____.',
    answer: 'let',
    explanation: 'let declares a block-scoped variable (introduced in ES6).'
  }
];

export const QUIZ_LENGTH = 10; // fixed number of questions per run
```
**Purpose**: Defines question data structure with unique IDs, topic categorization, question types (mcq, boolean, fill), and educational explanations. Each question type has appropriate answer format (index for MCQ, boolean for True/False, string for fill-in).

---

## How Components Work Together

### 1. Application Flow
1. **Page Load**: HTML loads CSS and JavaScript modules
2. **Initialization**: JavaScript checks for quiz container and auto-initializes
3. **Topic Selection**: Users can customize quiz topics via topics.html
4. **Question Selection**: Algorithm creates balanced question set based on topics
5. **Quiz Interaction**: Dynamic question rendering with state management
6. **Results**: Score calculation and detailed review with explanations
7. **Persistence**: High scores saved to localStorage for future sessions

### 2. Accessibility Integration
- **Semantic HTML**: Proper landmarks, headings, and form structure
- **ARIA Attributes**: Live regions, labels, and state indicators
- **Keyboard Navigation**: Tab order, shortcuts, and focus management
- **Visual Design**: High contrast colors and clear focus indicators
- **Screen Reader Support**: Meaningful text and proper markup structure

### 3. Responsive Design Strategy
- **Mobile-First CSS**: Base styles for small screens, enhanced for larger
- **Flexible Layouts**: Flexbox and CSS Grid for adaptive interfaces
- **Touch-Friendly**: Adequate button sizes and spacing for mobile devices
- **Progressive Enhancement**: Core functionality works without JavaScript features

### 4. Performance Considerations
- **Module Loading**: ES6 modules for code organization and lazy loading
- **DOM Caching**: Element references stored to avoid repeated queries
- **Efficient Rendering**: Minimal DOM manipulation and reflow
- **Lightweight Assets**: No external libraries, optimized font loading

### 5. Error Handling
- **LocalStorage**: Try-catch blocks for storage unavailability
- **Graceful Degradation**: Quiz functions without storage features
- **Input Validation**: Proper checking of user inputs and state
- **Null Checking**: Safe DOM element access patterns

This documentation provides a complete understanding of how the Online Quiz application is structured and how each component contributes to the overall user experience.