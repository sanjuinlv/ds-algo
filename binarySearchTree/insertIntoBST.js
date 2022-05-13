/* 
You are given the root node of a binary search tree (BST) and a value to insert into the tree. 
Return the root node of the BST after the insertion. It is guaranteed that the new value does not
exist in the original BST.
Notice that there may exist multiple valid ways for the insertion, as long as the tree remains a BST
after insertion. You can return any of them.

Example 2:

Input: root = [40,20,60,10,30,50,70], val = 25
Output: [40,20,60,10,30,50,70,null,null,25]

Example 3:

Input: root = [4,2,7,1,3,null,null,null,null,null,null], val = 5
Output: [4,2,7,1,3,5]

Constraints:

  *  The number of nodes in the tree will be in the range [0, 104].
  *  -10^8 <= Node.val <= 10^8
  *  All the values Node.val are unique.
  *  -10^8 <= val <= 10^8
  *  It's guaranteed that val does not exist in the original BST.

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
 * @param {number} val
 * @return {TreeNode}
 */
/* 
Approach 1: Recursive
Runtime: 200 ms, faster than 10.55% of JavaScript online submissions for Insert into a Binary Search Tree.
Memory Usage: 52.8 MB, less than 47.69% of JavaScript online submissions for Insert into a Binary Search Tree.
*/
var insertIntoBST = function (root, val) {
  if (root === null) return new TreeNode(val);
  if (val < root.val) root.left = insertIntoBST(root.left, val);
  else root.right = insertIntoBST(root.right, val);
  return root;
};

/* 
Approach 1: Iterative
Runtime: 171 ms, faster than 28.03% of JavaScript online submissions for Insert into a Binary Search Tree.
Memory Usage: 53.1 MB, less than 34.97% of JavaScript online submissions for Insert into a Binary Search Tree.
*/

var insertIntoBST = function (root, val) {
  if (root === null) return new TreeNode(val);
  let node = root;
  //This will help us to find right leaf node when node becomes null
  let prev = null;
  while (node != null) {
    prev = node;
    if (val < node.val) node = node.left;
    else node = node.right;
  }
  if (val < prev.val) prev.left = new TreeNode(val);
  else prev.right = new TreeNode(val);

  return root;
};
