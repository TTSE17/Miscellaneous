let title = document.querySelector(".title")
let ul = document.querySelector("ul")
let reload = document.querySelector(".reload");

function onLine() {
    title.innerHTML = "Online Now";
    title.style.color = "green";
    ul.style.display = "none";
    reload.style.display = "none";
}

function offLine() {
    title.innerHTML = "OffLine Now"
    title.style.color = "red";
    ul.style.display = "block";
    reload.style.display = "block";
}

window.addEventListener("load", () => {
    if (window.navigator.onLine)
        onLine();
    else
        offLine();
})

window.addEventListener("online", () => {
    onLine();
})

window.addEventListener("offline", () => {
    offLine();
})

reload.addEventListener("click", () => {
    window.location.reload();
})