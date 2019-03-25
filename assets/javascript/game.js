
// Variables
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

var randomCountry = "";
var incorrect = [];
var letterArray = [];
var blanks = 0
var wordProgess = []

var wins = 0;
var losses = 0;
var remainingLives = 12;
 

function start() {
    // generating random word
    var randomCountry = countries[Math.floor(Math.random() * countries.length)];

    // separating current country letters into new array
    letterArray = randomCountry.split("");

    // assigning blanks to number of letters in word
    blanks = letterArray.length;

    // displays _ for each letter of current country
    for (var i = 0; i < blanks; i++) {
        wordProgess.push("_");
    }

    // displaying word on the page, joining them into a string
    document.getElementById("current-country").innerHTML = " " + wordProgess.join(" ")

    console.log(randomCountry);
    console.log(letterArray);
    console.log(blanks);
    console.log(wordProgress);
}

// Checking if user guess correctly/incorrectly
function determineMatch(userGuess) {
    var letterMatch = false;
    for (var i = 0; i < blanks; i++) {
        // if a letter guessed matches, add letter to word
        if (randomCountry[i] == userGuess) {
            letterMatch = true;
        }
    }
    if (letterMatch) {
        for (var i = 0; i < blanks; i++) {
            if (randomCountry[i] == userGuess) {
                wordProgess[i] = userGuess;
            }
        }
    else {
            incorrect.push(userGuess);
            remainingLives--;
        }
    document.getElementById("remainging-lives").innerHTML = " " + remainingLives;
    document.getElementById("current-country").innerHTML = " " + wordProgress.join(" ");
    console.log(wordProgess);
    }

    // Reset Function, lives return, erases letters guessed
    function reset() {
        remainingLives = 12;
        wordProgess = [];
        incorrect = [];
        start();
    }


    // Function if there is a win or a loss
    function endOfGame() {
        // when letters in country all match up to letters guessed, win
        if (letterArray.toString() == wordProgess.toString()) {
            wins++
            // updates wins in HTML
            document.getElementById("wins").innerHTML = " " + wins;
            reset()
            // when no more lives, loss
        } else if (remainingLives === 0) {
            losses++;
            document.getElementById("losses").innerHTML = " " + losses;
        }
    }



    // Beginning new game function
    start() 

    document.onkeyup = function (event) {
        var userGuess = event.key;
        determineMatch(userGuess);
        endOfGame();
        document.getElementById("guessedLetters").innterHTML = " " + incorrect.join(" ");
    }
