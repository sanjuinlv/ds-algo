/*
https://leetcode.com/problems/min-stack
Type: Medium
Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

Implement the MinStack class:

MinStack() initializes the stack object.
void push(int val) pushes the element val onto the stack.
void pop() removes the element on the top of the stack.
int top() gets the top element of the stack.
int getMin() retrieves the minimum element in the stack.
You must implement a solution with O(1) time complexity for each function.

Example 1:

Input
["MinStack","push","push","push","getMin","pop","top","getMin"]
[[],[-2],[0],[-3],[],[],[],[]]

Output
[null,null,null,null,-3,null,0,-2]

Explanation
MinStack minStack = new MinStack();
minStack.push(-2);
minStack.push(0);
minStack.push(-3);
minStack.getMin(); // return -3
minStack.pop();
minStack.top();    // return 0
minStack.getMin(); // return -2
 

Constraints:

-2^31 <= val <= 2^31 - 1
Methods pop, top and getMin operations will always be called on non-empty stacks.
At most 3 * 10^4 calls will be made to push, pop, top, and getMin.

*/
/*
Approach I: Stack of Value/Min pair
Min Stack implementation using the array
Time Complexity: O(1) for all operations (push, pop, top, getMin)
Space: O(N)

Runtime: 76 ms, faster than 94.66% of JavaScript online submissions for Min Stack.
Memory Usage: 59.43 MB, less than 37.63% of JavaScript online submissions for Min Stack.
*/
class MinStack {
  constructor() {
    this.arr = [];
  }
  /**
   * @param {number} val
   * @return {void}
   */
  push(val) {
    if (this.arr.length == 0) {
      this.arr.push([val, val]);
    } else {
      const currentMin = this._last()[1];
      this.arr.push([val, Math.min(val, currentMin)]);
    }
  }

  /**
   * @return {void}
   */
  pop() {
    const top = this.arr.pop();
    return top[0];
  }

  /**
   * @return {number}
   */
  top() {
    return this._last()[0];
  }

  /**
   * @return {number}
   */
  getMin() {
    return this._last()[1];
  }

  _last() {
    return this.arr[this.arr.length - 1];
  }
}

/*
Approach II: using Two stacks
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

  push(x) {
    this._stack.push(x);
    if (this._minStack.length === 0 || x <= this._last(this._minStack)) {
      this._minStack.push(x);
    }
  }

  pop() {
    if (this.top() === this.getMin()) {
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

  //internal method
  _last(arr) {
    return arr[arr.length - 1];
  }
}

/*
Approach III: Improved Two Stacks using count

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


// Approach IV: Linked List
/* 
Time:  O(1) for all operations (push, pop, top, getMin)
Space: O(N)

Runtime: 92 ms Beats 45.97%
Memory: 58.66 MB Beats 75.64%
*/
class MinStack {
  
  static Node = class {
    constructor(value, min, next = null) {
      this.value = value;
      this.min = min;
      this.next = next;
    }
  };

  constructor() {
    this.head = null;    
  }
  /**
   * @param {number} val
   * @return {void}
   */
  push(val) {
    if (this.head == null) {
        this.head = new MinStack.Node(val, val);
    } else {
        this.head = new MinStack.Node(val, Math.min(val, this.head.min), this.head);
    }
  }

  /**
   * @return {void}
   */
  pop() {
    this.head = this.head.next;
  }

  /**
   * @return {number}
   */
  top() {
    return this.head.value;
  }

  /**
   * @return {number}
   */
  getMin() {
    return this.head.min;
  }
}
