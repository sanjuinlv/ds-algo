/* 
Given the root of a binary tree, return the preorder traversal of its nodes' values.

Example 1:
Input: root = [1,null,2,3]
Output: [1,2,3]

Example 2:
Input: root = []
Output: []

Example 3:
Input: root = [1]
Output: [1]
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
Approach: Recursive
Time: O(N), where N is number of nodes
Space: O(N), recusrive stack
Runtime: 64 ms, faster than 99.62% of JavaScript online submissions for Binary Tree Preorder Traversal.
Memory Usage: 38.7 MB, less than 46.54% of JavaScript online submissions for Binary Tree Preorder Traversal.
 */
var preorderTraversal = function (root) {
  const result = [];
  const preorder = (node) => {
    if (node == null) return;
    result.push(node.val);
    preorder(node.left);
    preorder(node.right);
  };
  preorder(root);
  return result;
};

/*
Approach: Iterative (DFS)
Time: O(N), where N is number of nodes
Space: O(N), stack size
 */
var preorderTraversal = function (root) {
  const result = [];
  const stack = [];
  while (true) {
    while (root != null) {
      result.push(root.val);
      stack.push(root);
      root = root.left;
    }
    if (stack.length == 0) break;
    root = stack.pop();
    root = root.right;
  }
  return result;
};
//Cleaner Iterative
var preorderTraversal = function (root) {
  const result = [];
  if (root == null) return result;
  const stack = [];
  stack.push(root);
  while (stack.length != 0) {
    root = stack.pop();
    result.push(root.val);
    if (root.right) stack.push(root.right);
    if (root.left) stack.push(root.left);
  }
  return result;
};

//Using Queue (BFS)
var preorderTraversal = function (root) {
  const result = [];
  if (root == null) return result;
  const queue = [];
  queue.push(root);
  while (queue.length != 0) {
    root = queue.shift();
    result.push(root.val);
    if (root.left) queue.push(root.left);
    if (root.right) queue.push(root.right);
  }
  return result;
};
