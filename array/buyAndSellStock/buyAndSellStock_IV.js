/* 
188. Best Time to Buy and Sell Stock IV
https://leetcode.com/problems/best-time-to-buy-and-sell-stock-iv/editorial/
Type: Hard

You are given an integer array prices where prices[i] is the price of a given stock on the ith day, and an integer k.

Find the maximum profit you can achieve. You may complete at most k transactions: i.e. you may buy at most k times and sell at most k times.

Note: You may not engage in multiple transactions simultaneously (i.e., you must sell the stock before you buy again).

Example 1:
  Input: k = 2, prices = [2,4,1]
  Output: 2
  Explanation: Buy on day 1 (price = 2) and sell on day 2 (price = 4), profit = 4-2 = 2.

Example 2:
  Input: k = 2, prices = [3,2,6,5,0,3]
  Output: 7
  Explanation: Buy on day 2 (price = 2) and sell on day 3 (price = 6), profit = 6-2 = 4. Then buy on day 5 (price = 0) and sell on day 6 (price = 3), profit = 3-0 = 3.

Constraints:
 * 1 <= k <= 100
 * 1 <= prices.length <= 1000
 * 0 <= prices[i] <= 1000
*/

/**
 * @param {number} k
 * @param {number[]} prices
 * @return {number}
 */
/*
Approach I: Recursive
 */
var maxProfit = function (k, prices) {
  const N = prices.length;
  console.log(`: ${N}`);
  //holding=1 mean we have bought the stock, 0 means no stock bought
  const dp = (i, txnRemaining, holding) => {
    //base case
    //Either we have no txn left or reached end of input
    if (txnRemaining == 0 || i == N) return 0;
    const doNothing = dp(i + 1, txnRemaining, holding);
    let doSomething = 0;
    if (holding == 0) {
      //Buy Stock
      //when we buy our profit is -ve. We recover when we sell
      doSomething = -prices[i] + dp(i + 1, txnRemaining, 1);
    } else {
      //Sell Stock
      //when we sell we get profit and our no of txn remaining gets reduced
      doSomething = prices[i] + dp(i + 1, txnRemaining - 1, 0);
    }
    const profit = Math.max(doNothing, doSomething);
    return profit;
  };
  return dp(0, k, 0);
};

/*
Approach I: Recursive + Memoization (Top Down)
Time: O(N * k)
Memory: O(N * k * 2)

Runtime: 55 ms Beats 34.25%
Memory: 71.94 MB Beats 18.11%
 */
var maxProfit = function (k, prices) {
  const N = prices.length;
  const memo = Array.from({ length: N }, () =>
    Array.from({ length: k + 1 }, () => Array(2))
  );
  //holding=1 mean we have bought the stock, 0 means no stock bought
  const dp = (i, txnRemaining, holding) => {
    //base case
    //Either we have no txn left or reached end of input
    if (txnRemaining == 0 || i == N) return 0;
    if (memo[i][txnRemaining][holding] != null)
      return memo[i][txnRemaining][holding];
    const doNothing = dp(i + 1, txnRemaining, holding);
    let doSomething = 0;
    if (holding == 0) {
      //Buy Stock
      //when we buy our profit is -ve. We recover when we sell
      doSomething = -prices[i] + dp(i + 1, txnRemaining, 1);
    } else {
      //Sell Stock
      //when we sell we get profit and our no of txn remaining gets reduced
      doSomething = prices[i] + dp(i + 1, txnRemaining - 1, 0);
    }
    memo[i][txnRemaining][holding] = Math.max(doNothing, doSomething);
    return memo[i][txnRemaining][holding];
  };
  return dp(0, k, 0);
};

/*
Approach I: Bottom Up DP
Time: O(N * k)
Memory: O(N * k * 2)

Runtime: 
Memory: 
 */
var maxProfit = function (k, prices) {
  const N = prices.length;
  //base case
  if (N == 0 || k == 0) return 0;
  /* 
    When k is very large (greater than half the number of days), it's equivalent to unlimited transactions. In that case, we simply sum all positive price differences between consecutive days.  
  */
  if (k * 2 >= N) {
    let maxProfit = 0;
    for (let i = 1; i < N; i++) {
      maxProfit += Math.max(prices[i] - prices[i - 1], 0);
    }
    return maxProfit;
  }
  // dp[i][used_k][ishold] = balance
  // ishold: 0 = nothold, 1 = hold
  //dp[i][t] stores the maximum profit achievable on day i with at most t transactions
  const dp = Array.from({ length: N }, () => Array(k + 1).fill(0));
  for (let t = 1; t <= k; t++) {
    let maxDiff = -prices[0];
    for (let i = 1; i < N; i++) {
      /* When not transacting on day i: Use the maximum profit from the 
       previous day, dp[i-1][t].
       When selling on day i: Use the maximum profit from buying on a previous day j plus the profit from selling on day i.
      */
      dp[i][t] = Math.max(dp[i - 1][t], prices[i] + maxDiff);
      maxDiff = Math.max(maxDiff, dp[i - 1][t - 1] - prices[i]);
    }
  }
  return dp[N - 1][k];
};
