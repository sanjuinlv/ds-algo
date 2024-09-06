/*
https://leetcode.com/problems/two-sum-ii-input-array-is-sorted
Type: Medium

Given a 1-indexed array of integers numbers that is already sorted in non-decreasing order, find two numbers such that they add up to a specific target number. Let these two numbers be numbers[index1] and numbers[index2] where 1 <= index1 < index2 <= numbers.length.

Return the indices of the two numbers, index1 and index2, added by one as an integer array [index1, index2] of length 2.
The tests are generated such that there is exactly one solution. You may not use the same element twice.
Your solution must use only constant extra space.

Note:
Your returned answers (both index1 and index2) are not zero-based.
You may assume that each input would have exactly one solution and you may not use the same element twice.

Example 1:
Input: numbers = [2,7,11,15], target = 9
Output: [1,2]
Explanation: The sum of 2 and 7 is 9. Therefore index1 = 1, index2 = 2. We return [1, 2].

Example 2:
Input: numbers = [2,3,4], target = 6
Output: [1,3]
Explanation: The sum of 2 and 4 is 6. Therefore index1 = 1, index2 = 3. We return [1, 3].

Example 3:
Input: numbers = [-1,0], target = -1
Output: [1,2]
Explanation: The sum of -1 and 0 is -1. Therefore index1 = 1, index2 = 2. We return [1, 2].

*/
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
/* 
Time: O(n). The input array is traversed at most once. Thus the time complexity is O(n).
Space: O(1). We only use additional space to store two indices and the sum, so the space complexity is O(1).
*/
var twoSum = function (numbers, target) {
  let left = 0;
  right = numbers.length - 1;
  let sum = 0;
  while (left < right) {
    sum = numbers[left] + numbers[right];
    if (sum === target) {
      return [left + 1, right + 1];
    }
    if (sum > target) right--;
    else left++;
  }
  return [-1, -1];
};

/*
Runtime: 56 ms, faster than 76.04 % of JavaScript online submissions for Two Sum II - Input array is sorted.
Memory Usage: 35.1 MB, less than 78.26 % of JavaScript online submissions for Two Sum II - Input array is sorted.
*/

//14/03/2022
/*
Runtime: 60 ms, faster than 97.69% of JavaScript online submissions for Two Sum II - Input Array Is Sorted.
Memory Usage: 43.4 MB, less than 14.08% of JavaScript online submissions for Two Sum II - Input Array Is Sorted. 
*/
var twoSum = function (numbers, target) {
  let left = 0;
  right = numbers.length - 1;
  while (left < right) {
    if (numbers[left] + numbers[right] === target) {
      return [left + 1, right + 1];
    }
    if (numbers[left] + numbers[right] > target) {
      right--;
    } else {
      left++;
    }
  }
  return [-1, -1];
};
