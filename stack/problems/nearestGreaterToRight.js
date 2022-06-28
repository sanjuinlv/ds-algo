/**
 * @param {number[]} nums
 * @return {number[]}
 */
var nearestGreaterToRight = function (nums) {
  const result = [];
  const stack = [];
  const N = nums.length;
  const top = (a) => a[a.length - 1];
  for (let i = N - 1; i >= 0; i--) {
    //stack is empty
    if (stack.length === 0) {
      result.push(-1);
      //the top of stack is greater than the current num so add it to result
    } else if (stack.length !== 0 && top(stack) > nums[i]) {
      result.push(top(stack));
    } else if (stack.length !== 0 && top(stack) <= nums[i]) {
      //pop from stack until stack is empty or we find greater num than num[i]
      while (stack.length > 0 && top(stack) <= nums[i]) stack.pop();
      //nothing left in stack. Store -1 in result
      if (stack.length === 0) result.push(-1);
      else result.push(top(stack));
    }
    //always add this element to stack to be used for comparing with other number
    stack.push(nums[i]);
  }
  return result.reverse();
};
//nextGreaterElement([1,3,4,2]) => [3,4,-1,-1]
var nextGreaterElement = function (nums) {
  const stack = [];
  const result = new Array(nums.length);
  const map = new Map();
  const N = nums.length;
  const top = (a) => a[a.length - 1];
  for (let i = 0; i < N; i++) {
    //until stack top is less than curr num, pop and add to map with this num as next greater num
    while (stack.length && top(stack) < nums[i]) {
      map.set(stack.pop(), nums[i]);
    }
    //always add this element to stack to be used for comparing with other number
    stack.push(nums[i]);
  }
  for (let i = 0; i < nums.length; i++) {
    result[i] = map.has(nums[i]) ? map.get(nums[i]) : -1;
  }
  return result;
};
