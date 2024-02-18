'use strict';

const messageText = document.querySelector('.message');
const scoreText = document.querySelector('.score');
const highScoreText = document.querySelector('.highscore');
const guessText = document.querySelector('.number');
const guessInput = document.querySelector('.guess');
const checkBtn = document.querySelector('.check');

let score = 20;
let highScore = 0;
let guess;

const displayMessage = function (message) {
  messageText.textContent = message;
};

const generateSecretNumber = function () {
  return Math.trunc(Math.random() * 20) + 1;
};

const setBodyBackgroundColor = function (color) {
  document.querySelector('body').style.backgroundColor = color;
};

const setInitialValues = function () {
  checkBtn.removeAttribute('disabled');
  guessInput.removeAttribute('disabled');

  checkBtn.textContent = 'Check!';

  secretNumber = generateSecretNumber();

  guess = '';
  guessInput.value = guess;

  score = 20;
  scoreText.textContent = score;

  setBodyBackgroundColor('#222');
  displayMessage('Start guessing...');
  guessText.textContent = '?';
  guessText.style.width = '15rem';
};

const checkGuessNumber = function () {
  guess = Number(guessInput.value);

  if (isValidGuess()) {
    if (guess === secretNumber) {
      rightGuessSecretNumber();
    } else {
      wrongGuessSecretNumber();
    }
  } else {
    displayMessage('⛔ invalid input!');
  }
};

const isValidGuess = function () {
  return typeof guess === 'number' && guess <= 20 && guess > 0;
};

const rightGuessSecretNumber = function () {
  if (score > highScore) {
    highScore = score;
  }
  setBodyBackgroundColor('#60b347');
  guessText.textContent = secretNumber;
  displayMessage('🎉 Correct Number!');
  highScoreText.textContent = highScore;
  guessText.style.width = '30rem';
  gameOver();
};

const wrongGuessSecretNumber = function () {
  if (score > 1) {
    displayMessage(guess < secretNumber ? '📉 Too Low!' : '📈 Too High!');
    score--;
  } else {
    score = 0;
    setBodyBackgroundColor('#a71010');
    displayMessage('😭 You lost the game!');
    gameOver();
  }
  scoreText.textContent = score;
};

const gameOver = function () {
  checkBtn.setAttribute('disabled', '');
  checkBtn.textContent = 'Game Over';
  guessInput.setAttribute('disabled', '');
};

let secretNumber = generateSecretNumber();

document.querySelector('.check').addEventListener('click', checkGuessNumber);
document.querySelector('.again').addEventListener('click', setInitialValues);
