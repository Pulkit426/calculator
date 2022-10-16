const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const dataDelete = document.querySelector('[data-delete]')
const dataAllClear = document.querySelector('[data-all-clear]')
const dataEquals = document.querySelector('[data-equals]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')


var currentOperand = ''
var previousOperand = ''
var operator = null

numberButtons.forEach(button => button.addEventListener('click', () => {
append(button.innerText)
updateDisplay()
}))

dataAllClear.addEventListener('click', () => { 
    allClear()
    updateDisplay()})

function append(num){
    if(num === '.' && currentOperand.includes('.'))
    return 

    currentOperand = currentOperand.toString() + num.toString()
}

function updateDisplay(){
    currentOperandTextElement.innerText = currentOperand
    previousOperandTextElement.innerText = previousOperand
}


function allClear(){
    previousOperand = ''
    currentOperand = ''
    operator = null
}



function add(a,b){
    return a+b
}

function subtract(a,b){
    return a-b
}

function multiply(a,b){
    return a*b
}

function divide(a,b){
    return a/b
}

function operate(a,b, choice){
    switch(choice){
        case "+": return add(a,b)
                    break
        
        case "-": return subtract(a,b)
                  break
        
        case "*": return multiply(a,b)
                  break

        case "/": return divide(a,b)
                  break
    }
}