/* 
Given the head of a linked list, return the node where the cycle begins. 
If there is no cycle, return null.

There is a cycle in a linked list if there is some node in the list that can be reached
again by continuously following the next pointer. Internally, pos is used to denote the
index of the node that tail's next pointer is connected to (0-indexed). It is -1 if there
is no cycle. Note that pos is not passed as a parameter.

Do not modify the linked list.

Example 1:
Input: head = [3,2,0,-4], pos = 1
Output: tail connects to node index 1
Explanation: There is a cycle in the linked list, where tail connects to the second node.

Example 2:
Input: head = [1,2], pos = 0
Output: tail connects to node index 0
Explanation: There is a cycle in the linked list, where tail connects to the first node.

Example 3:
Input: head = [1], pos = -1
Output: no cycle
Explanation: There is no cycle in the linked list.
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */

/* 
Approach I: Set
Time: O(N)
Space: O(N)
Runtime: 124 ms, faster than 35.19% of JavaScript online submissions for Linked List Cycle II.
Memory Usage: 44.6 MB, less than 86.49% of JavaScript online submissions for Linked List Cycle II.
*/
var detectCycle = function (head) {
  const visited = new Set();
  let node = head;
  while (node != null) {
    if (visited.has(node)) {
      return node;
    }
    visited.add(node);
    node = node.next;
  }
  return null;
};

/* 
Approach II: Floyd's Tortoise and Hare
Time: O(N)
Space: O(1)
Runtime: 93 ms, faster than 77.06% of JavaScript online submissions for Linked List Cycle II.
Memory Usage: 44.6 MB, less than 86.49% of JavaScript online submissions for Linked List Cycle II.
*/
var detectCycle = function (head) {
  let slowPointer = head;
  let fastPointer = head;
  let isCycle = false;
  //check if cycle is present
  while (
    slowPointer != null &&
    fastPointer !== null &&
    fastPointer.next !== null
  ) {
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next.next;
    if (slowPointer === fastPointer) {
      isCycle = true;
      break;
    }
  }
  if (isCycle) {
    //reset slow pointer to head
    slowPointer = head;
    while (slowPointer !== fastPointer) {
      slowPointer = slowPointer.next;
      fastPointer = fastPointer.next;
    }
    return slowPointer;
  }
  return null;
};
