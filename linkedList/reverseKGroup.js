/* 
https://leetcode.com/problems/reverse-nodes-in-k-group/

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

//solution reference
/*
Approach: Recursive
Time: O(N) since we process each node exactly twice.
Space: O(N/k) used up by the recursion stack. The number of recursion calls is determined by both
k and N. In every recursive call, we process k nodes and then make a recursive call to process the rest.

Runtime: 80 ms, faster than 91.40% of JavaScript online submissions for Reverse Nodes in k-Group.
Memory Usage: 45.5 MB, less than 34.18% of JavaScript online submissions for Reverse Nodes in k-Group.
*/
var reverseLinkedList = (head, k) => {
  let revHead = null;
  let curr = head;
  while (k > 0) {
    const newHead = curr;
    curr = curr.next;
    newHead.next = revHead;
    revHead = newHead;
    k--;
  }
  return revHead;
};

var reverseKGroup = function (head, k) {
  let count = 0;
  let curr = head;
  // First, see if there are atleast k nodes
  // left in the linked list.
  while (count < k && curr != null) {
    curr = curr.next;
    count++;
  }
  // If we have k nodes, then we reverse them
  if (count === k) {
    // Reverse the first k nodes of the list and
    // get the reversed list's head.
    const reversedHead = reverseLinkedList(head, k);
    // Now recurse on the remaining linked list. Since
    // our recursion returns the head of the overall processed
    // list, we use that and the "original" head of the "k" nodes
    // to re-wire the connections.
    head.next = reverseKGroup(curr, k);
    return reversedHead;
  }
  return head;
};
