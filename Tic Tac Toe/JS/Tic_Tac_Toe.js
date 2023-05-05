let mainSection = document.querySelector(".main-section");
let cells = document.querySelectorAll(".cell")
let message = document.querySelector(".message");
let playAgain = document.querySelector(".message button")
let results = document.querySelectorAll("tbody td");
let reset = document.querySelector(".reset")

let currentPlayer;
let winnersArray = [0, 0, 0];

startGame();

function startGame() {

    if (window.localStorage.getItem("winners")) {
        winnersArray = JSON.parse(window.localStorage.getItem("winners"));
    }

    showResults();

    currentPlayer = 1;

    changePlayer();

    cells.forEach((cell) => {
        cell.classList.remove("o");
        cell.classList.remove("x");

        cell.addEventListener(("click"), () => {
            if (!cell.classList.contains("x") && !cell.classList.contains("o")) {

                if (currentPlayer)
                    cell.classList.add("x");
                else
                    cell.classList.add("o")

                checkTheEnd();

                currentPlayer = Math.abs(currentPlayer - 1);
                // currentPlayer = currentPlayer ? 0 : 1;
                // currentPlayer = !currentPlayer;

                changePlayer();
            }
        }) //, { once: true }

    })
}

function changePlayer() {
    if (currentPlayer) {
        mainSection.classList.remove("o");
        mainSection.classList.add("x");
    }
    else {
        mainSection.classList.remove("x");
        mainSection.classList.add("o");
    }
}

function checkTheEnd() {

    let currentPlayerClass = currentPlayer ? "x" : "o";

    let numbers = "";
    cells.forEach((cell, i) => {
        if (cell.classList.contains(currentPlayerClass))
            numbers += i;
    })

    let winning = checkWin(numbers);

    if (winning) {
        gameover();
    }

    else if (numbers.length == 5)
        gameover("D");
}

function checkWin(numbers) {
    let correctArr = ["012", "345", "678", "036", "147", "258", "048", "246"];
    return correctArr.some((e1) => {
        return (Array.from(e1)).every((e2) => {
            return numbers.includes((e2));
        })
    })
}

function gameover(mess = "") {
    message.classList.add("show");

    let winner = message.children[0];

    if (mess != "") {
        winner.innerHTML = "Draw!";
        winnersArray[2]++;
    }
    else {
        winner.innerHTML = `${currentPlayer ? "X" : "O"}'s Win!`;
        winnersArray[currentPlayer]++;
    }

    saveWinner();

    playAgain.addEventListener("click", () => {
        // window.location.reload();
        startGame();
        message.classList.remove("show");
    })
}

function saveWinner() {
    window.localStorage.setItem("winners", JSON.stringify(winnersArray))
}

function showResults() {
    results[0].innerHTML = winnersArray[0]
    results[1].innerHTML = winnersArray[2]
    results[2].innerHTML = winnersArray[1]
}

reset.addEventListener("click", () => {
    winnersArray = [0, 0, 0];
    saveWinner();
    showResults();
})


