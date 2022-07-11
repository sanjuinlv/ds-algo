/**
 * @param {number} k
 * @param {number[]} nums
 */

/* 
Approach: Using BST
Runtime: 815 ms, faster than 43.34% of JavaScript online submissions for Kth Largest Element in a Stream.
Memory Usage: 51 MB, less than 61.39% of JavaScript online submissions for Kth Largest Element in a Stream.
*/
class Node {
  constructor(value, count = 0) {
    this.val = value;
    this.count = count;
    this.left = null;
    this.right = null;
  }
}

var KthLargest = function (k, nums) {
  this.root = null;
  this.k = k;
  for (let num of nums) {
    this.root = this._insert(this.root, num);
  }
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  //add to the root
  this.root = this._insert(this.root, val);
  //find rank
  return this._searchKth(this.root, this.k);
};

KthLargest.prototype._insert = function (node, val) {
  if (node === null) return new Node(val, 1);
  if (val < node.val) node.left = this._insert(node.left, val);
  else node.right = this._insert(node.right, val);
  node.count = 1 + this._size(node.left) + this._size(node.right);
  return node;
};

KthLargest.prototype._searchKth = function (node, k) {
  // m = the size of right subtree
  const m = node.right ? this._size(node.right) : 0;
  // root is the m+1 largest node in the BST
  if (k == m + 1) {
    return node.val;
  }
  if (k <= m) {
    return this._searchKth(node.right, k);
  } else {
    return this._searchKth(node.left, k - m - 1);
  }
};

KthLargest.prototype._size = function (node) {
  if (node === null) return 0;
  return node.count;
};
/**
 * Your KthLargest object will be instantiated and called as such:
 * var obj = new KthLargest(k, nums)
 * var param_1 = obj.add(val)
 */

/* 
Approach: Using Heap (MinPriority Queue)
Time: O(N LogK + M * LogK), NLogK for creating heap and M * logK for adding M elements to heap
Space: O(K) the size of heap
Runtime: 221 ms, faster than 60.00% of JavaScript online submissions for Kth Largest Element in a Stream.
Memory Usage: 52.2 MB, less than 41.64% of JavaScript online submissions for Kth Largest Element in a Stream.
*/
var KthLargest = function (k, nums) {
  this.k = k;
  this.minPQ = new MinPriorityQueue();
  for (let num of nums) {
    this.add(num);
  }
};
/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  if (this.minPQ.size() < this.k) {
    this.minPQ.enqueue(val);
  } else if (val > this.minPQ.front().element) {
    this.minPQ.dequeue();
    this.minPQ.enqueue(val);
  }
  return this.minPQ.front().element;
};

/* 
Approach: Using Heap
Runtime: 2438 ms, faster than 32.36% of JavaScript online submissions for Kth Largest Element in a Stream.
Memory Usage: 59.9 MB, less than 30.13% of JavaScript online submissions for Kth Largest Element in a Stream.
*/
var KthLargest = function (k, nums) {
  this.k = k;
  this.heap = [];
  for (let num of nums) {
    this.heap.push(num);
  }
  //sort the data in reverse order to create Min heap
  this.heap.sort((a, b) => b - a);
  while (this.heap.length > k) {
    this.heap.pop();
  }
};

/**
 * @param {number} val
 * @return {number}
 */
KthLargest.prototype.add = function (val) {
  this.heap.push(val);
  this.heap.sort((a, b) => b - a);
  while (this.heap.length > this.k) this.heap.pop();
  //return top of the heap (array)
  return this.heap[this.heap.length - 1];
};
