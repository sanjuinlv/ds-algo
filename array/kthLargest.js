/* 
https://leetcode.com/problems/kth-largest-element-in-an-array/description/
Category - Medium

Find the kth largest element in an unsorted array. Note that it is the kth largest element
in the sorted order, not the kth distinct element.

Example 1:
Input: [3,2,1,5,6,4] and k = 2
Output: 5

Example 2:
Input: [3,2,3,1,2,4,5,5,6] and k = 4
Output: 4

Note: 
You may assume k is always valid, 1 ≤ k ≤ array's length.
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
/* 
Approach I: Sort:
We can sort the array and return the kth element from the end. 
That would be an algorithm of O(NlogN) time complexity and O(1) space complexity.
*/

/* 
Approach I: Heap
Time: O(N logK)
Space: O(LogK)

Runtime: 133 ms, faster than 31.96% of JavaScript online submissions for Kth Largest Element in an Array.
Memory Usage: 46.8 MB, less than 13.41% of JavaScript online submissions for Kth Largest Element in an Array.
*/
var findKthLargest = function (nums, k) {
  const minPQ = new MinPriorityQueue();
  for (num of nums) {
    if (minPQ.size() < k) {
      minPQ.enqueue(num);
    } else {
      if (minPQ.front().element < num) {
        minPQ.dequeue();
        minPQ.enqueue(num);
      }
    }
  }
  return minPQ.front().element;
};

/*
Approach II: Quick Select

Time complexity : O(N) in the average case, (N^2) in the worst case.
Space complexity : O(1).

Runtime: 109 ms, faster than 48.45% of JavaScript online submissions for Kth Largest Element in an Array.
Memory Usage: 43.8 MB, less than 58.22% of JavaScript online submissions for Kth Largest Element in an Array.
*/
var findKthLargest = function (nums, k) {
  const SWAP = (a, i, j) => {
    [a[i], a[j]] = [a[j], a[i]];
  };
  const partition = (A, lo, hi) => {
    let i = lo;
    let j = hi + 1;
    const pivot = A[lo];
    while (i < j) {
      //find an element greater than pivot towards right
      while (A[++i] < pivot) {
        if (i === hi) break;
      }
      //find an element less than pivot towards left
      while (A[--j] > pivot) {
        if (j === lo) break;
      }
      //if pointers crossed then stop
      if (i >= j) break;
      //else swap the element
      SWAP(A, i, j);
    }
    //finally swap pivot position with j
    SWAP(A, lo, j);
    return j;
  };

  const N = nums.length;
  //kth largest element is the same as N - kth smallest element, hence one could implement kth smallest
  // algorithm for this problem
  const kSmallest = N - k;
  if (k > N) return;

  const quickSelect = (A, lo, hi) => {
    if (lo > hi) return;
    // only one element
    if (lo == hi) return A[lo];
    const p = partition(A, lo, hi);
    // the pivot is on (N - k)th smallest position
    if (p === kSmallest) {
      return A[p];
    } else if (p < kSmallest) {
      // go to the right side
      return quickSelect(A, p + 1, hi);
    } else {
      // go to the left side
      return quickSelect(A, lo, p - 1);
    }
  };
  return quickSelect(nums, 0, N - 1);
};
