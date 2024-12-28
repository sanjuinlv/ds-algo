/* 
112. Path Sum
https://leetcode.com/problems/path-sum/description/
Type: Easy

Given the root of a binary tree and an integer targetSum, return true if the 
tree has a root-to-leaf path such that adding up all the values along the path
equals targetSum.

A leaf is a node with no children.

Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], 
targetSum = 22
Output: true

Input: root = [1,2,3], targetSum = 5
Output: false

Input: root = [1,2], targetSum = 0
Output: false

Constraints:
    The number of nodes in the tree is in the range [0, 5000].
    -1000 <= Node.val <= 1000
    -1000 <= targetSum <= 1000

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
 * @param {number} targetSum
 * @return {boolean}
 */
/*
Approach: Recursive 
Runtime: 1 ms Beats 47.97%
Memory: 53.02 MB Beats 27.37%
 */
var hasPathSum = function (root, targetSum) {
  if (root == null) return false;
  const findPathSum = (node, target) => {
    if (node == null) return false;
    target = target - node.val;
    if (node.left == null && node.right == null) return target == 0;
    const leftPathSum = findPathSum(node.left, target);
    const rightPathSum = findPathSum(node.right, target);
    return leftPathSum || rightPathSum;
  };
  return findPathSum(root, targetSum);
};

/* 
Approach : Iterative (DFS)
Time: O(N)
Space: O(LogN) for balance tree, O(N) for unbalanced tree

Runtime: 10 ms Beats 5.33%
Memory Usage: 54.41 MB Beats 8.42%
*/
var hasPathSum = function (root, targetSum) {
  if (root == null) return false;
  const stack = [];
  stack.push([root, targetSum]);
  while (stack.length) {
    const [node, remainSum] = stack.pop();
    const target = remainSum - node.val;
    if (node.left == null && node.right == null && target == 0) return true;
    if (node.right) stack.push([node.right, target]);
    if (node.left) stack.push([node.left, target]);
  }
  return false;
};
