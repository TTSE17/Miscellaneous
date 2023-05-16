let mainSection = document.querySelector(".main-section");
let category = document.querySelector(".category span");
let man = document.querySelector(".hangman-draw");
let lettersContainer = document.querySelector(".letters")
let letterGuessContainer = document.querySelector(".letters-guess")
let popup = document.querySelector(".popup");

createLetters();

let letters = Array.from(document.querySelectorAll(".letters span"))

const words = {
    programming: ["php", "javascript", "go", "scala", "fortran", "r", "mysql", "python"],
    movies: ["Prestige", "Inception", "Parasite", "Interstellar", "Whiplash", "Memento", "Coco", "Up"],
    people: ["Albert Einstein", "Hitchcock", "Alexander", "Cleopatra", "Mahatma Ghandi"],
    countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"]
}

let allKeys = Object.keys(words);
let randomNumber = Math.floor(Math.random() * allKeys.length);
let randomName = allKeys[randomNumber];
let randomValue = words[randomName];
let randomValueWord = randomValue[Math.floor(Math.random() * randomValue.length)];

category.innerHTML = randomName;

cerateWord();

function createLetters() {
    const letters = 'abcdefghijklmnopqrstuvwxyz';
    let lettersArray = Array.from(letters)
    for (let i = 0; i < lettersArray.length; i++) {
        let span = document.createElement("span");
        span.innerHTML = lettersArray[i].toUpperCase();
        span.classList.add("letter-box");
        lettersContainer.appendChild(span);
    }
}

function cerateWord() {
    for (let i = 0; i < randomValueWord.length; i++) {
        let span = document.createElement("span");
        if (randomValueWord[i] == ' ') {
            span.classList.add("with-space")
        }
        span.innerHTML = randomValueWord[i].toUpperCase();
        span.classList.add("let")
        letterGuessContainer.appendChild(span)
    }
}

let TheWord = Array.from(document.querySelectorAll(".letters-guess span"))

let counter = 0;

letters.forEach((span) => {
    span.onclick = function () {

        let check = true;

        span.classList.add("clicked")

        TheWord.forEach((letter) => {
            if (span.innerHTML == letter.innerHTML) {
                check = false;
                letter.classList.remove("let")
            }
        })

        if (check) {

            counter++;

            man.classList.add(`wrong-${counter}`)

            if (counter == 8) {
                endGame(false);
                lettersContainer.classList.add("finished")
            }
        }

        let showAllWord = TheWord.filter((ele) => {
            return ele.classList.length == 0;
        })

        if (showAllWord.length == randomValueWord.length) {
            endGame(true);
            lettersContainer.classList.add("finished")
        }
    }
})

function endGame(status) {
    mainSection.classList.add("show");
    popup.classList.add("show");
    let text;
    if (status)
        text = document.createTextNode(`Win! , The Wrongs Is ${counter}`)
    else
        text = document.createTextNode(`Game Over , The Word Is ${randomValueWord}`)
    popup.prepend(text);
}

document.querySelector(".again").onclick = function () {
    location.reload();
}