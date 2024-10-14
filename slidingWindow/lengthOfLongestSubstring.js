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

// Using 2-D array and dp
// Time complexity: O(N^2) (can it be O(N^3)) because of char look=up inside inner loop?
// Space complexity: O(N^2) (2-D array)
var lengthOfLongestSubstring = function (s) {
  const N = s.length;
  if (N == 0) return 0;
  let maxLength = 1;
  //create 2-D array
  const dp = [...Array(N)].map((x) => Array(N).fill(0));
  //fill for all i==i
  for (let i = 0; i < N; i++) {
    dp[i][i] = 1;
  }
  // compare the two char each and fill 1 for unique substring
  for (let i = 0; i < N - 1; i++) {
    if (s.charAt(i) !== s.charAt(i + 1)) {
      dp[i][i + 1] = 1;
      maxLength = 2;
    }
  }

  for (let k = 3; k <= N; k++) {
    for (let i = 0; i <= N - k; i++) {
      j = i + k - 1; // -1 for 0 index
      console.log(`i: ${i}, j: ${j}`);
      const subStringMinusOne = s.substring(i, j);
      console.log(`substring: ${subStringMinusOne}`);
      console.log(`char to add: ${s.charAt(j)}`);
      if (dp[i][j - 1] != 0 && subStringMinusOne.indexOf(s.charAt(j)) < 0) {
        console.log(`adding ${s.charAt(j)} not found in ${subStringMinusOne}`);
        dp[i][j] = 1;
        if (subStringMinusOne.length + 1 > maxLength)
          maxLength = subStringMinusOne.length + 1;
        console.log(`maxLength: ${maxLength}`);
      }
    }
  }
  console.log(`maxLength: ${maxLength}`);
  return maxLength;
};

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
  let left = (right = 0);
  while (right < N) {
    charMap.set(s[right], (charMap.get(s[right]) || 0) + 1);
    while (charMap.get(s[right]) > 1) {
      //keep removing the character from window before right,
      //until we cross the duplicate character
      charMap.set(s[left], charMap.get(s[left]) - 1);
      left++;
    }
    maxLength = Math.max(maxLength, right - left + 1);
    right++;
  }
  return maxLength;
};

/* 
approach III: Sliding Window Optimized
Time: O(N)
Space: O(1) (english char set)

Runtime: 89 ms, faster than 91.37% of JavaScript online submissions for Longest Substring Without Repeating Characters.
Memory Usage: 44.5 MB, less than 89.50% of JavaScript online submissions for Longest Substring Without Repeating Characters.
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
    charMap.set(s[j], j);
    j++;
  }
  return longestLength;
};

/* 
Time: O(N)
Space: O(1) - Only english character set
Runtime 85 ms Beats 55.32%
Memory: 53.00 MB Beats 82.30%
*/
var lengthOfLongestSubstring = function (s) {
  const N = s.length;
  if (N == 0) return 0;
  const charMap = new Map();
  let i = 0;
  let j = 0;
  let maxLength = 0;
  while (j < N) {
    if (charMap.has(s[j])) {
      maxLength = Math.max(maxLength, j - i);
      i = Math.max(charMap.get(s[j]) + 1, i);
    }
    charMap.set(s[j], j++);
  }
  return Math.max(maxLength, j - i);
};
