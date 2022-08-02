/*
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
s1 + (-s2) = target
s1 + s2 = arraySum
-----------------
2s1 = target + arraySum
s1 = (target + arraySum) / 2 
*/

/* 
Approach I : Recursive
Time: O(2^N)
Space: O(N)

[0,0,1,0,0]
0
[7,9,3,8,0,2,4,8,3,9]
0
[0,0,0,0,0,0,0,0,1]
1
[1]
2
*/
var findTargetSumWays = function (nums, target) {
  const n = nums.length;
  let count = 0;
  const helper = (i, sum) => {
    if (i === n) {
      if (sum == target) {
        count++;
        return;
      }
    } else {
      //include
      helper(i + 1, sum - nums[i]);
      //exclude
      helper(i + 1, sum + nums[i]);
    }
  };
  helper(0, 0, target);
  return count;
};

/* 
Approach II : Dynamic programming (Top Down)
Time: O(N * M), where M is sum of nums array
Space: O(N * M)

Runtime: 120 ms, faster than 92.95% of JavaScript online submissions for Target Sum.
Memory Usage: 47.7 MB, less than 61.57% of JavaScript online submissions for Target Sum.
*/
var findTargetSumWays = function (nums, target) {
  const n = nums.length;
  let count = 0;
  let arraySum = 0;
  nums.forEach((num) => (arraySum += num));
  const memo = [...Array(n)].map((x) => Array(2 * arraySum + 1).fill(-1));
  const helper = (i, sum) => {
    if (i === n) {
      if (sum == target) {
        return 1;
      } else {
        return 0;
      }
    } else {
      //Note: The factor of total has been added as an offset to the sum value to map
      // all the sums possible to positive integer range
      if (memo[i][sum + arraySum] !== -1) return memo[i][sum + arraySum];
      //include
      const addCount = helper(i + 1, sum - nums[i]);
      //exclude
      const subTractCount = helper(i + 1, sum + nums[i]);
      memo[i][sum + arraySum] = addCount + subTractCount;
      return memo[i][sum + arraySum];
    }
  };
  return helper(0, 0);
};

/* 
Approach II : Dynamic programming (Bottom Up)
Time: O(N * M), when is M is (target + arraySum)/2
Space: O(N * M)

Runtime: 116 ms, faster than 93.54% of JavaScript online submissions for Target Sum.
Memory Usage: 45.5 MB, less than 62.51% of JavaScript online submissions for Target Sum.
*/
var findTargetSumWays = function (nums, target) {
  const n = nums.length;
  //1. find array sum
  let arraySum = 0;
  nums.forEach((num) => (arraySum += num));
  console.log(`arraySum: ${arraySum}`);
  //the array sum be greater than target and sum of arraySum and target
  //should be divisible by 2 to find the subset sub
  if (arraySum < Math.abs(target) || (arraySum + target) % 2 != 0) return 0;
  //2. Subset sum which we need to find
  const sum = Math.floor((target + arraySum) / 2);
  const dp = [...Array(n + 1)].map((x) => Array(sum + 1).fill(0));
  for (let i = 0; i <= n; i++) {
    dp[i][0] = 1;
  }
  for (let i = 1; i <= n; i++) {
    const curr = nums[i - 1];
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
