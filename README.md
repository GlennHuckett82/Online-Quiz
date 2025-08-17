# Online Quiz

Accessible, responsive online quiz web application featuring random questions, multiple question types, scoring, and review with explanations. Built with semantic HTML, modern CSS, and vanilla JavaScript (no external runtime dependencies).

## Features
- Random subset of questions each session (with randomized MCQ answer order)
- Multiple question types: multiple choice, true/false, fill-in-the-blank
- Keyboard accessible (Tab / Shift+Tab, Enter/Space, number keys 1-4 for quick selection)
- Live progress & score updates
- Results summary with per-question correctness & explanations
- Restart for a new randomized run
- Responsive design (mobile-first) and high-contrast color scheme

## Project Structure
```
assets/
  css/          Global styles
  js/           Quiz logic & question bank
  images/       (placeholder for graphics)
index.html      Landing page
how-to.html     Instructions page
topics.html     Topic selection page
quiz.html       Interactive quiz interface
README.md       This documentation
TESTING.md      Validation & test evidence
.eslintrc.json  Lint configuration
package.json    Dev dependency management
```

## Accessibility
- Semantic landmarks: header, main, footer, nav, sections
- aria-live regions for progress & score
- Focus styles with high-contrast outline
- Limited color palette (<=3 core colors) for clarity

## Running Locally
Simply open `index.html` in a modern browser (modules supported). If testing via a simple server:
```
# Python 3
python -m http.server 8000
```
Navigate to http://localhost:8000

## Deployment (GitHub Pages)
1. Commit & push all code to your repository main (or configured) branch.
2. In GitHub repository Settings > Pages, set Source to the selected branch / root.
3. Save; wait for build; the live URL appears under GitHub Pages section.

## Validation & Quality
Use the following tools and document issues & resolutions:
- HTML: https://validator.w3.org/
- CSS: https://jigsaw.w3.org/css-validator/
- JS: https://javascriptvalidator.net/
- ESLint (local):
```
npm install
npm run lint
```
All JavaScript should pass with no errors (warnings acceptable per ruleset).

## Attribution
All code in this repository authored for the Online Quiz project unless otherwise noted. No external code snippets used beyond standard web platform knowledge.

## Future Enhancements
- Persistent high scores via localStorage
- Timed quiz mode
- Per-question feedback before final submission (optional mode)
- Progress bar / animation
- User-selectable quiz length

## Screenshots
Add screenshots here (e.g., `assets/images/landing.png`, `assets/images/quiz.png`) and describe each feature and its value to users.

---
© 2025 Online Quiz Project
