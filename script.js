const numbers = Array.from(document.querySelector('.numbers').children);
const operators = Array.from(document.querySelector('.operators').children);
const display = document.querySelector('.displayText');
const clear = document.querySelector('.clear');
let char = '';
let firstString = '';
let secondString = '';
let operator = '';
let result = 0;

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
    operator = '';
    nextOperator = '';
}

function checkButton(event){
    if(event.key === "Escape"){
        clearDisplay();
    }else if(Number(event.key)){
        updateDisplay(event);
    }
}

function buttonClick(event){
    if(event.target.classList.value === 'clear' || event.key === "Escape"){
        clearDisplay()

    }else if(event.target.parentNode.classList.value === "operators" && event.target.textContent !== '='){
        if(event.type === "mouseup"){
            addOperator(event.target.textContent);
        }
    } else{
        let char = event.target;
        char.classList.toggle('clicked');

        if(event.type === "mouseup"){
            updateDisplay(char);
        };
    }
}

function addOperator(nextOperator){
    if(operator || nextOperator === '='){
        console.log(nextOperator);
        operate(nextOperator);
    }

    operator = nextOperator;

    display.textContent += operator;
}

function updateDisplay(button){
    if(button.key){
        char = button.key

    } else{
        char = button.textContent;
    }

    if(button.parentNode.classList.value !== 'operators'){
        if(!operator){
            firstString += char;
            display.textContent += char;
            console.log(firstString);

        } else{
            secondString += char;
            display.textContent += char;
            console.log(secondString);
        }
    }
}

function operate(nextOperator){
    if(nextOperator === '=' && !operator){
        result = firstString;
        operator = '';
        console.log(nextOperator, operator);
    }

        if(operator === '+'){
            result = Number(firstString) + Number(secondString);
        } else if(operator === '-'){
            result = Number(firstString) - Number(secondString);
        } else if(operator === '÷'){
            result = Number(firstString) / Number(secondString);
        } else if(operator === 'x'){
            result = Number(firstString) * Number(secondString);
        }

        display.textContent = result;
        firstString = result;
        secondString = '';
}