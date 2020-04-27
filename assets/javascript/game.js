// array of countries to be guessed
const countries = [
    "argentina",
    "brazil",
    "croatia",
    "denmark",
    "ecuador",
    "germany",
    "guatemala",
    "indonesia",
    "hungary",
    "morocco",
    "norway",
    "panama",
    "portugal",
    "romania",
    "singapore",
    "switzerland",
    "thailand",
    "turkey",
    "ukraine",
    "zimbabwe"
];

// variables for game
let randomCountry = "";
let wordAttempt = [];
let guessedLetters = [];
let endOfGame = false;
let wins = 0;
let losses = 0;
let remainingGuesses = 0;
const maxAttempts = 8;

// New game starts on page load
window.onload = () => {
    document.getElementById("wins").innerText = wins;
    document.getElementById("losses").innerText = losses;
    resetGame();
};

// what will happen at the start of a new game
function resetGame() {
    remainingGuesses = maxAttempts;
    guessedLetters = [];
    wordAttempt = [];

    // choosing a random country from list
    randomCountry = Math.floor(Math.random() * (countries.length));

    // Putting blanks for randomly chosen word
    for (let i = 0; i < countries[randomCountry].length; i++) {
        wordAttempt.push(" _ ");
    }

    editScoreboard();
    
    // puts everything on the scoreboard back to original
    document.getElementById("next-game").style.cssText = "display: none";
    document.getElementById("winning-image").style.cssText = "display: none";
    document.getElementById("losing-image").style.cssText = "display: none";

    console.log(countries[randomCountry]);
}

// Updates Scoreboard
function editScoreboard() {
    document.getElementById("current-country").innerText = "";
    // Turns wordAttempt Array to string
    const wordString = wordAttempt.join("");
    document.getElementById("current-country").innerText = wordString[0].toUpperCase() + wordString.slice(1);
    document.getElementById("remaining-lives").innerText = remainingGuesses;
    document.getElementById("guessed-letters").innerText = guessedLetters;
    if(remainingGuesses <= 0) {
        endOfGame = true;
    }

}


document.onkeydown = function(event) {
    if(endOfGame) {
        resetGame();
        endOfGame = false;
    } else {
        // establishes guess to be a lowercase letter
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            guess(event.key.toLocaleLowerCase());
        }
    }
};

function guess(letter) {
    if (remainingGuesses > 0) {
        // double checks if letter has been pressed already
        if (guessedLetters.indexOf(" " + letter) === -1) {
            guessedLetters.push(" " + letter);
            determineMatch(letter);
        }
    }
    editScoreboard();
    winOrLoss();
}

function determineMatch(letter) {
    // establising an array for letters in word
    const lettersInWord = [];
    for (let i = 0; i < countries[randomCountry].length; i++) {
        if(countries[randomCountry][i] === letter) {
            lettersInWord.push(i);
        }
    }
    // if no letters in word array, remove remaining guesses
    if (lettersInWord.length <= 0) {
        remainingGuesses--;
    } else {
        // otherwise put matching letter in correct spot in word match
        for(let i = 0; i < lettersInWord.length; i++) {
            wordAttempt[lettersInWord[i]] = letter;
        }
    }
}
// if all blanks have been filled by letter, then win. 
function winOrLoss() {
    if(wordAttempt.indexOf(" _ ") === -1 && guessedLetters.length > 0) {
        wins++;
        document.getElementById("wins").innerText = wins;
        document.getElementById("next-game").style.cssText = "display: block; margin-right:auto; margin-left: auto";
        document.getElementById("winning-image").style.cssText = "display: block; margin-right:auto; margin-left: auto";
        document.getElementById("start-key").innerText = "";
        document.getElementById("winning-audio").play();
        endOfGame = true;
// if run out of guesses, then lose
    } else if (remainingGuesses === 0 && guessedLetters.length > 0) {
        losses++;
        document.getElementById("losses").innerText = losses;
        document.getElementById("next-game").style.cssText = "display: block; margin-right:auto; margin-left: auto";
        document.getElementById("losing-image").style.cssText = "display: block; margin-right:auto; margin-left: auto";
        document.getElementById("start-key").innerText = "";
        document.getElementById("current-country").innerText = countries[randomCountry][0].toUpperCase() + countries[randomCountry].slice(1);
        document.getElementById("losing-audio").play();
        endOfGame = true;
    }
}