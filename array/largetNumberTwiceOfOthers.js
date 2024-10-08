/* 
https://leetcode.com/problems/largest-number-at-least-twice-of-others
Type: Easy

You are given an integer array nums where the largest integer is unique.

Determine whether the largest element in the array is at least twice as much as every
other number in the array. If it is, return the index of the largest element, or return -1 otherwise.

Example 1:

Input: nums = [3,6,1,0]
Output: 1
Explanation: 6 is the largest integer.
For every other number in the array x, 6 is at least twice as big as x.
The index of value 6 is 1, so we return 1.

Example 2:

Input: nums = [1,2,3,4]
Output: -1
Explanation: 4 is less than twice the value of 3, so we return -1.

Example 3:

Input: nums = [1]
Output: 0
Explanation: 1 is trivially at least twice the value as any other number because there are no other numbers.

Constraints:

 - 1 <= nums.length <= 50
 - 0 <= nums[i] <= 100
 - The largest element in nums is unique.
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
/* 
Approach I: Use two max
Find max and second max. If max is >= to twice of second max then max will be 
at least twice of all other elements.
Time: O(N)
Space: O(1)

Runtime: 97 ms
Memory Usage: 42.4 MB
Your runtime beats 27.94 % of javascript submissions.
Your memory usage beats 21.39 % of javascript submissions.
*/
var dominantIndex = function (nums) {
  let max = -Infinity;
  let secondMax = -Infinity;
  let index = -1;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > max) {
      secondMax = max;
      max = nums[i];
      index = i;
    } else if (nums[i] > secondMax) {
      secondMax = nums[i];
    }
  }
  return max > secondMax * 2 ? index : -1;
};

/* 
Time: O(N)
Space: O(1)
Runtime: 59 ms Beats 26.65%
Memory: 49.15 MB Beats 37.73%
*/
var dominantIndex = function (nums) {
  const N = nums.length;
  let max = Number.NEGATIVE_INFINITY;
  let index = -1;
  for (let i = 0; i < N; i++) {
    if (nums[i] > max) {
      max = nums[i];
      index = i;
    }
  }
  for (let i = 0; i < N; i++) {
    if (i == index) continue;
    if (nums[i] * 2 > max) return -1;
  }
  return index;
};

/*
Approach: Only using the max index 
Time: O(N)
Space: O(1)
Runtime: 59 ms Beats 26.65%
Memory: 48.92 MB Beats 63.85%
*/
var dominantIndex = function (nums) {
  const N = nums.length;
  let index = 0;
  for (let i = 1; i < N; i++) {
    if (nums[i] > nums[index]) {
      index = i;
    }
  }
  for (let i = 0; i < N; i++) {
    if (i == index) continue;
    if (nums[i] * 2 > nums[index]) return -1;
  }
  return index;
};
