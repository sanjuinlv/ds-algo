/* 
10. Regular Expression Matching
https://leetcode.com/problems/regular-expression-matching
Type: Hard

Given an input string s and a pattern p, implement regular expression matching with support for '.' and '*' where:

 - '.' Matches any single character.​​​​
 - '*' Matches zero or more of the preceding element.
 - The matching should cover the entire input string (not partial).

Example 1:
Input: s = "aa", p = "a"
Output: false
Explanation: "a" does not match the entire string "aa".

Example 2:
Input: s = "aa", p = "a*"
Output: true
Explanation: '*' means zero or more of the preceding element, 'a'. Therefore, by repeating 'a' once, it becomes "aa".

Example 3:
Input: s = "ab", p = ".*"
Output: true
Explanation: ".*" means "zero or more (*) of any character (.)".
 
Constraints:
 - 1 <= s.length <= 20
 - 1 <= p.length <= 20
 - s contains only lowercase English letters.
 - p contains only lowercase English letters, '.', and '*'.
 - It is guaranteed for each appearance of the character '*', there will be a previous valid character to match.
*/
/**
 * @param {string} s
 * @param {string} p
 * @return {boolean}
 */
/* 
Example Scenarios
s	    p	    Output	Explanation
------------------------------------------------------
"aa"	"a"	    false	"a" does not fully match "aa".
"aa"	"a*"	true	a* means "zero or more 'a'", which matches "aa".
"ab"	".*"	true	.* means "zero or more of any character", which matches "ab".
"aab"	"c*a*b"	true	c* disappears, a* matches "aa", b matches "b".
*/
/* 
Approach I: Iteration

Runtime: 866 ms Beats 15.82% 
Memory: 60.56 MB Beats 5.11%
*/
var isMatch = function (s, p) {
  //early return when pattern is empty
  if (p.length == 0) {
    //returns true when pattern and string is empty
    //false when string contains character with empty pattern
    return s.length == 0;
  }
  //check if curr char of string and pattern matches when string has chars
  const firstMatch = s.length > 0 && (p[0] == "." || p[0] == s[0]);
  //next char is * is in pattern
  if (p.length > 1 && p[1] == "*") {
    // if next pattern match (after *) is fine with current string, then proceed with it (s, p+2)
    // otherwise check firstMatch. That's because if we want to proceed with the current pattern, we must be sure that the current pattern char matches the char
    // If firstMatch is true, then do the recursion with next char and current pattern (s+1, p).  That's because current char matches the pattern char.
    return (
      isMatch(s, p.slice(2)) || //Ignore "*" pattern as we can match 0 or more
      (firstMatch && isMatch(s.slice(1), p)) //Use "*" if there's a match
    );
  }
  //proceed with s+1 and p+1
  return firstMatch && isMatch(s.slice(1), p.slice(1));
};

/* 
Approach II: Iteration

Runtime: 1564 ms Beats 5.01%
Memory: 53.81 MB Beats 40.18%
*/
var isMatch = function (s, p) {
  const recurse = (i, j) => {
    //we reached end of the string
    if (i == s.length && j == p.length) return true;
    // Check whether this character matches the pattern
    const isMatch = i < s.length && (p[j] == "." || s[i] == p[j]);
    // If the character after this is a * then we can either continue the pattern
    // or abort by completely skipping over both characters
    if (j + 1 < p.length && p[j + 1] == "*") {
      return recurse(i, j + 2) || (isMatch && recurse(i + 1, j));
    }
    // continue onwards with next characters of s and p
    return isMatch && recurse(i + 1, j + 1);
  };
  return recurse(0, 0);
};

/* 
Approach III: Dynamic Programming (Top Down)

Runtime: 4 ms Beats 95.09%
Memory: 57.73 MB Beats 6.09%
*/
var isMatch = function (s, p) {
  const m = s.length;
  const n = p.length;
  const memo = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(null));
  const dp = (i, j) => {
    //we reached end of the string
    if (i == m && j == n) return true;
    if (memo[i][j] != null) return memo[i][j];
    // Check whether this character matches the pattern
    const firstMatch = i < m && (p[j] == "." || s[i] == p[j]);
    // If the character after this is a * then we can either continue the pattern
    // or abort by completely skipping over both characters
    if (j + 1 < n && p[j + 1] == "*") {
      memo[i][j] = dp(i, j + 2) || (firstMatch && dp(i + 1, j));
    } else {
      memo[i][j] = firstMatch && dp(i + 1, j + 1);
    }
    // continue onwards with next characters of s and p
    return memo[i][j];
  };
  return dp(0, 0);
};

/* 
Approach IV: Dynamic Programming (Bottom Down)

Runtime: 4 ms Beats 95.09%
Memory: 57.74 MB Beats 6.09%
*/
var isMatch = function (s, p) {
  const m = s.length;
  const n = p.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(false));
  // Base case: both s and p are exhausted
  dp[m][n] = true;
  for (let i = m; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      const firstMatch = (i < m && p[j] == ".") || s[i] == p[j];
      if (j + 1 < n && p[j + 1] == "*") {
        dp[i][j] = dp[i][j + 2] || (firstMatch && dp[i + 1][j]);
      } else {
        dp[i][j] = firstMatch && dp[i + 1][j + 1];
      }
    }
  }
  return dp[0][0];
};
