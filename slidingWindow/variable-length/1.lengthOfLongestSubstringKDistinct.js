/* 
340. Longest Substring with At Most K Distinct Characters
https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters
Type - Medium

Given a string s and an integer k, return the length of the longest
substring of s that contains at most k distinct characters.

Example 1:
  Input: s = "eceba", k = 2
  Output: 3
  Explanation: The substring is "ece" with length 3.

Example 2:
  Input: s = "aa", k = 1
  Output: 2
  Explanation: The substring is "aa" with length 2.

Constraints:
 - 1 <= s.length <= 5 * 10^4
 - 0 <= k <= 50
*/
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
/*
Approach: Sliding Window
Time: O(N)
Space: O(K)

Runtime: 17 ms Beats 41.30%
Memory: 57.94 MB Beats 36.96%
 */
var lengthOfLongestSubstringKDistinct = function (s, k) {
  const N = s.length;
  let i = 0;
  let j = 0;
  let charMap = new Map();
  let maxLength = 0;
  while (j < N) {
    //update the character count
    charMap.set(s[j], (charMap.get(s[j]) || 0) + 1);
    //until map size is greater than k, reduce left boundary
    while (charMap.size > k) {
      const outChar = s[i];
      if (charMap.has(outChar)) {
        charMap.set(outChar, charMap.get(outChar) - 1);
        //if this char is no more in window then remove it from map
        if (charMap.get(outChar) == 0) charMap.delete(outChar);
      }
      i++;
    }
    if (charMap.size <= k) maxLength = Math.max(maxLength, j - i + 1);
    j++;
  }
  return maxLength;
};
