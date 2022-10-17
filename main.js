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

operationButtons.forEach(button => button.addEventListener('click', () => {
    choseOperation(button.innerText)
    updateDisplay()
    currentOperandTextElement.innerText = previousOperand
}))

dataAllClear.addEventListener('click', () => { 
    allClear()
    updateDisplay()
})

dataEquals.addEventListener('click', () => {
    compute()
    updateDisplay()
})

dataDelete.addEventListener('click', () => {
    deleteDigit()
    updateDisplay()
})

function append(num){
    if(num === '.' && currentOperand.includes('.'))
    return 

    currentOperand = currentOperand.toString() + num.toString()
}

function updateDisplay(){
    currentOperandTextElement.innerText = currentOperand

    if(operator)
    previousOperandTextElement.innerText = `${previousOperand} ${operator}`
   else    
    previousOperandTextElement.innerText = ''
}


function allClear(){
    previousOperand = ''
    currentOperand = ''
    operator = null
}

function choseOperation(operation){
    if(currentOperand === '')
        return
    
    if(previousOperand!== ''){
        compute()
    }
    

    operator= operation.toString()
    previousOperand = currentOperand
    currentOperand = ''

}

function compute(){
    let computation =  null

    const prev= parseFloat(previousOperand)
    const current = parseFloat(currentOperand)

    if(isNaN(prev) || isNaN(current))
    return 

    computation = operate(prev,current, operator)


    previousOperand = ''
    currentOperand = computation
    operator = undefined
}

function deleteDigit(){
currentOperand  = currentOperand.toString().slice(0,-1)
}

function operate(a,b, choice){
    switch(choice){
        case "+": return a+b
                    break
        
        case "-": return a-b
                  break
        
        case "x": return a*b
                  break

        case "÷": return a/b
                  break

        case "%": return a%b
                  break
        
        default: return
    }
}