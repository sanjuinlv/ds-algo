/*
25. Reverse Nodes in k-Group 
https://leetcode.com/problems/reverse-nodes-in-k-group/
Type: Medium

Given the head of a linked list, reverse the nodes of the list k at a time, and return
 the modified list.

k is a positive integer and is less than or equal to the length of the linked list. 
If the number of nodes is not a multiple of k then left-out nodes, in the end, 
should remain as it is.

You may not alter the values in the list's nodes, only nodes themselves may be changed.

Example 1:
Input: head = [1,2,3,4,5], k = 2
Output: [2,1,4,3,5]

Example 2:
Input: head = [1,2,3,4,5], k = 3
Output: [3,2,1,4,5]

Constraints:
The number of nodes in the list is n.
1 <= k <= n <= 5000
0 <= Node.val <= 1000
 
Follow-up: Can you solve the problem in O(1) extra memory space?

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
 * @param {number} k
 * @return {ListNode}
 */
//Need correction. Gives wrong output [1,3,5] instead of [2,1,4,3,5]
var reverseKGroup = function (head, k) {
  //1. Find the length of the list
  let L = 0;
  let curr = head;
  while (curr != null) {
    L++;
    curr = curr.next;
  }
  //no of times we can reverse the list in k groups
  let times = parseInt(L / k);
  curr = head;
  let revHead = null;
  while (time > 0) {
    let counter = k;
    //reverse k nodes
    while (count > 1) {
      let newHead = curr;
      curr = curr.next;
      newHead.next = revHead;
      revHead = newHead;
      count--;
    }
    const nextNode = curr.next;
    curr.next = revHead;
    revHead.next = nextNode;
    curr = nextNode;
    times--;
  }
  return head;
};

/*
Approach: Recursive
Time: O(N) since we process each node exactly twice.
Space: O(N/k) used up by the recursion stack. The number of recursion calls is determined by both
k and N. In every recursive call, we process k nodes and then make a recursive call to process the rest.

Runtime: 0 ms Beats 100.00%
Memory Usage: 59.50 MB Beats 19.59%
*/
var reverseKGroup = function (head, k) {
  let count = 0;
  let curr = head;
  //check if there are at least k nodes in the list
  while (curr != null && count < k) {
    curr = curr.next;
    count++;
  }
  //if k nodes exist then reverse first k nodes
  if (count == k) {
    const reversedHead = reverseList(head, k);
    // Now recurse on the remaining linked list. Since
    // our recursion returns the head of the overall processed
    // list, we use that and the "original" head of the "k" nodes
    // to re-wire the connections.
    head.next = reverseKGroup(curr, k);
    //returned the new reversed head
    return reversedHead;
  }
  return head;
};

function reverseList(head, k) {
  let reversedHead = null;
  let curr = head;
  while (k > 0) {
    //save next node
    const nextNode = curr.next;
    //reverse the curr node next direction to prev node
    curr.next = reversedHead;
    reversedHead = curr;
    //curr now points to nead head
    curr = nextNode;
    k--;
  }
  return reversedHead;
}
