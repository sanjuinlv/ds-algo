/* 
Score of Parentheses
https://leetcode.com/problems/score-of-parentheses/
Type: Medium

Given a balanced parentheses string s, return the score of the string.
The score of a balanced parentheses string is based on the following rule:
 - "()" has score 1.
 - AB has score A + B, where A and B are balanced parentheses strings.
 - (A) has score 2 * A, where A is a balanced parentheses string.

Example 1:
Input: s = "()"
Output: 1

Example 2:
Input: s = "(())"
Output: 2

Example 3:
Input: s = "()()"
Output: 2

Constraints:
 - 2 <= s.length <= 50
 - s consists of only '(' and ')'.
 - s is a balanced parentheses string.

*/
/**
 * @param {string} s
 * @return {number}
 */
//works for base cases but fails for input "((()()))"
var scoreOfParentheses = function (s) {
  let score = 0;
  const stack = [];
  let currScore = 0;
  for (let c of s) {
    if (c === "(") {
      stack.push(c);
      score += currScore;
      currScore = 0;
    } else {
      console.log(stack);
      if (currScore > 0) {
        currScore = currScore * 2;
      } else {
        currScore = 1;
      }
      stack.pop();
    }
  }
  return score;
};

/* 
Approach 1: using Stack
Every position in the string has a depth - some number of matching parentheses surrounding it.
For example, the dot in (()(.())) has depth 2, because of these parentheses: (__(.__))

Our goal is to maintain the score at the current depth we are on. When we see an opening
bracket, we increase our depth, and our score at the new depth is 0. When we see a closing
bracket, we add twice the score of the previous deeper part - except when counting (), 
which has a score of 1.

For example, when counting (()(())), our stack will look like this:

[0, 0] after parsing (
[0, 0, 0] after (
[0, 1] after )
[0, 1, 0] after (
[0, 1, 0, 0] after (
[0, 1, 1] after )
[0, 3] after )
[6] after )

Time Complexity: O(N), where NN is the length of S.
Space Complexity: O(N), the size of the stack.

Runtime: 120 ms, faster than 5.37% of JavaScript online submissions for Score of Parentheses.
Memory Usage: 42 MB, less than 63.09% of JavaScript online submissions for Score of Parentheses.
*/
var scoreOfParentheses = function (s) {
  const stack = [];
  stack.push(0);
  for (const c of s) {
    if (c === "(") {
      stack.push(0);
    } else {
      const v = stack.pop();
      const w = stack.pop();
      stack.push(w + Math.max(2 * v, 1));
    }
  }
  return stack.pop();
};

/* 
//Approach 1.1. Stack with score variable
Time Complexity: O(N), where N is the length of S.
Space Complexity: O(N), the size of the stack.

Runtime: 51 ms, faster than 61.76% of JavaScript online submissions for Score of Parentheses.
Memory Usage: 48.64 MB, less than 72.55% of JavaScript online submissions for Score of Parentheses.
*/
var scoreOfParentheses = function (s) {
  const stack = [];
  let score = 0;
  for (const c of s) {
    if (c === "(") {
      stack.push(score);
      score = 0;
    } else {
      score = stack.pop() + Math.max(2 * score, 1);
    }
  }
  return score;
};
/* 
Approach III: count cores

Intuition
The final sum will be a sum of powers of 2, as every core (a substring (), with score 1) 
will have it's score multiplied by 2 for each exterior set of parentheses that contains that core.

Algorithm
Keep track of the balance of the string, as defined in Approach #1. For every ) that
immediately follows a (, the answer is 1 << balance, as balance is the number of exterior
set of parentheses that contains this core.

Time Complexity: O(N), where N is the length of S.
Space Complexity: O(1)

Runtime: 72 ms, faster than 64.43% of JavaScript online submissions for Score of Parentheses.
Memory Usage: 41.7 MB, less than 90.60% of JavaScript online submissions for Score of Parentheses.
*/
var scoreOfParentheses = function (s) {
  let balance = 0;
  let ans = 0;
  for (let i = 0; i < s.length; i++) {
    if (s[i] === "(") {
      balance++;
    } else {
      balance--;
      if (s[i - 1] === "(") {
        ans += 1 << balance;
      }
    }
  }
  return ans;
};
