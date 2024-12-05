/* 
Coin Change (Count Ways)
https://www.geeksforgeeks.org/problems/coin-change2448/1
Type: Medium 

Given an integer array coins[ ] representing different denominations of currency and an integer sum, find the number of ways you can make sum by using different combinations from coins[ ]. 
Note: Assume that you have an infinite supply of each type of coin. And you can use any coin as many times as you want.
Answers are guaranteed to fit into a 32-bit integer. 

Example 1:
Input: coins[] = [1, 2, 3], sum = 4
Output: 4
Explanation: Four Possible ways are: [1, 1, 1, 1], [1, 1, 2], [2, 2], [1, 3].

Example 2:
Input: coins[] = [2, 5, 3, 6], sum = 10
Output: 5
Explanation: Five Possible ways are: [2, 2, 2, 2, 2], [2, 2, 3, 3], [2, 2, 6], [2, 3, 5] and [5, 5].

Example 3:
Input: coins[] = [5, 10], sum = 3
Output: 0
Explanation: Since all coin denominations are greater than sum, no combination can make the target sum.

Constraints:
 - 1 <= sum <= 1e4
 - 1 <= coins[i] <= 1e4
 - 1 <= coins.size() <= 1e3
*/

/* 
Approach: Recursion
*/
class Solution {
  count(coins, sum) {
    const N = coins.length;
    const count = (i, sum) => {
      //base case
      // If sum is 0 then there is 1 solution
      // (do not include any coin)
      if (sum == 0) return 1;
      // 0 ways in if sum is <0 or no elements in array
      if (sum < 0 || i == 0) return 0;
      //we can make two choices: take the coin or do not take
      //if we take then we need to check remaining sum, i.e., sum-coins[i-1]
      const coinTaken = count(i, sum - coins[i - 1]);
      const coinNotTaken = count(i - 1, sum);
      return coinTaken + coinNotTaken;
    };
    return count(N, sum);
  }
}

/* 
Approach: Recursion + memo (top down)
Time Taken: 1.29
*/
class Solution {
  count(coins, sum) {
    const N = coins.length;
    const memo = Array.from({ length: N + 1 }, () => Array(sum + 1));
    const count = (i, sum) => {
      //base case
      // If sum is 0 then there is 1 solution
      // (do not include any coin)
      if (sum == 0) return 1;
      // 0 ways in if sum is <0 or no elements in array
      if (sum < 0 || i == 0) return 0;
      if (memo[i][sum] != null) return memo[i][sum];
      //we can make two choices: take the coin or do not take
      //if we take then we need to check remaining sum, i.e., sum-coins[i-1]
      const coinTaken = count(i, sum - coins[i - 1]);
      const coinNotTaken = count(i - 1, sum);
      return (memo[i][sum] = coinTaken + coinNotTaken);
    };
    return count(N, sum);
  }
}

/* 
Approach: Bottom Up
Time: O(N*M)
Space: (N*M)

Time taken: 0.61
*/
class Solution {
  count(coins, sum) {
    const N = coins.length;
    const dp = Array.from({ length: N + 1 }, () => Array(sum + 1));
    //we can get sum=0 for empty element, i.e, there is one way to get sum=0
    for (let i = 0; i <= N; i++) dp[i][0] = 1;
    for (let j = 1; j <= sum; j++) dp[0][j] = 0;
    //fill the matrix
    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= sum; j++) {
        if (coins[i - 1] <= j) {
          dp[i][j] = dp[i][j - coins[i - 1]] + dp[i - 1][j];
        } else {
          dp[i][j] = dp[i - 1][j];
        }
      }
    }
    return dp[N][sum];
  }
}
