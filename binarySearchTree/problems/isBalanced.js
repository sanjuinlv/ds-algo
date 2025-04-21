/* 
110. Balanced Binary Tree
https://leetcode.com/problems/balanced-binary-tree/
Type: Easy

Given a binary tree, determine if it is height-balanced.
For this problem, a height-balanced binary tree is defined as:
a binary tree in which the left and right subtrees of every node differ in height by no more than 1.

Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: true

Example 2:
Input: root = [1,2,2,3,3,null,null,4,4]
Output: false

Example 3:
Input: root = []
Output: true

The number of nodes in the tree is in the range [0, 5000].
-104 <= Node.val <= 104
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
 * @return {boolean}
 */

/*
Cleaner Bottom up
Time: O(N)
Space: O(N)

Runtime: 0 ms Beats 100.00%
Memory: 60.45 MB Beats 46.29%
 */
var isBalanced = function (root) {
  const helper = (node) => {
    if (node == null) return 0;
    const leftHeight = helper(node.left);
    if (leftHeight == -1) return -1;
    const rightHeight = helper(node.left);
    if (rightHeight == -1) return -1;
    if (Math.abs(leftHeight - rightHeight) > 1) return -1;
    return 1 + Math.max(leftHeight, rightHeight);
  };
  return helper(root) !== -1;
};

/* 
Approach: Bottom Up II 
Time: O(N),  For every subtree, we compute its height in constant time as well as compare 
the height of its children
Space: O(N), the recursion stack

Runtime: 74 ms Beats 14.41%
Memory Usage: 54.43 MB Beats 39.97%
*/
var isBalanced = function (root) {
  if (root == null) return true;
  let result = true;
  const findDepth = (node) => {
    if (node === null) return 0;
    const leftDepth = findDepth(node.left);
    //we already found invalid BST, so stop further processing
    if (result === false) return;
    const rightDepth = findDepth(node.right);
    if (Math.abs(leftDepth - rightDepth) > 1) result = false;
    return 1 + Math.max(leftDepth, rightDepth);
  };
  findDepth(root);
  return result;
};

/* 
Approach II: Top Down Recursion
Time: O(N LogN)
For a node p at depth d, height(p) will be called d times.
Space: O(N)
In this case we make duplicate calls to calculate height from each node which
is not the case with bottom up approach

Runtime: 1 ms Beats 89.50%
Memory Usage: 58.57 MB Beats 94.56%
*/
var isBalanced = function (root) {
  if (root == null) return true;
  const depth = (node) => {
    if (node === null) return 0;
    return 1 + Math.max(depth(node.left), depth(node.right));
  };
  const leftDepth = depth(root.left);
  const rightDepth = depth(root.right);
  return (
    Math.abs(leftDepth - rightDepth) <= 1 &&
    isBalanced(root.left) &&
    isBalanced(root.right)
  );
};
