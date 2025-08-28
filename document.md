# Online Quiz – Code Walkthrough

This document explains how the HTML, CSS, and JavaScript in this project fit together. It highlights the key blocks in each file and how they work.

## How the app works (high-level)
- Pages: `index.html` (home), `how-to.html` (instructions), `topics.html` (choose topics), `quiz.html` (take quiz).
- Data: `assets/js/questions.js` provides the question bank and a fixed quiz length of 10 questions.
- Logic/UI: `assets/js/app.js` runs the quiz: chooses questions, renders UI, handles answers, scoring, results, and high scores.
- Styles: `assets/css/style.css` defines theme, layout, components, responsiveness, and accessibility helpers.

---

## HTML files

### index.html (Home)
Key sections:
- `<header>` with site title and primary navigation. Links to all pages.
- `<main>`
  - `.intro`: welcome heading, short description, and a button to start.
  - `.features`: bullet list describing quiz features.
- `<footer>`: copyright and dynamic year.
- Scripts at bottom: loads `assets/js/app.js` as a module for small shared behavior (e.g., year), but core quiz logic only runs on `quiz.html` (guarded by element checks in JS).

What it does: Landing page that directs users to topics or the quiz. Minimal interactive logic; mostly static content.

---

### how-to.html (Instructions)
Key sections:
- Same header/nav/footer pattern for consistent UX.
- Instructions on how to use keyboard, how topics work, and what to expect.

What it does: Provides usage guidance and accessibility notes. Static content.

---

### topics.html (Choose Topics)
Key blocks:
- `<form id="topics-form">` contains checkboxes for available topics: Music, History, Science, Maths, Coding.
- Inline script manages persistence using `localStorage`:
  - On load: reads `quizTopics` (JSON array) and pre-checks boxes.
  - On submit: collects checked values and saves back to `localStorage` under `quizTopics`.
  - Clear button: unchecks boxes and removes `quizTopics` from storage.
- ARIA: `aria-live` status updates to confirm saves/clears.

What it does: Lets users select which topics to include. If none are chosen, the quiz uses all topics.

---

### quiz.html (Take Quiz)
Key sections:
- `.main-nav` header and footer consistent with other pages.
- `<section id="quiz">` shows the live quiz UI:
  - `.quiz-header` with `#progress` and `#score` areas updated as you advance.
  - `#question-container` where each question (text + choices or input) is rendered.
  - `.controls` with Next/Submit/Restart buttons.
- `<section id="results">` shows after submitting:
  - Summary line (`#summary`) and a numbered review list (`#review-list`).
  - "Play Again" button to restart.
- `<section id="high-scores">`:
  - Ordered list `#highscores-list` to show saved scores.
  - "Clear Scores" button.
- Scripts:
  - `assets/js/questions.js` must be loaded before `app.js` (data first, logic second).
  - `assets/js/app.js` wires up all quiz behaviors.

What it does: Hosts the interactive quiz lifecycle: render questions, collect answers, submit, review, and manage high scores.

---

## CSS: `assets/css/style.css`
Key sections:
- CSS variables and base theme in `:root`: colors, radius, transitions, font size.
- Layout and structure: `body`, `.site-header`, `.site-footer`, `main`, navigation list.
- Components:
  - `.btn` styles with primary variant and hover/disabled states.
  - `.quiz-header`, `.question-container`, `.answers` grid, `.answer-option` buttons.
  - `.fill-blank-input` for free-text answers.
  - `.feedback` with `.correct` and `.incorrect` colors.
  - `.topic-tag` to show the question’s topic.
  - High scores block spacing.
- Accessibility:
  - `.visually-hidden` utility class.
  - `:focus-visible` high-contrast outlines.
- Responsive tweaks for small screens.

What it does: Provides a consistent, accessible UI with clear focus indicators, readable contrast, and touch-friendly buttons.

---

## JavaScript data: `assets/js/questions.js`
Exports:
- `QUESTION_BANK`: an array of question objects. Each question has:
  - `id`: unique number
  - `topic`: one of "music", "history", "science", "maths", "coding"
  - `type`: "mcq" | "boolean" | "fill"
  - `question`: the prompt text
  - For `mcq`: `choices` (array of strings) and `answer` (index of correct choice)
  - For `boolean`: `answer` (true/false)
  - For `fill`: `answer` (string) – comparisons are case-insensitive
  - `explanation`: text shown on the review screen
- `QUIZ_LENGTH = 10`: fixed number of questions per run.

What it does: Defines the content and the number of questions selected for a quiz attempt.

---

## JavaScript logic: `assets/js/app.js`
Structure and key functions:

- State object
  - Tracks `order` (selected questions), `currentIndex`, `answers` map, `score`, `complete` flag, and selected `topics`.

- DOM references
  - Grabs elements by ID: question container, progress/score text, buttons, results area, review list, high scores list.
  - All interactions are gated by null checks so the script can be safely included on non-quiz pages.

- `getSelectedTopics()`
  - Reads `quizTopics` from `localStorage`; returns an array or empty array if unavailable.

- Fisher–Yates shuffle: `fyShuffle(arr)`
  - Returns a new shuffled array with unbiased randomization. Used for questions and multiple-choice options.

- Balanced selection: `buildBalancedSelection(pool, topics, length)`
  - Ensures the chosen set spreads questions across selected topics where possible.
  - Steps:
    1. Determine effective topics (selected or inferred from pool).
    2. Shuffle the pool per-topic and take a base count per topic.
    3. Fill remaining slots round-robin by topic; if exhausted, backfill from the full pool.

- `initQuiz()`
  - Resolves the question pool by topics.
  - Uses `buildBalancedSelection(..., QUIZ_LENGTH)` to pick exactly 10 questions.
  - For MCQs, shuffles the visible choices and remaps the correct `answer` index.
  - Resets progress/answers/score and renders the first question.

- `renderCurrentQuestion()`
  - Renders the current question and its inputs:
    - `mcq` and `boolean` => a list of buttons; clicking one records the chosen index.
    - `fill` => a text input with a hint; typing records the trimmed value.
  - Displays a topic tag under the question text.

- `selectAnswer(question, idx)`
  - Records an answer and updates `aria-pressed` for button choices.

- `updateMeta()` and `updateControls()`
  - Updates progress text and score display.
  - Enables Next/Submit only when the current question has an answer and according to position.

- Navigation and scoring
  - `nextQuestion()` advances the index and re-renders.
  - `calculateScore()` compares recorded answers to correct ones (case-insensitive for fill-in).
  - `submitQuiz()` computes score, marks complete, and shows results.

- Results view: `showResults()` / `hideResults()`
  - Shows a summary with percent and topics included.
  - Builds a review list itemizing each question, your answer, correct/incorrect status, and an explanation.
  - Calls `recordHighScore()`.

- High scores
  - `loadHighScores()` / `saveHighScores()` store entries in `localStorage` under `highScores`.
  - Each entry contains `{ date, percent, correct, total, topics }`.
  - `renderHighScores()` lists top scores; clear button removes the store.

- Keyboard shortcuts: `handleKeyShortcuts(e)`
  - On quiz pages, number keys 1–(N) choose answers for MCQ/boolean questions.

- Event listeners and bootstrap
  - Wires up button clicks, keydown listener, and initial `initQuiz()` only if `#question-container` exists (i.e., on `quiz.html`).

What it does: Implements the quiz lifecycle, ensuring accessible input methods, fair selection across topics, and persistent high scores.

---

## Accessibility & UX notes
- Clear focus states with `:focus-visible`.
- `aria-live` applied to progress/score and topics page status.
- Buttons are reachable and actionable with keyboard; number keys map to options.
- Topic tags provide context; review includes explanations to aid learning.

---

## Common changes you might make
- Add questions: append to `QUESTION_BANK` with unique `id`, valid `topic`, and correct shape.
- Change quiz size: update `QUIZ_LENGTH` in `questions.js` (currently fixed at 10).
- Add a new topic: include checkbox in `topics.html` and add question objects with that `topic` value.
- Restyle: tweak CSS variables in `:root` or component classes.

---

## Troubleshooting
- Modules must be served over HTTP/HTTPS (not `file://`). Use Live Server or `http-server` when running locally.
- If high scores don’t appear, ensure the browser allows `localStorage` for the domain and not in private mode with blocked storage.
- If the quiz renders fewer than 10 questions, verify there are enough questions across the chosen topics; the selector backfills from all topics when needed.

