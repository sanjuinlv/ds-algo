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
Approach: Divide And Conquer
Time: O(N logK) where k is number of linked list
Space: O(k) - stack size
Runtime: 114 ms, faster than 79.89% of JavaScript online submissions for Merge k Sorted Lists.
Memory Usage: 47.4 MB, less than 69.98% of JavaScript online submissions for Merge k Sorted Lists.
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

  const mergeDivideAndConquer = (lists, lo, hi) => {
    //crossed
    if (lo > hi) return null;
    //size == 1
    if (lo === hi) return lists[lo]; //left-leaning
    const mid = lo + parseInt((hi - lo) / 2);
    const left = mergeDivideAndConquer(lists, lo, mid);
    const right = mergeDivideAndConquer(lists, mid + 1, hi);
    return mergeTwoLists(left, right);
  };
  return mergeDivideAndConquer(lists, 0, lists.length - 1);
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
