/* 
104. Maximum Depth of Binary Tree
https://leetcode.com/problems/maximum-depth-of-binary-tree/
Type: Easy

Given the root of a binary tree, return its maximum depth.

A binary tree's maximum depth is the number of nodes along the longest path from the
root node down to the farthest leaf node.

     3
    / \
   9  20
      / \  
     15  7

Example 1: 
Input: root = [3,9,20,null,null,15,7]
Output: 3

Example 2: 
Input: root = [1,null,2]
Output: 2

Example 3: 
Input: root = []
Output: 0

Example 4: 
Input: root = [0]
Output: 1
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
 * @return {number}
 */
/* 
Approach I : Bottom-up
Time: O(N), where N is the number of nodes
Space: O(N) in worst case when tree is unbalanced, O(Log N) for balanced tree

Runtime: 59 ms Beats 62.54%
Memory Usage: 52.20 MB Beats 27.71%
*/
var maxDepth = function (root) {
  if (root == null) return 0;
  return 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
};

/* 
Approach II: top-down
Time: O(N), where N is the number of nodes
Space: O(N) in worst case when tree is unbalanced, O(Log N) for balanced tree

Runtime: 54 ms Beats 85.08%
Memory Usage: 52.02 MB Beats 34.07%
*/
var maxDepth = function (root) {
  let answer = 0;
  const helper = (node, depth) => {
    if (node == null) return;
    //reached leaf node
    if (node.left == null && node.right == null) {
      answer = Math.max(answer, depth);
    }
    helper(node.left, depth + 1);
    helper(node.right, depth + 1);
  };
  helper(root, 1);
  return answer;
};

/* 
Approach III: Iterative
Time Complexity: O(N)
Space Complexity: O(w), where w is width of the tree

Runtime: 55 ms Beats 81.52%
Memory: 54.77 MB Beats 5.22%
*/
var maxDepth = function (root) {
  let answer = 0;
  let stack = [];
  stack.push([root, 1]);
  while (stack.length) {
    const [node, depth] = stack.pop();
    if (node == null) continue;
    if (node.left == null && node.right == null) {
      answer = Math.max(answer, depth);
    } else {
      stack.push([node.left, 1 + depth]);
      stack.push([node.right, 1 + depth]);
    }
  }
  return answer;
};

/* 
Approach III: Iterative (level order traversal) 
Time Complexity: O(N)
Space Complexity: O(w), where w is width of the tree

Runtime: 58 ms Beats 67.23%
Memory Usage: 52.04 MB Beats 34.07%
*/
var maxDepth = function (root) {
  if (root == null) return 0;
  const queue = [];
  queue.push(root);
  queue.push(null);
  let depth = 0;
  while (queue.length) {
    const node = queue.shift();
    //end of the level
    if (node == null) {
      depth++;
      //mark end of next level
      if (queue.length) queue.push(null);
    } else {
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return depth;
};
