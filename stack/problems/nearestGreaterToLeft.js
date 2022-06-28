/**
 * @param {number[]} nums
 * @return {number[]}
 */
/*
nextGreaterToLeft([1,3,2,4])  => [ -1, -1, 3, -1 ]
*/
var nearestGreaterToLeft = function (nums) {
  const result = [];
  const stack = [];
  const N = nums.length;
  const top = (a) => a[a.length - 1];
  for (let i = 0; i < N; i++) {
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
  //we do not need to reverse in this case
  return result;
};
