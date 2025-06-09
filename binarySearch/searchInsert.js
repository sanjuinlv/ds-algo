/* 
35. Search Insert Position
https://leetcode.com/problems/search-insert-position
Type: Easy

Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.
You must write an algorithm with O(log n) runtime complexity.

Example 1:
Input: nums = [1,3,5,6], target = 5
Output: 2

Example 2:
Input: nums = [1,3,5,6], target = 2
Output: 1

Example 3:
Input: nums = [1,3,5,6], target = 7
Output: 4

Constraints:
 - 1 <= nums.length <= 10^4
 - -10^4 <= nums[i] <= 10^4
 - nums contains distinct values sorted in ascending order.
 - -10^4 <= target <= 10^4
*/

/* 
Approach I: Binary Search 
Time: O(NLogN)
Space: O(1)

Runtime: 0 ms Beats 100.00%
Memory: 53.33 MB Beats 82.41%
*/
var searchInsert = function (nums, target) {
  let N = nums.length;
  let left = 0;
  let right = N - 1;
  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2);
    //insert position found
    if (nums[mid] == target) return mid;
    //look for smaller index ot the left
    if (nums[mid] > target) right = mid - 1;
    else left = mid + 1; //look for higher index to the right
  }
  return left;
};

/* 
Approach II: Binary Search - using lower bound approach
Time: O(NLogN)
Space: O(1)

Runtime: 0 ms Beats 100.00%
Memory: 53.33 MB Beats 82.41%
*/
var searchInsert = function (nums, target) {
  let N = nums.length;
  let lo = 0;
  let hi = N - 1;
  let ans = N;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    //if the num at mid is >= then this can be possible anser
    if (nums[mid] >= target) {
      ans = mid;
      //look for smaller index ot the left
      hi = mid - 1;
    } else {
      lo = mid + 1; //look for higher index to the right
    }
  }
  return ans;
};
