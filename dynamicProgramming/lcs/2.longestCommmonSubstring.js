/* 
Longest Common Substring
https://www.geeksforgeeks.org/longest-common-substring-dp-29/
Type: Medium

You are given two strings s1 and s2. Your task is to find the length of the longest common substring among the given strings.

Example 1:
  Input: s1 = "ABCDGH", s2 = "ACDGHR"
  Output: 4
  Explanation: The longest common substring is "CDGH" with a length of 4.

Example 2:  
  Input: s1 = "abc", s2 = "acb"
  Output: 1
  Explanation: The longest common substrings are "a", "b", "c" all having length 1.

Example 3:  
  Input: s1 = "YZ", s2 = "yz"
  Output: 0

Constraints:
  - 1 <= s1.size(), s2.size() <= 10^3
  - Both strings may contain upper and lower case alphabets.

*/
/* 
Approach I : Recrusive 
Time: O(2^(m+n))
Space: Space: O(m+n), which is maximum depth of the recursive stack
*/
class Solution {
  longestCommonSubstr(s1, s2) {
    const m = s1.length;
    const n = s2.length;
    const lcs = (i, j, count) => {
      //base case
      if (i == 0 || j == 0) return count;
      //if the string at i and j are same increment the count and compare next chars
      if (s1[i - 1] == s2[j - 1]) {
        count = lcs(i - 1, j - 1, count + 1);
      }
      //take the first string from i but second string from j-1,
      //i.e., same first string but second string less by length 1
      const takeFirst = lcs(i, j - 1, 0);
      //take the seconde string from i-1 but second string from j
      //i.e., same second string but first string less by length 1
      const takeSecond = lcs(i - 1, j, 0);
      return Math.max(count, Math.max(takeFirst, takeSecond));
    };
    return lcs(m, n, 0);
  }
}

/* 
Recrusive with memoization 
Time limit exeeds
Psses 108/219 test cases
*/
class Solution {
  longestCommonSubstr(s1, s2) {
    const m = s1.length;
    const n = s2.length;
    const memo = Array.from({ length: m }, () => Array.from({ length: n }, () => Array(Math.min(m, n)))); 
    const lcs = (i, j, count) => {
      //base case
      if (i == 0 || j == 0) return count;
      if (memo[i][j][count] != null) return memo[i][j][count];
      //if the string at i and j are same increment the count and compare next chars
    //   let res = 0;
      if (s1[i - 1] == s2[j - 1]) {
        count = lcs(i - 1, j - 1, count + 1);
      }
      //take the first string from i but second string from j-1,
      //i.e., same first string but second string less by length 1
      const takeFirst = lcs(i, j - 1, 0);
      //take the seconde string from i-1 but second string from j
      //i.e., same second string but first string less by length 1
      const takeSecond = lcs(i - 1, j, 0);
      return memo[i][j][count] = Math.max(count, Math.max(takeFirst, takeSecond));
    };
    return lcs(m, n, 0);
  }
}
/* 
Approach II : Recrusive with memoization 
Time: O(M*N)
Space: Space: O(m+n)

Time Taken: 0.15
*/
class Solution {
  longestCommonSubstr(s1, s2) {
    const m = s1.length;
    const n = s2.length;
    const memo = Array.from({ length: m + 1 }, () => Array(n + 1));
    let maxLength = 0;
    const lcs = (i, j) => {
      //base case
      if (i == 0 || j == 0) return 0;
      if (memo[i][j] != null) return memo[i][j];
      //if the string at i and j are same increment the count and compare next chars
      if (s1[i - 1] == s2[j - 1]) {
        memo[i][j] = 1 + lcs(i - 1, j - 1);
        maxLength = Math.max(maxLength, memo[i][j]);
      } else {
        memo[i][j] = 0;
      }
      return memo[i][j];
    };
    // Explore all (i, j) pairs
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        lcs(i, j);
      }
    }
    return maxLength;
  }
}

/* 
Approach III: Bottom Up DP
Time: O(M*N)
Space: O(M+N)

Time Taken: 0.19
*/
class Solution {
  longestCommonSubstr(s1, s2) {
    const m = s1.length;
    const n = s2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1));
    //fill firts row and first column to 0
    for (let i = 0; i <= m; i++) dp[i][0] = 0;
    for (let j = 0; j <= n; j++) dp[0][j] = 0;
    let maxLength = 0;
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (s1[i - 1] == s2[j - 1]) {
          dp[i][j] = 1 + dp[i - 1][j - 1];
          maxLength = Math.max(maxLength, dp[i][j]);
        } else {
          // char did not match so set dp[i][j] tp 0
          dp[i][j] = 0;
        }
      }
    }
    return maxLength;
  }
}
