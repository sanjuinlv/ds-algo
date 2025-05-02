/* 
78. Subsets
https://leetcode.com/problems/subsets/
Type: Medium

Given an integer array nums of unique elements, return all possible subsets (the power set).
The solution set must not contain duplicate subsets. Return the solution in any order.

Example 1:
Input: nums = [1,2,3]
Output: [[],[1],[2],[1,2],[3],[1,3],[2,3],[1,2,3]]

Example 2:
Input: nums = [0]
Output: [[],[0]]

constraint:
  - 1 <= nums.length <= 10
  - -10 <= nums[i] <= 10
  -  All the numbers of nums are unique.

*/
/* 
Approach I: Backtrack

Time complexity: O(N X 2^N) to generate all subsets and then copy them into output list
Space complexity: O(N X 2^N) to keep all subsets of length N, since each of N elements could be present or absent

Runtime: 0 ms Beats 100.00%
Memory Usage: 54.39 MB Beats 84.38% 
*/
var subsets = function (nums) {
  const result = [];
  const N = nums.length;
  const backtrack = (i, path) => {
    result.push([...path]);
    for (let j = i; j < N; j++) {
      // add nums[i] into the current combination
      path.push(nums[j]);
      // use next integers to complete the combination
      backtrack(j + 1, path);
      //remove this num to try with other num
      path.pop();
    }
  };
  backtrack(0, []);
  return result;
};