const numbers = Array.from(document.querySelector('.numbers').children);
const operators = document.querySelector('.operators').children;

numbers.forEach(number => number.addEventListener('mousedown', buttonClick));
numbers.forEach(number => number.addEventListener('click', buttonClick));


function buttonClick(event){
    let button = event.target;
    button.classList.toggle('clicked');
}