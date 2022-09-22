/* 
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
    1 <= preorder.length <= 3000
    inorder.length == preorder.length
    -3000 <= preorder[i], inorder[i] <= 3000
    preorder and inorder consist of unique values.
    Each value of inorder also appears in preorder.
    preorder is guaranteed to be the preorder traversal of the tree.
    inorder is guaranteed to be the inorder traversal of the tree.

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
Time Complexity: O(N)
Building Map takes O(N) time, as there are N nodes
Building tree also takes O(N) time.
Space: O(N)
Building the hashmap and storing the entire tree each requires O(N) memory. The size of the 
implicit system stack used by recursion calls depends on the height of the tree, which is O(N)
in the worst case and O(logN) on average. Taking both into consideration, the space complexity is O(N).

Runtime: 110 ms, faster than 69.98% of JavaScript online submissions for Construct Binary Tree from Preorder and Inorder Traversal.
Memory Usage: 45.6 MB, less than 58.23% of JavaScript online submissions for Construct Binary Tree from Preorder and Inorder Traversal.
*/
var buildTree = function (preorder, inorder) {
  const arrayToTree = (preOrder, left, right) => {
    //no elements to construct the tree
    if (left > right) return null;
    // select the preorder_index element as the root and increment it
    const rootValue = preOrder[preOrderIndex++];
    const root = new TreeNode(rootValue);
    // build left and right subtree
    // excluding inOrderIndexMap[rootValue] element because it's the root
    root.left = arrayToTree(preOrder, left, inOrderIndexMap.get(rootValue) - 1);
    root.right = arrayToTree(
      preOrder,
      inOrderIndexMap.get(rootValue) + 1,
      right
    );
    return root;
  };
  // build a hashmap to store value and it's index relations
  const inOrderIndexMap = new Map();
  for (let i = 0; i < inorder.length; i++) {
    inOrderIndexMap.set(inorder[i], i);
  }
  let preOrderIndex = 0;
  return arrayToTree(preorder, 0, preorder.length - 1);
};
