/* 
98. Validate Binary Search Tree
https://leetcode.com/problems/validate-binary-search-tree/
Type: Medium

Given the root of a binary tree, determine if it is a valid binary search tree (BST).
A valid BST is defined as follows:

 - The left subtree of a node contains only nodes with keys less than the node's key.
 - The right subtree of a node contains only nodes with keys greater than the node's key.
 -  Both the left and right subtrees must also be binary search trees.

Example 1:
Input: root = [2,1,3]
Output: true

Example 2:
Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.

Constraint:
 - The number of nodes in the tree is in the range [1, 10^4].
 - -2^31 <= Node.val <= 2^31 - 1
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
 * @return {boolean}
 */
/*
Approach 1: Recursive Traversal with Valid Range
Time: O(N) since we visit each node exactly once.
Space: O(N) since we keep up to the entire tree

Runtime: 1 ms Beats 62.89%
Memory Usage: 59.51 MB Beats 28.38%
 */
var isValidBST = function (root) {
  //recursively validate left and right sub-tree
  const isBST = (node, min, max) => {
    if (node == null) return true;
    if (min != null && node.val <= min) return false;
    if (max != null && node.val >= max) return false;
    //now recursively check left and right sub-tree
    if (!isBST(node.left, min, node.val)) return false;
    if (!isBST(node.right, node.val, max)) return false;
    return true;
  };
  return isBST(root, null, null);
};

/* 
Approach 2: Iterative Traversal with Valid Range
Time: O(N) since we visit each node exactly once.
Space: O(N) since we keep up to the entire tree

Runtime: 72 ms, faster than 10.91% of JavaScript online submissions for Validate Binary Search Tree.
Memory Usage: 56.07 MB, less than 5.15% of JavaScript online submissions for Validate Binary Search Tree.
*/
var isValidBST = function (root) {
  if (root == null) return true;
  const stack = [];
  stack.push([root, null, null]);
  while (stack.length) {
    const [node, min, max] = stack.pop();
    if (node == null) continue;
    if (min != null && node.val <= min) return false;
    if (max != null && node.val >= max) return false;
    if (node.left) stack.push([node.left, min, node.val]);
    if (node.right) stack.push([node.right, node.val, max]);
  }
  return true;
};
/* 
Approach 3: Recursive inOrder traversal
Time complexity: O(N)
Space complexity: O(N)

Runtime: 69 ms, faster than 18.87% of JavaScript online submissions for Validate Binary Search Tree.
Memory Usage: 52.10 MB, less than 97.35% of JavaScript online submissions for Validate Binary Search Tree.
prev = 3
node = 4 
*/
var isValidBST = function (root) {
  let prev = null;
  const isBST = (node) => {
    if (node == null) return true;
    if (!isBST(node.left)) return false;
    //in in-order traversal the previous visited node should be smaller than current
    if (prev != null && node.val <= prev) return false;
    prev = node.val;
    return isBST(node.right);
  };
  return isBST(root);
};

/* 
Approach 4: Iterative inOrder traversal
Time complexity: O(N)
Space complexity: O(N)

Runtime: 140 ms, faster than 7.85% of JavaScript online submissions for Validate Binary Search Tree.
Memory Usage: 46.7 MB, less than 22.20% of JavaScript online submissions for Validate Binary Search Tree.
*/
var isValidBST = function (root) {
  if (root == null) return true;
  const stack = [];
  let prev = null;
  while (true) {
    while (root != null) {
      stack.push(root);
      root = root.left;
    }
    if (stack.length == 0) break;
    root = stack.pop();
    if (prev != null && root.val <= prev) return false;
    prev = root.val;
    root = root.right;
  }
  return true;
};
