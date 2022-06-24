/* 
You are given an integer array nums sorted in ascending order (with distinct values),
and an integer target.

Suppose that nums is rotated at some pivot unknown to you beforehand 
(i.e., [0,1,2,4,5,6,7] might become [4,5,6,7,0,1,2]).

If target is found in the array return its index, otherwise, return -1.

Input: nums = [4,5,6,7,0,1,2], target = 0
Output: 4

Input: nums = [4,5,6,7,0,1,2], target = 3
Output: -1

Input: nums = [1], target = 0
Output: -1
*/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */

/* 
Approach I: Binary search

find the first num which is not in descreasing order, to indentify the rotation point
target is in first half if its greater than 0th index and at pivot point
or in second half if its greter than first next pivot

nums = [4,5,6,7,0,1,2]
nums = [7,0,1,2,4,5,6], target = 4
nums = [6,7,0,1,2,4,5], target = 4
nums = [-1,-9,-7,-6,-5,-3,-2], target = 4

Runtime: 72 ms, faster than 96.40% of JavaScript online submissions for Search in Rotated Sorted Array.
Memory Usage: 39 MB, less than 17.83% of JavaScript online submissions for Search in Rotated Sorted Array.
*/
var search = function (nums, target) {
  if (nums.length == 0) return -1;
  const binarySearch = (lo, hi) => {
    if (lo > hi) return -1;
    let mid = lo + parseInt((hi - lo) / 2);
    console.log(`lo: ${lo}, hi: ${hi}, mid[${mid}]: ${nums[mid]}`);
    if (target == nums[mid]) {
      return mid;
    } else if (target < nums[mid]) {
      // target is in left
      return binarySearch(lo, mid - 1);
    } else {
      //target is in right
      return binarySearch(mid + 1, hi);
    }
  };

  let rotateIndex = 0;
  while (
    rotateIndex < nums.length - 1 &&
    nums[rotateIndex] < nums[rotateIndex + 1]
  ) {
    rotateIndex++;
  }
  console.log(`i: ${rotateIndex}`);
  if (target >= nums[0] && target <= nums[rotateIndex]) {
    //search in the left side
    return binarySearch(0, rotateIndex);
  } else {
    //search in the right side
    return binarySearch(rotateIndex + 1, nums.length - 1);
  }
};

//Solution Reference
/* 
Binary Search (Improved)
Time complexity: O(log N)
Space complexity: O(1)

Runtime: 72 ms, faster than 96.40% of JavaScript online submissions for Search in Rotated Sorted Array.
Memory Usage: 39.1 MB, less than 12.08% of JavaScript online submissions for Search in Rotated Sorted Array.
*/
var search = function (nums, target) {
  if (nums.length == 1) return nums[0] == target ? 0 : -1;
  const findRotateIndex = (left, right) => {
    if (nums[left] < nums[right]) return 0;
    while (left <= right) {
      let pivot = parseInt((left + right) / 2);
      console.log(`left: ${left}, right: ${right}, mid: ${pivot}`);
      //we found the rotate index, e.g the pivot is '7' and next value '0'
      if (nums[pivot] > nums[pivot + 1]) {
        return pivot + 1;
      } else if (nums[pivot] < nums[left]) {
        right = pivot - 1;
      } else {
        left = pivot + 1;
      }
    }
    return 0;
  };
  const binarySearch = (left, right) => {
    while (left <= right) {
      let mid = parseInt((left + right) / 2);
      console.log(`left: ${left}, right: ${right}, mid: ${mid}`);
      if (target == nums[mid]) {
        return mid;
      } else if (target < nums[mid]) {
        //target is in left side
        right = mid - 1;
      } else {
        //target is in right side
        left = mid + 1;
      }
    }
    return -1;
  };
  const N = nums.length;
  const rotateIndex = findRotateIndex(0, N - 1);
  console.log(`rotateIndex: ${rotateIndex}`);
  //if target is the smallest element
  if (nums[rotateIndex] == target) return rotateIndex;
  //if array is not rotated, search in entire array
  if (rotateIndex == 0) {
    return binarySearch(0, N - 1);
  }
  if (target < nums[0]) {
    //search in the right side
    return binarySearch(rotateIndex, N - 1);
  } else {
    //search in the left side
    return binarySearch(0, rotateIndex);
  }
};

/* 
Approach II: One pass binary search

Runtime: 72 ms, faster than 96.40% of JavaScript online submissions for Search in Rotated Sorted Array.
Memory Usage: 38.9 MB, less than 43.96% of JavaScript online submissions for Search in Rotated Sorted Array.
*/
var search = function (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left <= right) {
    //mid
    const mid = parseInt(left + (right - left) / 2);
    if (nums[mid] === target) return mid;
    //if mid is less than left then this part is not rotated
    if (nums[mid] >= nums[left]) {
      //the number is between the sorted array
      if (target >= nums[left] && target < nums[mid]) {
        right = mid - 1;
      } else {
        //look in other half
        left = mid + 1;
      }
    } else {
      //mid < nums[start] implies rotation index is between 0 and mid.
      //It implies that sub-array from mid to end is not rotated
      //check if target is between mid and end
      if (target > nums[mid] && target <= nums[right]) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return -1;
};
