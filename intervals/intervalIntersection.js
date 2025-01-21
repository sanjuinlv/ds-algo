/* 
986. Interval List Intersections
https://leetcode.com/problems/interval-list-intersections/
Type: Medium

You are given two lists of closed intervals, firstList and secondList, where
firstList[i] = [starti, endi] and secondList[j] = [startj, endj]. 
Each list of intervals is pairwise disjoint and in sorted order.

Return the intersection of these two interval lists.

A closed interval [a, b] (with a <= b) denotes the set of real numbers x with a <= x <= b.

The intersection of two closed intervals is a set of real numbers that are either
empty or represented as a closed interval. For example, the intersection of
[1, 3] and [2, 4] is [2, 3].

Example 1:
Input: firstList = [[0,2],[5,10],[13,23],[24,25]], secondList = [[1,5],[8,12],[15,24],[25,26]]
Output: [[1,2],[5,5],[8,10],[15,23],[24,24],[25,25]]

Example 2:
Input: firstList = [[1,3],[5,9]], secondList = []
Output: []

Constraints:

    - 0 <= firstList.length, secondList.length <= 1000
    - firstList.length + secondList.length >= 1
    - 0 <= starti < endi <= 10^9
    - endi < starti+1
    - 0 <= startj < endj <= 10^9
    - endj < startj+1

*/
/**
 * @param {number[][]} firstList
 * @param {number[][]} secondList
 * @return {number[][]}
 */

/*
Approach I: Two pointers
Time: O(N)
Space: O(1)

Runtime: 3 ms Beats 65.96%
Memory Usage: 59.67 MB Beats 19.22%
 */
var intervalIntersection = function (firstList, secondList) {
  const m = firstList.length;
  const n = secondList.length;
  let i = 0;
  let j = 0;
  const intersection = [];
  while (i < m && j < n) {
    const low = Math.max(firstList[i][0], secondList[j][0]);
    const hi = Math.min(firstList[i][1], secondList[j][1]);
    //is there intersection?
    if (low <= hi) intersection.push([low, high]);
    // Remove the interval with the smallest endpoint
    //first interval end is less than second interval end so remove first
    if (firstList[i][1] < secondList[j][1]) i++;
    //second interval end is less than first interval end so remove second
    else j++;
  }
  return intersection;
};

/*
Approach II: Two pointers
Time: O(N)
Space: O(1)

Runtime: 89 ms, faster than 96.83% of JavaScript online submissions for Interval List Intersections.
Memory Usage: 50.1 MB, less than 13.20% of JavaScript online submissions for Interval List Intersections.
*/
var intervalIntersection = function (firstList, secondList) {
  let i = 0;
  let j = 0;
  const m = firstList.length;
  const n = secondList.length;
  const intersection = [];
  const isIntersection = (a, b) => {
    const ranges = [a, b].sort((a, b) => a[0] - b[0]);
    //if first range end is after seconds's start then there is intersection
    if (ranges[0][1] >= ranges[1][0]) return true;
    return false;
  };
  while (i < m && j < n) {
    //check if there is intersection at i & j position
    //firsList start is less than secondList and firsList end is greater than
    //case I: firstList end is
    if (isIntersection(firstList[i], secondList[j])) {
      //find the intersection
      intersection.push([
        Math.max(firstList[i][0], secondList[j][0]),
        Math.min(firstList[i][1], secondList[j][1]),
      ]);
      //if firstList's start is smaller then move its pointer
      if (firstList[i][1] < secondList[j][1]) i++;
      else j++; //move secondList pointer
    } else {
      //no intersection
      if (firstList[i][0] < secondList[j][0]) {
        //first list is exhausted so move this pointer
        i++;
      } else {
        //second list is exhausted so move this pointer
        j++;
      }
    }
  }
  return intersection;
};

