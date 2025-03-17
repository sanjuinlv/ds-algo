/* 
Job Sequencing Problem
https://www.geeksforgeeks.org/problems/job-sequencing-problem-1587115620/1
Type: Medium

You are given three arrays: id, deadline, and profit, where each job is associated with an ID, a deadline, and a profit. Each job takes 1 unit of time to complete, and only one job can be scheduled at a time. You will earn the profit associated with a job only if it is completed by its deadline.

Your task is to find:
 - The maximum number of jobs that can be completed within their deadlines.
 - The total maximum profit earned by completing those jobs.

Example 1:
Input: id = [1, 2, 3, 4], deadline = [4, 1, 1, 1], profit = [20, 1, 40, 30]
Output: [2, 60]
Explanation: Job1 and Job3 can be done with maximum profit of 60 (20+40).

Example 2:
Input: id = [1, 2, 3, 4, 5], deadline = [2, 1, 2, 1, 1], profit = [100, 19, 27, 25, 15]
Output: [2, 127]
Explanation: Job1 and Job3 can be done with maximum profit of 127 (100+27).

Example 3:
Input: id = [1, 2, 3, 4], deadline = [3, 1, 2, 2], profit = [50, 10, 20, 30]
Output: [3, 100]
Explanation: Job1, Job3 and Job4 can be completed with a maximum profit of 100 (50 + 20 + 30).

Constraints:
 - 1 <=  id.size() == deadline.size() == profit.size() <= 10^5
 - 1 <= id[i], deadline[i] <= id.size()
 - 1 <= profit <= 500
*/
/**
 * @param {number[]} ids
 * @param {number[]} deadlines
 * @param {number[]} profits
 * @param {number} n
 * @returns {number[]}
 */

/* 
Approach I : Greedy
Time taken: 1.75
*/
class Job {
  constructor(deadline, profit) {
    this.deadline = deadline;
    this.profit = profit;
  }
}
class Solution {
  // Function used for sorting jobs according to their deadlines
  JobSequencing(id, deadline, profit) {
    // code here..
    //create a array of job deadline and profit
    const N = id.length;
    const arr = new Array(N);
    for (let i = 0; i < N; i++) {
      arr[i] = new Job(deadline[i], profit[i]);
    }
    //sort by profit
    arr.sort((a, b) => b.profit - a.profit);
    let maxDeadline = -1;
    //find max deadline
    for (let i = 0; i < N; i++) {
      maxDeadline = Math.max(maxDeadline, deadline[i]);
    }
    //resul array to store the max profit for each deadline day
    const result = new Array(maxDeadline + 1).fill(-1);
    let totalProfit = 0;
    let count = 0;
    for (let i = 0; i < N; i++) {
      //try with all available deadline <= deadline to find free day
      for (let j = arr[i].deadline; j > 0; j--) {
        //if we have non entry in result then fill the profit
        if (result[j] == -1) {
          result[j] = i;
          count++;
          totalProfit += arr[i].profit;
          break; //stop once we find the free entry
        }
      }
    }
    return [count, totalProfit];
  }
}
