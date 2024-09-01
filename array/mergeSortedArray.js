/**
https://leetcode.com/problems/merge-sorted-array/
Type: Easy

Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.
Example 1: 
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]

Example 2:
Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]    

Contraint: 
0 <= n, m <= 200
1 <= n + m <= 200
nums1.length == m + n
nums2.length == n
-109 <= nums1[i], nums2[i] <= 109
*/
/**
 * @param {number[]} nums1
 * @param {number} m - The length of array 1
 * @param {number[]} nums2
 * @param {number} n - The length of array 2
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */

/* 
Approach I : Using two pointers
Time: O(N)
Space: O(1)

Runtime: 49 ms, faster than 78.31% of JavaScript online submissions for Merge Sorted Array.
Memory Usage: 48.81 MB, less than 74.46% of JavaScript online submissions for Merge Sorted Array.
*/
var merge = function (nums1, m, nums2, n) {
  let i = m - 1;
  let j = n - 1;
  let insertIndex = m + n - 1;
  while (i >= 0 && j >= 0) {
    if (nums1[i] <= nums2[j]) {
      nums1[insertIndex--] = nums2[j--];
    } else {
      nums1[insertIndex--] = nums1[i--];
    }
  }
  //copy remaining from nums2
  while (j >= 0) nums1[insertIndex--] = nums2[j--];
};
