/**
 * Example store structure
 */
'use strict';

const store = {
    // 5 or more questions are required
    questions: [
        {
            question: 'Which one is NOT a hobbit?',
            answers: [
                'Frodo',
                'Bilbo',
                'Sam',
                'Sleepy'
            ],
            correctAnswer: 'Sleepy'
        },
        {
            question: 'What was the name of the dark lord?',
            answers: [
                'Doctor Evil',
                'Sauron',
                'Thanos',
                'Darth Vader'
            ],
            correctAnswer: 'Sauron'
        },
        {
            question: 'What was the name Gandalf’s sword?',
            answers: [
                'Orcrist',
                'Sting',
                'Glamdring',
                'Narsil'
            ],
            correctAnswer: 'Glamdring'
        },
        {
            question: 'What was the name of Sam’s Pony?',
            answers: [
                'Bill',
                'Rocket',
                'Lightning',
                'Bailey'
            ],
            correctAnswer: 'Bill'
        },
        {
            question: 'Which is not an alias of the balgrog that Gandalf fights in the Mines of Moria?',
            answers: [
                'The Nameless Terror',
                'Durin\'s Bane',
                'Flame of Udun',
                'Morgoth\'s Might'
            ],
            correctAnswer: 'Morgoth\'s Might'
        },
        {
            question: 'What is the name of Morgoth\'s signature warhammer?',
            answers: [
                'Grond',
                'Thrangell',
                'Gurthang',
                'The Gopher\'s Nightmare'
            ],
            correctAnswer: 'Grond'
        },
        {
            question: 'What races were Beren and Luthien, respectively?',
            answers: [
                'dwarf and elf',
                'elf and elf',
                'human and elf',
                'chipmunk and squarrel'
            ],
            correctAnswer: 'human and elf'
        }
    ],
    quizStarted: false,
    questionNumber: 0,
    score: 0,
    currentPage: '',
    currentAnswer: ''
};


function handleNextButton() {
  $('main').on('click', '#next-button', function (event) {
      if (store.questionNumber === store.questions.length - 1) {
          store.currentPage = 'final'
      } else {
          store.questionNumber++;
          store.currentPage = 'question'
      }
      render();
  });
}


function answerPage() {
  let correctAnswer = store.questions[store.questionNumber].correctAnswer;
  if (store.currentAnswer === correctAnswer) {
      store.score++
      answerTemplate = '<p>Correct!</p>'
  } else {
      answerTemplate = `<p>Sorry, wrong answer. The correct answer is ${correctAnswer}</p>`
  }

  return `<section>
      <h2 class='.score'>Your Score: ${store.score} Correct / ${store.questionNumber - store.score} Incorrect</h2>
      ${answerTemplate}
      <form action =''>
          <button id='next-button' name='next-button' type='submit'>Next</button>
      </form>
 </section> `;
}

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

function handleSubmitAnswer() {
  $('main').on('click', '#submit-answer', function(event) {
    console.log('Answer has been submitted');
    store.currentPage = 'answer';
    store.currentAnswer = $(`input[name='answers']:checked`).val();
    console.log(store.currentAnswer);
    render();
  });
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
    store.currentPage = 'question';
    console.log(`quizStarted`, store.quizStarted);
    render();
  })
}

function render() {
  if (store.quizStarted === false) { 
    $('main').html(startPage());
    console.log('displaying startPage');
  } else if (store.quizStarted) { 
    if (store.currentPage === 'question') {
      $('main').html(questionPage());
      console.log('displaying questionPage');
    } else if (store.currentPage === 'answer') {
      $('main').html(answerPage());
    } else {
      $('main').html(finalPage());
    }
  } 
}

function main() {
  render();
  handleStartQuiz();
  handleSubmitAnswer();
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
