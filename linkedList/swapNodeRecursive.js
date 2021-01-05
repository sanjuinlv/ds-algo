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

/************** Approach 2: Using recursion *********/
//my solution. But not clean code
var swapPairs = function (head) {
    if (head == null || head.next == null) return head;
    const firstNode = head;
    const secondNode = head.next;
    let rightNext = secondNode.next;
    secondNode.next = firstNode; //swap
    firstNode.next = rightNext.next;

    console.log(`firstNode: ${JSON.stringify(firstNode)}`);
    console.log(`secondNode: ${JSON.stringify(secondNode)}`);
    console.log(`rigthNext: ${JSON.stringify(rightNext)}`);

    while (rightNext && rightNext.next) {
        let A = rightNext;
        let B = rightNext.next;
        rightNext = B.next;
        B.next = A; // swap
        A.next = rightNext;
        console.log(`B: ${JSON.stringify(B)}`);
        console.log(`A: ${JSON.stringify(A)}`);
        console.log(`rightNext: ${JSON.stringify(rightNext)}`);
    }
    console.log(`secondNode: ${JSON.stringify(secondNode)}`);
    return secondNode;
};


//Another try with while loop, the solution doesn't retains the pointer for updated head
var swapPairs = function (head) {
    if (head == null || head.next == null) return head;
    let A, B;
    let left = head;
    while (left && left.next) {
        console.log(`rightNext: ${JSON.stringify(left)}`)
        A = left;
        B = left.next;
        left = B.next;
        B.next = A; // swap
        A.next = left;
        console.log(`A: ${JSON.stringify(A)}`)
        console.log(`B: ${JSON.stringify(B)}`)
    }
    console.log(`head: ${JSON.stringify(head)}`)
    return left;
};

// Solution after reference from LT
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
// Result ==>
/*
    Runtime: 72 ms, faster than 7.26% of JavaScript online submissions for Swap Nodes in Pairs.
    Memory Usage: 33.7 MB, less than 94.74% of JavaScript online submissions for Swap Nodes in Pairs.
*/
// Another submission for same program
/*
    Runtime: 56 ms, faster than 58.28% of JavaScript online submissions for Swap Nodes in Pairs.
    Memory Usage: 33.8 MB, less than 78.95% of JavaScript online submissions for Swap Nodes in Pairs.
*/