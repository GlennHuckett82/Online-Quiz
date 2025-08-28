// questions.js
// Define quiz questions. Each question object can represent different types:
// type: 'mcq' | 'boolean' | 'fill'
// For 'mcq' and 'boolean', provide choices array; for 'fill', provide answer string.
// Explanations are shown in the review screen.

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
    id: 3,
    topic: 'coding',
    type: 'mcq',
    question: 'Which array method creates a new array with all elements that pass a test?',
    choices: ['map()', 'reduce()', 'filter()', 'forEach()'],
    answer: 2,
    explanation: 'filter() returns a new array including only elements that pass the provided test.'
  },
  {
    id: 4,
    topic: 'coding',
    type: 'fill',
    question: 'In JavaScript, the keyword used to declare a block-scoped variable is ____.',
    answer: 'let',
    explanation: 'let declares a block-scoped variable (introduced in ES6).'
  },
  {
    id: 5,
    topic: 'coding',
    type: 'boolean',
    question: 'The <canvas> element can be used to draw graphics via scripting.',
    answer: true,
    explanation: 'The <canvas> element is used with JavaScript to draw graphics on the fly.'
  },
  {
    id: 6,
    topic: 'coding',
    type: 'mcq',
    question: 'Which HTTP status code means "Not Found"?',
    choices: ['200', '301', '404', '500'],
    answer: 2,
    explanation: '404 indicates the requested resource could not be found on the server.'
  },
  {
    id: 7,
    topic: 'coding',
    type: 'fill',
    question: 'The HTML attribute used to provide alternative text for an image is ____.',
    answer: 'alt',
    explanation: 'alt text improves accessibility and is shown if the image cannot load.'
  },
  // Music topic examples
  {
    id: 8,
    topic: 'music',
    type: 'mcq',
    question: 'Which clef is commonly used for violin music?',
    choices: ['Bass clef', 'Treble clef', 'Alto clef', 'Tenor clef'],
    answer: 1,
    explanation: 'The treble clef is standard for higher-pitched instruments like the violin.'
  },
  {
    id: 9,
    topic: 'music',
    type: 'boolean',
    question: 'A triad consists of three different notes.',
    answer: true,
    explanation: 'A triad chord uses three distinct pitches: root, third, fifth.'
  },
  // History topic examples
  {
    id: 10,
    topic: 'history',
    type: 'fill',
    question: 'The Great Wall is primarily located in _____.',
    answer: 'china',
    explanation: 'The Great Wall of China was built across northern borders of China.'
  },
  {
    id: 11,
    topic: 'history',
    type: 'mcq',
    question: 'Which year did World War II end?',
    choices: ['1940', '1943', '1945', '1950'],
    answer: 2,
    explanation: 'World War II ended in 1945.'
  },
  // Science topic examples
  {
    id: 12,
    topic: 'science',
    type: 'boolean',
    question: 'Water boils at 100°C at standard atmospheric pressure.',
    answer: true,
    explanation: 'At 1 atm pressure, water boils at 100°C (212°F).'
  },
  {
    id: 13,
    topic: 'science',
    type: 'mcq',
    question: 'What gas do plants mainly absorb for photosynthesis?',
    choices: ['Oxygen', 'Carbon Dioxide', 'Nitrogen', 'Helium'],
    answer: 1,
    explanation: 'Plants use CO2 in photosynthesis to produce glucose and oxygen.'
  },
  // Maths topic examples
  {
    id: 14,
    topic: 'maths',
    type: 'fill',
    question: 'The value of pi rounded to two decimal places is _____.',
    answer: '3.14',
    explanation: 'Pi ≈ 3.14159; rounding to two decimals gives 3.14.'
  },
  {
    id: 15,
    topic: 'maths',
    type: 'mcq',
    question: 'Solve: 6 × 7',
    choices: ['36', '40', '42', '48'],
    answer: 2,
    explanation: '6 multiplied by 7 equals 42.'
  }
];

export const QUIZ_LENGTH = 10; // fixed number of questions per run
