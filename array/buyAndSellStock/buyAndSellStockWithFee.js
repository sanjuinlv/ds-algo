/* 
714. Best Time to Buy and Sell Stock with Transaction Fee
https://leetcode.com/problems/best-time-to-buy-and-sell-stock-with-transaction-fee
Type: Medium

You are given an array prices where prices[i] is the price of a given stock on the ith day, and an integer fee representing a transaction fee.

Find the maximum profit you can achieve. You may complete as many transactions as you like, but you need to pay the transaction fee for each transaction.

Note:

You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).
The transaction fee is only charged once for each stock purchase and sale.
 
Example 1:
  Input: prices = [1,3,2,8,4,9], fee = 2
  Output: 8
  Explanation: The maximum profit can be achieved by:
    - Buying at prices[0] = 1
    - Selling at prices[3] = 8
    - Buying at prices[4] = 4
    - Selling at prices[5] = 9
    The total profit is ((8 - 1) - 2) + ((9 - 4) - 2) = 8.

Example 2:
  Input: prices = [1,3,7,5,10,3], fee = 3
  Output: 6

Constraints:
 - 1 <= prices.length <= 5 * 10^4
 - 1 <= prices[i] < 5 * 10^4
 - 0 <= fee < 5 * 10^4

*/
/**
 * @param {number[]} prices
 * @param {number} fee
 * @return {number}
 */
/*
Approach I : Recursive + Memo
Runtime: 127 ms Beats 14.74%
Memory: 88.68 MB Beats 6.07%
 */
var maxProfit = function (prices, fee) {
  const N = prices.length;
  const dp = Array.from({ length: N }, () => Array(2));
  const solve = (i, buy) => {
    //base case
    if (i == N) return 0;
    if (dp[i][buy] != null) return dp[i][buy];
    let profit = 0;
    if (buy) {
      profit = Math.max(-prices[i] + solve(i + 1, 0), solve(i + 1, buy));
    } else {
      profit = Math.max(prices[i] + solve(i + 1, 1) - fee, solve(i + 1, buy));
    }
    return (dp[i][buy] = profit);
  };
  return solve(0, 1);
};

/*
Approach II : Tabulation

Runtime: 108 ms Beats 17.34%
Memory: 78.13 MB Beats 23.12%
 */
var maxProfit = function (prices, fee) {
  const N = prices.length;
  const dp = Array.from({ length: N + 1 }, () => Array(2).fill(0));
  for (let i = N - 1; i >= 0; i--) {
    for (let buy = 0; buy <= 1; buy++) {
      let profit = 0;
      if (buy) {
        profit = Math.max(-prices[i] + dp[i + 1][0], dp[i + 1][buy]);
      } else {
        profit = Math.max(prices[i] + dp[i + 1][1] - fee, dp[i + 1][buy]);
      }
      dp[i][buy] = profit;
    }
  }
  return dp[0][1];
};

/* 
Approach III: Tabulation + Space optimized

Time: O(N)
Space: O(1)

Runtime: 105 ms Beats 20.93%
Memory: 78.06 MB Beats 24.42%
*/
var maxProfit = function (prices, fee) {
  const N = prices.length;
  let ahead = Array(2).fill(0);
  let curr = Array(2).fill(0);
  for (let i = N - 1; i >= 0; i--) {
    for (let buy = 0; buy <= 1; buy++) {
      let profit = 0;
      if (buy) {
        profit = Math.max(-prices[i] + ahead[0], ahead[buy]);
      } else {
        profit = Math.max(prices[i] + ahead[1] - fee, ahead[buy]);
      }
      curr[buy] = profit;
    }
    ahead = curr;
  }
  return ahead[1];
};
