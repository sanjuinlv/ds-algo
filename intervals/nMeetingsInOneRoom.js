/* 
N meetings in one room
https://www.geeksforgeeks.org/problems/n-meetings-in-one-room-1587115620/1
Type: Medium

You are given timings of n meetings in the form of (start[i], end[i]) where start[i] is the start time of meeting i and end[i] is the finish time of meeting i. Return the maximum number of meetings that can be accommodated in a single meeting room, when only one meeting can be held in the meeting room at a particular time. 

Note: The start time of one chosen meeting can't be equal to the end time of the other chosen meeting.

Examples 1:
  Input: start[] = [1, 3, 0, 5, 8, 5], end[] =  [2, 4, 6, 7, 9, 9]
  Output: 4
  Explanation: Maximum four meetings can be held with given start and end timings. The meetings are - (1, 2), (3, 4), (5,7) and (8,9)

Examples 2:  
  Input: start[] = [10, 12, 20], end[] = [20, 25, 30]
  Output: 1
  Explanation: Only one meetings can be held with given start and end timings.

Examples 3:  
  Input: start[] = [1, 2], end[] = [100, 99]
  Output: 1

Constraints:
 - 1 ≤ n ≤ 10^5
 - 0 ≤ start[i] < end[i] ≤ 10^6

*/
/* 
Approach : Greedy
Time: O(NLogN) - Sorting
Space: O(LogN) - sorting space

Time Taken: 0.27
*/
class Solution {
  // Function to find the maximum number of meetings that can
  // be performed in a meeting room.
  maxMeetings(start, end) {
    //create an interval
    let intervals = [];
    for (let i = 0; i < start.length; i++) {
      intervals[i] = [start[i], end[i]];
    }
    //sort by end time
    intervals.sort((a, b) => a[1] - b[1]);
    //count the max non-overlapping intervals
    let count = 1;
    let lastEndTime = intervals[0][1];
    for (let i = 1; i < intervals.length; i++) {
      const interval = intervals[i];
      //no overlapping: start of current is greater or equal to prev end
      if (interval[0] >= lastEndTime) {
        count++;
        lastEndTime = interval[1];
      }
    }
    return count;
  }
}
