/*
Given an n-ary tree, return the level order traversal of its nodes' values.

Nary-Tree input serialization is represented in their level order traversal, each group
of children is separated by the null value (See examples).

Example 1:
            1
         /  |  \
        3   2   4 
       / \
      5   6
Input: root = [1,null,3,2,4,null,5,6]
Output: [[1],[3,2,4],[5,6]]
 
Example 2:
              1
           /|  \  \
         /  |   \    \
        2   3    4    5
           / \   |   / \
          6   7  8  9  10
              |  |  |
              11 12 13
              |
              14
              
Input: root = [1,null,2,3,4,5,null,null,6,7,null,8,null,9,10,null,null,11,null,12,null,13,null,null,14]
Output: [[1],[2,3,4,5],[6,7,8,9,10],[11,12,13],[14]]

 */
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[][]}
 */
/*
Time: O(N)
Space: O(h), where 5
Runtime: 94 ms, faster than 74.06% of JavaScript online submissions for N-ary Tree Level Order Traversal.
Memory Usage: 46 MB, less than 77.23% of JavaScript online submissions for N-ary Tree Level Order Traversal.
 */
var levelOrder = function (root) {
  if (root == null) return root;
  const result = [];
  const Q = [];
  Q.push(root);
  Q.push(null);
  let level = 0;
  while (Q.length) {
    const node = Q.shift();
    if (node == null) {
      if (Q.length) {
        Q.push(null);
        level++;
      }
    } else {
      if (!result[level]) result[level] = [];
      result[level].push(node.val);
      for (let child of node.children) {
        if (child !== null) Q.push(child);
      }
    }
  }
  return result;
};
