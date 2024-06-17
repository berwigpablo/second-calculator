const numbers = Array.from(document.querySelector('.numbers').children);
const operators = Array.from(document.querySelector('.operators').children);
const display = document.querySelector('.displayText');
let firstString = '';
let secondString = '';


numbers.forEach(number => number.addEventListener('mousedown', buttonClick));
numbers.forEach(number => number.addEventListener('mouseup', buttonClick));
operators.forEach(operator => operator.addEventListener('mousedown', buttonClick));
operators.forEach(operator => operator.addEventListener('mouseup', buttonClick));

function buttonClick(event){
    let char = event.target;
    char.classList.toggle('clicked');

    if(event.type === "mouseup"){
        updateDisplay(char);
    };
}

function updateDisplay(button){
    char = button.textContent;
    firstString += char;

    display.textContent += char;
    console.log(firstString);
}