/* 
Basic Calculator

https://leetcode.com/problems/basic-calculator/description/
Type: Hard

Given a string s representing a valid expression, implement a basic calculator to evaluate it, and return the result
 of the evaluation.
Note: You are not allowed to use any built-in function which evaluates strings as
 mathematical expressions, such as eval().

Example 1:

Input: s = "1 + 1"
Output: 2
Example 2:

Input: s = " 2-1 + 2 "
Output: 3
Example 3:

Input: s = "(1+(4+5+2)-3)+(6+8)"
Output: 23

Constraint:
1 <= s.length <= 3 * 105
s consists of digits, '+', '-', '(', ')', and ' '.
s represents a valid expression.
'+' is not used as a unary operation (i.e., "+1" and "+(2 + 3)" is invalid).
'-' could be used as a unary operation (i.e., "-1" and "-(2 + 3)" is valid).
There will be no two consecutive operators in the input.
Every number and running calculation will fit in a signed 32-bit integer.
*/

/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
  s = s.replace(/\s/g, "");
  const precedenceMap = new Map();
  precedenceMap.set("(", 0);
  precedenceMap.set(")", 0);
  precedenceMap.set("+", 1);
  precedenceMap.set("-", 1);
  precedenceMap.set("*", 2);
  precedenceMap.set("/", 2);
  const ops = [];
  const values = [];
  const eval = (operator, val1, val2) => {
    if (operator === "+") return val1 + val2;
    if (operator === "-") return val1 - val2;
    if (operator === "*") return val1 * val2;
    if (operator === "/") return parseInt(val1 / val2);
  };

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    //char is digit
    if (!precedenceMap.has(char)) {
      values.push(parseInt(char));
      continue;
    }
    //token is an operator
    while (true) {
      // the last condition ensures that the operator with higher precedence is evaluated first
      if (
        ops.length === 0 ||
        char === "(" ||
        precedenceMap.get(char) > precedenceMap.get(ops[ops.length - 1])
      ) {
        ops.push(char);
        break;
      }
      // evaluate expression (lower precedence operators)
      const operator = ops.pop();
      //ignore "(" operator
      if (operator === "(") {
        continue;
      } else {
        const val2 = values.pop();
        const val1 = values.pop();
        values.push(eval(operator, val1, val2));
      }
    }
  }
  console.log(values);
  console.log(ops);
  while (ops.length) {
    const val2 = values.pop();
    const val1 = values.pop();
    const op = ops.pop();
    values.push(eval(op, val1, val2));
  }
  return values.pop();
};

// without handling '-' and '/'
var calculate = function (s) {
  s = s.replace(/\s/g, "");
  const precedenceMap = new Map();
  precedenceMap.set("(", 0);
  precedenceMap.set(")", 0);
  precedenceMap.set("+", 1);
  precedenceMap.set("-", 1);
  const ops = [];
  const values = [];
  const eval = (operator, val1, val2) => {
    if (operator === "+") return val1 + val2;
    if (operator === "-") return val1 - val2;
  };

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    console.log(`char: ${char}`);
    //char is digit
    if (!precedenceMap.has(char)) {
      values.push(parseInt(char));
      continue;
    }
    //token is an operator
    while (true) {
      // the last condition ensures that the operator with higher precedence is evaluated first
      if (
        ops.length === 0 ||
        char === "(" ||
        precedenceMap.get(char) > precedenceMap.get(ops[ops.length - 1])
      ) {
        ops.push(char);
        break;
      }
      // evaluate expression (lower precedence operators)
      const op = ops.pop();
      //ignore "(" operator
      if (op === "(") {
        break;
      } else {
        const val2 = values.pop();
        const val1 = values.pop();
        console.log(`op: ${op}, val1: ${val1}, val2: ${val2}`);
        values.push(eval(op, val1, val2));
        console.log(values);
        console.log(ops);
      }
    }
  }
  console.log(values);
  console.log(ops);
  while (ops.length) {
    const op = ops.pop();
    const val2 = values.pop();
    const val1 = values.pop();
    console.log(`op: ${op}, val1: ${val1}, val2: ${val2}`);
    values.push(eval(op, val1, val2));
  }
  return values.pop();
};

// fixing the multi digit number
// fails for: "1-(-2)"
var calculate = function (s) {
  s = s.replace(/\s/g, "");
  if (s[0] == "-") {
    s = "0" + s;
  }
  const precedenceMap = new Map();
  precedenceMap.set("(", 0);
  precedenceMap.set(")", 0);
  precedenceMap.set("+", 1);
  precedenceMap.set("-", 1);
  const ops = [];
  const values = [];
  const eval = (operator, val1, val2) => {
    if (operator === "+") return val1 + val2;
    if (operator === "-") return val1 - val2;
  };

  let currNum = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    console.log(`char: ${char}`);
    //char is digit
    if (!precedenceMap.has(char)) {
      currNum = currNum * 10 + (char - "0");
      console.log(`currNum: ${currNum}`);
      if (i == s.length - 1 || precedenceMap.has(s[i + 1]))
        values.push(currNum);
      continue;
    }
    //token is an operator
    if (precedenceMap.has(char)) {
      console.log(values);
      currNum = 0;
      while (true) {
        // the last condition ensures that the operator with higher precedence is evaluated first
        if (
          ops.length === 0 ||
          char === "(" ||
          precedenceMap.get(char) > precedenceMap.get(ops[ops.length - 1])
        ) {
          ops.push(char);
          break;
        }
        // evaluate expression (lower precedence operators)
        const op = ops.pop();
        //ignore "(" operator
        if (op === "(") {
          break;
        } else {
          const val2 = values.pop();
          const val1 = values.pop();
          console.log(`op: ${op}, val1: ${val1}, val2: ${val2}`);
          values.push(eval(op, val1, val2));
          console.log(values);
          console.log(ops);
        }
      }
    }
  }
  console.log(values);
  console.log(ops);
  while (ops.length) {
    const op = ops.pop();
    const val2 = values.pop();
    const val1 = values.pop();
    console.log(`op: ${op}, val1: ${val1}, val2: ${val2}`);
    values.push(eval(op, val1, val2));
  }
  return values.pop();
};

//for submission
var calculate = function (s) {
  s = s.replace(/\s/g, "");
  if (s[0] == "-") {
    s = "0" + s;
  }
  const precedenceMap = new Map();
  precedenceMap.set("(", 0);
  precedenceMap.set(")", 0);
  precedenceMap.set("+", 1);
  precedenceMap.set("-", 1);
  const ops = [];
  const values = [];
  const eval = (operator, val1, val2) => {
    if (operator === "+") return val1 + val2;
    if (operator === "-") return val1 - val2;
  };

  let currNum = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    //char is digit
    if (!precedenceMap.has(char)) {
      currNum = currNum * 10 + (char - "0");
      if (i == s.length - 1 || precedenceMap.has(s[i + 1]))
        values.push(currNum);
      continue;
    }
    //token is an operator
    if (precedenceMap.has(char)) {
      currNum = 0;
      while (true) {
        // the last condition ensures that the operator with higher precedence is evaluated first
        if (
          ops.length === 0 ||
          char === "(" ||
          precedenceMap.get(char) > precedenceMap.get(ops[ops.length - 1])
        ) {
          ops.push(char);
          break;
        }
        // evaluate expression (lower precedence operators)
        const op = ops.pop();
        //ignore "(" operator
        if (op === "(") {
          break;
        } else {
          const val2 = values.pop();
          const val1 = values.pop();
          values.push(eval(op, val1, val2));
        }
      }
    }
  }
  while (ops.length) {
    const op = ops.pop();
    const val2 = values.pop();
    const val1 = values.pop();
    values.push(eval(op, val1, val2));
  }
  return values.pop();
};
