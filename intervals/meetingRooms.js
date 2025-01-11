/* 
252. Meeting Rooms
https://leetcode.com/problems/meeting-rooms/description/
Type: Easy

Given an array of meeting time intervals where intervals[i] = [starti, endi], determine if a person could attend all meetings.

Example 1:
  Input: intervals = [[0,30],[5,10],[15,20]]
  Output: false

Example 2:
  Input: intervals = [[7,10],[2,4]]
  Output: true

Constraints:
 - 0 <= intervals.length <= 104
 - intervals[i].length == 2
 - 0 <= starti < endi <= 106
*/
/**
 * @param {number[][]} intervals
 * @return {boolean}
 */
/* 
Approach: Sorting
Runtime: 106 ms, faster than 30.31% of JavaScript online submissions for Meeting Rooms.
Memory Usage: 44.5 MB, less than 32.38% of JavaScript online submissions for Meeting Rooms.
*/
var canAttendMeetings = function (intervals) {
  const N = intervals.length;
  //sort by start time of intervals
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 0; i < N - 1; i++) {
    //end of 'i' interval overlaps with start of 'i+1'
    if (intervals[i][1] > intervals[i + 1][0]) return false;
  }
  return true;
};
