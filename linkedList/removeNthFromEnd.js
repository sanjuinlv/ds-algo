/* 
19. Remove Nth Node From End of List
https://leetcode.com/problems/remove-nth-node-from-end-of-list
Type: Easy

Given the head of a linked list, remove the nth node from the end of the list and return its head.

Follow up: Could you do this in one pass?

Example 1:
Input: head = [1,2,3,4,5], n = 2
Output: [1,2,3,5]

Example 2:
Input: head = [1], n = 1
Output: []

Example 3:
Input: head = [1,2], n = 1
Output: [1]

Constraint:
=> The number of nodes in the list is sz.
=> 1 <= sz <= 30
=> 0 <= Node.val <= 100
=> 1 <= n <= sz
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
 * @param {number} n
 * @return {ListNode}
 */
/* 
Approach I: Find the lenght of the List and then traverse till L-n and delete the node
head = [1,2,3,4,5], n = 2 - PASS
head = [1], n = 1 - PASS
head = [1,2], n = 1 - PASS

Runtime: 88 ms, faster than 47.15% of JavaScript online submissions for Remove Nth Node From End of List.
Memory Usage: 40.1 MB, less than 77.85% of JavaScript online submissions for Remove Nth Node From End of List.
*/
var removeNthFromEnd = function (head, n) {
  let curr = head;
  //find the length of the list
  let L = 0;
  while (curr != null) {
    curr = curr.next;
    L++;
  }
  console.log(`L: ${L}`);
  if (L == n) {
    temp = head;
    head = head.next;
    temp = null;
    return head;
  }
  curr = head;
  let p = 1;
  while (p < L - n && curr != null) {
    curr = curr.next;
    p++;
  }
  console.log(`p: ${p}, curr: ${curr.val}`);
  temp = curr.next;
  curr.next = temp.next;
  temp = null;
  return head;
};

/*
Cleaner code using dummy node for two pass
Time complexity: O(L)
Space complexity: O(1)

Runtime: 84 ms, faster than 69.03% of JavaScript online submissions for Remove Nth Node From End of List.
Memory Usage: 40.3 MB, less than 45.29% of JavaScript online submissions for Remove Nth Node From End of List.
*/
var removeNthFromEnd = function (head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let length = 0;
  let curr = head;
  //step I: find the length of
  while (curr != null) {
    curr = curr.next;
    length++;
  }
  //step II: find the node to delete
  // L - n
  curr = dummy;
  length = length - n;
  while (length > 0) {
    curr = curr.next;
    length--;
  }
  console.log(`curr node: ${curr.val}`);
  temp = curr.next;
  curr.next = temp.next;
  temp = null;
  return dummy.next;
};

/* 
Approach II: One pass
|---- L-n ---|--- n ---|
|----------------------|
|---- n--|--- L-n -----|
We can use two pointers. The first pointer advances the list by n+1 steps from 
the beginning, while the second pointer starts from the beginning of the list. 
Now, both pointers are exactly separated by n nodes apart. We maintain this constant 
gap by advancing both pointers together until the first pointer arrives past the 
last node. The second pointer will be pointing at the nth node counting from the last. 

Runtime: 0 ms Beats 100.00%
Memory: 54.32 MB Beats 7.29%
*/
var removeNthFromEnd = function (head, n) {
  const dummy = new ListNode(0);
  dummy.next = head;
  let first = dummy;
  let second = dummy;
  //move the first pointer n+1 steps
  for (let i = 1; i <= n + 1; i++) {
    first = first.next;
  }
  //now move both pointer until first reached end
  //by then second will reach L-n from begining, which is nth position from end
  while (first != null) {
    first = first.next;
    second = second.next;
  }
  temp = second.next;
  second.next = temp.next;
  temp = null;
  return dummy.next;
};
