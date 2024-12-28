/*
121. Best Time to Buy and Sell Stock
https://leetcode.com/problems/best-time-to-buy-and-sell-stock
Type: Easy

You are given an array prices where prices[i] is the price of a given stock on the ith day.
You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.
Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

Input: [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Not 7-1 = 6, as selling price needs to be larger than buying price.

Input: [7,6,4,3,1]
Output: 0
Explanation: In this case, no transaction is done, i.e. max profit = 0.
*/
/*
Brute Force
Time: O(N^2)
Space: O(N^2)
*/
var maxProfit = function (prices) {
  let N = prices.length;
  let maxProfitVal = 0;
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      let currProfit = prices[j] - prices[i];
      maxProfitVal = Math.max(maxProfitVal, currProfit);
    }
  }
  return maxProfitVal;
};

/* 
Approach : Using the idea of largest peak following the smallest valley approach
Runtime: 8 ms Beats 10.75%
Memory Usage: 59.25 MB Beats 46.31%
*/
var maxProfit = function (prices) {
  let maxProfit = 0;
  let minPrice = Number.MAX_VALUE;
  for (let price of prices) {
    minPrice = Math.min(minPrice, price);
    maxProfit = Math.max(maxProfit, price - minPrice);
  }
  return maxProfit;
};
