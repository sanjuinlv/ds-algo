/* 
161. One Edit Distance
https://leetcode.com/problems/one-edit-distance/
Type: Medium

Given two strings s and t, return true if they are both one edit distance apart, otherwise return false.

A string s is said to be one distance apart from a string t if you can:
 - Insert exactly one character into s to get t.
 - Delete exactly one character from s to get t.
 - Replace exactly one character of s with a different character to get t.

Example 1:
Input: s = "ab", t = "acb"
Output: true
Explanation: We can insert 'c' into s to get t.

Example 2:
Input: s = "", t = ""
Output: false
Explanation: We cannot get t from s by only one step.

Constraints:
 - 0 <= s.length, t.length <= 10^4
 - s and t consist of lowercase letters, uppercase letters, and digits.
*/
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
/* 
Approach: Tow pointers

Runtime: 2 ms Beats 43.10%
Memory: 55.10 MB Beats 5.17%
*/
var isOneEditDistance = function (s, t) {
  return helper(0, 0, s, t, 0);
};

function helper(i, j, s, t, dist) {
  if (dist > 1) return false;
  //base case
  //we exhausted both string
  if (i == s.length && j == t.length) {
    if (dist == 1) return true;
    return false;
  }
  //exhausted first string
  if (i == s.length) {
    //if one one char of t is left and dist is zero then we are one edit away
    if (j == t.length - 1) return dist == 0;
  }
  //exhausted first string
  if (j == t.length) {
    if (i == s.length - 1) return dist == 0;
  }
  if (s[i] == t[j]) {
    //continue comparing next char
    return helper(i + 1, j + 1, s, t, dist);
  }
  if (
    helper(i, j + 1, s, t, dist + 1) || //insert
    helper(i + 1, j, s, t, dist + 1) || //delete
    helper(i + 1, j + 1, s, t, dist + 1) //replace
  )
    return true;
  return false;
}

/* 
Approach II: Two pointer
Time: O(N)
Space: O(1)

Runtime: 0 ms Beats 100.00%
Memory: 55.51 MB Beats 5.88%
*/
var isOneEditDistance = function (s, t) {
  const sLength = s.length;
  const tLength = t.length;
  //ensure that s is smaller than t
  if (sLength > tLength) return isOneEditDistance(t, s);
  // The strings are NOT one edit away distance
  // if the length diff is more than 1.
  if (tLength - sLength > 1) return false;
  let sameLength = sLength === tLength;
  for (let i = 0; i < sLength; i++) {
    //chars are different
    if (s[i] != t[i]) {
      //if same length, then rest of string should be same
      if (sameLength) return s.slice(i + 1) === t.slice(i + 1);
      //the rest of t's chars from i+1 should be same as s's from i
      else return s.slice(i) === t.slice(i + 1);
    }
  }
  // If there are no diffs in ns distance
  // The strings are one edit away only if t has one more character.
  return sLength + 1 === tLength;
};