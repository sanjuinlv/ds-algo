/* 
https://leetcode.com/problems/maximum-product-subarray/
Type: Medium

Given an integer array nums, find a contiguous non-empty subarray within the array that has the largest product, and return the product.
The test cases are generated so that the answer will fit in a 32-bit integer.

A subarray is a contiguous subsequence of the array.

Example 1:
Input: nums = [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.

Example 2:
Input: nums = [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.
*/

/**
 * @param {number[]} nums
 * @return {number}
 */
/*
Approach: Top-Down

*/
/* 
Approach: Brute force
Time: O(N^2)
Space: O(1)

//maxProduct([2,3,-2,4]) - PASS
//maxProduct([-2,0,-1])  - PASS
// maxProduct([2,3,-2,-6,4]) - PASS
*/
var maxProduct = function (nums) {
  let maxProd = Number.NEGATIVE_INFINITY;
  const N = nums.length;
  for (let i = 0; i < N; i++) {
    let localProduct = 1;
    for (let j = i; j < N; j++) {
      localProduct *= nums[j];
      maxProd = Math.max(maxProd, localProduct);
    }
  }
  return maxProd;
};

/*
Approach: Dynamic Programming
Time: O(N)
Space: O(1)

Runtime: 60 ms, faster than 45.87% of JavaScript online submissions for Maximum Product Subarray.
Memory Usage: 49.66 MB, less than 59.41% of JavaScript online submissions for Maximum Product Subarray.
*/
var maxProduct = function (nums) {
  let localMax = nums[0];
  let localMin = localMax;
  let globalMax = localMax;
  for (let i = 1; i < nums.length; i++) {
    let temp = localMin;
    localMin = Math.min(nums[i], nums[i] * localMin, nums[i] * localMax);
    localMax = Math.max(nums[i], nums[i] * temp, nums[i] * localMax);
    globalMax = Math.max(globalMax, localMax);
  }
  return globalMax;
};
