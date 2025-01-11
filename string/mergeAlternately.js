/*
1768. Merge Strings Alternately
https://leetcode.com/problems/merge-strings-alternately
Type: Easy

You are given two strings word1 and word2. Merge the strings by adding letters in alternating order, starting with word1. If a string is longer than the other, append the additional letters onto the end of the merged string.

Return the merged string.

Example 1:
  Input: word1 = "abc", word2 = "pqr"
  Output: "apbqcr"
  Explanation: The merged string will be merged as so:
    word1:  a   b   c
    word2:    p   q   r
    merged: a p b q c r

Example 2:
  Input: word1 = "ab", word2 = "pqrs"
  Output: "apbqrs"
  Explanation: Notice that as word2 is longer, "rs" is appended to the end.
    word1:  a   b 
    word2:    p   q   r   s
    merged: a p b q   r   s

Example 3:
  Input: word1 = "abcd", word2 = "pq"
  Output: "apbqcd"
  Explanation: Notice that as word1 is longer, "cd" is appended to the end.
    word1:  a   b   c   d
    word2:    p   q 
    merged: a p b q c   d
 
Constraints:
 - 1 <= word1.length, word2.length <= 100
 - word1 and word2 consist of lowercase English letters.
 */

/**
 * @param {string} word1
 * @param {string} word2
 * @return {string}
 */
/* 
Approach: Two pointers

Runtime: 54 ms Beats 56.80%
Memory: 49.78 MB Beats 47.86%
*/
var mergeAlternately = function (word1, word2) {
  let m = word1.length;
  let n = word2.length;
  let i = 0;
  let j = 0;
  let result = "";
  while (i < m && j < n) {
    result += word1[i++];
    result += word2[j++];
  }
  while (i < m) result += word1[i++];
  while (j < n) result += word2[j++];
  return result;
};

/* 
Approach II: One pointers

Runtime: 52 ms Beats 68.31%
Memory: 49.52 MB Beats 56.86%
*/
var mergeAlternately = function (word1, word2) {
  let m = word1.length;
  let n = word2.length;
  const maxLength = Math.max(m, n);
  let result = "";
  for (let i = 0; i < maxLength; i++) {
    if (i < m) result += word1[i++];
    if (i < n) result += word2[j++];
  }
  return result;
};
