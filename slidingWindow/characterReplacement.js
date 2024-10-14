/*
424. Longest Repeating Character Replacement
https://leetcode.com/problems/longest-repeating-character-replacement/
Category - Medium

You are given a string s and an integer k. You can choose any character of the string
and change it to any other uppercase English character. You can perform this operation
at most k times.
Return the length of the longest substring containing the same letter you can get after
performing the above operations.

Example 1:
  Input: s = "ABAB", k = 2
  Output: 4
  Explanation: Replace the two 'A's with two 'B's or vice versa.

Example 2:
  Input: s = "AABABBA", k = 1
  Output: 4
  Explanation: Replace the one 'A' in the middle with 'B' and form "AABBBBA".
  The substring "BBBB" has the longest repeating letters, which is 4.
 
Constraints:
 - 1 <= s.length <= 105
 - s consists of only uppercase English letters.
 - 0 <= k <= s.length

*/
/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {};
//form discussion
const characterReplacement = (s, k) => {
  let left = 0;
  let right = 0;
  let maxCharCount = 0;
  const visited = {};
  while (right < s.length) {
    const char = s[right];
    visited[char] = visited[char] ? visited[char] + 1 : 1;
    if (visited[char] > maxCharCount) maxCharCount = visited[char];
    const lettersToChange = right - left + 1 - maxCharCount;
    if (lettersToChange > k) {
      visited[s[left]]--;
      left++;
    }
    right++;
  }
  return right - left;
};

/*
Approach: Sliding Window
Time: O(N)
Space: O(M) - The maximum number of keys in the map equals the number of unique characters in the string. Considering uppercase English letters only, m=26, it will be O(1)

Runtime: 74 ms Beats 48.75%
Memory Usage: 50.69 MB Beats 59.51%
 */
var characterReplacement = function (s, k) {
  const N = s.length;
  const visited = {};
  let left = 0;
  let maxFrequency = 0;
  let maxLength = 0;
  for (let right = 0; right < N; right++) {
    const char = s[right];
    //increase the char frequency count
    visited[char] = (visited[char] || 0) + 1;
    // the maximum frequency we have seen in any window yet
    maxFrequency = Math.max(maxFrequency, visited[char]);
    //check if the window is valid, i.e., (window size - maxFreq) <= k
    const isValid = right - left + 1 - maxFrequency <= k;
    if (!isValid) {
      // move the start pointer towards right if the current
      // window is invalid
      visited[s[left]]--;
      left++;
    }
    // the window is valid at this point, store length
    // size of the window never decreases
    maxLength = Math.max(maxLength, right - left + 1);
  }
  return maxLength;
};
