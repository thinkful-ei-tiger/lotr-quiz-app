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
        `Durin's Bane`,
        'Flame of Udun',
        `Morgoth's Might`
      ],
      correctAnswer: `Morgoth's Might`
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


function answerPage() {
  let answerTemplate = '';
  let correctAnswer = store.questions[store.questionNumber].correctAnswer;
  if (store.currentAnswer === correctAnswer) {
    store.score++
    answerTemplate = `<p>${store.currentAnswer} is correct!</p>`
  } else {
    answerTemplate = `<p>Sorry, ${store.currentAnswer} is not correct. The correct answer is ${correctAnswer}</p>`
  }

  return `<section>
      <h2 class='.score'>Your Score: ${store.score} Correct / ${store.questionNumber - store.score + 1} Incorrect</h2>
      <p class='.question-number'>Question Number: ${store.questionNumber + 1} of ${store.questions.length}</p>
      ${answerTemplate}
      <form action =''>
          <button id='next-button' name='next-button' type='submit'>Next</button>
      </form>
 </section> `;
}


function handleNextButton() {
  $('main').on('click', '#next-button', function (event) {
    store.questionNumber++;
    if (store.questionNumber >= store.questions.length) {
      store.currentPage = 'final'
    } else {
      store.currentPage = 'question'
    }
    render();
  });
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



function createAnswerList() {
  let answerList = '';
  let answers = store.questions[store.questionNumber].answers;
  answers.forEach(element => {
    answerList += `<label for='submit-answer'>${element}</label> 
    <input type='radio' name="answers" value="${element}" required>`;
  });
  return answerList;
}

function handleSubmitAnswer() {
  $('main').on('click', '#submit-answer', function (event) {
    event.preventDefault();
    store.currentPage = 'answer';
    store.currentAnswer = $(`input[name='answers']:checked`).val();
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

function ranking() {
  switch(store.score) {
    case 0:
      return 'Smeagol';
    case 1: 
    case 2:
      return 'a Hobbit';
    case 3:
    case 4:
      return 'a Dwarf';
    case 5:
    case 6:
      return 'an Elf';
    case 7:
    case 8:
      return 'a Ranger';
    case 9:
    case 10:
      return 'a WIZARD!!'
  }
  
  // if (store.score === 0) {
  //   return 'Smeagol';
  // } else if (store.score < 3) {
  //   return 'a Hobbit';
  // } else if (store.score < 5) {
  //   return 'a Dwarf';
  // } else if (store.score < 7) {
  //   return 'an Elf';
  // } else if (store.score < 9) {
  //   return 'a Ranger';
  // } else {
  //   return 'a WIZARD!!'
  // }
}

function finalPage() {
  return `<section>
    <h2>Your journey is complete!</h2>
    <p>Your final score is ${store.score} Correct / ${store.questionNumber - store.score + 1} Incorrect</p>
    <p>You are ${ranking()}!</p>
    <form action="">
      <button id="play-again" name="play-again" type="submit">Play Again!</button>
    </form>
  </section>`;
}

function handlePlayAgain() {
  $('main').on('click', '#play-again', function(event) {
    store.quizStarted = false;
    store.questionNumber = 0;
    store.score = 0;
    render();
  })
}

function handleStartQuiz() {
  $('main').on('click', '#start', function (event) {
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
  handleNextButton();
  handlePlayAgain();
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
