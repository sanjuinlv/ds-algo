/* 
153. Find Minimum in Rotated Sorted Array
https://leetcode.com/problems/find-minimum-in-rotated-sorted-array
Type: Medium

Suppose an array of length n sorted in ascending order is rotated between
 1 and n times. For example, the array nums = [0,1,2,4,5,6,7] might become:

[4,5,6,7,0,1,2] if it was rotated 4 times.
[0,1,2,4,5,6,7] if it was rotated 7 times.
Notice that rotating an array [a[0], a[1], a[2], ..., a[n-1]] 1 time results
 in the array [a[n-1], a[0], a[1], a[2], ..., a[n-2]].

Given the sorted rotated array nums of unique elements, return the minimum 
element of this array.

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
 * @param {number[]} nums
 * @return {number}
 */
//[2,3,4,5,1]
//[2,1]
/* 
Approach: Binary Search
Time: O(LogN)
Space: O(1)

Runtime: 0 ms Beats 100.00%
Memory Usage: 53.29 MB Beats 79.35%
*/
var findMin = function (nums) {
  const N = nums.length;
  let left = 0;
  let right = N - 1;
  if (N == 1) return nums[left];
  // if the last element is greater than the first element then there is no rotation.
  // e.g. 1 < 2 < 3 < 4 < 5 < 7. Already sorted array.
  // Hence the smallest element is first element. A[0]
  if (nums[right] > nums[left]) return nums[left];
  while (left < right) {
    const mid = parseInt(left + (right - left) / 2);
    // if the mid element is lesser than its previous element then mid element is the smallest
    if (nums[mid - 1] > nums[mid]) return nums[mid];
    // if the mid element is greater than its next element then mid+1 element is the smallest
    // This point would be the point of change. From higher to lower value.
    if (nums[mid] > nums[mid + 1]) return nums[mid + 1];
    // if the mid elements value is greater than the 0th element this means
    // the least value is still somewhere to the right as we are still dealing with elements
    // greater than nums[0]
    if (nums[mid] > nums[0]) left = mid + 1;
    // if nums[0] is greater than the mid value then this means the smallest value is
    // somewhere to the left
    else right = mid;
  }
  return nums[left];
};
