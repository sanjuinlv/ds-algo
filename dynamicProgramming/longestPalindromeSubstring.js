/**
5. Longest Palindromic Substring
https://leetcode.com/problems/longest-palindromic-substring
Type : Medium

Given a string s, return the longest palindromic substring in s.

Example 1:
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.

Example 2:
Input: s = "cbbd"
Output: "bb"

Constraints:
1 <= s.length <= 1000
s consist of only digits and English letters.

 * @param {string} s
 * @return {string}
 */
/* 
Approach I : Expand From Center
Time: O(N^2) - 
Space: O(1) - No extra space used

Runetime: 26 ms Beats 100.00%
Memory: 51.10 MB Beats 74.45%
*/
var longestPalindrome = function (s) {
  const N = s.length;
  const ans = { max: 0, left: 0, right: 0 };
  const plaindrome = (s, lo, hi) => {
    while (lo >= 0 && hi < N) {
      if (s[lo] != s[hi]) break;
      //update ans
      if (hi - lo + 1 > ans.max) {
        ans.max = hi - lo + 1;
        ans.left = lo;
        ans.right = hi;
      }
      lo--;
      hi++;
    }
  };
  for (let i = 0; i < N; i++) {
    //odd length palindromes, single character center
    plaindrome(s, i, i);
    //even length palindromes, consecutive characters center
    plaindrome(s, i, i + 1);
  }
  return s.slice(ans.left, ans.right + 1);
};

/*
Approach II: Tabulation method (DP)

Maintain a boolean table[n][n] that is filled in bottom up manner.
The value of table[i][j] is true, if the substring is palindrome, otherwise false.
To calculate table[i][j], check the value of table[i+1][j-1], if the value is true and str[i] is same as str[j], then we make table[i][j] true.
Otherwise, the value of table[i][j] is made false.
We have to fill table previously for substring of length = 1 and length =2 because
as we are finding , if table[i+1][j-1] is true or false , so in case of
(i) length == 1 , lets say i=2 , j=2 and i+1,j-1 doesn’t lies between [i , j]
(ii) length == 2 ,lets say i=2 , j=3 and i+1,j-1 again doesn’t lies between [i , j].

Time Complexity O(N^2)
Space complexity O(N^2)

/*
Runtime: 1360 ms, faster than 7.73% of JavaScript online submissions for Longest Palindromic Substring.
Memory Usage: 79.3 MB, less than 5.48% of JavaScript online submissions for Longest Palindromic Substring.
*/
/* 
Dynamic Programming
Runtime: 772 ms, faster than 28.94% of JavaScript online submissions for Longest Palindromic Substring.
Memory Usage: 87.7 MB, less than 6.21% of JavaScript online submissions for Longest Palindromic Substring.
*/
var longestPalindrome = function (s) {
  const N = s.length;
  const dp = [...Array(N)].map((X) => new Array(N).fill(0));
  const ans = { start: 0, end: 0 };
  //set diagonal as 1
  for (let i = 0; i < N; i++) {
    dp[i][i] = 1;
  }
  for (let i = 0; i < N - 1; i++) {
    const j = i + 1;
    if (s[i] == s[j]) {
      dp[i][j] = 1;
      ans.start = i;
      ans.end = j;
    }
  }
  for (let k = 3; k <= N; k++) {
    for (let i = 0; i <= N - k; i++) {
      const j = i + k - 1;
      if (s[i] == s[j] && dp[i + 1][j - 1] == 1) {
        dp[i][j] = 1;
        ans.start = i;
        ans.end = j;
      }
    }
  }
  return s.substring(ans.start, ans.end + 1);
};

/* 
Combining the loop for k=2 with other
Time Complexity O(N^2) 
Space complexity O(N^2)
*/
var longestPalindrome = function (s) {
  const N = s.length;
  let maxLengthPalindrome = s.charAt(0);
  //initialize a 2D array
  const dp = [...Array(N)].map((x) => Array(N).fill(0));
  //mark for i=j as 1, as char is palindrome to itself
  for (let i = 0; i < N; i++) {
    dp[i][i] = 1;
  }
  //check for all other combination
  for (let k = 2; k <= N; k++) {
    for (let i = 0; i <= N - k; i++) {
      let j = i + k - 1;
      if (k == 2) {
        if (s[i] == s[j]) {
          dp[i][j] = 1;
          if (k > maxLengthPalindrome.length) {
            maxLengthPalindrome = s.slice(i, j + 1);
          }
        }
      } else {
        if (s[i] == s[j] && dp[i + 1][j - 1] == 1) {
          dp[i][j] = 1;
          if (k > maxLengthPalindrome.length) {
            maxLengthPalindrome = s.slice(i, j + 1);
          }
        }
      }
    }
  }
  return maxLengthPalindrome;
};

