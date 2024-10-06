/* 
226. Invert Binary Tree
https://leetcode.com/problems/invert-binary-tree/
Type: Easy

Given the root of a binary tree, invert the tree, and return its root.

Example 1:
  Input: root = [4,2,7,1,3,6,9]
  Output: [4,7,2,9,6,3,1]

Example 2:
  Input: root = [2,1,3]
  Output: [2,3,1]

Example 3:
  Input: root = []
  Output: []
 

Constraints:
 - The number of nodes in the tree is in the range [0, 100].
 - -100 <= Node.val <= 100

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
Approach II: Top Down

Runtime: 53 ms Beats 58.16%
Memory: 49.28 MB Beats 56.05%
*/
var invertTree = function (root) {
  if (root == null) return root;
  const temp = root.left;
  root.left = root.right;
  root.right = temp;
  invertTree(root.left);
  invertTree(root.right);
  return root;
}

/* 
Iterative
Time: O(N) - Since each node in the tree is visited / added to the queue only once, the time complexity is O(n), where n is the number of nodes in the tree.
Space: O(N) - since in the worst case, the queue will contain all nodes in one level of the binary tree. For a full binary tree, the leaf level has ⌈n/2​⌉=O(n) leaves.

Runtime: 45 ms Beats 92.00%
Memory Usage: 49.32 MB Beats 42.58%
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
