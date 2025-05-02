/* 
230. Kth Smallest Element in a BST
https://leetcode.com/problems/kth-smallest-element-in-a-bst/
Type: Medium

Given the root of a binary search tree, and an integer k, return the kth smallest
value (1-indexed) of all the values of the nodes in the tree.

Example 1:
      3
     / \
    1   4
     \
      2
Input: root = [3,1,4,null,2], k = 1
Output: 1

Example 2:
        5
       / \
      3   6
     / \
    2   4
   / 
  1  
Input: root = [5,3,6,2,4,null,null,1], k = 3
Output: 3

Follow up: If the BST is modified often (i.e., we can do insert and delete operations) and you need to find the kth smallest frequently, how would you optimize?

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
Approach: In-Order Traversal (DFS)
Time: O(N), for inOrder traversal
Space: O(N), stack size to keep inOrder traversal

Runtime: 0 ms Beats 100.00%
Memory Usage: 55.34 MB Beats 42.62%
*/
var kthSmallest = function (root, k) {
  let result = null;
  let nodeCount = 0;
  const inOrder = (node) => {
    if (node == null) return;
    //go to left farmost subtree
    inOrder(node.left);
    nodeCount++;
    if (nodeCount == k) {
      //kth smallest found, return
      result = node.val;
      return;
    }
    //explore right subtree
    inOrder(node.right);
  };
  inOrder(root);
  return result;
};

/* 
Approach II: Iterative (BFS)
Time: O(H + k), where H is a tree height. This complexity is defined by the stack, which contains at least H+k elements, since before starting to pop out one has to go down to a leaf. This results in O(logN + k) for the balanced tree and O(N + k) for a completely unbalanced tree with all the nodes in the left subtree.

Space: O(H), to keep the stack, where H is a tree height. That makes O(N) in the worst case of the skewed tree, and O(logN) in the average case of the balanced tree.

Runtime: 0 ms Beats 100.00%
Memory: 55.78 MB Beats 17.67%
*/
var kthSmallest = function (root, k) {
  const stack = [];
  let curr = root;
  let nodeCount = 0;
  while (true) {
    while (curr != null) {
      stack.push(curr);
      //keep moving to left farmost node
      curr = curr.next;
    }
    if (stack.length == 0) return null;
    curr = stack.pop();
    nodeCount++;
    if (nodeCount == k) return curr.val;
    curr = curr.right;
  }
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
