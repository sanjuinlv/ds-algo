/* 
https://leetcode.com/problems/valid-mountain-array/
Type: Easy

Given an array of integers arr, return true if and only if it is a valid mountain array.
Recall that arr is a mountain array if and only if:

 - arr.length >= 3
 - There exists some i with 0 < i < arr.length - 1 such that:
 - arr[0] < arr[1] < ... < arr[i - 1] < arr[i] 
 - arr[i] > arr[i + 1] > ... > arr[arr.length - 1]

Example 1:
Input: arr = [2,1]
Output: false

Example 2:
Input: arr = [3,5,5]
Output: false

Example 3:
Input: arr = [0,3,2,1]
Output: true

Constraints:

 - 1 <= arr.length <= 10^4
 - 0 <= arr[i] <= 10^4

*/
/**
 * @param {number[]} A
 * @return {boolean}
 */

/* 
Time: O(N)
Space: O(1)

Runtime: 58 ms Beats 59.75%
Memory: 51.73 MB Beats 63.15%
*/
var validMountainArray = function (arr) {
    const N = arr.length;
    if (N < 3) return false;
    let i = 0;
    //climb up
    while (i + 1 < N && arr[i] < arr[i + 1]) i++;
    //peak can't be first or last
    if (i == 0 || i == N - 1) return false;
    //climb donw
    while (i + 1 < N && arr[i] > arr[i + 1]) i++;
    //if we reached too end then its valid mountain
    return i == N - 1;
  };
  