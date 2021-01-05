/*
Reverse a singly linked list.
Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL

Follow up:
A linked list can be reversed either iteratively or recursively. Could you implement both?

 */
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
/* 
Time complexity: O(N)
Space complexity: O(1)
Runtime: 80 ms, faster than 85.15% of JavaScript online submissions for Reverse Linked List.
Memory Usage: 40.3 MB, less than 75.41% of JavaScript online submissions for Reverse Linked List.
*/
var reverseList = function(head) {
   let prev = null;
   while (head != null) {
        const temp = head;
        head = head.next;
        temp.next = prev;
        prev = temp;
   }
   return prev;
};