/* 
https://leetcode.com/problems/longest-increasing-subsequence/

Given an integer array nums, return the length of the longest strictly increasing subsequence.
A subsequence is a sequence that can be derived from an array by deleting some or no elements
without changing the order of the remaining elements. For example, [3,6,2,7] is a subsequence
 of the array [0,3,1,6,2,2,7].

Example 1:
Input: nums = [10,9,2,5,3,7,101,18]
Output: 4
Explanation: The longest increasing subsequence is [2,3,7,101], therefore the length is 4. 

Example 2:
Input: nums = [0,1,0,3,2,3]
Output: 4

Example 3:
Input: nums = [7,7,7,7,7,7,7]
Output: 1

Constraint:
1 <= nums.length <= 2500
-10^4 <= nums[i] <= 10^4

*/
/**
 * @param {number[]} nums
 * @return {number}
 */

/* 
Approach: Recursion
*/
var lengthOfLIS = function (nums) {
  const N = nums.length;

  const backtrack = (i, curr, count) => {
    console.log(`i: ${i}, curr: ${curr}, count: ${count}`);
    if (i == N) return count;
    let longestLIS = 0;
    for (let j = i + 1; j < N; j++) {
      if (nums[j] > curr) {
        const localLIS = backtrack(j, nums[j], count + 1);
        console.log(`localLIS: ${localLIS}`);
        longestLIS = Math.max(longestLIS, localLIS);
      }
    }
    return Math.max(longestLIS, count);
  };
  return backtrack(-1, Number.NEGATIVE_INFINITY, 0);
};

/* 
Approach: Recursion with Memoization
Fails for: [10,9,-2,-1,2,5,3,7,101,18,19]
*/
var lengthOfLIS = function (nums) {
  const N = nums.length;
  const memo = new Array(N).fill(null);

  const backtrack = (i, curr, count) => {
    console.log(`i: ${i}, curr: ${curr}, count: ${count}`);
    if (i == N) return count;
    if (memo[i] != null) return memo[i];

    let longestLIS = 0;
    for (let j = i + 1; j < N; j++) {
      if (nums[j] > curr) {
        const localLIS = backtrack(j, nums[j], count + 1);
        console.log(`localLIS: ${localLIS}`);
        memo[i] = Math.max(memo[i] ? memo[i] : 0, localLIS);
      }
    }
    return Math.max(memo[i], count);
  };
  return backtrack(-1, Number.NEGATIVE_INFINITY, 0);
};

/*
Approach: Dynamic Programming
Time: O(N^2)
Space: O(N)
Runtime: 207 ms, faster than 53.65% of JavaScript online submissions for Longest Increasing Subsequence.
Memory Usage: 43.4 MB, less than 90.03% of JavaScript online submissions for Longest Increasing Subsequence.
*/

var lengthOfLIS = function (nums) {
  const N = nums.length;
  const dp = new Array(N).fill(1);
  let longest = 1;
  for (let i = 1; i < N; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
    longest = Math.max(longest, dp[i]);
  }
  return longest;
};
