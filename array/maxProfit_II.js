/*
Say you have an array prices for which the ith element is the price of a given stock on day i.
Design an algorithm to find the maximum profit. 
You may complete as many transactions as you like (i.e., buy one and sell one
share of the stock multiple times).

Note: You may not engage in multiple transactions at the same time 
(i.e., you must sell the stock before you buy again).

Input: [7,1,5,3,6,4]
Output: 7
Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.

Input: [1,2,3,4,5]
Output: 4
Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
Note that you cannot buy on day 1, buy on day 2 and sell them later, as you are
engaging multiple transactions at the same time. You must sell before buying again.

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
    let minPrice = Number.MAX_VALUE;
    let maxProfit = 0, totalProfit = 0;
    for (let i = 0; i <= N; i++) {
        if (prices[i] < minPrice) minPrice = prices[i];
        const profit = prices[i] - minPrice;
        console.log(`day: ${i + 1}, profit: ${profit}`);
        if (profit > 0) {
            totalProfit += profit;
        } else {
            // we got valley, reset the min price to this one
            minPrice = prices[i]
        }
        if (profit > maxProfit) maxProfit = profit;
        console.log(`totalProfit: ${totalProfit}, maxProfit: ${maxProfit}`);
    }
    console.log(`totalProfit: ${totalProfit}, maxProfit: ${maxProfit}`);
    return Math.max(totalProfit, maxProfit);
};
// The above code has problem of min always having last min
// we need to change the min when going to next valley
// prices = [7,1,5,3,6,4]
// prices = [1,2,3,4,5]
var maxProfit = function(prices) {
    const N = prices.length;
    let valley = peak = prices[0];
    let totalProfit = 0;
    for (let i = 1; i < N; i++) {
        console.log(`i: ${i}, valley: ${valley}, peak: ${peak}`)
        if (prices[i] - peak < 0) {
            const profit = peak - valley;
            valley = prices[i];
            peak = prices[i];
            if (profit > 0) {
                totalProfit += profit;
            }
        } else {
            peak = prices[i];
        }
        console.log(`totalProfit: ${totalProfit}`);
        console.log(`updated valley: ${valley}, peak: ${peak}`)
    }
    totalProfit += peak - valley;
    console.log(`totalProfit: ${totalProfit}`);
    return totalProfit;
}

// Using simpler approach:
// instead of looking for every peak following a valley, we can simply go on crawling over the 
// slope and keep on adding the profit obtained from every consecutive transaction
/* 
Runtime: 76 ms, faster than 88.62% of JavaScript online submissions for Best Time to Buy and Sell Stock II.
Memory Usage: 39 MB, less than 12.70% of JavaScript online submissions for Best Time to Buy and Sell Stock II.
*/
var maxProfit = function(prices) {
    let maxProfit = 0;
    for (let i = 1; i < prices.length; i++) {
        if (prices[i] > prices[i - 1]) {
            maxProfit += prices[i] - prices[i - 1];
        }
    }
    return maxProfit;
}

// 2nd Attempt
var maxProfit = function(prices) {
    let maxProfit = 0;
    for (let i = 0; i < prices.length - 1; i++){
        const profit = prices[i+1] - prices[i];
        if (profit > 0){
            maxProfit += profit;
        }
    }
    return maxProfit;
}