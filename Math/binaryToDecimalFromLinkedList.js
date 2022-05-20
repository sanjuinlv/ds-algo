/* 
https://leetcode.com/problems/convert-binary-number-in-a-linked-list-to-integer/
Given head which is a reference node to a singly-linked list. The value of each node in the linked 
list is either 0 or 1. The linked list holds the binary representation of a number.

Return the decimal value of the number in the linked list.

Example 1:
Input: head = [1,0,1]
Output: 5
Explanation: (101) in base 2 = (5) in base 10

Example 2:
Input: head = [0]
Output: 0

Constraints: 
The Linked List is not empty.
Number of nodes will not exceed 30.
Each node's value is either 0 or 1.
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
 * @return {number}
 */
/* 
Approach I: 
Time: O(N)
Space: O(1)
Runtime: 74 ms, faster than 56.39% of JavaScript online submissions for Convert Binary Number in a Linked List to Integer.
Memory Usage: 42 MB, less than 69.04% of JavaScript online submissions for Convert Binary Number in a Linked List to Integer.
*/
var getDecimalValue = function (head) {
  let curr = head;
  let num = 0;
  while (curr != null) {
    const bit = curr.val;
    num = num * 2 + bit;
    curr = curr.next;
  }
  return num;
};

/* 
Approach II:  Using Bit Manipulation
Time: O(N)
Space: O(1)
Runtime: 76 ms, faster than 53.19% of JavaScript online submissions for Convert Binary Number in a Linked List to Integer.
Memory Usage: 41.7 MB, less than 88.70% of JavaScript online submissions for Convert Binary Number in a Linked List to Integer.
*/
var getDecimalValue = function (head) {
  let curr = head;
  let num = 0;
  while (curr != null) {
    const bit = curr.val;
    num = num << 1;
    num = num | bit;
    curr = curr.next;
  }
  return num;
};
