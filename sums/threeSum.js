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

// Solution reference
/* 
Approach I: Two pointers

Time complexity: O(N^2) 
Sorting Array: O(NLogN) 
twoSum is O(N) and we call it N times so its O(N^2)
total complexity: O(NlogN+ N^2) = O(N^2)

Space complexity: O(logN) to O(N) based on sorting algorithm 

Runtime: 170 ms, faster than 36.41% of JavaScript online submissions for 3Sum.
Memory Usage: 65.84 MB, less than 36.59% of JavaScript online submissions for 3Sum.
*/
var threeSum = function (nums) {
  const twoSumSorted = (nums, i, result) => {
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        //move the pointer to look up other combination
        left++;
        right--;
        // Increment left pointer while the next value is the same as before to avoid duplicates in the result.
        while (left < right && nums[left] == nums[left - 1]) left++;
      } else if (sum > 0) {
        right--;
      } else {
        left++;
      }
    }
  };
  const N = nums.length;
  //sort the array
  nums = nums.sort((a, b) => a - b);
  const result = [];
  //If the current value is greater than zero, break from the loop. Remaining values cannot sum to zero.
  for (let i = 0; i < nums.length && nums[i] <= 0; i++) {
    //If the current value is the same as the one before, skip it.
    if (i === 0 || nums[i] != nums[i - 1]) {
      twoSumSorted(nums, i, result);
    }
  }
  return result;
};

// Approach 2: Hashset
/*
Time complexity: O(N ^ 2)
Sorting Array: O(NLogN)
twoSum is O(N) and we call it N times so its O(N ^ 2)
total complexity: O(NlogN + N ^ 2) = O(N ^ 2)
Space complexity: O(N) for hashset

Runtime: 468 ms Beats 13.19%
Memory: 64.73 MB Beats 80.91%
*/

var threeSum = function (nums) {
  const twoSum = (nums, i, result) => {
    const seen = new Set();
    for (let j = i + 1; j < nums.length; j++) {
      // a + b + c = k (=0) => a + b = k - c = 0 - c = -c;
      // we are getting c from index i (nums[i]). So we need to solve the two sum for a+b and target as -c
      // so a = -c - b, i.e, a = -nums[i] - nums[j];
      const compliment = -nums[i] - nums[j];
      if (seen.has(compliment)) {
        result.push([nums[i], nums[j], compliment]);
        // Increment the pointer while the next value is the same as before to avoid duplicates in the result.
        while (j + 1 < nums.length && nums[j] == nums[j + 1]) j++;
      }
      seen.add(nums[j]);
    }
  };
  const N = nums.length;
  //sort the array
  nums = nums.sort((a, b) => a - b);
  const result = [];
  //If the current value is greater than zero, break from the loop. Remaining values cannot sum to zero.
  for (let i = 0; i < nums.length && nums[i] <= 0; i++) {
    //If the current value is the same as the one before, skip it.
    if (i > 0 && nums[i] == nums[i - 1]) continue;
    twoSum(nums, i, result);
  }
  return result;
};

/* 
Runtime: 531 ms, faster than 24.16% of JavaScript online submissions for 3Sum.
Memory Usage: 59.8 MB, less than 19.28% of JavaScript online submissions for 3Sum.
*/
var threeSum = function (nums) {
  const result = [];
  const N = nums.length;
  const solveTwoSum = (i) => {
    const target = -nums[i];
    const seen = new Set();
    for (let j = i + 1; j < N; j++) {
      const compliment = target - nums[j];
      if (seen.has(compliment)) {
        result.push([nums[i], compliment, nums[j]]);
        // Increment the pointer while the next value is the same as before to avoid duplicates in the result.
        while (j + 1 < nums.length && nums[j] == nums[j + 1]) j++;
      }
      seen.add(nums[j]);
    }
  };
  nums.sort();
  for (let i = 0; i <= N - 3; i++) {
    if (i > 0 && nums[i] == nums[i - 1]) continue;
    solveTwoSum(i);
  }
  return result;
};
