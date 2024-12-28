/* 
300. Longest Increasing Subsequence
https://leetcode.com/problems/longest-increasing-subsequence/
Type: Medium

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
Approach I: Recursion
Time: O(2^N)
Space: O(N) - Stack Depth
*/
var lengthOfLIS = function (nums) {
  const N = nums.length;
  const LIS = (i, prevIdx) => {
    //base case
    //we reached end of the array
    if (i == N) return 0;
    //if we do no take the current element
    let len = 0 + LIS(i + 1, prevIdx);
    //if there is no element taken or curr element is greater than prev
    if (prevIdx == -1 || nums[i] > nums[prevIdx]) {
      const notTaken = 1 + LIS(i + 1, i);
      len = Math.max(len, notTaken);
    }
    return len;
  };
  return LIS(0, -1);
};

/*
Approach I: Recursion
Time: O(N * N)
Space: O(N * N) - memo array

Runtime: 1578 ms Beats 5.04%
Memory Usage: 119.85 MB Beats 5.26%
*/
var lengthOfLIS = function (nums) {
  const N = nums.length;
  const LIS = (i, prevIdx) => {
    //base case
    //we reached end of the array
    if (i == N) return 0;
    //if we do no take the current element
    let len = 0 + LIS(i + 1, prevIdx);
    //if there is no element taken or curr element is greater than prev
    if (prevIdx == -1 || nums[i] > nums[prevIdx]) {
      const notTaken = 1 + LIS(i + 1, i);
      len = Math.max(len, notTaken);
    }
    return len;
  };
  return LIS(0, -1);
};

/*
Approach: Dynamic Programming
Time: O(N^2)
Space: O(N)
Solution video reference: https://www.youtube.com/watch?v=CE2b_-XfVDk

Runtime: 93 ms Beats 31.36%
Memory Usage: 50.70 MB Beats 78.47%
*/

var lengthOfLIS = function (nums) {
  let longest = 1;
  const N = nums.length;
  //Fill DP with 1 as each number has lenght min LIS of length 1
  const dp = new Array(N).fill(1);
  //try for each number
  for (let i = 1; i < N; i++) {
    //start from begining for each i
    for (let j = 0; j < i; j++) {
      // if nums at i is greater than at 'j' then current max length
      // is last count + 1, or current count
      if (nums[i] > nums[j]) {
        dp[i] = Math.max(dp[i], dp[j] + 1);
        longest = Math.max(longest, dp[i]);
      }
    }
  }
  return longest;
};
