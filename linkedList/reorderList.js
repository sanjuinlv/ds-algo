/*
Given a singly linked list L: L0→L1→…→Ln-1→Ln,
reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…

You may not modify the values in the list's nodes, only nodes itself may be changed.

Example 1:
Given 1->2->3->4, reorder it to 1->4->2->3.

Example 2:
Given 1->2->3->4->5, reorder it to 1->5->2->4->3.

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
 * @return {void} Do not return anything, modify head in-place instead.
 */
/* 
Runtime: 104 ms
Memory Usage: 46.7 MB
Your runtime beats 92.65 % of javascript submissions.
*/
var reorderList = function (head) {
  if (!head) return;
  // find middle of the list
  let slow = head,
    fast = head;
  while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  // reverse the second part of the list, from middle
  let prev = null,
    curr = slow,
    temp;
  while (curr != null) {
    temp = curr.next;
    curr.next = prev;
    prev = curr;
    curr = temp;
  }
  // merge the two list
  let first = head,
    second = prev;
  while (second.next != null) {
    temp = first.next;
    first.next = second;
    first = temp;

    temp = second.next;
    second.next = first;
    second = temp;
  }
};

//
var reorderList = function (head) {
  //1. find the middle of the list
  let slow = head;
  let fast = head;
  while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  console.log(slow);
  //reverse the list from middle
  let reversedHead = null;
  while (slow != null) {
    let tmp = slow;
    slow = slow.next;
    tmp.next = reversedHead;
    reversedHead = tmp;
  }
  console.log(reversedHead);
  //merge the lists
  let first = head;
  let second = reversedHead;
  while (second.next != null) {
    let tmp = first;
    first = first.next;
    tmp.next = second;

    tmp = second;
    second = second.next;
    tmp.next = first;
  }
};
