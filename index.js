



function randomNumber(min, max) {  
    return Math.floor(Math.random() * (max - min) + min); 
} 

var ROCK = 0
var PAPER = 1
var SCISSORS = 2

var enemyValue = 0
var enemyString = "nothing yet"
var playerMemory = 15
var playerMemoryThreshold = 10
var playerMoves = []
var playerString = "nothing yet"

var win = 0
var losses = 0
var gamesPlayed = -1
var winRate = "NaN"

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

function reset() {
    win = 0
    losses = 0
    gamesPlayed = -1
    update()
}

function convertValueToString(value) {
    if (value == 0) {
        return "rock"
    }
    else if (value == 1) {
        return "paper"
    }
    else if (value == 2) {
        return "scissors"
    }
    console.log("Error: convertValueToString() not a good value")
    return "Error"
}

function predictedChoice() {
    playerPrediction = mode(playerMoves)
    if (playerPrediction == SCISSORS) {
        return ROCK
    } 
    else if (playerPrediction == ROCK) {
        return PAPER
    }
    else if (playerPrediction == PAPER) {
        return SCISSORS
    }
}

function enemyChoice() {
    if ((playerMoves.length > playerMemoryThreshold) && (winRate < .55) && (Math.random() > .8)) {
        enemyValue = predictedChoice()
    } else {
        enemyValue = randomNumber(0, 3)
    }
     
    enemyString = convertValueToString(enemyValue)
    console.log("Your opponent's next move will be " + enemyString + ".")
}

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

function updatePlayerMoves(move) {
    playerMoves.push(move)
    if (playerMoves.length > playerMemory) {
        playerMoves.shift()
    }
}

function peek() {
    document.getElementById("message").innerHTML = "Your opponent has already chosen " + enemyString + "."
}

update()