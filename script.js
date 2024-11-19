// variables to keep the expression to evaluate :
//      two operands and an operator
let operandLeft = 0;
let operator = '=';
let operandRight = NaN;

// a boolean to indicate if input should be appended to current display
// or input should replace current input
// on the next number click
let replaceDisplay = false;

// max length of contents supported by the display
const DISPLAY_MAX_LENGTH = 10;

// get display
const display = document.querySelector('#display');


function getDisplayContent() {
    // get contents of display and return as a Number
    return Number(display.innerText);
}

function setDisplayContent(num) {

    
    // force cast to number
    num = Number(num)
    
    if (isNaN(num)) {
        display.innerText = "Calling 911";

    } else if (num === Infinity) {
        display.innerText = "Bad Divisor";

    } else {
        
        // set contents of display to a string made from a given number
        let displayContents = num.toString();
        display.innerText = displayContents;

    }
}

function appendDisplayContent(string) {
    // append a given string to contents of display

    if (display.innerText.length < DISPLAY_MAX_LENGTH) {
        if (replaceDisplay) {
    
            display.innerText = '';
            display.innerText += string;
    
        } else {
    
            if (display.innerText === '0') {
                display.innerText = '';
                display.innerText += string;
            }
            else {
                display.innerText += string;
            }
    
        }
        
    }

}


function controlLength(str) {
    // function to control length of number to fit in display

    str = str.toString();

    if (str.length <= DISPLAY_MAX_LENGTH) {
        return str;
    }
    
    let num = Number(str);

    if (Number.isInteger(num)) {
        // long and integral
        return str.slice(0, DISPLAY_MAX_LENGTH);

    } else {
        // long and floating
        let intPart = Math.trunc(num).toString();
        let floatLength = Math.max((DISPLAY_MAX_LENGTH - intPart.length - 1), 0);
        let roundedNum = num.toFixed(floatLength).toString();

        return roundedNum.length > DISPLAY_MAX_LENGTH ? roundedNum.slice(0, DISPLAY_MAX_LENGTH) : roundedNum;
    }
}


function operate(operandLeft, operator, operandRight) {

    // perform operation on left and right operands according
    // to the operator
    // return the result

    switch (operator) {
        case '+':
            return add(operandLeft, operandRight);
        
        case '-':
            return subtract(operandLeft, operandRight);
        
        case '*':
            return multiply(operandLeft, operandRight);
        
        case '/':
            return divide(operandLeft, operandRight);

        default:
            setDisplayContent(operandLeft);
            return operandLeft;
    }
}



const add = (a, b) => {
    // takes two input strings, adds them as numbers
    // returns the sum as string
    const sumString = (Number(a) + Number(b));
    return controlLength(sumString);
}

const subtract = (a, b) => {
    // takes two input strings, subtracts them as numbers
    // returns the difference as string
    const differenceString = (Number(a) - Number(b));
    return controlLength(differenceString);
}

const multiply = (a, b) => {
    // takes two input strings, multiplies them as numbers
    // returns the product as string
    const productString = (Number(a) * Number(b));
    return controlLength(productString);
}

const divide = (a, b) => {
    // takes two input strings, divides them as numbers
    // returns the ratio as string
    
    if (Number(b) === 0) {
        return controlLength(Infinity);
    }

    const ratioString = (Number(a) / Number(b));
    return controlLength(ratioString);
}



// clear button
const clearBtn = document.querySelector('#clear-btn');
clearBtn.onclick = () => {
    setDisplayContent('0');
    operandLeft = 0;
    operandRight = NaN;
    operator = '=';
    replaceDisplay = false;
};

// sign button
const signBtn = document.querySelector('#sign-btn');
signBtn.onclick = () => {
    let num = getDisplayContent();
    num = operate(num, '*', -1);
    setDisplayContent(num);
}

const percentBtn = document.querySelector('#percent-btn');
percentBtn.onclick = () => {
    let num = getDisplayContent();
    num = operate(num, '/', 100);
    setDisplayContent(num);
}


// attach event listener
// controls
const numKeys = document.querySelectorAll('.num-row div');

numKeys.forEach(numKey => {
    
    if (numKey.innerText !== '.') {
        
        numKey.addEventListener('click', (event) => {
            appendDisplayContent(numKey.innerText);
            replaceDisplay = false;
        });

    } else {
        // dont allow multiple '.'

        numKey.onclick = () => {
            if (!getDisplayContent().toString().includes('.')) {
                console.log(numKey.innerText);
                appendDisplayContent(numKey.innerText);
                replaceDisplay = false;
            }
        }
    }
});



// operators
const operators = document.querySelectorAll('.operators div');

operators.forEach(opKey => {
    opKey.addEventListener('click', (event) => {
        
        // get clicked symbol
        let opSymbol = event.target.innerText;

        // = is clicked
        if (opSymbol === '=') {

            operandRight = getDisplayContent();
            operandLeft = operate(operandLeft, operator, operandRight);
            operandRight = NaN;
            setDisplayContent(operandLeft);
            operandRight = 0;
            operator = '=';
            replaceDisplay = true;
         
        } else {

            // some operator was clicked

            // expecting left operand
            if ((operator === '=')) {
                operandLeft = getDisplayContent();
                operator = opSymbol;
                setDisplayContent(0);

            } else {
                // expecting right operand
                
                if (isNaN(operandRight)) {
                    operator = opSymbol;

                } else {
                    
                    operandRight = getDisplayContent();
                    operandLeft = operate(operandLeft, operator, operandRight);
                    operandRight = NaN;
                    operator = opSymbol;
                    setDisplayContent(operandLeft);
                    replaceDisplay = true;
                }

            }
        }

    })
})