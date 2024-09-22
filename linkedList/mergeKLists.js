/* 
https://leetcode.com/problems/merge-k-sorted-lists/description/
Type: Hard

You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

Example 1:

Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]
Explanation: The linked-lists are:
[
  1->4->5,
  1->3->4,
  2->6
]
merging them into one sorted list:
1->1->2->3->4->4->5->6

Example 2:

Input: lists = []
Output: []
Example 3:

Input: lists = [[]]
Output: []

Constraints:
 - k == lists.length
 - 0 <= k <= 104
 - 0 <= lists[i].length <= 500
 - -10^4 <= lists[i][j] <= 10^4
 - lists[i] is sorted in ascending order.
 - The sum of lists[i].length will not exceed 104.

*/
/* 
Approach: Merge list one by one
Time: O(kN): where k is the number of linked lists.
 - We can merge two sorted linked list in O(n) time where n is the total number of
nodes in two lists.
 - Sum up the merge process and we can get: O(kN)

Space: O(1)

Runtime: 336 ms, faster than 32.12% of JavaScript online submissions for Merge k Sorted Lists.
Memory Usage: 47.3 MB, less than 77.02% of JavaScript online submissions for Merge k Sorted Lists.
*/
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  const N = lists.length;
  if (N == 0) return null;
  if (N == 1) return lists[0];

  const mergeTwoLists = (l1, l2) => {
    const dummy = new ListNode(0);
    let curr = dummy;
    while (l1 != null && l2 != null) {
      if (l1.val <= l2.val) {
        curr.next = l1;
        l1 = l1.next;
      } else {
        curr.next = l2;
        l2 = l2.next;
      }
      curr = curr.next;
    }
    curr.next = l1 === null ? l2 : l1;
    return dummy.next;
  };

  let l1 = lists[0];
  let i = 1;
  while (i < N) {
    l1 = mergeTwoLists(l1, lists[i++]);
  }
  return l1;
};

/* 
Approach II: Divide And Conquer Merge Sort
Time: O(N logK) where k is number of linked list
Space: O(k) - stack size
Runtime: 75 ms, faster than 90.40% of JavaScript online submissions for Merge k Sorted Lists.
Memory Usage: 55.52 MB, less than 57.60% of JavaScript online submissions for Merge k Sorted Lists.
*/
var mergeKLists = function (lists) {
  const N = lists.length;
  if (N == 0) return null;
  if (N == 1) return lists[0];

  const mergeTwoLists = (l1, l2) => {
    const dummy = new ListNode(0);
    let curr = dummy;
    while (l1 != null && l2 != null) {
      if (l1.val <= l2.val) {
        curr.next = l1;
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

  const mergeDivideAndConquer = (list, lo, hi) => {
    if (lo > hi) return hi;
    if (lo == hi) return lists[lo]; //left-leaning
    const mid = lo + parseInt((hi - lo) / 2);
    //sort left
    const left = mergeDivideAndConquer(lists, lo, mid);
    //sort right
    const right = mergeDivideAndConquer(lists, mid + 1, hi);
    //merge two parts
    return mergeTwoLists(left, right);
  };
  return mergeDivideAndConquer(lists, 0, N - 1);
};

/* 
Approach: Min priority queue
Note: Since Javascript doesn't has Priority queue, we can simulate it using array by sorted array items
Didn't submit it as its performance will be bad due to multiple sort. But it passes all test cases
*/
var mergeKLists = function (lists) {
  const N = lists.length;
  if (N == 0) return null;
  if (N == 1) return lists[0];
  const queue = [];
  for (let i = 0; i < N; i++) {
    if (lists[i] !== null) {
      queue.push(lists[i]);
    }
  }
  queue.sort((a, b) => a.val - b.val);
  const dummy = new ListNode(-1);
  let prev = dummy;
  while (queue.length > 0) {
    const curr = queue.shift();
    prev.next = curr;
    prev = prev.next;
    if (curr.next !== null) {
      queue.push(curr.next);
      queue.sort((a, b) => a.val - b.val);
    }
  }
  return dummy.next;
};
