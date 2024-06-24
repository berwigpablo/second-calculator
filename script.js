const numbers = Array.from(document.querySelector('.numbers').children);
const operators = Array.from(document.querySelector('.operators').children);
const display = document.querySelector('.displayText');
const clear = document.querySelector('.clear');
const operationSymbols = ['+', '-', '*', '/', 'Enter'];
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
document.addEventListener('keydown', buttonPress);
document.addEventListener('keyup', buttonPress);

function buttonPress(button){
    if(Number(button.key) || button.key === '0'){
        let buttonPress = numbers.filter(number => number.textContent === button.key);
        buttonPress[0].classList.toggle('clicked');
    } else if(button.key === ','){
        let buttonPress = numbers.filter(number => number.textContent === '.');
        buttonPress[0].classList.toggle('clicked');
    } else if(operationSymbols.includes(button.key)){
        if(button.key === '*'){
            let buttonPress = operators.filter(operator => operator.textContent === 'x');
            buttonPress[0].classList.toggle('clicked');    
        } else if(button.key === '/'){
            let buttonPress = operators.filter(operator => operator.textContent === '÷');
            buttonPress[0].classList.toggle('clicked');    
        } else if(button.key === 'Enter'){
            let buttonPress = operators.filter(operator => operator.textContent === '=');
            buttonPress[0].classList.toggle('clicked');
        }else{
            let buttonPress = operators.filter(operator => operator.textContent === button.key);
            buttonPress[0].classList.toggle('clicked');
        }
    }
}

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
        undoString = secondString.split('').splice(0, secondString.length - 1).join('');
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
            undoString = firstString.split('').splice(0, firstString.length - 1).join('');
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
    }else if(Number(event.key) || operationSymbols.includes(event.key) || event.key === '0' || event.key === ','){
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
    if(button.type === 'keydown'){
        if(button.key === ','){
            char = '.';

        } else{
            char = button.key
        }
    } else{
        char = button.textContent;
    }

    let numOfChar = firstString + operator + secondString;
    console.log(numOfChar.length);
    
    if(numOfChar.length === 30 && char === 'Enter'){
        addOperator('=');
        return
    }else if(numOfChar.length === 30){
        return
    }

    if(char === '.' && numOfChar.includes('.')){
        return
    }

    if(!button.key){
        if(button.parentNode.classList.value !== 'operators'){
            if(!operator){
                firstString += char;
                display.textContent += char;

            } else{
                secondString += char;
                display.textContent += char;
            }
        }
    } else if(Number(button.key) || button.key === '0' || button.key === ','){
        if(!operator){
            firstString += char;
            display.textContent += char;
        } else{
            secondString += char;
            display.textContent += char;
        }
    } else if(operationSymbols.includes(char)){
        
        if(char === '*'){
            addOperator('x');

        } else if(char === '/'){
            addOperator('÷');

        } else if(char === 'Enter'){
            addOperator('=');

        } else{
            addOperator(char);
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
        if(secondString === '0'){
            display.textContent = 'DIVISON BY 0 NOT ALLOWED';
            setTimeout(clearDisplay, 400);
            return
        } else{
            result = Number(firstString) / Number(secondString);
        }
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