/*
https://leetcode.com/problems/peak-index-in-a-mountain-array
Category - Medium

An array arr a mountain if the following properties hold:

arr.length >= 3
There exists some i with 0 < i < arr.length - 1 such that:
arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
arr[i] > arr[i + 1] > ... > arr[arr.length - 1]
Given a mountain array arr, return the index i such that arr[0] < arr[1] < ... < arr[i - 1] < arr[i] > arr[i + 1] > ... > arr[arr.length - 1].

You must solve it in O(log(arr.length)) time complexity.

Example 1:

Input: arr = [0,1,0]
Output: 1
Example 2:

Input: arr = [0,2,1,0]
Output: 1
Example 3:

Input: arr = [0,10,5,2]
Output: 1

Constraints:

3 <= arr.length <= 105
0 <= arr[i] <= 106
arr is guaranteed to be a mountain array.
 */
/**
 * @param {number[]} arr
 * @return {number}
 */

/* 
Approach I: Linear Search
Time: O(N)
Space: O(1)
*/
var peakIndexInMountainArray = function (arr) {
  let i = 0;
  //The mountain increases until it doesn't. The point at which it stops increasing is the peak.
  while (arr[i] < arr[i + 1]) i++;
  return i;
};

/* 
Approach II: Binary Search
Time: O(LogN)   
Space: O(1)
Runtime: 105 ms, faster than 36.55% of JavaScript online submissions for Peak Index in a Mountain Array.
Memory Usage: 50.8 MB, less than 34.06% of JavaScript online submissions for Peak Index in a Mountain Array.
*/
var peakIndexInMountainArray = function (arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    //mid is on decreasing slope
    if (arr[mid] > arr[mid + 1]) {
      //this mid can be potentially peak so include the mid index
      right = mid;
    } else {
      //mid is on increasing slope. The mid can not be peak so move ahead
      left = mid + 1;
    }
  }
  //left === right
  return left;
};
