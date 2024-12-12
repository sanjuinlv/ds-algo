/* 
Longest Repeating Subsequence
https://www.geeksforgeeks.org/problems/longest-repeating-subsequence2004/1
Type: Medium

Given string str, find the length of the longest repeating subsequence such that it can be found twice in the given string.

The two identified subsequences A and B can use the same ith character from string s if and only if that ith character has different indices in A and B. For example, A = "xax" and B = "xax" then the index of the first "x" must be different in the original string for A and B.

Example 1:
  Input: s = "axxzxy"
  Output: 2
  Explanation: The given array with indexes looks like
  a x x z x y 
  0 1 2 3 4 5
  The longest subsequence is "xx". It appears twice as explained below.
  subsequence A
  x x
  0 1  <-- index of subsequence A
  ------
  1 2  <-- index of s
  subsequence B
  x x
  0 1  <-- index of subsequence B
  ------
  2 4  <-- index of s
  We are able to use character 'x' (at index 2 in s) in both subsequences as it appears on index 1 in subsequence A and index 0 in subsequence B.
Example 2:    
  Input: s = "axxxy"
  Output: 2
  Explanation: The given array with indexes looks like
  a x x x y 
  0 1 2 3 4
  The longest subsequence is "xx". It appears twice as explained below.
  subsequence A
  x x
  0 1  <-- index of subsequence A
  ------
  1 2  <-- index of s
  subsequence B
  x x
  0 1  <-- index of subsequence B
  ------
  2 3  <-- index of s
  We are able to use character 'x' (at index 2 in s) in both subsequencesas it appears on index 1 in subsequence A and index 0 in subsequence B.

Constraints:
 - 1 <= s.size() <= 10^3
*/
/* 
Approach: DP
This is similar to LCS problem. Here s1 is input string and s2 is same s1.
we try to find the LCS from both string with additional check that index
i and j are not same as we can not use char with same index.

Solution Approach explanation: 
https://www.youtube.com/watch?v=hbTaCmQGqLg&list=PL_z_8CaSLPWekqhdCPmFohncHwz8TY2Go&index=29

Time: O(N * N) = O(N^2)
Space: O (N + N) = O(N)

Time taken: 0.25
*/
class Solution {
  LongestRepeatingSubsequence(s) {
    const s2 = s;
    const m = s.length;
    const n = m;
    const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
    //Find LCS of string and reversed string.
    for (let i = 1; i <= m; i++) {
      for (let j = 1; j <= n; j++) {
        //we do not consider the char when i and j index are same
        if (s[i - 1] == s2[j - 1] && i != j) dp[i][j] = 1 + dp[i - 1][j - 1];
        else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
      }
    }
    //LCS of these two string will be longest palindrome subsequence
    return dp[m][n];
  }
}
