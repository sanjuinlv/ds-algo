/** 
 * Given an array of integers, return indices of the two numbers such that they add up to a specific target.
 * You may assume that each input would have exactly one solution, and you may not use the same element twice.
    Given nums = [2, 7, 11, 15], target = 9,
    Because nums[0] + nums[1] = 2 + 7 = 9,
    return [0, 1].
 * 
 * 
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