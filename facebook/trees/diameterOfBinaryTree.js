/* 
Easy
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
Your runtime beats 80.81 % of javascript submissions.
Runtime: 88 ms
Memory Usage: 41.8 MB
*/
var diameterOfBinaryTree = function(root) {
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
        return Math.max(leftDiameter, rightDiameter);
    }
    findDiameter(root);
    return diameter;
};