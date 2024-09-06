/* 
https://leetcode.com/problems/longest-common-prefix/
Type: Easy

Write a function to find the longest common prefix string amongst an array of strings.
If there is no common prefix, return an empty string "".

Example 1:
Input: strs = ["flower","flow","flight"]
Output: "fl"

Example 2:
Input: strs = ["dog","racecar","car"]
Output: ""
Explanation: There is no common prefix among the input strings.
 
Constraints:
0 <= strs.length <= 200
0 <= strs[i].length <= 200
strs[i] consists of only lower-case English letters.
*/

/**
 * @param {string[]} strs
 * @return {string}
 */
/*
Approach I: Brute force comparision of all string's character one by one
Time complexity: O(S), where S is the sum of all characters in all strings. 
In the worst case there will be n equal strings with length m and the algorithm 
performs S = m * n character comparisons.

Space: O(L) - Length of prefix

strs = ["flower","flow","flight"] -  PASS
strs = ["dog","racecar","car"] - PASS
strs = [""] - PASS

Runtime: 88 ms, faster than 53.67% of JavaScript online submissions for Longest Common Prefix.
Memory Usage: 39.6 MB, less than 43.54% of JavaScript online submissions for Longest Common Prefix.
 */
var longestCommonPrefix = function(strs) {
  if (!strs.length) return "";
 //find the min length of intput string
 let minLength = Number.MAX_VALUE;
 strs.forEach(str => {
     if (str.length < minLength) minLength = str.length;
 });
 let lcp = "";
 //loop through the each entry of array and compare the char at ith position
 for (let i = 0; i < minLength; i++){
     let prefix = strs[0][i];
     for (let j = 1; j < strs.length; j++){
       //mismatch found, return current lcp
       if (strs[j][i] != prefix) return lcp;
     }
     lcp += `${prefix}`;
 }
 return lcp;
};

/* 
We can avoid using the space by using the index till where the match was 
found, the returning the string sliced from till that index

Space Complexity: O(1)
Runtime: 76 ms, faster than 5.30% of JavaScript online submissions for Longest Common Prefix.
Memory Usage: 39.38 MB, less than 100% of JavaScript online submissions for Longest Common Prefix.
*/
var longestCommonPrefix = function (strs) {
  if (!strs.length) return "";
  //find the min length of intput string
  let minLength = Number.MAX_VALUE;
  strs.forEach((str) => {
    if (str.length < minLength) minLength = str.length;
  });
  //loop through the each entry of array and compare the char at ith position
  let i = 0;
  while (i < minLength) {
    let prefix = strs[0][i];
    for (let j = 1; j < strs.length; j++) {
      //mismatch found, return current lcp
      if (strs[j][i] != prefix) return strs[0].slice(0, i);
    }
    i++;
  }
  return strs[0].slice(0, i);
};

/* 
Approach II: Horizontal scanning
(Without using min length)
Time: O(S), where S is the sum of all characters in all strings. 
In the worst case all n strings are the same. The algorithm compares the string S1 with the other strings [S2…Sn].
There are S character comparisons, where S is the sum of all characters in the input array.
Space: O(1): We only used constant extra space.

Runtime: 80 ms, faster than 5.30% of JavaScript online submissions for Longest Common Prefix.
Memory Usage: 38.9 MB, less than 100% of JavaScript online submissions for Longest Common Prefix.
*/
var longestCommonPrefix = function (strs) {
  if (!strs.length) return "";
  let prefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    while (strs[i].indexOf(prefix) != 0) {
      //keep reducing the prefix until we find the match
      prefix = prefix.slice(0, prefix.length - 1);
    }
  }
  return prefix;
};

/* 
Approach III:
Variation of above (optimized than above)
Time: O(S) where S is the sum of all characters in all strings. 
Space: O(1)

Runtime: 60 ms Beats 33.87% 
Memory: 49.93 MB Beats 41.44%
*/
var longestCommonPrefix = function (strs) {
  let longestPrefix = strs[0];
  for (let i = 1; i < strs.length; i++) {
    const s2 = strs[i];
    //compare s1 and s2 until the characters matched
    let j = 0;
    while (j < longestPrefix.length && longestPrefix[j] == s2[j]) j++;
    //if no match found then we don't have common prefix. Terminate early
    if (j == 0) return "";
    //if new length is less then record the longestPrefix
    if (j < longestPrefix.length) longestPrefix = longestPrefix.slice(0, j);
  }
  return longestPrefix;
};
/* 
Approach IV:
 */
// Need to solve this once study on tries is over
// https://leetcode.com/problems/longest-common-prefix/solution/
