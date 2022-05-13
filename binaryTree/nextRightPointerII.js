/* 
Given a binary tree

struct Node {
  int val;
  Node *left;
  Node *right;
  Node *next;
}
Populate each next pointer to point to its next right node. If there is no next right node, 
the next pointer should be set to NULL.

Initially, all next pointers are set to NULL.

         1 
       /   \
      2     3
     / \     \
    4   5     7

         1 ->NULL
       /   \
      2 --->3--> NULL
     / \     \
    4-->5---->7-->NULL

Example 1:
Input: root = [1,2,3,4,5,null,7]
Output: [1,#,2,3,#,4,5,7,#]
Explanation: Given the above binary tree (Figure A), your function should populate each next 
pointer to point to its next right node, just like in Figure B. The serialized output is in 
level order as connected by the next pointers, with '#' signifying the end of each level.

Example 2:
Input: root = []
Output: []

Constraints:

The number of nodes in the tree is in the range [0, 6000].
-100 <= Node.val <= 100

Follow-up:

You may only use constant extra space.
The recursive approach is fine. You may assume implicit stack space does not count as extra space for this problem.

*/
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
/* 
Approach: BFS (Iterative)
Runtime: 138 ms, faster than 12.23% of JavaScript online submissions for Populating Next Right Pointers in Each Node II.
Memory Usage: 47 MB, less than 22.61% of JavaScript online submissions for Populating Next Right Pointers in Each Node II.
*/
var connect = function (root) {
  if (root == null) return root;
  const queue = [];
  queue.push(root);
  //level separator
  queue.push(null);
  while (queue.length) {
    const node = queue.shift();
    if (node === null) {
      if (queue.length) queue.push(null);
    } else {
      node.next = queue[0];
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return root;
};

/* 
Approach: DFS (recursive)
Runtime: 138 ms, faster than 12.23% of JavaScript online submissions for Populating Next Right Pointers in Each Node II.
Memory Usage: 47 MB, less than 22.61% of JavaScript online submissions for Populating Next Right Pointers in Each Node II.
*/
var connect = function (root) {
  if (root == null) return root;
  const connect = (node) => {
    if (node === null) return;
    // if (node.left) node.left.next = node.right;
    if (node.left) {
      if (node.right) {
        node.left.next = node.right;
      } else if (node.next) {
        node.left.next = node.next.left ? node.next.left : node.next.right;
      }
    }
    if (node.next && node.right) {
      node.right.next = node.next.left ? node.next.left : node.next.right;
    }
    connect(node.left);
    connect(node.right);
  };
  connect(root);
  return root;
};
