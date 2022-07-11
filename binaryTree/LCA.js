/*
Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.
According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined
between two nodes p and q as the lowest node in T that has both p and q as descendants
(where we allow a node to be a descendant of itself).”

        3
      /   \
     5     1
    / \   / \
   6   2 0   8
      / \
     7   4 
  
Example 1:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.

Example 2:
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5, since a node can be a descendant of itself according
to the LCA definition.

Example 3:
Input: root = [1,2], p = 1, q = 2
Output: 1

Constraints:

The number of nodes in the tree is in the range [2, 10^5].
-10^9 <= Node.val <= 10^9
All Node.val are unique.
p != q
p and q will exist in the tree.
*/

/*
Approach 1:
1. Find a path from the root to n1 and store it in a vector or array. 
2. Find a path from the root to n2 and store it in another vector or array
3. Traverse both paths till the values in arrays are the same. Return the common
 element just before the mismatch
*/

/* 
Approach : Recursive
Your runtime beats 34.16 % of javascript submissions.
Runtime: 104 ms
Memory Usage: 48.2 MB
*/
var lowestCommonAncestor = function (root, p, q) {
  if (root == null) return null;
  const LCA = (node, p, q) => {
    if (node == null) return null;
    //if any of the p and q matches root then, root is LCA
    if (node == p || node === q) return node;
    //find recursively the left child LCA
    const leftLCA = LCA(node.left, p, q);
    //find recursively the right child LCA
    const rightLCA = LCA(node.right, p, q);
    if (leftLCA && rightLCA) return node;
    return leftLCA ? leftLCA : rightLCA;
  };
  return LCA(root, p, q);
};

//without using inner helper method
var lowestCommonAncestor = function (root, p, q) {
  if (root == null) return null;
  //if current node matched any of the p, q then current node is LCA
  if (root === p || root == q) return root;
  const leftLCA = lowestCommonAncestor(root.left, p, q);
  const rightLCA = lowestCommonAncestor(root.left, p, q);
  //if both left and right is under this node then this is LCA
  if (leftLCA && rightLCA) return root;
  return leftLCA ? leftLCA : rightLCA;
};

/* 
Approach II: Iterative using parent pointers
Time: O(N)
Space: O(N)
Runtime: 105 ms, faster than 70.07% of JavaScript online submissions for Lowest Common Ancestor of a Binary Tree.
Memory Usage: 51.4 MB, less than 89.73% of JavaScript online submissions for Lowest Common Ancestor of a Binary Tree.
*/
var lowestCommonAncestor = function (root, p, q) {
  if (root == null) return null;
  const stack = [];
  const parent = new Map();
  stack.push(root);
  parent.set(root, null);
  // Iterate until we find both the nodes p and q
  while (!parent.has(p) || !parent.has(q)) {
    const node = stack.pop();
    if (node.left) {
      stack.push(node.left);
      // While traversing the tree, keep saving the parent pointers.
      parent.set(node.left, node);
    }
    if (node.right) {
      stack.push(node.right);
      parent.set(node.right, node);
    }
  }
  // Ancestors set() for node p.
  const ancestorsSet = new Set();
  while (p != null) {
    ancestorsSet.add(p);
    p = parent.get(p);
  }
  // The first ancestor of q which appears in
  // p's ancestor set() is their lowest common ancestor.
  while (!ancestorsSet.has(q)) {
    q = parent.get(q);
  }
  return q;
};
