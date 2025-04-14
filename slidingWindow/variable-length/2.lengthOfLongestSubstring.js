/**
3. Longest Substring Without Repeating Characters
https://leetcode.com/problems/longest-substring-without-repeating-characters
Type: Medium

Given a string s, find the length of the longest substring without repeating characters.

Example 1:
  Input: s = "abcabcbb"
  Output: 3
  Explanation: The answer is "abc", with the length of 3.

Example 2:
  Input: s = "bbbbb"
  Output: 1
  Explanation: The answer is "b", with the length of 1.

Example 3:
  Input: s = "pwwkew"
  Output: 3
  Explanation: The answer is "wke", with the length of 3.
  Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

Constraints:
 - 0 <= s.length <= 5 * 104
 - s consists of English letters, digits, symbols and spaces.
*/

/* 
Approach I : Sliding window with HashSet
We use HashSet to store the characters in current window [i,j] (j = i initially). 
Then we slide the index j to the right. If it is not in the HashSet, we slide j further. 
Doing so until s[j] is already in the HashSet. At this point, we found the maximum size of 
substrings without duplicate characters start with index i. If we do this for all i, 
we get our answer.

Time complexity : O(2N) = O(N). In the worst case each character will be visited twice by i and j.
Space complexity : O(min(M, N)). We need O(k) space for the sliding window, where k is the size of the Set.
The size of the Set is upper bounded by the size of the string n and the size of the charset/alphabet m.

Runtime: 82 ms Beats 64.55%
Memory: 55.25 MB Beats 39.12%
*/
var lengthOfLongestSubstring = function (s) {
  const N = s.length;
  if (N == 0) return 0;
  const seen = new Set();
  let maxLength = 0;
  let left = (right = 0);
  while (left < N && right < N) {
    if (seen.has(s[right])) {
      //The character at right pointer already seen.
      //remove the char at left pointer and increase the left pointer
      seen.delete(s[left++]);
    } else {
      seen.add(s[right++]);
      maxLength = Math.max(maxLength, seen.size);
    }
  }
  return maxLength;
};

/* 
Approach II: Sliding window 
Time: O(2N) = O(N) In the worst case each character will be visited twice by i and j.
Space: min(m,n) -  We need O(k) space for the sliding window, where k is the 
size of the Set. The size of the Set is upper bounded by the size of the string
n and the size of the charset/alphabet m

Runtime: 93 ms Beats 37.07%
Memory: 53.25 MB Beats 72.74%
*/
var lengthOfLongestSubstring = function (s) {
  const N = s.length;
  if (N == 0) return 0;
  const charMap = new Map();
  let maxLength = 0;
  let i = 0;
  let j = 0;
  while (j < N) {
    charMap.set(s[j], (charMap.get(s[j]) || 0) + 1);
    while (charMap.get(s[j]) > 1) {
      //keep removing the character from window before right,
      //until we cross the duplicate character
      charMap.set(s[i], charMap.get(s[i]) - 1);
      i++;
    }
    maxLength = Math.max(maxLength, j - i + 1);
    j++;
  }
  return maxLength;
};

/* 
approach III: Sliding Window Optimized
Time: O(N)
Space: O(1) (english char set)

Runtime: 4 ms Beats 92.32%
Memory Usage: 56.02 MB Beats 72.08% 
*/
var lengthOfLongestSubstring = function (s) {
  const N = s.length;
  let longestLength = 0;
  let i = 0;
  let j = 0;
  const charMap = new Map();
  while (j < N) {
    if (charMap.has(s[j])) {
      //The left can't be the one which we have already cross, e.g.,
      // in 'tmmzuxt' when we encounter last 't' the left is 2 (for char 'm')
      // and we can't set it to 0 for char 't'
      i = Math.max(charMap.get(s[j]) + 1, i);
    }
    longestLength = Math.max(longestLength, j - i + 1);
    charMap.set(s[j], j++);
  }
  return longestLength;
};

/* 
Using Variable length template for Sliding Window
Runtime: 5 ms Beats 85.81%
Memory: 59.16 MB Beats 34.56%
*/
var lengthOfLongestSubstring = function (s) {
  const N = s.length;
  let i = 0;
  let j = 0;
  const charMap = new Map();
  let maxLength = 0;
  while (j < N) {
    //set this char count or increase if already present
    charMap.set(s[j], (charMap.get(s[j]) || 0) + 1);
    //if map char count is less than the window size then remove elements
    //from left until map char count is same as window size, indicating duplciate chars in window
    while (charMap.size < j - i + 1) {
      const charOut = s[i];
      if (charMap.has(charOut)) {
        charMap.set(charOut, charMap.get(charOut) - 1);
        //if char count is zero then remove from map
        if (charMap.get(charOut) == 0) charMap.delete(charOut);
      }
      i++;
    }
    maxLength = Math.max(maxLength, j - i + 1);
    j++;
  }
  return maxLength;
};
