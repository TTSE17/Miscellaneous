const letters = 'abcdefghijklmnopqrstuvwxyz';
let lettersArray = Array.from(letters)

let lettersContainer = document.querySelector(".letters")

for (let i = 0; i < lettersArray.length; i++) {

    let span = document.createElement("span");
    span.innerHTML = lettersArray[i].toUpperCase();
    span.classList.add("letter-box");
    lettersContainer.appendChild(span);
}

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

document.querySelector(".category span").innerHTML = randomName;

let letterGuessContainer = document.querySelector(".letters-guess")

for (let i = 0; i < randomValueWord.length; i++) {
    let span = document.createElement("span");
    if (randomValueWord[i] == ' ') {
        span.classList.add("with-space")
    }
    span.innerHTML = randomValueWord[i].toUpperCase();
    span.classList.add("let")
    letterGuessContainer.appendChild(span)
}

let spansLetters = Array.from(document.querySelectorAll(".letters span"))
let spansWord = Array.from(document.querySelectorAll(".letters-guess span"))
let man = document.querySelector(".hangman-draw");

let counter = 0;

spansLetters.forEach((span) => {
    span.onclick = function () {
        let check = true;
        span.classList.add("clicked")
        spansWord.forEach((sWord) => {
            if (span.innerHTML == sWord.innerHTML) {
                check = false;
                sWord.classList.remove("let")
            }
        })

        if (check) {

            counter++;

            man.classList.add(`wrong-${counter}`)


            if (counter == 8) {
                endGame();
                lettersContainer.classList.add("finished")
                document.getElementById("fail").play();
            }
        }
        else {
        }

        let showAllWord = spansWord.filter((ele) => {
            return ele.classList.length == 0;
        })

        if (showAllWord.length == randomValueWord.length) {
            winGame();
            lettersContainer.classList.add("finished")
            document.getElementById("success").play();
        }
    }
})

function endGame() {
    document.querySelector(".popup").classList.add("show")
    let text = document.createTextNode(`Game Over , The Word Is ${randomValueWord}`)
    document.querySelector(".popup").prepend(text);
}

function winGame() {
    document.querySelector(".popup").classList.add("show")
    let text = document.createTextNode(`Win! , The Wrongs Is ${counter}`)
    document.querySelector(".popup").prepend(text);
}

document.querySelector(".again").onclick = function () {
    location.reload();
}