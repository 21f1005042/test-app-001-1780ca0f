const display = document.getElementById('display');
const historyDisplay = document.getElementById('history');
let currentInput = '';
let previousInput = '';
let operation = '';

const buttons = document.querySelectorAll('.btn');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.textContent;
        handleButtonClick(value);
    });
});

function handleButtonClick(value) {
    if (value === 'C') {
        clearCurrentInput();
    } else if (value === 'AC') {
        resetCalculator();
    } else if (value === '=') {
        calculate();
    } else {
        appendToCurrentInput(value);
    }
}

function clearCurrentInput() {
    currentInput = '';
    updateDisplay();
}

function resetCalculator() {
    currentInput = '';
    previousInput = '';
    operation = '';
    updateDisplay();
    updateHistory();
}

function appendToCurrentInput(value) {
    currentInput += value;
    updateDisplay();
}

function calculate() {
    if (currentInput && operation) {
        const result = performCalculation(previousInput, currentInput, operation);
        updateHistory(`${previousInput} ${operation} ${currentInput} = ${result}`);
        currentInput = result;
        previousInput = '';
        operation = '';
        updateDisplay();
    }
}

function performCalculation(a, b, op) {
    a = parseFloat(a);
    b = parseFloat(b);
    switch (op) {
        case '+': return a + b;
        case '-': return a - b;
        case '*': return a * b;
        case '/': return a / b;
        default: return b;
    }
}

function updateDisplay() {
    display.value = currentInput;
}

function updateHistory(calculation = '') {
    if (calculation) {
        const historyItem = document.createElement('div');
        historyItem.textContent = calculation;
        historyDisplay.appendChild(historyItem);
    }
}

buttons.forEach(button => {
    if (['+', '-', '*', '/'].includes(button.textContent)) {
        button.addEventListener('click', () => {
            previousInput = currentInput;
            operation = button.textContent;
            clearCurrentInput();
        });
    }
});