/* 
516. Longest Palindromic Subsequence
https://leetcode.com/problems/longest-palindromic-subsequence/description/
Type: Medium

Given a string s, find the longest palindromic subsequence's length in s.

A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

Example 1:
  Input: s = "bbbab"
  Output: 4
  Explanation: One possible longest palindromic subsequence is "bbbb".
  
Example 2:
  Input: s = "cbbd"
  Output: 2
  Explanation: One possible longest palindromic subsequence is "bb".
 
Constraints:
 - 1 <= s.length <= 1000
 - s consists only of lowercase English letters.
*/
/**
 * @param {string} s
 * @return {number}
 */
/* 
Approach: Bottom Up DP
Time: O(M * N)
Space: O(M + N)

Runtime: 193 ms Beats 40.47%
Memory: 74.95 MB Beats 80.56%
*/
var longestPalindromeSubseq = function (s) {
  const reversedStr = (s) => {
    let revStr = "";
    for (let i = s.length - 1; i >= 0; i--) revStr += s[i];
    return revStr;
  };
  //reverse the string 's'
  //const s2 = s.split("").reverse().join("");
  const s2 = reversedStr(s);
  const m = s.length;
  const n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  //Find LCS of string and reversed string.
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s[i - 1] == s2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  //LCS of these two string will be longest palindrome subsequence
  return dp[m][n];
};

/* 
Approach : Without using additional reversed string
Runtime: 181 ms Beats 46.98%
Memory: 73.66 MB Beats 88.10%
*/
var longestPalindromeSubseq = function (s) {
  const m = s.length;
  const dp = Array.from({ length: m + 1 }, () => Array(m + 1).fill(0));
  //Find LCS of string and reversed string.
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= m; j++) {
      //s[m-j] reads from end of string, i.e., revsrsed string
      if (s[i - 1] == s[m - j]) dp[i][j] = 1 + dp[i - 1][j - 1];
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  //LCS of these two string will be longest palindrome subsequence
  return dp[m][m];
};

/* 
Approach II: Top down with memoization
Time: O(N^2)
Initializing the memo array takes O(n^2) time.
Since there are O(n^2) states that we need to iterate over, the recursive function is called O(n^2) times.

Space: O(N^2)

Runtime: 124 ms Beats 87.96%
Memory: 93.90 MB Beats 9.13%
*/
var longestPalindromeSubseq = function (s) {
  const N = s.length;
  const memo = Array.from({ length: N }, () => Array(N));
  const lps = (i, j) => {
    //base case
    if (i > j) return 0;
    if (i == j) return 1;
    if (memo[i][j] != null) return memo[i][j];
    //if char at i and j are same then that can be counted in plandrome
    if (s[i] == s[j]) memo[i][j] = 2 + lps(i + 1, j - 1);
    // find max of including i+1 & j char and i & j-1
    else memo[i][j] = Math.max(lps(i + 1, j), lps(i, j - 1));
    return memo[i][j];
  };
  return lps(0, N - 1);
};

/*
Approach: Iterative DP
Time: O(N^2)
Space: O(N^2)

Runtime: 148 ms Beats 71.30%
Memory: 75.70 MB Beats 76.98%
*/
var longestPalindromeSubseq = function (s) {
  const N = s.length;
  //dp[i][j] represents the longest palindromic subsequence length for the substring s[i...j]
  const dp = Array.from({ length: N }, () => Array(N).fill(0));
  // Base case: single-character substrings
  for (let i = 0; i < N; i++) dp[i][i] = 1;
  // Fill the table for substrings of length 2 to N
  // l is the length of the substring
  for (let l = 2; l <= N; l++) {
    //N = 7, "abccdef", l= 3, i can be from 0 to N-l
    // starting index
    for (let i = 0; i <= N - l; i++) {
      //zero based index
      const j = i + l - 1; // ending index
      if (s[i] == s[j]) dp[i][j] == 2 + dp[i + 1][j - 1];
      else dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1]);
    }
  }
  return dp[0][N - 1];
};
