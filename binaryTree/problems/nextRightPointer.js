/* 
116. Populating Next Right Pointers in Each Node
https://leetcode.com/problems/populating-next-right-pointers-in-each-node/
Type: Medium

You are given a perfect binary tree where all leaves are on the same level, and every
 parent has two children. The binary tree has the following definition:

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
     / \   / \
    4   5 6   7

         1 ->NULL
       /   \
      2 --->3--> NULL
     / \   / \
    4-->5->6->7-->NULL

Example 1:
Input: root = [1,2,3,4,5,6,7]
Output: [1,#,2,3,#,4,5,6,7,#]
Explanation: Given the above perfect binary tree (Figure A), your function should populate 
each next pointer to point to its next right node, just like in Figure B. The serialized 
output is in level order as connected by the next pointers, with '#' signifying the end of each level.

Example 2:
Input: root = []
Output: []

Constraint:
The number of nodes in the tree is in the range [0, 212 - 1].
-1000 <= Node.val <= 1000

Follow-up:
You may only use constant extra space.
The recursive approach is fine. You may assume implicit stack space does not count as extra
 space for this problem.
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
Approach: Level Order Traversal (BSF)
Time: O(N)
Space: O(N)

Runtime: 137 ms, faster than 13.42% of JavaScript online submissions for Populating Next Right Pointers in Each Node.
Memory Usage: 48.9 MB, less than 38.53% of JavaScript online submissions for Populating Next Right Pointers in Each Node.

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
Approach: Level Order Traversal (BSF) without using level separator (using for loop inside while)
Time: O(N)
Space: O(N)

Runtime: 66 ms Beats 58.97%
Memory Usage: 56.65 MB Beats 6.79%
*/
var connect = function (root) {
  if (root == null) return root;
  const queue = [];
  queue.push(root);
  while (queue.length) {
    const size = queue.length;
    for (let i = 0; i < size; i++) {
      const node = queue.shift();
      // This check is important. We don't want to establish any wrong
      // connections. The queue will contain nodes from 2 levels
      // at most at any point in time. This check ensures we only
      // don't establish next pointers beyond the end of a level
      if (i < size - 1) node.next = queue[0];
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }
  return root;
};

/* 
Level order traversal: using extra array for storing child nodes
Runtime: 81 ms Beats 5.51%
Memory: 55.53 MB Beats 46.15%
*/
var connect = function (root) {
  if (root == null) return root;
  const Q = [];
  Q.push(root);
  while (Q.length) {
    const size = Q.length;
    const nodeAtLevel = [];
    for (let i = 0; i < size; i++) {
      const node = Q.shift();
      //item in front of Q will ne next node of this node
      if (Q.length) node.next = Q[0];
      else node.next = null;
      nodeAtLevel.push(node);
    }
    //node add all node's left and right child at this level
    for (const node of nodeAtLevel) {
      if (node.left) Q.push(node.left);
      if (node.right) Q.push(node.right);
    }
  }
  return root;
};

/* 
Approach: Using previously established next pointer (Recursive)
Time: O(N)
Space: O(1)
Runtime: 112 ms, faster than 38.63% of JavaScript online submissions for Populating Next Right Pointers in Each Node.
Memory Usage: 49.1 MB, less than 32.74% of JavaScript online submissions for Populating Next Right Pointers in Each Node.
*/
var connect = function (root) {
  if (root == null) return root;
  const connect = (node) => {
    if (node === null) return;
    if (node.left) node.left.next = node.right;
    if (node.right && node.next) node.right.next = node.next.left;
    connect(node.left);
    connect(node.right);
  };
  connect(root);
  return root;
};

/* 
Approach: Using previously established next pointer (Iterative)
Time: O(N)
Space: O(1)
Runtime: 113 ms, faster than 37.58% of JavaScript online submissions for Populating Next Right Pointers in Each Node.
Memory Usage: 47.8 MB, less than 99.05% of JavaScript online submissions for Populating Next Right Pointers in Each Node.
*/
var connect = function (root) {
  if (root == null) return root;
  // Start with the root node. There are no next pointers
  // that need to be set up on the first level
  let leftmost = root;
  // Once we reach the final level, we are done
  while (leftmost.left !== null) {
    // Iterate the "linked list" starting from the head
    // node and using the next pointers, establish the
    // corresponding links for the next level
    let head = leftmost;
    while (head !== null) {
      // CONNECTION 1
      head.left.next = head.right;
      // CONNECTION 2
      if (head.next) head.right.next = head.next.left;
      // Progress along the list (nodes on the current level)
      head = head.next;
    }
    // Move onto the next level
    leftmost = leftmost.left;
  }
  return root;
};
