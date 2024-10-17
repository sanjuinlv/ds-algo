/* 
340. Longest Substring with At Most K Distinct Characters
https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/description/
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
 - 1 <= s.length <= 5 * 104
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

Runtime: 53 ms Beats 98.86%
Memory: 52.26 MB Beats 39.43%
 */
var lengthOfLongestSubstringKDistinct = function (s, k) {
  let N = s.length;
  let i = 0;
  let j = 0;
  let charMap = new Map();
  let maxLength = 0;
  while (j < N) {
    //update the character count
    charMap.set(s[j], (charMap.get(s[j]) || 0) + 1);
    //until map size is greater than k, reduce left boundary
    while (charMap.size > k) {
      if (charMap.has(s[i])) {
        charMap.set(s[i], charMap.get(s[i]) - 1);
        //if this char is no more in window then remove it from map
        if (charMap.get(s[i]) == 0) charMap.delete(s[i]);
      }
      i++;
    }
    if (charMap.size <= k) maxLength = Math.max(maxLength, j - i + 1);
    j++;
  }
  return maxLength;
};
