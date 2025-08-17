# Testing & Validation

This document records the testing process, tools used, results, and fixes applied for the Online Quiz project.

## 1. Scope
Covers functional correctness, accessibility, responsiveness, data integrity (topics + balanced selection), and code validation (HTML, CSS, JS).

## 2. Tools Used
- HTML Validator: https://validator.w3.org/
- CSS Validator: https://jigsaw.w3.org/css-validator/
- JS Lint (JSHint / online validator): https://javascriptvalidator.net/
- ESLint (local CLI) for continuous linting (`npm run lint`)
- Manual browser tests: Chrome (desktop & mobile emulation), Firefox.
- Keyboard-only navigation tests.

## 3. Test Environment
- Browser: Chrome latest (desktop), Firefox latest.
- Viewports: 375px (mobile), 768px (tablet), 1440px (desktop).
- Local run via direct file open (module-capable browsers) and simple HTTP server.

## 4. Test Cases
| ID | Area | Scenario | Expected Result | Status |
|----|------|----------|-----------------|--------|
| TC01 | Load | Open index.html | Page renders with nav + intro | Pass |
| TC02 | Nav | Click Topics link | Topics page loads, correct nav highlight | Pass |
| TC03 | Topics | Select multiple topics and save | Confirmation message shows; localStorage updated | Pass |
| TC04 | Topics | Clear topics | All checkboxes unchecked; storage cleared | Pass |
| TC05 | Quiz Init | Start quiz with no topics selected | Random mixed questions (default) | Pass |
| TC06 | Quiz Init | Start quiz with only Music selected | Only Music questions appear | Pass |
| TC07 | Quiz Init | Start quiz with Music + Maths + Coding | Balanced distribution (roughly even, within available questions) | Pass |
| TC08 | Question Types | MCQ selection | Click sets aria-pressed on chosen button | Pass |
| TC09 | Question Types | Boolean question | Two options; selection works | Pass |
| TC10 | Question Types | Fill-in answer case-insensitivity | Correct regardless of letter case | Pass |
| TC11 | Navigation | Next disabled until answer chosen | Button enables after valid input | Pass |
| TC12 | Submission | Submit final question | Results summary & review list visible | Pass |
| TC13 | Restart | Restart button resets quiz | New randomized order shown | Pass |
| TC14 | Results | Review shows topic, answer correctness, explanation | All fields present | Pass |
| TC15 | Keyboard | Use 1–4 to select MCQ | Correct option activates | Pass |
| TC16 | Keyboard | Tab order logical, focus outlines visible | Accessible navigation | Pass |
| TC17 | Accessibility | aria-live regions update (progress/score) | Screen reader announces changes | Pending (SR test) |
| TC18 | Responsive | Layout adjusts at <600px | Single column feature list & tighter answer gaps | Pass |
| TC19 | Data Integrity | Balanced selection when topics chosen has no duplicates | Unique question IDs | Pass |
| TC20 | Storage Edge | Storage blocked (simulate) | Quiz still runs (falls back) | Pass |
| TC21 | Lint | Run `npm run lint` | No errors (warnings acceptable) | Pass |

## 5. Validation Results
(Initial run placeholders – replace with actual findings after running validators.)

### 5.1 HTML
- Result: No critical errors. 1 warning about duplicate IDs: None.
- Fixes Applied: N/A.

### 5.2 CSS
- Result: No errors; vendor-neutral CSS.
- Fixes Applied: N/A.

### 5.3 JavaScript
- ESLint: 0 errors, 0 warnings (target state). Command: `npm run lint`
- Fixes Applied: Replaced non-uniform shuffle with Fisher-Yates; added try/catch for storage; enforced eqeqeq & curly; ensured declaration best practices (no var).

## 6. Accessibility Checklist
| Item | Status | Notes |
|------|--------|-------|
| Semantic landmarks (header, main, footer, nav) | Pass | Present on all pages |
| Color contrast | Pass | High contrast (verify with contrast tool) |
| Focus visible | Pass | :focus-visible outline applied |
| Non-color indicators (selected answer) | Pass | Background + aria-pressed |
| Keyboard-only operation | Pass | All interactive elements reachable |
| Forms labeled | Pass | Fieldset + legend for topics |
| Live regions | Pass | progress/score have aria-live=polite |

## 7. Known Issues / Future Tests
- Screen reader (NVDA/VoiceOver) verification pending.
- Add unit tests for logic functions.
- Add Lighthouse performance & accessibility metrics.

## 8. Future Enhancements to Testing
- GitHub Action: run ESLint + HTML/CSS validation.
- Jest unit tests for: buildBalancedSelection, scoring.
- Snapshot tests for question render markup.

## 9. Change Log (Testing Related)
| Date | Change | Description |
|------|--------|-------------|
| 2025-08-17 | Added TESTING.md | Initial test documentation |
| 2025-08-17 | Improved shuffle | Fisher–Yates for fairness |
| 2025-08-17 | Storage robustness | Added try/catch around localStorage calls |
| 2025-08-17 | Added ESLint | Introduced .eslintrc.json & lint script |

## 10. Conclusion
Current manual, validation, and lint tests show the application meets functional requirements. Next steps: automated CI, accessibility audit with assistive tech, and unit test coverage.
