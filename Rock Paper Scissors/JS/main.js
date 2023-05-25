let options = document.querySelectorAll("button:not(.reset)");
let selections = document.querySelector(".selections");
let player = document.querySelector(".player")
let computer = document.querySelector(".computer")
let results = document.querySelectorAll("tbody td")
let reset = document.querySelector(".reset");

let playerChoice = "";
let computerChoice = "";
let TheWinner = "";

let object = {
    "rock": "✊",
    "paper": "✋",
    "scissors": "✌",
}

let score = {
    "player": 0,
    "draw": 0,
    "computer": 0,
}

resoteValuesFromStorage();

StartTheGame();

function StartTheGame() {

    options.forEach((option) => {
        option.addEventListener("click", () => {

            playerChoice = option.getAttribute("choice")
            computerChoice = getRandomChoice();
            TheWinner = getWinner();

            displayWinner();

            score[TheWinner]++;

            displayScore();

            saveValuesOnStorage();

        })
    })

}

reset.addEventListener("click", resetScore)

function getRandomChoice() {

    let randomIndex = Math.floor(Math.random() * 3)
    let choices = Object.keys(object);

    return choices[randomIndex]

}

function getWinner() {
    if (computerChoice == playerChoice)
        return "draw";

    if (computerChoice == "rock" && playerChoice == "scissors")
        return "computer";

    if (computerChoice == "paper" && playerChoice == "rock")
        return "computer";

    if (computerChoice == "scissors" && playerChoice == "paper")
        return "computer";

    return "player";

}

function displayWinner() {

    player.innerHTML = "";
    computer.innerHTML = "";
    player.style.cssText = "opacity:0.555";
    computer.style.cssText = "opacity:0.555";

    player.innerHTML = object[playerChoice]
    computer.innerHTML = object[computerChoice];

    if (TheWinner == "computer")
        computer.style.removeProperty("opacity")

    else if (TheWinner == "player")
        player.style.removeProperty("opacity");

}

function displayScore() {
    let values = Object.values(score);
    results.forEach((result, i) => {
        result.innerHTML = values[i];
    })
}

function resetScore() {
    score.player = score.draw = score.computer = 0;
    player.innerHTML = computer.innerHTML = ""
    saveValuesOnStorage()
    displayScore();
}

function saveValuesOnStorage() {
    window.localStorage.setItem("score", JSON.stringify(score))
}

function resoteValuesFromStorage() {
    if (window.localStorage.getItem("score")) {
        score = JSON.parse(window.localStorage.getItem("score"))
    }
    displayScore();
}

// window.localStorage.clear()