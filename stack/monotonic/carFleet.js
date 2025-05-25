/* 
853. Car Fleet
https://leetcode.com/problems/car-fleet
Type: Medium

There are n cars at given miles away from the starting mile 0, traveling to reach the mile target.
You are given two integer array position and speed, both of length n, where position[i] is the starting mile of the ith car and speed[i] is the speed of the ith car in miles per hour.
A car cannot pass another car, but it can catch up and then travel next to it at the speed of the slower car.
A car fleet is a car or cars driving next to each other. The speed of the car fleet is the minimum speed of any car in the fleet.
If a car catches up to a car fleet at the mile target, it will still be considered as part of the car fleet.
Return the number of car fleets that will arrive at the destination.
 
Example 1:
Input: target = 12, position = [10,8,0,5,3], speed = [2,4,1,1,3]
Output: 3
Explanation:
The cars starting at 10 (speed 2) and 8 (speed 4) become a fleet, meeting each other at 12. The fleet forms at target.
The car starting at 0 (speed 1) does not catch up to any other car, so it is a fleet by itself.
The cars starting at 5 (speed 1) and 3 (speed 3) become a fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target.

Example 2:
Input: target = 10, position = [3], speed = [3]
Output: 1
Explanation:
There is only one car, hence there is only one fleet.

Example 3:
Input: target = 100, position = [0,2,4], speed = [4,2,1]
Output: 1
Explanation:
The cars starting at 0 (speed 4) and 2 (speed 2) become a fleet, meeting each other at 4. The car starting at 4 (speed 1) travels to 5.
Then, the fleet at 4 (speed 2) and the car at position 5 (speed 1) become one fleet, meeting each other at 6. The fleet moves at speed 1 until it reaches target.

Constraints:
 - n == position.length == speed.length
 - 1 <= n <= 105
 - 0 < target <= 10^6
 - 0 <= position[i] < target
 - All the values of position are unique.
 - 0 < speed[i] <= 10^6
*/

/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
/* 
Approach I: Sorting + Monotonic stack (NGR)
Time: O(NLogN + N) - Sorting + N items loop
Space: O(N) - stack  

Runtime: 176 ms Beats 95.20%
Memory; 85.09 MB Beats 22.49%
*/
var carFleet = function (target, position, speed) {
  const N = position.length;
  //1. Sort by position
  const arr = new Array(N);
  for (let i = 0; i < N; i++) {
    arr[i] = [position[i], speed[i]];
  }
  arr.sort((a, b) => a[0] - b[0]);
  //2. calculate time to target from each position
  const time = new Array(N).fill(0);
  for (let i = 0; i < N; i++) {
    const [position, speed] = arr[i];
    time[i] = (target - position) / speed;
  }
  //3. find no of item more than current to right
  let fleetCount = 0;
  let stack = [];
  stack.push(time[N - 1]);
  const top = (A) => A[A.length - 1];
  for (let i = N - 2; i >= 0; i--) {
    //curr time is greater than stack top so we got new fleet. unwind lower times
    if (stack.length && top(stack) < time[i]) {
      while (stack.length && top(stack) < time[i]) stack.pop();
      //if we have taken all lower speed out then we start with new fleet
      if (stack.length == 0) fleetCount++;
    }
    stack.push(time[i]);
  }
  //there are still cars left on stack then it will make a fleet
  if (stack.length) fleetCount++;
  return fleetCount;
};

/* 
Approch II: Without using stack
Time: O(NLogN+N) = O(NLogN)

Runtime: 180 ms Beats 95.20%
Memory: 85.75 MB Beats 17.80%
*/
var carFleet = function (target, position, speed) {
  const N = position.length;
  //1. Sort by position
  const arr = new Array(N);
  for (let i = 0; i < N; i++) {
    arr[i] = [position[i], speed[i]];
  }
  arr.sort((a, b) => a[0] - b[0]);
  //2. calculate time to target from each position
  const time = new Array(N).fill(0);
  for (let i = 0; i < N; i++) {
    const [position, speed] = arr[i];
    time[i] = (target - position) / speed;
  }
  //3. find no of item more than current to right
  let fleetCount = 0;
  let prevTime = 0;
  for (let i = N - 1; i >= 0; i--) {
    if (time[i] > prevTime) {
      fleetCount++;
      prevTime = time[i];
    }
  }
  return fleetCount;
};
