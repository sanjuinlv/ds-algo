/* 
Given a non-empty binary tree, find the maximum path sum.
For this problem, a path is defined as any node sequence from some starting node to any
node in the tree along the parent-child connections. The path must contain at least 
one node and does not need to go through the root

    1
   / \
  2   3
Input: root = [1,2,3]
Output: 6

   -10
   / \
  9   20
     /  \
    15   7
Input: root = [-10,9,20,null,null,15,7]
Output: 42
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
[1,2,3] -  PASS
[-10,9,20,null,null,15,7] - PASS
[2,9,20,null,null,15,7] - PASS
[-10,4,null,-10] - PASS
[-1,-2]
*/
/*
Your runtime beats 91.26 % of javascript submissions.
Your memory usage beats 67.83 % of javascript submissions.

Runtime: 92 ms
Memory Usage: 48.3 MB
 */
var maxPathSum = function (root) {
  //leet code expects min value as this (also required for null node case)
  let maxSum = Math.pow(-2, 31);
  const findMaxSum = (root) => {
    if (root == null) return 0;
    //using Math.max(findMax, 0) is tricky part
    const leftSum = Math.max(findMaxSum(root.left), 0);
    const rightSum = Math.max(findMaxSum(root.right), 0);
    const pathSum = leftSum + rightSum + root.val;
    maxSum = Math.max(pathSum, maxSum);
    //for recursion
    // return the max sum path of left + node or right + node
    return Math.max(leftSum, rightSum) + root.val;
  };
  findMaxSum(root);
  return maxSum;
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
