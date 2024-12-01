/*
383. Ransom Note 
https://leetcode.com/problems/ransom-note/description/
Type: Easy

Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.

Each letter in magazine can only be used once in ransomNote.

Example 1:
Input: ransomNote = "a", magazine = "b"
Output: false

Example 2:
Input: ransomNote = "aa", magazine = "ab"
Output: false

Example 3:
Input: ransomNote = "aa", magazine = "aab"
Output: true

Constraints:
 - 1 <= ransomNote.length, magazine.length <= 105
 - ransomNote and magazine consist of lowercase English letters.
*/

/**
 * @param {string} ransomNote
 * @param {string} magazine
 * @return {boolean}
 */
/* 
Time: O(N), where N is the max length of the either string
Space: O(k), where k = 26

Runtime: 10 ms Beats 87.96%
Memory: 52.29 MB Beats 75.93%
*/
var canConstruct = function (ransomNote, magazine) {
  const charMap = new Map();
  for (const c of ransomNote) {
    charMap.set(c, (charMap.get(c) || 0) + 1);
  }
  for (const c of magazine) {
    if (charMap.has(c)) {
      charMap.set(c, charMap.get(c) - 1);
      if (charMap.get(c) == 0) charMap.delete(c);
    }
  }
  return charMap.size == 0;
};

/* 
Time: O(N), where N is the max length of the either string
Space: O(N)

Runtime: 15 ms Beats 74.59%
Memory: 53.16 MB Beats 30.96%
*/
var canConstruct = function (ransomNote, magazine) {
  const charCount = new Array(26).fill(0);
  for (const c of ransomNote) {
    charCount[c.charCodeAt(0) - "a".charCodeAt(0)]++;
  }
  for (const c of magazine) {
    charCount[c.charCodeAt(0) - "a".charCodeAt(0)]--;
  }
  for (let i = 0; i < 26; i++) {
    if (charCount[i] > 0) return false;
  }
  return true;
};
