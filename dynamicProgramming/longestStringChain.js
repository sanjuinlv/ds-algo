/*
1048. Longest String Chain
https://leetcode.com/problems/longest-string-chain/
Type: Medium

You are given an array of words where each word consists of lowercase English letters.

wordA is a predecessor of wordB if and only if we can insert exactly one letter anywhere in wordA without changing the order of the other characters to make it equal to wordB.

For example, "abc" is a predecessor of "abac", while "cba" is not a predecessor of "bcad".
A word chain is a sequence of words [word1, word2, ..., wordk] with k >= 1, where word1 is a predecessor of word2, word2 is a predecessor of word3, and so on. A single word is trivially a word chain with k == 1.

Return the length of the longest possible word chain with words chosen from the given list of words.

Example 1:
Input: words = ["a","b","ba","bca","bda","bdca"]
Output: 4
Explanation: One of the longest word chains is ["a","ba","bda","bdca"].

Example 2:
Input: words = ["xbc","pcxbcf","xb","cxbc","pcxbc"]
Output: 5
Explanation: All the words can be put in a word chain ["xb", "xbc", "cxbc", "pcxbc", "pcxbcf"].

Example 3:
Input: words = ["abcd","dbqca"]
Output: 1
Explanation: The trivial word chain ["abcd"] is one of the longest word chains.
["abcd","dbqca"] is not a valid word chain because the ordering of the letters is changed.
 
Constraints:
 - 1 <= words.length <= 1000
 - 1 <= words[i].length <= 16
 - words[i] only consists of lowercase English letters.

 */

/**
 * @param {string[]} words
 * @return {number}
 */
var longestStrChain = function (words) {
  const N = words.length;
  words.sort((a, b) => a.length - b.length);
  const isPredecessor = (s1, s2) => {
    if (s1.length + 1 != s2.length) return false;
    //s1 and s2 characters diff should be only one with same order
    let first = 0;
    let second = 0;
    // let count = 0;
    while (first < s1.length && second < s2.length) {
      //char at first and second matches
      if (s1[first] == s2[second]) {
        // count++;
        first++;
      }
      //move the longer word pointer
      second++;
    }
    //we matched alll char of s1
    return first == s1.length;
  };
  const LSC = (i, prevIdx) => {
    //base case
    //we reached end of the input
    if (i == N) return 0;
    //exclude this word
    let len = 0 + LSC(i + 1, prevIdx);
    if (prevIdx == -1 || isPredecessor(words[prevIdx], words[i])) {
      const taken = 1 + LSC(i + 1, i);
      len = Math.max(len, taken);
    }
    return len;
  };
  console.log(`words`, words);
  return LSC(0, -1);
};

/* 
Memoization: TODO
*/

/* 
Approach III: Bottom Up

Runtime: 43 ms Beats 56.67%
Memory: 52.43 MB Beats 97.50%  
*/
var longestStrChain = function (words) {
  const N = words.length;
  const dp = new Array(N).fill(1);
  //sort the workds by their length
  words.sort((a, b) => a.length - b.length);

  const isPredecessor = (s1, s2) => {
    if (s1.length + 1 != s2.length) return false;
    //s1 and s2 characters diff should be only one with same order
    let first = 0;
    let second = 0;
    // let count = 0;
    while (first < s1.length && second < s2.length) {
      //char at first and second matches
      if (s1[first] == s2[second]) {
        // count++;
        first++;
      }
      //move the longer word pointer
      second++;
    }
    //we reached end of string simultaneously
    return first == s1.length;
  };

  let longest = 1;
  for (let i = 1; i < N; i++) {
    //start from beginning for each i
    for (let prevIdx = 0; prevIdx < i; prevIdx++) {      
      if (isPredecessor(words[prevIdx], words[i])){
        dp[i] = Math.max(dp[i], 1 + dp[prevIdx]);
        longest = Math.max(longest, dp[i]);
      }
    }
  }
  return longest;
};
