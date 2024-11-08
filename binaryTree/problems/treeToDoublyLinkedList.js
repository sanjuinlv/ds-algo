/*
426. Convert Binary Search Tree to Sorted Doubly Linked List
https://leetcode.com/problems/convert-binary-search-tree-to-sorted-doubly-linked-list/
Type: Medium

Convert a Binary Search Tree to a sorted Circular Doubly-Linked List in place.

You can think of the left and right pointers as synonymous to the predecessor and 
successor pointers in a doubly-linked list. For a circular doubly linked list, 
the predecessor of the first element is the last element, and the successor of the 
last element is the first element.

We want to do the transformation in place. After the transformation, the left pointer 
of the tree node should point to its predecessor, and the right pointer should point
to its successor. You should return the pointer to the smallest element of the linked list.

Example 1: 
         4
        /  \
       2    5
      / \
     1   3
Input: root = [4,2,5,1,3]
Output: [1,2,3,4,5]
Explanation: The figure below shows the transformed BST. The solid line indicates the successor relationship, while the dashed line means the predecessor relationship.

Example 2:
Input: root = [2,1,3]
Output: [1,2,3]

Constraints:
 - The number of nodes in the tree is in the range [0, 2000].
 - -1000 <= Node.val <= 1000
 - All the values of the tree are unique.

*/
/**
 * // Definition for a Node.
 * function Node(val, left, right) {
 *      this.val = val;
 *      this.left = left;
 *      this.right = right;
 *  };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
//Approach
// we can do pre-order travesral to get the sorted list
// left-subtree traversal
// root node
// right-subtree traversal
  // 1. left node becomes node and its right node is root
  // and left node is root's right node 
  // 2. root's left and right point remains same
  // 3. right node's left pointer will be root and right node pointer will be left node
  // return root node (smallest element)
//[2,1,4,null,null,3,6,null,null,5] -  FAILS
var treeToDoublyList = function(root) {
    if (root == null) return root;
    const helper = (node) => {
        // what to return
        if (node == null) return null;
        const left = treeToDoublyList(node.left);
        console.log(`root node val: ${node.val}`);
        let leftTail;
        if (left){
            console.log(`left: ${left.val}`);
            leftTail = left.left ? left.left : left;
            leftTail.right = root;
            root.left = leftTail;
        } else {
            console.log(`left node is null`);
            root.left = root;
        }
        
        const right = treeToDoublyList(node.right);
        let rightTail;
        if (right) {
            console.log(`right: ${right.val}`);
            rightTail = right.left? right.left: right;
            rightTail.left = root;
            root.right = rightTail;
            right.right = left ? left: root;
            if (left) {
                left.left = right;                
            } else {
                root.left = right;
            }
        } else {
            console.log(`right node is null`);
            root.right = left ? left: root;
            if (left) left.left = root;
        }
        return left ? left : root;
    }
    root = helper(root);
    return root;
};

/* 
[2,1,4,null,null,3,6,null,null,5] -  FAILS
*/
//Solution reference
/* 
Runtime: 80 ms, faster than 80.84% of JavaScript online submissions for Convert Binary Search Tree to Sorted Doubly Linked List.
Memory Usage: 40.4 MB, less than 47.08% of JavaScript online submissions for Convert Binary Search Tree to Sorted Doubly Linked List.
*/
var treeToDoublyList = function(root) {
    if (root == null) return root;
    let first, last;
    const helper = (node) => {
        if (node == null) return;
        //traverse left sub-tree
        helper(node.left);
        //node
        if (last != null) {
            // link the previous node (last)
            // with the current one (node)            
            last.right = node;
            node.left = last;
        } else {
            //Keep the smallest node to close the DLL later
            first = node;
        }
        last = node;
        //traverse left sub-tree
        helper(node.right);
    }
    helper(root);
    //close DDL
    first.left = last;
    last.right = first;
    return first;
};

/* 
InOrder TRaversal
Runtime: 56 ms Beats 70.67%
Space: 50.65 MB Beats 93.37%
 */
var treeToDoublyList = function (root) {
    if (root == null) return root;
    const dummy = new _Node();
    //prev will work as tail which keeps moving on every node visit
    let prev = dummy;
    const inOrder = (curr) => {
      if (curr == null) return;
      inOrder(curr.left);
      prev.right = curr;
      curr.left = prev;
      prev = curr;
      inOrder(curr.right);
    };
    inOrder(root);
    //connect head and tail, where head is dummy and tail is prev
    //tail's right is head
    prev.right = dummy.right;
    //head's (dummy.right) left is tail
    dummy.right.left = prev;
    return dummy.right;
  };
  