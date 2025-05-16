/*
90. Subsets II
https://leetcode.com/problems/subsets-ii/
Type: Medium

Given an integer array nums that may contain duplicates, return all possible subsets (the power set).
The solution set must not contain duplicate subsets. Return the solution in any order.

Example 1: 
Input: nums = [1,2,2]
Output: [[],[1],[1,2],[1,2,2],[2],[2,2]]

Example 2: 
Input: nums = [0]
Output: [[],[0]]

Constraint:
1 <= nums.length <= 10
-10 <= nums[i] <= 10
 */

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
/* 
Runtime: 84 ms, faster than 80.59% of JavaScript online submissions for Subsets II.
Memory Usage: 40.7 MB, less than 60.11% of JavaScript online submissions for Subsets II.
*/
var subsetsWithDup = function(nums) {
  let result = [];
  const N = nums.length;
  nums.sort();
  backtrack([], 0);
  
  function backtrack(curr, start) {
    result.push([...curr]);
    for (let i = start; i < N; i++){
        //skip duplicates
        if (i > start && nums[i] == nums[i-1]) continue;
        curr.push(nums[i]);
        backtrack(curr, i + 1);
        curr.pop();
    }
  }
  return result;
};