/* 
72. Edit Distance
https://leetcode.com/problems/edit-distance/
Type: Medium

Given two strings word1 and word2, return the minimum number of operations required to convert word1 to word2.

You have the following three operations permitted on a word:

 - Insert a character
 - Delete a character
 - Replace a character

Example 1:
Input: word1 = "horse", word2 = "ros"
Output: 3
Explanation: 
horse -> rorse (replace 'h' with 'r')
rorse -> rose (remove 'r')
rose -> ros (remove 'e')

Example 2:
Input: word1 = "intention", word2 = "execution"
Output: 5
Explanation: 
intention -> inention (remove 't')
inention -> enention (replace 'i' with 'e')
enention -> exention (replace 'n' with 'x')
exention -> exection (replace 'n' with 'c')
exection -> execution (insert 'u')
 
Constraints:
 - 0 <= word1.length, word2.length <= 500
 - word1 and word2 consist of lowercase English letters.
*/
/**
 * @param {string} word1
 * @param {string} word2
 * @return {number}
 */
/* 
Approach I: Recursion
*/
var minDistance = function (word1, word2) {
  const m = word1.length;
  const n = word2.length;
  return recurse(m - 1, n - 1, word1, word2);
};

function recurse(i, j, s1, s2) {
  //base cases
  // word1 exhusted and there is still char in word2,
  // so we can insert from word2 to get word1
  if (i < 0) return 1 + j;
  //word2 exhausted
  if (j < 0) return 1 + i;
  if (s1[i] == s2[j]) return recurse(i - 1, j - 1, s1, s2);
  //we insert a char in word1 so pointer i remain at same position
  return (
    1 +
    Math.min(
      recurse(i, j - 1, s1, s2), //insert
      recurse(i - 1, j, s1, s2), //delete
      recurse(i - 1, j - 1, s1, s2) //replace
    )
  );
}

/* 
Approach II: Recursion + memo
Time: O(M*M)
Space: O(M*N)

Runtime: 3 ms Beats 99.87%
Memory: 58.98 MB Beats 23.30%
*/
var minDistance = function (word1, word2) {
  const m = word1.length;
  const n = word2.length;
  const dp = Array.from({ length: m }, () => new Array(n).fill(null));
  return recurse(m - 1, n - 1, word1, word2, dp);
};

function recurse(i, j, s1, s2, dp) {
  //base cases
  // word1 exhusted and there is still char in word2,
  // so we can insert from word2 to get word1
  if (i < 0) return 1 + j;
  //word2 exhausted
  if (j < 0) return 1 + i;
  if (dp[i][j] != null) return dp[i][j];
  if (s1[i] == s2[j]) return (dp[i][j] = recurse(i - 1, j - 1, s1, s2, dp));
  //we insert a char in word1 so pointer i remain at same position
  return (dp[i][j] =
    1 +
    Math.min(
      recurse(i, j - 1, s1, s2, dp), //insert
      recurse(i - 1, j, s1, s2, dp), //delete
      recurse(i - 1, j - 1, s1, s2, dp) //replace
    ));
}

//using 1 based index
var minDistance = function (word1, word2) {
  const m = word1.length;
  const n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(null));
  return recurse(m, n, word1, word2, dp);
};

function recurse(i, j, s1, s2, dp) {
  //base cases
  // word1 exhusted and there is still char in word2,
  // so we can insert from word2 to get word1
  if (i == 0) return j;
  //word2 exhausted
  if (j == 0) return i;
  if (dp[i][j] != null) return dp[i][j];
  if (s1[i - 1] == s2[j - 1])
    return (dp[i][j] = recurse(i - 1, j - 1, s1, s2, dp));
  //we insert a char in word1 so pointer i remain at same position
  return (dp[i][j] =
    1 +
    Math.min(
      recurse(i, j - 1, s1, s2, dp), //insert
      recurse(i - 1, j, s1, s2, dp), //delete
      recurse(i - 1, j - 1, s1, s2, dp) //replace
    ));
}

/* 
Approach III: Recursion + memo
Time: O(M*M)
Space: O(M*N)

Runtime: 8 ms Beats 92.19%
Memory: 59.52 MB Beats 19.85%
*/
var minDistance = function (word1, word2) {
  const m = word1.length;
  const n = word2.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  //base cases
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;

  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] == word2[j - 1]) dp[i][j] = dp[i - 1][j - 1];
      else {
        //we insert a char in word1 so pointer i remain at same position
        dp[i][j] = 1 + Math.min(dp[i][j - 1], dp[i - 1][j], dp[i - 1][j - 1]);
      }
    }
  }
  return dp[m][n];
};

/* 
Approach IV: Space Optimized
Time: O(M*M)
Space: O(M+N)

Runtime: 5 ms Beats 99.10%
Memory: 58.17 MB Beats 28.50%
*/
var minDistance = function (word1, word2) {
  const m = word1.length;
  const n = word2.length;
  const curr = new Array(n + 1).fill(0);
  let prev = new Array(n + 1).fill(0);
  //base cases
  for (let j = 0; j <= n; j++) prev[j] = j;

  for (let i = 1; i <= m; i++) {
    curr[0] = i;
    for (let j = 1; j <= n; j++) {
      if (word1[i - 1] == word2[j - 1]) curr[j] = prev[j - 1];
      else {
        //we insert a char in word1 so pointer i remain at same position
        curr[j] = 1 + Math.min(curr[j - 1], prev[j], prev[j - 1]);
      }
    }
    //create copy of curr to avoid modifiction in next round
    prev = [...curr];
  }
  return prev[n];
};
  