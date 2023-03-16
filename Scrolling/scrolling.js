let header = document.querySelector("header");
let linkes = document.querySelectorAll("li a");
let main = document.querySelector(".main")
let stars = document.getElementById("stars")
let nouvil = document.querySelector(".nouvil")
let moon = document.getElementById("moon")
let mountain3 = document.getElementById("mountains3")
let mountain4 = document.getElementById("mountains4")
let river = document.getElementById("river")
let boat = document.getElementById("boat")

window.addEventListener("scroll", () => {
    scrolling();
})

function scrolling() {
    let value = scrollY;
    console.log(scrollY, value);
    stars.style.transform = `translateX(${value}px)`;
    nouvil.style.fontSize = `${value}px`
    if (+value >= 71) {
        nouvil.style.fontSize = `71px`;
    }
    if (value > 455) {
        nouvil.style.display = `none`;
        header.classList.add("changeBackGround");
    }
    else {
        nouvil.style.display = `block`;
        header.classList.remove("changeBackGround")
    }
    if (value >= 127)
        main.style.background = `linear-gradient(#376281,#10001f)`;
    else
        main.style.background = `linear-gradient(#200016,#10001f)`;
    moon.style.transform = `translateY(${value * 4}px)`;
    mountain3.style.transform = `translateY(${value * 2}px)`;
    mountain4.style.transform = `translateY(${value * 1.5}px)`;
    river.style.transform = `translateY(${value}px)`;
    boat.style.transform = `translate(${value * 1.9}px,${value}px)`;
}
scrolling();