/*
239. Sliding Window Maximum
https://leetcode.com/problems/sliding-window-maximum
Type - Hard

You are given an array of integers nums, there is a sliding window of size k which is moving from the very left of the array to the very right. You can only see the k numbers in the window. Each time the sliding window moves right by one position.
Return the max sliding window.

Example 1:
Input: nums = [1,3,-1,-3,5,3,6,7], k = 3
Output: [3,3,5,5,6,7]
Explanation: 
Window position                Max
---------------               -----
[1  3  -1] -3  5  3  6  7       3
 1 [3  -1  -3] 5  3  6  7       3
 1  3 [-1  -3  5] 3  6  7       5
 1  3  -1 [-3  5  3] 6  7       5
 1  3  -1  -3 [5  3  6] 7       6
 1  3  -1  -3  5 [3  6  7]      7

Example 2:
Input: nums = [1], k = 1
Output: [1]
 
Constraints:
 - 1 <= nums.length <= 10^5
 - 10^4 <= nums[i] <= 10^4
 - 1 <= k <= nums.length
 */
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */

/* 
Approach I - Sliding window
Time: O(N)
Memory: O(N) - for stack
Runtime: 431 ms Beats 41.86%
Memory: 85.46 MB Beats 70.66%
*/
var maxSlidingWindow = function (nums, k) {
  const N = nums.length;
  let i = 0;
  let j = 0;
  let Q = [];
  let result = [];
  const top = (A) => A[A.length - 1];
  while (j < N) {
    //calculation
    const num = nums[j];
    //until there is smaller element in stack top remove it
    while (Q.length && top(Q) < num) Q.pop();
    Q.push(num);
    //reached window size
    if (j - i + 1 == k) {
      result.push(Q[0]);
      //move the left window and if Q front is same then remove it from Q
      if (Q[0] == nums[i]) Q.shift();
      i++;
    }
    j++;
  }
  return result;
};
