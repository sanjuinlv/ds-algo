/* 
572. Subtree of Another Tree
https://leetcode.com/problems/subtree-of-another-tree
Tyep: Easy

Given the roots of two binary trees root and subRoot, return true if there is a subtree of root with the same structure and node values of subRoot and false otherwise.

A subtree of a binary tree tree is a tree that consists of a node in tree and all of this node's descendants. The tree tree could also be considered as a subtree of itself.
Tree
     3 
    / \
   4   5
  / \
 1   2

Subroot
   4 
  / \
 1   2

Example 1:
Input: root = [3,4,5,1,2], subRoot = [4,1,2]
Output: true

Example 2:
Input: root = [3,4,5,1,2,null,null,null,null,0], subRoot = [4,1,2]
Output: false
 
Constraints:
 - The number of nodes in the root tree is in the range [1, 2000].
 - The number of nodes in the subRoot tree is in the range [1, 1000].
 - -10^4 <= root.val <= 10^4
 - -10^4 <= subRoot.val <= 10^4

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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
/* 
Approach: Recursive (DFS)
Time: O(M*N) - For every N node in the tree, we check if the tree rooted at node is identical to subRoot. This check takes O(M) time, where M is the number of nodes in subRoot. Hence, the overall time complexity is O(MN).
Space: O(M+N) - There will be at most N recursive call to dfs ( or isSubtree). Now, each of these calls will have M recursive calls to isIdentical. Before calling isIdentical, our call stack has at most O(N) elements and might increase to O(N+M) during the call. After calling isIdentical, it will be back to at most O(N) since all elements made by isIdentical are popped out. Hence, the maximum number of elements in the call stack will be M+N.

Runtime: 6 ms Beats 82.42%
Memory Usage: 63.04 MB Beats 9.28%
*/
var isSubtree = function (root, subRoot) {
  const isSymmetric = (t1, t2) => {
    if (t1 == null && t2 == null) return true;
    if (t1 == null || t2 == null) return false;
    if (t1.val !== t2.val) return false;
    return isSymmetric(t1.left, t2.left) && isSymmetric(t1.right, t2.right);
  };
  //check if the root is symmetric to subtree
  if (isSymmetric(root, subRoot)) return true;
  if (root == null) return false;
  // since root is not symmetric to subtree, check left and right ndoes
  return isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};

var isSubtree = function (root, subRoot) {
  const isSymmetric = (l1, l2) => {
    if (l1 === null && l2 === null) return true;
    if (l1 === null || l2 === null) return false;
    if (l1.val !== l2.val) return false;
    return isSymmetric(l1.left, l2.left) && isSymmetric(l1.right, l2.right);
  };
  let isSubtreeFound = false;
  const dfs = (node1, node2) => {
    if (isSymmetric(node1, node2)) {
      isSubtreeFound = true;
      return;
    }
    if (node1.left) dfs(node1.left, node2);
    if (node1.right) dfs(node1.right, node2);
  };
  dfs(root, subRoot);
  return isSubtreeFound;
};

/*
Approach: Iterative
Runtime: 8 ms Beats 51.32%
Memory Usage: 63.24 MB Beats 5.28%
*/
var isSubtree = function (root, subRoot) {
  const Q = [root];
  while (Q.length) {
    const node = Q.shift();
    // t1 and t2 are symmetrical then return true
    if (isSymmetric(node, subRoot)) return true;
    //if t1 and t2 not symmetrical then check for left and right child node of t1
    if (node.left) Q.push(node.left);
    if (node.right) Q.push(node.right);
  }
  return false;
};

var isSubtree = function (root, subRoot) {
  const Q = [root];
  while (Q.length) {
    const node = Q.shift(); //Q.pop()
    // t1 and t2 are symmetrical then return true
    if (isSymmetric(node, subRoot)) return true;
    //if t1 and t2 not symmetrical then check for left and right child node of t1
    if (node.left) Q.push(node.left);
    if (node.right) Q.push(node.right);
  }
  return false;
};

function isSymmetric(p, q) {
  const stack = [];
  stack.push([p, q]);
  while (stack.length) {
    const [t1, t2] = stack.pop();
    if (t1 == null && t2 == null) continue;
    if (t1 == null || t2 == null) return false;
    if (t1.val !== t2.val) return false;
    stack.push([t1.left, t2.left]);
    stack.push([t1.right, t2.right]);
  }
  return true;
}

/* 
Iterative with inner loop on queue
Runtime: 128 ms, faster than 35.53% of JavaScript online submissions for Subtree of Another Tree.
Memory Usage: 49.6 MB, less than 26.94% of JavaScript online submissions for Subtree of Another Tree.
*/
var isSubtree = function (root, subRoot) {
  //DFS
  const isSymmetric = (l1, l2) => {
    if (l1 === null && l2 === null) return true;
    if (l1 === null || l2 === null) return false;
    if (l1.val !== l2.val) return false;
    return isSymmetric(l1.left, l2.left) && isSymmetric(l1.right, l2.right);
  };
  //BFS
  const bfs = (t1, t2) => {
    const Q = [t1];
    while (Q.length) {
      const length = Q.length;
      for (let i = 0; i < length; i++) {
        const node = Q.shift();
        if (node.val === t2.val) {
          if (isSymmetric(node, t2)) return true;
        }
        if (node.left !== null) Q.push(node.left);
        if (node.right !== null) Q.push(node.right);
      }
    }
    return false;
  };
  return bfs(root, subRoot);
};
