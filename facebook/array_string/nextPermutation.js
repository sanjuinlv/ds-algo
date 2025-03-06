/* 
31. Next Permutation
https://leetcode.com/problems/next-permutation/
Type: Medium

A permutation of an array of integers is an arrangement of its members into a sequence or linear order.

For example, for arr = [1,2,3], the following are all the permutations of arr: [1,2,3], [1,3,2], [2, 1, 3], [2, 3, 1], [3,1,2], [3,2,1].
The next permutation of an array of integers is the next lexicographically greater permutation of its integer. More formally, if all the permutations of the array are sorted in one container according to their lexicographical order, then the next permutation of that array is the permutation that follows it in the sorted container. If such arrangement is not possible, the array must be rearranged as the lowest possible order (i.e., sorted in ascending order).

For example, the next permutation of arr = [1,2,3] is [1,3,2].
Similarly, the next permutation of arr = [2,3,1] is [3,1,2].
While the next permutation of arr = [3,2,1] is [1,2,3] because [3,2,1] does not have a lexicographical larger rearrangement.
Given an array of integers nums, find the next permutation of nums.

The replacement must be in place and use only constant extra memory.

Input: nums = [1,2,3]
Output: [1,3,2]

Input: nums = [3,2,1]
Output: [1,2,3]

Input: nums = [1,1,5]
Output: [1,5,1]

Input: nums = [1]
Output: [1]

Constraints:
 - 1 <= nums.length <= 100
 - 0 <= nums[i] <= 100
*/
/**
 * Medium
 * Not very intutive problem
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/* 
Runtime: 0 ms Beats 100.00%
Memory Usage: 54.37 MB Beats 15.37%
*/
var nextPermutation = function (nums) {
  const swap = (i, j, A) => {
    const temp = A[i];
    A[i] = A[j];
    A[j] = temp;
  };
  const reverse = (start, end, A) => {
    while (start < end) {
      swap(start++, end--, A);
    }
  };
  let N = nums.length;
  let i = N - 2;
  // 1. start from end and scan left until we find 'i' such that a[i] < a[i+1]
  while (i >= 0 && nums[i] >= nums[i + 1]) i--;
  // 2. find j such that a[j] > a[i] and then swap
  if (i >= 0) {
    let j = N - 1;
    while (j >= 0 && nums[j] <= nums[i]) j--;
    if (i < j) swap(i, j, nums);
  }
  //3. reverse array from i+1
  reverse(i + 1, N - 1, nums);
};
