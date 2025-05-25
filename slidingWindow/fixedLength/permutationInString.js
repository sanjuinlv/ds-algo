/* 
567. Permutation in String
https://leetcode.com/problems/permutation-in-string/
Type: Medium

Given two strings s1 and s2, return true if s2 contains a permutation of s1, or false otherwise.
In other words, return true if one of s1's permutations is the substring of s2.

Example 1:
Input: s1 = "ab", s2 = "eidbaooo"
Output: true
Explanation: s2 contains one permutation of s1 ("ba").

Example 2:
Input: s1 = "ab", s2 = "eidboaoo"
Output: false

Constraints:
 - 1 <= s1.length, s2.length <= 10^4
 - s1 and s2 consist of lowercase English letters.
*/
/* 
Approach: Sliding Window

Runtime: 16 ms Beats 60.98%
Memory: 57.74 MB Beats 61.61%
*/
var checkInclusion = function (s1, s2) {
  const N = s2.length;
  const charMap = new Map();
  for (let c of s1) {
    charMap.set(c, (charMap.get(c) || 0) + 1);
  }
  let i = 0;
  let j = 0;
  const k = s1.length;
  let count = charMap.size;
  while (j < N) {
    //calculation
    const char = s2[j];
    if (charMap.has(char)) {
      charMap.set(char, charMap.get(char) - 1);
      if (charMap.get(char) == 0) count--;
    }
    //window size matched
    if (j - i + 1 == k) {
      if (count == 0) return true;
      //remove char from left
      const outChar = s2[i];
      if (charMap.has(outChar)) {
        const outCharCount = charMap.get(outChar);
        if (outCharCount == 0) count++;
        charMap.set(outChar, outCharCount + 1);
      }
      i++;
    }
    j++;
  }
  return false;
};