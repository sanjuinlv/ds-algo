/**
 * @param {string} s
 * @return {string}
 */
/* 
Approach: Stack
Time: O(N)
SPace: O(N)
Runtime: 155 ms, faster than 38.89% of JavaScript online submissions for Minimum Remove to Make Valid Parentheses.
Memory Usage: 52.2 MB, less than 38.43% of JavaScript online submissions for Minimum Remove to Make Valid Parentheses.
*/
var minRemoveToMakeValid = function (s) {
  let rCount = 0;
  const stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ")") {
      //add closing brace ')' only when we have opening brace '(' in stack
      if (rCount > 0) {
        stack.push(s[i]);
        //balance it out by reducing the opening brace
        rCount--;
      }
    } else {
      //keep track of opening brace, encountered
      if (s[i] === "(") rCount++;
      stack.push(s[i]);
    }
  }
  let result = "";
  while (stack.length) {
    const char = stack.pop();
    //remove any imbalance opening braces '('
    if (rCount > 0 && char === "(") {
      rCount--;
    } else {
      result = char + result;
    }
  }
  return result;
};
