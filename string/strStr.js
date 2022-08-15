/*
Implement strStr().

Return the index of the first occurrence of needle in haystack, or -1 if needle is not part of haystack.

Clarification:

What should we return when needle is an empty string? This is a great question to ask during an interview.

For the purpose of this problem, we will return 0 when needle is an empty string. This is consistent to C's strstr() and Java's indexOf().


Input: haystack = "hello", needle = "ll"
Output: 2

Input: haystack = "aaaaa", needle = "bba"
Output: -1

Input: haystack = "", needle = ""
Output: 0

Constraints:
0 <= haystack.length, needle.length <= 5 * 104
haystack and needle consist of only lower-case English characters.

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

Approach 1: substring: Linear time slice 
Time complexity: O((n-m)*m), n is lenght of haystack and m is length of needle
Space complexity: O(1)
Runtime: 84 ms, faster than 45.00% of JavaScript online submissions for Implement strStr().
Memory Usage: 38.8 MB, less than 60.13% of JavaScript online submissions for Implement strStr().
*/
var strStr = function (haystack, needle) {
  if (!needle.length) return 0;
  const n = haystack.length;
  const m = needle.length;
  for (let i = 0; i < n; i++) {
    let j = 0;
    while (j < m) {
      if (haystack[i] != needle[j++]) break;
    }
    if (j == m) return i;
  }
  return -1;
};

/* 
Approach 2: Two pointer: Linear time slice
Time complexity: O((n-m)*m), n is length of haystack and m is length of needle
Space complexity: O(1)
Runtime: 80 ms, faster than 70.13% of JavaScript online submissions for Implement strStr().
Memory Usage: 40.6 MB, less than 12.94% of JavaScript online submissions for Implement strStr().
*/
var strStr = function (haystack, needle) {
  const n = haystack.length;
  const m = needle.length;
  if (m == 0) return 0;
  let i = 0;
  while (i < n - m + 1) {
    //find the position of first needle character in haystack
    while (i < n - m + 1 && haystack[i] != needle[0]) {
      i++;
    }
    let currLength = 0,
      j = 0;
    //compute the next matching string
    while (j < m && i < n && haystack[i] == needle[j]) {
      i++;
      j++;
      currLength++;
    }
    console.log(`i: ${i}, j: ${j}, currLength: ${currLength}`);
    if (currLength == m) return i - m;
    //otherwise, backtrack
    i = i - currLength + 1;
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
