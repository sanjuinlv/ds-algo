/**
 * Medium
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
/* 
Your runtime beats 34.16 % of javascript submissions.
Runtime: 104 ms
Memory Usage: 48.2 MB
*/
var lowestCommonAncestor = function(root, p, q) {
  if (root == null) return null;
  const LCA = (node, p, q) => {
    if (node == null) return null;
    //if any of the node1 and node2 matches root then, root is LCA
    if (node.val == p || node.val == q) return node;
    //find recursively the left child LCA
    const leftLCA = LCA(node.left, p, q);
    //find recursively the right child LCA
    const rightLCA = LCA(node.right, p, q);
    if (leftLCA && rightLCA) return node;
    return leftLCA ? leftLCA : rightLCA;
  }
  return LCA(root, p.val, q.val)
};