/* 
450. Delete Node in a BST
https://leetcode.com/problems/delete-node-in-a-bst/
Type: Medium

Given a root node reference of a BST and a key, delete the node with the given key in the BST.
Return the root node reference (possibly updated) of the BST.

Basically, the deletion can be divided into two stages:

Search for a node to remove.
If the node is found, delete the node.

Example 1:
  Input: root = [5,3,6,2,4,null,7], key = 3
  Output: [5,4,6,2,null,null,7]
  Explanation: Given key to delete is 3. So we find the node with value 3 and delete it.
  One valid answer is [5,4,6,2,null,null,7], shown in the above BST.
  Please notice that another valid answer is [5,2,6,null,4,null,7] and it's also accepted.

Example 2:
  Input: root = [5,3,6,2,4,null,7], key = 0
  Output: [5,3,6,2,4,null,7]
  Explanation: The tree does not contain a node with value = 0.

Example 3:
  Input: root = [], key = 0
  Output: []

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
 * @param {number} key
 * @return {TreeNode}
 */
/* 
Runtime: 75 ms, faster than 87.61% of JavaScript online submissions for Delete Node in a BST.
Memory Usage: 59.08 MB, less than 68.59% of JavaScript online submissions for Delete Node in a BST.
*/
var deleteNode = function (root, key) {
  const findMin = (node) => {
    if (node === null) return null;
    if (node.left === null) return node;
    return findMin(node.left);
  };
  //Iterative findMin
  // const findMin = (node) => {
  //   while (node.left != null) {
  //     node = node.left;
  //   }
  //   return node;
  // };
  
  const deleteMin = (node) => {
    if (node.left == null) return node.right;
    node.left = deleteMin(node.left);
    return node;
  };

  const delNode = (node, key) => {
    if (node === null) return null;
    if (key < node.val) node.left = delNode(node.left, key);
    else if (key > node.val) node.right = delNode(node.right, key);
    else {
      //case I: left child is null
      if (node.left == null) return node.right;
      //case II: right child is null
      if (node.right == null) return node.left;
      //case III: both child is present
      const temp = node;
      //find successor of this node, i.e, min in right side of this node
      node = findMin(temp.right);
      node.right = deleteMin(temp.right);
      node.left = temp.left;
      console.log(node);
    }
    return node;
  };
  return delNode(root, key);
};
