/* 
416. Partition Equal Subset Sum
https://leetcode.com/problems/partition-equal-subset-sum/
Type - Medium

Given a non-empty array nums containing only positive integers, find if the array
can be partitioned into two subsets such that the sum of elements in both subsets is equal.

Example 1:
Input: nums = [1,5,11,5]
Output: true
Explanation: The array can be partitioned as [1, 5, 5] and [11].

Example 2:
Input: nums = [1,2,3,5]
Output: false
Explanation: The array cannot be partitioned into equal sum subsets.
 
Constraints:
 - 1 <= nums.length <= 200
 - 1 <= nums[i] <= 100 
*/
/**
 * @param {number[]} nums
 * @return {boolean}
 */
/* 
Approach I: Recursion
*/
var canPartition = function (nums) {
  const N = nums.length;
  let arrSum = 0;
  nums.forEach((num) => (arrSum += num));
  if (arrSum % 2 != 0) return false;
  const target = arrSum / 2;
  const subSetSum = (i, remain) => {
    //Base condition
    //remain is zero that means we have found the subset sum
    if (remain == 0) return true;
    if (i == N || remain < 0) return false;
    const include = subSetSum(i + 1, remain - nums[i]);
    const exclude = subSetSum(i + 1, remain);
    return include || exclude;
  };
  return subSetSum(0, target);
};

/* 
Approach II: Recursion with memoisation: Top Down
Time: O(M*N)
Space: O(M*N)

Runtime: 295 ms Beats 29.01%
Memory: 74.19 MB Beats 43.00%
*/
var canPartition = function (nums) {
  const N = nums.length;
  let arrSum = 0;
  nums.forEach((num) => (arrSum += num));
  if (arrSum % 2 != 0) return false;
  const target = arrSum / 2;
  const memo = Array.from({ length: N + 1 }, () => Array(target + 1));
  const subSetSum = (i, remain) => {
    //Base condition
    //remain is zero that means we have found the subset sum
    if (remain == 0) return true;
    if (i == N || remain < 0) return false;
    if (memo[i][remain] != null) return memo[i][remain];
    const include = subSetSum(i + 1, remain - nums[i]);
    const exclude = subSetSum(i + 1, remain);
    return (memo[i][remain] = include || exclude);
  };
  return subSetSum(0, target);
};

/* 
Approach III: Bottom Up DP
Time: O(N * M)
Space: O(N * M)

Runtime: 153 ms Beats 58.24%
Memory: 81.73 MB Beats 30.59%
*/
var canPartition = function (nums) {
  const N = nums.length;
  let arrSum = 0;
  nums.forEach((num) => (arrSum += num));
  if (arrSum % 2 != 0) return false;
  const subSetSum = arrSum / 2;
  const dp = Array.from({ length: N + 1 }, () => Array(subSetSum + 1));
  //set the first column with zeros as for sum target zero we don't need any subset
  for (let i = 0; i <= N; i++) dp[i][0] = true;
  //set first row false as we can not get any of the target sum without any subset, i.e, empty subset
  for (let j = 0; j <= subSetSum; j++) dp[0][j] = false;

  for (let i = 1; i <= N; i++) {
    for (let j = 1; j <= subSetSum; j++) {
      if (nums[i - 1] <= j) {
        dp[i][j] = dp[i - 1][j - nums[i - 1]] || dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[N][subSetSum];
};

/* 
Approach IV: Optimised Dynamic Programming - Using 1D Array

Time: O(M), O(m * n), where m is the subSetSum, and n is the number of array elements. 
The time complexity is the same as Approach 3.
Space: O(M), As we use an array of size m to store the result of subproblems.

Runtime: 53 ms Beats 87.39% 
Memory: 52.62 MB Beats 66.85%
*/
var canPartition = function (nums) {
  const N = nums.length;
  let arrSum = 0;
  nums.forEach((num) => (arrSum += num));
  if (arrSum % 2 != 0) return false;
  const subSetSum = arrSum / 2;
  const dp = new Array(subSetSum + 1).fill(false);
  dp[0] = true;
  for (let num of nums) {
    for (let j = subSetSum; j >= num; j--) {
      dp[j] = dp[j] || dp[j - num];
    }
  }
  return dp[subSetSum];
};

/* 
Approach II : Top Down Dynamic Programming
Time: O(M*N)
Space: O(M*N)

Runtime: 894 ms, faster than 24.29% of JavaScript online submissions for Partition Equal Subset Sum.
Memory Usage: 88.7 MB, less than 21.98% of JavaScript online submissions for Partition Equal Subset Sum.
*/
var canPartition = function (nums) {
  const n = nums.length;
  let arraySum = 0;
  nums.forEach((num) => (arraySum += num));
  //if array sum is even then we can't partition it
  if (arraySum % 2 !== 0) return false;
  //we can now focus to find the subset sum which is half of arraySum
  const sum = Math.floor(arraySum / 2);
  const memo = [...Array(n)].map((x) => Array(sum + 1).fill(-1));
  //we can get sum=0 for any combination of set by considering the empty set
  //so fill first column as 1
  const subSetSum = (i, remain) => {
    //base case
    if (remain === 0) return true;
    if (i < 0 || remain < 0) return false;
    if (memo[i][remain] !== -1) return memo[i][remain];
    //include this
    const include = subSetSum(i - 1, remain - nums[i]);
    //exclude this
    const exclude = subSetSum(i - 1, remain);
    memo[i][remain] = include || exclude;
    return memo[i][remain];
  };
  return subSetSum(n - 1, sum);
};

/* 
Approach II : Dynamic Programming (Bottom up)
Time: O(M*N)
Space: O(M*N)

Runtime: 449 ms, faster than 36.79% of JavaScript online submissions for Partition Equal Subset Sum.
Memory Usage: 89.3 MB, less than 16.96% of JavaScript online submissions for Partition Equal Subset Sum.
*/
var canPartition = function (nums) {
  const n = nums.length;
  let arraySum = 0;
  nums.forEach((num) => (arraySum += num));
  //if array sum is even then we can't partition it
  if (arraySum % 2 !== 0) return false;
  //we can now focus to find the subset sum which is half of arraySum
  const sum = Math.floor(arraySum / 2);
  const dp = [...Array(n + 1)].map((x) => Array(sum + 1).fill(false));
  //we can get sum=0 for any combination of set by considering the empty set
  //so fill first column as 1
  for (let i = 0; i <= n; i++) {
    dp[i][0] = true;
  }
  for (let i = 1; i <= n; i++) {
    for (let j = 1; j <= sum; j++) {
      //if current num can fit in sum, i.e. 'j'
      if (nums[i - 1] <= j) {
        //either we consider the num or don't consider
        dp[i][j] = dp[i - 1][j - nums[i - 1]] || dp[i - 1][j];
      } else {
        //if not then store previous subset value
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  return dp[n][sum];
};
