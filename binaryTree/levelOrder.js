/* 
102. Binary Tree Level Order Traversal
https://leetcode.com/problems/binary-tree-level-order-traversal/
Type: Medium

Given a binary tree, return the level order traversal of its nodes' values. 
(ie, from left to right, level by level).

For example:
Given binary tree [3,9,20,null,null,15,7]
    3
   / \
  9  20
    /  \
   15   7

Level Order traversal:   
[
  [3],
  [9,20],
  [15,7]
]

Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]

Input: root = [1]
Output: [[1]]

Input: root = []
Output: []

Constraint:
The number of nodes in the tree is in the range [0, 2000].
-1000 <= Node.val <= 1000

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
 * @return {number[][]}
 */
/*
Approach I: BFS (Level order traversal)
Runtime: 3 ms Beats 47.87%
Memory: 57.28 MB Beats 87.33%
*/
var levelOrder = function (root) {
  if (root == null) return [];
  const result = [];
  const Q = [];
  Q.push([root, 0]);
  while (Q.length) {
    const [node, level] = Q.shift();
    if (!result[level]) result[level] = [];
    result[level].push(node.val);
    if (node.left) Q.push([node.left, level + 1]);
    if (node.right) Q.push([node.right, level + 1]);
  }
  return result;
};
/*
Approach : BFS - Using null separator
Time Complexity: O(N)
Space Complexity: O(N)
Runtime: 84 ms, faster than 66.06% of JavaScript online submissions for Binary Tree Level Order Traversal.
Memory Usage: 40.3 MB, less than 36.50% of JavaScript online submissions for Binary Tree Level Order Traversal.
 */
var levelOrder = function (root) {
  if (root == null) return [];
  result = [];
  let level = 0;
  const queue = [];
  queue.push(root);
  queue.push(null);
  while (queue.length) {
    const node = queue.shift();
    if (node == null) {
      level++;
      if (queue.length) queue.push(null);
    } else {
      if (!result[level]) result[level] = [];
      result[level].push(node.val);
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return result;
};

/* 
DFS: Recursive

Runtime: 80 ms, faster than 85.22% of JavaScript online submissions for Binary Tree Level Order Traversal.
Memory Usage: 40.3 MB, less than 25.09% of JavaScript online submissions for Binary Tree Level Order Traversal.
*/
var levelOrder = function (root) {
  if (root == null) return [];
  const result = [];
  const helper = (node, level) => {
    if (node == null) return;
    if (!result[level]) result[level] = [];
    result[level].push(node.val);
    helper(node.left, level + 1);
    helper(node.right, level + 1);
  };
  helper(root, 0);
  return result;
};

