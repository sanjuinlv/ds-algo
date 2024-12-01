/* 
2035. Partition Array Into Two Arrays to Minimize Sum Difference
https://leetcode.com/problems/partition-array-into-two-arrays-to-minimize-sum-difference/
Category - Hard

You are given an integer array nums of 2 * n integers. You need to partition nums into two arrays of length n to minimize the absolute difference of the sums of the arrays. To partition nums, put each element of nums into one of the two arrays.

Return the minimum possible absolute difference.

Example 1:
Input: nums = [3,9,7,3]
Output: 2
Explanation: One optimal partition is: [3,9] and [7,3].
The absolute difference between the sums of the arrays is abs((3 + 9) - (7 + 3)) = 2.

Example 2:
Input: nums = [-36,36]
Output: 72
Explanation: One optimal partition is: [-36] and [36].
The absolute difference between the sums of the arrays is abs((-36) - (36)) = 72.

Example 3:
Input: nums = [2,-1,0,4,-2,-9]
Output: 0
Explanation: One optimal partition is: [2,4,-9] and [-1,0,-2].
The absolute difference between the sums of the arrays is abs((2 + 4 + -9) - (-1 + 0 + -2)) = 0.

Constraints:
  - 1 <= n <= 15
  - nums.length == 2 * n
  - -10^7 <= nums[i] <= 10^7

*/
/* 
Works fine for positive numbers but will fail for negative numbers
*/
var minSubsetDifference = function (nums) {
  const n = nums.length;
  //array sum
  let range = 0;
  nums.forEach((num) => (range += num));
  const dp = [...Array(n + 1)].map((x) => Array(range + 1).fill(false));
  for (let i = 0; i <= n; i++) {
    dp[i][0] = true;
  }
  for (let i = 1; i <= n; i++) {
    const curr = nums[i - 1];
    for (let j = 1; j <= range; j++) {
      if (curr <= j) {
        dp[i][j] = dp[i - 1][j - curr] || dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  let arr = [];
  for (let j = 1; j <= Math.floor(range / 2); j++) {
    if (dp[n][j]) arr.push(j);
  }
  let minDiff = Infinity;
  for (let i = 0; i < arr.length; i++) {
    minDiff = Math.min(minDiff, Math.abs(range - 2 * arr[i]));
  }
  return minDiff;
};
