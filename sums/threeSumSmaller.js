/* 
259. 3Sum Smaller
https://leetcode.com/problems/3sum-smaller
Tupe - Medium

Given an array of n integers nums and an integer target, find the number of index triplets i, j, k with 0 <= i < j < k < n that satisfy the condition nums[i] + nums[j] + nums[k] < target.

Example 1:
    Input: nums = [-2,0,1,3], target = 2
    Output: 2
    Explanation: Because there are two triplets which sums are less than 2:
    [-2,0,1]
    [-2,0,3]

Example 2:
    Input: nums = [], target = 0
    Output: 0

Example 3:
    Input: nums = [0], target = 0
    Output: 0

Constraints:
 - n == nums.length
 - 0 <= n <= 3500
 - -100 <= nums[i] <= 100
 - -100 <= target <= 100
*/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
/* 
approach I: Sorting with two pointers
Time: O(N^2)
Space: O(NlogN) - for sorting

Runtime: 79 ms Beats 41.56%
Memory:  50.42 MB Beats 84.42%
*/
var threeSumSmaller = function (nums, target) {
  //sort the array
  const N = nums.length;
  nums.sort((a, b) => a - b);
  let sumCount = 0;
  for (let i = 0; i < N; i++) {
    let left = i + 1;
    let right = N - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];
      if (sum < target) {
        //if sum of left and right is smaller then all other element between
        //left and right will be smaller
        sumCount += right - left;
        left++;
      } else right--;
    }
  }
  return sumCount;
};

/* 
Approach II: Two pointer as twoSum smaller
Time: O(N^2)
Space: O(NlogN) - for sorting

Runtime: 81 ms Beats 35.07%
Memory:  51.08 MB Beats 20.78%
*/
var threeSumSmaller = function (nums, target) {
  const N = nums.length;
  const twoSumSmaller = (startIndex, target) => {
    let left = startIndex;
    let right = N - 1;
    let smallSumCount = 0;
    while (left < right) {
      if (nums[left] + nums[right] < target) {
        smallSumCount += right - left;
        left++;
      } else right--;
    }
    return smallSumCount;
  };
  //sort the array
  nums.sort((a, b) => a - b);
  let sumCount = 0;
  for (let i = 0; i < N - 2; i++) {
    sumCount += twoSumSmaller(i + 1, target - nums[i]);
  }
  return sumCount;
};
