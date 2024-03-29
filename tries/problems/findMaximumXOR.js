/* 
Given an integer array nums, return the maximum result of nums[i] XOR nums[j], 
where 0 <= i <= j < n.

Example 1:
Input: nums = [3,10,5,25,2,8]
Output: 28
Explanation: The maximum result is 5 XOR 25 = 28.

Example 2:
Input: nums = [0]
Output: 0

Example 3:
Input: nums = [2,4]
Output: 6

Example 4:
Input: nums = [8,10,2]
Output: 10

Example 5:
Input: nums = [14,70,53,83,49,91,36,80,92,51,66,70]
Output: 127
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
/* 
Approach I: Brute Force
Time: O(N^2)
Space: O(1)
*/
var findMaximumXOR = function (nums) {
  if (nums.length == 1) return nums[0];
  let maxXOR = Number.MIN_VALUE;
  const N = nums.length;
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      maxXOR = Math.max(maxXOR, nums[i] ^ nums[j]); //XOR
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
