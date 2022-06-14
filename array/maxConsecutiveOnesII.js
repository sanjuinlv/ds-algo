/*
Given a binary array nums, return the maximum number of consecutive 1's in the array
if you can flip at most one 0.

Example 1:
Input: nums = [1,0,1,1,0]
Output: 4
Explanation: Flip the first zero will get the maximum number of consecutive 1s. After flipping, the maximum number of consecutive 1s is 4.

Example 2:
Input: nums = [1,0,1,1,0,1]
Output: 4


Constraints:

1 <= nums.length <= 10^5
nums[i] is either 0 or 1.
 

Follow up: What if the input numbers come in one by one as an infinite stream?
In other words, you can't store all numbers coming from the stream as it's too large
to hold in memory. Could you solve it efficiently?
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
/* 
Your runtime beats 84.12 % of javascript submissions.
Runtime: 80 ms
Memory Usage: 39.6 MB
*/
var findMaxConsecutiveOnes = function (nums) {
  if (nums.length == 1) return 1;
  let left = 0;
  let right = 0;
  let max = 0;
  let N = nums.length;
  for (let i = 0; i < N; i++) {
    if (nums[i] === 0) {
      max = Math.max(max, left + right + 1);
      left = right;
      right = 0;
    } else {
      right++;
    }
  }
  if (right >= N) return N;
  return Math.max(max, left + right + 1);
};

// Using Sliding window approach
/* 
Approach: Sliding Window
Time: O(N)
Space: O(1)
*/
var findMaxConsecutiveOnes = function (nums) {
  let start = 0,
    zeroCount = 0,
    maxConsecutiveOnes = 0;
  // number of zeros which can be flipped, in this case only 1
  let k = 1;
  for (let end = 0; end < nums.length; end++) {
    if (nums[end] === 0) {
      zeroCount++;
    }
    //evict the extra zeros, and move the start pointer
    while (zeroCount > k) {
      if (nums[start] === 0) {
        zeroCount--;
      }
      start++;
    }
    maxConsecutiveOnes = Math.max(maxConsecutiveOnes, end - start + 1);
  }
  return maxConsecutiveOnes;
};

//Sliding window (12/June/2022)
/*
Runtime: 107 ms, faster than 46.70% of JavaScript online submissions for Max Consecutive Ones II.
Memory Usage: 44.3 MB, less than 82.08% of JavaScript online submissions for Max Consecutive Ones II.
 */
var findMaxConsecutiveOnes = function (nums) {
  let left = 0;
  let right = 0;
  let zeroCount = 0;
  let longestSequence = 0;
  // K is max number of zeros we can flip
  let k = 1;
  while (right < nums.length) {
    if (nums[right] === 0) zeroCount++;
    // if our window is invalid, contract our window
    while (zeroCount > k) {
      if (nums[left] == 0) zeroCount--;
      left++;
    }
    // update our longest sequence answer
    longestSequence = Math.max(longestSequence, right - left + 1);
    right++;
  }
  return longestSequence;
};
