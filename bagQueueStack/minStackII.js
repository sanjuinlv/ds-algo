/*
Min Stack implemenation using two stack
Time Complexity: O(1) for all operations (push, pop, top, getMin)
Space: O(N)

Runtime: 112 ms, faster than 95.67% of JavaScript online submissions for Min Stack.
Memory Usage: 45.2 MB, less than 88.94% of JavaScript online submissions for Min Stack.
*/
class MinStack {
    constructor() {
      this._stack = [];
      this._minStack = [];
    }
  
    //internal method
    _last(arr){
        return arr[arr.length - 1]
    }

    push(x) {
      this._stack.push(x);    
      if (this._minStack.length === 0 || x <= this._last(this._minStack)){
        this._minStack.push(x);
      }
    }
  
    pop() {
      if (this.top(this._stack) === this.getMin()) {
          this._minStack.pop();
      }
      this._stack.pop();  
    }
  
    top() {
        return this._last(this._stack);
    }
  
    getMin() {
      return this._last(this._minStack);
    }
  }
  