let start = document.querySelector(".control-buttons span")
let theName = document.querySelector(".name span")

start.addEventListener("click", () => {
    let n = prompt("Whats Your Name ?!") || "Unknown";
    theName.innerHTML = n;
    start.parentNode.classList.toggle("hid");
    // document.getElementById('song').play();
})

let again = document.querySelector(".again");
let agSpan = document.querySelector(".again span")
let tries = document.querySelector(".tries span")
let parent = document.querySelector(".memory-game-blocks")
let blocks = Array.from(document.querySelectorAll(".game-block"))
let alainsArray = blocks;
let fronts = document.querySelectorAll(".game-block .front")
let backs = document.querySelectorAll(".game-block .back")
let click = 0;
let counter = 0;
let arrBlock = []

blocks.forEach((block) => {
    block.onclick = function () {
        click++;
        block.classList.add("is-flipped")
        if (click == 2) {

            click = 0;
            blocks.forEach((block) => {
                if (block.classList.contains("is-flipped")) {
                    arrBlock.push(block)
                }
            })

            stopClick();

            if (arrBlock[0].getAttribute("data-technology") == arrBlock[1].getAttribute("data-technology")) {

                blocks.forEach((block) => {
                    if (block.classList.contains("is-flipped")) {
                        block.classList.remove("is-flipped")
                        block.classList.add("has-match")
                    }
                })

                setTimeout(() => {
                    document.getElementById('success').play();
                }, 1000)

                saveOnLocalStorage(tries.innerHTML);

                counter++;

                if (counter == 10) {
                    counter = 0;
                    again.classList.add("show")
                }
            }

            else {

                tries.innerHTML++;

                saveOnLocalStorage(tries.innerHTML);

                blocks.forEach((block) => {
                    setTimeout(() => {
                        block.classList.remove("is-flipped")
                    }, 1000)
                })

                setTimeout(() => {
                    document.getElementById('fail').play();
                }, 300)
            }

            arrBlock.length = 0;
        }
    }

})

agSpan.onclick = function () {

    getOfLocalStorage();

    tries.innerHTML = 0;

    agSpan.parentElement.classList.remove("show")
    start.parentElement.classList.toggle("hid")

    blocks.forEach((block) => {
        block.classList.remove("has-match")
    })
}

function stopClick() {
    parent.classList.add("no-clicking")
    setTimeout(() => {
        parent.classList.remove("no-clicking")
    }, 1300)
}

function saveOnLocalStorage(wrong) {
    let name = theName.innerHTML;
    window.localStorage.setItem("name", name)
    window.localStorage.setItem("wrong", wrong)
}

function getOfLocalStorage() {
    if (window.localStorage.getItem("name") && window.localStorage.getItem("wrong")) {
        reName.innerHTML = window.localStorage.getItem("name")
        reWrong.innerHTML = window.localStorage.getItem("wrong")
    }
}

// window.localStorage.clear()

let reName = document.querySelector(".results span:first-child")
let reWrong = document.querySelector(".results span:last-child")

getOfLocalStorage();

start.onclick = function () {

    stopClick();

    parent.innerHTML = ''

    for (let i = 0; i < 20; i++) {
        let ele = blocks[Math.floor(Math.random() * blocks.length)];
        parent.append(ele);
        blocks.splice(blocks.indexOf(ele), 1);
    }

    blocks = Array.from(document.querySelectorAll(".game-block"));

    blocks.forEach((block) => {
        setTimeout(() => {
            block.classList.add("is-flipped")
        }, 350)
    })
    blocks.forEach((block) => {
        setTimeout(() => {
            block.classList.remove("is-flipped")
        }, 3579)
    })

}

////////////////////////////////////////////////////

// document.querySelector(".control-buttons span").onclick = function () {

//     // Prompt Window To Ask For Name
//     let yourName = prompt("Whats Your Name?");

//     // If Name Is Empty
//     if (yourName == null || yourName == "") {

//         // Set Name To Unknown
//         document.querySelector(".name span").innerHTML = 'Unknown';

//         // Name Is Not Empty
//     } else {

//         // Set Name To Your Name
//         document.querySelector(".name span").innerHTML = yourName;

//     }

//     // Remove Splash Screen
//     document.querySelector(".control-buttons").remove();

// };

// // Effect Duration
// let duration = 1000;

// // Select Blocks Container
// let blocksContainer = document.querySelector(".memory-game-blocks");

// // Create Array From Game Blocks
// let blocks = Array.from(blocksContainer.children);

// // Create Range Of Keys

// // let orderRange = [...Array(blocks.length).keys()];

// let orderRange = Array.from(Array(blocks.length).keys());

// // console.log(orderRange);
// shuffle(orderRange);
// // console.log(orderRange);

// // Add Order Css Property To Game Blocks
// blocks.forEach((block, index) => {

//     // Add CSS Order Property
//     block.style.order = orderRange[index];

//     // Add Click Event
//     block.addEventListener('click', function () {

//         // Trigger The Flip Block Function
//         flipBlock(block);

//     });

// });

// // Flip Block Function
// function flipBlock(selectedBlock) {

//     // Add Class is-flipped
//     selectedBlock.classList.add('is-flipped');

//     // Collect All Flipped Cards
//     let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

//     // If Theres Two Selected Blocks
//     if (allFlippedBlocks.length === 2) {

//         // console.log('Two Flipped Blocks Selected');

//         // Stop Clicking Function
//         stopClicking();

//         // Check Matched Block Function
//         checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);

//     }

// }

// // Stop Clicking Function
// function stopClicking() {

//     // Add Class No Clicking on Main Container
//     blocksContainer.classList.add('no-clicking');

//     // Wait Duration
//     setTimeout(() => {

//         // Remove Class No Clicking After The Duration
//         blocksContainer.classList.remove('no-clicking');

//     }, duration);

// }

// // Check Matched Block
// function checkMatchedBlocks(firstBlock, secondBlock) {

//     let triesElement = document.querySelector('.tries span');

//     if (firstBlock.dataset.technology === secondBlock.dataset.technology) {

//         firstBlock.classList.remove('is-flipped');
//         secondBlock.classList.remove('is-flipped');

//         firstBlock.classList.add('has-match');
//         secondBlock.classList.add('has-match');

//         // document.getElementById('success').play();

//     }

//     else {

//         triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;

//         setTimeout(() => {

//             firstBlock.classList.remove('is-flipped');
//             secondBlock.classList.remove('is-flipped');

//         }, duration);

//         // document.getElementById('fail').play();

//     }

// }

// // Shuffle Function
// function shuffle(array) {

//     // Settings Vars
//     let current = array.length,
//         temp,
//         random;

//     while (current > 0) {

//         // Get Random Number
//         random = Math.floor(Math.random() * current);

//         // Decrease Length By One
//         current--;

//         // [1] Save Current Element in Stash
//         temp = array[current];

//         // [2] Current Element = Random Element
//         array[current] = array[random];

//         // [3] Random Element = Get Element From Stash
//         array[random] = temp;

//     }
//     return array;
// }

