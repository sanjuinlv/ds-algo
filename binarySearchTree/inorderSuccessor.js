/* 
Given the root of a binary search tree and a node p in it, return the in-order successor of that node
 in the BST. If the given node has no in-order successor in the tree, return null.
The successor of a node p is the node with the smallest key greater than p.val.

Example 1:
     2 
   /   \
  1     3 
Input: root = [2,1,3], p = 1
Output: 2
Explanation: 1's in-order successor node is 2. Note that both p and the return value is of TreeNode type.

Example 2:
          5
        /   \
       3     6
      / \  
     2   4
    /
   1
Input: root = [5,3,6,2,4,null,null,1], p = 6
Output: null
Explanation: There is no in-order successor of the current node, so the answer is null.

Constraints: 
The number of nodes in the tree is in the range [1, 104].
-105 <= Node.val <= 105
All Nodes will have unique values.

*/
/* 
Approach 1: Using BST properties (Recursive)
Runtime: 150 ms, faster than 8.33% of JavaScript online submissions for Inorder Successor in BST.
Memory Usage: 51.6 MB, less than 97.14% of JavaScript online submissions for Inorder Successor in BST.
*/
var inorderSuccessor = function (root, p) {
  const findMin = (node) => {
    if (node == null) null;
    if (node.left == null) return node;
    return findMin(node.left);
  };
  let prev = null;
  const findInBST = (node, p) => {
    if (node == null) return null;
    if (node === p) {
      if (node.right) return findMin(node.right);
      else {
        return prev;
      }
    }
    if (p.val < node.val) {
      prev = node;
      return findInBST(node.left, p);
    } else {
      return findInBST(node.right, p);
    }
  };
  return findInBST(root, p);
};

/* 
Approach 2: Recursive Better code
Runtime: 157 ms, faster than 6.51% of JavaScript online submissions for Inorder Successor in BST.
Memory Usage: 52.5 MB, less than 18.23% of JavaScript online submissions for Inorder Successor in BST.
*/
var inorderSuccessor = function (root, p) {
  if (root == null) return null;
  if (p.val >= root.val) {
    return inorderSuccessor(root.right, p);
  } else {
    const left = inorderSuccessor(root.left, p);
    return left !== null ? left : root;
  }
};

/* 
Approach 3: Using BST properties (Iterative)
Time: O(N)
Space: O(1)

Runtime: 181 ms, faster than 5.21% of JavaScript online submissions for Inorder Successor in BST.
Memory Usage: 52.2 MB, less than 41.15% of JavaScript online submissions for Inorder Successor in BST.

*/
var inorderSuccessor = function (root, p) {
  if (root === null) return null;
  let successor = null;
  while (root != null) {
    if (p.val >= root.val) {
      root = root.right;
    } else {
      successor = root;
      root = root.left;
    }
  }
  return successor;
};

/* 
Approach 4: Iterative solution irrespective of valid BST or not
This solution can work well for tree as well

Runtime: 82 ms, faster than 92.19% of JavaScript online submissions for Inorder Successor in BST.
Memory Usage: 52.1 MB, less than 53.91% of JavaScript online submissions for Inorder Successor in BST.
*/
var inorderSuccessor = function (root, p) {
  const stack = [];
  let found = false;
  while (true) {
    while (root != null) {
      stack.push(root);
      root = root.left;
    }
    if (stack.length == 0) break;
    root = stack.pop();
    if (found) return root;
    if (root.val === p.val) found = true;
    root = root.right;
  }
  return null;
};

//Predecessor
var inorderPredecessor = function (root, p) {
  if (root == null) return null;
  if (p.val <= root.val) {
    return inorderPredecessor(root.left, p);
  } else {
    const right = inorderPredecessor(root.right, p);
    return right !== null ? right : root;
  }
};
