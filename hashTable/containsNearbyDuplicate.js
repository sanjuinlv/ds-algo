/* 
219. Contains Duplicate II
https://leetcode.com/problems/contains-duplicate-ii
Type: Easy

Given an integer array nums and an integer k, return true if there are two distinct
indices i and j in the array such that nums[i] == nums[j] and abs(i - j) <= k.

Example 1:
Input: nums = [1,2,3,1], k = 3
Output: true

Example 2:
Input: nums = [1,0,1,1], k = 1
Output: true

Example 3:
Input: nums = [1,2,3,1,2,3], k = 2
Output: false

Constraints
  * 1 <= nums.length <= 10^5
  * -10^9 <= nums[i] <= 10^9
  * 0 <= k <= 10^5
    
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
/* 
Approach I: Using HashTable
Runtime: 116 ms, faster than 89.02% of JavaScript online submissions for Contains Duplicate II.
Memory Usage: 60.3 MB, less than 26.11% of JavaScript online submissions for Contains Duplicate II.
Time Complexity: O(N)
Space Complexity: O(N)
*/
var containsNearbyDuplicate = function (nums, k) {
  const indexMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (indexMap.has(nums[i])) {
      if (Math.abs(i - indexMap.get(nums[i])) <= k) {
        return true;
      }
    }
    indexMap.set(nums[i], i);
  }
  return false;
};

/* 
Approach II: Using HashTable with sliding window
Keep a sliding window of k elements using Hash Table.

Time Complexity: O(N). We do N operations of search, delete and insert, each with constant time complexity.
Space Complexity: O(min(n,k)). The extra space required depends on the number of 
items stored in the hash table, which is the size of the sliding window, min(n,k).

Runtime: 18 ms Beats 72.49%
Memory Usage: 69.18 MB Beats 77.26%
*/
var containsNearbyDuplicate = function (nums, k) {
  const set = new Set();
  for (let i = 0; i < nums.length; i++) {
    //if a match is found, it is guaranteed that its with in the window of length 'k'
    if (set.has(nums[i])) return true;
    set.add(nums[i]);
    //the sliding window size is more than k, so remove the (i-k)th item
    if (set.size > k) {
      set.delete(nums[i - k]);
    }
  }
  return false;
};
