/* 
325. Maximum Size Subarray Sum Equals k
https://leetcode.com/problems/maximum-size-subarray-sum-equals-k/description/
Type - Medium

Given an integer array nums and an integer k, return the maximum length of a
subarray that sums to k. If there is not one, return 0 instead.
 
Example 1:
    Input: nums = [1,-1,5,-2,3], k = 3
    Output: 4
    Explanation: The subarray [1, -1, 5, -2] sums to 3 and is the longest.

Example 2:
    Input: nums = [-2,-1,2,1], k = 1
    Output: 2
    Explanation: The subarray [-1, 2] sums to 1 and is the longest.

Constraints:
 - 1 <= nums.length <= 2 * 10^5
 - -10^4 <= nums[i] <= 10^4
 - -10^9 <= k <= 10^9
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */

var maxSubArrayLen = function (nums, k) {
  const N = nums.length;
  let i = 0;
  let j = 0;
  let sum = 0;
  let maxSize = -Infinity;
  while (j < N) {
    // sum += nums[j];
    // if (sum == k) maxSize = Math.max(maxSize, j - i + 1);
    // else {
    //   while (sum > k) sum -= nums[i++];
    // }
    // j++;
  }
  return maxSize;
};

