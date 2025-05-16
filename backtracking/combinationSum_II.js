/*
40. Combination Sum II
https://leetcode.com/problems/combination-sum-ii
Type: Medium

Given a collection of candidate numbers (candidates) and a target number (target), find all unique combinations in candidates where the candidate numbers sum to target.

Each number in candidates may only be used once in the combination.

Note: The solution set must not contain duplicate combinations.

Example 1:
Input: candidates = [10,1,2,7,6,1,5], target = 8
Output: [[1,1,6], [1,2,5], [1,7], [2,6]]

Example 2:
Input: candidates = [2,5,2,1,2], target = 5
Output: [[1,2,2],[5]]
 
Constraints:
 - 1 <= candidates.length <= 100
 - 1 <= candidates[i] <= 50
 - 1 <= target <= 30
 */
/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */

/* 
Approach I : Backtracking
Time: O(2^N)
Spce: O(N)

Runtime: 5 ms Beats 52.62% 
Memory: 52.82 MB Beats 47.38%
*/
var combinationSum2 = function (candidates, target) {
  const result = [];
  const N = candidates.length;
  //sort the array
  candidates.sort((a, b) => a - b);
  const backtrack = (i, remain, path) => {
    //target acieved
    if (remain == 0) {
      result.push([...path]);
      return;
    }
    for (let j = i; j < N; j++) {
      //skip duplicate
      if (j > i && candidates[j] == candidates[j - 1]) continue;
      const candidate = candidates[j];
      if (remain - candidate < 0) continue;
      path.push(candidate);
      backtrack(j + 1, remain - candidate, path);
      path.pop();
    }
  };
  backtrack(0, target, []);
  return result;
};
