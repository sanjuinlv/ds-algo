//nearestSmallerToRight([4,5,2,10,8]) => [ 2, 2, -1, 8, -1 ]
function nearestSmallerToRight(nums) {
  const stack = [];
  const N = nums.length;
  const result = new Array(N);
  const top = (A) => A[A.length - 1];
  stack.push(nums[N - 1]);
  result[N - 1] = -1;
  for (let i = N - 2; i >= 0; i--) {
    //if top of stack is less than curr num then we found NSR
    if (top(stack) < nums[i]) {
      result[i] = top(stack);
    } else {
      //until top of stack is greater than curr num, pop
      while (stack.length !== 0 && top(stack) >= nums[i]) stack.pop();
      //if nothing left in stack then there is no NSR
      if (stack.length == 0) result[i] = -1;
      else result[i] = top(stack);
    }
    stack.push(nums[i]);
  }
  return result;
}
