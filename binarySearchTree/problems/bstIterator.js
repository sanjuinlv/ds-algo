/* 
173. Binary Search Tree Iterator
https://leetcode.com/problems/binary-search-tree-iterator/
Type: Medium

Implement the BSTIterator class that represents an iterator over the in-order traversal of a binary search tree (BST):

BSTIterator(TreeNode root) Initializes an object of the BSTIterator class. The root of the BST is given as part of the constructor. The pointer should be initialized to a non-existent number smaller than any element in the BST.
boolean hasNext() Returns true if there exists a number in the traversal to the right of the pointer, otherwise returns false.
int next() Moves the pointer to the right, then returns the number at the pointer.
Notice that by initializing the pointer to a non-existent smallest number, the first call to next() will return the smallest element in the BST.

You may assume that next() calls will always be valid. That is, there will be at least a next number in the in-order traversal when next() is called.

Input
["BSTIterator", "next", "next", "hasNext", "next", "hasNext", "next", "hasNext", "next", "hasNext"]
[[[7, 3, 15, null, null, 9, 20]], [], [], [], [], [], [], [], [], []]
Output
[null, 3, 7, true, 9, true, 15, true, 20, false]

Explanation
BSTIterator bSTIterator = new BSTIterator([7, 3, 15, null, null, 9, 20]);
bSTIterator.next();    // return 3
bSTIterator.next();    // return 7
bSTIterator.hasNext(); // return True
bSTIterator.next();    // return 9
bSTIterator.hasNext(); // return True
bSTIterator.next();    // return 15
bSTIterator.hasNext(); // return True
bSTIterator.next();    // return 20
bSTIterator.hasNext(); // return False

Constraints:
 - The number of nodes in the tree is in the range [1, 105].
 - 0 <= Node.val <= 106
 - At most 105 calls will be made to hasNext, and next.

Follow up:
Could you implement next() and hasNext() to run in average O(1) time and use O(h) memory, where h is the height of the tree?
*/
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

Runtime: 101 ms, faster than 91.20% of JavaScript online submissions for Binary Search Tree Iterator.
Memory Usage: 62.09 MB, less than 95.46% of JavaScript online submissions for Binary Search Tree Iterator.
*/
var BSTIterator = function (root) {
  this.stack = [];
  this._leftMostInorder(root);
};

/**
 * @return {number}
 */
BSTIterator.prototype.next = function () {
  const node = this.stack.pop();
  this._leftMostInorder(node.right);
  return node.val;
};

/**
 * @return {boolean}
 */
BSTIterator.prototype.hasNext = function () {
  return this.stack.length > 0;
};

/**
 * Moves the node to left most node
 * @param node
 */
BSTIterator.prototype._leftMostInorder = function (node) {
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
