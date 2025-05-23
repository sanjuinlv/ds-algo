/* 
543. Diameter of Binary Tree
https://leetcode.com/problems/diameter-of-binary-tree/
Type: Easy

Given a binary tree, you need to compute the length of the diameter of the tree. 
The diameter of a binary tree is the length of the longest path between any two 
nodes in a tree. This path may or may not pass through the root.

          1
         / \
        2   3
       / \     
      4   5    

Return 3, which is the length of the path [4,2,1,3] or [5,2,1,3].
Note: The length of path between two nodes is represented by the number of edges 
between them.


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
[] - PASS
[1] - PASS
[1,1] - PASS
[1,2,3,4,5,null,6,7,8,null,9,null,null,null,null,null,null,10,11,null,null,12] - PASS
[1,2,3,4,5,null,6,7,8,null,9,null,null,null,null,5,null,4,3,5,6,null,null,null,5] - PASS
*/
/* 
Approach: DFS (Bottom-up)
Time: O(N)
Space: O(N)

Runtime: 2 ms Beats 39.86%
Memory Usage: 56.10 MB Beats 59.74%
*/
var diameterOfBinaryTree = function (root) {
  let diameter = 0;
  if (root == null) return diameter;
  const findDiameter = (node) => {
    if (node == null) return 0;
    const leftDiameter = findDiameter(node.left);
    const rightDiameter = findDiameter(node.right);
    // current node path
    const nodeDiameter = leftDiameter + rightDiameter;
    // max of current path or existing diameter
    diameter = Math.max(diameter, nodeDiameter);
    //for recursive call
    return 1 + Math.max(leftDiameter, rightDiameter);
  };
  findDiameter(root);
  return diameter;
};

//using function signature for helper method
/* 
Runtime: 0 ms Beats 100.00%
Memory: 60.68 MB Beats 88.72%
*/
var diameterOfBinaryTree = function (root) {
  function helper(root) {
    if (root == null) return 0;
    let leftHeight = helper(root.left);
    let rightHeight = helper(root.right);
    //diameter for this node
    const nodeDiameter = leftHeight + rightHeight;
    this.diameter = Math.max(this.diameter, nodeDiameter);
    return 1 + Math.max(leftHeight, rightHeight);
  }
  this.diameter = 0;
  helper(root);
  return this.diameter;
};

/* 
TODO: Iterative
*/

// var diameterOfBinaryTree = function (root) {
//   let diameter = 0;
//   const path = [];
//   let maxPath = [];
//   const findDiameter = (node) => {
//     const path = findMaxPath(node);
//     console.log(maxPath);
//   };
//   const findMaxPath = (node) => {
//     if (node === null) return [];
//     const leftPath = findMaxPath(node.left);
//     const rightPath = findMaxPath(node.right);
//     if (leftPath.length + rightPath.length > diameter) {
//       diameter = leftPath.length + rightPath.length;
//       maxPath = [...leftPath];
//       maxPath.push(node.val);
//       maxPath.push(...rightPath);
//     }
//     const path = Array.from(
//       leftPath.length > rightPath.length ? leftPath : rightPath
//     );
//     path.push(node.val);
//     return path;
//   };
//   findDiameter(root);
//   return diameter;
// };
