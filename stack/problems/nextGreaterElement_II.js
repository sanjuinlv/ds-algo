/*
Given a circular integer array nums (i.e., the next element of nums[nums.length - 1] is nums[0]),
return the next greater number for every element in nums.

The next greater number of a number x is the first greater number to its traversing-order
next in the array, which means you could search circularly to find its next greater number. If it doesn't exist, return -1 for this number.

Example 1:

Input: nums = [1,2,1]
Output: [2,-1,2]
Explanation: The first 1's next greater number is 2; 
The number 2 can't find next greater number. 
The second 1's next greater number needs to search circularly, which is also 2.

Example 2:

Input: nums = [1,2,3,4,3]
Output: [2,3,4,-1,4]

Constraints:

1 <= nums.length <= 10^4
-10^9 <= nums[i] <= 10^9
 */
var nextGreaterElements = function (nums) {
  const stack = [];
  const N = nums.length;
  const result = new Array(N);
  const top = (A) => A[A.length - 1];
  stack.push(nums[N - 1]);
  result[N - 1] = -1;
  for (let i = N - 2; i >= 0; i--) {
    //if the top of the element is greater than num then we found NGR
    if (top(stack) > nums[i]) {
      result[i] = top(stack);
    } else {
      //remove element from stack until we find greater than num
      while (stack.length !== 0 && top(stack) <= nums[i]) stack.pop();
      //nothing left on stack
      if (stack.length === 0) result[i] = -1;
      else result[i] = top(stack);
    }
    stack.push(nums[i]);
  }
  return result;
};

/* 
Approach: Using Stack
Time: O(N)
Space: O(N)
Runtime: 211 ms, faster than 28.82% of JavaScript online submissions for Next Greater Element II.
Memory Usage: 49.3 MB, less than 16.34% of JavaScript online submissions for Next Greater Element II.
*/
var nextGreaterElements = function (nums) {
  const stack = [];
  const N = nums.length;
  const result = new Array(N);
  const top = (A) => A[A.length - 1];
  for (let j = 0; j < 2; j++) {
    for (let i = N - 1; i >= 0; i--) {
      //if the top of the element is greater than num then we found NGR
      if (top(stack) > nums[i]) {
        result[i] = top(stack);
      } else {
        //remove element from stack until we find greater than num
        while (stack.length > 0 && top(stack) <= nums[i]) stack.pop();
        //nothing left on stack
        if (stack.length === 0) result[i] = -1;
        else result[i] = top(stack);
      }
      stack.push(nums[i]);
    }
    console.log(stack);
  }
  return result;
};

//From Nishant
var nextGreaterElements = function (nums) {
  const stack = [];
  const out = [];
  for (let j = 0; j < 2; j++) {
    for (let i = nums.length - 1; i >= 0; i--) {
      const num = nums[i];
      while (stack.length > 0 && num >= stack[stack.length - 1]) {
        stack.pop();
      }

      if (stack.length > 0) {
        out[i] = stack[stack.length - 1];
      } else {
        out[i] = -1;
      }
      stack.push(num);
    }
  }
  return out;
};
