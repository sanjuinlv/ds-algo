/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
/*
Runtime: 152 ms, faster than 64.74% of JavaScript online submissions for Serialize and Deserialize Binary Tree.
Memory Usage: 53.5 MB, less than 64.67% of JavaScript online submissions for Serialize and Deserialize Binary Tree.
 */
var serialize = function (root) {
  let result = "";
  const preOrder = (node) => {
    if (node == null) {
      result += "null";
      return;
    }
    result += node.val + ",";
    preOrder(node.left);
    preOrder(node.right);
  };
  return result;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  const nodes = data.split(",");
  const buildTree = () => {
    const val = nodes.shift();
    if (val === "null") {
      return null;
    }
    const root = new TreeNode(parseInt(val));
    root.left = buildTree();
    root.right = buildTree();
    return root;
  };
  return buildTree();
};
/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

//Fails for
//[4.0,-7,-3,null,null,-9,-3]
//[4,-7,-3,null,null,-9,-3,9,-7,-4,null,6,null,-6,-6,null,null,0,6,5,null,9,null,null,-1,-4,null,null,null,-2]
