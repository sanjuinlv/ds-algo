/**
 * @param {number} k
 */
var MyCircularQueue = function (k) {
  this.head = 0;
  this.tail = -1;
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
  this.tail++;
  this.tail = this.tail % this.capacity;
  this.arr[this.tail] = value;
  this.N++;
  return true;
};

/**
 * @return {boolean}
 */
MyCircularQueue.prototype.deQueue = function () {
  //Queue is empty
  if (this.isEmpty()) return false;
  this.head++;
  this.head = this.head % this.capacity;
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
  return this.arr[this.tail];
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

//Without using tail variable
/*  
Approach I : Using Array
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

Runtime: 218 ms, faster than 16.58% of JavaScript online submissions for Design Circular Queue.
Memory Usage: 49.3 MB, less than 81.35% of JavaScript online submissions for Design Circular Queue.
*/
class Node {
  constructor(value, next = null) {
    this.value = value;
    this.next = next;
  }
}

class MyCircularQueue {
  constructor(k) {
    this.capacity = k;
    this.head = null;
    this.tail = null;
    this.N = 0;
  }

  enQueue(value) {
    if (this.isFull()) return false;
    const newNode = new Node(value);
    if (this.isEmpty()) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = this.tail.next;
    }
    this.N++;
    return true;
  }

  deQueue() {
    //Queue is empty
    if (this.isEmpty()) return false;
    //assuming that the node without reference will be garbage collected
    this.head = this.head.next;
    this.N--;
    return true;
  }

  Front() {
    if (this.N === 0) return -1;
    return this.head.value;
  }

  Rear() {
    if (this.N === 0) return -1;
    return this.tail.value;
  }

  isEmpty() {
    return this.N === 0;
  }

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
