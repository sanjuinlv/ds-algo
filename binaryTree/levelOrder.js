/* 
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
BFS: 
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
  result = [];
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

// 2nd try (10-Mar-2021)
/* 
Iterative
Runtime: 76 ms, faster than 95.96% of JavaScript online submissions for Binary Tree Level Order Traversal.
Memory Usage: 40 MB, less than 74.38% of JavaScript online submissions for Binary Tree Level Order Traversal.
*/
var levelOrder = function (root) {
  if (root == null) return [];
  const result = [];
  let temp = [];
  const Q = [];
  Q.push(root);
  Q.push(null); // level identifier
  while (Q.length != 0) {
    root = Q.shift();
    if (root == null) {
      result.push([...temp]); // copy of temp
      temp = [];
      if (Q.length > 0) Q.push(null);
    } else {
      temp.push(root.val);
      if (root.left) Q.push(root.left);
      if (root.right) Q.push(root.right);
    }
  }
  return result;
};

/* 
Recursive
Runtime: 88 ms, faster than 43.07% of JavaScript online submissions for Binary Tree Level Order Traversal.
Memory Usage: 39.9 MB, less than 94.14% of JavaScript online submissions for Binary Tree Level Order Traversal.
*/
var levelOrder = function (root) {
  if (root == null) return [];
  let result = [];
  const helper = (node, level) => {
    if (node === null) return;
    if (!result[level]) result[level] = [];
    result[level].push(node.val);
    helper(node.left, level + 1);
    helper(node.right, level + 1);
  };
  helper(root, 0);
  return result;
};

//From Nishant
var levelOrder = function (root) {
  var out = [[root.val]];
  var queue = [root];
  while (queue.length > 0) {
    var tmpQ = [];
    while (queue.length > 0) {
      //Use the right direction
      var node = queue.shift();
      if (node) console.log(`node val: ${node.val}`);
      if (node.left) tmpQ.push(node.left);
      if (node.right) tmpQ.push(node.right);
    }
    //This check is important, otherwise it will add blank array
    if (tmpQ.length > 0) {
      var valArray = tmpQ.map((nod) => nod.val);
      out.push(valArray);
      queue = tmpQ;
    }
  }
  return out;
};
