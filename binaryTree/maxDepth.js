/* 
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
Recursive Approach: Bottom-up
Time: O(N), where N is the number of nodes
Space: O(N) in worst case when tree is unbalanced, O(Log N) for balanced tree
Runtime: 124 ms, faster than 5.37% of JavaScript online submissions for Maximum Depth of Binary Tree.
Memory Usage: 41.5 MB, less than 56.15% of JavaScript online submissions for Maximum Depth of Binary Tree.
*/
var maxDepth = function (root) {
  if (root == null) return 0;
  let depth = 1 + Math.max(maxDepth(root.left), maxDepth(root.right));
  return depth;
};

/* 
Recursive Approach: top-down
Time: O(N), where N is the number of nodes
Space: O(N) in worst case when tree is unbalanced, O(Log N) for balanced tree

Runtime: 92 ms, faster than 42.83% of JavaScript online submissions for Maximum Depth of Binary Tree.
Memory Usage: 41.7 MB, less than 26.60% of JavaScript online submissions for Maximum Depth of Binary Tree.
*/
var maxDepth = function (root) {
  if (root == null) return 0;
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
Approach II: Iterative (level order traversal) 
Time Complexity: O(N)
Space Complexity: O(w), where w is width of the tree
Runtime: 112 ms, faster than 5.37% of JavaScript online submissions for Maximum Depth of Binary Tree.
Memory Usage: 42 MB, less than 15.58% of JavaScript online submissions for Maximum Depth of Binary Tree.
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
