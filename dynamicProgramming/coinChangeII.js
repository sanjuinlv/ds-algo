/* 
518. Coin Change II
https://leetcode.com/problems/coin-change-ii/
Type: Medium

You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.

You may assume that you have an infinite number of each kind of coin.

The answer is guaranteed to fit into a signed 32-bit integer.

Example 1:
Input: amount = 5, coins = [1,2,5]
Output: 4
Explanation: there are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1

Example 2:
Input: amount = 3, coins = [2]
Output: 0
Explanation: the amount of 3 cannot be made up just with coins of 2.

Example 3:
Input: amount = 10, coins = [10]
Output: 1
 
Constraints:
 - 1 <= coins.length <= 300
 - 1 <= coins[i] <= 5000
 - All the values of coins are unique.
 - 0 <= amount <= 5000
*/
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
//this will count the duplicate paths so final number will be more.
//E.g., for amount 5 and coins [1,2,5] both 1+1+1+2 and 1+1+2+1 will be counted
var change = function (amount, coins) {
  let noOfCombination = 0;
  const dp = (remain) => {
    if (remain < 0) return;
    if (remain === 0) {
      noOfCombination++;
      return;
    }
    for (let coin of coins) {
      dp(remain - coin);
    }
  };
  dp(amount);
  return noOfCombination;
};

/*
Approach : Using DP
Time: O(N * amount)
Space: O(amount)
 */
var change = function (amount, coins) {
  const dp = new Array(amount + 1).fill(0);
  dp[0] = 0;
  for (let coin of coins) {
    for (let i = coin; i < amount; i++) {
      dp[i] = dp[i] + dp[i - coin];
    }
  }
  return dp[amount];
};
