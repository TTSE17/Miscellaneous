let clock = document.querySelector(".clock");
let sc = document.querySelector(".sc");
let mn = document.querySelector(".mn");
let hr = document.querySelector(".hr");
let mid = document.querySelector(".mid");
let time = document.querySelector(".time");
let history = document.querySelector(".history")
let mood = document.querySelector(".mood");

setInterval(() => {
    let currentDate = new Date();
    let sec = currentDate.getSeconds() * 6;
    let min = currentDate.getMinutes() * 6;
    let hor = currentDate.getHours() * 30;
    sc.style.transform = `rotate(${sec}deg)`;
    mn.style.transform = `rotateZ(${min}deg)`;
    hr.style.transform = `rotateZ(${hor + (min / 12)}deg)`;
    getTime(Math.abs(currentDate.getHours()), currentDate.getMinutes());
    getHistory(currentDate.getDate(), currentDate.getMonth(), currentDate.getFullYear());
}, 0);

function getTime(hours, minutes) {
    (hours >= 12) ? mid.innerHTML = "PM" : mid.innerHTML = "AM";
    if (hours > 12) {
        hours -= 12;
    }
    let m = (minutes >= 10) ? minutes : `0${minutes}`;
    let h = (hours >= 10) ? hours : `0${hours}`;
    time.innerHTML = `${h}:${m}`;
}

function getHistory(day, month, year) {
    let monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    history.innerHTML = `${day} ${monthName[month]}, ${year}`;
}

mood.addEventListener("click", () => {
    mood.classList.toggle("changeMood");
    if (mood.classList.contains("changeMood")) {
        document.documentElement.style.setProperty('--main-color', "#091921")
        document.documentElement.style.setProperty('--second-color', "#ccc")
        saveOnStorage("#091921", "#ccc")
    }
    else {
        document.documentElement.style.setProperty('--main-color', "#ccc")
        document.documentElement.style.setProperty('--second-color', "#091921")
        saveOnStorage("#ccc", "#091921")
    }
})

function saveOnStorage(mainColor, secondColor) {
    window.localStorage.setItem("main", mainColor);
    window.localStorage.setItem("second", secondColor);
}

if (window.localStorage.getItem("main")) {
    document.documentElement.style.setProperty('--main-color', window.localStorage.getItem("main"))
    document.documentElement.style.setProperty('--second-color', window.localStorage.getItem("second"))
    if (window.localStorage.getItem("main") == "#091921")
        mood.classList.toggle("changeMood");
}
