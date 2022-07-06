/*
Min Stack implemenation using two stack
Time Complexity: O(1) for all operations (push, pop, top, getMin)
Space: O(N)

Runtime: 120 ms, faster than 77.73% of JavaScript online submissions for Min Stack.
Memory Usage: 45.4 MB, less than 76.10% of JavaScript online submissions for Min Stack.
*/
class MinStack {
  constructor() {
    this._stack = [];
    this._minStack = [];
  }

  //internal method
  _last(arr) {
    return arr[arr.length - 1];
  }

  push(x) {
    // We always put the number onto the main stack.
    this._stack.push(x);
    // If the min stack is empty, or this number is smaller
    // than the top of the min stack, put it on with a count of 1.
    if (this._minStack.length == 0 || x < this._last(this._minStack)[0]) {
      this._minStack.push([x, 1]);
      // Else if this number is equal to what's currently at the top
      // of the min stack, then increment the count at the top by 1.
    } else if (x === this._last(this._minStack)[0]) {
      this._last(this._minStack)[1]++;
    }
  }

  pop() {
    // If the top of min stack is the same as the top of stack
    // then we need to decrement the count at the top by 1.
    if (this.top() === this._last(this._minStack)[0]) {
      this._last(this._minStack)[1]--;
    }
    // If the count at the top of min stack is now 0, then remove
    // that value as we're done with it.
    if (this._last(this._minStack)[1] == 0) {
      this._minStack.pop();
    }

    //pop from main stack
    this._stack.pop();
  }

  top() {
    return this._last(this._stack);
  }

  getMin() {
    return this._last(this._minStack)[0];
  }
}
