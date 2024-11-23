/*
https://leetcode.com/problems/house-robber-ii/
Category: Medium

You are a professional robber planning to rob houses along a street. 
Each house has a certain amount of money stashed. All houses at this place
are arranged in a circle. That means the first house is the neighbor of the
last one. Meanwhile, adjacent houses have a security system connected, 
and it will automatically contact the police if two adjacent houses were 
broken into on the same night.

Given an integer array nums representing the amount of money of each house,
return the maximum amount of money you can rob tonight without alerting the police.

Example 1:
Input: nums = [2,3,2]
Output: 3
Explanation: You cannot rob house 1 (money = 2) and then rob house 3 (money = 2), because they are adjacent houses.

Example 2:
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
Total amount you can rob = 1 + 3 = 4.

Example 3:
Input: nums = [1,2,3]
Output: 3

Constraint:
1 <= nums.length <= 100
0 <= nums[i] <= 1000

*/

/* 
Approach: Top Down
Time: O(N)
Space: O(N)

Runtime: 0 ms Beats 100.00%
Memory Usage: 48.88 MB Beats 60.89%
*/
var rob = function (nums) {
  const N = nums.length;
  if (N == 1) return nums[0];
  const helper = (start, end) => {
    if (start == end) return nums[start];
    const memo = new Array(N).fill(-1);
    memo[start] = nums[start];
    memo[start + 1] = Math.max(nums[start], nums[start + 1]);
    const dp = (i, j) => {
      //base case for termination
      if (i == j) return memo[i];
      if (memo[j] !== -1) return memo[j];
      memo[j] = Math.max(nums[j] + dp(i, j - 2), dp(i, j - 1));
      return memo[j];
    };
    return dp(start, end);
  };
  return Math.max(helper(0, N - 2), helper(1, N - 1));
};

/* 
Approach: Bottom-Up

Runtime: 0 ms Beats 100.00%
Memory Usage: 48.79 MB Beats 71.90%
*/
var rob = function (nums) {
  const N = nums.length;
  if (N == 1) return nums[0];
  
  const dp = (start, end) => {
    if (start == end) return nums[start];
    let first = nums[start];
    let second = Math.max(first, nums[start + 1]);
    for (let i = start + 2; i <= end; i++) {
      const third = Math.max(nums[i] + first, second);
      first = second;
      second = third;
    }
    return second;
  };

  const rob1 = dp(0, N - 2);
  const rob2 = dp(1, N - 1);
  return Math.max(rob1, rob2);
};
