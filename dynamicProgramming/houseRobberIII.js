/*
337. House Robber III
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
Recursion 
Time: O(N)
Space: O(N)

Runtime: 2 ms Beats 72.29%
Memory Usage: 53.44 MB Beats 86.58%
*/
var rob = function (root) {
  //create array of nodes using in-order traversal
  const helper = (node) => {
    //the first index indicate robbed and 2nd no_robbed
    if (node == null) return [0, 0];
    const leftProfit = helper(node.left);
    const rightProfit = helper(node.right);
    //if we rob this node then we can only rob children of left and right node
    //leftProfit[1] and rightProfit[1] indicates robbing children of left and right child node
    const rob = node.val + leftProfit[1] + rightProfit[1];
    //if we don't rob this node, then we following choices:
    //we rob left node or its children to gain max amount, and
    //we rob right node or its children to gain max amount
    const notRob =
      Math.max(leftProfit[0], leftProfit[1]) +
      Math.max(rightProfit[0], rightProfit[1]);
    return [rob, notRob];
  };
  const result = helper(root);
  return Math.max(result[0], result[1]);
};