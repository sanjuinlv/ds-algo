/* 
265. Paint House II
https://leetcode.com/problems/paint-house-ii/
Type: Hard

There are a row of n houses, each house can be painted with one of the k colors. The cost of painting each house with a certain color is different. You have to paint all the houses such that no two adjacent houses have the same color.

The cost of painting each house with a certain color is represented by an n x k cost matrix costs.
  For example, costs[0][0] is the cost of painting house 0 with color 0; costs[1][2] is the cost of painting house 1 with color 2, and so on...

Return the minimum cost to paint all houses.

Example 1:
  Input: costs = [[1,5,3],[2,9,4]]
  Output: 5
  Explanation: Paint house 0 into color 0, paint house 1 into color 2. Minimum cost: 1 + 4 = 5; 
  Or paint house 0 into color 2, paint house 1 into color 0. Minimum cost: 3 + 2 = 5.

Example 2:
Input: costs = [[1,3],[2,4]]
Output: 5

Constraints:
 - costs.length == n
 - costs[i].length == k
 - 1 <= n <= 100
 - 2 <= k <= 20
 - 1 <= costs[i][j] <= 20
 
Follow up: Could you solve it in O(nk) runtime?
*/

/**
 * @param {number[][]} costs
 * @return {number}
 */
/* 
Approach I: Recursion + memo

Runtime: 15 ms Beats 34.69%
Memory: 50.57 MB Beats 89.80%
*/
var minCostII = function (costs) {
  const N = costs.length;
  const M = costs[0].length;
  const memo = Array.from({ length: N }, () => Array(M));

  const paint = (i, j) => {
    //base case
    if (i == N) return 0;
    if (memo[i][j]) return memo[i][j];
    //try for all colors
    let cost = Infinity;
    for (let k = 0; k < M; k++) {
      if (k == j) continue;
      cost = Math.min(cost, costs[i][k] + paint(i + 1, k));
    }
    return (memo[i][j] = cost);
  };
  //we could also loop through all colors and call paint (0, j) and return min of them
  return paint(0, -1);
};

/* 
Approach II: Tabulation
Time: O(N * k^2)
Space: O(N * k)

Runtime: 10 ms Beats 51.02%
Memory: 52.21 MB Beats 51.02%
*/

var minCostII = function (costs) {
  const N = costs.length;
  const M = costs[0].length;
  const dp = Array.from({ length: N + 1 }, () => Array(M).fill(0));

  for (let i = N - 1; i >= 0; i--) {
    for (let j = 0; j < M; j++) {
      let cost = Infinity;
      for (let k = 0; k < M; k++) {
        if (k == j) continue;
        cost = Math.min(cost, costs[i][k] + dp[i + 1][k]);
      }
      dp[i][j] = cost;
    }
  }
  let minCost = Infinity;
  for (let j = 0; j < M; j++) {
    minCost = Math.min(minCost, dp[0][j]);
  }
  return minCost;
};

//Not working
var minCostII = function (costs) {
  const N = costs.length;
  const M = costs[0].length;
  let ahead = Array(M).fill(0);
  let curr = Array(M).fill(0);
  for (let i = N - 1; i >= 0; i--) {
    for (let j = 0; j < M; j++) {
      let cost = Infinity;
      for (let k = 0; k < M; k++) {
        if (k == j) continue;
        cost = Math.min(cost, costs[i][k] + ahead[k]);
      }
      curr[j] = cost;
    }
    ahead = curr;
  }
  let minCost = Infinity;
  for (let j = 0; j < M; j++) {
    minCost = Math.min(minCost, ahead[j]);
  }
  return minCost;
};
