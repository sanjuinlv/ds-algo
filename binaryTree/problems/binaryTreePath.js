/* 
Easy

Given a binary tree, return all root-to-leaf paths.
Note: A leaf is a node with no children.

Input:

   1
 /   \
2     3
 \
  5

Output: ["1->2->5", "1->3"]
Explanation: All root-to-leaf paths are: 1->2->5, 1->3

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
 * @return {string[]}
 */
/* 
[] -  PASS
[1] - PASS
[3,5,1,6,2,0,8,null,null,7,4] - PASS

Runtime: 84 ms, faster than 72.08% of JavaScript online submissions for Binary Tree Paths.
Memory Usage: 40.7 MB, less than 8.27% of JavaScript online submissions for Binary Tree Paths.
*/
var binaryTreePaths = function(root) {
  if (root == null) return [];
  const paths = [];
  const findPath = (node, pathToThisNode) => {
      // node is null
      if (node == null) return;
      //path to this node
      const currentPath = pathToThisNode.length ? 
        `${pathToThisNode}->${node.val}` : `${node.val}`;
      // if leaf node then add the current path and return
      console.log(`current path: ${currentPath}`);
      if (node.left == null && node.right == null){
          paths.push(currentPath);
          return;
      }
      findPath(node.left, currentPath);
      findPath(node.right, currentPath);
  }
  findPath(root, "");
  return paths;    
};