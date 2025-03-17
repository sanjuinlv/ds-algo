/* 
518. Coin Change II
https://leetcode.com/problems/coin-change-ii/
Type: Medium

You are given an integer array coins representing coins of different denominations and an integer amount representing a total amount of money.

Return the number of combinations that make up that amount. If that amount of money cannot be made up by any combination of the coins, return 0.

You may assume that you have an infinite number of each kind of coin.

The answer is guaranteed to fit into a signed 32-bit integer.

Example 1:
Input: amount = 5, coins = [1,2,5]
Output: 4
Explanation: there are four ways to make up the amount:
5=5
5=2+2+1
5=2+1+1+1
5=1+1+1+1+1

Example 2:
Input: amount = 3, coins = [2]
Output: 0
Explanation: the amount of 3 cannot be made up just with coins of 2.

Example 3:
Input: amount = 10, coins = [10]
Output: 1
 
Constraints:
 - 1 <= coins.length <= 300
 - 1 <= coins[i] <= 5000
 - All the values of coins are unique.
 - 0 <= amount <= 5000
*/
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
//recursive
var change = function (amount, coins) {
  return count(coins.length, amount, coins);
};

function count(i, sum, coins) {
  //base cases
  //if sum is 0 then there are 1 way
  if (sum === 0) return 1;
  //0 ways if sum is < 0 or no element in array
  if (sum < 0 || i == 0) return 0;
  //take this coin
  const taken = count(i, sum - coins[i - 1], coins);
  //do not take this coin
  const notTaken = count(i - 1, sum, coins);
  return taken + notTaken;
}

/* 
Approach II: Recursion + Memo
Time: O(n * amount)
Space: O(n * amount)

Runtime: 39 ms Beats 50.10%
Memory: 82.62 MB Beats 19.16%
*/
var change = function (amount, coins) {
  const N = coins.length;
  const memo = Array.from({ length: N + 1 }, () =>
    new Array(amount + 1).fill(null)
  );
  return count(coins.length, amount, coins, memo);
};

function count(i, sum, coins, memo) {
  //base cases
  //if sum is 0 then there are 1 way
  if (sum === 0) return 1;
  //0 ways if sum is < 0 or no element in array
  if (sum < 0 || i == 0) return 0;
  if (memo[i][sum] != null) return memo[i][sum];
  //take this coin
  const taken = count(i, sum - coins[i - 1], coins, memo);
  //do not take this coin
  const notTaken = count(i - 1, sum, coins, memo);
  return (memo[i][sum] = taken + notTaken);
}

/*
Approach III: Bottom Up DP
Time: O(n * amount)
Space: O(n * amount)

Runtime: 57 ms Beats 39.32%
Memory: 81.16 MB Beats 23.55%
*/

var change = function (amount, coins) {
  const N = coins.length;
  const dp = Array.from({ length: N + 1 }, () => new Array(amount + 1).fill(0));
  //base case
  // for all sum=0 there is at least one way
  for (let i = 0; i <= N; i++) dp[i][0] = 1;
  //for no element there 0 ways
  for (let j = 1; j <= amount; j++) dp[0][j] = 0;

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= sum; j++) {
      if (coins[i - 1] <= j) {
        //taken + non taken
        dp[i][j] = dp[i][j - coins[i - 1]] + dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j]; //non taken
      }
    }
  }
  return dp[N][amount];
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
