/* 
235. Lowest Common Ancestor of a Binary Search Tree
https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-search-tree
TYpe: Medium

Given a binary search tree (BST), find the lowest common ancestor (LCA) of two given nodes in the BST.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

Example 1:
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 8
Output: 6
Explanation: The LCA of nodes 2 and 8 is 6.

Example 2:
Input: root = [6,2,8,0,4,7,9,null,null,3,5], p = 2, q = 4
Output: 2
Explanation: The LCA of nodes 2 and 4 is 2, since a node can be a descendant of itself according to the
LCA definition.

Example 3:
Input: root = [2,1], p = 2, q = 1
Output: 2

Constraint: 
 - The number of nodes in the tree is in the range [2, 10^5].
 - -10^9 <= Node.val <= 10^9
 - All Node.val are unique.
 - p != q
 - p and q will exist in the BST.
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
/*
Approach I: Recursive (using binary tree approach)
Time: O(N) worst case tree height will be N
Space: O(N) for skewed BST treeRuntime: 92 ms, faster than 76.16% of JavaScript online submissions for Lowest Common Ancestor of a Binary Search Tree.
Memory Usage: 52.4 MB, less than 38.00% of JavaScript online submissions for Lowest Common Ancestor of a Binary Search Tree.
 */
var lowestCommonAncestor = function (root, p, q) {
  if (root === null) return null;
  if (root === p || root === q) return root;
  const left = lowestCommonAncestor(root.left, p, q);
  const right = lowestCommonAncestor(root.right, p, q);
  if (left && right) return root;
  return left !== null ? left : right;
};

/*
Approach II: Recursive (using BST property)
Time: O(N) worst case tree height will be N
Space: O(N) for skewed BST tree

Runtime: 49 ms Beats 95.35%
Memory Usage: 65.42 MB Beats 56.50%
*/
var lowestCommonAncestor = function (root, p, q) {
  if (root == null) return null;
  //both node p & q are at left side of the tree
  if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q);
  } else if (p.val > root.val && q.val > root.val) {
    //both nodes p & q are in right side of the tree
    return lowestCommonAncestor(root.right, p, q);
  } else {
    //p and q is in left and right side of the tree, so root will be LCA
    return root;
  }
};

/*
Approach III: Iterative 
Time: O(N) worst case tree height will be N
Space: O(1) 
Note: We don't need to use stack for this

Runtime: 62 ms Beats 50.17%
Memory Usage: 64.97 MB Beats 87.20%
*/
var lowestCommonAncestor = function (root, p, q) {
  if (root == null) return root;
  while (root != null) {
    //both nodes p & q are left side of the tree
    if (root.val > p.val && root.val > q.val) {
      root = root.left;
    } else if (root.val < p.val && root.val < q.val) {
      //both nodes p & q are in right side of the tree
      root = root.right;
    } else {
      //p and q are in left and right side of the tree, so root will be LCA
      return root;
    }
  }
  return null;
};
