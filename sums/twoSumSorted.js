/* 
Given an array of integers that is already sorted in ascending order, find two numbers such that 
they add up to a specific target number.
The function twoSum should return indices of the two numbers such that they add up to the target, 
where index1 must be less than index2.

Note:
Your returned answers (both index1 and index2) are not zero-based.
You may assume that each input would have exactly one solution and you may not use the same element twice.

Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore index1 = 1, index2 = 2.

Input: numbers = [2,3,4], target = 6
Output: [1,3]

Input: numbers = [-1,0], target = -1
Output: [1,2]
*/
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    let left = 0; right = numbers.length - 1;
    let sum = 0;
    while (left < right) {
        sum = numbers[left] + numbers[right];
        if (sum === target) {
            return [left + 1, right + 1];
        };
        if (sum > target) right--;
        else left++;
    }
    return [-1, -1];
};


/*
Runtime: 56 ms, faster than 76.04 % of JavaScript online submissions for Two Sum II - Input array is sorted.
Memory Usage: 35.1 MB, less than 78.26 % of JavaScript online submissions for Two Sum II - Input array is sorted.
*/