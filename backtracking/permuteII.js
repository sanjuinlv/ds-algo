/* 
47. Permutations II
https://leetcode.com/problems/permutations-ii/
Type: Medium

Given a collection of numbers, nums, that might contain duplicates, return all possible 
unique permutations in any order.

Example 1: 
Input: nums = [1,1,2]
Output:
[[1,1,2],
 [1,2,1],
 [2,1,1]]

Example 2:
Input: nums = [1,2,3]
Output: [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]

Contraints:
1 <= nums.length <= 8
-10 <= nums[i] <= 10
*/
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

/* 
Approach: Backtrack
Time: O(N * N!)
Space: O(N)

Runtime: 2 ms Beats 91.62%
Memory Usage: 52.05 MB Beats 99.20%
*/
var permuteUnique = function (nums) {
    const permutations = [];
    const N = nums.length;
    const visited = new Array(nums.length).fill(false);
    const backtrack = (permutation) => {
      if (permutation.length == N) {
        permutations.push([...permutation]);
        return;
      }
      const unique = new Set();
      for (let i = 0; i < N; i++) {
        const num = nums[i];
        if (unique.has(num)) continue;
        //check if this element is not visited already
        if (visited[i]) continue;
        visited[i] = true;
        unique.add(num);
        permutation.push(num);
        backtrack(permutation);
        //remove it from visited set
        visited[i] = false;
        //remove it from permutation to try with other number
        permutation.pop();
      }
    };
    backtrack([]);
    return permutations;
  };
  