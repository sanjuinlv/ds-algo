/* 
1092. Shortest Common Supersequence 
https://leetcode.com/problems/shortest-common-supersequence/
Type: Hard

Given two strings str1 and str2, return the shortest string that has both str1 and str2 as subsequences. If there are multiple valid strings, return any of them.

A string s is a subsequence of string t if deleting some number of characters from t (possibly 0) results in the string s.

Example 1:
  Input: str1 = "abac", str2 = "cab"
  Output: "cabac"
  Explanation: 
  str1 = "abac" is a subsequence of "cabac" because we can delete the first "c".
  str2 = "cab" is a subsequence of "cabac" because we can delete the last "ac".
  The answer provided is the shortest such string that satisfies these properties.

Example 2:
  Input: str1 = "aaaaaaaa", str2 = "aaaaaaaa"
  Output: "aaaaaaaa"
 

Constraints:
 - 1 <= str1.length, str2.length <= 1000
 - str1 and str2 consist of lowercase English letters.
*/
/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
/* 
Approach : Bottom Up DP
This solution is combination of finding LCS and print LCS
Explanation: https://www.youtube.com/watch?v=VDhRg-ZJTuc&list=PL_z_8CaSLPWekqhdCPmFohncHwz8TY2Go&index=28

Time: O(M*N)
Space: O(M+N)

Runtime: 59 ms Beats 91.04%
Memory: 77.56 MB Beats 52.44%
*/
var shortestCommonSupersequence = function (str1, str2) {
  let m = str1.length;
  let n = str2.length;
  let dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (str1[i - 1] == str2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  //The result size will be str1 length + str2 length - the LCS lenght as it is common in SCS
  const l = m + n - dp[m][n];
  let result = new Array(l);
  let i = m;
  let j = n;
  while (i > 0 && j > 0) {
    if (str1[i - 1] == str2[j - 1]) {
      result.push(str1[i - 1]);
      i--;
      j--;
    } else {
      //'left' cell count is greater than 'UP' cell.
      if (dp[i][j - 1] > dp[i - 1][j]) {
        //add chars from str2
        result.push(str2[j - 1]);
        j--;
      } else {
        // 'UP' cell count is greater than 'left' cell
        // add char from str1
        result.push(str1[i - 1]);
        i--;
      }
    }
  }
  //we need to consider the charcter left in str1 (i represent chars in str1)
  while (i > 0) {
    result.push(str1[i - 1]);
    i--;
  }
  //we need to consider the charcter left in str2 (j represet chars in str2)
  while (j > 0) {
    result.push(str2[j - 1]);
    j--;
  }
  return result.reverse().join("");
};
