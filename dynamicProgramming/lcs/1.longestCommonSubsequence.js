/* 
1143. Longest Common Subsequence
https://leetcode.com/problems/longest-common-subsequence/
Category - Medium

Given two strings text1 and text2, return the length of their longest common subsequence.
If there is no common subsequence, return 0.

A subsequence of a string is a new string generated from the original string with
some characters (can be none) deleted without changing the relative order of the remaining characters.

For example, "ace" is a subsequence of "abcde".
A common subsequence of two strings is a subsequence that is common to both strings.

Example 1:

Input: text1 = "abcde", text2 = "ace" 
Output: 3  
Explanation: The longest common subsequence is "ace" and its length is 3.

Example 2:

Input: text1 = "abc", text2 = "abc"
Output: 3
Explanation: The longest common subsequence is "abc" and its length is 3.

Example 3:

Input: text1 = "abc", text2 = "def"
Output: 0
Explanation: There is no such common subsequence, so the result is 0.

Constraints:

1 <= text1.length, text2.length <= 1000
text1 and text2 consist of only lowercase English characters.
*/

/* 
Approach I: Recursion (top down)
Time: 2^(M*N) (due to recursion)
*/
var longestCommonSubsequence = function (text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const LCS = (i, j) => {
    //nothing left in either of the string
    if (i == 0 || j == 0) return 0;
    if (text1[i - 1] == text2[j - 1]) return 1 + LCS(i - 1, j - 1);
    else return Math.max(LCS(i - 1, j), LCS(i, j - 1));
  };
  return LCS(m, n);
};

/* 
Approach II: Recursion with memoization (top down)
Time: O(M*N)
Space: O(M*N)

Runtime: 82 ms Beats 32.31%
Memory: 75.88 MB Beats 42.24%
*/
var longestCommonSubsequence = function (text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const memo = Array.from({ length: m + 1 }, () => Array(n + 1));
  const LCS = (i, j) => {
    //nothing left in either of the string
    if (i == 0 || j == 0) return 0;
    if (memo[i][j] != null) return memo[i][j];
    if (text1[i - 1] == text2[j - 1]) memo[i][j] = 1 + LCS(i - 1, j - 1);
    else memo[i][j] = Math.max(LCS(i - 1, j), LCS(i, j - 1));
    return memo[i][j];
  };
  return LCS(m, n);
};

/* 
Approach III: Bottom up DP
Time: O(M*N)
Space: O(M*N)

Runtime: 57 ms Beats 70.75%
Memory: 75.71 MB Beats 43.38%
*/
var longestCommonSubsequence = function (text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (text1[i - 1] == text2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n];
};

/* 
Approach I: Recursion (bottom up)
Time: 2^(M*N) (due to recursion)
*/
var longestCommonSubsequence = function (text1, text2) {
  const m = text1.length;
  const n = text2.length;
  if (m > n) return longestCommonSubsequence(text2, text1);
  const LCS = (i, j) => {
    //base case
    // if we reached till end of the array then return 0
    if (i >= m || j >= n) return 0;
    if (text1[i] === text2[j]) {
      return 1 + LCS(i + 1, j + 1);
    } else {
      return Math.max(LCS(i + 1, j), LCS(i, j + 1));
    }
  };
  return LCS(0, 0);
};

/* 
Approach - Dynamic programming (Bottom Up)
Time: O(M * N), We're solving M⋅N subproblems. Solving each subproblem is an O(1) operation.
Space: O(M * N) - We'e allocating a 2D array of size M⋅N to save the answers to subproblems.

Runtime: 116 ms, faster than 78.31% of JavaScript online submissions for Longest Common Subsequence.
Memory Usage: 52.9 MB, less than 63.58% of JavaScript online submissions for Longest Common Subsequence.
*/
var longestCommonSubsequence = function (text1, text2) {
  const m = text1.length;
  const n = text2.length;
  const dp = [...Array(m + 1)].map((x) => new Array(n + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let j = n - 1; j >= 0; j--) {
      if (text1[i] == text2[j]) dp[i][j] = 1 + dp[i + 1][j + 1];
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
    }
  }
  return dp[0][0];
};