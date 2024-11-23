/* 
https://leetcode.com/problems/coin-change/
Category - Medium

You are given an integer array coins representing coins of different denominations 
and an integer amount representing a total amount of money.
Return the fewest number of coins that you need to make up that amount. If that amount
of money cannot be made up by any combination of the coins, return -1.
You may assume that you have an infinite number of each kind of coin.

Example 1:
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1

Example 2:
Input: coins = [2], amount = 3
Output: -1

Example 3:
Input: coins = [1], amount = 0
Output: 0

Constraint:
1 <= coins.length <= 12
1 <= coins[i] <= 2^31 - 1
0 <= amount <= 10^4

*/

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
/* 
Approach I : Recursion
*/
var coinChange = function (coins, amount) {
  const dp = (remain) => {
    //no change can be made from this combination
    if (remain < 0) return -1;
    //we don't need any changes for amount 0
    if (remain == 0) return 0;
    //min coins for this amount
    let minCoins = Number.MAX_VALUE;
    for (let coin of coins) {
      const count = dp(remain - coin);
      //we did not find any solution so continue with other option
      if (count == -1) continue;
      //total change will be current count + 1 for this remain amount
      minCoins = Math.min(minCoins, count + 1);
    }
    return minCoins == Number.MAX_VALUE ? -1 : minCoins;
  };
  return dp(amount);
};

/* 
Approach II: Dynamic Programming (Top Down) 

Time: O(S*n), where S is the amount, n is denomination count. In the worst case the recursive 
tree of the algorithm has height of S and the algorithm solves only S subproblems because it 
caches precalculated solutions in a table. Each subproblem is computed with nn iterations, 
one by coin denomination. Therefore there is O(S*n) time complexity
Space: O(S), where SS is the amount to change We use extra space for the memoization table

Runtime: 62 ms Beats 36.30% 
Memory: 54.57 MB Beats 70.96%
*/
var coinChange = function (coins, amount) {
  const memo = new Array(amount + 1);
  const dp = (remain) => {
    //no change can be made from this combination
    if (remain < 0) return -1;
    //we don't need any changes for amount 0
    if (remain == 0) return 0;
    if (memo[remain] != null) return memo[remain];
    //min coins for this amount
    let minCoins = Number.MAX_VALUE;
    for (let coin of coins) {
      const count = dp(remain - coin);
      //we did not find any solution so continue with other option
      if (count == -1) continue;
      //total change will be current count + 1 for this remain amount
      minCoins = Math.min(minCoins, count + 1);
    }
    memo[remain] = minCoins == Number.MAX_VALUE ? -1 : minCoins;
    return memo[remain];
  };
  return dp(amount);
};

/*
Approach: Dynamic Programming ( Bottom up)
Time: O(S*n), where S is the amount, n is denomination count. In the worst case the recursive 
tree of the algorithm has height of S and the algorithm solves only S subproblems because it 
caches precalculated solutions in a table. Each subproblem is computed with nn iterations, 
one by coin denomination. Therefore there is O(S*n) time complexity
Space: O(S), where SS is the amount to change We use extra space for the memoization table

Runtime: 46 ms Beats 52.53%
Memory Usage: 55.38 MB Beats 47.52%
 */
var coinChange = function (coins, amount) {
  const max = amount + 1;
  const dp = new Array(amount + 1).fill(max);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      //we can only use this coin if its more than current amount i
      if (i >= coin) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] > amount ? -1 : dp[amount];
};
