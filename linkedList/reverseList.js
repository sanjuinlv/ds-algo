/*
206. Reverse Linked List
https://leetcode.com/problems/reverse-linked-list
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
/*
Approach: Iterative
2nd Try (2/01/2021)
Time complexity: (L)
Space complexity: O(1)

Runtime: 0 ms Beats 100.00%
Memory: 57.70 MB Beats 6.94%

 */
var reverseList = function (head) {
  let reversedHead = null;
  while (head != null) {
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

/* 
Itirative II

Runtime: 0 ms Beats 100.00%
Memory: 56.66 MB Beats 13.59%
*/
var reverseList = function (head) {
  let prevNode = null;
  let currNode = head;
  while (currNode != null) {
    //store the next node
    const nextNode = currNode.next;
    //change pointer of curr node to prev node
    currNode.next = prevNode;
    //now prev node is curre node
    prevNode = currNode;
    //change curr node to previously save next node
    currNode = nextNode;
  }
  return prevNode;
};

/* 
Approach III: recursion
The recursive version is slightly trickier and the key is to work backwards. 
Assume that the rest of the list had already been reversed, now how do I reverse the front part? 
Let's assume the list is: n1 → … → nk-1 → nk → nk+1 → … → nm → Ø
Assume from node nk+1 to nm had been reversed and you are at node nk.
n1 → … → nk-1 → nk → nk+1 ← … ← nm
We want nk+1’s next node to point to nk.
So,
nk.next.next = nk;

Time: O(N)
Space: O(N)

Runtime: 0 ms Beats 100.00%
Memory: 56.64 MB Beats 13.59%
*/

var reverseList = function (head) {
  if (head == null || head.next == null) return head;
  //reverse list recusively
  const reversedHead = reverseList(head.next);
  //reverse head's next pointer to head
  head.next.next = head;
  //mark head's next to null to avoid cycle
  head.next = null;
  return reversedHead;
};
