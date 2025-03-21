/* 
https://leetcode.com/problems/online-stock-span/
Type: Medium

Design an algorithm that collects daily price quotes for some stock and returns the span
of that stock's price for the current day.

The span of the stock's price today is defined as the maximum number of consecutive days
(starting from today and going backward) for which the stock price was less than or
equal to today's price.

For example, if the price of a stock over the next 7 days were [100,80,60,70,60,75,85],
then the stock spans would be [1,1,1,2,1,4,6].
Implement the StockSpanner class:

StockSpanner() Initializes the object of the class.
int next(int price) Returns the span of the stock's price given that today's price is price.
 
Example 1:

Input
["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
[[], [100], [80], [60], [70], [60], [75], [85]]
Output
[null, 1, 1, 1, 2, 1, 4, 6]

Explanation
StockSpanner stockSpanner = new StockSpanner();
stockSpanner.next(100); // return 1
stockSpanner.next(80);  // return 1
stockSpanner.next(60);  // return 1
stockSpanner.next(70);  // return 2
stockSpanner.next(60);  // return 1
stockSpanner.next(75);  // return 4, because the last 4 prices (including today's price of 75) were less than or equal to today's price.
stockSpanner.next(85);  // return 6

Constraints:

1 <= price <= 10^5
At most 10^4 calls will be made to next.
*/
/* 
Time: O(N)
Space; O(N)
Runtime: 292 ms, faster than 86.08% of JavaScript online submissions for Online Stock Span.
Memory Usage: 54.8 MB, less than 82.91% of JavaScript online submissions for Online Stock Span.
*/
var StockSpanner = function () {
  this.stack = [];
  this.result = [];
  this.N = -1;
};

/**
 * @param {number} price
 * @return {number}
 */
StockSpanner.prototype.next = function (price) {
  this.N++;
  const top = (A) => A[A.length - 1];
  let span = 1;
  if (this.stack.length && top(this.stack)[0] > price) {
    span = this.N - top(this.stack)[1];
  } else {
    //until top is smaller pop
    while (this.stack.length && top(this.stack)[0] <= price) this.stack.pop();
    //nothing left in stack, which means no price exist before this which
    //was greater than this 'price'. i.e, this price is largest so far, so N+1
    if (this.stack.length == 0) span = this.N + 1;    
    else span = this.N - top(this.stack)[1];
  }
  this.stack.push([price, this.N]);
  return span;
};

/**
 * Your StockSpanner object will be instantiated and called as such:
 * var obj = new StockSpanner()
 * var param_1 = obj.next(price)
 */

//If all numbers are given in an array
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
  //prepare result (curr index 'i' - NGL index gives us no of element between them, which is stock span)
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
