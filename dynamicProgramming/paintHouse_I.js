/* 
256. Paint House
https://leetcode.com/problems/paint-house/description/
Type: Medium

There is a row of n houses, where each house can be painted one of three colors: red, blue, or green. The cost of painting each house with a certain color is different. You have to paint all the houses such that no two adjacent houses have the same color.

The cost of painting each house with a certain color is represented by an n x 3 cost matrix costs.

  For example, costs[0][0] is the cost of painting house 0 with the color red; costs[1][2] is the cost of painting house 1 with color green, and so on...

Return the minimum cost to paint all houses.

Example 1:
  Input: costs = [[17,2,17],[16,16,5],[14,3,19]]
  Output: 10
  Explanation: Paint house 0 into blue, paint house 1 into green, paint house 2 into blue.
  Minimum cost: 2 + 5 + 3 = 10.

Example 2:
  Input: costs = [[7,6,2]]
  Output: 2
 
Constraints:
 - costs.length == n
 - costs[i].length == 3
 - 1 <= n <= 100
 - 1 <= costs[i][j] <= 20
*/
/**
 * @param {number[][]} costs
 * @return {number}
 */
/* 
Approach I: Recursion
*/
var minCost = function (costs) {
  const N = costs.length;
  const paint = (i, j) => {
    //base case
    if (i == N) return 0;
    //try for all colors
    let cost = Infinity;
    for (let k = 0; k <= 2; k++) {
      if (k == j) continue;
      cost = Math.min(cost, costs[i][k] + paint(i + 1, k));
    }
    return cost;
  };
  return paint(0, -1);
};

/* 
Approach II: Recursion + memo
Time: O(N*3) = O(N)
Space: O(N)

Runtime: 3 ms Beats 60.00%
Memory: 51.10 MB Beats 60.00%
*/

var minCost = function (costs) {
  const N = costs.length;
  const memo = Array.from({ length: N }, () => Array(3));
  const paint = (i, j) => {
    //base case
    if (i == N) return 0;
    if (memo[i][j]) return memo[i][j];
    //try for all colors
    let cost = Infinity;
    for (let k = 0; k <= 2; k++) {
      if (k == j) continue;
      cost = Math.min(cost, costs[i][k] + paint(i + 1, k));
    }
    return (memo[i][j] = cost);
  };
  return paint(0, -1);
};

/* 
Approach III: Tabulation
Time: O(N*3) = O(N)
Space: O(N)

Runtime: 4 ms Beats 42.22%
Memory: 50.58 MB Beats 82.22%
*/
var minCost = function (costs) {
  const N = costs.length;
  const dp = Array.from({ length: N + 1 }, () => Array(3).fill(0));
  for (let i = N - 1; i >= 0; i--) {
    for (let j = 0; j < 3; j++) {
      let cost = Infinity;
      for (let k = 0; k <= 2; k++) {
        if (k == j) continue;
        cost = Math.min(cost, costs[i][k] + dp[i + 1][k]);
      }
      dp[i][j] = cost;
    }
  }
  console.log(`dp`, dp);
  return Math.min(dp[0][0], dp[0][1], dp[0][2]);
};

/* 
Approach III: Bottom Up
Time: O(N*3) = O(N)
Space: O(N)

Runtime: 7 ms Beats 13.33%
Memory: 52.08 MB Beats 28.89%
*/
var minCost = function (costs) {
  const N = costs.length;
  const dp = Array.from({ length: N }, () => Array(3).fill(0));
  //Base case
  dp[0][0] = costs[0][0]; // paint 1st house with red color
  dp[0][1] = costs[0][1]; // paint 2nd house with green color
  dp[0][2] = costs[0][2]; // paint 3rd house with blue color
  for (let i = 1; i < N; i++) {
    //paint ith house with red color
    dp[i][0] = costs[i][0] + Math.min(dp[i - 1][1], dp[i - 1][2]);
    //paint ith house with green color
    dp[i][1] = costs[i][1] + Math.min(dp[i - 1][0], dp[i - 1][2]);
    //paint ith house with blue color
    dp[i][2] = costs[i][2] + Math.min(dp[i - 1][0], dp[i - 1][1]);
  }
  //min of all the color cost is answer
  return Math.min(dp[N - 1][0], dp[N - 1][1], dp[N - 1][2]);
};
