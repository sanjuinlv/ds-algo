/* 
nearestSmallerToLeft([4,5,2,10,8]) => [ -1, 4, -1, 2, 2 ]
nearestSmallerToLeft([4,5,2,10,1]) => [ -1, 4, -1, 2, -1 ]
*/
function nearestSmallerToLeft(nums) {
  const stack = [];
  const N = nums.length;
  const result = new Array(N);
  const top = (arr) => arr[arr.length - 1];
  stack.push(nums[0]);
  result[0] = -1;
  for (let i = 1; i < N; i++) {
    // console.log(`num[${i}]: ${nums[i]}, stack: ${stack}`);
    //if top of stack is less then that is NSL
    if (top(stack) < nums[i]) {
      result[i] = top(stack);
    } else {
      //until top of stack is greater pop it
      while (stack.length !== 0 && top(stack) >= nums[i]) stack.pop();
      //if nothing is left in stack then there is no NSL
      if (stack.length == 0) result[i] = -1;
      else result[i] = top(stack);
    }
    stack.push(nums[i]);
  }
  return result;
}
