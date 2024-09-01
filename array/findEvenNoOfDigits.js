/* 
https://leetcode.com/problems/find-numbers-with-even-number-of-digits/
Tyep: Easy

Given an array nums of integers, return how many of them contain an even number of digits.
Exp 1:
    Input: nums = [12,345,2,6,7896]
    Output: 2
    Explanation: 
    12 contains 2 digits (even number of digits). 
    345 contains 3 digits (odd number of digits). 
    2 contains 1 digit (odd number of digits). 
    6 contains 1 digit (odd number of digits). 
    7896 contains 4 digits (even number of digits). 
    Therefore only 12 and 7896 contain an even number of digits.

Exp 2:
    Input: nums = [555,901,482,1771]
    Output: 1 
    Explanation: 
    Only 1771 contains an even number of digits.    

Constraint:
 - 1 <= nums.length <= 500
 - 1 <= nums[i] <= 10^5  
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var findNumbers = function (nums) {
  let evenNumberCount = 0;
  for (let i = 0; i < nums.length; i++) {
    for (let j = 1; j <= 6; j++) {
      const result = nums[i] / Math.pow(10, j);
      if (result < 1) {
        if (j % 2 === 0) {
          evenNumberCount++;
        }
        break;
      }
    }
  }
  return evenNumberCount;
};

/* 
Approach II: Using division by 10
Runtime: 62 ms Beats 21.72%
Memory: 49.16 MB Beats 97.11%
*/
var findNumbers = function (nums) {
  let eventNumberCount = 0;
  for (let i = 0; i < nums.length; i++) {
    let num = nums[i];
    let count = 0;
    while (num != 0) {
      num = Math.floor(num / 10);
      count++;
    }
    if (count % 2 == 0) eventNumberCount++;
  }
  return eventNumberCount;
};

/* 
Approach III: Comparator
Runtime: 62 ms Beats 21.72%
Memory: 49.22 MB Beats 96.04%
*/
var findNumbers = function (nums) {
  let eventNumberCount = 0;
  for (let i = 0; i < nums.length; i++) {
    if (
      (nums[i] >= 10 && nums[i] < 100) ||
      (nums[i] >= 1000 && nums[i] < 10000) ||
      nums[i] == 100000
    ) {
      eventNumberCount++;
    }
  }
  return eventNumberCount;
};

// Using String
var findNumbers = function (nums) {
  let evenNumberCount = 0;
  for (let i = 0; i < nums.length; i++) {
    let numStr = String(nums[i]);
    if (numStr.length % 2 === 0) {
      evenNumberCount++;
    }
  }
  return evenNumberCount;
};
