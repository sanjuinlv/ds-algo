
/*
https://leetcode.com/problems/design-circular-queue/description/
Type: Medium

Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO (First In First Out) principle and the last position is connected back to the first position to make a circle. It is also called "Ring Buffer".

One of the benefits of the circular queue is that we can make use of the spaces in front of the queue. In a normal queue, once the queue becomes full, we cannot insert the next element even if there is a space in front of the queue. But using the circular queue, we can use the space to store new values.

Implementation the MyCircularQueue class:

MyCircularQueue(k) Initializes the object with the size of the queue to be k.
int Front() Gets the front item from the queue. If the queue is empty, return -1.
int Rear() Gets the last item from the queue. If the queue is empty, return -1.
boolean enQueue(int value) Inserts an element into the circular queue. Return true if the operation is successful.
boolean deQueue() Deletes an element from the circular queue. Return true if the operation is successful.
boolean isEmpty() Checks whether the circular queue is empty or not.
boolean isFull() Checks whether the circular queue is full or not.
You must solve the problem without using the built-in queue data structure in your programming language. 

Input
["MyCircularQueue", "enQueue", "enQueue", "enQueue", "enQueue", "Rear", "isFull", "deQueue", "enQueue", "Rear"]
[[3], [1], [2], [3], [4], [], [], [], [4], []]
Output
[null, true, true, true, false, 3, true, true, true, 4]

Explanation
MyCircularQueue myCircularQueue = new MyCircularQueue(3);
myCircularQueue.enQueue(1); // return True
myCircularQueue.enQueue(2); // return True
myCircularQueue.enQueue(3); // return True
myCircularQueue.enQueue(4); // return False
myCircularQueue.Rear();     // return 3
myCircularQueue.isFull();   // return True
myCircularQueue.deQueue();  // return True
myCircularQueue.enQueue(4); // return True
myCircularQueue.Rear();     // return 4

Constraint:
1 <= k <= 1000
0 <= value <= 1000
At most 3000 calls will be made to enQueue, deQueue, Front, Rear, isEmpty, and isFull.

*/
/**
 * @param {number} k
 */
class MyCircularQueue {
  constructor(k) {
    this.head = 0;
    this.tail = -1;
    this.N = 0;
    this.array = new Array(k);
    this.capacity = k;
  }

  /**
   * @param {number} value
   * @return {boolean}
   */
  enQueue(value) {
    //return false if queue is already full
    if (this.isFull()) return false;
    this.N++;
    this.tail++;
    this.tail = this.tail % this.capacity;
    this.array[this.tail] = value;
    return true;
  }

  /**
   * @return {boolean}
   */
  deQueue() {
    //return false if queue is empty
    if (this.isEmpty()) return false;
    this.N--;
    this.head++;
    this.head = this.head % this.capacity;
    return true;
  }

  /**
   * @return {number}
   */
  Front() {
    if (this.N === 0) return -1;
    return this.array[this.head];
  }

  /**
   * @return {number}
   */
  Rear() {
    if (this.N === 0) return -1;
    return this.array[this.tail];
  }

  /**
   * @return {boolean}
   */
  isEmpty() {
    return this.N === 0;
  }

  /**
   * @return {boolean}
   */
  isFull() {
    return this.N === this.capacity;
  }
}

/*  
Approach II : Without using tail variable
Time: O(1) - All of the methods in our circular data structure is of constant time complexity
Space: O(N)
Runtime: 218 ms, faster than 16.58% of JavaScript online submissions for Design Circular Queue.
Memory Usage: 50.4 MB, less than 19.43% of JavaScript online submissions for Design Circular Queue
*/
/**
 * @param {number} k
 */
var MyCircularQueue = function (k) {
  this.head = 0;
  this.N = 0;
  this.capacity = k;
  this.arr = new Array(k);
};

/**
 * @param {number} value
 * @return {boolean}
 */
MyCircularQueue.prototype.enQueue = function (value) {
  //queue is full
  if (this.isFull()) return false;
  this.arr[(this.head + this.N) % this.capacity] = value;
  this.N++;
  return true;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function () {
  //Queue is empty
  if (this.isEmpty()) return false;
  this.head = (this.head + 1) % this.capacity;
  this.N--;
  return true;
};

/**a
 * @return {number}
 */
MyCircularQueue.prototype.Front = function () {
  if (this.N === 0) return -1;
  return this.arr[this.head];
};

/**
 * @return {number}
 */
MyCircularQueue.prototype.Rear = function () {
  if (this.N === 0) return -1;
  return this.arr[(this.head + this.N - 1) % this.capacity];
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isEmpty = function () {
  return this.N === 0;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.isFull = function () {
  return this.N === this.capacity;
};

/* 
Approach II: Singly Linked List
Time: O(1)
Space: O(N)

Runtime: 74 ms, faster than 99.67% of JavaScript online submissions for Design Circular Queue.
Memory Usage: 59.3 MB, less than 32.79% of JavaScript online submissions for Design Circular Queue.
*/
class MyCircularQueue {
    
  static Node = class {
    constructor(value, next = null) {
      this.value = value;
      this.next = next;
    }
  };

  constructor(k) {
    this.capacity = k;
    this.N = 0;
    this.head = null;
    this.tail = null;
  }

  /**
   * @param {number} value
   * @return {boolean}
   */
  enQueue(value) {
    // check if queue is full
    if (this.isFull()) return false;
    const newNode = new MyCircularQueue.Node(value);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      // add node at tail
      this.tail.next = newNode;
      // tail is now new node
      this.tail = newNode;
    }
    this.N++;
    return true;
  }

  /**
   * @return {boolean}
   */
  deQueue() {
    if (this.isEmpty()) return false;
    //move head to next node. Node without ref will get garbage collected
    this.head = this.head.next;
    this.N--;
    return true;
  }

  /**
   * @return {number}
   */
  Front() {
    if (this.N === 0) return -1;
    return this.head.value;
  }

  /**
   * @return {number}
   */
  Rear() {
    if (this.N === 0) return -1;
    return this.tail.value;
  }

  /**
   * @return {boolean}
   */
  isEmpty() {
    return this.N === 0;
  }

  /**
   * @return {boolean}
   */
  isFull() {
    return this.N === this.capacity;
  }
}

/**
 * Your MyCircularQueue object will be instantiated and called as such:
 * var obj = new MyCircularQueue(k)
 * var param_1 = obj.enQueue(value)
 * var param_2 = obj.deQueue()
 * var param_3 = obj.Front()
 * var param_4 = obj.Rear()
 * var param_5 = obj.isEmpty()
 * var param_6 = obj.isFull()
 */
