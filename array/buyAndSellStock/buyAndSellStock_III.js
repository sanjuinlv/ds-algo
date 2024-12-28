/* 
123. Best Time to Buy and Sell Stock III
https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iii/description/
Type: Hard

You are given an array prices where prices[i] is the price of a given stock on the ith day.

Find the maximum profit you can achieve. You may complete at most two transactions.

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

Example 1:
  Input: prices = [3,3,5,0,0,3,1,4]
  Output: 6
  Explanation: Buy on day 4 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.
  Then buy on day 7 (price = 1) and sell on day 8 (price = 4), profit = 4-1 = 3.

Example 2:
  Input: prices = [1,2,3,4,5]
  Output: 4
  Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
  Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are engaging multiple transactions at the same time. You must sell before buying again.

Example 3:
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
 
Constraints:
 - 1 <= prices.length <= 10^5
 - 0 <= prices[i] <= 10^5
*/

/**
 * @param {number[]} prices
 * @return {number}
 */
/*
Approach I: Recursion + memo
Time: O(N*3*2)
Space: O(N*3*2) + O(N)

Runtime: 1040 ms Beats 7.14%
Memory: 117.62 MB Beats 6.86%
 */
var maxProfit = function (prices) {
  const N = prices.length;
  const memo = Array.from({ length: N }, () =>
    Array.from({ length: 3 }, () => Array(2))
  );
  function f(i, remTxn, buy) {
    //base case
    if (i == N || remTxn == 0) return 0;
    if (memo[i][remTxn][buy] != null) return memo[i][remTxn][buy];
    let profit = 0;
    if (buy) {
      //Buy it or do nothing
      profit = Math.max(
        -prices[i] + f(i + 1, remTxn, 0, prices, N),
        f(i + 1, remTxn, buy, prices, N)
      );
    } else {
      //Sell or do nothing
      profit = Math.max(
        prices[i] + f(i + 1, remTxn - 1, 1, prices, N),
        f(i + 1, remTxn, buy, prices, N)
      );
    }
    return (memo[i][remTxn][buy] = profit);
  }
  return f(0, 2, 1, prices, N);
};

/* 
Approach II: Tabulation
Time: O(N * 2 * 3) = O(N)
Space: O(N * 2 * 3) = O(N)

Runtime: 999 ms Beats 7.10%
Memory: 103.58 MB Beats 18.46%
*/
var maxProfit = function (prices) {
  const N = prices.length;
  const dp = Array.from({ length: N + 1 }, () =>
    Array.from({ length: 3 }, () => Array(2).fill(0))
  );
  for (i = N - 1; i >= 0; i--) {
    for (let remTxn = 1; remTxn <= 2; remTxn++) {
      for (let buy = 0; buy <= 1; buy++) {
        let profit = 0;
        if (buy) {
          //Buy it or do nothing
          profit = Math.max(
            -prices[i] + dp[i + 1][remTxn][0],
            dp[i + 1][remTxn][buy]
          );
        } else {
          //Sell or do nothing
          profit = Math.max(
            prices[i] + dp[i + 1][remTxn - 1][1],
            dp[i + 1][remTxn][buy]
          );
        }
        dp[i][remTxn][buy] = profit;
      }
    }
  }
  //base case
  return dp[0][2][1];
};

/* 
Approach III: Tabulation space optimization 
Time: O(N * 2 * 3) = O(N), constant
Space: O(2*3) = O(1)

Runtime: 880 ms Beats 9.37%
Memory: 100.91 MB Beats 19.60%
*/
var maxProfit = function (prices) {
  const N = prices.length;
  const dp = Array.from({ length: N }, () =>
    Array.from({ length: 3 }, () => Array(2).fill(0))
  );
  const after = Array.from({ length: 3 }, () => Array(2).fill(0));
  let curr = Array.from({ length: 3 }, () => Array(2).fill(0));

  for (i = N - 1; i >= 0; i--) {
    for (let remTxn = 1; remTxn <= 2; remTxn++) {
      for (let buy = 0; buy <= 1; buy++) {
        let profit = 0;
        if (buy) {
          //Buy it or do nothing
          profit = Math.max(
            -prices[i] + after[remTxn][0],
            after[remTxn][buy]
          );
        } else {
          //Sell or do nothing
          profit = Math.max(
            prices[i] + after[remTxn - 1][1],
            after[remTxn][buy]
          );
        }
        curr[remTxn][buy] = profit;
      }
    }
    after = curr;
  }
  after[2][1];
};
