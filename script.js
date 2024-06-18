const numbers = Array.from(document.querySelector('.numbers').children);
const operators = Array.from(document.querySelector('.operators').children);
const display = document.querySelector('.displayText');
const clear = document.querySelector('.clear');
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
    buttonClick(event)
}

function buttonClick(event){
    console.log(event);

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
    console.log(button);
    char = button.textContent;
    firstString += char;

    display.textContent += char;
    console.log(firstString);
}