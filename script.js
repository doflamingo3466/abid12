const question = document.getElementById("question");
const answer = document.getElementById("answer");
let firstNumber = "",
  secondNumber = "",
  operator = "",
  enteringSecondNumber = false;

document
  .querySelector(".buttons")
  .addEventListener("click", ({ target: button }) => {
    if (button.dataset.number !== undefined) {
      if (enteringSecondNumber) secondNumber += button.dataset.number;
      else firstNumber += button.dataset.number;
      showQuestion();
    } else if (button.dataset.operator) {
      if (firstNumber) {
        operator = button.dataset.operator;
        enteringSecondNumber = true;
        showQuestion();
      }
    } else if (button.dataset.action === "equals") calculate();
    else if (button.dataset.action === "clear") clearCalculator();
  });

function showQuestion() {
  question.textContent =
    firstNumber + (operator ? ` ${operator} ${secondNumber}` : "");
}

function calculate() {
  if (!firstNumber || !secondNumber || !operator) {
    answer.textContent = "Enter a calculation";
    return;
  }

  const a = Number(firstNumber),
    b = Number(secondNumber);
  if (operator === "/" && b === 0) {
    answer.textContent = "Cannot divide by 0";
    return;
  }

  answer.textContent = { "+": a + b, "-": a - b, "*": a * b, "/": a / b }[
    operator
  ];
}

function clearCalculator() {
  firstNumber = secondNumber = operator = "";
  enteringSecondNumber = false;
  question.textContent = answer.textContent = "0";
}
