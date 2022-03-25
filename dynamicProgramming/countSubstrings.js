/*
Given a string s, return the number of palindromic substrings in it.
A string is a palindrome when it reads the same backward as forward.
A substring is a contiguous sequence of characters within the string.

Example 1:
Input: s = "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".

Example 2:
Input: s = "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".

Constraint:
    - 1 <= s.length <= 1000
    - s consists of lowercase English letters.
 */
/**
 * @param {string} s
 * @return {number}
 */
/* 
Approach: Dynamic Programming
Time: O(N^2)
Space: O(N^2)
Runtime: 158 ms, faster than 34.17% of JavaScript online submissions for Palindromic Substrings.
Memory Usage: 70.5 MB, less than 14.11% of JavaScript online submissions for Palindromic Substrings.
*/

var countSubstrings = function (s) {
  const N = s.length;
  const dp = [...Array(N)].map((X) => new Array(N).fill(0));
  let palindromeCount = 0;
  //each character of string will be palindrome itself
  for (let i = 0; i < N; i++) {
    dp[i][i] = 1;
    palindromeCount++;
  }

  for (let i = 0; i < N - 1; i++) {
    const j = i + 1;
    if (s[i] === s[j]) {
      dp[i][j] = 1;
      palindromeCount++;
    }
  }

  for (k = 3; k <= N; k++) {
    for (let i = 0; i <= N - k; i++) {
      const j = i + k - 1;
      if (s[i] === s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = 1;
        palindromeCount++;
      }
    }
  }
  return palindromeCount;
};
