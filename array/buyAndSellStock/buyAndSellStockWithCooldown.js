/* 
309. Best Time to Buy and Sell Stock with Cooldown
https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-cooldown
Type: Medium

You are given an array prices where prices[i] is the price of a given stock on the ith day.

Find the maximum profit you can achieve. You may complete as many transactions as you like (i.e., buy one and sell one share of the stock multiple times) with the following restrictions:

After you sell your stock, you cannot buy stock on the next day (i.e., cooldown one day).
Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

Example 1:
  Input: prices = [1,2,3,0,2]
  Output: 3
  Explanation: transactions = [buy, sell, cooldown, buy, sell]

Example 2:
  Input: prices = [1]
  Output: 0
 
Constraints:
 - 1 <= prices.length <= 5000
 - 0 <= prices[i] <= 1000
*/
/**
 * @param {number[]} prices
 * @return {number}
 */
/* 
Approach I: Recursive
*/
var maxProfit = function (prices) {
  const N = prices.length;
  const solve = (i, buy) => {
    //base case
    //we reaced end of input
    if (i == N) return 0;
    let profit = 0;
    if (buy) {
      profit = Math.max(-prices[i] + solve(i + 1, 0), solve(i + 1, buy));
    } else {
      profit = Math.max(prices[i] + solve(i + 2, 1), solve(i + 1, buy));
    }
    return profit;
  };
  return solve(0, 1);
};

/* 
Approach II: Recursive + Memo

Runtime: 2 ms Beats 62.83%
Memory: 49.91 MB Beats 75.66%
*/
var maxProfit = function (prices) {
  const N = prices.length;
  const dp = Array.from({ length: N }, () => Array(2));
  const solve = (i, buy) => {
    //base case
    //we reaced end of input
    if (i >= N) return 0;
    if (dp[i][buy] != null) return dp[i][buy];
    let profit = 0;
    if (buy) {
      profit = Math.max(-prices[i] + solve(i + 1, 0), solve(i + 1, buy));
    } else {
      profit = Math.max(prices[i] + solve(i + 2, 1), solve(i + 1, buy));
    }
    return (dp[i][buy] = profit);
  };
  return solve(0, 1);
};

/* 
Approach II: Tabulation
Time: O(N * 2) = O(N)
Space: O(N * 2) = O(N)

Runtime: 6 ms Beats 33.55%
Memory: 50.51 MB Beats 69.74%
*/
var maxProfit = function (prices) {
  const N = prices.length;
  const dp = Array.from({ length: N + 2 }, () => Array(2).fill(0));
  for (let i = N - 1; i >= 0; i--) {
    for (let buy = 0; buy <= 1; buy++) {
      let profit = 0;
      if (buy) {
        profit = Math.max(-prices[i] + dp[i + 1][0], dp[i + 1][buy]);
      } else {
        profit = Math.max(prices[i] + dp[i + 2][1], dp[i + 1][buy]);
      }
      dp[i][buy] = profit;
    }
  }
  return dp[0][1];
};
