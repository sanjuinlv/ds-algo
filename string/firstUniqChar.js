/* 
Given a string, find the first non-repeating character in it and return its
index. If it doesn't exist, return -1.

s = "leetcode"
return 0.

s = "loveleetcode"
return 2.

Note: You may assume the string contains only lowercase English letters.
*/
/**
 * @param {string} s
 * @return {number}
 */
/* 
Time complexity: O(N)
Space complexity: O(1) because English alphabet contains 26 letters.
Runtime: 116 ms
Memory Usage: 42 MB
Your runtime beats 62.09 % of javascript submissions.
Your memory usage beats 86.58 % of javascript submissions.
*/
var firstUniqChar = function(s) {
   const visited = new Map();
   for (let i = 0; i < s.length; i++) {
    visited.set(s[i], (visited.get(s[i]) || 0) + 1);
   }
   for (let i = 0; i < s.length; i++){
    if (visited.get(s[i]) == 1) return i;
   }
   return -1;
};
