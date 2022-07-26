/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 */
/* 
Approach 1: Controlled Recursion Using Stack
Time: O(1): next() and hashNext() runs in average O(1) time
Space: O(h) height of the tree

Runtime: 197 ms, faster than 33.09% of JavaScript online submissions for Binary Search Tree Iterator.
Memory Usage: 54.2 MB, less than 98.46% of JavaScript online submissions for Binary Search Tree Iterator.
*/
var BSTIterator = function (root) {
  this.root = root;
  this.stack = [];
  this._leftMostInOrder(root);
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  if (!this.hasNext()) return null;
  let node = this.stack.pop();
  if (node.right !== null) {
    this._leftMostInOrder(node.right);
  }
  return node.val;
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return this.stack.length > 0;
};

BSTIterator.prototype._leftMostInOrder = function (node) {
  while (node != null) {
    this.stack.push(node);
    node = node.left;
  }
};

/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */

/* 
Approach 1: Flattening the BST

Time: O(N): is the time taken by the constructor for the iterator.
  -  next() would take O(1)
  -  hasNext() would take O(1)
Space: O(h) height of the tree

Runtime: 183 ms, faster than 44.79% of JavaScript online submissions for Binary Search Tree Iterator.
Memory Usage: 54.4 MB, less than 97.23% of JavaScript online submissions for Binary Search Tree Iterator.
*/
var BSTIterator = function (root) {
  this.index = -1;
  this.sortedNodes = [];
  this._inOrder(root);
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  return this.sortedNodes[++this.index];
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return this.index + 1 < this.sortedNodes.length;
};

BSTIterator.prototype._inOrder = function (node) {
  if (node === null) return;
  this._inOrder(node.left);
  this.sortedNodes.push(node.val);
  this._inOrder(node.right);
};
/**
 * Your BSTIterator object will be instantiated and called as such:
 * var obj = new BSTIterator(root)
 * var param_1 = obj.next()
 * var param_2 = obj.hasNext()
 */
