let imgBox = document.querySelector(".img-box")
let img = document.getElementById("img");
let canvas = document.getElementById("canvas")
let ctx = canvas.getContext("2d")
let upload = document.getElementById("upload");
let filtersInp = document.querySelectorAll("ul li input")
let saturateInp = document.getElementById("saturate");
let contrastInp = document.getElementById("contrast");
let brightnessInp = document.getElementById("brightness");
let sepiaInp = document.getElementById("sepia");
let grayscaleInp = document.getElementById("grayscale");
let blurInp = document.getElementById("blur");
let hueRotateInp = document.getElementById("hue-rotate");
let download = document.getElementById("download");
let reset = document.querySelector("span");

let dataArray = [];

if (window.localStorage.getItem("dataArray")) {
    dataArray = JSON.parse(window.localStorage.getItem("dataArray"));
    filtersInp.forEach((filter, i) => {
        filter.value = dataArray[i];
    })

}

if (window.localStorage.getItem("srcImage")) {
    img.src = window.localStorage.getItem("srcImage");
    drawCanvas();
}

setTimeout(() => {
    drawCanvas();
}, 0);

upload.oninput = function () {
    let file = new FileReader();
    file.readAsDataURL(upload.files[0]);
    file.onload = function () {
        img.src = file.result;
        resetValue()
    }
    img.onload = function () {
        drawCanvas();
        saveSourceImageOnStorage();
    }
}

filtersInp.forEach((filter) => {
    filter.oninput = drawCanvas;
})

function drawCanvas() {
    img.style.display = "none";
    canvas.width = img.width;
    canvas.height = img.height;
    changeFilter();
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    savaDataOnStorage();
}

reset.addEventListener('click', resetValue);

download.addEventListener('click', () => {
    download.href = canvas.toDataURL();
});

function changeFilter() {
    ctx.filter = `
    saturate(${saturateInp.value}%)
    contrast(${contrastInp.value}%)
    brightness(${brightnessInp.value}%)
    sepia(${sepiaInp.value}%)
    grayscale(${grayscaleInp.value})
    blur(${blurInp.value}px)
    hue-rotate(${hueRotateInp.value}deg)
    `
}

function resetValue() {
    img.style.filter = "none";
    saturateInp.value = "100";
    contrastInp.value = "100";
    brightnessInp.value = "100";
    sepiaInp.value = "0";
    grayscaleInp.value = "0";
    blurInp.value = "0";
    hueRotateInp.value = "0";
    drawCanvas();
}

function savaDataOnStorage() {
    filtersInp.forEach((filter, i) => {
        dataArray[i] = filter.value;
    })
    window.localStorage.setItem("dataArray", JSON.stringify(dataArray))
}

function saveSourceImageOnStorage() {
    window.localStorage.setItem("srcImage", img.src);
}

// window.localStorage.clear();