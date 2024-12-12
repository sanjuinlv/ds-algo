/* 
Print longest common sequence 

printLongestCommonSubsequence("abcde", "ace");// ace
printLongestCommonSubsequence("abc", "abc"); //abc
printLongestCommonSubsequence("abc", "def"); //""
printLongestCommonSubsequence("AGGTAB", "GXTXAYB"); //GTAB

TODO: https://www.geeksforgeeks.org/problems/print-all-lcs-sequences3413/0
*/
var printLongestCommonSubsequence = function (s1, s2) {
  const m = s1.length;
  const n = s2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s1[i - 1] == s2[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  let i = m;
  let j = n;
  let result = [];
  while (i > 0 && j > 0) {
    //if char at i and j is same that means we came here from diagonal up.
    //add this character and move to prev diagonal cell
    if (s1[i - 1] == s2[j - 1]) {
      result.push(s1[i - 1]);
      i--;
      j--;
    } else {
      //if left count is greater than 'up' then move to left column
      if (dp[i][j - 1] > dp[i - 1][j]) j--;
      //move to prev row
      else i--;
    }
  }
  return result.reverse().join("");
};

