/* 
700. Search in a Binary Search Tree
https://leetcode.com/problems/search-in-a-binary-search-tree/
Type: Easy

You are given the root of a binary search tree (BST) and an integer val.

Find the node in the BST that the node's value equals val and return the subtree rooted with that node.
If such a node does not exist, return null.

Example 1:
    4
   / \
  2   7
 / \ 
1   3 
Input: root = [4,2,7,1,3], val = 2
Output: [2,1,3]

Example 2:
    4
   / \
  2   7
 / \ 
1   3
Input: root = [4,2,7,1,3], val = 5
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
 * @param {number} val
 * @return {TreeNode}
 */
/* 
Approach 1: recursion
Time: O(H)
Space: O(H)

Runtime: 65 ms, faster than 71.69% of JavaScript online submissions for Search in a Binary Search Tree.
Memory Usage: 56.45 MB, less than 36.85% of JavaScript online submissions for Search in a Binary Search Tree.
*/
var searchBST = function (root, val) {
  if (root == null) return null;
  if (root.val == val) return root;
  else if (val < root.val) return searchBST(root.left, val);
  else return searchBST(root.right, val);
};

/* 
Approach 1: recursion
Time: O(H)
Space: O(1)

Runtime: 64 ms, faster than 75.59% of JavaScript online submissions for Search in a Binary Search Tree.
Memory Usage: 56.13 MB, less than 63.55% of JavaScript online submissions for Search in a Binary Search Tree.
*/
var searchBST = function (root, val) {
  if (root == null) return null;
  while (root != null) {
    if (val === root.val) return root;
    if (val < root.val) root = root.left;
    else root = root.right;
  }
  return null;
};
