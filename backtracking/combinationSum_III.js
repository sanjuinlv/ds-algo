/*
216. Combination Sum III
https://leetcode.com/problems/combination-sum-iii
Type: Medium

Find all valid combinations of k numbers that sum up to n such that the following conditions are true:

Only numbers 1 through 9 are used.
Each number is used at most once.
Return a list of all possible valid combinations. The list must not contain the same combination twice, and the combinations may be returned in any order.

Example 1:
  Input: k = 3, n = 7
  Output: [[1,2,4]]
  Explanation: 1 + 2 + 4 = 7
    There are no other valid combinations.

Example 2:
  Input: k = 3, n = 9
  Output: [[1,2,6],[1,3,5],[2,3,4]]
  Explanation:
    1 + 2 + 6 = 9
    1 + 3 + 5 = 9
    2 + 3 + 4 = 9
    There are no other valid combinations.

Example 3:
  Input: k = 4, n = 1
  Output: []
  Explanation: There are no valid combinations.
    Using 4 different numbers in the range [1,9], the smallest sum we can get is 1+2+3+4 = 10 and since 10 > 1, there are no valid combination.
 
Constraints:
 - 2 <= k <= 9
 - 1 <= n <= 60
*/
/**
 * @param {number} k
 * @param {number} n
 * @return {number[][]}
 */
/* 
Approach I: Backtracking
Time: O(K * C(9, K))
The algorithm involves generating all possible combinations of K distinct numbers chosen from the range [1, 9].
The number of ways to choose K distinct numbers from the set 1,2,...,9 is represented by the permutation C(9,K), which is the number of ways to arrange K numbers from 9. The formula for C(9,K) is: C(9,K) = 9! / (K! * (9−K)!)
Therefore, the overall time complexity becomes: O(K × C(9,K))

Space: O(k)

Runtime: 0 ms Beats 100.00%
Memory: 48.36 MB Beats 95.59%
*/
var combinationSum3 = function (k, n) {
  const combinations = [];
  const backtrack = (i, remain, combination) => {
    if (remain == 0 && combination.length == k) {
      combinations.push([...combination]);
      return;
    }
    for (let j = i; j < 9; j++) {
      if (remain - j < 0) continue;
      combination.push(j);
      backtrack(j + 1, remain - j, combination);
      combination.pop();
    }
  };
  backtrack(1, n, []);
  return combinations;
};
