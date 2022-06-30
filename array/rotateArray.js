/* 
Problem Type: Simple
Given an array, rotate the array to the right by k steps, where k is non-negative.
Follow up:
Try to come up as many solutions as you can, there are at least 3 different ways to 
solve this problem.
Could you do it in-place with O(1) extra space?

Example 1:
Input: nums = [1,2,3,4,5,6,7], k = 3
Output: [5,6,7,1,2,3,4]
Explanation:
rotate 1 steps to the right: [7,1,2,3,4,5,6]
rotate 2 steps to the right: [6,7,1,2,3,4,5]
rotate 3 steps to the right: [5,6,7,1,2,3,4]

Example 1:
Input: nums = [-1,-100,3,99], k = 2
Output: [3,99,-1,-100]
Explanation: 
rotate 1 steps to the right: [99,-1,-100,3]
rotate 2 steps to the right: [3,99,-1,-100]

Contraint
    1 <= nums.length <= 2 * 10^4
    -2^31 <= nums[i] <= 2^31 - 1
    0 <= k <= 10^5
*/
/**
 * Time complexity: O(N)
 * Space complexity: O(N) (Using temp array)
 * @param {number[]} nums
 * @param {number} k
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/* 
Runtime: 88 ms, faster than 79.35% of JavaScript online submissions for Rotate Array.
Memory Usage: 41.1 MB, less than 6.77% of JavaScript online submissions for Rotate Array.
*/
var rotate = function (nums, k) {
  const N = nums.length;
  if (k > N) k = k % N;
  let temp = [];
  //copy item from from end which will move to front after rotation
  for (let i = N - k; i < N; i++) {
    temp.push(nums[i]);
  }
  //copy front items which will move i+k steps
  console.log(temp);
  for (let i = 0; i < N - k; i++) {
    temp.push(nums[i]);
  }
  console.log(temp);
  for (let i = 0; i < N; i++) {
    nums[i] = temp[i];
  }
};

/**
 * Approach 2: Using array reverasal
 * Step 1: rotate the whole array
 * Step 2: rotate array from begining to k
 * Step 3: rotate array from k till end
 * E.g., Input: [1,2,3,4,5]
 * Step 1: [5,4,3,2,1]
 * Step 2: [4,5,3,2,1]
 * Step 2: [4,5,1,2,3]
 * @param nums
 * @param k
 */
/*
Runtime: 88 ms, faster than 79.35% of JavaScript online submissions for Rotate Array.
Memory Usage: 39.4 MB, less than 90.90% of JavaScript online submissions for Rotate Array.
 */
var rotate = function (nums, k) {
  const N = nums.length;
  if (k > N) k = k % N;
  const reverse = (arr, start, end) => {
    while (start < end) {
      let temp = arr[start];
      arr[start++] = arr[end];
      arr[end--] = temp;
    }
  };
  reverse(nums, 0, N - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, N - 1);
};
