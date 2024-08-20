/* 
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

Runtime: 88 ms
Memory Usage: 40.9 MB
Your runtime beats 80.86 % of javascript submissions. 
*/
var mergeTwoLists = function(l1, l2) {
   let l1 = l1, list2 = l2;
   let dummyNode = new ListNode(0);
   let curr = dummyNode;
   while (l1 != null || list2 != null){
    if (l1 != null && list2 != null) {
        if (l1.val < list2.val) {
            curr.next = new ListNode(l1.val);
            l1 = l1.next;
        } else if (l1.val > list2.val){
            curr.next = new ListNode(list2.val);
            list2 = list2.next;
        } else {
            curr.next = new ListNode(l1.val);
            l1 = l1.next;
        }
    } else if (l1 == null && list2 != null) {
        curr.next = new ListNode(list2.val);
        list2 = list2.next;
    } else if (list2 == null && l1 != null) {
        curr.next = new ListNode(l1.val);
        l1 = l1.next;
    }
    curr = curr.next;
   }
   return dummyNode.next;
};

// Solution reference
// less and clean code
/*
Runtime: 88 ms, faster than 80.86% of JavaScript online submissions for Merge Two Sorted Lists.
Memory Usage: 40.4 MB, less than 43.99% of JavaScript online submissions for Merge Two Sorted Lists. 
*/
var mergeTwoLists = function(l1, l2) {
    let dummyNode = new ListNode(0);
    let curr = dummyNode;
    while (l1 != null && l2 != null){
        if (l1.val <= l2.val) {
            curr.next = new ListNode(l1.val);
            l1 = l1.next;
        } else {
            curr.next = new ListNode(l2.val);
            l2 = l2.next;
        }
        curr = curr.next;
    }
    // exactly one of l1 and l2 can be non-null at this point, so connect
    // the non-null list to the end of the merged list.
    curr.next = l1 == null ? l2: l1;
    return dummyNode.next;
 };

/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
/*
2nd Try (2-Jan-21)
Runtime: 84 ms, faster than 92.38% of JavaScript online submissions for Merge Two Sorted Lists.
Memory Usage: 40.3 MB, less than 55.15% of JavaScript online submissions for Merge Two Sorted Lists.
 */
var mergeTwoLists = function(l1, l2) {
    const dummy = new ListNode(0);
    curr = dummy;
    while(l1 != null && l2 != null){
        if (l1.val <= l2.val) {
            curr.next = l1
            l1 = l1.next;
        } else {
            curr.next = l2;
            l2 = l2.next;
        } 
        curr = curr.next;
    }
    curr.next = l1 == null ? l2 : l1;
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
*/
var mergeTwoLists = function(l1, l2) {
    if (l1 == null){
        return l2;
    }
    if (l2 == null) {
        return l1;
    }
    if (l1.val <= l2.val){
        l1.next = mergeTwoLists(l1.next, l2);
        return l1;
    } else {
        l2.next = mergeTwoLists(l2.next, l1);
        return l2;
    }
}