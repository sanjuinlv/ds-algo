/* 
23. Merge k Sorted Lists
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

Runtime: 154 ms Beats 27.78%
Memory Usage: 62.16 MB Beats 12.73%.
*/
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  const N = lists.length;
  if (N == 0) return null;
  if (N == 1) return lists[0];
  const mergeTwoList = (l1, l2) => {
    const dummy = new ListNode();
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

  let l1 = lists[0];
  for (let i = 1; i < N; i++) {
    l1 = mergeTwoList(l1, lists[i]);
  }
  return l1;
};

/* 
Approach II: Divide And Conquer Merge Sort
Time: O(N logK) where k is number of linked list
Space: O(k) - stack size

Runtime: 4 ms Beats 96.48%
Memory Usage: 61.98 MB Beats 16.17%
*/
var mergeKLists = function (lists) {
  const N = lists.length;
  if (N == 0) return null;
  if (N == 1) return lists[0];
  return divideAndConquer(lists, 0, N - 1);
};

function divideAndConquer(lists, lo, hi) {
  if (lo > hi) return null;
  if (lo == hi) return lists[lo];
  const mid = lo + Math.floor((hi - lo) / 2);
  //sort left part
  const left = divideAndConquer(lists, lo, mid);
  //sort right part
  const right = divideAndConquer(lists, mid + 1, hi);
  //merge left and right
  return mergeTwoList(left, right);
}

function mergeTwoList(l1, l2) {
  let dummy = new ListNode();
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
  //copy left out of l1/l2
  curr.next = l1 == null ? l2 : l1;
  return dummy.next;
}

/* 
Approach III: Min priority queue
Time: O(NlogK), where K is the number of lists and N is number of list nodes
Space: O(N)

Runtime: 23 ms Beats 46.53%
Memory: 62.65 MB Beats 9.65%
*/
var mergeKLists = function (lists) {
  const N = lists.length;
  if (N == 0) return null;
  if (N == 1) return lists[0];
  //Min priority queue  
  const pq = new PriorityQueue((a, b) => {
    return a.val - b.val;
  });
  //add all sorted list to the priority queue
  for (let list of lists) {
    if (list != null) pq.enqueue(list);
  }
  console.log(`pq`, pq);
  const dummy = new ListNode();
  let curr = dummy;
  while (pq.size() > 0) {
    const node = pq.dequeue();
    curr.next = node;
    //move curr to next node
    curr = curr.next;
    //add next of the current node to the priority queue
    if (curr.next != null) pq.enqueue(curr.next);
  }
  return dummy.next;
};
