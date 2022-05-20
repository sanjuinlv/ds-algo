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
Approach: Sorting
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
  console.log(points);
  return points.slice(0, k);
};

/* 
Approach: Priority Queue
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
