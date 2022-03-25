/**

Given a string s, find the length of the longest substring without repeating characters.

Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.

Input: s = "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3.
Notice that the answer must be a substring, "pwke" is a subsequence and not a substring.

Input: s = ""
Output: 0
*/
/**
 * This solution will only work when longest substring is formed from beginning
 * s = "abcabcbb"   - PASS
 * s = "bbbbb"      - PASS
 * s = "pwwkew"     - FAIL
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const N = s.length;
  if (N == 0) return 0;
  let local_max = s[0];
  let global_max = "";
  for (i = 1; i < N; i++) {
    if (local_max.indexOf(s.charAt(i)) < 0) {
      local_max += s.charAt(i);
    }
    console.log(`local_max: ${local_max}`);
    if (local_max.length > global_max.length) global_max = local_max;
    console.log(`gloabl_max: ${global_max}`);
  }
  console.log(`final gloabl_max: ${global_max}`);
  return global_max.length;
};

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

// Using Sliding window approach
/* 
    We use HashSet to store the characters in current window [i, j)[i,j) (j = ij=i initially). 
    Then we slide the index jj to the right. If it is not in the HashSet, we slide jj further. 
    Doing so until s[j] is already in the HashSet. At this point, we found the maximum size of 
    substrings without duplicate characters start with index ii. If we do this for all ii, 
    we get our answer.
 */
// Time complexity : O(2n) = O(n). In the worst case each character will be visited twice by i and j.
// Space complexity : O(min(m, n)). We need O(k) space for the sliding window, where k is the size of the Set.
// The size of the Set is upper bounded by the size of the string n and the size of the charset/alphabet m.
var lengthOfLongestSubstring = function (s) {
  const N = s.length;
  let maxLength = 0;
  let leftPointer = 0;
  let rightPointer = 0;
  const seen = new Set();
  while (leftPointer < N && rightPointer < N) {
    if (!seen.has(s.charAt(rightPointer))) {
      seen.add(s.charAt(rightPointer));
      rightPointer++;
      maxLength = Math.max(maxLength, seen.size);
    } else {
      /* the character at right pointer already seen. So remove the char at left pointer 
               and increase the left pointer
            */
      seen.delete(s.charAt(leftPointer));
      leftPointer++;
    }
  }
  return maxLength;
};

// For submission
//Runtime: 108 ms, faster than 78.75% of JavaScript online submissions for Longest Substring Without Repeating Characters.
//Memory Usage: 42.7 MB, less than 5.23% of JavaScript online submissions for Longest Substring Without Repeating Characters.
var lengthOfLongestSubstring = function (s) {
  const N = s.length;
  let maxLength = 0;
  let leftPointer = 0;
  let rightPointer = 0;
  const seen = new Set();
  while (leftPointer < N && rightPointer < N) {
    if (!seen.has(s.charAt(rightPointer))) {
      seen.add(s.charAt(rightPointer));
      rightPointer++;
      maxLength = Math.max(maxLength, seen.size);
    } else {
      seen.delete(s.charAt(leftPointer));
      leftPointer++;
    }
  }
  return maxLength;
};

//17/03/2022
//Solution reference
/* 
Sliding window
Time: O(2N) = O(N) In the worst case each character will be visited twice by i and j.
Space: min(m,n) -  We need O(k) space for the sliding window, where k is the 
size of the Set. The size of the Set is upper bounded by the size of the string
n and the size of the charset/alphabet m
*/
var lengthOfLongestSubstring = function (s) {
  const N = s.length;
  let maxLength = 0;
  let left = 0;
  let right = 0;
  let charMap = new Map();
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
Sliding Window Optimized
Time: O(N)
Space: O(1) (english char set)
Runtime: 89 ms, faster than 91.37% of JavaScript online submissions for Longest Substring Without Repeating Characters.
Memory Usage: 44.5 MB, less than 89.50% of JavaScript online submissions for Longest Substring Without Repeating Characters.
*/
var lengthOfLongestSubstring = function (s) {
  const N = s.length;
  let longestLength = 0;
  let left = 0;
  let right = 0;
  const charMap = new Map();
  while (right < N) {
    if (charMap.has(s[right])) {
      //The left can't be the one which we have already cross, e.g.,
      // in 'tmmzuxt' when we encounter last 't' the left is 2 (for char 'm')
      // and we can't set it to 0 for char 't'
      left = Math.max(charMap.get(s[right]) + 1, left);
    }
    longestLength = Math.max(longestLength, right - left + 1);
    charMap.set(s[right], right);
    right++;
  }
  return longestLength;
};
