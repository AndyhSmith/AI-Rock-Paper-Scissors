




// Constents
const ROCK = 0
const PAPER = 1
const SCISSORS = 2

var enemyValue = 0
var enemyString = "nothing yet"
var playerMemory = 14
var playerMemoryThreshold = 5
var playerMoves = []
var playerString = "nothing yet"

var similarArrayValues = []

var win = 0
var losses = 0
var gamesPlayed = -1
var winRate = "NaN"
//----------------------------------------------------
// H E L P E R   F U N C T I O N S
//----------------------------------------------------
// Random Integer Between Range
function randomNumber(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
} 

// Funtion to find mode
// from https://stackoverflow.com/questions/52898456/simplest-way-of-finding-mode-in-javascript
const mode = a => 
  Object.values(
    a.reduce((count, e) => {
      if (!(e in count)) {
        count[e] = [0, e];
      }
      
      count[e][0]++;
      return count;
    }, {})
  ).reduce((a, v) => v[0] < a[0] ? a : v, [0, null])[1];
;

function convertValueToString(value) {
    if (value == ROCK) {
        return "rock"
    }
    else if (value == PAPER) {
        return "paper"
    }
    else if (value == SCISSORS) {
        return "scissors"
    }
    return "error"
}

//----------------------------------------------------
// B U T T O N   H O O K S
//----------------------------------------------------
// (click) paper button
function paper() {
    updatePlayerMoves(PAPER)
    if (enemyValue == ROCK) {
        win += 1
    }
    else if (enemyValue == SCISSORS) {
        losses += 1
    }
    update()
}

// (click) rock button
function rock() {
    updatePlayerMoves(ROCK)
    if (enemyValue == SCISSORS) {
        win += 1
    }
    else if (enemyValue == PAPER) {
        losses += 1
    }
    update()
}

// (click) scissors button
function scissors() {
    updatePlayerMoves(SCISSORS)
    if (enemyValue == PAPER) {
        win += 1
    }
    else if (enemyValue == ROCK) {
        losses += 1
    }
    update()
}

// (click) reset button
function reset() {
    win = 0
    losses = 0
    gamesPlayed = -1
    update()
}

// (click) peek button
function peek() {
    document.getElementById("message").innerHTML = "Your opponent has already chosen " + enemyString + "."
}

//----------------------------------------------------
// P R E D I C T I O N   T O O L S
//----------------------------------------------------

function predictedChoice(guessOnNextPlayerMove) { 
    if (guessOnNextPlayerMove == SCISSORS) {
        return ROCK
    } 
    else if (guessOnNextPlayerMove == ROCK) {
        return PAPER
    }
    else if (guessOnNextPlayerMove == PAPER) {
        return SCISSORS
    }
}


function checkPattern() {
    patternFound = false;
    for (let i = 2; i < Math.floor(playerMoves.length / 2); i++) {
        let pattern = []
        let patternFollow = []
        // Build Pattern
        for (let j = 0; j < i; j++) {
            pattern.push(playerMoves[playerMoves.length - j - 1])
        }
        // Build Following Pattern
        for (let j = 0; j < i; j++) {
            patternFollow.push(playerMoves[playerMoves.length - j - 1 - i])
        }
        // Check if arrays are the same
        similarArray = true
        for (let j = 0; j < pattern.length; j++) {
            if (pattern[j] != patternFollow[j]) {
                similarArray = false
            }
        }
        if (similarArray) {
            similarArrayValues = pattern
            patternFound = true
        }
    }
    if (patternFound == true) {
        return true
    }
    return false
}

// Decide enemy next move
function enemyChoice() {
    if (checkPattern()) {
        console.log("Pattern Found!")
        enemyValue = enemyValue = predictedChoice(similarArrayValues[similarArrayValues.length - 1])
    }
    else if ((playerMoves.length > playerMemoryThreshold)) { //&& (winRate < .7) && (Math.random() > .2)) {
        let lastFewMoves = []
        // Build Pattern
        for (let j = 0; j < 3; j++) {
            lastFewMoves.push(playerMoves[playerMoves.length - j - 1])
        }
        enemyValue = predictedChoice(mode(lastFewMoves))
    } else {
        enemyValue = randomNumber(0, 3)
    }
     
    enemyString = convertValueToString(enemyValue)
    console.log("Your opponent's next move will be " + enemyString + ".")
}

function updatePlayerMoves(move) {
    playerMoves.push(move)
    if (playerMoves.length > playerMemory) {
        playerMoves.shift()
    }
}

//----------------------------------------------------
// M A I N   C O N T R O L S
//----------------------------------------------------

function update() {
    gamesPlayed += 1
    winRate = (win / (win + losses))
    document.getElementById("games").innerHTML = "Rounds: " +  gamesPlayed
    document.getElementById("win").innerHTML = "Wins: " + win
    document.getElementById("losses").innerHTML = "Losses: " + losses
    document.getElementById("win-rate").innerHTML = "Win Rate: " +  (winRate.toFixed(2) * 100).toFixed(0) + "%"
    document.getElementById("enemy").innerHTML = ""

    if (playerMoves.length > 0) {
        playerString = convertValueToString(playerMoves[playerMoves.length - 1])
        let message = "You chose " + playerString + '. Your opponent chose ' + enemyString + "."
        document.getElementById("message").innerHTML = message
    }
    
    enemyChoice()
}


