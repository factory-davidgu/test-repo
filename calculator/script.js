const resultEl = document.getElementById('result');
const expressionEl = document.getElementById('expression');

let currentValue = '0';
let previousValue = null;
let pendingOperator = null;
let justEvaluated = false;

const operatorSymbols = {
  add: '+',
  subtract: '−',
  multiply: '×',
  divide: '÷',
};

function updateDisplay() {
  resultEl.textContent = formatForDisplay(currentValue);
  expressionEl.textContent =
    previousValue !== null && pendingOperator
      ? `${formatForDisplay(previousValue)} ${operatorSymbols[pendingOperator]}`
      : '';
}

function formatForDisplay(value) {
  const num = Number(value);
  if (Number.isNaN(num)) return 'Error';
  if (!Number.isFinite(num)) return 'Error';

  // Preserve trailing decimal point / zeros while typing.
  if (typeof value === 'string' && (value.endsWith('.') || /\.\d*0$/.test(value))) {
    return value;
  }

  const str = num.toString();
  if (str.length > 12) {
    return num.toPrecision(8).replace(/\.?0+$/, '').replace(/\.?0+e/, 'e');
  }
  return str;
}

function inputDigit(digit) {
  if (justEvaluated) {
    currentValue = digit === '.' ? '0.' : digit;
    justEvaluated = false;
    updateDisplay();
    return;
  }

  if (digit === '.') {
    if (!currentValue.includes('.')) {
      currentValue += '.';
    }
  } else if (currentValue === '0') {
    currentValue = digit;
  } else {
    currentValue += digit;
  }
  updateDisplay();
}

function compute(a, b, operator) {
  const x = parseFloat(a);
  const y = parseFloat(b);
  switch (operator) {
    case 'add':
      return x + y;
    case 'subtract':
      return x - y;
    case 'multiply':
      return x * y;
    case 'divide':
      return y === 0 ? NaN : x / y;
    default:
      return y;
  }
}

function setOperator(operator) {
  if (pendingOperator && previousValue !== null && !justEvaluated) {
    const result = compute(previousValue, currentValue, pendingOperator);
    currentValue = String(result);
  }
  previousValue = currentValue;
  pendingOperator = operator;
  justEvaluated = true; // next digit starts a fresh number
  updateDisplay();
}

function equals() {
  if (pendingOperator === null || previousValue === null) return;
  const result = compute(previousValue, currentValue, pendingOperator);
  currentValue = String(result);
  previousValue = null;
  pendingOperator = null;
  justEvaluated = true;
  updateDisplay();
}

function clearAll() {
  currentValue = '0';
  previousValue = null;
  pendingOperator = null;
  justEvaluated = false;
  updateDisplay();
}

function negate() {
  if (currentValue === '0') return;
  currentValue = currentValue.startsWith('-') ? currentValue.slice(1) : `-${currentValue}`;
  updateDisplay();
}

function percent() {
  currentValue = String(parseFloat(currentValue) / 100);
  updateDisplay();
}

document.querySelectorAll('[data-digit]').forEach((btn) => {
  btn.addEventListener('click', () => inputDigit(btn.dataset.digit));
});

document.querySelectorAll('[data-action]').forEach((btn) => {
  btn.addEventListener('click', () => {
    const action = btn.dataset.action;
    if (action === 'clear') clearAll();
    else if (action === 'negate') negate();
    else if (action === 'percent') percent();
    else if (action === 'equals') equals();
    else setOperator(action);
  });
});

window.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') inputDigit(e.key);
  else if (e.key === '.') inputDigit('.');
  else if (e.key === '+') setOperator('add');
  else if (e.key === '-') setOperator('subtract');
  else if (e.key === '*') setOperator('multiply');
  else if (e.key === '/') {
    e.preventDefault();
    setOperator('divide');
  } else if (e.key === 'Enter' || e.key === '=') equals();
  else if (e.key === 'Escape') clearAll();
  else if (e.key === '%') percent();
  else if (e.key === 'Backspace') {
    currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : '0';
    updateDisplay();
  }
});

updateDisplay();
