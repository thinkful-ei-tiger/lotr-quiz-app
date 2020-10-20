/**
 * Example store structure
 */
'use strict';

const store = {
  // 5 or more questions are required
  questions: [
    {
      question: 'What color is broccoli?',
      answers: [
        'red',
        'orange',
        'pink',
        'green'
      ],
      correctAnswer: 'green'
    },
    {
      question: 'What is the current year?',
      answers: [
        '1970',
        '2015',
        '2019',
        '2005'
      ],
      correctAnswer: '2019'
    }
  ],
  quizStarted: false,
  questionNumber: 0,
  score: 0
};

function startPage() {
  return `<section>
  <h2>Welcome to our Lord of the Rings Quiz!</h2>
  <p>It is going to be an epic journey! Press <em>Start Quiz</em> to begin!</p>
  <form action="">
    <button id="start" name="start" type="submit">Start Quiz</button>
  </form>
  </section>`;
}



function createAnswerList(){
  let answerList = '';
  let answers = store.questions[store.questionNumber].answers;
  answers.forEach(element => { 
    answerList += `<label for='submit-answer'>${element}</label> 
    <input type='radio' name="answers" value=${element}>`;
  }); 
  return answerList;
}



function questionPage() {

  return `<section>
  <h2 class='.score'>Your Score: ${store.score} / ${store.questionNumber - store.score}</h2>
  <p class='.question-number'>Question Number: ${store.questionNumber + 1} of ${store.questions.length}</p>
  <h3 class='.question'>${store.questions[store.questionNumber].question}</h3>
  <form action="">
    ${createAnswerList()}
    <button id="submit-answer" name="submit-answer" type="submit">Submit Answer</button>
  </form>
</section>`;
}

function answerPage() {
  return ``;
}

function finalPage() {
  return ``;
}

function handleStartQuiz() {
  $('main').on('click', '#start', function(event) {
    console.log('One does not simply click the start button.')
    console.log(`quizStarted`, store.quizStarted);
    store.quizStarted = true;
    console.log(`quizStarted`, store.quizStarted);
    render();
  })
}

function render() {
  if (store.quizStarted === false) { 
    $('main').html(startPage());
    console.log('displaying startPage');
  } else if (store.quizStarted) {
    $('main').html(questionPage());
    console.log('displaying questionPage');
  } 
}

function main() {
  render();
  handleStartQuiz();
}

$(main());

/**
 * 
 * Technical requirements:
 * 
 * Your app should include a render() function, that regenerates the view each time the store is updated. 
 * See your course material, consult your instructor, and reference the slides for more details.
 *
 * NO additional HTML elements should be added to the index.html file.
 *
 * You may add attributes (classes, ids, etc) to the existing HTML elements, or link stylesheets or additional scripts if necessary
 *
 * SEE BELOW FOR THE CATEGORIES OF THE TYPES OF FUNCTIONS YOU WILL BE CREATING 👇
 * 
 */

/********** TEMPLATE GENERATION FUNCTIONS **********/

// These functions return HTML templates

/********** RENDER FUNCTION(S) **********/

// This function conditionally replaces the contents of the <main> tag based on the state of the store

/********** EVENT HANDLER FUNCTIONS **********/

// These functions handle events (submit, click, etc)