/*
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
Top-down
// fails for rob([2,3,2]) => 5
*/
var rob = function (nums) {
  const N = nums.length;
  if (N == 1) return nums[0];
  const memo = new Array(N).fill(-1);
  const first = nums.shift();
  nums.push(first);
  memo[0] = nums[0];
  memo[1] = Math.max(nums[0], nums[1]);
  const dp = (i) => {
    if (memo[i] == -1) {
      memo[i] = Math.max(nums[i] + dp(i - 2), dp(i - 1));
    }
    return memo[i];
  };
  return dp(N - 1);
};

/* 
Approach: Bottom-Up
*/
var rob = function (nums) {
  const N = nums.length;
  if (N == 1) return nums[0];

  const dp = (nums, start, end) => {
    if (start == end) return nums[start];
    let first = nums[start];
    let second = Math.max(nums[start], nums[start + 1]);
    for (let i = start + 2; i <= end; i++) {
      let third = Math.max(nums[i] + first, second);
      first = second;
      second = third;
    }
    return second;
  };

  const rob1 = dp(nums, 0, N - 2);
  const rob2 = dp(nums, 1, N - 1);

  return Math.max(rob1, rob2);
};
