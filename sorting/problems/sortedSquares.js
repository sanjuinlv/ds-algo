/* 
https://leetcode.com/problems/squares-of-a-sorted-array/
Type: Easy

Given an integer array nums sorted in non-decreasing order, return an array of the
 squares of each number sorted in non-decreasing order.

Example 1:
Input: nums = [-4,-1,0,3,10]
Output: [0,1,9,16,100]
Explanation: After squaring, the array becomes [16,1,0,9,100].
After sorting, it becomes [0,1,9,16,100].

Example 2:
Input: nums = [-7,-3,2,3,11]
Output: [4,9,9,49,121]

Constraints:
 - 1 <= nums.length <= 104
 - -104 <= nums[i] <= 104
 - nums is sorted in non-decreasing order.

Follow up: Squaring each element and sorting the new array is very trivial, could
 you find an O(n) solution using a different approach?

*/
/**
 * @param {number[]} A
 * @return {number[]}
 */

/* 
Approach: using two pointers
Time: O(N)
Space: O(1)

Runtime: 81 ms Beats 69.11%
Memory: 56.12 MB Beats 65.08%
*/
var sortedSquares = function (A) {
    const N = A.length;
    let left = 0;
    let right = N - 1;
    let insertPointer = N - 1;
    let result = new Array(N);
    while (left <= right) {
      if (Math.abs(A[left]) < Math.abs(A[right])) {
        result[insertPointer] = A[right] * A[right];
        right--;
      } else {
        result[insertPointer] = A[left] * A[left];
        left++;
      }
      insertPointer--;
    }
    return result;
  };


// Approach II: Using inbuild sorting
// Time: O(NLogN)
var sortedSquares = function(A) {
    return A.map(e => e * e).sort((a, b) => a - b);
};