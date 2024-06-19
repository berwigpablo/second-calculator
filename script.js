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

function undo(){
    let undoString = '';

    if(secondString){
        undoString = secondString.split('').splice(1, secondString.length - 1).join('');
        secondString = undoString;
        
        display.textContent = firstString + operator + secondString;

    } else if(operator){
        operator = '';
        display.textContent = firstString;

    } else if(firstString){
        if(firstString.length === 1){
            firstString = '';
            display.textContent = '';

        }else{
            console.log(firstString);
            undoString = firstString.split('').splice(1, firstString.length - 1).join('');
            firstString = undoString;

            display.textContent = firstString;
        }

    } else{
        return
    }
}

function checkButton(event){
    if(event.key === "Escape"){
        clearDisplay();
    }else if(event.key === "Backspace"){
        undo();
    }else if(Number(event.key)){
        updateDisplay(event);
    }
}

function buttonClick(event){
    if(event.target.classList.value === 'clear' || event.key === "Escape"){
        clearDisplay()

    }else if(event.target.parentNode.classList.value === "operators"){
        if(event.type === "mouseup"){
            addOperator(event.target.textContent);
            event.target.classList.toggle('clicked');
        } else{
            event.target.classList.toggle('clicked');
        }
    }else{
        let char = event.target;
        char.classList.toggle('clicked');

        if(event.type === "mouseup"){
            updateDisplay(char);
        };
    }
}

function addOperator(nextOperator){
    if(operator || nextOperator === '='){
        operate(nextOperator);
    } else if(firstString){
        operator = nextOperator;
        display.textContent += operator;
    }
}

function updateDisplay(button){
    if(button.key){
        char = button.key
        console.log(button);
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
        nextOperator = '';
        return

    }else if(nextOperator === '=' && operator && !secondString){
        result = firstString
        operator = '';
        display.textContent = result
        return
    }

    if(nextOperator && !secondString){
        return
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

    if(nextOperator !== '='){
        operator = nextOperator;
        display.textContent = result + operator;
        firstString = result.toString();

    } else if(nextOperator === '='){
        operator = '';
        nextOperator = '';
        display.textContent = result;
        firstString = result.toString();
    }

    firstString = result.toString();
    secondString = '';
}