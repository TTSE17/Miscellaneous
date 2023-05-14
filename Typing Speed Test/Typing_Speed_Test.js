let words = [
    "Ability",
    "Aaccording",
    "Aadministration",
    "Ago",
    "Age",
    "All",
    "Air",
    "Allow",
    "Beautiful",
    "Bed",
    "Behavior",
    "Boy",
    "By",
    "Car",
    "Card",
    "Challenge",
    "Care",
    "Community",
    "Code",
    "Coding",
    "Cascade",
    "Country",
    "Documentation",
    "Destructuring",
    "Dependencies",
    "Funny",
    "Github",
    "Hello",
    "Internet",
    "Javascript",
    "Programming",
    "Town",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Leetcode",
    "Python",
    "Scala",
    "Paradigm",
    "Styling",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Playing",
    "Us",
    "Understand",
    "You",
    "Yourself",
    "Yes",
    "Tree",
    "Treatment",
    "To",
    "Throughout",
    "Through",
    "Style",
    "Successful",
    "Such",
    "Speak",
    "Soon",
    "Responsibility",
    "Rest",
    "Remember",
    "Red",
    "Question",
    "Put",
    "Property",
    "Prove",
    "Professional",
    "Per",
    "Organization",
    "Our",
    "Operation",
    "N't",
    "Newspaper",
    "Working",
    "Window",
    "War",
    "Watch"
];

let words2 = words;

let startButton = document.querySelector(".start")
let lvlNameSpan = document.querySelector(".message .lvl")
let secondsSpan = document.querySelector(".message .seconds")
let theWord = document.querySelector(".the-word")
let upcomingWords = document.querySelector(".upcoming-words")
let input = document.querySelector(".input")
let timeLeftSpan = document.querySelector('.time span')
let scoreGot = document.querySelector(".score .got")
let scoreTotal = document.querySelector('.score .total');
let finishMessage = document.querySelector(".finish")
let select = document.querySelector("select")
let again = document.querySelector(".again");

const lvls = {
    "Easy": 5,
    "Normal": 3,
    "Hard": 2
}

let defaultLevelName = select.value
let defaultLevelSeconds = lvls[defaultLevelName]

lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;

filterArray();

function filterArray() {

    words = words2;

    if (select.value == 'Easy') {
        words = words.filter((e) => {
            return e.length < 5;
        });
    }

    else if (select.value == 'Normal') {
        words = words.filter((e) => {
            return e.length < 7;
        });
    }

    scoreTotal.innerHTML = words.length
}

input.onpaste = function () {
    return false;
}

select.oninput = function () {
    defaultLevelName = select.value;
    defaultLevelSeconds = lvls[defaultLevelName]

    lvlNameSpan.innerHTML = defaultLevelName;
    secondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;

    filterArray();
}

startButton.onclick = function () {

    input.focus();
    input.value = "";

    timeLeftSpan.innerHTML = +(lvls[defaultLevelName]) + 3

    this.classList.add("remove")
    select.classList.add("remove")

    getWords();

    counter();
}

function getWords() {

    let wordRandom = words[Math.floor(Math.random() * words.length)]
    theWord.innerHTML = wordRandom;
    words.splice(words.indexOf(wordRandom), 1)

    upcomingWords.innerHTML = ''
    for (let i = 0; i < words.length; i++) {
        let div = document.createElement("div");
        div.innerHTML = words[i];
        upcomingWords.appendChild(div)
    }
}

function counter() {
    input.oninput = function () {

        if (input.value.toLowerCase() == theWord.innerHTML.toLowerCase()) {

            timeLeftSpan.innerHTML = defaultLevelSeconds;
            scoreGot.innerHTML++;
            input.value = ''

            if (words.length == 0) {

                clearInterval(c);

                getResult("win");

                saveOnLocalStorage()

                restoreData()

                show();

            }
            else {
                getWords()
            }
        }
    }

    let c = setInterval(() => {

        timeLeftSpan.innerHTML--;

        if (timeLeftSpan.innerHTML == '0') {

            clearInterval(c);

            getResult("lose")

            saveOnLocalStorage();

            restoreData()

            show();
        }
    }, 1000);

}

function getResult(result) {
    let span = document.createElement("span")
    let spanText;
    if (result == 'win') {
        span.classList = 'good';
        spanText = document.createTextNode("Gongrats")
    }

    else {
        span.classList = 'bad';
        spanText = document.createTextNode("Game Over")
    }

    span.appendChild(spanText)

    finishMessage.appendChild(span)

    input.classList.toggle("remove");
    upcomingWords.classList.add("remove")
    theWord.innerHTML = '';
}

function saveOnLocalStorage() {
    let score = scoreGot.innerHTML;
    let date = (new Date().getHours()) + ':' + new Date().getMinutes();
    let level = defaultLevelName;
    window.localStorage.setItem("score", score)
    window.localStorage.setItem("level", level);
    window.localStorage.setItem("date", date)
}

function restoreData() {
    if (window.localStorage.getItem('level')) {
        let spans = document.querySelectorAll('.result span')
        spans[0].innerHTML = window.localStorage.getItem("date")
        spans[1].innerHTML = window.localStorage.getItem("level");
        spans[2].innerHTML = window.localStorage.getItem("score")
    }
}

function show() {

    again.classList.toggle("show");

    again.onclick = function () {
        window.location.reload();
    }
}

restoreData();



// window.localStorage.clear()
