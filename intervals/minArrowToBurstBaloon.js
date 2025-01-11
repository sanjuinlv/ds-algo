/*
452. Minimum Number of Arrows to Burst Balloons
https://leetcode.com/problems/minimum-number-of-arrows-to-burst-balloons
Type: Medium

There are some spherical balloons taped onto a flat wall that represents the XY-plane. The balloons are represented as a 2D integer array points where points[i] = [xstart, xend] denotes a balloon whose horizontal diameter stretches between xstart and xend. You do not know the exact y-coordinates of the balloons.

Arrows can be shot up directly vertically (in the positive y-direction) from different points along the x-axis. A balloon with xstart and xend is burst by an arrow shot at x if xstart <= x <= xend. There is no limit to the number of arrows that can be shot. A shot arrow keeps traveling up infinitely, bursting any balloons in its path.

Given the array points, return the minimum number of arrows that must be shot to burst all balloons.
 

Example 1:
  Input: points = [[10,16],[2,8],[1,6],[7,12]]
  Output: 2
  Explanation: The balloons can be burst by 2 arrows:
    - Shoot an arrow at x = 6, bursting the balloons [2,8] and [1,6].
    - Shoot an arrow at x = 11, bursting the balloons [10,16] and [7,12].

Example 2:
  Input: points = [[1,2],[3,4],[5,6],[7,8]]
  Output: 4
  Explanation: One arrow needs to be shot for each balloon for a total of 4 arrows.

Example 3:
  Input: points = [[1,2],[2,3],[3,4],[4,5]]
  Output: 2
  Explanation: The balloons can be burst by 2 arrows:
    - Shoot an arrow at x = 2, bursting the balloons [1,2] and [2,3].
    - Shoot an arrow at x = 4, bursting the balloons [3,4] and [4,5].
 
Constraints:
 - 1 <= points.length <= 10^5
 - points[i].length == 2
 - -2^31 <= xstart < xend <= 2^31 - 1
 */

/**
 * @param {number[][]} points
 * @return {number}
 */
/* 
Approach : Greedy
Time: O(NlogN) - sorting
Space: O(N) - storing additional merged result

Runtime: 89 ms Beats 55.43%
Memory: 71.51 MB Beats 95.11%
*/
var findMinArrowShots = function (points) {
  const N = points.length;
  //sort points by start time
  points.sort((a, b) => a[0] - b[0]);
  const merged = [];
  for (let i = 0; i < N; i++) {
    //merged is empty or there is no overlap
    const L = merged.length;
    if (L == 0 || merged[L - 1][1] < points[i][0]) {
      merged.push(points[i]);
    } else {
      //Overlap found
      //update start to max of merged and curr point
      merged[L - 1][0] = Math.max(merged[L - 1][0], points[i][0]);
      //update end to min of merged and curr point
      merged[L - 1][1] = Math.min(merged[L - 1][1], points[i][1]);
    }
  }
  return merged.length;
};
