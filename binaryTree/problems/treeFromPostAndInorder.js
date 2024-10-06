/* 
106. Construct Binary Tree from Inorder and Postorder
https://leetcode.com/problems/construct-binary-tree-from-inorder-and-postorder-traversal
Type: Medium

Given two integer arrays inorder and postorder where inorder is the inorder traversal of a 
binary tree and postorder is the postorder traversal of the same tree, construct and return
the binary tree.

    3 
   / \
  9  20
    /  \
   15   7  
Example 1:
Input: inorder = [9,3,15,20,7], postorder = [9,15,7,20,3]
Output: [3,9,20,null,null,15,7]

Example 2:
Input: inorder = [-1], postorder = [-1]
Output: [-1]

Constraints:
 - 1 <= preorder.length <= 3000
 - inorder.length == preorder.length
 - -3000 <= preorder[i], inorder[i] <= 3000
 - preorder and inorder consist of unique values.
 - Each value of inorder also appears in preorder.
 - preorder is guaranteed to be the preorder traversal of the tree.
 - inorder is guaranteed to be the inorder traversal of the tree.

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
 * @param {number[]} inorder
 * @param {number[]} postorder
 * @return {TreeNode}
 */
/* 
Approach: Recursion 

Time: O(N). Let's compute the solution with the help of master theorem T(N)=aT(b/N​)+Θ(N^d). The equation represents dividing the problem up into a subproblems of size N/b​ in Θ(N^d) time. Here one divides the problem into two subproblems a = 2, the size of each subproblem (to compute the left and right subtree) is half of the initial problem b = 2, and all this happens in a constant time d = 0. That means that logb​(a)>d and hence we're dealing with case 1 that means O(N^logb​(a))=O(N) time complexity.
Space: O(N), since we store the entire tree.

Runtime: 69 ms Beats 93.81%
Memory Usage: 55.04 MB Beats 60.99%
*/
var buildTree = function (inorder, postorder) {
  const N = inorder.length;
  const arrayToTree = (left, right) => {
    if (left > right) return null;
    const rootValue = postorder[postOrderIndex--];
    const root = new TreeNode(rootValue);
    root.right = arrayToTree(inOrderIndexMap.get(rootValue) + 1, right);
    root.left = arrayToTree(left, inOrderIndexMap.get(rootValue) - 1);
    return root;
  };
  const inOrderIndexMap = new Map();
  for (let i = 0; i < N; i++) {
    inOrderIndexMap.set(inorder[i], i);
  }
  let postOrderIndex = N - 1;
  return arrayToTree(0, postOrderIndex);
};

/* 
Without using postorder pointer, instead using pop()
Runtime: 74 ms Beats 84.83%
Memory Usage: 54.46 MB Beats 68.72%
*/
var buildTree = function (inorder, postorder) {
  const N = inorder.length;
  const arrayToTree = (left, right) => {
    if (left > right) return null;
    const root = new TreeNode(postorder.pop());
    const preOrderIndex = inOrderIndexMap.get(root.val);
    root.right = arrayToTree(preOrderIndex + 1, right);
    root.left = arrayToTree(left, preOrderIndex - 1);
    return root;
  };
  const inOrderIndexMap = new Map();
  for (let i = 0; i < N; i++) {
    inOrderIndexMap.set(inorder[i], i);
  }
  return arrayToTree(0, N - 1);
};
