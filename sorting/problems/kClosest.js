/*
https://leetcode.com/problems/k-closest-points-to-origin/
Given an array of points where points[i] = [xi, yi] represents a point on the X-Y plane and an integer k, return the k closest points to the origin (0, 0).

The distance between two points on the X-Y plane is the Euclidean distance (i.e., √(x1 - x2)2 + (y1 - y2)2).

You may return the answer in any order. The answer is guaranteed to be unique (except for the order that it is in).

Example 1:
Input: points = [[1,3],[-2,2]], k = 1
Output: [[-2,2]]
Explanation:
The distance between (1, 3) and the origin is sqrt(10).
The distance between (-2, 2) and the origin is sqrt(8).
Since sqrt(8) < sqrt(10), (-2, 2) is closer to the origin.
We only want the closest k = 1 points from the origin, so the answer is just [[-2,2]].

Example 2:
Input: points = [[3,3],[5,-1],[-2,4]], k = 2
Output: [[3,3],[-2,4]]
Explanation: The answer [[-2,4],[3,3]] would also be accepted.

Constraints:

1 <= k <= points.length <= 10^4
-10^4 < xi, yi < 10^4
 */
/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
/* 
Approach I: Sorting
Time: O(NLogN) for sorting
Space: O(LogN) to O(N) for the extra space required by the sorting process
Runtime: 203 ms, faster than 89.13% of JavaScript online submissions for K Closest Points to Origin.
Memory Usage: 54.8 MB, less than 86.39% of JavaScript online submissions for K Closest Points to Origin.
*/
var kClosest = function (points, k) {
  points.sort(
    (a, b) =>
      Math.sqrt(a[0] * a[0] + a[1] * a[1]) -
      Math.sqrt(b[0] * b[0] + b[1] * b[1])
  );
  return points.slice(0, k);
};

/* 
Approach II: Priority Queue
Time: O(N LogK) Adding to/removing from the heap (or priority queue) only takes O(logk) time when
 the size of the heap is capped at k elements.
Space: O(k) The heap (or priority queue) will contain at most k elements.

Runtime: 203 ms, faster than 89.13% of JavaScript online submissions for K Closest Points to Origin.
Memory Usage: 54.8 MB, less than 86.39% of JavaScript online submissions for K Closest Points to Origin.
*/

var kClosest = function (points, k) {
  const pq = new Array(k);
  const sort = (pq) => {
    pq.sort(
      (a, b) =>
        Math.sqrt(a[0] * a[0] + a[1] * a[1]) -
        Math.sqrt(b[0] * b[0] + b[1] * b[1])
    );
  };
  for (const point of points) {
    pq.push(point);
    //sort pq to simulate Priority Queue
    sort(pq);
    //check if more than k items
    if (pq.length > k) {
      pq.pop();
    }
  }
  return pq;
};

/* 
Approach II: Using Max Priority Queue (from Lib)
Time: O(N LogK) Adding to/removing from the heap (or priority queue) only takes O(logk) time when
 the size of the heap is capped at k elements.
Space: O(k) The heap (or priority queue) will contain at most k elements.

Runtime: 325 ms, faster than 42.40% of JavaScript online submissions for K Closest Points to Origin.
Memory Usage: 61.5 MB, less than 30.93% of JavaScript online submissions for K Closest Points to Origin.
*/
var kClosest = function (points, k) {
  const maxPQ = new MaxPriorityQueue({
    compare: (a, b) => {
      return (
        Math.sqrt(b[0] * b[0] + b[1] * b[1]) -
        Math.sqrt(a[0] * a[0] + a[1] * a[1])
      );
    },
  });

  for (const point of points) {
    maxPQ.enqueue(point);
    if (maxPQ.size() > k) maxPQ.dequeue();
  }
  return maxPQ.toArray();
};

/* 
Approach III: Using Quick Select

Time: O(N) Similar to the binary search solution, the QuickSelect solution
has a worst-case time complexity of O(N^2) if the worst pivot is chosen each time. 
On average, however, it has a time complexity of O(N) because it halves (roughly)
the remaining elements needing to be processed at each iteration.

Space: O(1) The QuickSelect algorithm conducts the partial sort of points in place
with no recursion, so only constant extra space is required

 Runtime: 1617 ms, faster than 5.04% of JavaScript online submissions for K Closest Points to Origin.
Memory Usage: 57.9 MB, less than 74.70% of JavaScript online submissions for K Closest Points to Origin.
*/
var kClosest = function (points, k) {
  const swap = (a, i, j) => {
    [a[i], a[j]] = [a[j], a[i]];
  };
  const compare = (a, b) => {
    return (
      Math.sqrt(a[0] * a[0] + a[1] * a[1]) -
      Math.sqrt(b[0] * b[0] + b[1] * b[1])
    );
  };
  const partition = (points, lo, hi) => {
    const pivot = points[lo];
    let i = lo;
    j = hi + 1;
    while (lo < hi) {
      //while ith element is smaller than pivot
      while (compare(points[++i], pivot) <= 0) {
        if (i == hi) break;
      }
      //while jth element is greater than pivot
      while (compare(points[--j], pivot) >= 0) {
        if (j == lo) break;
      }
      //i crossed j
      if (i >= j) break;
      swap(points, i, j);
    }
    //swap pivot with j
    swap(points, lo, j);
    return j;
  };

  const quickSelect = (points, lo, hi) => {
    while (lo < hi) {
      const pivot = partition(points, lo, hi);
      if (pivot == k) break;
      if (pivot < k) {
        lo = pivot + 1;
      } else {
        hi = pivot - 1;
      }
    }
    return points.slice(0, k);
  };

  return quickSelect(points, 0, points.length - 1);
};
