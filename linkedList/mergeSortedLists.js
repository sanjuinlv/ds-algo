/* 
21. Merge Two Sorted Lists
https://leetcode.com/problems/merge-two-sorted-lists
Type: Easy

Merge two sorted linked lists and return it as a new sorted list. 
The new list should be made by splicing together the nodes of the first two lists.

Input: l1 = [1,2,4], l2 = [1,3,4]
Output: [1,1,2,3,4,4]

Input: l1 = [], l2 = []
Output: []

Input: l1 = [], l2 = [0]
Output: [0]
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
Time complexity: O(max(M,N))
Space complexity: O(M+N)

Runtime: 0 ms Beats 100.00%
Memory Usage: 56.70 MB Beats 15.49% 
*/
var mergeTwoLists = function (list1, list2) {
  const dummy = new ListNode();
  let curr = dummy;
  while (list1 != null && list2 != null) {
    if (list1.val <= list2.val) {
      curr.next = list1;
      list1 = list1.next;
    } else {
      curr.next = list2;
      list2 = list2.next;
    }
    curr = curr.next;
  }
  curr.next = list1 == null ? list2 : list1;
  return dummy.next;
};
/* 
Recursive solution:
We can recursively define the result of a merge operation on two lists as the following 
(avoiding the corner case logic surrounding empty lists):

list1[0] + merge(list1[1:], list2) - if list1[0] < list2[0] 
list2[0] + merge(list1, list2[1:]) - otherwise  

Namely, the smaller of the two lists' heads plus the result of a merge on the rest of the elements.

Time Complexity: O(m + n)
Space Complexity: O(m + n)

Runtime: 1 ms Beats 48.68%
Memory: 58.15 MB Beats 5.20%
*/
var mergeTwoLists = function (l1, l2) {
  if (l1 == null) return l2;
  if (l2 == null) return l1;
  if (l1.val <= l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l2.next, l1);
    return l2;
  }
};
