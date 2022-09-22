/* 
Given two integer arrays inorder and postorder where inorder is the inorder traversal of a 
binary tree and postorder is the postorder traversal of the same tree, construct and return
the binary tree.

Example 1:
Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
Output: [3,9,20,null,null,15,7]

Example 2:
Input: inorder = [-1], postorder = [-1]
Output: [-1]

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
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
/* 
Runtime: 108 ms, faster than 62.84% of JavaScript online submissions for Construct Binary Tree from Inorder and Postorder Traversal.
Memory Usage: 45.3 MB, less than 56.99% of JavaScript online submissions for Construct Binary Tree from Inorder and Postorder Traversal.
*/
var buildTree = function (inorder, postorder) {
  const arrayToTree = (postOrder, left, right) => {
    if (left > right) return null;
    const rootValue = postOrder[postOrderIndex--];
    const root = new TreeNode(rootValue);
    root.right = arrayToTree(
      postOrder,
      inOrderIndexMap.get(rootValue) + 1,
      right
    );
    root.left = arrayToTree(
      postOrder,
      left,
      inOrderIndexMap.get(rootValue) - 1
    );
    return root;
  };
  const inOrderIndexMap = new Map();
  for (let i = 0; i < inorder.length; i++) {
    inOrderIndexMap.set(inorder[i], i);
  }
  let postOrderIndex = postorder.length - 1;
  return arrayToTree(postorder, 0, postorder.length - 1);
};
