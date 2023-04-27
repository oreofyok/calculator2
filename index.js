const numbers = document.querySelectorAll('.numbers');
const result = document.querySelector('.result span');
const signs = document.querySelectorAll('.sign');
const equals = document.querySelector('.equals');
const clear = document.querySelector('.clear');
const negative = document.querySelector('.negative');
const percent = document.querySelector('.percent');
const cancel = document.querySelector('.cancel');
const dot =document.querySelector('.dot');

let firstValue = "";
let isFirstValue = false;
let secondValue = "";
let isSecondValue = false;
let sign = "";
let resultValue = 0;
let passEqual = false;
let percenta = 0;


for(let i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click',(e) => {
        let atr = e.target.getAttribute('value');
        if(isFirstValue === false) {
            getFirstValue(atr)
        }
        if(isSecondValue === false) {
            getSecondValue(atr)
        }
    })
}

function getFirstValue(el) {
    
    result.innerHTML = "";
    firstValue += el;
    result.innerHTML = firstValue;
    
    firstValue = +firstValue //change secondValue to int
}

function getSecondValue(el) {
    if(firstValue != "" && sign != "") {
        secondValue += el;
        //result.innerHTML = secondValue;
        // if(passEqual === false){
        //     result.innerHTML = firstValue+sign+secondValue;
        // }
        // else if(passEqual){
            
        // }
        
        result.innerHTML = firstValue+sign+secondValue;
        
        secondValue = +secondValue; //change secondValue to int
    }
    
}

function getSign() {
    for(let i = 0; i < signs.length; i++) {
        signs[i].addEventListener('click',(e) => {
            sign = e.target.getAttribute('value');

            if(passEqual === false && firstValue != ""){ // press only first number 
                secondValue = "";
                result.innerHTML = firstValue+sign;
                isFirstValue = true;
            }
            else if(passEqual && firstValue != ""){
                secondValue = "";
                result.innerHTML = firstValue+sign;
                isFirstValue = true;
            }
            // else if(passEqual && firstValue === resultValue){
            //     secondValue = "";
            // }
            else if(passEqual === false && firstValue === ""){
                sign = "";
            
            } 
            
            
            //isFirstValue = true;
        })
    }
}

getSign();


equals.addEventListener('click',() => {
    result.innerHTML = "";
    if(sign === "+") {
        resultValue = firstValue + +secondValue;
    }else if(sign === "-") {
        resultValue = firstValue - secondValue;
    }else if(sign === "x") {
        if(secondValue != ""){
            resultValue = firstValue * secondValue;
        }
        else if(secondValue === ""){
            resultValue = firstValue;
        }
        //resultValue = firstValue * secondValue;
    }else if(sign === "/") {
        if(secondValue != ""){
            resultValue = firstValue / secondValue;
        }
        else if(secondValue === ""){
            resultValue = firstValue;
        }
        //resultValue = firstValue / secondValue;
    }
    result.innerHTML = resultValue;
    //result.innerHTML = firstValue+sign+secondValue+"="+resultValue;
    firstValue = resultValue;
    secondValue = +secondValue; //press equal to same result
    
    //secondValue = "";
    //sign = "";
    passEqual = true;
    checkResultLength();
})

function checkResultLength() {
    resultValue = JSON.stringify(resultValue);

    if(resultValue.length >= 8) {
        resultValue = JSON.parse(resultValue);
        result.innerHTML = resultValue.toFixed(2)+sign;
    }
    
}



negative.addEventListener('click',() => {
    result.innerHTML = "";
    if(firstValue != "") {
        resultValue = -firstValue;
        firstValue = resultValue;
    }
    if(firstValue != "" && secondValue != "" && sign != "") {
        resultValue = -resultValue;
    }

    result.innerHTML = resultValue;

})

percent.addEventListener('click',() => {
    result.innerHTML = "";
    if(firstValue != "" && secondValue != "" && sign === "+") {
        percenta = secondValue/100;
        percenta = firstValue * percenta;
        resultValue = firstValue + percenta;
        firstValue = resultValue;

        result.innerHTML = resultValue;
    }
    else if(firstValue != "" && secondValue != "" && sign === "-") {
        percenta = secondValue/100;
        percenta = firstValue * percenta;
        resultValue = firstValue - percenta;
        firstValue = resultValue;

        result.innerHTML = resultValue;
    }
    else if(firstValue != "" && secondValue != "" && sign === "x") {
        percenta = secondValue/25;
        //percenta = firstValue * percenta;
        resultValue = firstValue / percenta;
        firstValue = resultValue;

        result.innerHTML = resultValue;
    }
    else if(firstValue != "" && secondValue != "" && sign === "/") {
        percenta = secondValue/25;
        //percenta = firstValue * percenta;
        resultValue = firstValue * percenta;
        firstValue = resultValue;

        result.innerHTML = resultValue;
    }
    else if(firstValue != "") {
        resultValue = firstValue / 100;
        firstValue = resultValue;
        result.innerHTML = resultValue;
    }
    
})

clear.addEventListener('click',() => {
    result.innerHTML = 0;

    firstValue = "";
    isFirstValue = false;
    secondValue = "";
    isSecondValue = false;
    sign = "";
    resultValue = 0;
    passEqual = false;
})

cancel.addEventListener('click',() => {
    firstValue = firstValue.toString();
    if(firstValue != "" && firstValue.length > 1 && sign === ""){ // onlt first number
        firstValue = firstValue.replace(/\d$/, '');
        resultValue = firstValue;
        result.innerHTML = resultValue;
    }
    else if(firstValue.length === 1){ // first number left 1 len
        firstValue = "";
        result.innerHTML = 0;
    }
    else if(firstValue != "" && sign != "" && secondValue === ""){ // only first and sign
        sign = "";
        result.innerHTML = firstValue;
    }
    else if(firstValue != "" && sign != "" && secondValue != ""){ // all first, sign and second
        secondValue = secondValue.toString();
        if(secondValue.length > 1){ // second number len > 1
            secondValue = secondValue.replace(/\d$/,'');
            resultValue = secondValue;
            result.innerHTML = firstValue+sign+resultValue;
        }
        else if(secondValue.length === 1){ // second number len = 1
            secondValue = "";
            result.innerHTML = firstValue+sign;
        }
    }
    firstValue = +firstValue;
})

dot.addEventListener('click',() => {
    
    if(firstValue != "" && sign != "" && secondValue != ""){
        secondValue = secondValue / 10;
        result.innerHTML = firstValue+sign+secondValue;
    }
    else if(firstValue != "" && sign === "") {
        resultValue = firstValue / 10;
        firstValue = resultValue;
        result.innerHTML = resultValue;
    }
    else if(firstValue === ""){
        resultValue = (+resultValue +0).toFixed(1);
        result.innerHTML = resultValue;
        firstValue = resultValue;
    }
    
})