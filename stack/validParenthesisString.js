/* 
678. Valid Parenthesis String
https://leetcode.com/problems/valid-parenthesis-string/description/
Type: Medium

Given a string s containing only three types of characters: '(', ')' and '*', return true if s is valid.

The following rules define a valid string:

Any left parenthesis '(' must have a corresponding right parenthesis ')'.
Any right parenthesis ')' must have a corresponding left parenthesis '('.
Left parenthesis '(' must go before the corresponding right parenthesis ')'.
'*' could be treated as a single right parenthesis ')' or a single left parenthesis '(' or an empty string "".
 

Example 1:
Input: s = "()"
Output: true

Example 2:
Input: s = "(*)"
Output: true

Example 3:
Input: s = "(*))"
Output: true
 
Constraints:
 - 1 <= s.length <= 100
 - s[i] is '(', ')' or '*'.
*/

/**
 * @param {string} s
 * @return {boolean}
 */
/*
Approach I: Stack
Time: O(N)
Space: O(N)

Runtime: 0 ms Beats 100.00%
Space: 52.56 MB Beats 51.44%
*/
var checkValidString = function (s) {
  //stack for open brackets
  const stack1 = [];
  //stack for asterisks
  const stack2 = [];
  const top = (A) => A[A.length - 1];
  for (let i = 0; i < s.length; i++) {
    const c = s[i];
    if (c === "(") stack1.push([c, i]);
    else if (c === "*") stack2.push([c, i]);
    else {
      //c == ")"
      //parenthesis stack has items them pop it
      if (stack1.length) stack1.pop();
      //if there is at least one "*" found
      else if (stack2.length) stack2.pop();
      //no valid parenthesis exists
      else return false;
    }
  }
  while (stack1.length) {
    const item = stack1.pop();
    //if
    if (stack2.length && top(stack2)[1] > item[1]) stack2.pop();
    else return false;
  }
  if (stack1.length == 0) return true;
};

/*
Approach II: Top Down DP - Memoization

Runtime: 2 ms Beats 11.85%
Memory: 54.82 MB Beats 8.36%
*/
var checkValidString = function (s) {
  const N = s.length;
  const memo = Array.from({ length: N }, () => new Array(N).fill(null));
  const isValidString = (i, openCount, s) => {
    //base case
    if (i === N) return openCount == 0;
    if (memo[i][openCount] != null) return memo[i][openCount];
    let isValid = false;
    //if curr char is "*" try all combination
    if (s[i] == "*") {
      //take "*" as "(" char
      isValid = isValidString(i + 1, openCount + 1, s);
      //take "*" as ")" char
      if (!isValid && openCount > 0)
        isValid = isValidString(i + 1, openCount - 1, s);
      //take "*" as empty string, i.e, ""
      if (!isValid) isValid = isValidString(i + 1, openCount, s);
    } else {
      // curr char is "("
      if (s[i] == "(") isValid = isValidString(i + 1, openCount + 1, s);
      else if (openCount > 0) isValid = isValidString(i + 1, openCount - 1, s);
    }
    memo[i][openCount] = isValid;
    return memo[i][openCount];
  };
  return isValidString(0, 0, s);
};
/*
(*) - true
(*)) - true
()*) - True
())* - False
()*)*( - false
()*)(* - true
***((( - false
)))*** - false
*/
