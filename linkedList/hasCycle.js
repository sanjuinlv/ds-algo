/* 
Given head, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached 
again by continuously following the next pointer. Internally, pos is used to denote the 
index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.

Return true if there is a cycle in the linked list. Otherwise, return false.

Example 1: 
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).

Example 2: 
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.

Example 3: 
Input: head = [1], pos = -1
Output: false
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
 * @return {boolean}
 */
/* 
Approach: Using two pointer
Time Complexity: O(N)
Space Complexity: O(1)
Runtime: 92 ms, faster than 31.58% of JavaScript online submissions for Linked List Cycle.
Memory Usage: 40.8 MB, less than 80.45 %% of JavaScript online submissions for Linked List Cycle.
*/
var hasCycle = function (head) {
  let slowPointer = head;
  let fastPointer = head;
  while (fastPointer !== null && fastPointer.next !== null) {
    slowPointer = slowPointer.next;
    fastPointer = fastPointer.next.next;
    if (slowPointer === fastPointer) {
      return true;
    }
  }
  return false;
};
