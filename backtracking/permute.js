/* 
46. Permutations
https://leetcode.com/problems/permutations/
Type: Medium

Given an array nums of distinct integers, return all the possible permutations. 
You can return the answer in any order.

Example 1:
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

Example 2:
Input: nums = [0,1]
Output: [[0,1],[1,0]]

Example 3:
Input: nums = [1]
Output: [[1]]

Constraints:
  -   1 <= nums.length <= 6
  -   -10 <= nums[i] <= 10
  -   All the integers of nums are unique.
*/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

/* 
Backtracking
Time: O(N * N!)
Given a set of length n, the number of permutations is n! (n factorial). There are n options for the first number, n−1 for the second, and so on.
For each of the n! permutations, we need O(n) work to copy curr into the answer. This gives us O(n * n!) work.
Space: O(N)

Runtime: 3 ms Beats 47.39%
Memory Usage: 52.92 MB Beats 83.99%
*/
var permute = function (nums) {
  const permutations = [];
  const N = nums.length;
  const visited = new Set();
  const backtrack = (permutation) => {
    if (permutation.length == N) {
      permutations.push([...permutation]);
      return;
    }
    for (let i = 0; i < N; i++) {
      const num = nums[i];
      //check if this element is not visited already
      if (visited.has(num)) continue;
      visited.add(num);
      permutation.push(num);
      backtrack(permutation);
      //remove it from visited set
      visited.delete(num);
      //remove it from permutation to try with other number
      permutation.pop();
    }
  };
  backtrack([]);
  return permutations;
};
