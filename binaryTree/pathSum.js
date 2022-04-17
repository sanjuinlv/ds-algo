/* 
Given the root of a binary tree and an integer targetSum, return true if the 
tree has a root-to-leaf path such that adding up all the values along the path
equals targetSum.

A leaf is a node with no children.

Input: root = [5,4,8,11,null,13,4,7,2,null,null,null,1], 
targetSum = 22
Output: true

Input: root = [1,2,3], targetSum = 5
Output: false

Input: root = [1,2], targetSum = 0
Output: false

Constraints:
    The number of nodes in the tree is in the range [0, 5000].
    -1000 <= Node.val <= 1000
    -1000 <= targetSum <= 1000

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
 * @param {number} targetSum
 * @return {boolean}
 */
//Works
var hasPathSum = function (root, targetSum) {
  if (root == null) return false;
  const pathSum = (node, targetSum) => {
    console.log(node);
    if (node.left == null && node.right == null) {
      if (targetSum == node.val) return true;
      else return false;
    }
    if (node.left && node.right) {
      return (
        pathSum(node.left, targetSum - node.val) ||
        pathSum(node.right, targetSum - node.val)
      );
    } else {
      tmp = node.left ? node.left : node.right;
      return pathSum(tmp, targetSum - node.val);
    }
  };
  return pathSum(root, targetSum);
};

//cleaner code
/* 
Approach : Recursion (DFS)
Runtime: 79 ms, faster than 76.26% of JavaScript online submissions for Path Sum.
Memory Usage: 45.2 MB, less than 92.15% of JavaScript online submissions for Path Sum.

Time: O(N)
Space: O(LogN) for balance tree, O(N) for unbalanced tree
*/
var hasPathSum = function (root, targetSum) {
  if (root == null) return false;
  targetSum = targetSum - root.val;
  if (root.left === null && root.right === null) {
    return targetSum === 0;
  }
  return hasPathSum(root.left, targetSum) || hasPathSum(root.right, targetSum);
};

/* 
Approach : Iterative (DFS)
Runtime: 79 ms, faster than 76.26% of JavaScript online submissions for Path Sum.
Memory Usage: 45.9 MB, less than 39.83% of JavaScript online submissions for Path Sum.

Time: O(N)
Space: O(LogN) for balance tree, O(N) for unbalanced tree
*/
var hasPathSum = function (root, targetSum) {
  if (root == null) return false;
  const stack = [];
  stack.push([root, targetSum]);
  while (stack.length) {
    const item = stack.pop();
    const node = item[0];
    const sum = item[1] - node.val;
    if (node.left === null && node.right === null && sum === 0) {
      return true;
    }
    if (node.left) stack.push([node.left, sum]);
    if (node.right) stack.push([node.right, sum]);
  }
  return false;
};
