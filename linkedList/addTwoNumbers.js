/* 
2. Add Two Numbers
https://leetcode.com/problems/add-two-numbers/description/
Type: Medium

Example 1:
Input: l1 = [2,4,3], l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.

Example 2:
Input: l1 = [0], l2 = [0]
Output: [0]

Example 3:
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]

Constraints:
 - The number of nodes in each linked list is in the range [1, 100].
 - 0 <= Node.val <= 9
 - It is guaranteed that the list represents a number that does not have leading zeros.
*/
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
/*
Runtime: 3 ms Beats 76.28%
Memory Usage: 60.68 MB Beats 19.93%
*/
var addTwoNumbers = function (l1, l2) {
  const dummy = new ListNode();
  let curr = dummy;
  let carryOver = 0;
  while (l1 != null || l2 !== null) {
    const digit1 = l1 ? l1.val : 0;
    const digit2 = l2 ? l2.val : 0;
    const digitSum = digit1 + digit2 + carryOver;
    carryOver = Math.floor(digitSum / 10);
    curr.next = new ListNode(digitSum % 10);
    curr = curr.next;
    if (l1 != null) l1 = l1.next;
    if (l2 != null) l2 = l2.next;
  }
  if (carryOver) curr.next = new ListNode(carryOver);
  return dummy.next;
};