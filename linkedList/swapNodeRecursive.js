/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * using recursion
 * Time Complexity: O(N) where NN is the size of the linked list.
 * Space Complexity: O(N) stack space utilized for recursion
 * 
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
    if (head == null || head.next == null) return head;
    const leftNode = head, rightNode = head.next;
    leftNode.next = rightNode.next ? rightNode.next : null;
    rightNode.next = leftNode;
    head = rightNode;
    if (head.next && head.next.next) {
        head.next.next = swapPairs(head.next.next);
    }
    return head;
};
// Result =>
/*
    Runtime: 60 ms, faster than 28.91% of JavaScript online submissions for Swap Nodes in Pairs.
    Memory Usage: 34 MB, less than 5.26% of JavaScript online submissions for Swap Nodes in Pairs.
*/

// Solution given 
var swapPairs = function (head) {
    if (head == null || head.next == null) return head;
    const firstNode = head;
    const secondNode = head.next;
    firstNode.next = swapPairs(secondNode.next);
    secondNode.next = firstNode;
    return secondNode;
};
// Result ==>
/*
    Runtime: 56 ms, faster than 57.95% of JavaScript online submissions for Swap Nodes in Pairs.
    Memory Usage: 33.9 MB, less than 15.79% of JavaScript online submissions for Swap Nodes in Pairs.
*/
//Iterative
/*
    Time Complexity : O(N) where N is the size of the linked list.
    Space Complexity : O(1)
*/
var swapPairs = function (head) {
    if (head == null || head.next == null) return head;
    const dummy = { next: head };
    let firstNode, secondNode, prevNode = dummy;
    while (head && head.next) {
        //left & right node
        firstNode = head;
        secondNode = firstNode.next;
        //swap nodes
        firstNode.next = secondNode.next;
        secondNode.next = firstNode;
        //this ensures that after swapping last swapped pointer is pointing to updated node
        prevNode.next = secondNode;
        // node for next iteration
        head = firstNode.next;
        prevNode = firstNode;
    }
    return dummy.next;
};