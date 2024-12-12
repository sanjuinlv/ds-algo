/* 
392. Is Subsequence
https://leetcode.com/problems/is-subsequence
Type: Easy

Given two strings s and t, return true if s is a subsequence of t, or false otherwise.

A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).
 
Example 1:
Input: s = "abc", t = "ahbgdc"
Output: true

Example 2:
Input: s = "axc", t = "ahbgdc"
Output: false
 
Constraints:
 - 0 <= s.length <= 100
 - 0 <= t.length <= 10^4
 - s and t consist only of lowercase English letters.

Follow up: Suppose there are lots of incoming s, say s1, s2, ..., sk where k >= 10^9, and you want to check one by one to see if t has its subsequence. In this scenario, how would you change your code?
*/
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
/* 
Approach: Using Two Pointer
Time: O(N)
Space: O(1)

Runtime: 1 ms Beats 76.96%
Memory: 49.08 MB Beats 66.44%
*/
var isSubsequence = function (s, t) {
  let i = 0;
  let j = 0;
  let matchCount = 0;
  while (i < s.length && j < t.length) {
    if (s[i] == t[j]) {
      i++;
      j++;
      matchCount++;
    } else {
      j++;
    }
  }
  if (matchCount == s.length) return true;
  return false;
};
//Compact code of above implementation
var isSubsequence = function (s, t) {
  let i = 0;
  let j = 0;
  while (i < s.length && j < t.length) {
    if (s[i] == t[j]) i++;
    j++;
  }
  if (i == s.length) return true;
  return false;
};
/*
Approach II: Divide and Conquer
Time: O(N), where N is size of t
Space: O(N): Stack size

Runtime: 2 ms Beats 41.26%
Memory: 50.42 MB Beats 11.17%
 */
var isSubsequence = function (s, t) {
  const M = s.length;
  const N = t.length;
  const helper = (i, j) => {
    //Base case
    //we reached end of the string s, i.e., we found all match
    if (i == M) return true;
    //we reached end of 't', i.e., we have not found all s characters
    if (j == N) return false;
    //check if char at i and j are same
    if (s[i] == s[j]) i++;
    j++; // j will always increment, either character match or not
    return helper(i, j);
  };
  return helper(0, 0);
};

/* 
Approach III: Greedy Match with Character Indices Hashmap
Time: O(T + S + LogT)
Let ∣T∣ be the length of the target string, and ∣S∣ be the length of the source string.

First of all, we build a hashmap out of the target string, which would take O(∣T∣) time complexity. But if we redesign the API to better fit the scenario of the follow-up question, we should put the construction of the hashmap in the constructor of the class, which should be done only once. The cost of this construction would be amortized by the following calls of string matches.

As the second part of the algorithm, we scan through the source string, and lookup the corresponding indices in the hashmap. The lookup operation in hashmap is constant.
However, to find the suitable index would take either O(∣T∣) with the linear search or O(log∣T∣) with the binary search. To summarize, this part would be bounded by O(∣S∣⋅log∣T∣).

Space: O(T)

Runtime: 4 ms Beats 14.09%
Memory: 51.86 MB Beats 5.22%
*/
var isSubsequence = function (s, t) {
  const charIndexMap = new Map();
  //create map of character with their indexes
  for (let i = 0; i < t.length; i++) {
    const c = t[i];
    if (charIndexMap.has(c)) charIndexMap.get(c).push(i);
    else charIndexMap.set(c, [i]);
  }
  let currIndex = -1;
  for (const c of s) {
    if (!charIndexMap.has(c)) return false;
    let isMatched = false;
    //greedly match with linear scan
    for (let idx of charIndexMap.get(c)) {
      //check all indices for this character to see if any matches which is greater than last match
      if (currIndex < idx) {
        currIndex = idx;
        isMatched = true;
        break;
      }
    }
    if (!isMatched) return false;
  }
  return true;
};

/* 
approach IV: Dynamic Programming
Time: O(M * N)
Space: O(M + N)

Runtime: 13 ms Beats 6.62%
Memory: 53.95 MB Beats 5.11%
*/
var isSubsequence = function (s, t) {
  const m = s.length;
  const n = t.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1).fill(0));
  //find LCS
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s[i - 1] == t[j - 1]) dp[i][j] = 1 + dp[i - 1][j - 1];
      else dp[i][j] = Math.max(dp[i - 1][j], dp[i][j - 1]);
    }
  }
  return dp[m][n] == s.length;
};
