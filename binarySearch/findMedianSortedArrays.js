/* 
4. Median of Two Sorted Arrays
https://leetcode.com/problems/median-of-two-sorted-arrays
Type: Hard

Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.

The overall run time complexity should be O(log (m+n)).

Example 1:
  Input: nums1 = [1,3], nums2 = [2]
  Output: 2.00000
  Explanation: merged array = [1,2,3] and median is 2.

Example 2:
  Input: nums1 = [1,2], nums2 = [3,4]
  Output: 2.50000
  Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
 
Constraints:
 - nums1.length == m
 - nums2.length == n
 - 0 <= m <= 1000
 - 0 <= n <= 1000
 - 1 <= m + n <= 2000
 - -10^6 <= nums1[i], nums2[i] <= 10^6
*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
/* 
Time: O(m+n): Merge and find median
Space: O(m+n)
Runtime: 2 ms Beats 89.69%
Memory Usage: 59.92 MB Beats 32.86%
*/
var findMedianSortedArrays = function (nums1, nums2) {
  let m = nums1.length;
  let n = nums2.length;
  let k = 0;
  let i = 0;
  let j = 0;
  let merged = [];
  while (i < m && j < n) {
    //nums1 entry is smaller than nums2
    if (nums1[i] <= nums2[j]) merged[k++] = nums1[i++];
    else merged[k++] = nums2[j++];
  }
  //copy remaining items from nums1 and nums2
  while (i < m) merged[k++] = nums1[i++];
  while (j < n) merged[k++] = nums2[j++];
  //even no of elements
  if (k % 2 == 0) {
    const mid = Math.floor((k - 1) / 2);
    return (merged[mid] + merged[mid + 1]) / 2;
  } else {
    return merged[parseInt(k / 2)];
  }
};

/* 
Approach: Using binary search
Time: O(LogN)
Space: O(1)
Runtime: 201 ms, faster than 24.34% of JavaScript online submissions for Median of Two Sorted Arrays.
Memory Usage: 46.7 MB, less than 77.39% of JavaScript online submissions for Median of Two Sorted Arrays.
*/
var findMedianSortedArrays = function (nums1, nums2) {
  //if input1 length is greater than input2 then switch them so that input1 is smaller than input2.
  if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
  const x = nums1.length;
  const y = nums2.length;
  let lo = 0;
  let hi = x;
  while (lo <= hi) {
    let partitionX = parseInt((lo + hi) / 2);
    let partitionY = parseInt((x + y + 1) / 2) - partitionX;

    //if partitionX is 0 it means nothing is there on left side. Use -INF for maxLeftX
    let maxLeftX = partitionX === 0 ? -Infinity : nums1[partitionX - 1];
    //if partitionX is length of input then there is nothing on right side. Use +INF for minRightX
    let minRightX = partitionX === x ? Infinity : nums1[partitionX];

    let maxLeftY = partitionY === 0 ? -Infinity : nums2[partitionY - 1];
    let minRightY = partitionY === y ? Infinity : nums2[partitionY];

    if (maxLeftX <= minRightY && minRightX >= maxLeftY) {
      //We have partitioned array at correct place
      // Now get max of left elements and min of right elements to get the median in case of even length
      // combined array size or get max of left for odd length combined array size.
      if ((x + y) % 2 == 0) {
        return (
          (Math.max(maxLeftX, maxLeftY) + Math.min(minRightX, minRightY)) / 2
        );
      } else {
        return Math.max(maxLeftX, maxLeftY);
      }
    } else if (maxLeftX > minRightY) {
      hi = partitionX - 1;
    } else {
      lo = partitionX + 1;
    }
  }
  return -1;
};
