/* 
100. Same Tree
https://leetcode.com/problems/same-tree
Type: Easy

Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.
    1       
   / \
  2   3
    1
   / \
  2   3

Input: p = [1,2,3], q = [1,2,3]
Output: true

Input: p = [1,2], q = [1,null,2]
Output: false

Input: p = [1,2,1], q = [1,1,2]
Output: false

Constraint:
The number of nodes in both trees is in the range [0, 100].
-104 <= Node.val <= 104
  
*/
/* 
Approach: Recursive
Time: O(N)
Space: O(log(N)) in the best case of completely balanced tree and O(N) in the worst case 
of completely unbalanced tree, to keep a recursion stack.

Runtime: 61 ms Beats 13.46%
Memory Usage: 49.03 MB Beats 69.58%
*/
var isSameTree = function (p, q) {
  if (p == null && q == null) return true;
  if (p == null || q == null) return false;
  if (p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};

/*
Approach II: Iterative (Stack-DFS)
Time: O(N)
Space: O(log(N)) in the best case of completely balanced tree and O(N) in the worst case of completely unbalanced tree, to keep a stack.

Runtime: 48 ms Beats 80.64%
Memory Usage: 48.99 MB Beats 78.85%
 */
var isSameTree = function (p, q) {
  const stack = [];
  stack.push([p, q]);
  while (stack.length) {
    const [p, q] = stack.pop();
    if (p == null && q == null) continue;
    if (p == null || q == null) return false;
    if (p.val !== q.val) return false;
    stack.push([p.left, q.left]);
    stack.push([p.right, q.right]);
  }
  return true;
};
