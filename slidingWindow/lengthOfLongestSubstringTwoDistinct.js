/*
https://leetcode.com/problems/longest-substring-with-at-most-two-distinct-characters/solution/
Category - Medium

Given a string s, return the length of the longest substring that contains at most
two distinct characters.

Example 1:

Input: s = "eceba"
Output: 3
Explanation: The substring is "ece" which its length is 3.

Example 2:

Input: s = "ccaabbb"
Output: 5
Explanation: The substring is "aabbb" which its length is 5.

Constraints:

1 <= s.length <= 105
s consists of English letters.

The same solution will also work for 
https://leetcode.com/problems/longest-substring-with-at-most-k-distinct-characters/submissions/

 */
/**
 * @param {string} s
 * @return {number}
 */
/* 
Approach: Sliding Window
Time: O(N)
Space: O(1), only english characters
*/
var lengthOfLongestSubstringTwoDistinct = function (s) {
  let maxLength = 0;
  let charMap = new Map();
  let left = 0;
  //max allowed number of distinct element
  let k = 2;
  for (let right = 0; right < s.length; right++) {
    // if (!charMap.has(s[right])) charMap.set(s[right], 1);
    charMap.set(s[right], (charMap.get(s[right]) || 0) + 1);
    //if the map size exceeds the allowed distinct element then move the left window
    while (charMap.size > k) {
      //reduce the char count in map
      charMap.set(s[left], charMap.get(s[left]) - 1);
      if (charMap.get(s[left]) == 0) charMap.delete(s[left]);
      left++;
    }
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
};
