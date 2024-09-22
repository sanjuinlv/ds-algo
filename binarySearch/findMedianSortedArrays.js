/* 
https://leetcode.com/problems/find-minimum-in-rotated-sorted-array/
Type: Medium

Suppose an array of length n sorted in ascending order is rotated between 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:

[4,5,6,7,0,1,2] if it was rotated 4 times.
[0,1,2,4,5,6,7] if it was rotated 7 times.
Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum element of this array.

You must write an algorithm that runs in O(log n) time.

Example 1:
  Input: nums = [3,4,5,1,2]
  Output: 1
  Explanation: The original array was [1,2,3,4,5] rotated 3 times.

Example 2:
  Input: nums = [4,5,6,7,0,1,2]
  Output: 0
  Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.

Example 3:
  Input: nums = [11,13,15,17]
  Output: 11
  Explanation: The original array was [11,13,15,17] and it was rotated 4 times. 
 

Constraints:
 - n == nums.length
 - 1 <= n <= 5000
 - -5000 <= nums[i] <= 5000
 - All the integers of nums are unique.
 - nums is sorted and rotated between 1 and n times.

*/
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
/* 
Time: O(m+n): Merge and find median
Space: O(m+n)
Runtime: 134 ms, faster than 65.98% of JavaScript online submissions for Median of Two Sorted Arrays.
Memory Usage: 46.8 MB, less than 75.66% of JavaScript online submissions for Median of Two Sorted Arrays.
*/
var findMedianSortedArrays = function (nums1, nums2) {
  const m = nums1.length;
  const n = nums2.length;
  const mergedArray = new Array(m + n);
  let i = 0,
    j = 0,
    k = 0;
  while (i < m && j < n) {
    if (nums1[i] <= nums2[j]) {
      mergedArray[k++] = nums1[i++];
    } else {
      mergedArray[k++] = nums2[j++];
    }
  }
  //copy remaining items from nums1 or nums2
  while (i < m) mergedArray[k++] = nums1[i++];
  while (j < m) mergedArray[k++] = nums2[j++];
  //even no of elements
  if ((m + n) % 2 == 0) {
    const mid = 0 + parseInt((m + n - 1) / 2);
    return (mergedArray[mid] + mergedArray[mid + 1]) / 2;
  } else {
    //odd number
    return mergedArray[parseInt((m + n) / 2)];
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
  //if input1 length is greater than switch them so that input1 is smaller than input2.
  if (nums1.length > nums2.length) return findMedianSortedArrays(nums2, nums1);
  const x = nums1.length;
  const y = nums2.length;
  let lo = 0,
    hi = x;
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
