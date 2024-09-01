/*
https://leetcode.com/problems/max-consecutive-ones-iii/description/
Type: Medium

Given a binary array nums and an integer k, return the maximum number of consecutive
 1's in the array if you can flip at most k 0's.

Example 1:

Input: nums = [1,1,1,0,0,0,1,1,1,1,0], k = 2
Output: 6
Explanation: [1,1,1,0,0,1,1,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.

Example 2:

Input: nums = [0,0,1,1,0,0,1,1,1,0,1,1,0,0,0,1,1,1,1], k = 3
Output: 10
Explanation: [0,0,1,1,1,1,1,1,1,1,1,1,0,0,0,1,1,1,1]
Bolded numbers were flipped from 0 to 1. The longest subarray is underlined.


Constraints:

 - 1 <= nums.length <= 10^5
 - nums[i] is either 0 or 1.
 - 0 <= k <= nums.length

 */
/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */

/*
Approach: Sliding Window
Time: O(N)
Space: O(1)
Runtime: 65 ms, faster than 53.22% of JavaScript online submissions for Max Consecutive Ones III.
Memory Usage: 53.74 MB, less than 87.03% of JavaScript online submissions for Max Consecutive Ones III.
*/
var longestOnes = function (A, K) {
  let start = 0,
    zeroCount = 0,
    maxConsecutiveOnes = 0;
  for (let end = 0; end < A.length; end++) {
    if (A[end] === 0) zeroCount++;
    //evict the extra zeros, and move the start pointer
    while (zeroCount > K) {
      if (A[start] === 0) {
        zeroCount--;
      }
      start++;
    }
    maxConsecutiveOnes = Math.max(maxConsecutiveOnes, end - start + 1);
  }
  return maxConsecutiveOnes;
};
