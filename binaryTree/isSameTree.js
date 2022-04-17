/* 
Given the roots of two binary trees p and q, write a function to check if they are the same or not.

Two binary trees are considered the same if they are structurally identical,
 and the nodes have the same value.
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

Runtime: 66 ms, faster than 76.36% of JavaScript online submissions for Same Tree.
Memory Usage: 42.6 MB, less than 35.21% of JavaScript online submissions for Same Tree.
*/
var isSameTree = function (p, q) {
  const isSame = (node1, node2) => {
    if (node1 == null && node2 == null) return true;
    if (node1 == null || node2 == null) return false;
    if (node1.val != node2.val) return false;
    return isSame(node1.left, node2.left) && isSame(node1.right, node2.right);
  };
  return isSame(p, q);
};

/*
Approach: Iterative (Stack-DFS)
Time: O(N)
Space: O(log(N)) in the best case of completely balanced tree and O(N) in the worst case
 of completely unbalanced tree, to keep a stack.

Runtime: 64 ms, faster than 83.78% of JavaScript online submissions for Same Tree.
Memory Usage: 42.1 MB, less than 77.05% of JavaScript online submissions for Sam
 */
var isSameTree = function (p, q) {
  const stack1 = [];
  const stack2 = [];
  stack1.push(p);
  stack2.push(q);
  while (stack1.length && stack2.length) {
    p = stack1.pop();
    q = stack2.pop();
    if (p === null && q === null) continue;
    if (p === null || q === null) return false;
    if (p.val != q.val) return false;
    stack1.push(p.right);
    stack1.push(p.left);
    stack2.push(q.right);
    stack2.push(q.left);
  }
  return true;
};

/* 
Approach: Iterative (Stack-DFS)
Using single stack
Runtime: 64 ms, faster than 83.47% of JavaScript online submissions for Same Tree.
Memory Usage: 42.7 MB, less than 19.96% of JavaScript online submissions for Same Tree.
*/
var isSameTree = function (p, q) {
  const stack = [];
  stack.push(p);
  stack.push(q);
  while (stack.length) {
    p = stack.pop();
    q = stack.pop();
    if (p === null && q === null) continue;
    if (p === null || q === null) return false;
    if (p.val != q.val) return false;
    stack.push(p.right);
    stack.push(q.right);
    stack.push(p.left);
    stack.push(q.left);
  }
  return true;
};
