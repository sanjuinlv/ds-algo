/* 
297. Serialize and Deserialize Binary Tree
https://leetcode.com/problems/serialize-and-deserialize-binary-tree/description/
Type: Medium

Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary tree can be serialized to a string and this string can be deserialized to the original tree structure.

Clarification: The input/output format is the same as how LeetCode serializes a binary tree. You do not necessarily need to follow this format, so please be creative and come up with different approaches yourself.

Example 1:
   1 
  / \ 
 2   3
    / \
   4   5  
Input: root = [1,2,3,null,null,4,5]
Output: [1,2,3,null,null,4,5]

Example 2:
Input: root = []
Output: []

Constraints:
 - The number of nodes in the tree is in the range [0, 10^4].
 - -1000 <= Node.val <= 1000

*/
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
Approach 1: DFS 
Time: O(N) - in both serialization and deserialization functions, we visit each node exactly once, thus the time complexity is O(N), where N is the number of nodes, i.e. the size of the tree.
Space: O(N) - in both serialization and deserialization functions, we keep the entire tree, either at the beginning or at the end, therefore, the space complexity is O(N).

Runtime: 132 ms Beats 23.84%
Memory Usage: 61.34 MB Beats 87.74%
 */
var serialize = function (root) {
  let serializedStr = "";
  const preOrder = (node) => {
    if (node == null) {
      serializedStr += "null,";
      return;
    }
    serializedStr += node.val + ",";
    preOrder(node.left);
    preOrder(node.right);
  };
  preOrder(root);
  return serializedStr;
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  const nodes = data.split(",");
  const buildTree = (nodes) => {
    const node = nodes.shift();
    if (node == "null") return null;
    const root = new TreeNode(parseInt(node));
    root.left = buildTree(nodes);
    root.right = buildTree(nodes);
    return root;
  }
  return buildTree(nodes);
};
/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */

/* 
Avoiding multiple times string concatination
Runtime: 139 ms Beats 17.98%
Memory: 60.36 MB Beats 99.05%
*/
var serialize = function (root) {
  //root -> left -> right
  const stringBuilder = [];
  const preOrder = (node) => {
    if (node == null) {
      stringBuilder.push("null");
      return;
    }
    stringBuilder.push(node.val);
    preOrder(node.left);
    preOrder(node.right);
  };
  preOrder(root);
  return stringBuilder.join(",");
};

// Other way to create node string
var serialize = function (root) {
  if (root == null) return "";
  //root -> left -> right
  const preOrder = (node, nodeStr) => {
    if (node == null) {
      nodeStr += "null,";
      return nodeStr;
    }
    nodeStr += node.val + ",";
    nodeStr = preOrder(node.left, nodeStr);
    nodeStr = preOrder(node.right, nodeStr);
    return nodeStr;
  };
  return preOrder(root, "");
};
