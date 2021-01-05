/* 
Given a binary tree, flatten it to a linked list in-place.
    1
   / \
  2   5
 / \   \
3   4   6

to
1
 \
  2
   \
    3
     \
      4
       \
        5
         \
          6
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
 * @return {void} Do not return anything, modify root in-place instead.
 */
//Approach 
/* 
Pre-Order traversal
1) visit the tree in Inorder traversal
2) flatten the left sub-tree
3) flatten the right sub-tree
4) assign the right sub-tree as child node of last node of left sub-tree
*/
/* 
Time Complexity: O(N)
Space Complexity: O(N) (occupied by the recursion stack)
Runtime: 88 ms, faster than 88.56% of JavaScript online submissions for Flatten Binary Tree to Linked List.
Memory Usage: 40.4 MB, less than 85.69% of JavaScript online submissions for Flatten Binary Tree to Linked List.
*/
var flatten = function(root) {
    // Handle the null scenario
    if (root == null) return null;            
    // For a leaf node, we simply return the
    // node as is.
    if (root.left == null && root.right == null) return root;

    let leftTail = flatten(root.left);
    let rightTail = flatten(root.right);
    if (leftTail != null) {
        leftTail.right = rightTail;
        root.right = root.left;
        root.left = null;
    }
    return rightTail == null ? leftTail: rightTail;
};

// Approach 2
// Greedy 
// Time complexity: O(N)
// Space complexity: O(1)
var flatten = function(root) {
    //handle the null node
    if (root == null) return;
    let node = root;
    while(node != null){
        //if the node has a left child
        if (node.left != null){        
            //find the rightmost node
            let rightMost = node.left;
            while(rightMost.right != null){
                rightMost = rightMost.right;
            }
            //rewire the connection
            rightMost.right = node.right;
            node.right = node.left;
            node.left = null;
        }
        //move on to the right side of the tree
        node = node.right;
    }
}
