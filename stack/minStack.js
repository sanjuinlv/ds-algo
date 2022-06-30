/*
Min Stack implemenation using the array
Time Complexity: O(1) for all operations (push, pop, top, getMin)
Space: O(N)

Runtime: 148 ms, faster than 37.22% of JavaScript online submissions for Min Stack.
Memory Usage: 47.8 MB, less than 15.73% of JavaScript online submissions for Min Stack.
*/
class MinStack {
  constructor() {
    this._stack = [];
  }

  push(x) {
    if (this._stack.length == 0) {
      this._stack.push([x, x]);
    } else {
      const currentMin = this._last()[1];
      this._stack.push([x, Math.min(currentMin, x)]);
    }
  }

  pop() {
    this._stack.pop();
  }

  top() {
    return this._last()[0];
  }

  getMin() {
    return this._last()[1];
  }

  //internal method
  _last() {
    return this._stack[this._stack.length - 1];
  }
}
