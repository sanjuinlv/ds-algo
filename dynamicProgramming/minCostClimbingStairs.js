/**
https://leetcode.com/problems/min-cost-climbing-stairs/
Category - Easy

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

Constraint:
Constraints:

2 <= cost.length <= 1000
0 <= cost[i] <= 999
*/

/**
 * @param {number[]} cost
 * @return {number}
 */

/*
Approach: Top-down (Recursion with memo)
Time: O(N)
Space: O(N) (Stack size)
Runtime: 79 ms, faster than 77.85% of JavaScript online submissions for Min Cost Climbing Stairs.
Memory Usage: 42.8 MB, less than 69.42% of JavaScript online submissions for Min Cost Climbing Stairs.
*/

var minCostClimbingStairs = function (cost) {
  const N = cost.length;
  const memo = new Array(N).fill(-1);
  const minCost = (i) => {
    //base case
    if (i <= 1) return cost[i];
    if (memo[i] !== -1) return memo[i];
    //we can come to ith step either from i-1 or i-2 so we need min of those two
    memo[i] = cost[i] + Math.min(minCost(i - 1), minCost(i - 2));
    return memo[i];
  };
  //we can reach to the top either from i-1 or (i-2)th index
  return Math.min(minCost(N - 1), minCost(N - 2));
};

/*
Approach: Bottom up (Iterative)
Time: O(N)
Space: O(N)
Runtime: 94 ms, faster than 55.73% of JavaScript online submissions for Min Cost Climbing Stairs.
Memory Usage: 43 MB, less than 62.91% of JavaScript online submissions for Min Cost Climbing Stairs.
*/
var minCostClimbingStairs = function (cost) {
  const N = cost.length;
  const dp = new Array(N).fill(-1);
  //base case
  dp[0] = cost[0];
  dp[1] = cost[1];
  for (let i = 2; i < N; i++) {
    dp[i] = cost[i] + Math.min(dp[i - 1], dp[i - 2]);
  }
  return Math.min(dp[N - 1], dp[N - 2]);
};

/*
Approach: Bottom up (Constant space)
Time: O(N)
Space: O(1)
Runtime: 64 ms, faster than 95.91% of JavaScript online submissions for Min Cost Climbing Stairs.
Memory Usage: 42.8 MB, less than 45.58% of JavaScript online submissions for Min Cost Climbing Stairs.
*/
var minCostClimbingStairs = function (cost) {
  const N = cost.length;
  if (N == 1) return cost[0];
  //base case
  first = cost[0];
  second = cost[1];
  for (let i = 2; i < N; i++) {
    const third = cost[i] + Math.min(first, second);
    first = second;
    second = third;
  }
  return Math.min(first, second);
};
