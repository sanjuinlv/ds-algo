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
var twoSum1 = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if (nums[i] + nums[j] === target) {
                return [i, j];
            }
        }
    }
};

//Brute force (O(n^2))
var twoSum2 = function(nums, target) {
    for (let i = 0; i < nums.length; i++) {
        for (let j = 0; j < nums.length; j++) {
            if ((target - nums[i]) === nums[j]) {
                return [i, j];
            }
        }
    }
};

//N 
var twoSum3 = function(nums, target) {
    const map = new Map();
    map.set(target - nums[0], 0);
    for (let i = 1; i < nums.length; i++) {
        const otherIndex = map.get(nums[i]);
        if (otherIndex >= 0) {
            return [otherIndex, i];
        } else {
            map.set(target - nums[i], i);
        }
    }
};

//after reviewing approach
// Time: N, Space: N
var twoSum = function(nums, target) {
    const map = new Map();
    for (let i = 0; i < nums.length; i++) {
        compliment = target - nums[i];
        if (map.has(compliment)) {
            return [map.get(compliment), i];
        }
        map.set(nums[i], i);
    }
};
/*
Runtime: 60 ms, faster than 71.49% of JavaScript online submissions for Two Sum.
Memory Usage: 35.1 MB, less than 25.62% of JavaScript online submissions for Two Sum.
*/


var twoSum = function(nums, target) {
    const compliment = new Map();
    for (let i = 0; i < nums.length; i++) {
        if (compliment.has(target - nums[i])) {
            return [compliment.get(target - nums[i]), i];
        }
        compliment.set(nums[i], i);
    }
};
/*
Runtime: 52 ms, faster than 93.74% of JavaScript online submissions for Two Sum.
Memory Usage: 35.3 MB, less than 22.73% of JavaScript online submissions for Two Sum.
*/