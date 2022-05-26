/* 
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
/* 
Time complexity: O(N) ( O(N+N+N) => O(3N) => O(N))
Space complexity: O(N) ( O(2N)=> O(N), excluding result array)
Runtime: 112 ms
Memory Usage: 49.7 MB
Your runtime beats 62.70 % of javascript submissions.
*/
var productExceptSelf = function (nums) {
  const N = nums.length;
  const result = [];
  const A = [N];
  const B = [N];
  A[0] = 1;
  for (let i = 1; i < N; i++) {
    A[i] = A[i - 1] * nums[i - 1];
  }
  B[N - 1] = 1;
  for (let i = N - 2; i >= 0; i--) {
    B[i] = B[i + 1] * nums[i + 1];
  }
  for (let i = 0; i < N; i++) {
    result[i] = A[i] * B[i];
  }
  return result;
};

//Approach 2: Using constant space O(N)
// we can avoid creating the left and right product array and re-use the input array
// and create the result array on the fly
var productExceptSelf = function (nums) {
  const N = nums.length;
  const result = [];
  result[0] = 1;
  for (let i = 1; i < N; i++) {
    result[i] = result[i - 1] * nums[i - 1];
  }
  console.log(`result: ${result}`);
  let temp = nums[N - 1];
  nums[N - 1] = 1;
  for (let i = N - 2; i >= 0; i--) {
    const product = nums[i + 1] * temp;
    temp = nums[i];
    nums[i] = product;
  }
  console.log(`nums: ${nums}`);
  for (let i = 0; i < N; i++) {
    result[i] = result[i] * nums[i];
  }
  console.log(`final result: ${result}`);
  return result;
};

// 06/03/2020
//productExceptSelf([1,2,3,4])
//productExceptSelf([2,3,1,4])
/* 
Time: O(N)
Space: O(N)
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

/* 
Without using extra space
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
  rightProduct = 1;
  for (let i = N - 2; i >= 0; i--) {
    rightProduct = rightProduct * nums[i + 1];
    result[i] = result[i] * rightProduct;
  }
  return result;
};
