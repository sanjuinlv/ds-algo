/* 
Example 1:
Input: l1 = [2,4,3], 
       l2 = [5,6,4]
Output: [7,0,8]
Explanation: 342 + 465 = 807.

Example 2:
Input: l1 = [0], l2 = [0]
Output: [0]

Example 3:
Input: l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
Output: [8,9,9,9,0,0,0,1]

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
// l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// l1 = [0], l2 = [0]
// for submission
// l1 = [2,4,3], l2 = [5,6,4]
// l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
// l1 = [0], l2 = [0]
/*
Runtime: 156 ms
Memory Usage: 44.9 MB
Your runtime beats 11.55 % of javascript submissions.
*/
var addTwoNumbers = function (l1, l2) {
  const num1 = [];
  const num2 = [];
  let current = l1;
  //create digit array for num1
  while (current != null) {
    num1.push(current.val);
    current = current.next;
  }
  current = l2;
  //create digit array for num2
  while (current != null) {
    num2.push(current.val);
    current = current.next;
  }
  const result = new Array(num1.length + num2.length).fill(0);
  let i = 0;
  j = 0;
  for (let k = result.length - 1; k >= 0; k--) {
    if (!(i < num1.length || j < num2.length)) break;
    let digitSum = (num1[i++] || 0) + (num2[j++] || 0) + result[k];
    result[k] = digitSum % 10;
    result[k - 1] = result[k - 1] + parseInt(digitSum / 10);
  }
  //we need to handle the leading zeros
  let leadingZeroCount = 0;
  while (result[leadingZeroCount] == 0 && leadingZeroCount < result.length) {
    leadingZeroCount++;
  }
  let head = null;
  for (let i = leadingZeroCount; i < result.length; i++) {
    const node = new ListNode(result[i]);
    node.next = head;
    head = node;
  }
  return head ? head : new ListNode(0);
};

//without using additional space for storing digits of the two linked list
/* 
Runtime: 144 ms
Memory Usage: 44.6 MB
Your runtime beats 30.41 % of javascript submissions.
*/
var addTwoNumbers = function (l1, l2) {
  const result = [];
  let num1 = l1,
    num2 = l2;
  let carryOver = 0;
  while (num1 != null || num2 != null) {
    const digit1 = num1 ? num1.val : 0;
    const digit2 = num2 ? num2.val : 0;
    const digitSum = digit1 + digit2 + carryOver;
    result.push(digitSum % 10);
    carryOver = parseInt(digitSum / 10);
    if (num1 != null) num1 = num1.next;
    if (num2 != null) num2 = num2.next;
  }
  if (carryOver > 0) result.push(carryOver);
  let head = null;
  for (let i = result.length - 1; i >= 0; i--) {
    const node = new ListNode(result[i]);
    node.next = head;
    head = node;
  }
  return head ? head : new ListNode(0);
};

// Solution reference
// Further optimization not using any array for storing the result
/*
Runtime: 140 ms, faster than 45.43% of JavaScript online submissions for Add Two Numbers.
Memory Usage: 44.2 MB, less than 42.16% of JavaScript online submissions for Add Two Numbers.
*/
var addTwoNumbers = function (l1, l2) {
  let num1 = l1,
    num2 = l2;
  let carryOver = 0;
  let dummyHead = new ListNode(0);
  let curr = dummyHead;
  while (num1 != null || num2 != null) {
    const digit1 = num1 ? num1.val : 0;
    const digit2 = num2 ? num2.val : 0;
    const digitSum = digit1 + digit2 + carryOver;
    carryOver = parseInt(digitSum / 10);
    curr.next = new ListNode(digitSum % 10);
    // move the node pointer to next node
    curr = curr.next;
    if (num1 != null) num1 = num1.next;
    if (num2 != null) num2 = num2.next;
  }
  if (carryOver > 0) {
    curr.next = new ListNode(carryOver);
  }
  return dummyHead.next;
};
