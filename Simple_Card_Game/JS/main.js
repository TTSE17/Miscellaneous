let allCards = document.querySelector(".allCards");
let openCards = document.querySelector(".openCards")
let computerCards = document.querySelector(".computerCards")
let playerCards = document.querySelector(".playerCards")
let result = document.querySelector(".result");
let againBtn = document.querySelector(".again");

const digits = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K",]
const shapes = ["♥", "♠", "♣", "♦"];

let computerValuesArray, playerValuesArray

let computerCardValue, playerCardValue;

let digitIndex, shapeIndex, value, round;

StartGame();

function StartGame() {

    allCards.classList.remove("block");
    againBtn.classList.remove("show");

    computerValuesArray = [];
    playerValuesArray = [];
    computerCardValue = null;
    round = true;

    setValues();
    updateCardsCount();
    cleanUp();
}

allCards.addEventListener("click", () => {

    if (round) {

        createRandomCard(computerValuesArray);

        createRandomCard(playerValuesArray);

        updateCardsCount();

        isWin();


        if (isGameOver())
            playAgain();

    }

    else {

        updateCardsCount();

        cleanUp();
    }

    round = !round;
    computerCardValue = null;

})

function setValues() {
    for (let i = 0; i < 26; i++) {
        getRandomValue(computerValuesArray, playerValuesArray);
        getRandomValue(playerValuesArray, computerValuesArray);
    }
}

function getRandomValue(array, array2) {
    value = "";
    while (array.includes(value) || array2.includes(value) || value == "") {
        digitIndex = Math.floor(Math.random() * digits.length);
        shapeIndex = Math.floor(Math.random() * shapes.length);
        value = digits[digitIndex] + " " + shapes[shapeIndex];
    }

    array.push(value)
}

function updateCardsCount() {
    computerCards.innerHTML = computerValuesArray.length;
    playerCards.innerHTML = playerValuesArray.length;
}

function createRandomCard(valuesArray) {

    let cardValue = valuesArray.shift();
    let type = cardValue.split(" ")[1];

    let card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = type;
    card.setAttribute("value", cardValue);

    if (type == "♦" || type == "♥")
        card.classList.add("red");

    computerCardValue == null ? computerCardValue = cardValue : playerCardValue = cardValue;

    openCards.appendChild(card);

}

function cleanUp() {
    openCards.innerHTML = ""
    result.innerHTML = "";
}

function isWin() {
    let computerNumber = computerCardValue.split(" ")[0];
    let playerNumber = playerCardValue.split(" ")[0];

    getResult(computerNumber, playerNumber);
}

function isGameOver() {

    if (playerValuesArray.length == 0) {
        result.innerHTML = "You Lose!";
        return true;
    }

    if (computerValuesArray.length == 0) {
        result.innerHTML = "You Win!"
        return true;
    }

    return false;
}

function playAgain() {
    againBtn.classList.add("show");
    allCards.classList.add("block");
    againBtn.onclick = () => {
        StartGame()
    }
}

function getResult(computerNumber, playerNumber) {

    const cardsValue = {
        "2": 2, "3": 3, "4": 4, "5": 5, "5": 5,
        "6": 6, "7": 7, "8": 8, "9": 9, "10": 10,
        "J": 11, "Q": 12, "K": 13, "A": 15,
    }

    if (cardsValue[computerNumber] == cardsValue[playerNumber]) {
        computerValuesArray.push(computerCardValue);
        playerValuesArray.push(playerCardValue);
        result.innerHTML = "Draw";
    }

    else if (cardsValue[computerNumber] > cardsValue[playerNumber]) {
        computerValuesArray.push(computerCardValue);
        computerValuesArray.push(playerCardValue);
        result.innerHTML = "Lose";
    }

    else {
        playerValuesArray.push(playerCardValue);
        playerValuesArray.push(computerCardValue);
        result.innerHTML = "Win";
    }

}




