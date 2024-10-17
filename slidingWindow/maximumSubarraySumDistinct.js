/* 
2461. Maximum Sum of Distinct Subarrays With Length K
https://leetcode.com/problems/maximum-sum-of-distinct-subarrays-with-length-k
Type - Medium

You are given an integer array nums and an integer k. Find the maximum subarray sum of all the subarrays of nums that meet the following conditions:

The length of the subarray is k, and
All the elements of the subarray are distinct.
Return the maximum subarray sum of all the subarrays that meet the conditions. If no subarray meets the conditions, return 0.

A subarray is a contiguous non-empty sequence of elements within an array.

Example 1:
    Input: nums = [1,5,4,2,9,9,9], k = 3
    Output: 15
    Explanation: The subarrays of nums with length 3 are:
    - [1,5,4] which meets the requirements and has a sum of 10.
    - [5,4,2] which meets the requirements and has a sum of 11.
    - [4,2,9] which meets the requirements and has a sum of 15.
    - [2,9,9] which does not meet the requirements because the element 9 is repeated.
    - [9,9,9] which does not meet the requirements because the element 9 is repeated.
    We return 15 because it is the maximum subarray sum of all the subarrays that meet the conditions

Example 2:
    Input: nums = [4,4,4], k = 3
    Output: 0
    Explanation: The subarrays of nums with length 3 are:
    - [4,4,4] which does not meet the requirements because the element 4 is repeated.
    We return 0 because no subarrays meet the conditions.
 
Constraints:
 - 1 <= k <= nums.length <= 105
 - 1 <= nums[i] <= 105
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
/* 
Approach : Sliding Window
Time: O(N)
Space: O(K)

Runtime: 131 ms Beats 64.42%
Memory: 79.20 MB Beats 39.10%
*/
var maximumSubarraySum = function (nums, k) {
  const N = nums.length;
  let i = 0;
  let j = 0;
  let maxSum = 0;
  let currSum = 0;
  let numMap = new Map();
  while (j < N) {
    currSum += nums[j];
    numMap.set(nums[j], (numMap.get(nums[j]) || 0) + 1);
    if (j - i + 1 == k) {
      //update maxLength
      if (numMap.size == k) maxSum = Math.max(maxSum, currSum);
      const d = nums[i];
      //remove the first element of the window
      currSum -= d;
      numMap.set(d, numMap.get(d) - 1);
      //update the map count
      if (numMap.get(d) == 0) numMap.delete(d);
      i++;
    }
    j++;
  }
  return maxSum;
};
