/*
22. Generate Parentheses
https://leetcode.com/problems/generate-parentheses/
Tyep: Medium

Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

Example 1:

Input: n = 3
Output: ["((()))","(()())","(())()","()(())","()()()"]
Example 2:

Input: n = 1
Output: ["()"]

Constraints:
1 <= n <= 8
*/
/**
 * @param {number} n
 * @return {string[]}
 */
/*
Approach: Backtracking
Our complexity analysis rests on understanding how many elements there are in generateParenthesis(n). 
This analysis is outside the scope of this article, but it turns out this is the n-th Catalan number
(1/n+1)(2n to n) which is bounded asymptotically by (4^n)/(n*sqrt(n)

Time Complexity : O(2^(2n)) Each valid sequence has at most n steps during the backtracking procedure.
In a more general sense if a program generates f(n) things, and the cost of generating each thing is c(n), 
then the program's complexity can't be better than O(c(n)f(n)). Here, f(n) = Catalan(n) and c(n) = 2n 
(creating valid combination string of length 2n)

Catalan Number: https://en.wikipedia.org/wiki/Catalan_number
https://stackoverflow.com/questions/37385964/time-complexity-for-combination-of-parentheses
https://anonymouscoders.wordpress.com/2015/07/20/its-all-about-catalan/

Space Complexity : O((4^n)/(sqrt(n))
as described above, and using O(n) space to store the sequence.

Runtime: 134 ms, faster than 7.48% of JavaScript online submissions for Generate Parentheses.
Memory Usage: 42.2 MB, less than 92.62% of JavaScript online submissions for Generate Parentheses.

Runtime: 0 ms Beats 100.00%
Memory Usage: 50.92 MB Beats 22.81%
*/
var generateParenthesis = function (n) {
  const result = [];
  const backtrack = (str, lCount, rCount) => {
    if (lCount === n && rCount === n) {
      result.push(str);
      return;
    }
    //every time we have two choices to make, i.e., "(" or ")"
    // we only add "(" if all not all counts are added, i.e, n
    if (lCount != n) {
      backtrack(str + "(", lCount + 1, rCount);
    }
    //Add ")" only when it is less than left braces count to have valid parentheses
    if (rCount < lCount) {
      backtrack(str + ")", lCount, rCount + 1);
    }
  };
  backtrack("(", 1, 0);
  return result;
};

// II: starting with empty string
/*
Runtime: 114 ms, faster than 14.93% of JavaScript online submissions for Generate Parentheses.
Memory Usage: 42.2 MB, less than 95.89% of JavaScript online submissions for Generate Parentheses.
 */
var generateParenthesis = function (n) {
  if (n === 0) return [];
  const result = [];
  const backtrack = (path, leftCount, rightCount) => {
    //base case
    if (leftCount === n && rightCount === n) {
      result.push(path);
      return;
    }
    if (leftCount < n) {
      backtrack(`${path}(`, leftCount + 1, rightCount);
    }
    if (rightCount < leftCount) {
      backtrack(`${path})`, leftCount, rightCount + 1);
    }
  };
  backtrack("", 0, 0);
  return result;
};