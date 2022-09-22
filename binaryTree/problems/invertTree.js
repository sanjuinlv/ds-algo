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
 * @return {TreeNode}
 */
/* 
Recursive: Bottom Up approach
Time: O(N)
Space: O(h) function calls will be placed on stack in worst case, where h is height of tree. 
For unbalance tree h will be equal to n, so space complexity is O(N).

Runtime: 89 ms, faster than 31.71% of JavaScript online submissions for Invert Binary Tree.
Memory Usage: 42.8 MB, less than 13.65% of JavaScript online submissions for Invert Binary Tree.
*/
var invertTree = function (root) {
  if (root == null) return root;
  invertTree(root.left);
  invertTree(root.right);
  const left = root.left;
  root.left = root.right;
  root.right = left;
  return root;
};

//corrected with
var invertTree = function (root) {
  if (root == null) return root;
  const leftNode = invertTree(root.left);
  const rightNode = invertTree(root.right);
  root.left = rightNode;
  root.right = leftNode;
  return root;
};

/* 
Iterative
Time: O(N)
Space: O(N)

Runtime: 67 ms, faster than 75.33% of JavaScript online submissions for Invert Binary Tree.
Memory Usage: 42.6 MB, less than 22.50% of JavaScript online submissions for Invert Binary Tree.
*/
var invertTree = function (root) {
  if (root == null) return root;
  const stack = [];
  stack.push(root);
  while (stack.length) {
    const node = stack.pop();
    const leftNode = node.left;
    node.left = node.right;
    node.right = leftNode;
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  return root;
};
