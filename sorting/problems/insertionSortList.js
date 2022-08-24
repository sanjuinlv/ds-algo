/* 
https://leetcode.com/problems/insertion-sort-list/
Category - Medium

Given the head of a singly linked list, sort the list using insertion sort, and return the sorted list's head.

The steps of the insertion sort algorithm:

Insertion sort iterates, consuming one input element each repetition and growing
a sorted output list.
At each iteration, insertion sort removes one element from the input data, finds
the location it belongs within the sorted list and inserts it there.
It repeats until no input elements remain.

Example 1:
Input: head = [4,2,1,3]
Output: [1,2,3,4]

Example 2:
Input: head = [-1,5,3,4,0]
Output: [-1,0,3,4,5]

Constraints:

The number of nodes in the list is in the range [1, 5000].
-5000 <= Node.val <= 5000

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
 * @return {ListNode}
 */
var insertionSortList = function (head) {
  if (head === null) return head;
  const reverse = (node) => {
    const temp = node;
    const prev = prevNodeMap.get(node);
    node.next = prev;
    prev.next = temp.next;
    prevNodeMap.set(node, prevNodeMap.get(prev));
    prevNodeMap.set(prev, node);
    return prev;
  };
  const prevNodeMap = new Map();
  const dummy = new Node();
  dummy.next = head;
  let curr = dummy.next;
  prevNodeMap.set(curr, null);
  while (curr !== null) {
    const prev = curr;
    curr = curr.next;
    prevNodeMap.set(curr, prev);
    let currNode = curr;
    //check if the curr node val is smaller than previous node val
    while (currNode.val < prev.val) {
      currNode = reverse(curr);
      prev = prevNodeMap.get(currNode);
    }
  }
  return dummy.next;
};

/* 
Time: O(N^2)
Space: O(N)

Runtime: 180 ms, faster than 25.14% of JavaScript online submissions for Insertion Sort List.
Memory Usage: 44.5 MB, less than 68.85% of JavaScript online submissions for Insertion Sort List.
*/
var insertionSortList = function (head) {
  if (head == null) return head;
  const dummy = new ListNode(0);
  let curr = head;
  let next = null;
  let prev = null;
  while (curr !== null) {
    //start from the beginning of the list to find correct position to insert
    prev = dummy;
    //find the right place to insert
    while (prev.next !== null && prev.next.val < curr.val) {
      prev = prev.next;
    }
    //insert between prev and prev.next
    next = curr.next;
    //link the curr next with the resultant insert position next node
    curr.next = prev.next;
    //finally place the node at insert position
    prev.next = curr;
    //move the curr node to next pointer
    curr = next;
  }
  return dummy.next;
};
