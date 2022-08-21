/*
https://leetcode.com/problems/evaluate-reverse-polish-notation/
Category - Medium

Evaluate the value of an arithmetic expression in Reverse Polish Notation.
Valid operators are +, -, *, and /. Each operand may be an integer or another expression.
Note that division between two integers should truncate toward zero.
It is guaranteed that the given RPN expression is always valid. That means the expression would always evaluate to a result, and there will not be any division by zero operation.

Example 1:

Input: tokens = ["2","1","+","3","*"]
Output: 9
Explanation: ((2 + 1) * 3) = 9

Example 2:

Input: tokens = ["4","13","5","/","+"]
Output: 6
Explanation: (4 + (13 / 5)) = 6

Example 3:

Input: tokens = ["10","6","9","3","+","-11","*","/","*","17","+","5","+"]
Output: 22
Explanation: ((10 * (6 / ((9 + 3) * -11))) + 17) + 5
= ((10 * (6 / (12 * -11))) + 17) + 5
= ((10 * (6 / -132)) + 17) + 5
= ((10 * 0) + 17) + 5
= (0 + 17) + 5
= 17 + 5
= 22

Constraints:

1 <= tokens.length <= 104
tokens[i] is either an operator: "+", "-", "*", or "/", or an integer in the range [-200, 200].

*/
/**
 * @param {string[]} tokens
 * @return {number}
 */

/*
Approach: Stack
Time: O(N)
Space: O(N)

Runtime: 114 ms, faster than 43.00% of JavaScript online submissions for Evaluate Reverse Polish Notation.
Memory Usage: 44.7 MB, less than 76.01% of JavaScript online submissions for Evaluate Reverse Polish Notation.
 */
var evalRPN = function (tokens) {
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
