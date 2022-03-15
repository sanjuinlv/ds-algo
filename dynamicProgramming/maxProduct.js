/* 
Given an integer array nums, find a contiguous non-empty subarray within
 the array that has the largest product, and return the product.
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
//maxProduct([2,3,-2,4])
//maxProduct([-2,0,-1])
// Fails for [2,3,-2,-6,4]
var maxProduct = function (nums) {
  const N = nums.length;
  const memo = new Array(N).fill(-1);
  let maxProd = Number.NEGATIVE_INFINITY;
  memo[0] = nums[0];
  const dp = (i) => {
    if (memo[i] == -1) {
      const prevMax = dp(i - 1);
      const currProduct = prevMax * nums[i];
      console.log(`prevMax: ${prevMax}, currProduct: ${currProduct}`);
      if (currProduct > prevMax) {
        memo[i] = currProduct;
        maxProd = Math.max(currProduct, maxProd);
      } else {
        memo[i] = nums[i];
      }
      console.log(`maxProd: ${maxProd}`);
    }
    return memo[i];
  };
  dp(N - 1);
  return maxProd;
};

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

Runtime: 88 ms, faster than 61.13% of JavaScript online submissions for Maximum Product Subarray.
Memory Usage: 42.5 MB, less than 54.15% of JavaScript online submissions for Maximum Product Subarray.
[2,3,-2,-6,4,0,1,2,8,9] - PASS
 */
var maxProduct = function (nums) {
  let curr_max = nums[0];
  let curr_min = nums[0];
  let maxProd = curr_max;
  for (let i = 1; i < nums.length; i++) {
    let temp = Math.max(nums[i], nums[i] * curr_max, nums[i] * curr_min);
    curr_min = Math.min(nums[i], nums[i] * curr_max, nums[i] * curr_min);
    curr_max = temp;
    maxProd = Math.max(maxProd, curr_max);
  }
  return maxProd;
};
