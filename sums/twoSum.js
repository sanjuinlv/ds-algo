/*
1. Two Sum
https://leetcode.com/problems/two-sum/description/
Type: Easy

Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1] 

Constraints:
 * 2 <= nums.length <= 10^4
 * -10^9 <= nums[i] <= 10^9
 * -10^9 <= target <= 10^9
Only one valid answer exists.

*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
//Brute force (O(n^2))
var twoSum = function (nums, target) {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] == target - nums[i]) return [i, j];
    }
  }
};

/*
Approach I:  Using Hashtable
Runtime: 60 ms, faster than 71.49% of JavaScript online submissions for Two Sum.
Memory Usage: 35.1 MB, less than 25.62% of JavaScript online submissions for Two Sum.
*/
var twoSum = function (nums, target) {
  const compliment = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (compliment.has(target - nums[i])) {
      return [compliment.get(target - nums[i]), i];
    }
    compliment.set(nums[i], i);
  }
};

//III
var twoSum = function (nums, target) {
  const compliment = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (compliment.has(nums[i])) return [i, compliment.get(nums[i])];
    compliment.set(target - nums[i], i);
  }
};