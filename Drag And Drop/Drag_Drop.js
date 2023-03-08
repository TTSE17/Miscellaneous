let inp = document.getElementById("inp");
let options = document.getElementById("options");
let btn = document.getElementById("btn");
let boxes = document.querySelectorAll(".box");
let dataArray
let drag = null;

if (window.localStorage.getItem("DataArray")) {
    dataArray = JSON.parse(window.localStorage.getItem("DataArray"));
    createContent()
    dragItem();
}
else
    dataArray = [[], [], [], []];

btn.onclick = addItem;

function addItem() {
    let optionValue = options.value;
    let inputValue = inp.value;
    if (inputValue.trim().length) {
        if (boxes[optionValue - 1].children.length != 0)
            dataArray[optionValue - 1][boxes[optionValue - 1].children.length - 1] = inputValue;
        else
            dataArray[optionValue - 1][boxes[optionValue - 1].children.length] = inputValue;
        saveDataArrayOnStorage();
        createContent();
        inp.value = "";
    }
    dragItem();
}

function createContent() {
    let len;
    for (let i = 0; i < 4; i++) {
        let section = boxes[i];
        section.innerHTML = "";
        let title = document.createElement("h2");
        title.textContent = `Box ${i + 1}`
        section.append(title);
        len = dataArray[i].length;
        for (let j = 0; j < len; j++) {
            let item = document.createElement("p");
            item.className = "item";
            item.setAttribute("draggable", true);
            let textValue = document.createTextNode(dataArray[i][j]);
            item.append(textValue);
            createBtnDelete(item, i, j);
            section.append(item);
        }
    }
}

function dragItem() {
    let items = document.querySelectorAll(".item");
    items.forEach((item) => {
        item.style.cursor = "grab";
        item.addEventListener("dragstart", () => {
            drag = item;
            item.style.opacity = "0.5";
        })
        item.addEventListener("dragend", () => {
            drag = null;
            item.style.opacity = "1";
        })
        boxes.forEach((box) => {
            box.addEventListener("dragover", (e) => {
                e.preventDefault();
                box.style.backgroundColor = "#090";
                box.style.color = "#fff";
            })
            box.addEventListener("dragleave", () => {
                box.style.backgroundColor = "#fff";
                box.style.color = "#000";
            })
            box.addEventListener("drop", () => {
                box.style.backgroundColor = "#fff";
                box.style.color = "#000";
                box.append(drag);
                saveTheDate();
            })
        })
    })

}

function saveTheDate() {
    boxes.forEach((ele, i) => {
        let arr = [];
        let countElement = ele.children.length;
        for (let j = 1; j < countElement; j++)
            arr[j - 1] = ele.children[j].childNodes[0].textContent;
        dataArray[i] = arr;
    })
    saveDataArrayOnStorage();
}

function saveDataArrayOnStorage() {
    window.localStorage.setItem("DataArray", JSON.stringify(dataArray));
}

function createBtnDelete(section, index, j) {
    let btnDelete = document.createElement("span");
    btnDelete.className = "delete";
    btnDelete.textContent = "-";
    btnDelete.addEventListener("click", () => {
        dataArray[index].splice(j, 1);
        createContent()
        saveDataArrayOnStorage();
    })
    section.append(btnDelete);
}


// window.localStorage.clear()
