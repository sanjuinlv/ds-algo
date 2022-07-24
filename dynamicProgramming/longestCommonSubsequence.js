/* 
https://leetcode.com/problems/longest-common-subsequence/

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
// Time complexity: 2^(M*N) (due to recursion)
function longestCommonSubsequence(a, b) {
  const LCS = (i, j) => {
    // if we reached till end of the array then return 0
    if (i >= a.length || j >= b.length) {
      return 0;
    } else if (a[i] == b[j]) {
      // if equal then add 1 and look further for other match
      return 1 + LCS(i + 1, j + 1);
    } else {
      // look up from next element in a and b respectively
      return Math.max(LCS(i + 1, j), LCS(i, j + 1));
    }
  };
  return LCS(0, 0);
}

//11/03/2022
/* 
Approach - (Recursive, without using memoization)
*/
var longestCommonSubsequence = function (text1, text2) {
  if (text1.length > text2.length) {
    return longestCommonSubsequence(text2, text1);
  }
  const n = text1.length;
  const m = text2.length;
  const dp = (i, j, l) => {
    //base case
    if (i >= n) return l;
    //check if the char found in text2
    let currMatch = 0;
    const charOccurrence = text2.indexOf(text1[i], j);
    if (charOccurrence >= 0) {
      currMatch = dp(i + 1, charOccurrence + 1, l + 1);
    }
    const nextCharMatch = dp(i + 1, j, l);
    return Math.max(currMatch, nextCharMatch);
  };
  return dp(0, 0, 0);
};

/*
Approach - Memoization
Time: O(M * N^2), where M & N is possible characters in first and second
string. So total M * N possible pairs. And we need O(N) to search character
in string of length of N.
Space: O(M * N) - We need to store the answer for each of the M⋅N sub problems.

Runtime: 245 ms, faster than 22.37% of JavaScript online submissions for Longest Common Subsequence.
Memory Usage: 52.6 MB, less than 69.19% of JavaScript online submissions for Longest Common Subsequence.

longestCommonSubsequence("abcde", "ace")
longestCommonSubsequence("abcde", "dce")
longestCommonSubsequence("abc", "abc")
longestCommonSubsequence("abc", "def")
*/
var longestCommonSubsequence = function (text1, text2) {
  const n = text1.length;
  const m = text2.length;
  const memo = [...Array(n)].map((x) => Array(m).fill(-1));
  const dp = (i, j) => {
    if (i === n || j === m) return 0;
    if (memo[i][j] != -1) return memo[i][j];
    //base case
    //option 1: dont't include text1[i] in the solution
    const option1 = dp(i + 1, j);
    //option 2: include text1[i] in the solution if there is
    // match in text2 at or after j
    let option2 = 0;
    const charOccurrence = text2.indexOf(text1[i], j);
    if (charOccurrence != -1) {
      option2 = 1 + dp(i + 1, charOccurrence + 1);
    }
    memo[i][j] = Math.max(option1, option2);
    return memo[i][j];
  };
  return dp(0, 0);
};

/*
Approach - Memoization (Improved) - (DP - Top Down)
Little optimized version. If we find a match then we follow that path only and 
do not try by excluding that character

Time: O(M * N), where M & N is possible characters in first and second
string. So total M * N possible pairs.
Space: O(M * N) - We need to store the answer for each of the M⋅N sub problems.


Runtime: 182 ms, faster than 35.20% of JavaScript online submissions for Longest Common Subsequence.
Memory Usage: 53.2 MB, less than 57.50% of JavaScript online submissions for Longest Common Subsequence.
*/
var longestCommonSubsequence = function (text1, text2) {
  const n = text1.length;
  const m = text2.length;
  const memo = [...Array(n)].map((x) => Array(m).fill(-1));
  const dp = (i, j) => {
    // we reached to the end of the string, return 0
    if (i >= n || j >= m) return 0;
    if (memo[i][j] != -1) return memo[i][j];
    if (text1[i] === text2[j]) {
      //move to next character
      memo[i][j] = 1 + dp(i + 1, j + 1);
    } else {
      memo[i][j] = Math.max(dp(i, j + 1), dp(i + 1, j));
    }
    return memo[i][j];
  };
  return dp(0, 0);
};

/* 
Approach - Dynamic programming (Bottom Up)
Time: O(M * N), We're solving M⋅N subproblems. Solving each subproblem is an O(1) operation.
Space: O(M * N) - We'e allocating a 2D array of size M⋅N to save the answers to subproblems.

Runtime: 116 ms, faster than 78.31% of JavaScript online submissions for Longest Common Subsequence.
Memory Usage: 52.9 MB, less than 63.58% of JavaScript online submissions for Longest Common Subsequence.
*/
var longestCommonSubsequence = function (text1, text2) {
  const n = text1.length;
  const m = text2.length;
  const dp = [...Array(n + 1)].map((x) => Array(m + 1).fill(0));
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      if (text1[i] === text2[j]) {
        dp[i][j] = 1 + dp[i + 1][j + 1];
      } else {
        dp[i][j] = Math.max(dp[i + 1][j], dp[i][j + 1]);
      }
    }
  }
  return dp[0][0];
};
