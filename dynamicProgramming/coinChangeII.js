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
