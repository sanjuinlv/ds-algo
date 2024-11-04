/*
77. Combinations
https://leetcode.com/problems/combinations
Type: Medium

Given two integers n and k, return all possible combinations of k numbers chosen from the range [1, n].
You may return the answer in any order.

Example 1:
Input: n = 4, k = 2
Output: [[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]]
Explanation: There are 4 choose 2 = 6 total combinations.
Note that combinations are unordered, i.e., [1,2] and [2,1] are considered to be the same combination.

Example 2:
Input: n = 1, k = 1
Output: [[1]]
Explanation: There is 1 choose 1 = 1 total combination.

Constraints:
 - 1 <= n <= 20
 - 1 <= k <= n
*/
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */
/* 
Approach: Backtracking
Time: O()
Space: O(k) 

Runtime: 51 ms Beats 82.23%
Memory: 121.66 MB Beats 49.10%
*/
var combine = function (n, k) {
  const backtracking = (combination, start, k) => {
    //base condition
    if (k == 0) {
      combinations.push([...combination]);
      return;
    }
    for (let i = start; i <= n; i++) {
      combination.push(i);
      backtracking(combination, i + 1, k - 1);
      //remove this to try with other combinations
      combination.pop();
    }
  };
  const combinations = [];
  backtracking([], 1, k);
  return combinations;
};
