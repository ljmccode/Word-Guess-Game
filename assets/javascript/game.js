var countries = [
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

// creating variables for game  
var randomCountry = "";          
var wordAttempt = [];
var guessedLetters = [];                       
var newGame = false;        
var endOfGame = false;        
var wins = -1;
var losses = 0;
var remainingGuesses = 0;                   
var maxAttempts = 8;            

// what will happen at the start of a new game
function resetGame() {
    newGame = false;
    remainingGuesses = maxAttempts;
    guessedLetters = [];
    wordAttempt = [];

    // Choosing a random country from list
    randomCountry = Math.floor(Math.random() * (countries.length));

    

    // Build the guessing word and clear it out
    for (var i = 0; i < countries[randomCountry].length; i++) {
        wordAttempt.push(" _ ");
    }

    editScoreboard();

    document.getElementById("next-game").style.cssText = "display: none";
    document.getElementById("winning-image").style.cssText = "display: none";
    document.getElementById("losing-image").style.cssText = "display: none";

    console.log(countries[randomCountry]);
};

// puts everything on the scoreboard back to original
function editScoreboard() {

    document.getElementById("wins").innerText = wins;
    document.getElementById("losses").innerText = losses;
    document.getElementById("current-country").innerText = "";
    for (var i = 0; i < wordAttempt.length; i++) {
        document.getElementById("current-country").innerText += wordAttempt[i];
    }
    document.getElementById("remaining-lives").innerText = remainingGuesses;
    document.getElementById("guessed-letters").innerText = guessedLetters;
    if(remainingGuesses <= 0) {
        endOfGame = true;
    }
};

document.onkeydown = function(event) {
    if(endOfGame) {
        resetGame();
        endOfGame = false;
    } else {
        // establishes guess to be a lowercase letter
        if(event.keyCode >= 65 && event.keyCode <= 90) {
            guess(event.key.toLowerCase());
        }
    }
};

function guess(letter) {
    if (remainingGuesses > 0) {
        if (!newGame) {
            newGame = true;
        }

        // double checks if letter has been pressed already
        if (guessedLetters.indexOf(letter) === -1) {
            guessedLetters.push(letter);
            determineMatch(letter);
        }
    }
    
    editScoreboard();
    winorloss();
};

function determineMatch(letter) {
    // establishing an array for letters in word
    var lettersInWord = [];
    // going through letters of random country, if a match, put into lettersInWord array
    for (var i = 0; i < countries[randomCountry].length; i++) {
        if(countries[randomCountry][i] === letter) {
            lettersInWord.push(i);
        }
    }

    // if no letters in word array, remove a life
    if (lettersInWord.length <= 0) {
        remainingGuesses--;
    } else {
        // otherwise put matching letter in correct spot in word match
        for(var i = 0; i < lettersInWord.length; i++) {
            wordAttempt[lettersInWord[i]] = letter;
        }
    }
};

// if all blanks have been filled by letter, then win. 
function winorloss() {
    if(wordAttempt.indexOf(" _ ") === -1) {
        wins++;
        document.getElementById("next-game").style.cssText = "display: block; margin-right:auto; margin-left: auto";
        document.getElementById("winning-image").style.cssText = "display: block; margin-right:auto; margin-left: auto";
        document.getElementById("start-key").innerText = "";
        endOfGame = true;
// if run out of guesses, then lose
    } else if (remainingGuesses === 0) {
        losses++;
        document.getElementById("next-game").style.cssText = "display: block; margin-right:auto; margin-left: auto";
        document.getElementById("losing-image").style.cssText = "display: block; margin-right:auto; margin-left: auto";
        document.getElementById("start-key").innerText = "";
        endOfGame = true;
    }
};
 


 