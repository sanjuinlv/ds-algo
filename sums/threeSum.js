/* 
15. 3Sum
https://leetcode.com/problems/3sum
Type: Medium

Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? 
Find all unique triplets in the array which gives the sum of zero.
Notice that the solution set must not contain duplicate triplets.

Example 1:
  Input: nums = [-1,0,1,2,-1,-4]
  Output: [[-1,-1,2],[-1,0,1]]
  Explanation: 
  nums[0] + nums[1] + nums[2] = (-1) + 0 + 1 = 0.
  nums[1] + nums[2] + nums[4] = 0 + 1 + (-1) = 0.
  nums[0] + nums[3] + nums[4] = (-1) + 2 + (-1) = 0.
  The distinct triplets are [-1,0,1] and [-1,-1,2].
  Notice that the order of the output and the order of the triplets does not matter.

Example 2:
  Input: nums = [0,1,1]
  Output: []
  Explanation: The only possible triplet does not sum up to 0.

Example 3:
Input: nums = [0,0,0]
Output: [[0,0,0]]
Explanation: The only possible triplet sums up to 0.

Example 24:
Input: nums = []
Output: []

Example 4:
Input: nums = [0]
Output: []

Constraints:
 - 0 <= nums.length <= 3000
 - -10^5 <= nums[i] <= 10^5

*/
/**
 * Medium
 * @param {number[]} nums
 * @return {number[][]}
 */
/* 
Brute Force
Time Complexity: O(N ^ 3)
Space Complexity: O(1)
This will produce duplicate results: [[-1,0,1],[-1,2,-1],[0,1,-1]]
*/
var threeSum = function (nums) {
  const result = [];
  const N = nums.length;
  const target = 0;
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j < N; j++) {
      for (let k = j + 1; k < N; k++) {
        if (nums[i] + nums[j] + nums[k] == target) {
          result.push([nums[i], nums[j], nums[k]]);
        }
      }
    }
  }
  return result;
};

/* 
Approach II: Sorting + Two pointers
Time: O(N^2)
Space: O(LogN) - for sorting

Runtime: 35 ms Beats 69.49%
Memory: 72.07 MB Beats 46.79%
*/
var threeSum = function (nums) {
  const result = [];
  //sort the input array
  nums.sort((a, b) => a - b);
  //If the current value is greater than zero, break from the loop. Remaining values cannot sum to zero.
  for (let i = 0; i < nums.length && nums[i] <= 0; i++) {
    //if curr num is same as prev then continue
    if (i > 0 && nums[i] == nums[i - 1]) continue;
    solveTwoSumSorted(i, nums, result);
  }
  return result;
};

function solveTwoSumSorted(i, nums, result) {
  let left = i + 1;
  let right = nums.length - 1;
  const target = -nums[i];
  while (left < right) {
    if (nums[right] > target - nums[left]) right--;
    else if (nums[right] < target - nums[left]) left++;
    else {
      result.push([nums[left], nums[right], nums[i]]);
      //move the pointer to look up other combination
      left++;
      right--;
      // Increment left pointer while the next value is the same as before to avoid duplicates in the result.
      while (left < right && nums[left] == nums[left - 1]) left++;
    }
  }
}

/* 
Approach III: Sorting + Two Sum
Time: O(N^2)
Space: O(N) for Set

Runtime: 379 ms Beats 12.25%
Memory Usage: 69.80 MB Beats 65.74%
*/
var threeSum = function (nums) {
  const result = [];
  //sort the input array
  nums.sort((a, b) => a - b);
  //If the current value is greater than zero, break from the loop. Remaining values cannot sum to zero.
  for (let i = 0; i < nums.length && nums[i] <= 0; i++) {
    //if curr num is same as prev then continue
    if (i > 0 && nums[i] == nums[i - 1]) continue;
    solveTwoSum(i, nums, result);
  }
  return result;
};


function solveTwoSum(i, nums, result) {
  const target = -nums[i];
  const seen = new Set();
  for (let j = i + 1; j < nums.length; j++) {
    const compliment = target - nums[j];
    if (seen.has(compliment)) {
      result.push([nums[i], compliment, nums[j]]);
      //skip next duplicate nums
      while (j + 1 < nums.length && nums[j] == nums[j + 1]) j++;
    }
    seen.add(nums[j]);
  }
}
