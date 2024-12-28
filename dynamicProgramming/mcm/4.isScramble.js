/*
87. Scramble String
https://leetcode.com/problems/scramble-string/description/
Type: Hard

We can scramble a string s to get a string t using the following algorithm:

If the length of the string is 1, stop.
If the length of the string is > 1, do the following:
Split the string into two non-empty substrings at a random index, i.e., if the string is s, divide it to x and y where s = x + y.
Randomly decide to swap the two substrings or to keep them in the same order. i.e., after this step, s may become s = x + y or s = y + x.
Apply step 1 recursively on each of the two substrings x and y.
Given two strings s1 and s2 of the same length, return true if s2 is a scrambled string of s1, otherwise, return false.

Example 1:
  Input: s1 = "great", s2 = "rgeat"
  Output: true
  Explanation: One possible scenario applied on s1 is:
  "great" --> "gr/eat" // divide at random index.
  "gr/eat" --> "gr/eat" // random decision is not to swap the two substrings and keep them in order.
  "gr/eat" --> "g/r / e/at" // apply the same algorithm recursively on both substrings. divide at random index each of them.
  "g/r / e/at" --> "r/g / e/at" // random decision was to swap the first substring and to keep the second substring in the same order.
  "r/g / e/at" --> "r/g / e/ a/t" // again apply the algorithm recursively, divide "at" to "a/t".
  "r/g / e/ a/t" --> "r/g / e/ a/t" // random decision is to keep both substrings in the same order.
  The algorithm stops now, and the result string is "rgeat" which is s2.
  As one possible scenario led s1 to be scrambled to s2, we return true.

Example 2:
  Input: s1 = "abcde", s2 = "caebd"
  Output: false
  
Example 3:
  Input: s1 = "a", s2 = "a"
  Output: true
 
Constraints:
 - s1.length == s2.length
 - 1 <= s1.length <= 30
 - s1 and s2 consist of lowercase English letters.
*/
/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
/* 
Approach I: Recursive
*/
var isScramble = function (s1, s2) {
  const solve = (a, b) => {
    if (a == b) return true;
    // if both strings are not same and one of them is of length 1
    //then they can not be same even if we scamble it
    if (a.length <= 1) return false;
    const n = a.length;
    let flag = false;
    for (let i = 1; i <= n - 1; i++) {
      //swap the partition
      const swap =
        solve(a.substr(0, i), b.substr(n - i, i)) &&
        solve(a.substr(i, n - i), b.substr(0, n - i));
      //do no swap partition
      const doNotSwap =
        solve(a.substr(0, i), b.substr(0, i)) &&
        solve(a.substr(i, n - i), b.substr(i, n - i));
      if (swap || doNotSwap) {
        flag = true;
        break;
      }
    }
    return flag;
  };
  return solve(s1, s2);
};

/* 
Approach I: Recursive with memozation
Runtime: 71 ms Beats 12.05% 
Memory: 55.82 MB Beats 50.00%
*/
var isScramble = function (s1, s2) {
  const memo = new Map();
  const solve = (a, b) => {
    if (a == b) return true;
    // if both strings are not same and one of them is of length 1
    //then they can not be same even if we scamble it
    if (a.length <= 1) return false;
    const key = `${a}-${b}`;
    if (memo.has(key)) return memo.get(key);
    const n = a.length;
    let flag = false;
    for (let i = 1; i <= n - 1; i++) {
      //swap the partition
      const swap =
        solve(a.substr(0, i), b.substr(n - i, i)) &&
        solve(a.substr(i, n - i), b.substr(0, n - i));
      //do no swap partition
      const doNotSwap =
        solve(a.substr(0, i), b.substr(0, i)) &&
        solve(a.substr(i, n - i), b.substr(i, n - i));
      if (swap || doNotSwap) {
        flag = true;
        break;
      }
    }
    memo.set(key, flag);
    return flag;
  };
  return solve(s1, s2);
};
