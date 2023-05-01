let row = document.querySelector(".row")
let rest = document.querySelector(".rest")
let screen = document.querySelector(".screen");
let ac = document.querySelector(".ac");
let del = document.querySelector(".del");
let div = document.querySelector(".div");
let mult = document.querySelector(".mult");
let add = document.querySelector(".add");
let sub = document.querySelector(".sub");
let equal = document.querySelector(".equal");
let digits = document.querySelectorAll(".digit")

let sum = "";
let lastNum = null;
let lastOperation = null;

digits.forEach((digit) => {
    digit.addEventListener("click", () => {
        let value = digit.innerHTML;
        if ((!(sum.includes("."))) || value != '.') {
            sum += value;
            screen.innerHTML = getDisplayNumber(sum);
        }
    })
})

function getDisplayNumber(stringNumber) {
    const integerDigits = parseFloat(stringNumber.split('.')[0])
    const decimalDigits = stringNumber.split('.')[1]
    let integerDisplay;

    if (isNaN(integerDigits) && decimalDigits == '') {
        sum = "0.";
        return `0.`;
    }

    if (isNaN(integerDigits)) {
        integerDisplay = '0'
    }
    else {
        integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 17 })
    }

    if (decimalDigits == '') {
        return `${integerDisplay}.`
    }
    else if (decimalDigits != null) {
        return `${integerDisplay}.${decimalDigits}`
    }
    else {
        return integerDisplay
    }
}

ac.addEventListener("click", () => {
    screen.innerHTML = "";
    rest.innerHTML = "";
    sum = "";
    lastNum = null;
    lastOperation = null;
})

del.addEventListener("click", () => {
    if (sum.length != 0) {
        sum = sum.slice(0, sum.length - 1);
        screen.innerHTML = getDisplayNumber(sum);
    }
})

div.addEventListener("click", () => {
    doSomething("÷");
})

mult.addEventListener("click", () => {
    doSomething("*");
})

add.addEventListener("click", () => {
    doSomething("+");
})

sub.addEventListener("click", () => {
    doSomething("-");
})

equal.addEventListener("click", () => {
    if (lastNum != null) {
        if (screen.innerHTML.length != 0) {
            let result = getResult();
            if (result == null) {
                Warning();
                return;
            }
            sum = result.toString();
            screen.innerHTML = result.toLocaleString('en', { maximumFractionDigits: 17 });
        }
        else {
            sum = lastNum;
            screen.innerHTML = (+lastNum).toLocaleString('en', { maximumFractionDigits: 17 });
        }
        lastOperation = null;
        lastNum = null;
        rest.innerHTML = "";
    }
})

function doSomething(operation) {
    // console.log(lastOperation)
    if (sum.length != 0) {
        if (lastNum != null) {
            let result = getResult();
            if (result == null) {
                Warning();
                return;
            }
            lastNum = (result.toFixed(5)).toString();
            rest.innerHTML = result.toLocaleString('en', { maximumFractionDigits: 17 }) + operation
        }
        else {
            lastNum = sum;
            rest.innerHTML = (+lastNum).toLocaleString('en', { maximumFractionDigits: 17 }) + operation;
        }

        screen.innerHTML = "";
        sum = "";
    }
    else {
        if (lastNum != null) {
            rest.innerHTML = (+lastNum).toLocaleString('en', { maximumFractionDigits: 17 });
            rest.innerHTML += operation;
        }
    }

    lastOperation = operation;
}

function getResult() {
    let num = sum;
    if (lastOperation != null && num.length) {
        let result;
        switch (lastOperation) {
            case "÷": {
                if (+num == 0) {
                    return null;
                }
                result = +(lastNum) / +(num);
                break;
            }
            case "*": {
                result = +(lastNum) * +(num);
                break;
            }
            case "+": {
                result = +(lastNum) + +(num);
                break;
            }
            case "-": {
                result = +(lastNum) - +(num);
                break;
            }
        }
        return result;
    }
}

function Warning() {
    row.classList.add("warning");
    ac.click();
    setTimeout(() => {
        alert("By Zero !");
        row.classList.remove("warning");
    }, 333);
}

