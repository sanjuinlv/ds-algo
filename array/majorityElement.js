/*
169. Majority Element
https://leetcode.com/problems/majority-element
Type: Easy

Given an array nums of size n, return the majority element.

The majority element is the element that appears more than ⌊n / 2⌋ times. You may assume that the majority element always exists in the array.

Example 1:
Input: nums = [3,2,3]
Output: 3

Example 2:
Input: nums = [2,2,1,1,1,2,2]
Output: 2

Constraints:
 - n == nums.length
 - 1 <= n <= 5 * 10^4
 - -10^9 <= nums[i] <= 10^9

Follow-up: Could you solve the problem in linear time and in O(1) space?
 */
/**
 * @param {number[]} nums
 * @return {number}
 */

/* 
Approach I: HashMap
Time: O(N)
Space: O(N)

Runtime: 8 ms Beats 25.23%
Memory: 53.02 MB Beats 29.50%
*/
var majorityElement = function (nums) {
  const numCountMap = new Map();
  let max = { count: 0, num: -1 };
  for (let i = 0; i < nums.length; i++) {
    const num = nums[i];
    numCountMap.set(num, (numCountMap.get(num) || 0) + 1);
    if (numCountMap.get(num) > max.count) {
      max.count = numCountMap.get(num);
      max.num = num;
    }
  }
  return max.num;
};

//Optimzed hash map
/* 
Optimzed HashMap
Runtime: 2 ms Beats79.64%
Memory: 53.13 MB Beats 25.99%
*/
var majorityElement = function (nums) {
  const counts = {};
  for (let num of nums) {
    if (counts[num]) counts[num]++;
    else counts[num] = 1;
  }
  for (let num in counts) {
    if (counts[num] > nums.length / 2) return num;
  }
  return 0;
};
/* 
Approach 2: Sorting
Time: O(NLogN)
Space: O(LogN)

Runtime: 5 ms Beats 53.53%
Memory: 52.98 MB Beats 32.81%
*/
var majorityElement = function (nums) {
  nums.sort((a, b) => a - b);
  return nums[Math.floor(nums.length / 2)];
};

/* 
Approach 3: Boyer-Moore Voting Algorithm
Time: O(N)
Space: O(1)

Runtime: 0 ms Beats 100.00%
Memory: 52.51 MB Beats 46.94%
*/
var majorityElement = function (nums) {
  let candiate = null;
  let count = 0;
  for (let num of nums) {
    if (count == 0) candiate = num;
    count += num == candiate ? 1 : -1;
  }
  return candiate;
};

/* 
Approach 4: Bit Manipulation
*/