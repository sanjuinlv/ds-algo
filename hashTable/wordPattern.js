/* 
290. Word Pattern
https://leetcode.com/problems/word-pattern/?envType=study-plan-v2&envId=top-interview-150
Type: Easy

Given a pattern and a string s, find if s follows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s. Specifically:

Each letter in pattern maps to exactly one unique word in s.
Each unique word in s maps to exactly one letter in pattern.
No two letters map to the same word, and no two words map to the same letter.
 

Example 1:
Input: pattern = "abba", s = "dog cat cat dog"
Output: true
Explanation:
The bijection can be established as:
 - 'a' maps to "dog".
 - 'b' maps to "cat".

Example 2:
Input: pattern = "abba", s = "dog cat cat fish"
Output: false

Example 3:
Input: pattern = "aaaa", s = "dog cat cat dog"
Output: false

Constraints:
 - 1 <= pattern.length <= 300
 - pattern contains only lower-case English letters.
 - 1 <= s.length <= 3000
 - s contains only lowercase English letters and spaces ' '.
 - s does not contain any leading or trailing spaces.
 - All the words in s are separated by a single space.
*/
/**
 * @param {string} pattern
 * @param {string} s
 * @return {boolean}
 */
/* 
Approach: Hashtable
Time: O(N+M), where N is length of s and M length of pattern
space: O(N), N is lenght of the s. For pattern we just need 26 characters to store in Map

Runtime: 0 ms Beats 100.00%
Memory: 49.21 MB Beats 13.29%
*/
var wordPattern = function (pattern, s) {
  const words = s.split(" ");
  //the unque entries in both map should be same
  if (words.length !== pattern.length) return false;
  const patToWordMap = new Map();
  const wordToPatMap = new Map();
  //check mapping count
  for (let i = 0; i < pattern.length; i++) {
    const c = pattern[i];
    if (!patToWordMap.has(c)) {
      //check if this word is not already mapped to another pattern char
      if (wordToPatMap.has(words[i])) return false;
      patToWordMap.set(c, words[i]);
      wordToPatMap.set(words[i], c);
    } else if (patToWordMap.get(c) !== words[i]) return false;
  }
  return true;
};

/* 
Approach II: Using Single Index Hash Map
Time: O(N + M)
Space: O(N), where N is lenght of the string

Runtime: 0 ms Beats 100.00%
Memory: 48.71 MB Beats 68.35%
*/
var wordPattern = function (pattern, s) {
  const words = s.split(" ");
  //the unque entries in both map should be same
  if (words.length !== pattern.length) return false;
  const indexMap = new Map();
  for (let i = 0; i < pattern.length; i++) {
    //add prefix to char and word to differentiate when both patter and word are char
    //e.g, pattern ="abc", s="b c a"
    const c = "char_" + pattern[i];
    const word = "word_" + words[i];
    //if this char is not found in map then store with index position
    if (!indexMap.has(c)) indexMap.set(c, i);
    //if this word is not found in map then store with index position
    if (!indexMap.has(word)) indexMap.set(word, i);
    //if char index and word index is not same then correct pattern order is not found.
    if (indexMap.get(c) != indexMap.get(word)) return false;
  }
  return true;
};
