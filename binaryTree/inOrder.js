/* 
Given the root of a binary tree, return the inorder traversal of its nodes' values.

Type: Medium

Examples:

Input: root = [1,null,2,3]
Output: [1,3,2]

Input: root = []
Output: []

Input: root = [1]
Output: [1]

Input: root = [1,2]
Output: [2,1]

Input: root = [1,null,2]
Output: [1,2]
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
 * @return {number[]}
 */
/* 
Approach I: Recursive
Runtime: 76 ms, faster than 80.78% of JavaScript online submissions for Binary Tree Inorder Traversal.
Memory Usage: 38.7 MB, less than 66.10% of JavaScript online submissions for Binary Tree Inorder Traversal.
*/
var inorderTraversal = function (root) {
  const result = [];
  const inOrder = (node) => {
    if (node == null) return;
    inOrder(node.left);
    result.push(node.val);
    inOrder(node.right);
  };
  inOrder(root);
  return result;
};

/* 
Approach II: Iterative
Runtime: 80 ms, faster than 58.67% of JavaScript online submissions for Binary Tree Inorder Traversal.
Memory Usage: 38.7 MB, less than 43.28% of JavaScript online submissions for Binary Tree Inorder Traversal.
*/
var inorderTraversal = function (root) {
  const result = [];
  const stack = [];
  while (true) {
    while (root != null) {
      stack.push(root);
      root = root.left;
    }
    if (stack.length == 0) break;
    root = stack.pop();
    result.push(root.val);
    root = root.right;
  }
  return result;
};

//Need fix
var inorderTraversal = function (root) {
  const result = [];
  const stack = [];
  stack.push();
  while (stack.length != 0) {
    if (root.left) {
        stack.push(root.left);
        continue;
    }
    root = stack.pop();
    result.push(root.val);
    if (root.right) stack.push(root.right);
  }
  return result;
};
