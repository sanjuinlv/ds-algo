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
/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
    const N = prices.length;
    let min = max = prices[N - 1];
    let maxProfit = 0;
    for (let i = N - 2; i >= 0; i--) {
        console.log(`min: ${min}, max: ${max}`);
        console.log(`price at ${i}: ${prices[i]}`);
        if (prices[i] > max) max = prices[i];
        const profit = max - prices[i];
        if (profit > maxProfit) maxProfit = profit;
        console.log(`maxProfit: ${maxProfit}`);
    }
    console.log(`maxProfit: ${maxProfit}`);
    return maxProfit;
};

//for submission
/*
Runtime: 80 ms, faster than 77.69% of JavaScript online submissions for Best Time to Buy and Sell Stock.
Memory Usage: 39.2 MB, less than 5.42% of JavaScript online submissions for Best Time to Buy and Sell Stock.
 */
var maxProfit = function(prices) {
    const N = prices.length;
    let min = max = prices[N - 1];
    let maxProfit = 0;
    for (let i = N - 2; i >= 0; i--) {
        if (prices[i] > max) max = prices[i];
        const profit = max - prices[i];
        if (profit > maxProfit) maxProfit = profit;
    }
    return maxProfit;
};


// Using the idea of largest peak following the smallest valley approach
var maxProfit = function(prices) {
    const N = prices.length;
    let minPrice = Number.MAX_VALUE;
    let maxProfit = 0;
    for (let i = 0; i < N; i++) {
        if (prices[i] < minPrice) minPrice = prices[i];
        const profit = prices[i] - minPrice;
        if (profit > maxProfit) maxProfit = profit;
    }
    return maxProfit;
}

//2nd try
var maxProfit = function(prices) {
    const N = prices.length;
    let maxProfit = 0;
    return maxProfit;
}