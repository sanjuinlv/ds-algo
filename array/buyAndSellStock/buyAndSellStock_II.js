/*
122. Best Time to Buy and Sell Stock II
https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii/description/
Type: Medium

You are given an integer array prices where prices[i] is the price of a given stock on the ith day.

On each day, you may decide to buy and/or sell the stock. You can only hold at most one share of the stock at any time. However, you can buy it then immediately sell it on the same day.

Find and return the maximum profit you can achieve.

Example 1:
  Input: [7,1,5,3,6,4]
  Output: 7
  Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
   Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.

Example 2:   
  Input: [1,2,3,4,5]
  Output: 4
  Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
   Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
   engaging multiple transactions at the same time. You must sell before buying again.

Example 3:     
  Input: [7,6,4,3,1]
  Output: 0
  Explanation: In this case, no transaction is done, i.e. max profit = 0.

Constraints:
 - 1 <= prices.length <= 3 * 10^4
 - 0 <= prices[i] <= 10^4  
*/

/* 
Approach : One pass
Instead of looking for every peak following a valley, we can
simply go on crawling over the slope and keep on adding the profit
obtained from every consecutive transaction

Time: O(N)
Space: O(1)

Runtime: 2 ms Beats 34.36%
Memory Usage: 49.18 MB Beats 87.99%
*/
var maxProfit = function (prices) {
  let maxProfit = 0;
  for (let i = 1; i < prices.length; i++) {
    //profit if we buy previous day and sell today
    const currProfit = prices[i] - prices[i - 1];
    //if current profit is postive then add in total profit
    if (currProfit > 0) maxProfit += currProfit;
  }
  return maxProfit;
};

/* 
Approach : Recursive + Memo

Time: O(N)
Space: O(N)

Runtime: 8 ms Beats 6.48%
Memory Usage: 55.23 MB Beats 5.07%
*/
var maxProfit = function (prices) {
  const N = prices.length;
  const memo = Array.from({ length: N }, () => Array(2));
  //buy = 1, sell = 0
  const dp = (i, buy) => {
    if (i == N) return 0;
    if (memo[i][buy] != null) return memo[i][buy];
    //do nothing and move on to next item
    const doNothing = 0 + dp(i + 1, buy);
    let doSomething = 0;
    //Buy
    if (buy) {
      //if we buy then the curr price will be subtracted as profit = sellPrice - buyPrice
      doSomething = -prices[i] + dp(i + 1, 0);
    } else {
      doSomething = prices[i] + dp(i + 1, 1);
    }
    return (memo[i][buy] = Math.max(doNothing, doSomething));
  };
  return dp(0, 1);
};

/* 
Approach : Bottom Up DP

Time: O(N)
Space: O(N)

Runtime: 9 ms Beats 5.91%
Memory Usage: 51.52 MB Beats 8.50%
*/
var maxProfit = function (prices) {
  const N = prices.length;
  const dp = Array.from({ length: N + 1 }, () => Array(2));
  //buy = 1, sell = 0
  //base case
  dp[N][0] = 0;
  dp[N][1] = 0;
  for (i = N - 1; i >= 0; i--) {
    for (let buy = 0; buy <= 1; buy++) {
      const doNothing = 0 + dp[i + 1][buy];
      let doSomething = 0;
      //Buy
      if (buy) {
        //if we buy then the curr price will be subtracted as profit = sellPrice - buyPrice
        doSomething = -prices[i] + dp[i + 1][0];
      } else {
        doSomething = prices[i] + dp[i + 1][1];
      }
      dp[i][buy] = Math.max(doNothing, doSomething);
    }
  }
  return dp[0][1];
};

/* 
Approach : Bottom Up DP with space optimization

Time: O(N)
Space: O(N)

Runtime: 2 ms Beats 34.52%
Memory Usage: 49.90 MB Beats 27.19%
*/
var maxProfit = function (prices) {
  const N = prices.length;
  let ahead = Array(2);
  const curr = Array(2);
  //base case
  ahead[0] = 0;
  ahead[1] = 0;
  for (i = N - 1; i >= 0; i--) {
    for (let buy = 0; buy <= 1; buy++) {
      const doNothing = 0 + ahead[buy];
      let doSomething = 0;
      //Buy
      if (buy) {
        //if we buy then the curr price will be subtracted as profit = sellPrice - buyPrice
        doSomething = -prices[i] + ahead[0];
      } else {
        doSomething = prices[i] + ahead[1];
      }
      curr[buy] = Math.max(doNothing, doSomething);
    }
    ahead = curr;
  }
  return curr[1]; //ahead[1], both same
};
