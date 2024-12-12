/*
Minimum number of deletions and insertions
https://www.geeksforgeeks.org/problems/minimum-number-of-deletions-and-insertions0209/1
Type: Medium

Given two strings s1 and s2. The task is to remove or insert the minimum number of characters from/in s1 to transform it into s2. It could be possible that the same character needs to be removed from one point of s1 and inserted into another point.

Example 1:
Input: s1 = "heap", s2 = "pea"
Output: 3
Explanation: 'p' and 'h' deleted from heap. Then, 'p' is inserted at the 
beginning.

Example 2:
Input : s1 = "geeksforgeeks", s2 = "geeks"
Output: 8
Explanation: 8 deletions, i.e. remove all characters of the string "forgeeks".

Constraints:
 - 1 ≤ s1.size(), s2.size() ≤ 1000
 - All the characters are lowercase English alphabets.
*/

/**
 * @param {string} s1
 * @param {string} s2
 * @return {number}
 */
/* 
Approach: Bottom Up DP
Time: O(M * N)
Space: O(M + N)
*/
class Solution {
  minOperations(s1, s2) {
    const m = s1.length;
    const n = s2.length;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        if (s1[i - 1] == s2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
        else dp[i][j] = Math.max(dp[i][j - 1], dp[i - 1][j]);
      }
    }
    //Length of LCS string
    const LCSLength = dp[m][n];
    //characters to delete from s1
    const minDeletion = m - LCSLength;
    //characters to delete from s2
    const minInsertion = n - LCSLength;
    //total operations
    return minDeletion + minInsertion;
  }
}
