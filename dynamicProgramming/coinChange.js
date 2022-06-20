/* 
You are given an integer array coins representing coins of different denominations 
and an integer amount representing a total amount of money.
Return the fewest number of coins that you need to make up that amount. If that amount
of money cannot be made up by any combination of the coins, return -1.
You may assume that you have an infinite number of each kind of coin.

Example 1:
Input: coins = [1,2,5], amount = 11
Output: 3
Explanation: 11 = 5 + 5 + 1

Example 2:
Input: coins = [2], amount = 3
Output: -1

Example 3:
Input: coins = [1], amount = 0
Output: 0

Constraint:
1 <= coins.length <= 12
1 <= coins[i] <= 231 - 1
0 <= amount <= 104

*/

/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
/* 
Approach: Recursion
Will fail for input: [2,5,29], amount = 21
O/P =-1, expected: 6
*/
var coinChange = function (coins, amount) {
  const N = coins.length;
  coins.sort((a, b) => b - a);
  console.log(coins);
  let count = 0;
  const dp = (i, count, amtCollected) => {
    console.log(`i:: ${i}, count: ${count}, amtCollected:${amtCollected}`);
    // base case
    if (amtCollected === amount) return count;
    if (i === N) return -1;
    while (amtCollected + coins[i] <= amount) {
      amtCollected += coins[i];
      count++;
    }
    return dp(++i, count, amtCollected);
  };
  return dp(0, count, 0);
  //   return count;
};

//Solution Reference
/* 
Approach: Recursion
*/
var coinChange = function (coins, amount) {
  const dp = (coins, remain) => {
    if (remain < 0) return -1;
    if (remain === 0) return 0;
    let minCount = Number.MAX_VALUE;
    for (let coin of coins) {
      const count = dp(coins, remain - coin);
      if (count == -1) continue;
      minCount = Math.min(minCount, count + 1);
    }
    return minCount === Number.MAX_VALUE ? -1 : minCount;
  };
  return dp(coins, amount);
};

/* 
Approach: Dynamic Programming (Top Down, Recursion with memoization) 
Time: O(S*n), where S is the amount, n is denomination count. In the worst case the recursive 
tree of the algorithm has height of S and the algorithm solves only S subproblems because it 
caches precalculated solutions in a table. Each subproblem is computed with nn iterations, 
one by coin denomination. Therefore there is O(S*n) time complexity
Space: O(S), where SS is the amount to change We use extra space for the memoization table

*/
var coinChange = function (coins, amount) {
  const memo = new Array(coins.length).fill(null);

  const dp = (coins, remain) => {
    if (remain < 0) return -1;
    if (remain === 0) return 0;
    if (memo[remain] != null) return memo[remain];
    let minCount = Number.MAX_VALUE;
    for (let coin of coins) {
      const count = dp(coins, remain - coin);
      if (count == -1) continue;
      minCount = Math.min(minCount, count + 1);
    }
    memo[remain] = minCount === Number.MAX_VALUE ? -1 : minCount;
    return memo[remain];
  };

  return dp(coins, amount);
};

/*
Approach: Dynamic Programming ( Bottom up)
Time: O(S*n), where S is the amount, n is denomination count. In the worst case the recursive 
tree of the algorithm has height of S and the algorithm solves only S subproblems because it 
caches precalculated solutions in a table. Each subproblem is computed with nn iterations, 
one by coin denomination. Therefore there is O(S*n) time complexity
Space: O(S), where SS is the amount to change We use extra space for the memoization table

Runtime: 112 ms, faster than 90.10% of JavaScript online submissions for Coin Change.
Memory Usage: 45.9 MB, less than 86.25% of JavaScript online submissions for Coin Change.
 */
var coinChange = function (coins, amount) {
  const max = amount + 1;
  const dp = new Array(amount + 1).fill(max);
  dp[0] = 0;
  for (let i = 1; i <= amount; i++) {
    for (const coin of coins) {
      //we can only use this coin if its more than current amount i
      if (i >= coin) {
        dp[i] = Math.min(dp[i], dp[i - coin] + 1);
      }
    }
  }
  return dp[amount] > amount ? -1 : dp[amount];
};
