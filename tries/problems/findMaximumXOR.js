/* 
421. Maximum XOR of Two Numbers in an Array
https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array
Type: Medium

Given an integer array nums, return the maximum result of nums[i] XOR nums[j], 
where 0 <= i <= j < n.

Example 1:
Input: nums = [3,10,5,25,2,8]
Output: 28
Explanation: The maximum result is 5 XOR 25 = 28.

Example 2:
Input: nums = [14,70,53,83,49,91,36,80,92,51,66,70]
Output: 127

Example 3:
Input: nums = [0]
Output: 0

Example 4:
Input: nums = [2,4]
Output: 6

Example 5:
Input: nums = [8,10,2]
Output: 10

Constraints:
 - 1 <= nums.length <= 2 * 105
 - 0 <= nums[i] <= 231 - 1
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
/* 
Approach I: Brute Force
Time: O(N^2)
Space: O(1)

This will timeout 
*/
var findMaximumXOR = function (nums) {
  const N = nums.length;
  let maxXOR = 0;
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      maxXOR = Math.max(maxXOR, nums[i] ^ nums[j]);
    }
  }
  return maxXOR;
};

/* 
Approach II: Brute Force
*/
var findMaximumXOR = function (nums) {};

// [3,10,5,25,2,8]
// 25 = > 11001
