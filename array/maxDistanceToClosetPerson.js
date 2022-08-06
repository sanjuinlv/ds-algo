/*
https://leetcode.com/problems/maximize-distance-to-closest-person/
Category - Medium

You are given an array representing a row of seats where seats[i] = 1 represents a person
sitting in the ith seat, and seats[i] = 0 represents that the ith seat is empty (0-indexed).
There is at least one empty seat, and at least one person sitting.
Alex wants to sit in the seat such that the distance between him and the closest
person to him is maximized. 

Return that maximum distance to the closest person.

Example 1:
Input: seats = [1,0,0,0,1,0,1]
Output: 2
Explanation: 
If Alex sits in the second open seat (i.e. seats[2]), then the closest person has distance 2.
If Alex sits in any other open seat, the closest person has distance 1.
Thus, the maximum distance to the closest person is 2.

Example 2:
Input: seats = [1,0,0,0]
Output: 3
Explanation: 
If Alex sits in the last seat (i.e. seats[3]), the closest person is 3 seats away.
This is the maximum distance possible, so the answer is 3.

Example 3:
Input: seats = [0,1]
Output: 1

Constraints:

2 <= seats.length <= 2 * 10^4
seats[i] is 0 or 1.
At least one seat is empty.
At least one seat is occupied.
 */
/**
 * @param {number[]} seats
 * @return {number}
 */
/*
Approach I: Linear Scan
Time: o(N)
Space: O(1)
Runtime: 108 ms, faster than 47.35% of JavaScript online submissions for Maximize Distance to Closest Person.
Memory Usage: 43.1 MB, less than 75.51% of JavaScript online submissions for Maximize Distance to Closest Person.
 */
var maxDistToClosest = function (seats) {
  const N = seats.length;
  let lastOccupiedSeatIndex = null;
  let closest = 0;
  for (let i = 0; i < N; i++) {
    //found occupied seat
    if (seats[i] === 1) {
      //if there is already one occupied seat on left
      if (lastOccupiedSeatIndex !== null) {
        const gap = Math.floor((i - lastOccupiedSeatIndex) / 2);
        closest = Math.max(closest, gap);
      } else {
        //no occupied seat in left, so the gap is no of seats in left
        closest = Math.max(closest, i);
      }
      lastOccupiedSeatIndex = i;
    }
    //Edge cases
    //the last seat is empty
    if (i === N - 1 && seats[i] === 0) {
      const gap = N - 1 - lastOccupiedSeatIndex;
      closest = Math.max(closest, gap);
    }
  }
  return closest;
};

/*
Approach II: Next Array
Time: o(N)
Space: O(N)
Runtime: 120 ms, faster than 32.65% of JavaScript online submissions for Maximize Distance to Closest Person.
Memory Usage: 44.5 MB, less than 34.29% of JavaScript online submissions for Maximize Distance to Closest Person.
 */
var maxDistToClosest = function (seats) {
  const N = seats.length;
  const left = new Array(N).fill(N);
  const right = new Array(N).fill(N);
  for (let i = 0; i < N; i++) {
    if (seats[i] == 1) left[i] = 0;
    else if (i > 0) left[i] = left[i - 1] + 1;
  }
  for (let i = N - 1; i >= 0; i++) {
    if (seats[i] == 1) right[i] = 0;
    else if (i < N - 1) right[i] = right[i + 1] + 1;
  }
  let closest = 0;
  for (let i = 0; i < N; i++) {
    closest = Math.max(closest, Math.min(left[i], right[i]));
  }
  return closest;
};
