/* 
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
//Fails for [1,2,2,3,null,null,3,4,null,null,4]
var isBalanced = function (root) {
  if (root == null) return true;
  const findDepth = (node) => {
    if (node === null) return 0;
    return 1 + Math.max(findDepth(node.left), findDepth(node.right));
  };
  const leftDepth = findDepth(root.left);
  const rightDepth = findDepth(root.right);
  if (Math.abs(leftDepth - rightDepth) > 1) return false;
  return true;
};

/* 
Approach: Bottom Up Recursive 
Time: O(N),  For every subtree, we compute its height in constant time as well as compare 
the height of its children
Space: O(N), the recursion stack
Runtime: 123 ms, faster than 23.42% of JavaScript online submissions for Balanced Binary Tree.
Memory Usage: 46.7 MB, less than 94.59% of JavaScript online submissions for Balanced Binary Tree.
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
Runtime: 139 ms, faster than 12.88% of JavaScript online submissions for Balanced Binary Tree.
Memory Usage: 47.9 MB, less than 25.30% of JavaScript online submissions for Balanced Binary Tree.
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
