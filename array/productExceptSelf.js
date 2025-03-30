/* 
238. Product of Array Except Self
https://leetcode.com/problems/product-of-array-except-self
Type: Medium

Given an array nums of n integers where n > 1,  return an array output such that output[i] is 
equal to the product of all the elements of nums except nums[i].

Example:
Input:  [1,2,3,4]
Output: [24,12,8,6]

Constraint: It's guaranteed that the product of the elements of any prefix or suffix of the array 
(including the whole array) fits in a 32 bit integer.

Note: Please solve it without division and in O(n).

Follow up:
Could you solve it with constant space complexity? (The output array does not count as extra space 
for the purpose of space complexity analysis.)

*/
/**
 * @param {number[]} nums
 * @return {number[]}
 */
//Brute Force
//this will fail for array having zeros, e[-1,1,0,-3,3]
var productExceptSelf = function (nums) {
  let allNumProduct = 1;
  for (let i = 0; i < nums.length; i++) {
    allNumProduct = allNumProduct * nums[i];
  }
  for (let i = 0; i < nums.length; i++) {
    nums[i] = allNumProduct / nums[i];
  }
  return nums;
};
/* 
Time complexity: O(N) ( O(N+N+N) => O(3N) => O(N))
Space complexity: O(N) ( O(2N)=> O(N), excluding result array)
Runtime: 112 ms
Memory Usage: 49.7 MB
Your runtime beats 62.70 % of javascript submissions.
*/
var productExceptSelf = function (nums) {
  const N = nums.length;
  const leftProduct = new Array(N);
  const rightProduct = new Array(N);
  leftProduct[0] = 1;
  for (let i = 1; i < N; i++) {
    leftProduct[i] = leftProduct[i - 1] * nums[i - 1];
  }
  rightProduct[N - 1] = 1;
  for (let i = N - 2; i >= 0; i--) {
    rightProduct[i] = rightProduct[i + 1] * nums[i + 1];
  }
  const result = new Array(N);
  for (let i = 0; i < N; i++) {
    result[i] = leftProduct[i] * rightProduct[i];
  }
  return result;
};

//Approach 2: Using constant space O(N)
/* 
Without using extra space
we can avoid creating the left and right product array and re-use the input array
and create the result array on the fly

Time: O(N)
Space: O(1)
Runtime: 104 ms, faster than 92.65% of JavaScript online submissions for Product of Array Except Self.
Memory Usage: 55.6 MB, less than 22.21% of JavaScript online submissions for Product of Array Except Self.
*/
var productExceptSelf = function (nums) {
  const N = nums.length;
  const result = new Array(N);
  result[0] = 1;
  for (let i = 1; i < N; i++) {
    result[i] = result[i - 1] * nums[i - 1];
  }
  let rightProduct = 1;
  for (let i = N - 2; i >= 0; i--) {
    rightProduct = rightProduct * nums[i + 1];
    result[i] = result[i] * rightProduct;
  }
  return result;
};
