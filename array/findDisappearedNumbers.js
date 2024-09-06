/* 
https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array
Type: Easy

Given an array nums of n integers where nums[i] is in the range [1, n], return an array of all the integers in the range [1, n] that do not appear in nums.

Example 1:
Input: nums = [4,3,2,7,8,2,3,1]
Output: [5,6]

Example 2:
Input: nums = [1,1]
Output: [2] 

Constraints:
 - n == nums.length
 - 1 <= n <= 105
 - 1 <= nums[i] <= n

Follow up: Could you do it without extra space and in O(n) runtime? You may assume the returned list does not count as extra space.
*/

/**
 * @param {number[]} nums
 * @return {number[]}
 */

/* 
Approach I : Mark as seen by Negation
We will be negating the numbers seen in the array and use the sign of each of the 
numbers for finding our missing numbers. We will be treating numbers in the array
as indices and mark corresponding locations in the array as negative.

Time: O(N)
Space: O(1)

Runtime: 79 ms, faster than 82.67% of JavaScript online submissions for Find All Numbers Disappeared in an Array.
Memory Usage: 58.09 MB, less than 74.36% of JavaScript online submissions for Find All Numbers Disappeared in an Array.
*/
var findDisappearedNumbers = function (nums) {
  const N = nums.length;
  for (let i = 0; i < N; i++) {
    const index = Math.abs(nums[i]) - 1;
    //if an item is not visited then mark value at this index -ve
    if (nums[index] > 0) nums[index] *= -1;
  }
  const missing = [];
  for (let i = 0; i < N; i++) {
    if (nums[i] > 0) missing.push(i + 1);
  }
  return missing;
};

/* 
Approach I : HashSet

Time: O(N)
Space: O(N)

Runtime: 76 ms, faster than 89.90% of JavaScript online submissions for Find All Numbers Disappeared in an Array.
Memory Usage: 60.29 MB, less than 56.88% of JavaScript online submissions for Find All Numbers Disappeared in an Array.
*/
var findDisappearedNumbers = function (nums) {
  const N = nums.length;
  const seen = new Set(nums);
  const result = [];
  for (let i = 1; i < N; i++) {
    if (!seen.has(i)) result.push(i);
  }
  return result;
};
