/* 
1312. Minimum Insertion Steps to Make a String Palindrome
https://leetcode.com/problems/minimum-insertion-steps-to-make-a-string-palindrome/description/
Type: Hard
*/
/**
 * @param {string} s
 * @return {number}
 */
/* 
Approach: Bottom Up DP
This can be solved finding the LCS and then subtracting the LCS lenght from the input string

Time: O(N^2)
Space: O(2N)

Runtime: 50 ms Beats 59.38%
Memory; 55.75 MB Beats 75.00%
*/
var minInsertions = function (s) {
  const m = s.length;
  const dp = Array.from({ length: m + 1 }, () => Array(m + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= m; j++) {
      //we are comparing s with its reversed value
      if (s[i - 1] == s[m - j]) dp[i][j] = 1 + dp[i - 1][j - 1];
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  const LCSLength = dp[m][m];
  //LCS is all matching string chars. So the string length - LCS lenght is
  //number of insert we need to do to make the string palindrome
  return m - LCSLength;
};
