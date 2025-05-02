/* 
124. Binary Tree Maximum Path Sum
https://leetcode.com/problems/binary-tree-maximum-path-sum/
Type: Hard

Given a non-empty binary tree, find the maximum path sum.
For this problem, a path is defined as any node sequence from some starting node to any
node in the tree along the parent-child connections. The path must contain at least 
one node and does not need to go through the root

    1
   / \
  2   3
Input: root = [1,2,3]
Output: 6
Explanation: The optimal path is 2 -> 1 -> 3 with a path sum of 2 + 1 + 3 = 6.

   -10
   / \
  9   20
     /  \
    15   7
Input: root = [-10,9,20,null,null,15,7]
Output: 42 
Explanation: The optimal path is 15 -> 20 -> 7 with a path sum of 15 + 20 + 7 = 42.
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
Approach: Post Order DFS
Time: O(N) - Each node in the tree is visited only once.
Space; O(N) - We don't use any auxiliary data structure, but the recursive call stack can go as deep as the tree's height. In the worst case, the tree is a linked list, so the height is n. Therefore, the space complexity is O(n).

Runtime: 2 ms Beats 78.11%
Memory Usage: 65.59 MB Beats 18.12%
 */
var maxPathSum = function (root) {
  let maxPathSum = -Infinity;
  const findMaxPathSum = (node) => {
    if (node == null) return 0;
    //we use Max(gainfromLeft/RightTree, 0) because we want to consider 
    // gain only if it is positive, else ignore it as zero
    const leftPathSum = Math.max(findMaxPathSum(node.left), 0);
    const rightPathSum = Math.max(findMaxPathSum(node.right), 0);
    const pathSum = node.val + leftPathSum + rightPathSum;
    maxPathSum = Math.max(pathSum, maxPathSum);
    //for recursion, return the max sum path of left + node or right + node
    return node.val + Math.max(leftPathSum, rightPathSum);
  };
  findMaxPathSum(root);
  return maxPathSum;
};

var maxPathSum = function (root) {
  //leet code expects min value as this (also required for null node case)
  let maxSum = Math.pow(-2, 31);
  let path = "";
  const findMaxSum = (node) => {
    if (node == null) return [0, ""];
    //using Math.max(findMax, 0) is tricky part
    let [leftSum, leftPath] = findMaxSum(node.left);
    let [rightSum, rightPath] = findMaxSum(node.right);
    if (leftSum < 0) {
      leftSum = 0;
      leftPath = "";
    }
    if (rightSum < 0) {
      rightSum = 0;
      rightPath = "";
    }
    const pathSum = leftSum + rightSum + node.val;
    if (pathSum > maxSum) {
      path = `${leftPath}, ${node.val}, ${rightPath}`;
      maxSum = pathSum;
    }
    // maxSum = Math.max(pathSum, maxSum);
    //for recursion
    // return the max sum path of left + node or right + node
    if (leftSum > rightSum) {
      return [leftSum + node.val, leftPath + "," + node.val];
    } else {
      return [rightSum + node.val, rightPath + "," + node.val];
    }
  };
  findMaxSum(root);
  console.log(`path: ${path}`);
  return maxSum;
};
