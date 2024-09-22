/* 
https://leetcode.com/problems/binary-search/description/
Type: Easy

Given an array of integers nums which is sorted in ascending order, and an integer
target, write a function to search target in nums. If target exists, then return
its index. Otherwise, return -1.

You must write an algorithm with O(log n) runtime complexity.
*/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
/* 
Approach: Recursive
Time: O(logN)
Space: O(logN), Stack space
Runtime: 67 ms, faster than 8.36% of JavaScript online submissions for Binary Search.
Memory Usage: 52.76 MB, less than 11.75% of JavaScript online submissions for Binary Search.
*/
var search = function (nums, target) {
  const binarySearch = (left, right) => {
    if (left > right) return -1;
    const mid = left + Math.floor((right - left) / 2);
    if (target == nums[mid]) return mid;
    if (nums[mid] < target) return binarySearch(mid + 1, right);
    else return binarySearch(left, mid - 1);
  };
  return binarySearch(0, nums.length - 1);
};

/* 
Approach: Iterative
Time: O(logN)
Space: O(1), Stack space
Runtime: 57 ms, faster than 51.28% of JavaScript online submissions for Binary Search.
Memory Usage: 51.99 MB, less than 67.09% of JavaScript online submissions for Binary Search.
*/
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    const mid = left + parseInt((right - left) / 2);
    if (nums[mid] === target) return mid;
    if (nums[mid] > target) {
      //mid is greater than target so look into left side
      right = mid - 1;
    } else {
      //mid is less than target so look into right side
      left = mid + 1;
    }
  }
  return -1;
};
