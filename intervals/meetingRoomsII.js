/* 
Given an array of meeting time intervals intervals where intervals[i] = [starti, endi], 
return the minimum number of conference rooms required.

Example 1:
Input: intervals = [[0,30],[5,10],[15,20]]
Output: 2

Example 2:
Input: intervals = [[7,10],[2,4]]
Output: 1

Constraints:
 - 1 <= intervals.length <= 104
 - 0 <= starti < endi <= 106
*/

/**
 * @param {number[][]} intervals
 * @return {number}
 */
//Solution Reference
/*
Approach: Chronological Ordering
Time: O(NLogN)
Space: O(N)

Runtime: 76 ms, faster than 90.71% of JavaScript online submissions for Meeting Rooms II.
Memory Usage: 44.9 MB, less than 42.69% of JavaScript online submissions for Meeting Rooms II.
 */
var minMeetingRooms = function (intervals) {
  const N = intervals.length;
  const starts = new Array(N);
  const ends = new Array(N);

  for (let i = 0; i < N; i++) {
    starts[i] = intervals[i][0];
    ends[i] = intervals[i][1];
  }
  //sort the interval by start time
  starts.sort((a, b) => a - b);
  //sort the interval by end time
  ends.sort((a, b) => a - b);

  let startPointer = 0;
  let endPointer = 0;
  let usedRoom = 0;
  while (startPointer < N) {
    // If there is meeting ended by the time the meeting at 'startPointer' starts
    if (starts[startPointer] >= ends[endPointer]) {
      //we can used existing room
      usedRoom--;
      endPointer++;
    }
    usedRoom++;
    startPointer++;
  }
  return usedRoom;
};
