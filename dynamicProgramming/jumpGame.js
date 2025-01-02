/* 
55. Jump Game
https://leetcode.com/problems/jump-game/
Category - Medium

You are given an integer array nums. You are initially positioned at the array's
first index, and each element in the array represents your maximum jump length
at that position.

Return true if you can reach the last index, or false otherwise.

Example 1:
Input: nums = [2,3,1,1,4]
Output: true
Explanation: Jump 1 step from index 0 to 1, then 3 steps to the last index.

Example 2:

Input: nums = [3,2,1,0,4]
Output: false
Explanation: You will always arrive at index 3 no matter what. Its maximum jump length is 0, which makes it impossible to reach the last index.

Constraints:

1 <= nums.length <= 104
0 <= nums[i] <= 105
*/
/**
 * @param {number[]} nums
 * @return {boolean}
 */
/* 
Approach I: Recursion
*/
var canJump = function (nums) {
  const N = nums.length;
  const jump = (index, nums) => {
    if (index >= N - 1) return true;
    const noOfJump = nums[index];
    //if we find num[i]=0 then we wont be able to proceed further
    if (noOfJump == 0) return false;
    //try all combination from this no of jump
    for (let i = noOfJump; i > 0; i--) {
      if (jump(index + i, nums)) return true;
    }
    return false;
  };
  return jump(0, nums);
};

/* 
Approach II: Recursion + Memoization (Top Down)
Time complexity: O(N^2), For every element in the array, say i, we are looking at
the next nums[i] elements to its right aiming to find a GOOD index. nums[i] can be
at most n, where n is the length of array nums.
Space: O(2N)= O(N), First n originates from recursion. Second n comes from the usage
of the memo table.

Runtime: 1753 ms, faster than 17.86% of JavaScript online submissions for Jump Game.
Memory Usage: 55.6 MB, less than 5.14% of JavaScript online submissions for Jump Game.
*/
var canJump = function (nums) {
  const N = nums.length;
  const memo = new Array(N).fill(-1);
  const jump = (index, nums) => {
    if (index >= N - 1) return true;
    if (memo[index] !== -1) return memo[index];
    const noOfJump = nums[index];
    //if we find num[i]=0 then we wont be able to proceed further
    if (noOfJump == 0) return false;
    //try all combination from this no of jump
    for (let i = noOfJump; i > 0; i--) {
      memo[index + i] = jump(index + i, nums);
      if (memo[index + i]) return true;
    }
    memo[index] = false;
    return memo[index];
  };
  return jump(0, nums);
};

//sol ref
/* 
Runtime: 757 ms Beats 8.10%
Memory Usage: 56.13 MB Beats 10.70%
*/
var canJump = function (nums) {
  const N = nums.length;
  const memo = new Array(N);
  const jump = (i) => {
    //base case
    if (i == N - 1) return true;
    if (memo[i] != null) return memo[i];
    const maxJump = Math.min(nums[i] + i, N - 1);
    //try for each jump length
    for (let j = i + 1; j <= maxJump; j++) {
      if (jump(j)) {
        memo[i] = true;
        return true;
      }
    }
    memo[i] = false;
    return memo[i];
  };
  return jump(0);
};

/*
Approach III: Bottom Up
Time: O(N^2)
Space: O(N)

Runtime: 123 ms Beats 15.70%
Memory Usage: 55.48 MB Beats 13.00%

 */
var canJump = function (nums) {
  const N = nums.length;
  const dp = new Array(N).fill(false);
  dp[N - 1] = true;
  for (let i = N - 2; i >= 0; i--) {
    const maxJump = Math.min(nums[i] + i, N - 1);
    for (let j = i + 1; j <= maxJump; j++) {
      if (dp[j]) {
        dp[i] = true;
        break;
      }
    }
  }
  return dp[0];
};

/*
Approach III: Greedy
Time: O(N)
Space: O(1)

Runtime: 119 ms, faster than 50.41% of JavaScript online submissions for Jump Game.
Memory Usage: 46.2 MB, less than 77.98% of JavaScript online submissions for Jump Game.

 */
var canJump = function (nums) {
  const N = nums.length;
  //last good position
  let lastGoodPos = N - 1;
  for (let i = N - 1; i >= 0; i--) {
    //if the we can jump to last known good position then update last good position
    if (i + nums[i] >= lastGoodPos) {
      lastGoodPos = i;
    }
  }
  return lastGoodPos === 0;
};
