/* 
45. Jump Game II
https://leetcode.com/problems/jump-game-iii/description/
Type: Medium

You are given a 0-indexed array of integers nums of length n. You are initially positioned at nums[0].

Each element nums[i] represents the maximum length of a forward jump from index i. In other words, if you are at nums[i], you can jump to any nums[i + j] where:

 - 0 <= j <= nums[i] and
 - i + j < n

Return the minimum number of jumps to reach nums[n - 1]. The test cases are generated such that you can reach nums[n - 1].

Example 1:
Input: nums = [2,3,1,1,4]
Output: 2
Explanation: The minimum number of jumps to reach the last index is 2. Jump 1 step from index 0 to 1, then 3 steps to the last index.

Example 2:
Input: nums = [2,3,0,1,4]
Output: 2

Constraints:
 - 1 <= nums.length <= 10^4
 - 0 <= nums[i] <= 1000
 - It's guaranteed that you can reach nums[n - 1].
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
/*
Approach I: recursion
*/
var jump = function (nums) {
  const N = nums.length;
  const recurse = (i) => {
    if (i >= N - 1) return 0;
    let maxJum = Math.min(i + nums[i], N - 1);
    let minJumpCount = Infinity;
    for (let j = i + 1; j <= maxJum; j++) {
      minJumpCount = Math.min(minJumpCount, recurse(j));
    }
    return 1 + minJumpCount;
  };
  return recurse(0);
};

/*
Approach II: recursion + memo (Top Down)
Time complexity: O(N^2), For every element in the array, say i, we are looking at
the next nums[i] elements to its right aiming to find a GOOD index. nums[i] can be
at most n, where n is the length of array nums.
Space: O(2N)= O(N)

Runtime: 344 ms Beats 7.07%
memory: 57.48 MB Beats 7.91%
*/
var jump = function (nums) {
  const N = nums.length;
  const memo = new Array(N).fill(null);
  const recurse = (i) => {
    if (i >= N - 1) return 0;
    if (memo[i] != null) return memo[i];
    let maxJum = Math.min(i + nums[i], N - 1);
    let minJumpCount = Infinity;
    for (let j = i + 1; j <= maxJum; j++) {
      minJumpCount = Math.min(minJumpCount, recurse(j));
    }
    return (memo[i] = 1 + minJumpCount);
  };
  return recurse(0);
};

/* 
Approach III: Greedy
Time: O(N)
Space: O(1)

Runtime: 0 ms Beats 100.00%
Memory: 56.12 MB Beats 21.26%
*/
var jump = function (nums) {
  const N = nums.length;
  let jumps = 0;
  let left = 0;
  let right = 0;
  while (right < N - 1) {
    let farthest = 0;
    for (let j = left; j <= right; j++) {
      farthest = Math.max(farthest, j + nums[j]);
    }
    left = right + 1;
    right = farthest;
    jumps++;
  }
  return jumps;
};
