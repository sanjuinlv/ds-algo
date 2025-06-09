/* 
81. Search in Rotated Sorted Array II
https://leetcode.com/problems/search-in-rotated-sorted-array-ii
Type: Medium

There is an integer array nums sorted in non-decreasing order (not necessarily with distinct values).

Before being passed to your function, nums is rotated at an unknown pivot index k (0 <= k < nums.length) such that the resulting array is [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]] (0-indexed). For example, [0,1,2,4,4,4,5,6,6,7] might be rotated at pivot index 5 and become [4,5,6,6,7,0,1,2,4,4].

Given the array nums after the rotation and an integer target, return true if target is in nums, or false if it is not in nums.

You must decrease the overall operation steps as much as possible.

Example 1:
Input: nums = [2,5,6,0,0,1,2], target = 0
Output: true

Example 2:
Input: nums = [2,5,6,0,0,1,2], target = 3
Output: false
 
Constraints:
 - 1 <= nums.length <= 5000
 - -10^4 <= nums[i] <= 10^4
 - nums is guaranteed to be rotated at some pivot.
 - -10^4 <= target <= 10^4
 
Follow up: This problem is similar to Search in Rotated Sorted Array, but nums may contain duplicates. Would this affect the runtime complexity? How and why?
*/

/* 
Approach I: Binary Search
Time: O(N) - in worst case we may need to do n/2 operations
Space: O(1)

Runtime: 0 ms Beats 100.00%
Memory: 53.53 MB Beats 85.11%
*/
var search = function (nums, target) {
  const N = nums.length;
  let lo = 0;
  let hi = N - 1;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    //target found
    if (target === nums[mid]) return true;
    if (nums[lo] == nums[mid] && nums[mid] == nums[hi]) {
        lo++;
        hi--;
        continue;
    }
    //array is rotated between lo and mid
    if (nums[mid] >= nums[lo]) {
      //target is between lo and mid, then then look up between lo and mid-1
      if (target >= nums[lo] && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      //target is between mid and hi, then look up between mid+1 and hi
      if (target > nums[mid] && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return false;
};