/*
718. Maximum Length of Repeated Subarray
https://leetcode.com/problems/maximum-length-of-repeated-subarray/description/
Type: Medium

Given two integer arrays nums1 and nums2, return the maximum length of a subarray that appears in both arrays.

Example 1:
Input: nums1 = [1,2,3,2,1], nums2 = [3,2,1,4,7]
Output: 3
Explanation: The repeated subarray with maximum length is [3,2,1].

Example 2:
Input: nums1 = [0,0,0,0,0], nums2 = [0,0,0,0,0]
Output: 5
Explanation: The repeated subarray with maximum length is [0,0,0,0,0].

Constraints:
 - 1 <= nums1.length, nums2.length <= 1000
 - 0 <= nums1[i], nums2[i] <= 100

 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
/* 
Approach: Bottom Up DP
This is same problem as longest commmon substring: https://www.geeksforgeeks.org/longest-common-substring-dp-29/
Time: O(M * N)
Space: O(M + N)

Runtime: 154 ms Beats 72.00%
Memory: 76.38 MB Beats 52.89%
*/
var findLength = function (nums1, nums2) {
  const m = nums1.length;
  const n = nums2.length;
  const dp = Array.from({ length: m + 1 }, () => Array(n + 1));
  //fill firts row and first column to 0
  for (let i = 0; i <= m; i++) dp[i][0] = 0;
  for (let j = 0; j <= n; j++) dp[0][j] = 0;
  let maxLength = 0;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (nums1[i - 1] == nums2[j - 1]) {
        dp[i][j] = 1 + dp[i - 1][j - 1];
        maxLength = Math.max(maxLength, dp[i][j]);
      } else {
        dp[i][j] = 0;
      }
    }
  }
  return maxLength;
};
