/* 
57. Insert Interval
https://leetcode.com/problems/insert-interval/
Type: Medium

You are given an array of non-overlapping intervals intervals where intervals[i] = [starti, endi] represent the start and the end of the ith interval and intervals is sorted in ascending order by starti. You are also given an interval newInterval = [start, end] that represents the start and end of another interval.
Insert newInterval into intervals such that intervals is still sorted in ascending order
by starti and intervals still does not have any overlapping intervals (merge overlapping
intervals if necessary).

Return intervals after the insertion.

Example 1:
Input: intervals = [[1,3],[6,9]], newInterval = [2,5]
Output: [[1,5],[6,9]]

Example 2:
Input: intervals = [[1,2],[3,5],[6,7],[8,10],[12,16]], newInterval = [4,8]
Output: [[1,2],[3,10],[12,16]]
Explanation: Because the new interval [4,8] overlaps with [3,5],[6,7],[8,10].

Constraints:
 - 0 <= intervals.length <= 104
 - intervals[i].length == 2
 - 0 <= starti <= endi <= 105
 - intervals is sorted by starti in ascending order.
 - newInterval.length == 2
 - 0 <= start <= end <= 105

*/
/**
 * @param {number[][]} intervals
 * @param {number[]} newInterval
 * @return {number[][]}
 */
/* 
Approach I: Greedy
Time: O(N)
Space: O(1), no additional space, excluding result array

Runtime: 2 ms Beats 88.32%
Memory: 56.82 MB Beats 40.60%
*/
var insert = function (intervals, newInterval) {
  const N = intervals.length;
  let result = [];
  let i = 0;
  //non-overlapping intervals: end of curr interval is less than start of new interval
  //add to the result array
  while (i < N && intervals[i][1] < newInterval[0]) result.push(intervals[i++]);
  //overlapping intervals: merge until we have start of the curr interval <= new interval's end
  while (i < N && intervals[i][0] <= newInterval[1]) {
    newInterval[0] = Math.min(intervals[i][0], newInterval[0]);
    newInterval[1] = Math.max(intervals[i][1], newInterval[1]);
    i++;
  }
  //insert the new interval
  result.push(newInterval);
  //insert rest of the intervals, if any left
  while (i < N) {
    result.push(intervals[i++]);
  }
  return result;
};

/*
Approach: Greedy
Runtime: 100 ms, faster than 51.15% of JavaScript online submissions for Insert Interval.
Memory Usage: 44.1 MB, less than 73.42% of JavaScript online submissions for Insert Interval.
 */
var insert = function (intervals, newInterval) {
  const result = [];
  const N = intervals.length;
  let i = 0;
  //add all intervals before newInterval
  while (i < N && intervals[i][0] < newInterval[0]) {
    result.push(intervals[i++]);
  }
  //add newInterval
  //if no overlap, add it
  if (result.length == 0 || newInterval[0] > result[result.length - 1][1]) {
    result.push(newInterval);
  } else {
    result[result.length - 1][1] = Math.max(
      result[result.length - 1][1],
      newInterval[1]
    );
  }

  // add next intervals, merge with newInterval if needed
  while (i < N) {
    if (intervals[i][0] > result[result.length - 1][1]) {
      result.push(intervals[i]);
    } else {
      result[result.length - 1][1] = Math.max(
        result[result.length - 1][1],
        intervals[i][1]
      );
    }
    i++;
  }
  return result;
};
