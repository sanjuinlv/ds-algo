/*
Say you have an array for which the ith element is the price of a given stock 
on day i. If you were only permitted to complete at most one transaction 
(i.e., buy one and sell one share of the stock), design an algorithm to find the 
maximum profit.
Note that you cannot sell a stock before you buy one. 

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

/**
 * @param {number[]} prices
 * @return {number}
 */
/*
Runtime: 80 ms, faster than 77.69% of JavaScript online submissions for Best Time to Buy and Sell Stock.
Memory Usage: 39.2 MB, less than 5.42% of JavaScript online submissions for Best Time to Buy and Sell Stock.
 */
var maxProfit = function (prices) {
  const N = prices.length;
  let min = (max = prices[N - 1]);
  let maxProfitVal = 0;
  for (let i = N - 2; i >= 0; i--) {
    if (prices[i] > max) max = prices[i];
    const profit = max - prices[i];
    if (profit > maxProfitVal) maxProfitVal = profit;
  }
  return maxProfitVal;
};

// Using the idea of largest peak following the smallest valley approach
var maxProfit = function (prices) {
  const N = prices.length;
  let minPrice = Number.MAX_VALUE;
  let maxProfitVal = 0;
  for (let i = 0; i < N; i++) {
    if (prices[i] < minPrice) minPrice = prices[i];
    const profit = prices[i] - minPrice;
    if (profit > maxProfitVal) maxProfitVal = profit;
  }
  return maxProfitVal;
};

/* 
2nd try: 5-Jan-21
[7,1,5,3,6,4] - PASS
[7,6,4,3,1] - PASS
[2,1,2,0,1] - FAILED
This will fail when the valley is after highest peak
*/
var maxProfit = function (prices) {
  let N = prices.length;
  let valley = Number.MAX_VALUE;
  let peak = -Number.MAX_VALUE;
  let maxProfitVal = 0;
  for (let i = 1; i < N; i++) {
    if (prices[i] > prices[i - 1]) {
      valley = Math.min(valley, prices[i - 1]);
      peak = Math.max(peak, prices[i]);
      maxProfitVal = Math.max(maxProfitVal, peak - valley);
    }
  }
  return maxProfitVal;
};

/* 
[7,1,5,3,6,4] - PASS
[7,6,4,3,1] - PASS
[2,1,2,0,1] - PASS

Runtime: 80 ms, faster than 86.29% of JavaScript online submissions for Best Time to Buy and Sell Stock.
Memory Usage: 39.3 MB, less than 59.38% of JavaScript online submissions for Best Time to Buy and Sell Stock.
*/
var maxProfit = function (prices) {
  const N = prices.length;
  let minPrice = Number.MAX_VALUE;
  let maxProfitVal = 0;
  for (let i = 0; i < N; i++) {
    minPrice = Math.min(minPrice, prices[i]);
    const profit = prices[i] - minPrice;
    maxProfitVal = Math.max(maxProfitVal, profit);
  }
  return maxProfitVal;
};
