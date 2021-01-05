/* 
Type: Medium

Given the root of a binary tree, determine if it is a valid binary search tree (BST).
A valid BST is defined as follows:

    The left subtree of a node contains only nodes with keys less than the node's key.
    The right subtree of a node contains only nodes with keys greater than the node's key.
    Both the left and right subtrees must also be binary search trees.

Example:
Input: root = [2,1,3]
Output: true

Example:
Input: root = [5,1,4,null,null,3,6]
Output: false
Explanation: The root node's value is 5 but its right child's value is 4.

Constraint:

    The number of nodes in the tree is in the range [1, 10^4].
    -2^31 <= Node.val <= 2^31 - 1

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
 * @return {boolean}
 */
// can we do iterative version
// Fails for input: [-1,-4,0,-5,-3,-3]
// fails for [2,1,3,1, null]
var isValidBST = function(root) {
    const findMax = (node) => {
        if (node == null) return null;
        if (node.right == null) return node.val;
        return findMax(node.right);
    }
    const findMin = (node) => {
        if (node == null) return null;
        if (node.left == null) return node.val;
        return findMax(node.left);
    }
    if (root == null) return true;
    console.log(`root node val: ${root.val}`);   
    if (root.left != null){
        console.log(`max of ${root.left.val}: ${findMax(root.left)}`);   
    }
    //if max of left node is greater than root node then its no BST
    if (root.left != null && root.val <= findMax(root.left)) return false;
    if (root.right != null){
        console.log(`min of ${root.right.val}: ${findMin(root.right)}`);   
    }
    //if min of right node is less than root node then its no BST
    if (root.right != null &&  root.val >= findMin(root.right)) return false;
    console.log(`checking for letf and right recursively node`);
    // recursively, if left or right node is not BST then return false
    if (!isValidBST(root.left) || !isValidBST(root.right)) return false;
    return true;
};

// for submission
// Time complexity O(N^2) (Since we may visit each node twice to find max/min)
// Space complexity O(N)
var isValidBST = function(root) {
    const findMax = (node) => {
        if (node == null) return null;
        if (node.right == null) return node.val;
        return findMax(node.right);
    }
    const findMin = (node) => {
        if (node == null) return null;
        if (node.left == null) return node.val;
        return findMax(node.left);
    }
    if (root == null) return true;
    //if max of left node is greater than root node then its no BST
    if (root.left != null && root.val <= findMax(root.left)) return false;
    //if min of right node is less than root node then its no BST
    if (root.right != null &&  root.val >= findMin(root.right)) return false;
    // recursively, if left or right node is not BST then return false
    if (!isValidBST(root.left) || !isValidBST(root.right)) return false;
    return true;
};

// We can do improvement by storing the max and min 
// Time complexity: O(N), Since we visit each node only once
// Space complexity: O(N), Since we keep up to the entire tree
var isValidBST = function(root) {
    const helper = (node, min, max) => {
        if (node == null ) return true;
        const nodeVal = node.val;
        //current node should be greater than the min val & less than max
        if (min != null && nodeVal <= min) return false;
        if (max != null && nodeVal >= max) return false;
        //check left & right node recursively
        // left node should be between min and current node value
        if (!helper(node.left, min, nodeVal)) return false;
        // right node should be between current node val and max
        if (!helper(node.right, nodeVal, max)) return false;
        return true;
    };
    return helper(root, null, null);
};

// Using Inorder Traversal
// The idea behind this solution is that, inorder traversal of BST produces sorted 
// list. So while doing the inorder travesrsal, check at each node that the current 
// node value is greater than previous node value
// [-1,-4,0,-5,-3,-3]  - PASS
// [2,1,3,1,null]      - PASS
// [5,1,4,null,null,3,6] - PASS
// [0] - FAILS
/* 
Runtime: 88 ms
Memory Usage: 42.8 MB
Your runtime beats 74.19 % of javascript submissions.
*/
var isValidBST = function(root) {
    let prev = -Number.MAX_VALUE;
    const isBST = (node) => {
        if (node == null) return true;
        if (!isBST(node.left)) return false;
        if (node.val <= prev) return false;
        prev = node.val;
        return isBST(node.right);
    }
    return isBST(root);
}

// 2nd Try
/* 
Approach: recursive
[4,1,6,null,null,5,7] - PASS
[-4,-5,-1,null,null,-3,-1] - FAILS
*/
//Tis fails as any one of the sub-tree might not be BST
// This solution takes care only at root, left & right sub-tree comparision
var isValidBST = function(root) {
    if (root == null) return false;
    //max of the left tree should be smaller than root
    //min of the right tree should be bigger than root
    const minOfNode = (node) => {
        //this will fail for -ve node values
        const min = Number.MAX_VALUE;
        if (node == null) return min;        
        console.log(`node: ${node.val}`)
        return Math.min(node.val, Math.min(minOfNode(node.left), minOfNode(node.right)));
    }
    const maxOfNode = (node) => {
        const max = - Number.MAX_VALUE;
        if (node == null) return max;
        console.log(`node: ${node.val}`)
        Math.max(node.val, Math.max(maxOfNode(node.left), maxOfNode(node.right)));
    }

    let leftMax = maxOfNode(root.left);
    let rightMin = minOfNode(root.right);
    console.log(`root: ${root.val}, left max: ${leftMax}, right min: ${rightMin}`);
    if ((root.val > leftMax) && (root.val < rightMin)){
        return true;
    }
    return false;
}

/*
Recursiv solution (3-Jan-2021)
[4,1,6,null,null,5,7] - PASS
[-4,-5,-1,null,null,-3,-1] - PASS

Runtime: 88 ms, faster than 76.88% of JavaScript online submissions for Validate Binary Search Tree.
Memory Usage: 42.8 MB, less than 45.26% of JavaScript online submissions for Validate Binary Search Tree.
 */
var isValidBST = function(root) { 
    //recursively validate left and right sub-tree
    const isBST = (node, min, max) => {
        if (node == null) return true;
        if (min != null && node.val <= min) return false;
        if (max != null && node.val >= max) return false;
        //now recusively check left and right sub-tree
        if (!isBST(node.left, min, node.val)) return false;
        if (!isBST(node.right, node.val, max)) return false;
        return true;
    }
    return isBST(root, null, null)
}


/* 
Using inorder traversal
Time complexity: O(N)
Space complexity: O(N)

Runtime: 92 ms, faster than 55.28% of JavaScript online submissions for Validate Binary Search Tree.
Memory Usage: 43 MB, less than 27.93% of JavaScript online submissions for Validate Binary Search Tree.

*/
var isValidBST = function(root) { 
    let prev = null;
    const isBST = (node) => {
        if (node == null) return true;
        if (!isBST(node.left)) return false;
        if (prev != null && node.val <= prev) return false;
        prev = node.val;
        return isBST(node.right);
    }
    return isBST(root);
}
//we can do iterative In order which will have same Time & Space complexity and 