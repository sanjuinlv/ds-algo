/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 */
/*
Approach I: Set
Time: O(N+M)
Space: O(N+M)
Runtime: 150 ms, faster than 34.52% of JavaScript online submissions for Intersection of Two Linked Lists.
Memory Usage: 51.9 MB, less than 9.56% of JavaScript online submissions for Intersection of Two Linked Lists.
 */
var getIntersectionNode = function (headA, headB) {
  let visited = new Set();

  while (headA !== null && headB !== null) {
    if (visited.has(headA)) return headA;
    if (visited.has(headB)) return headB;
    if (headA === headB) return headA;
    visited.add(headA);
    visited.add(headB);
    headA = headA.next;
    headB = headB.next;
  }
  console.log(headA);
  console.log(headB);
  //check if headA is not traversed yet until intersection
  while (headA !== null) {
    if (visited.has(headA)) return headA;
    headA = headA.next;
  }
  //check if headB is not traversed yet until intersection
  while (headB !== null) {
    if (visited.has(headB)) return headB;
    headB = headB.next;
  }
  //we didn't find any intersection
  return null;
};

/*
Approach I: Set (Optimized to store nodes of only one ist)
Time: O()
Space: O()
Runtime: 105 ms, faster than 82.72% of JavaScript online submissions for Intersection of Two Linked Lists.
Memory Usage: 50.4 MB, less than 31.54% of JavaScript online submissions for Intersection of Two Linked Lists.  
*/
var getIntersectionNode = function (headA, headB) {
  let bSet = new Set();
  while (headB != null) {
    bSet.add(headB);
    headB = headB.next;
  }
  while (headA != null) {
    //if we find node pointed out by headA in set then we found intersection
    if (bSet.has(headA)) return headA;
    headA = headA.next;
  }
  //we didn't find any intersection
  return null;
};

/*
Approach II: Set (Optimized to store nodes of only one ist)
If we say that c is the shared part, a is exclusive part of list A and b is exclusive
part of list B, then we can have one pointer that goes over a + c + b and the other
that goes over b + c + a. Have a look at the diagram below, and this should be fairly intuitive.

List A
     ---a-----
              |------c------
-------b------
List B

Time: O(N+M)
Space: O(M)
Runtime: 100 ms, faster than 88.27% of JavaScript online submissions for Intersection of Two Linked Lists.
Memory Usage: 50.1 MB, less than 48.06% of JavaScript online submissions for Intersection of Two Linked Lists.
*/
var getIntersectionNode = function (headA, headB) {
  //we didn't find any intersection
  let pA = headA;
  let pB = headB;
  while (pA !== pB) {
    pA = pA == null ? headB : pA.next;
    pB = pB == null ? headA : pB.next;
  }
  return pA;
  // Note: In the case lists do not intersect, the pointers for A and B
  // will still line up in the 2nd iteration, just that here won't be
  // a common node down the list and both will reach their respective ends
  // at the same time. So pA will be NULL in that case.
};
