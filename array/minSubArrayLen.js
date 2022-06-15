/*
Given an array of positive integers nums and a positive integer target, return the minimal
length of a contiguous subarray [numsl, numsl+1, ..., numsr-1, numsr] of which the sum is 
greater than or equal to target. If there is no such subarray, return 0 instead.

Example 1:
Input: target = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: The subarray [4,3] has the minimal length under the problem constraint.

Example 2:
Input: target = 4, nums = [1,4,4]
Output: 1

Example 3:
Input: target = 11, nums = [1,1,1,1,1,1,1,1]
Output: 0

Constraints:

1 <= target <= 10^9
1 <= nums.length <= 10^5
1 <= nums[i] <= 10^5

Follow up: If you have figured out the O(n) solution, try coding another solution of which the time complexity is O(n log(n)).

 */
/**
 * @param {number} target
 * @param {number[]} nums
 * @return {number}
 */
/* 
Approach: Sliding window 
Time: O(N)
Space: O(1)
Runtime: 84 ms, faster than 54.70% of JavaScript online submissions for Minimum Size Subarray Sum.
Memory Usage: 41.9 MB, less than 95.43% of JavaScript online submissions for Minimum Size Subarray Sum.
*/
var minSubArrayLen = function (target, nums) {
  let left = 0;
  let minLength = Infinity;
  let sum = 0;
  for (let right = 0; right < nums.length; right++) {
    sum += nums[right];
    //contract the window while its valid
    while (sum > target) {
      sum = sum - nums[left];
      minLength = Math.min(minLength, right - left + 1);
      left++;
    }
  }
  return minLength === Infinity ? 0 : minLength;
};
