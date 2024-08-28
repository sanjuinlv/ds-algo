/*
https://leetcode.com/problems/basic-calculator-iii/
Type: Hard

Implement a basic calculator to evaluate a simple expression string.

The expression string contains only non-negative integers, '+', '-', '*', '/' operators,
and open '(' and closing parentheses ')'. The integer division should truncate toward zero.

You may assume that the given expression is always valid. All intermediate results will
be in the range of [-231, 231 - 1].

Note: You are not allowed to use any built-in function which evaluates strings as 
mathematical expressions, such as eval().

Example 1:

Input: s = "1+1"
Output: 2
Example 2:

Input: s = "6-4/2"
Output: 4
Example 3:

Input: s = "2*(5+5*2)/3+(6/2+8)"
Output: 21

Constraints:

 - 1 <= s <= 10^4
 - s consists of digits, '+', '-', '*', '/', '(', and ')'.
 - s is a valid expression.
 */
/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
  var infixToPostfix = (expression) => {
    const stack = [];
    const postfix = [];
    const top = (A) => A[A.length - 1];
    precedenceMap = { "(": 1, ")": 1, "+": 2, "-": 2, "*": 3, "/": 3 };
    for (let i = 0; i < expression.length; i++) {
      let char = expression[i];
      // for (let char of expression) {
      console.log(`char: ${char}, stack: ${stack}, postfix: ${postfix}`);
      //while the curr char is num keep parsing it as num
      //   char is operand
      if (!precedenceMap[char]) {
        let currNum = 0;
        while (!precedenceMap[char] && i < expression.length) {
          currNum = currNum * 10 + parseInt(char);
          char = expression[++i];
        }
        console.log(`currNum: ${currNum}`);
        postfix.push(currNum);
      } else {
        if (char === "(") {
          stack.push(char);
        } else {
          if (char === ")") {
            //remove items from stack until we find "("
            while (top(stack) !== "(") {
              postfix.push(stack.pop());
            }
            //finally remove "("
            stack.pop();
          } else {
            //char is operator or "("
            //pop and output tokens until one of the lower priority than 'char' is encountered
            // or a left parenthesis is encountered or stack is empty
            if (precedenceMap[char] > precedenceMap[top(stack)]) {
              stack.push(char);
            } else {
              while (precedenceMap[char] <= precedenceMap[top(stack)]) {
                postfix.push(stack.pop());
              }
              stack.push(char);
            }
          }
        }
      }
    }
    while (stack.length) {
      postfix.push(stack.pop());
    }
    return postfix;
  };

  const evalRPN = function (tokens) {
    const stack = [];
    const operatorMap = new Map();
    operatorMap.set("+", (a, b) => a + b);
    operatorMap.set("-", (a, b) => a - b);
    operatorMap.set("*", (a, b) => a * b);
    operatorMap.set("/", (a, b) => parseInt(a / b));
    for (let i = 0; i < tokens.length; i++) {
      const char = tokens[i];
      //token is operand, push it to stack
      if (!operatorMap.has(char)) {
        stack.push(char);
      } else {
        const val2 = parseInt(stack.pop());
        const val1 = parseInt(stack.pop());
        const operation = operatorMap.get(char);
        const result = operation(val1, val2);
        stack.push(result);
      }
    }
    return stack.pop();
  };
  //1. convert to postfix expression
  const postFixExpression = infixToPostfix(s);
  console.log(`postFixExpression: ${postFixExpression}`);
  //2. evaluate postfix expression
  const result = evalRPN(postFixExpression);
  console.log(`result: ${result}`);
  return result;
};

/*
"(2+6*3+5-(3*9/7+2)*5)+3" 
postFixExpression: 2,6,3,*,+,5,+,3,9,*,7,/,2,+,5,*,-,3,+
result: 3

wrong output for
"(2+6*3+5-(3*14/7+2)*5)+3"
postFixExpression: 2,6,3,*,+,5,+,3,1,14,*,7,/,2,+,5,*,-,3,+
result: -14

*/
