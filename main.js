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
}))

operationButtons.forEach(button => button.addEventListener('click', () => {
    choseOperation(button.innerText)
    currentOperandTextElement.innerText = previousOperand
}))

dataAllClear.addEventListener('click', () => { 
    allClear()
})

dataEquals.addEventListener('click', () => {
    compute()
})

dataDelete.addEventListener('click', () => {
    deleteDigit()
})

window.addEventListener('keydown', handleKeyboardInput)


function append(num){
    if(num === '.' && currentOperand.includes('.'))
    return 

    currentOperand = currentOperand.toString() + num.toString()
    updateDisplay()
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
    updateDisplay()
}

function choseOperation(operation){

    if(currentOperand === '' && previousOperand!== '' && operator!=null)
    { operator= operation.toString()
        updateDisplay()
        return
    }

    if(currentOperand === '')
        return
    
    if(previousOperand!== ''){
        compute()
    }
    

    operator= operation.toString()
    previousOperand = currentOperand
    currentOperand = ''
    updateDisplay()
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
    updateDisplay()
}

function deleteDigit(){
currentOperand  = currentOperand.toString().slice(0,-1)
updateDisplay()
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

function handleKeyboardInput(e){

    console.log(e.key)

    if( (e.key>=0 && e.key<=9) || (e.key==='.')){
        append(e.key)
    }

    else if(e.key==='+' || e.key==='-' || e.key==='%'){
        choseOperation(e.key)
        currentOperandTextElement.innerText = previousOperand
    }
        
    else if(e.key==='x' || e.key==='*'){
        choseOperation('x')
        currentOperandTextElement.innerText = previousOperand
    }

    else if(e.key==='/' || e.key==='÷'){
        choseOperation('÷')
        currentOperandTextElement.innerText = previousOperand
    }

    else if(e.key==='=' || e.key==='Enter'){
        compute()
    }

    else if(e.key==='Backspace'){
        deleteDigit()
    }

    else if(e.key==='Escape'){
        allClear()
    }

}