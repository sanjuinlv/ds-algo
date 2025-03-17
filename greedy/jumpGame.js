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
  const jump = (i) => {
    if (i >= N - 1) return true;
    const nuOfJumps = Math.min(nums[i], N - 1);
    //we can not proceed further
    if (nuOfJumps == 0) return false;
    //try all combination from this no of jumps
    for (let j = nuOfJumps; j > 0; j--) {
      if (jump(i + j)) return true;
    }
    return false;
  };
  return jump(0);
};

/* 
Approach II: Recursion + Memoization (Top Down)
Time complexity: O(N^2), For every element in the array, say i, we are looking at
the next nums[i] elements to its right aiming to find a GOOD index. nums[i] can be
at most n, where n is the length of array nums.
Space: O(2N)= O(N), First n originates from recursion. Second n comes from the usage
of the memo table.

Runtime: 581 ms Beats 9.75%
Memory Usage: 62.49 MB Beats 5.08% 
*/
var canJump = function (nums) {
  const N = nums.length;
  const memo = new Array(N).fill(-1);
  const jump = (i) => {
    if (i >= N - 1) return true;
    if (memo[i] != -1) return memo[i];
    const nuOfJumps = Math.min(nums[i], N - 1);
    //we can not proceed further
    if (nuOfJumps == 0) return false;
    //try all combination from this no of jumps
    for (let j = nuOfJumps; j > 0; j--) {
      if (jump(i + j)) {
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
  //base case
  dp[N - 1] = true;
  for (let i = N - 2; i >= 0; i--) {
    const maxJump = Math.min(nums[i], N - 1);
    for (let j = maxJump + i; j > i; j--) {
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

Runtime: 1 ms Beats 87.42%
Memory Usage: 59.43 MB Beats 11.80%
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

/*
Approach IV: Greedy
Time: O(N)
Space: O(1)

Runtime: 3 ms Beats 36.38%
Memory Usage: 58.64 MB Beats 29.74%
*/
var canJump = function (nums) {
  const N = nums.length;
  let maxIndex = 0;
  for (i = 0; i < N; i++) {
    //we reached to index higher than max jump we can do, indicating a zero in between. 
    if (i > maxIndex) return false;
    // console.log(`i: ${i}, jump: ${nums[i]}, maxIndex: ${maxIndex}`)
    maxIndex = Math.max(maxIndex, i + nums[i]);
  }
  return true;
};