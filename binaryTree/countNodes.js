/* 
https://leetcode.com/problems/count-complete-tree-nodes
Category - Medium

Given the root of a complete binary tree, return the number of the nodes in the tree.
According to Wikipedia, every level, except possibly the last, is completely filled
in a complete binary tree, and all nodes in the last level are as far left as possible.
It can have between 1 and 2h nodes inclusive at the last level h.

Design an algorithm that runs in less than O(n) time complexity.

Example 1:
Input: root = [1,2,3,4,5,6]
Output: 6

Example 2:
Input: root = []
Output: 0

Example 3:
Input: root = [1]
Output: 1

Constraints:

The number of nodes in the tree is in the range [0, 5 * 10^4].
0 <= Node.val <= 5 * 10^4
The tree is guaranteed to be complete.
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
Approach: 
Time: O(N)
Space; O(d) = O(LogN), where d is a tree depth
Runtime: 179 ms, faster than 36.13% of JavaScript online submissions for Count Complete Tree Nodes.
Memory Usage: 70 MB, less than 46.25% of JavaScript online submissions for Count Complete Tree Nodes
*/
var countNodes = function (root) {
  if (root == null) return 0;
  return 1 + countNodes(root.left) + countNodes(root.right);
};

/* 
Approach II: Binary Search
Time: O(Log(N)^2), Since the tree is halved in every recursive step, there is (log(n)) steps. 
Finding a height costs O(log(n)). So overall O(log(n)^2).

Space; O(d) = O(LogN), where d is a tree depth
Runtime: 182 ms, faster than 31.99% of JavaScript online submissions for Count Complete Tree Nodes.
Memory Usage: 70.1 MB, less than 39.83% of JavaScript online submissions for Count Complete Tree Nodes.

*/
var countNodes = function (root) {
  if (root == null) return 0;
  const findLeftDepth = (root) => {
    let depth = 0;
    while (root !== null) {
      root = root.left;
      depth++;
    }
    return depth;
  };
  const findRightDepth = (root) => {
    let depth = 0;
    while (root !== null) {
      root = root.right;
      depth++;
    }
    return depth;
  };
  const leftDepth = findLeftDepth(root);
  const rightDepth = findRightDepth(root);
  if (leftDepth == rightDepth) return Math.pow(2, leftDepth) - 1;
  else return 1 + countNodes(root.left) + countNodes(root.right);
};
