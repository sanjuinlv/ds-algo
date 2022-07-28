/*
https://leetcode.com/problems/house-robber-iii
Category - Medium

The thief has found himself a new place for his thievery again. There is only one entrance to this area, called root.

Besides the root, each house has one and only one parent house. After a tour, the smart thief realized that all houses in this place form a binary tree. It will automatically contact the police if two directly-linked houses were broken into on the same night.

Given the root of the binary tree, return the maximum amount of money the thief can rob without alerting the police.
   
Example 1:
Input: root = [3,2,3,null,3,null,1]
Output: 7
Explanation: Maximum amount of money the thief can rob = 3 + 3 + 1 = 7.

   3
  / \
 2   3
  \   \ 
   3   1

   Example 2:
Input: root = [3,4,5,1,3,null,1]
Output: 9
Explanation: Maximum amount of money the thief can rob = 4 + 5 = 9.
          3
        /   \
       4     5
      / \     \ 
     1   3     1
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
Recursion (Top Down)
Time: O(N)
SPace: O(N)
Runtime: 120 ms, faster than 41.32% of JavaScript online submissions for House Robber III.
Memory Usage: 46.6 MB, less than 92.98% of JavaScript online submissions for House Robber III.
*/
var rob = function (root) {
  const helper = (node) => {
    if (node == null) return [0, 0];
    const leftProfit = helper(node.left);
    const rightProfit = helper(node.right);
    //if we rob this node, then we can only rob the children of left and right node
    const robNode = node.val + leftProfit[1] + rightProfit[1];
    //if we don't rob this node, then we following choices:
    //we rob left node or its children to gain max amount, and
    //we rob right node or its children to gain max amount
    const notRobNode = Math.max(
      Math.max(leftProfit[0], leftProfit[1]) +
        Math.max(rightProfit[0], rightProfit[1])
    );
    return [robNode, notRobNode];
  };
  const result = helper(root);
  return Math.max(result[0], result[1]);
};
