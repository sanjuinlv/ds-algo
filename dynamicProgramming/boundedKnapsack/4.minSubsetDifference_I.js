/*
Minimum sum partition
https://www.geeksforgeeks.org/problems/minimum-sum-partition3317/1
Type: Hard

Given an array arr[]  containing non-negative integers, the task is to divide it into two sets set1 and set2 such that the absolute difference between their sums is minimum and find the minimum difference.

Example 1:
  Input: arr[] = [1, 6, 11, 5]
  Output: 1
  Explanation: 
  Subset1 = {1, 5, 6}, sum of Subset1 = 12 
  Subset2 = {11}, sum of Subset2 = 11 
  Hence, minimum difference is 1.  

Example 2:
  Input: arr[] = [1, 4]
  Output: 3
  Explanation: 
  Subset1 = {1}, sum of Subset1 = 1
  Subset2 = {4}, sum of Subset2 = 4
  Hence, minimum difference is 3.

Example 3:
  Input: arr[] = [1]
  Output: 1
  Explanation: 
  Subset1 = {1}, sum of Subset1 = 1
  Subset2 = {}, sum of Subset2 = 0
  Hence, minimum difference is 1.

Constraints:
 - 1 ≤ arr.size()*|sum of array elements| ≤ 10^5
 - 1 <= arr[i] <= 10^5

 */
/**
 * @param {number[]} arr
 * @returns {number}
 */

/* 
Time: O(N * M) where N is array lenght and M is sum of elements
Space: O(N * M)

First find the total sum for given subset. That becomes the range between which we can get
the subset sum for given numbers. 
Find out what all numbers between 0 to range can be made from the given subset
For all the target sum, upto middle of the range, which can be made from the subset add in a array.
Let us assume for the given two subset we have sum S1 and S2, where S1 + S2 = range sum.
So to find diff of subset sum, i.e, S1 - S2, we need to know only one subset sum, i.e, S2. 
S1 - S2 => (range - S2) - S2 = range - 2 * S2

Runtime: 0.34 
*/
class Solution {
  // Function to find minimum difference between any pair of elements in an array.
  minDifference(arr) {
    const n = arr.length;
    if (n == 1) return arr[0]
    //array sum
    let range = 0;
    arr.forEach((num) => (range += num));
    const dp = [...Array(n + 1)].map((x) => Array(range + 1));
    //we can get target sum=0 for empty subset, so set first colum 0
    for (let i = 0; i <= n; i++) dp[i][0] = true;
    //for empty subset we can not get any of the target sum, so set first row 0
    for (let j = 1; j <= range; j++) dp[0][j] = false;
    //fill the matrix
    for (let i = 1; i <= n; i++) {
      const curr = arr[i - 1];
      for (let j = 1; j <= range; j++) {
        if (curr <= j) {
          dp[i][j] = dp[i - 1][j - curr] || dp[i - 1][j];
        } else {
          dp[i][j] = dp[i - 1][j];
        }
      }
    }
    //now cerate target sum range array for which we can find subset sum with min diff
    let subsetArr = [];
    //we need to know half of the range values as we can derive other half using S1+S2=range
    for (let j = 1; j <= Math.floor(range / 2); j++) {
      if (dp[n][j]) subsetArr.push(j);
    }
    let minDiff = Infinity;
    for (let i = 0; i < subsetArr.length; i++) {
      //S1 + S2 = range
      //S1 - S2 => (range - S2) - S2 = range - 2 * S2
      minDiff = Math.min(minDiff, Math.abs(range - 2 * subsetArr[i]));
    }
    return minDiff == Infinity ? 0: minDiff;
  }
}
