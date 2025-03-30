/* 
703. Kth Largest Element in a Stream
https://leetcode.com/problems/kth-largest-element-in-a-stream/
Type: Easy

You are part of a university admissions office and need to keep track of the kth highest test score from applicants in real-time. This helps to determine cut-off marks for interviews and admissions dynamically as new applicants submit their scores.

You are tasked to implement a class which, for a given integer k, maintains a stream of test scores and continuously returns the kth highest test score after a new score has been submitted. More specifically, we are looking for the kth highest score in the sorted list of all scores.

Implement the KthLargest class:

KthLargest(int k, int[] nums) Initializes the object with the integer k and the stream of test scores nums.
int add(int val) Adds a new test score val to the stream and returns the element representing the kth largest element in the pool of test scores so far.
 

Example 1:
Input:
["KthLargest", "add", "add", "add", "add", "add"]
[[3, [4, 5, 8, 2]], [3], [5], [10], [9], [4]]
Output: [null, 4, 5, 5, 8, 8]
Explanation:
KthLargest kthLargest = new KthLargest(3, [4, 5, 8, 2]);
kthLargest.add(3); // return 4
kthLargest.add(5); // return 5
kthLargest.add(10); // return 5
kthLargest.add(9); // return 8
kthLargest.add(4); // return 8

Example 2:
Input:
["KthLargest", "add", "add", "add", "add"]
[[4, [7, 7, 7, 7, 8, 3]], [2], [10], [9], [9]]
Output: [null, 7, 7, 7, 8]
Explanation:
KthLargest kthLargest = new KthLargest(4, [7, 7, 7, 7, 8, 3]);
kthLargest.add(2); // return 7
kthLargest.add(10); // return 7
kthLargest.add(9); // return 7
kthLargest.add(9); // return 8
 

Constraints:

 - 0 <= nums.length <= 10^4
 - 1 <= k <= nums.length + 1
 - -10^4 <= nums[i] <= 10^4
 - -10^4 <= val <= 10^4
 - At most 10^4 calls will be made to add.
*/
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

Runtime: 168 ms, faster than 41.17% of JavaScript online submissions for Kth Largest Element in a Stream.
Memory Usage: 63.23 MB, less than 23.37% of JavaScript online submissions for Kth Largest Element in a Stream.
*/
var KthLargest = function (k, nums) {
  this.k = k;
  this.minPQ = new MinPriorityQueue();
  for (const num of nums) this.add(num);
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
Approach: Using Array as heap
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
