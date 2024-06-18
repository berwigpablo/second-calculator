const numbers = Array.from(document.querySelector('.numbers').children);
const operators = Array.from(document.querySelector('.operators').children);
const display = document.querySelector('.displayText');
const clear = document.querySelector('.clear');
let char = '';
let firstString = '';
let secondString = '';

numbers.forEach(number => number.addEventListener('mousedown', buttonClick));
numbers.forEach(number => number.addEventListener('mouseup', buttonClick));
operators.forEach(operator => operator.addEventListener('mousedown', buttonClick));
operators.forEach(operator => operator.addEventListener('mouseup', buttonClick));
document.addEventListener('keydown', checkButton);

function clearDisplay(){
    display.textContent = '';
    char = '';
    firstString = '';
    secondString = '';
}

function checkButton(event){
    if(event.key === "Escape"){
        clearDisplay();
    }else if(event.parentNode.classList === "operators"){
        console.log(event);
    }else if(Number(event.key)){
        updateDisplay(event);
    }
}

function buttonClick(event){
    if(event.target.classList.value === 'clear' || event.key === "Escape"){
        clearDisplay()
    } else{
        let char = event.target;
        char.classList.toggle('clicked');

        if(event.type === "mouseup"){
            updateDisplay(char);
        };
    }
}

function updateDisplay(button){
    if(button.key){
        char = button.key
    } else{
        char = button.textContent;
    }
    console.log(char);
    console.log(button);
    firstString += char;

    display.textContent += char;
    console.log(firstString);
}