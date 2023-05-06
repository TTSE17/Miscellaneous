let keys = document.querySelectorAll(".key");
let whiteKeys = document.querySelectorAll(".key.white");
let blackKeys = document.querySelectorAll(".key.black");
let note;
const whiteKeysArr = ['z', 'x', 'c', 'v', 'b', 'n', 'm']
const blackKeysArr = ['s', 'd', 'g', 'h', 'j']

keys.forEach((key) => {
    key.addEventListener("click", () => {
        playNote(key);
    })
})

function playNote(key) {
    note = document.getElementById(`${key.dataset.note}`)
    // note.currentTime = 0; // Restart
    note.play();

    key.classList.add("active");

    note.addEventListener("ended", () => {
        key.classList.remove("active");
    })
}

document.addEventListener("keydown", (e) => {
    if (e.repeat)
        return
    let key = e.key;
    let whiteKeyIndex = whiteKeysArr.indexOf(key);
    let blackKeyIndex = blackKeysArr.indexOf(key);

    if (whiteKeyIndex > -1) {
        playNote(whiteKeys[whiteKeyIndex]);
    }
    if (blackKeyIndex > -1) {
        playNote(blackKeys[blackKeyIndex]);
    }
})