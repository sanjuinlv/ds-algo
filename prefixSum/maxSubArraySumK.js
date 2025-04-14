/* 
325. Maximum Size Subarray Sum Equals k
https://leetcode.com/problems/maximum-size-subarray-sum-equals-k
Type - Medium

Given an integer array nums and an integer k, return the maximum length of a
subarray that sums to k. If there is not one, return 0 instead.
 
Example 1:
    Input: nums = [1,-1,5,-2,3], k = 3
    Output: 4
    Explanation: The subarray [1, -1, 5, -2] sums to 3 and is the longest.

Example 2:
    Input: nums = [-2,-1,2,1], k = 1
    Output: 2
    Explanation: The subarray [-1, 2] sums to 1 and is the longest.

Constraints:
 - 1 <= nums.length <= 2 * 10^5
 - -10^4 <= nums[i] <= 10^4
 - -10^9 <= k <= 10^9
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
/* 
Approach I: Prefix Sum + Hash Map

Time: O(N)
Space: O(N)

Runtime: 65 ms Beats 100.00%
Memory: 91.86 MB Beats 49.38%
*/
var maxSubArrayLen = function (nums, k) {
  const N = nums.length;
  const prefixSumMap = new Map();
  let prefixSum = 0;
  let longestSubarray = 0;
  for (let i = 0; i < N; i++) {
    prefixSum += nums[i];
    //check if all numbers seen so far sum to k
    if (prefixSum == k) {
      longestSubarray = i + 1;
    }
    const compliment = prefixSum - k;
    //check if any subarray seen so far sums k
    if (prefixSumMap.has(compliment)) {
      longestSubarray = Math.max(
        longestSubarray,
        i - prefixSumMap.get(compliment)
      );
    }
    //update the prefix map only when prefix sum does not exist in map
    if (!prefixSumMap.has(prefixSum)) prefixSumMap.set(prefixSum, i);
  }
  return longestSubarray;
};
