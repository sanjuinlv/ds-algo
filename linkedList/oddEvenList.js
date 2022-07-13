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
Time: O(N)
Space: O(N)
Runtime: 77 ms, faster than 89.76% of JavaScript online submissions for Odd Even Linked List.
Memory Usage: 44.3 MB, less than 85.55% of JavaScript online submissions for Odd Even Linked List.
*/
var oddEvenList = function (head) {
  if (head == null) return head;
  let odd = head;
  let even = head.next;
  let evenHead = even;
  while (even !== null && even.next !== null) {
    odd.next = even.next;
    odd = odd.next;
    even.next = odd.next;
    even = even.next;
  }
  odd.next = evenHead;
  return head;
};
