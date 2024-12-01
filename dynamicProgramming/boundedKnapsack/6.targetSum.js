/*
494. Target Sum
https://leetcode.com/problems/target-sum/
Category: Medium

You are given an integer array nums and an integer target.

You want to build an expression out of nums by adding one of the symbols '+' and '-' before each integer in nums and then concatenate all the integers.

For example, if nums = [2, 1], you can add a '+' before 2 and a '-' before 1 and concatenate them to build the expression "+2-1".
Return the number of different expressions that you can build, which evaluates to target.

Example 1:

Input: nums = [1,1,1,1,1], target = 3
Output: 5
Explanation: There are 5 ways to assign symbols to make the sum of nums be target 3.
-1 + 1 + 1 + 1 + 1 = 3
+1 - 1 + 1 + 1 + 1 = 3
+1 + 1 - 1 + 1 + 1 = 3
+1 + 1 + 1 - 1 + 1 = 3
+1 + 1 + 1 + 1 - 1 = 3
Example 2:

Input: nums = [1], target = 1
Output: 1

Constraints:

  - 1 <= nums.length <= 20
  - 0 <= nums[i] <= 1000
  - 0 <= sum(nums[i]) <= 1000
  - -1000 <= target <= 1000
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
/* 
s1 + (-s2) = target -- (1)
s1 + s2 = arraySum ----(2)
---------------------------
2s1 = target + arraySum
s1 = (target + arraySum) / 2 
*/

/* 
Approach I : DFS without memoization
Time: O(2^N)
Space: O(N)
*/
var findTargetSumWays = function (nums, target) {
  let noOfWays = 0;
  const dfs = (i, totalSum) => {
    if (i >= nums.length) {
      if (totalSum == target) noOfWays++;
      return;
    }
    dfs(i + 1, totalSum + nums[i]);
    dfs(i + 1, totalSum - nums[i]);
  };
  dfs(0, 0);
  return noOfWays;
};

/* 
Approach II : Dynamic programming (Top Down)
Time: O(N * M), where M is sum of nums array
Space: O(N * M)

Runtime: 14 ms Beats 89.63%
Memory Usage: 54.72 MB Beats 52.59%
*/
var findTargetSumWays = function (nums, target) {
  const N = nums.length;
  const arrSum = nums.reduce((sum, num) => sum + num, 0);
  //we set the colum size twice the total sum of array. E.g.,
  //if totalSum is 5 we can get sum ranging from -5 (all nums added with minus sign) to 5
  //so we need to store twice the number of variations.
  const memo = Array.from({ length: N + 1 }, () => Array(2 * arrSum + 1));
  const helper = (i, totalSum) => {
    //base case
    if (i == N) {
      return totalSum == target ? 1 : 0;
    }
    //Note: The factor of total has been added as an offset to the sum value to map
    // all the sums possible to positive integer range
    const sumIndex = arrSum + totalSum;
    if (memo[i][sumIndex] != null) return memo[i][sumIndex];
    const addSumCount = helper(i + 1, totalSum + nums[i]);
    const subtractSumCount = helper(i + 1, totalSum - nums[i]);
    return (memo[i][sumIndex] = addSumCount + subtractSumCount);
  };
  return helper(0, 0);
};

/* 
Approach II : Dynamic programming (Bottom Up)
This is same problem as count of subset difference. 
In this case we are changing the sign of number, i.e., '+' and '-'. So basically
we are dividing the array in two subset, one with positive numbers and other with negative number.
Let's assume S1 is subset with positive number and S2 is subset of negative numbers. Then we 
need ot find S1 - S2 = target

s1 + (-s2) = target -- (1)
s1 + s2 = arraySum ----(2)
---------------------------
2s1 = target + arraySum
s1 = (target + arraySum) / 2 

Time: O(N * M), when is M is (target + arraySum)/2
Space: O(N * M)

Runtime: 14 ms Beats 89.63%
Memory Usage: 52.70 MB Beats 58.14%
*/
var findTargetSumWays = function (nums, target) {
  const n = nums.length;
  //1. find array sum
  const arraySum = nums.reduce((sum, num) => sum + num, 0);
  //the array sum must be greater than target and sum of arraySum and target
  //should be divisible by 2 to find the subset sub
  if (arraySum < Math.abs(target) || (arraySum + target) % 2 != 0) return 0;
  //2. Subset sum which we need to find
  const sum = (target + arraySum) / 2;
  const dp = [...Array(n + 1)].map((x) => Array(sum + 1));
  //we cn always get target sum=0 for empty sub set
  for (let i = 0; i <= n; i++) dp[i][0] = 1;
  //for empty subset we can not get target sum > 0
  for (let j = 1; j <= sum; j++) dp[0][j] = 0;

  for (let i = 1; i <= n; i++) {
    const curr = nums[i - 1];
    //Note: value of j starts from 0
    for (let j = 0; j <= sum; j++) {
      if (curr <= j) {
        dp[i][j] = dp[i - 1][j - curr] + dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[n][sum];
};
