// evaluateExpression("(1+((2+3)+(10/5)))")
//need to fix the two digit number issue. E.g., it will fail for
//"(1+((2+3)+(10/5)))"
var evaluateExpression = function (expression) {
  const operand = [];
  const operator = [];
  for (let s of expression) {
    console.log(`s: ${s}`);
    if (s === "(") continue;
    //operator found, add to the stack
    if (s === "+" || s === "-" || s === "*" || s === "/" || s === "sqrt") {
      operator.push(s);
      //found closing braces, evaluate the operand and last operator
    } else if (s === ")") {
      const op = operator.pop();
      const val1 = operand.pop();
      let result = 0;
      switch (op) {
        case "+":
          result = operand.pop() + val1;
          break;
        case "-":
          result = operand.pop() - val1;
          break;
        case "*":
          result = operand.pop() * val1;
          break;
        case "/":
          result = operand.pop() / val1;
          break;
        default:
          result = Math.sqrt(val1);
          break;
      }
      console.log(`result: ${result}`);
      operand.push(result);
    } else {
      //operand found, add to the stack
      operand.push(parseFloat(s));
    }
  }
  return operand.pop();
};

//evaluateExpression("(1+((2+3)+(10/5)))") => 8
var evaluateExpression = function (expression) {
  const operand = [];
  const operator = [];
  const isDigit = (char) => {
    return char - "0" >= 0 && char - "0" <= 9;
  };
  let currNumber = 0;
  for (let i = 0; i < expression.length; i++) {
    char = expression[i];
    if (char === "(") continue;
    if (isDigit(char)) {
      currNumber = currNumber * 10 + (char - "0");
    }
    if (!isDigit(char)) {
      if (isDigit(expression[i - 1])) {
        operand.push(currNumber);
        currNumber = 0;
      }
      //operator found, add to the stack
      if (
        char === "+" ||
        char === "-" ||
        char === "*" ||
        char === "/" ||
        char === "sqrt"
      ) {
        operator.push(char);
        //found closing braces, evaluate the operand and last operator
      } else if (char === ")") {
        const op = operator.pop();
        const val1 = operand.pop();
        let result = 0;
        switch (op) {
          case "+":
            result = operand.pop() + val1;
            break;
          case "-":
            result = operand.pop() - val1;
            break;
          case "*":
            result = operand.pop() * val1;
            break;
          case "/":
            result = parseInt(operand.pop() / val1);
            break;
          default:
            result = Math.sqrt(val1);
            break;
        }
        operand.push(result);
      }
    }
  }
  return operand.pop();
};
