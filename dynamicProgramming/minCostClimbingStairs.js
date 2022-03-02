/**
On a staircase, the i-th step has some non-negative cost cost[i] assigned (0 indexed).

Once you pay the cost, you can either climb one or two steps. 
You need to find minimum cost to reach the top of the floor, and you can either start from the 
step with index 0, or the step with index 1.   
Example 1:
    Input: cost = [10, 15, 20]
    Output: 15
    Explanation: Cheapest is start on cost[1], pay that cost and go to the top.
Example 2:
    Input: cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
    Output: 6
    Explanation: Cheapest is start on cost[0], and only step on 1s, skipping cost[3].
 * @param {number[]} cost
 * @return {number}
 */
/*
cost = [10, 15, 20] 
cost = [1, 100, 1, 1, 1, 100, 1, 1, 100, 1]
*/
// Bottom up Approach
// Time: O(N)
// Space: O(N)
var minCostClimbingStairs = function (cost) {
  const N = cost.length;
  if (N < 2) return 0;
  const dp = [];
  dp[0] = cost[0];
  dp[1] = cost[1];
  for (let i = 2; i < N; i++) {
    dp[i] = cost[i] + Math.min(dp[i - 2], dp[i - 1]);
    console.log(`dp[${i}]: ${dp[i]}`);
  }
  console.log(`dp: ${dp}`);
  return Math.min(dp[N], dp[N - 1]);
};

/*
Dynamic Programming
Time Complexity; O(N)
Space Complexity: (1)

Runtime: 84 ms, faster than 65.98% of JavaScript online submissions for Min Cost Climbing Stairs.
Memory Usage: 39.4 MB, less than 10.54% of JavaScript online submissions for Min Cost Climbing Stairs.
*/
var minCostClimbingStairs = function (cost) {
  const N = cost.length;
  if (N < 2) return 0;
  const dp = [];
  let stepiMinusOne = cost[0];
  let stepiMinusTwo = cost[1];
  let stepiCost = 0;
  for (let i = 2; i < N; i++) {
    stepiCost = cost[i] + Math.min(stepiMinusTwo, stepiMinusOne);
    stepiMinusOne = stepiMinusTwo;
    stepiMinusTwo = stepiCost;
  }
  return Math.min(stepiMinusTwo, stepiMinusOne);
};

/*
Approach: Top-down (Recursion)
*/

var minCostClimbingStairs = function (cost) {};
