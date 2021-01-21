/* 
Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.

push(x) -- Push element x onto stack.
pop() -- Removes the element on top of the stack.
top() -- Get the top element.
getMin() -- Retrieve the minimum element in the stack.

Example:
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

Constraint:
Methods pop, top and getMin operations will always be called on non-empty stacks.

*/
/**
 * initialize your data structure here.
 */
//Linked list implementation
var MinStack = function() {
   this.N = 0;
   this.first = null; 
   this.min = Number.MAX_VALUE;
};

/** 
 * @param {number} x
 * @return {void}
 */
MinStack.prototype.push = function(x) {
  if (x < this.min) {
      this.min = x;
  }
  const oldNode = this.first;
  this.first = new Node(x);
  this.first.next = oldNode;
  this.N++;
};

/**
 * @return {void}
 */
MinStack.prototype.pop = function() {
  if (this.N == 0) return null;
  this.first = this.first.next;
  let curr = this.first;
  this.min = Number.MAX_VALUE;
  while(curr != null){
      if (curr.item < this.min) this.min = curr.item;
      curr = curr.next; 
  }
  this.N--;
};

/**
 * @return {number}
 */
MinStack.prototype.top = function() {
    if (this.N == 0) return null;
    return this.first.item;
};

/**
 * @return {number}
 */
/*
Approaches for min:
 i) Strore in a variable and update it every time a value is added removed from stack
    Time complexity during pop: O(N)
    Space complexity: O(1)
 ii) creating sorted array copy has issue of additional time complexity of O(N) for delete in sorted array.
 iii) Creating min Heap is one option but that will make this Data structure more complicated.
 iv) 
 */
MinStack.prototype.getMin = function() {
    return this.min;
};


MinStack.prototype.Node = function(val) {
    this.item = val;
    this.next = null;
};

// function Node(item) {
//    this.item = item;
//    this.next = null;
// } 