/*
435. Non-overlapping Intervals
https://leetcode.com/problems/non-overlapping-intervals
Type: Medium

Given an array of intervals intervals where intervals[i] = [starti, endi], 
return the minimum number of intervals you need to remove to make the rest of the 
intervals non-overlapping.

Example 1:
Input: intervals = [[1,2],[2,3],[3,4],[1,3]]
Output: 1
Explanation: [1,3] can be removed and the rest of the intervals are non-overlapping.

Example 1:
Input: intervals = [[1,2],[1,2],[1,2]]
Output: 2
Explanation: You need to remove two [1,2] to make the rest of the intervals non-overlapping.

Example 3:
Input: intervals = [[1,2],[2,3]]
Output: 0
Explanation: You don't need to remove any of the intervals since they're already non-overlapping.

Constraint: 
 - 1 <= intervals.length <= 10^5
 - intervals[i].length == 2
 - -5 * 104 <= starti < endi <= 5 * 10^4
*/
/**
 * @param {number[][]} intervals
 * @return {number}
 */
/* 
Approach I: Greedy
This is opposite of the N meeting in one room. 
Count the non-overlapping intervals and return N - nonOverlappingCount

Time: O(NlogN)
Space: O(logN)

Runtime: 71 ms Beats 80.46%
Space: 81.74 MB Beats 9.45%
*/
var eraseOverlapIntervals = function (intervals) {
  const N = intervals.length;
  intervals.sort((a, b) => a[1] - b[1]);
  let count = 1;
  let lastEndTime = intervals[0][1];
  //sort the intervals by end time
  for (i = 1; i < N; i++) {
    const interval = intervals[i];
    if (interval[0] >= lastEndTime) {
      count++;
      lastEndTime = interval[1];
    }
  }
  return N - count;
};

//above code starting from 0th index
/* 
RunTime: 72 ms Beats 81.27% 
Memory: 86.06 MB Beats 34.16%
*/
var eraseOverlapIntervals = function (intervals) {
  const N = intervals.length;
  //sort intervals by end time (ascending order)
  intervals.sort((a, b) => a[1] - b[1]);
  let lastEndTime = -Infinity;
  let count = 0;
  for (let i = 0; i < N; i++) {
    const interval = intervals[i];
    //check if there is no overlap, i.e, curr interval start is >= last end interval
    if (interval[0] >= lastEndTime) {
      count++;
      lastEndTime = interval[1];
    }
  }
  //return overlapping intervals, i.e, N-nonOverlapping
  return N - count;
};

/*
Approach: Greedy, based on starting point
Time: O(NLogN)
Space: O(1)

Runtime: 481 ms, faster than 7.19% of JavaScript online submissions for Non-overlapping Intervals.
Memory Usage: 74.7 MB, less than 60.43% of JavaScript online submissions for Non-overlapping Intervals.

eraseOverlapIntervals([[1,2],[2,3],[3,4],[1,3]]) - PASS
eraseOverlapIntervals([[1,2],[1,2],[1,2]]) - PASS
eraseOverlapIntervals([[1,2],[2,3]]) - PASS
eraseOverlapIntervals([[1,2],[3,5],[6,7],[8,10],[12,16],[4,8],[6,7],[8,9],[9,11]]) - PASS
 */
var eraseOverlapIntervals = function (intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  const N = intervals.length;
  let prev = 0;
  let i = 1;
  let count = 0;
  while (i < N) {
    if (intervals[prev][1] > intervals[i][0]) {
      if (intervals[prev][1] > intervals[i][1]) {
        prev = i;
      }
      count++;
    } else {
      prev = i;
    }
    i++;
  }
  return count;
};
