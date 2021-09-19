/* 
Given the root of a binary tree, return the postorder traversal of its nodes' values.

Type: Medium

Input: root = [1,null,2,3]
Output: [3,2,1]

Input: root = []
Output: []

Input: root = [1]
Output: [1]

Input: root = [1,2,3,4,5,6,7]
Output: [4,5,2,6,7,3,1]
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
 * @return {number[]}
 */
/* 
Approach: Recursive
*/
var postorderTraversal = function(root) {
    const result = [];
    const postOrder = (node) => {
        if (node == null) return;
        postOrder(node.left);
        postOrder(node.right);
        result.push(node.val)
    }
    postOrder(root);
    return result;
};

/* 
Approach: Recursive

Runtime: 76 ms, faster than 80.80% of JavaScript online submissions for Binary Tree Postorder Traversal.
Memory Usage: 39.1 MB, less than 13.93% of JavaScript online submissions for Binary Tree Postorder Traversal.
*/
var postorderTraversal = function(root) {
    const result = [];
    if (root == null) return result;
    const stack1 = [];
    const stack2 = [];
    stack1.push(root);
    while(stack1.length != 0){
        root = stack1.pop();
        stack2.push(root.val);
        if (root.left) stack1.push(root.left);
        if (root.right) stack1.push(root.right);
    }
    while(stack2.length != 0){
        result.push(stack2.pop());
    }
    return result;
};
