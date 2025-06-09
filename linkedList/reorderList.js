/*
143. Reorder List
https://leetcode.com/problems/reorder-list/submissions/
Type: Easy

Given a singly linked list L: L0→L1→…→Ln-1→Ln,
reorder it to: L0→Ln→L1→Ln-1→L2→Ln-2→…

You may not modify the values in the list's nodes, only nodes itself may be changed.

Example 1:
Given 1->2->3->4, reorder it to 1->4->2->3.

Example 2:
Given 1->2->3->4->5, reorder it to 1->5->2->4->3.

Constraints:
 - The number of nodes in the list is in the range [1, 5 * 10^4].
 - 1 <= Node.val <= 1000
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
Approach: Reverse the list from middle and merge the two list
Time: O(N)
Space: O(1)

Runtime: 0 ms Beats 100.00%
Memory: 65.56 MB Beats 45.28%
*/
var reorderList = function (head) {
  //1. find middle of the node
  let slow = head;
  let fast = head;
  while (fast != null && fast.next != null) {
    slow = slow.next;
    fast = fast.next.next;
  }
  //2. revere the list from middle
  let prev = null;
  let curr = slow;
  while (curr != null) {
    let nextNode = curr.next;
    //change pointer to prev node
    curr.next = prev;
    prev = curr;
    //move curr pointer to next node
    curr = nextNode;
  }
  //3. merge the two lists
  let first = head;
  let second = prev;
  while (second.next != null) {
    const firstNext = first.next;
    const secondNext = second.next;
    //point first node to second node
    first.next = second;
    //sconde node to first's next
    second.next = firstNext;
    //move first and second pointer
    first = firstNext;
    second = secondNext;
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
