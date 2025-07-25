/* 
20. Valid Parentheses
https://leetcode.com/problems/valid-parentheses/
Type: Easy

Given a string s containing just the characters '(', ')', '{', '}', '[' and ']', 
determine if the input string is valid.

An input string is valid if:

Open brackets must be closed by the same type of brackets.
Open brackets must be closed in the correct order.

Example 1: 
Input: s = "()"
Output: true

Example 2: 
Input: s = "()[]{}"
Output: true

Example 3: 
Input: s = "(]"
Output: false

Example 4: 
Input: s = "([)]"
Output: false

Example 5: 
Input: s = "{[]}"
Output: true

Contraint:
 - 1 <= s.length <= 10^4
 - s consists of parentheses only '()[]{}'.
*/

/**
 * @param {string} s
 * @return {boolean}
 */

/*
Approach I: Using Stack
Idea is to keep adding the closing braces for openning braces encountered and when 
closing braces char is encountere the top of stack should have the same char otherwise its invalid parenthesis
Runtime: 84 ms, faster than 46.15% of JavaScript online submissions for Valid Parentheses.
Memory Usage: 39.2 MB, less than 41.60% of JavaScript online submissions for Valid Parentheses.
 */
var isValid = function (s) {
  const stack = [];
  for (let char of s) {
    if (char == "(") {
      stack.push(")");
    } else if (char == "{") {
      stack.push("}");
    } else if (char == "[") {
      stack.push("]");
    } else if (stack.length == 0 || stack.pop() != char) {
      return false;
    }
  }
  return stack.length == 0 ? true : false;
};

/*
Approach II: Stack with braces Map
Runtime: 84 ms, faster than 46.15% of JavaScript online submissions for Valid Parentheses.
Memory Usage: 39 MB, less than 51.90% of JavaScript online submissions for Valid Parentheses.
 */
var isValid = function (s) {
  const stack = [];
  const charMap = new Map();
  charMap.set(")", "(");
  charMap.set("}", "{");
  charMap.set("]", "[");
  for (let char of s) {
    if (charMap.has(char)) {
      if (stack.length == 0 || stack.pop() != charMap.get(char)) {
        return false;
      }
    } else {
      stack.push(char);
    }
  }
  return stack.length == 0 ? true : false;
};
