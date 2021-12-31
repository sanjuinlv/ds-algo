/* 
Given two strings s and t, determine if they are isomorphic.
Two strings s and t are isomorphic if the characters in s can be replaced to get t.
All occurrences of a character must be replaced with another character while 
preserving the order of characters. No two characters may map to the same character, 
but a character may map to itself.

Example 1:
Input: s = "egg", t = "add"
Output: true

Example 2:
Input: s = "foo", t = "bar"
Output: false

Example 3:
Input: s = "paper", t = "title"
Output: true

Constraint:
    * 1 <= s.length <= 5 * 104
    * t.length == s.length
    * s and t consist of any valid ascii character.
*/
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
/*
Approach: Using HashMap
Fails for following input:
"badc"
"baba"
 */
var isIsomorphic = function (s, t) {
  const charMap = new Map();
  for (let i = 0; i < s.length; i++) {
    if (!charMap.has(s[i])) {
      charMap.set(s[i], t[i]);
    } else if (charMap.get(s[i]) != t[i]) {
      return false;
    }
  }
  return true;
};

//fix for s = "badc" and t = "baba"
/*
Using dictionary
Runtime: 80 ms, faster than 89.40% of JavaScript online submissions for Isomorphic Strings.
Memory Usage: 41.1 MB, less than 52.62% of JavaScript online submissions for Isomorphic Strings. 
Time Complexity: O(N)
Space Complexity: O(1) since the size of the ASCII character set is fixed and the keys in our dictionary are all valid ASCII characters according to the problem statement
*/
var isIsomorphic = function (s, t) {
  const mappingStoT = new Array(256).fill(-1);
  const mappingTtoS = new Array(256).fill(-1);
  for (let i = 0; i < s.length; i++) {
    const c1 = s[i];
    const c2 = t[i];
    if (
      mappingStoT[c1.codePointAt()] == -1 &&
      mappingTtoS[c2.codePointAt()] == -1
    ) {
      mappingStoT[c1.codePointAt()] = c2;
      mappingTtoS[c2.codePointAt()] = c1;
    } else if (
      !(
        mappingStoT[c1.codePointAt()] == c2 &&
        mappingTtoS[c2.codePointAt()] == c1
      )
    ) {
      return false;
    }
  }
  return true;
};

/* 
Using Dictionary (JS Object instead of array)
Runtime: 104 ms, faster than 20.75% of JavaScript online submissions for Isomorphic Strings.
Memory Usage: 41.2 MB, less than 49.60% of JavaScript online submissions for Isomorphic Strings.
*/
var isIsomorphic = function (s, t) {
  const m1 = {};
  const m2 = {};
  for (let i = 0; i < s.length; i++) {
    if (!m1[s[i]] && !m2[t[i]]) {
      m1[s[i]] = t[i];
      m2[t[i]] = s[i];
    } else if (!(m1[s[i]] == t[i] && m2[t[i]] == s[i])) {
      return false;
    }
  }
  return true;
};

/* 
Other Solutions
Using dictionary (Array)
*/
var isIsomorphic = function (s, t) {
  const m1 = new Array(256).fill(-1);
  const m2 = new Array(256).fill(-1);
  for (let i = 0; i < s.length; i++) {
    //different mapping of character at ith index in 's' and 't'
    if (m1[s[i]] != m2[t[i]]) return false;
    m1[s[i]] = i + 1;
    m2[t[i]] = i + 1;
  }
  return true;
};
