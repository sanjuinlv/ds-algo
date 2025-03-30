/*
973. K Closest Points to Origin
https://leetcode.com/problems/k-closest-points-to-origin/
Type: Medium

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

Runtime: 207 ms, faster than 47.56% of JavaScript online submissions for K Closest Points to Origin.
Memory Usage: 64.13 MB, less than 68.89% of JavaScript online submissions for K Closest Points to Origin.
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

// PQ: Add only when the incoming point is smaller than PQ max element
var kClosest = function (points, k) {
  const maxHeap = new MaxPriorityQueue({
    compare: (a, b) => {
      return (
        Math.sqrt(b[0] * b[0] + b[1] * b[1]) -
        Math.sqrt(a[0] * a[0] + a[1] * a[1])
      );
    },
  });
  for (const point of points) {
    //if heap size is less than k then add it
    if (maxHeap.size() < k) maxHeap.enqueue(point);
    else {
      const front = maxHeap.front();
      // if the heap's top element is farther than this point then add this to Q
      if (
        Math.sqrt(front[0] * front[0] + front[1] * front[1]) >
        Math.sqrt(point[0] * point[0] + point[1] * point[1])
      ) {
        maxHeap.dequeue();
        maxHeap.enqueue(point);
      }
    }
  }
  return maxHeap.toArray();
};

/*
Approach III: Quick Select (Recursive) 
Runtime: 103 ms Beats 24.95%
Memory: 72.30 MB Beats 35.74%
*/
var kClosest = function (points, k) {
  quickSelect(0, points.length - 1, k, points);
  console.log(points);
  return points.slice(0, k);
};

function quickSelect(lo, hi, k, A) {
  if (lo >= hi) return;
  const pivot = partition(lo, hi, A);
  if (pivot === k) return;
  if (pivot < k) quickSelect(pivot + 1, hi, k, A);
  else quickSelect(lo, pivot - 1, k, A);
}

function partition(lo, hi, A) {
  console.log(`lo: ${lo}, hi: ${hi}`, A)
  //find random pivot
  const pivotIndex = lo + Math.floor(Math.random() * (hi - lo + 1));
  //swap lo with random
  swap(lo, pivotIndex, A);
  const pivot = sqrt(A[lo]);
  let i = lo + 1;
  let j = hi;
  while (true) {
    //move toward right until we find element greater than pivot
    while (i <= j && sqrt(A[i]) < pivot) i++;
    //move toward left until we find element smaller than pivot
    while (i <= j && sqrt(A[j]) > pivot) j--;
    //if i and j have not crossed then swap them
    if (i >= j) break;
    swap(i++, j--, A);
  }
  //swap lo with j
  swap(lo, j, A);
  return j;
}

function sqrt(a) {
  return Math.sqrt(a[0] * a[0] + a[1] * a[1]);
}

function swap(i, j, A) {
  [A[i], A[j]] = [A[j], A[i]];
}

/* 
Approach III: Using Quick Select (Iterative)

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
