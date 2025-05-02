/* 
105. Construct Binary Tree from Preorder and Inorder Traversal
https://leetcode.com/problems/construct-binary-tree-from-preorder-and-inorder-traversal
Type: Medium

Given two integer arrays preorder and inorder where preorder is the preorder traversal
of a binary tree and inorder is the inorder traversal of the same tree, construct and
return the binary tree.
       3
      / \
     9  20
        / \ 
       15  7 

Example 1:
Input: preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
Output: [3,9,20,null,null,15,7]

Example 2:
Input: preorder = [-1], inorder = [-1]
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
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
/* 
Time Complexity: O(N) - Building Map takes O(N) time, as there are N nodes
Building tree also takes O(N) time.
Space: O(N) - Building the hashmap and storing the entire tree each requires O(N) memory. The size of the 
implicit system stack used by recursion calls depends on the height of the tree, which is O(N)
in the worst case and O(logN) on average. Taking both into consideration, the space complexity is O(N).

Runtime: 3 ms Beats 73.85%
Memory Usage: 57.95 MB Beats 95.83%
*/
var buildTree = function (preorder, inorder) {
  const N = preorder.length;
  const helper = (left, right) => {
    //if left crosses right then we are done with all elements
    if (left > right) return null;
    const root = new TreeNode(preorder.shift());
    //from 'left' till this root's (index - 1) will be left subtree of root
    root.left = helper(left, inOrderIndexMap.get(root.val) - 1);
    //from this root's (index + 1) till 'right' will be right subtree of root
    root.right = helper(inOrderIndexMap.get(root.val) + 1, right);
    return root;
  };
  const inOrderIndexMap = new Map();
  for (let i = 0; i < N; i++) inOrderIndexMap.set(inorder[i], i);
  return helper(0, N - 1);
};
