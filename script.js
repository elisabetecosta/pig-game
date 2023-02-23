'use strict';

// Selects the DOM elements
const player0 = document.querySelector('.player--0');
const player1 = document.querySelector('.player--1');
const player0Score = document.getElementById('score--0');
const player1Score = document.getElementById('score--1');
const player0CurrentScore = document.getElementById('current--0');
const player1CurrentScore = document.getElementById('current--1');

const dice = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');


// Initializes the variables
let scores, currentScore, activePlayer, gameIsBeingPlayed;

// Calls the init function
init();


// Adds a click event to the roll button and if the game is being played calls the rollDice and checkDice functions
btnRoll.addEventListener('click', () => {

    // Checks if the game is being played
    if (gameIsBeingPlayed) {

        rollDice();
        checkDice();
    }
});

// Adds a click event to the hold button and if the game is being played and the current score is different from 0, calls the holdScore function 
btnHold.addEventListener('click', () => { if (gameIsBeingPlayed && currentScore !== 0) holdScore() });

// Adds a click event to the new button and calls the init function
btnNew.addEventListener('click', init);


// ===== FUNCTIONS =====

// Sets everything to their initial values/states
function init() {

    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    gameIsBeingPlayed = true;

    player0Score.textContent = 0;
    player1Score.textContent = 0;
    player0CurrentScore.textContent = 0;
    player1CurrentScore.textContent = 0;

    // Hides the dice, removes the winner class for both players and adds the active player class to the first player and removes it from the second
    dice.classList.add('hidden');
    player0.classList.remove('player--winner');
    player1.classList.remove('player--winner');
    player0.classList.add('player--active');
    player1.classList.remove('player--active');
}


// Generates a random number between 1 and 6 and sets the dice image to match the number rolled, also returns the value of the random number so it can be stored and used outside the function
function rollDice() {

    const diceRollValue = Math.trunc(Math.random() * 6) + 1;

    dice.classList.remove('hidden');
    dice.setAttribute('src', `images/dice-${diceRollValue}.png`);

    return diceRollValue;
}


// Calls the rollDice function and checks the number rolled, updating the current score if the number is NOT 1 or switching the player if the number is 1
function checkDice() {

    const rolledDice = rollDice();

    // If the rolled dice is not 1, adds the value of the rolled dice to the current score 
    if (rolledDice !== 1) {

        currentScore += rolledDice;
        document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    }
    // If the rolled dice is 1, switches the active player
    else {

        switchPlayer();
    }
}


// Resets the current score and switches the active player by toggling the active player class between the two players
function switchPlayer() {

    // Resets the score for the active player
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = currentScore;

    // If active player is 0, changes to 1, if not changes to 0
    activePlayer = activePlayer === 0 ? 1 : 0;

    // Adds the "active player" class to the current player and removes it from the previous one
    player0.classList.toggle('player--active');
    player1.classList.toggle('player--active');
}


// Adds the current score to the total score of the active player and checks if the player has won the game, if not it calls the switchPlayer function
function holdScore() {

    const activePlayerTotalScore = document.getElementById(`score--${activePlayer}`);

    // Adds the current score to the total score and displays the total score
    scores[activePlayer] += currentScore;
    activePlayerTotalScore.textContent = scores[activePlayer];

    // If total score is >= 100, the current player wins and the game ends
    if (scores[activePlayer] >= 100) {

        gameIsBeingPlayed = false;

        // Adds the hidden class to the dice
        dice.classList.add('hidden');

        const winner = document.querySelector(`.player--${activePlayer}`);

        // Removes the "activer player" class and adds the "winner player" class
        winner.classList.remove('player--active');
        winner.classList.add('player--winner');
    }

    // If the total score is < 100, switches the active player
    else {

        switchPlayer();
    }
}