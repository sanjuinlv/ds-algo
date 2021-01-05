/*
Type: Easy

Reverse a singly linked list.

Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL

Time complexity : O(n). Assume that n is the list's length, the time complexity is O(n).
Space complexity : O(1).
*/
 /** 
 * @param {*} head 
 */
var reverseList = function (head) {
    let curr = head, prev = null;
    while (curr != null) {
        // save the next node
        let tmp = curr.next;
        // change the current node pointer to its previous node
        curr.next = prev;
        // now previous points to the current node whose pointer is changed to its previous
        prev = curr;
        // now current node pointer is to the next node
        curr = tmp;
    }
    return prev;
};
//Your runtime beats 61.47 % of javascript submissions


// Using recursion by someone
/**
 * The recursive version is slightly trickier and the key is to work backwards. 
 * Assume that the rest of the list had already been reversed, now how do I reverse the front part? 
 * Let's assume the list is: n1 → … → nk-1 → nk → nk+1 → … → nm → Ø
   Assume from node nk+1 to nm had been reversed and you are at node nk.
   n1 → … → nk-1 → nk → nk+1 ← … ← nm
   We want nk+1’s next node to point to nk.
   So,
   nk.next.next = nk;
 * @param {*} head 
 */
var reverseList = function (head) {
    if (!head) return head
    if (!head.next) return head

    const curr = reverseList(head.next)

    head.next.next = head
    head.next = null

    return curr
};
//2nd try
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
/*
2nd Try (2/01/2021)
Time complexity: (L)
Space complexity: O(1)

Your runtime beats 95.19 % of javascript submissions.
Your memory usage beats 26.29 % of javascript submissions.
 */
var reverseList = function(head) {
    let reversedHead = null;
    while(head != null){
        //save current head pointer
        let newHead = head;
        //move head to next node
        head = head.next;
        // this saved node becomes the head and points to previous reversed head
        newHead.next = reversedHead;
        //new reversed head 
        reversedHead = newHead;
    }        
    return reversedHead;
};



























