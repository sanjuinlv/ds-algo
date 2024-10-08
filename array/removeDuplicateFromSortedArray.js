/* 
https://leetcode.com/problems/remove-duplicates-from-sorted-array/
Type: Easy

Given a sorted array nums, remove the duplicates in-place such that each element appears 
only once and returns the new length.
Do not allocate extra space for another array, you must do this by modifying the input array
in-place with O(1) extra memory.

Clarification:
Confused why the returned value is an integer but your answer is an array?
Note that the input array is passed in by reference, which means a modification to the input array will be known to the caller as well.

Input: nums = [1,1,2]
Output: 2, nums = [1,2]
Explanation: Your function should return length = 2, with the first two elements of 
nums being 1 and 2 respectively. It doesn't matter what you leave beyond the returned length.

Input: nums = [0,0,1,1,1,2,2,3,3,4]
Output: 5, nums = [0,1,2,3,4]
Explanation: Your function should return length = 5, with the first five elements of nums being modified to 0, 1, 2, 3, and 4 respectively. It doesn't matter what values are set beyond the returned length.

Constraint:

 - 0 <= nums.length <= 3 * 10^4
 - -10^4 <= nums[i] <= 10^4
 - nums is sorted in ascending order.

*/
/**
 * @param {number[]} nums
 * @return {number}
 */
// Runtime: 84 ms
// Memory Usage: 39.1 MB
// Your runtime beats 91.67 % of javascript submissions.
// Your memory usage beats 62.92 % of javascript submissions.
var removeDuplicates = function (nums) {
    let i = 1;
    let j = 1;
    let prev = nums[0];
    while (j < nums.length) {
      if (nums[j] == prev) {
        //until current is same as previous move the pointer
        j++;
      } else {
        //swap with insert point i
        nums[i++] = nums[j++];
        //update previous to last swapped number
        prev = nums[i-1];
      }
    }
    return i;
  };

// Using only two pointers as solution given in leet code
/*
Runtime: 96 ms, faster than 59.88% of JavaScript online submissions for Remove Duplicates from Sorted Array.
Memory Usage: 41 MB, less than 7.27% of JavaScript online submissions for Remove Duplicates from Sorted Array.
*/
var removeDuplicates = function(nums) {
    let i = 0;
    for (let j = 0; j < nums.length; j++) {
        if (nums[j] != nums[i]) {
            nums[++i] = nums[j];
        }
    }
    return i + 1;
};

/**
 * 2nd try
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
  let i = 0; j = 0; 
  const N = nums.length;
  while(j < N && i< N){
      //if ith and jth index items are same, move the j pointer
      if (nums[i] != nums[j]){
        nums[i+1] = nums[j];
        i++;
      }
      j++
  }
  return i+1;
};