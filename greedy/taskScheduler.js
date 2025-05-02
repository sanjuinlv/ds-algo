/* 
621. Task Scheduler
https://leetcode.com/problems/task-scheduler/
Type: Medium

You are given an array of CPU tasks, each labeled with a letter from A to Z, and a number n. Each CPU interval can be idle or allow the completion of one task. Tasks can be completed in any order, but there's a constraint: there has to be a gap of at least n intervals between two tasks with the same label.

Return the minimum number of CPU intervals required to complete all tasks.

Example 1:
Input: tasks = ["A","A","A","B","B","B"], n = 2
Output: 8
Explanation: A possible sequence is: A -> B -> idle -> A -> B -> idle -> A -> B.
After completing task A, you must wait two intervals before doing A again. The same applies to task B. In the 3rd interval, neither A nor B can be done, so you idle. By the 4th interval, you can do A again as 2 intervals have passed.

Example 2:
Input: tasks = ["A","C","A","B","D","B"], n = 1
Output: 6
Explanation: A possible sequence is: A -> B -> C -> D -> A -> B.
With a cooling interval of 1, you can repeat a task after just one other task.

Example 3:
Input: tasks = ["A","A","A", "B","B","B"], n = 3
Output: 10
Explanation: A possible sequence is: A -> B -> idle -> idle -> A -> B -> idle -> idle -> A -> B.
There are only two types of tasks, A and B, which need to be separated by 3 intervals. This leads to idling twice between repetitions of these tasks.

Constraints:
 - 1 <= tasks.length <= 10^4
 - tasks[i] is an uppercase English letter.
 - 0 <= n <= 100
*/
/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
/* 
Approach I: Filling the slots and scheduing
Time: O(N)
Space: O(26) = O(1)

Runtime: 3 ms Beats 99.48%
Memory: 61.45 MB Beats 58.61%
*/
var leastInterval = function (tasks, n) {
  //character freq map
  const freqMap = new Array(26).fill(0);
  for (let c of tasks) {
    freqMap[c.codePointAt(0) - "A".codePointAt(0)]++;
  }
  //sort the freq map by ascending order
  freqMap.sort((a, b) => a - b);
  //largest freq count of a character.
  // Since we don't need idle slot for last task we consider maxFreq - 1;
  const maxFreq = freqMap[25] - 1;
  //calculate the numder of idle slots required
  let idleSlots = maxFreq * n;
  //check for other char freq, starting from 2nd max
  for (let i = 24; i >= 0; i--) {
    idleSlots -= Math.min(freqMap[i], maxFreq);
  }
  return idleSlots > 0 ? idleSlots + tasks.length : tasks.length;
};
