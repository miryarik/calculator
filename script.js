// variables to keep the expression to evaluate :
//      two operands and an operator
let operandLeft
let operator
let operandRight

function operate(operandLeft, operator, operandRight) {

    // perform operation on left and right operands according
    // to the operator
    // return the result

    switch (operator) {
        case '+':
            return add(operandLeft, operandRight);
            break;
        
        case '-':
            return subtract(operandLeft, operandRight);
            break;
        
        case '*':
            return multiply(operandLeft.operandRight);
            break;
        
        case '/':
            return divide(operandLeft.operandRight);
            break;
    }
}


const add = (a, b) => {
    // takes two input strings, adds them as numbers
    // returns the sum as string
    const sumString = (Number(a) + Number(b)).toString();
    return sumString;
}

const subtract = (a, b) => {
    // takes two input strings, subtracts them as numbers
    // returns the difference as string
    const differenceString = (Number(a) - Number(b)).toString();
    return differenceString;
}

const multiply = (a, b) => {
    // takes two input strings, multiplies them as numbers
    // returns the product as string
    const productString = (Number(a) * Number(b)).toString();
    return productString;
}

const divide = (a, b) => {
    // takes two input strings, divides them as numbers
    // returns the ratio as string
    const ratioString = (Number(a) / Number(b)).toString();
    return ratioString;
}

// get display
const display = document.querySelector('#display');

// clear button
const clearBtn = document.querySelector('#clear-btn');
clearBtn.onclick = () => display.innerText = '';

// attach event listener
// controls
const numKeys = document.querySelectorAll('.num-row div');

numKeys.forEach(numKey => {
    numKey.addEventListener('click', (event) => {
        display.innerText += numKey.innerText;
    })
})