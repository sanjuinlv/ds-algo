/**
 * @param {number[]} nums
 * @return {number[]}
 */
/*
nearestGreaterToLeft([1,3,2,4])  => [ -1, -1, 3, -1 ]
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

//II: using indexed position instead of push
var nearestGreaterToLeft = function (nums) {
  const stack = [];
  const N = nums.length;
  const result = new Array(N);
  const top = (a) => a[a.length - 1];
  for (let i = 0; i < N; i++) {
    //stack is empty
    if (stack.length === 0) {
      result[i] = -1;
      //the top of stack is greater than the current num so add it to result
    } else if (stack.length !== 0 && top(stack) > nums[i]) {
      result[i] = top(stack);
    } else if (stack.length !== 0 && top(stack) <= nums[i]) {
      //pop from stack until stack is empty or we find greater num than num[i]
      while (stack.length > 0 && top(stack) <= nums[i]) stack.pop();
      //nothing left in stack. Store -1 in result
      if (stack.length === 0) result[i] = -1;
      else result[i] = top(stack);
    }
    //always add this element to stack to be used for comparing with other number
    stack.push(nums[i]);
  }
  //we do not need to reverse in this case
  return result;
};

///III: handling the array
var nearestGreaterToLeft = function (nums) {
  const stack = [];
  const N = nums.length;
  const result = new Array(N);
  const top = (arr) => arr[arr.length - 1];
  result[0] = -1;
  stack.push(nums[0]);
  for (let i = 1; i < N; i++) {
    if (top(stack) > nums[i]) {
      result[i] = top(stack);
    } else if (top(stack) <= nums[i]) {
      //pop from stack until stack is empty or we find greater num than num[i]
      while (stack.length > 0 && top(stack) <= nums[i]) stack.pop();
      //nothing left in stack. Store -1 in result
      if (stack.length === 0) result[i] = -1;
      else result[i] = top(stack);
    }
    //always add this element to stack to be used for comparing with other number
    stack.push(nums[i]);
  }
  return result;
};
