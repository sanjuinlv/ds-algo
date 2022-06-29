/* 
Time: O(N)
Space; O(N)
Runtime: 292 ms, faster than 86.08% of JavaScript online submissions for Online Stock Span.
Memory Usage: 54.8 MB, less than 82.91% of JavaScript online submissions for Online Stock Span.
*/
var StockSpanner = function () {
  this.stack = [];
  this.N = 0;
};

/**
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function (price) {
  if (this.stack.length == 0) {
    this.stack.push([price, this.N++]);
    return 1;
  }
  const top = (A) => A[A.length - 1];
  let span = 1;
  //if the top of stack is greater than curr num then we found NGL
  if (top(this.stack)[0] > price) {
    span = this.N - top(this.stack)[1];
  } else {
    //until the top of stack is smaller than curr num pop
    while (this.stack.length !== 0 && top(this.stack)[0] <= price) {
      this.stack.pop();
    }
    //nothing left in stack, which means no price exist before this which
    //was greater than this 'price'. i.e, this price is largest so far, so N+1
    if (this.stack.length == 0) span = this.N + 1;
    else span = this.N - top(this.stack)[1];
  }
  this.stack.push([price, this.N++]);
  return span;
};

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */

//using num and index pair
var StockSpanner = function (nums) {
  const stack = [];
  const NGLIndex = [];
  const N = nums.length;
  const top = (A) => A[A.length - 1];
  stack.push([nums[0], 0]);
  NGLIndex[0] = -1;
  for (let i = 1; i < N; i++) {
    //if the top of stack is greater than curr num then we found NGL
    if (top(stack)[0] > nums[i]) {
      NGLIndex[i] = top(stack)[1];
    } else {
      //until the top of stack is smaller than curr num pop
      while (stack.length !== 0 && top(stack)[0] <= nums[i]) stack.pop();
      //nothing left in stack
      if (stack.length == 0) NGLIndex[i] = i - 1;
      else NGLIndex[i] = top(stack)[1];
    }
    stack.push([nums[i], i]);
  }
  console.log(NGLIndex);
  //prepare result
  for (let i = 0; i < N; i++) {
    NGLIndex[i] = i - NGLIndex[i];
  }
  console.log(NGLIndex);
};

var StockSpanner = function (nums) {
  const stack = [];
  const NGLIndex = [];
  const N = nums.length;
  const top = (A) => A[A.length - 1];
  stack.push(0);
  NGLIndex[0] = -1;
  for (let i = 1; i < N; i++) {
    //if the top of stack is greater than curr num then we found NGL
    if (nums[top(stack)] > nums[i]) {
      NGLIndex[i] = top(stack);
    } else {
      //until the top of stack is smaller than curr num pop
      while (stack.length !== 0 && nums[top(stack)] <= nums[i]) stack.pop();
      //nothing left in stack
      if (stack.length == 0) NGLIndex[i] = i - 1;
      else NGLIndex[i] = top(stack);
    }
    stack.push(i);
  }
  console.log(NGLIndex);
  //prepare result
  for (let i = 0; i < N; i++) {
    NGLIndex[i] = i - NGLIndex[i];
  }
  console.log(NGLIndex);
};
