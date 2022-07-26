/* 
https://leetcode.com/problems/kth-smallest-element-in-a-bst/

Given the root of a binary search tree, and an integer k, return the kth smallest
value (1-indexed) of all the values of the nodes in the tree.

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
 * @param {number} k
 * @return {number}
 */

/* 
Approach: In-Order Traversal
Time: O(N), for inOrder traversal
Space: O(N), stack size to keep inOrder traversal

Runtime: 78 ms, faster than 92.29% of JavaScript online submissions for Kth Smallest Element in a BST.
Memory Usage: 48.2 MB, less than 74.15% of JavaScript online submissions for Kth Smallest Element in a BST.
*/
var kthSmallest = function (root, k) {
  let count = 0;
  let result = null;
  const inOrder = (node) => {
    if (node == null) return;
    inOrder(node.left);
    count++;
    if (count === k) {
      result = node.val;
      return;
    }
    inOrder(node.right);
  };
  inOrder(root);
  return result;
};

//We can use same approach to solve kthLargest
// var kthLargest = function(root, k) {
//     let count = 0;
//     let result = null;
//     const dfs = (node) => {
//         if (node == null) return;
//         dfs(node.right);
//         count++;
//         if (count === k) {
//             result  = node.val;
//             return;
//         }
//         dfs(node.left);
//     }
//     dfs(root);
//     return result;
// };
