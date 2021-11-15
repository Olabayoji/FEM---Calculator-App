const themes = document.querySelectorAll("input[type=radio]");
const body = document.querySelector('body');
const theme1 = document.querySelector("#theme1");
const theme2 = document.querySelector("#theme2");
const theme3 = document.querySelector("#theme3");
const display = document.querySelector(".display-container");
const buttons = document.querySelector(".button-container");
const operator = document.querySelectorAll(".operator");
let calculator ={
    displayValue: '0',
    operator: '',
    firstInput: null,
    secondInput:false
    
};

// Change theme
themes.forEach(theme => {
    theme.addEventListener('change', changeTheme)
});

function changeTheme(e) {
    const clicked = e.target.id;
    console.log(clicked);
    if (clicked == "theme1") {
        body.classList.remove("theme2", "theme3");
        body.classList.add('theme1')
    } else if (clicked == "theme2") {
        body.classList.remove("theme3", 'theme1');
        body.classList.add("theme2");
    } else if (clicked == "theme3") {
        body.classList.remove("theme2", 'theme1');
        body.classList.add("theme3");
    }
}



// buttons.addEventListener('click', (event) =>{
//         let eventValue = event.target;
//         if(eventValue.classList.contains('digit')){
//             let digit = eventValue.value;
//             inputDigit(digit);
//             updateDisplay();
//         }

//         if(eventValue.classList.contains('del')){
//             delInput();
//             updateDisplay();
//         }

//         if(eventValue.classList.contains('reset')){
//             reset();
//             updateDisplay();
//         }
//         if(eventValue.classList.contains('dot')){
//             let decimal = eventValue.value;
//             addDecimal(decimal);
//             updateDisplay();
//         }
//         if(eventValue.classList.contains('operator')){
//             let myOperator = eventValue.value;
//             operatorHandler(myOperator)
//             updateDisplay();
//         }

//     })

buttons.addEventListener('click', event => {
    const { target } = event;
    const { value } = target;
    if (!target.matches('button')) {
        return;
    }
    switch (value) {
        case '+':
        case '-':
        case '*':
        case '/':
        case '=':
          operatorHandler(value);
          break;
        case '.':
          addDecimal(value);
          break;
        case 'reset':
          reset();
          break;
        case 'del':
        delInput();
        break;
        default:
          if (target.classList.contains('digit')) {
            inputDigit(value);
          }
      }
    
      updateDisplay();
    });



// Allows keypress to work with the calculator 
document.addEventListener("keydown", function(button){
    var pressedButton = button.key;
    switch (pressedButton) {
        case '+':
        case '-':
        case '*':
        case '/':
        case 'Enter':
          operatorHandler(pressedButton);
          break;
        case '.':
          addDecimal(pressedButton);
          break;
        case 'Backspace':
        delInput();
        break;
        default:
          if (parseFloat(pressedButton) >= 0 ) {
            inputDigit(pressedButton);
          }
      }
    
      updateDisplay();
    })





// Updates display
function updateDisplay(){
    display.value = calculator.displayValue;

}

// 
function inputDigit(digit){
    let {displayValue, secondInput} = calculator;  

    if(calculator.secondInput && calculator.operator === '=' || calculator.operator === 'Enter'){
        calculator.displayValue = (displayValue === '0') ? digit : displayValue + digit;
        calculator.firstInput = null;
        calculator.secondInput = false;
    }
    if (secondInput){
        calculator.displayValue = digit;
        calculator.secondInput = false;
    }
    else{
    calculator.displayValue = (displayValue === '0') ? digit : displayValue + digit;
    }
}
// Deletes last input
function delInput(){
   calculator.displayValue = (calculator.displayValue !== '' && calculator.displayValue.length > 1) ? calculator.displayValue.slice(0, -1) : '0';
}

// Resets calculator
function reset(){
    calculator.displayValue = '0'
    calculator.operator = '';
    calculator.firstInput =  null;
    calculator.secondInput = false;
}

// Adds decimal to integer
function addDecimal(decimal){
    if (calculator.secondInput) {
        calculator.displayValue = '0.'
      calculator.secondInput = false;
    }else{
        let calculatorDisplay = calculator.displayValue;
        calculator.displayValue = (Number.isInteger(parseFloat(calculatorDisplay))) ? calculator.displayValue + decimal : calculatorDisplay;    
    }
}

//Performs evaluation that corresponds to operator 
function operatorHandler(myOperator){
    let {displayValue, operator, firstInput, secondInput} = calculator;
    let floatDisplayValue = parseFloat(displayValue);
    if (calculator.secondInput && calculator.operator !== ''){
        calculator.operator = myOperator;
    }

    if (firstInput === null && !isNaN(floatDisplayValue)) {
        calculator.firstInput = floatDisplayValue;
    }else if(firstInput !== null && operator !== '' && !secondInput){
        if (calculator.operator === '+'){
            calculator.firstInput = parseFloat((floatDisplayValue + firstInput).toFixed(7));
            calculator.displayValue = calculator.firstInput;
        }
        else if (calculator.operator === '-'){
            calculator.firstInput = parseFloat((firstInput - floatDisplayValue).toFixed(7)) ;
            calculator.displayValue = calculator.firstInput;
        }
        else if (calculator.operator === '/'){
            calculator.firstInput = parseFloat((firstInput / floatDisplayValue).toFixed(7)) ;
            calculator.displayValue = calculator.firstInput;
        }
        else if (calculator.operator === '*'){
            calculator.firstInput = parseFloat((firstInput * floatDisplayValue).toFixed(7));
            calculator.displayValue = calculator.firstInput;
        }
    }
    calculator.operator = myOperator;
    calculator.secondInput = true;
}
