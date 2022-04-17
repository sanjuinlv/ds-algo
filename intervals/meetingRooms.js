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
  //sort interval by starting values
  intervals.sort((a, b) => a[0] - b[0]);
  for (let i = 0; i < N - 1; i++) {
    if (intervals[i][1] > intervals[i + 1][0]) return false;
  }
  return true;
};
