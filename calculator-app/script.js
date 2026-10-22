(function () {
  const currentEl = document.getElementById("current");
  const historyEl = document.getElementById("history");
  const keys = document.querySelectorAll(".key");

  let currentValue = "0";
  let previousValue = null;
  let pendingOp = null;
  let justEvaluated = false;

  const MAX_DIGITS = 15;

  function formatDisplay(value) {
    if (value === "Error") return value;
    const num = Number(value);
    if (!isFinite(num)) return "Error";

    if (String(value).endsWith(".")) return value;

    const abs = Math.abs(num);
    if (abs !== 0 && (abs >= 1e15 || abs < 1e-9)) {
      return num.toExponential(6);
    }

    let str = num.toString();
    if (str.length > MAX_DIGITS) {
      str = num.toPrecision(10).replace(/\.?0+$/, "");
    }
    return str;
  }

  function render() {
    currentEl.textContent = formatDisplay(currentValue);
    historyEl.textContent =
      previousValue !== null && pendingOp
        ? `${formatDisplay(previousValue)} ${pendingOp}`
        : "\u00a0";

    keys.forEach((k) => k.classList.remove("active-op"));
    if (pendingOp) {
      const opKey = document.querySelector(`[data-op="${pendingOp}"]`);
      if (opKey) opKey.classList.add("active-op");
    }
  }

  function pulse() {
    currentEl.classList.remove("pulse");
    void currentEl.offsetWidth;
    currentEl.classList.add("pulse");
  }

  function inputDigit(d) {
    if (justEvaluated) {
      currentValue = d;
      justEvaluated = false;
    } else if (currentValue === "0") {
      currentValue = d;
    } else if (currentValue.replace("-", "").replace(".", "").length < MAX_DIGITS) {
      currentValue += d;
    }
    render();
  }

  function inputDecimal() {
    if (justEvaluated) {
      currentValue = "0.";
      justEvaluated = false;
    } else if (!currentValue.includes(".")) {
      currentValue += ".";
    }
    render();
  }

  function clearAll() {
    currentValue = "0";
    previousValue = null;
    pendingOp = null;
    justEvaluated = false;
    render();
  }

  function negate() {
    if (currentValue === "0") return;
    currentValue = currentValue.startsWith("-")
      ? currentValue.slice(1)
      : "-" + currentValue;
    render();
  }

  function percent() {
    currentValue = String(Number(currentValue) / 100);
    render();
  }

  function compute(a, b, op) {
    switch (op) {
      case "+": return a + b;
      case "−": return a - b;
      case "×": return a * b;
      case "÷": return b === 0 ? NaN : a / b;
      default: return b;
    }
  }

  function chooseOperator(op) {
    const value = Number(currentValue);

    if (pendingOp && previousValue !== null && !justEvaluated) {
      const result = compute(previousValue, value, pendingOp);
      previousValue = result;
      currentValue = isFinite(result) ? String(result) : "Error";
    } else {
      previousValue = value;
    }

    pendingOp = op;
    justEvaluated = false;
    render();
  }

  function equals() {
    if (pendingOp === null || previousValue === null) return;
    const value = Number(currentValue);
    const result = compute(previousValue, value, pendingOp);
    currentValue = isFinite(result) ? String(result) : "Error";
    previousValue = null;
    pendingOp = null;
    justEvaluated = true;
    pulse();
    render();
  }

  keys.forEach((key) => {
    key.addEventListener("click", () => {
      const { num, op, action } = key.dataset;
      if (num !== undefined) inputDigit(num);
      else if (op !== undefined) chooseOperator(op);
      else if (action === "clear") clearAll();
      else if (action === "negate") negate();
      else if (action === "percent") percent();
      else if (action === "decimal") inputDecimal();
      else if (action === "equals") equals();
    });
  });

  const KEY_OP_MAP = { "+": "+", "-": "−", "*": "×", "/": "÷" };

  window.addEventListener("keydown", (e) => {
    if (e.key >= "0" && e.key <= "9") {
      inputDigit(e.key);
    } else if (e.key === ".") {
      inputDecimal();
    } else if (KEY_OP_MAP[e.key]) {
      chooseOperator(KEY_OP_MAP[e.key]);
    } else if (e.key === "Enter" || e.key === "=") {
      e.preventDefault();
      equals();
    } else if (e.key === "Backspace") {
      currentValue = currentValue.length > 1 ? currentValue.slice(0, -1) : "0";
      render();
    } else if (e.key === "Escape") {
      clearAll();
    } else if (e.key === "%") {
      percent();
    }
  });

  render();
})();
