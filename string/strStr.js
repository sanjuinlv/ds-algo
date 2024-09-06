/*
Implement strStr().

https://leetcode.com/problems/find-the-index-of-the-first-occurrence-in-a-string/
Type: Easy

Given two strings needle and haystack, return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

Clarification:

What should we return when needle is an empty string? This is a great question to ask during an interview.
For the purpose of this problem, we will return 0 when needle is an empty string. This is consistent to C's strstr() and Java's indexOf().

Example 1:
Input: haystack = "hello", needle = "ll"
Output: 2

Example 2:
Input: haystack = "aaaaa", needle = "bba"
Output: -1

Example 3:
Input: haystack = "", needle = ""
Output: 0

Constraints:
 - 0 <= haystack.length, needle.length <= 5 * 104
 - haystack and needle consist of only lower-case English characters.
 */
/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
/* 
haystack = "mississippi", needle = "issip"  - PASS
haystack = "hello", needle = "ll"           - PASS
haystack = "aaaaa", needle = "bba"          - PASS
haystack = "aabba", needle = "ba"           - PASS
haystack = "", needle = ""                  - PASS

Approach 1: 
Time complexity: O((n-m)*m), n is length of haystack and m is length of needle
Space complexity: O(1)
Runtime: 58 ms, faster than 26.08% of JavaScript online submissions for Implement strStr().
Memory Usage: 48.65 MB, less than 79.99% of JavaScript online submissions for Implement strStr().
*/
var strStr = function (haystack, needle) {
  if (!needle.length) return -1;
  const N = haystack.length;
  const M = needle.length;
  for (let i = 0; i < N - M + 1; i++) {
    let j = 0;
    while (j < M && haystack[i + j] == needle[j]) j++;
    //full length match found for `needle`, return start index
    if (j == M) return i;
  }
  return -1;
};

/* 
Approach 2: Two pointer: Linear time slice
Time complexity: O((n-m)*m), n is length of haystack and m is length of needle
Space complexity: O(1)
Runtime: 60 ms, faster than 18.13% of JavaScript online submissions for Implement strStr().
Memory Usage: 49.95 MB, less than 9.18% of JavaScript online submissions for Implement strStr().
*/
var strStr = function (haystack, needle) {
  const N = haystack.length;
  const M = needle.length;
  if (M == 0) return 0;
  let i = 0;
  while (i < N - M + 1) {
    //find the position of first needle character in haystack
    while (i < N - M + 1 && haystack[i] != needle[0]) i++;
    let j = 0;
    //compute the next matching string
    while (j < M && i < N && haystack[i] == needle[j]) {
      i++;
      j++;
    }
    if (j == M) return i - M;
    //otherwise, backtrack
    i = i - j + 1;
  }
  return -1;
};
// from Nishant
var strStr = function (haystack, needle) {
  //Ask what if needle is "" ie blank
  if (needle === "") {
    return 0;
  }
  var maxLn = haystack.length - needle.length + 1;
  for (var i = 0; i < maxLn; i++) {
    for (var j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) {
        break;
      } else {
        if (j === needle.length - 1) {
          return i;
        }
      }
    }
  }
  return -1;
};
/* 
Approach 3: Rabin Karp: Constant Time Slice
*/

/* 
Runtime: 84 ms Beats 5.02%
Memory: 38.84 MB Beats 100.00%
*/
var strStr = function(haystack, needle) {
  if (!needle.length) return 0;
  const n = haystack.length;
  const m = needle.length;
  for (let i = 0; i < n - m + 1; i++){
      if (haystack.substring(i, i + m) == needle){
          return i;
      }
  }
  return -1;
};
