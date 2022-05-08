/*
Basic Calculator II

Given a string s which represents an expression, evaluate this expression and return its value. 
The integer division should truncate toward zero.
You may assume that the given expression is always valid. All intermediate results will be 
in the range of [-2^31, 2^31 - 1].
Note: You are not allowed to use any built-in function which evaluates strings as mathematical
 expressions, such as eval().

Example 1:
Input: s = "3+2*2"
Output: 7

Example 2:
Input: s = " 3/2 "
Output: 1

Example 3:
Input: s = " 3+5 / 2 "
Output: 5 

Constraints:

1 <= s.length <= 3 * 10^5
s consists of integers and operators ('+', '-', '*', '/') separated by some number of spaces.
s represents a valid expression.
All the integers in the expression are non-negative integers in the range [0, 2^31 - 1].
The answer is guaranteed to fit in a 32-bit integer.
 */
/**
 * @param {string} s
 * @return {number}
 */
/* 
Fails for " 3+5 / 2 +5-3+4*7/9 "
" 3+5 / 2 -5-3"
*/

var calculate = function (s) {
  s = s.replace(/\s/g, "");
  const operand = [];
  const operator = [];
  let i = 0;
  while (i < s.length) {
    if (s[i] === "+" || s[i] === "-") {
      operator.push(s[i]);
    } else if (s[i] === "*" || s[i] === "/") {
      const val1 = operand.pop();
      //evaluate the previous and next operand after this operator
      const val2 = s[i + 1];
      switch (s[i]) {
        case "*":
          operand.push(val1 * val2);
          break;
        case "/":
          operand.push(parseInt(val1 / val2));
          break;
      }
      i++;
    } else {
      //numeric
      operand.push(parseInt(s[i]));
    }
    i++;
  }
  console.log(operand);
  console.log(operator);
  while (operator.length) {
    const op = operator.shift();
    const val1 = operand.shift();
    const val2 = operand.shift();
    if (op === "+") {
      operand.unshift(val1 + val2);
    } else {
      operand.unshift(val1 - val2);
    }
  }
  return operand.pop();
};

/* 
Approach: Stack 
Time: O(N)
Space: O(N)
Runtime: 108 ms, faster than 54.64% of JavaScript online submissions for Basic Calculator II.
Memory Usage: 48.4 MB, less than 34.19% of JavaScript online submissions for Basic Calculator II.
*/
var calculate = function (s) {
  s = s.replace(/\s/g, "");
  const stack = [];
  let currNum = 0;
  let operator = "+";
  const isDigit = (char) => {
    return char - "0" >= 0 && char - "0" <= 9;
  };
  for (let i = 0; i < s.length; i++) {
    if (isDigit(s[i])) {
      currNum = currNum * 10 + (s[i] - "0");
    }
    if (!isDigit(s[i]) || i == s.length - 1) {
      if (operator === "+") {
        stack.push(currNum);
      } else if (operator == "-") {
        stack.push(-currNum);
      } else if (operator === "*") {
        const result = stack.pop() * currNum;
        stack.push(result);
      } else if (operator === "/") {
        const result = parseInt(stack.pop() / currNum);
        stack.push(result);
      }
      currNum = 0;
      operator = s[i];
    }
  }
  let result = 0;
  while (stack.length) {
    result += stack.pop();
  }
  return result;
};

/* 
Approach 2: Optimized Approach without the stack
Time: O(N)
Space: O(1)
Runtime: 124 ms, faster than 35.77% of JavaScript online submissions for Basic Calculator II.
Memory Usage: 45.7 MB, less than 79.67% of JavaScript online submissions for Basic Calculator II.
*/
var calculate = function (s) {
  s = s.replace(/\s/g, "");
  const stack = [];
  let result = 0;
  let lastNumber = 0;
  let currNumber = 0;
  let operator = "+";
  const isDigit = (char) => {
    return char - "0" >= 0 && char - "0" <= 9;
  };
  for (let i = 0; i < s.length; i++) {
    if (isDigit(s[i])) {
      currNumber = currNumber * 10 + (s[i] - "0");
    }
    if (!isDigit(s[i]) || i == s.length - 1) {
      if (operator === "+") {
        result += lastNumber;
        lastNumber = currNumber;
      } else if (operator == "-") {
        result += lastNumber;
        lastNumber = -currNumber;
      } else if (operator === "*") {
        lastNumber = lastNumber * currNumber;
      } else if (operator === "/") {
        lastNumber = parseInt(lastNumber / currNumber);
      }
      currNumber = 0;
      operator = s[i];
    }
  }
  result += lastNumber;
  return result;
};
