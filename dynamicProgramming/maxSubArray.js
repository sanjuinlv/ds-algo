/* 
53. Maximum Subarray
https://leetcode.com/problems/maximum-subarray/
Type: Medium

Given an integer array nums, find the contiguous subarray (containing at least one number) 
which has the largest sum and return its sum.
Follow up: If you have figured out the O(n) solution, try coding another solution 
using the divide and conquer approach, which is more subtle.
Example 1:
    Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
    Output: 6
    Explanation: [4,-1,2,1] has the largest sum = 6.
Example 2:
    Input: nums = [1]
    Output: 1

Example 3:
    Input: nums = [0]
    Output: 0

Constraints:
 - 1 <= nums.length <= 10^5
 - -10^4 <= nums[i] <= 10^4

Follow up: If you have figured out the O(n) solution, try coding another solution using the divide and conquer approach, which is more subtle.    
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
/*
Approach I: Brute Force
Time: O(N^2)
Space: O(1)
*/
var maxSubArray = function (nums) {
  const N = nums.length;
  let maxSum = nums[0];
  for (let i = 0; i < N; i++) {
    let localSum = 0;
    for (let j = i; j < N; i++) {
      localSum += nums[j];
      maxSum = Math.max(maxSum, localSum);
    }
  }
  return maxSum;
};
/*
Approach I: Using Kadane's Algorithm
Time: O(N)
Space: O(1)

Runtime: 96 ms, faster than 24.66% of JavaScript online submissions for Maximum Subarray.
Memory Usage: 38.3 MB, less than 8.43% of JavaScript online submissions for Maximum Subarray.
 */
var maxSubArray = function (nums) {
  let localMax = nums[0];
  let gloablMax = localMax;
  for (let i = 1; i < nums.length; i++) {
    localMax = Math.max(nums[i], localMax + nums[i]);
    gloablMax = Math.max(gloablMax, localMax);
  }
  return gloablMax;
};

/* 
Approach III: Divide and Conquer
Time: O(N Log N)
Space: O(Log N)

Runtime: 21 ms Beats 5.40%
Memory: 63.47 MB Beats 22.85% 
*/

var maxSubArray = function (nums) {
  return findBestSubarray(0, nums.length - 1, nums);
};

function findBestSubarray(left, right, nums) {
  //base case
  if (left > right) return -Infinity;
  let leftBestSum = 0;
  let rightBestSum = 0;
  let mid = left + Math.floor((right - left) / 2);
  let currSum = 0;
  // find left max sum from the middle to the beginning
  for (let i = mid - 1; i >= left; i--) {
    currSum += nums[i];
    leftBestSum = Math.max(leftBestSum, currSum);
  }
  //reset currSum
  currSum = 0;
  // find right max sum from the middle to the end
  for (let i = mid + 1; i <= right; i++) {
    currSum += nums[i];
    rightBestSum = Math.max(rightBestSum, currSum);
  }
  const bestCombinedSum = nums[mid] + leftBestSum + rightBestSum;
  const leftHalf = findBestSubarray(left, mid - 1, nums);
  const rightHalf = findBestSubarray(mid + 1, right, nums);
  return Math.max(bestCombinedSum, Math.max(leftHalf, rightHalf));
}
