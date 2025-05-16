/*
16. 3Sum Closest
https://leetcode.com/problems/3sum-closest/
Tyep: Medium

Given an integer array nums of length n and an integer target, find three integers in nums such that the sum is closest to target.
Return the sum of the three integers.
You may assume that each input would have exactly one solution.
 
Example 1:
Input: nums = [-1,2,1,-4], target = 1
Output: 2
Explanation: The sum that is closest to the target is 2. (-1 + 2 + 1 = 2).

Example 2:
Input: nums = [0,0,0], target = 1
Output: 0

Constraints:
 - 3 <= nums.length <= 1000
 - -1000 <= nums[i] <= 1000
 - -10^4 <= target <= 10^4
 */
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
/* 
Approach: Brute Force
Time: O(N^3)
Space: O(1)
*/
var threeSumClosest = function (nums, target) {
  let closestSum = Number.MAX_SAFE_INTEGER;
  let distanceFromTarget = Number.MAX_SAFE_INTEGER;
  const N = nums.length;
  for (let i = 0; i <= N - 3; i++) {
    for (j = i + 1; j <= N - 2; j++) {
      let twoSum = nums[i] + nums[j];
      for (let k = j + 1; k <= N - 1; k++) {
        if (Math.abs(target - (twoSum + nums[k])) < distanceFromTarget) {
          distanceFromTarget = Math.abs(target - (twoSum + nums[k]));
          closestSum = twoSum + nums[k];
        }
      }
    }
  }
  return closestSum;
};

/* 
Approach II: Two pointers
Time: O(N^2) We have outer and inner loops, each going through N elements.
Sorting the array takes O(nlogn), so overall complexity is O(nlogn+n^2). 
This is asymptotically equivalent to O(n^2).
Space: from O(logn) to O(n), depending on the implementation of the sorting algorithm.

Runtime: 13 ms Beats 77.70%
Memory Usage: 55.03 MB Beats 54.80%
*/
var threeSumClosest = function (nums, target) {
  let closest = Infinity;
  const N = nums.length;
  //sort the array
  nums.sort((a, b) => a - b);
  for (let i = 0; i < N - 2; i++) {
    if (i > 0 && nums[i] == nums[i - 1]) continue; // Skip duplicates.
    let left = i + 1;
    let right = N - 1;
    while (left < right) {
      let localSum = nums[i] + nums[left] + nums[right];
      if (Math.abs(target - localSum) < Math.abs(closest - target)) {
        closest = localSum;
      }
      if (localSum > target) right--; //try smaller sum to approach target
      else if (localSum < target) left++; //try bigger sum to approach target
      else return target; //sum === target, return target
    }
  }
  return closest;
};

/* 
Approach II: Sort + two sum closest with two pointer

Runtime: 14 ms Beats 68.76%
Memory: 56.34 MB Beats 12.51%
*/
var threeSumClosest = function (nums, target) {
  const N = nums.length;
  //sort the array
  nums.sort((a, b) => a - b);
  let closestSum = Infinity;
  for (let i = 0; i < N; i++) {
    if (i > 0 && nums[i] == nums[i - 1]) continue; // Skip duplicates.
    // Find closest sum for the current
    const currClosest = twoSumClosest(i, nums, target);
    if (Math.abs(target - currClosest) < Math.abs(target - closestSum)) {
      closestSum = currClosest;
    }
    // If we found exact match, return immediately
    if (closestSum == target) return target;
  }
  return closestSum;
};

function twoSumClosest(i, nums, target) {
  let left = i + 1;
  let right = nums.length - 1;
  let closest = Infinity;
  while (left < right) {
    const localSum = nums[i] + nums[left] + nums[right];
    if (Math.abs(target - localSum) < Math.abs(target - closest)) {
      closest = localSum;
    }
    if (localSum > target) right--; //try smaller sum to approach target
    else if (localSum < target) left++; //try bigger sum to approach target
    else return target; // If we found exact match, return immediately
  }
  return closest;
}
