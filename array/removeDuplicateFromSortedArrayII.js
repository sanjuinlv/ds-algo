/*
80. Remove Duplicates from Sorted Array II
https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii/description/
Type: Medium

Given an integer array nums sorted in non-decreasing order, remove some duplicates in-place such that each unique element appears at most twice. The relative order of the elements should be kept the same.

Since it is impossible to change the length of the array in some languages, you must instead have the result be placed in the first part of the array nums. More formally, if there are k elements after removing the duplicates, then the first k elements of nums should hold the final result. It does not matter what you leave beyond the first k elements.

Return k after placing the final result in the first k slots of nums.

Do not allocate extra space for another array. You must do this by modifying the input array in-place with O(1) extra memory.

Custom Judge:

The judge will test your solution with the following code:

int[] nums = [...]; // Input array
int[] expectedNums = [...]; // The expected answer with correct length

int k = removeDuplicates(nums); // Calls your implementation

assert k == expectedNums.length;
for (int i = 0; i < k; i++) {
    assert nums[i] == expectedNums[i];
}
If all assertions pass, then your solution will be accepted.
 
Example 1:
Input: nums = [1,1,1,2,2,3]
Output: 5, nums = [1,1,2,2,3,_]
Explanation: Your function should return k = 5, with the first five elements of nums being 1, 1, 2, 2 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).

Example 2:
Input: nums = [0,0,1,1,1,1,2,3,3]
Output: 7, nums = [0,0,1,1,2,3,3,_,_]
Explanation: Your function should return k = 7, with the first seven elements of nums being 0, 0, 1, 1, 2, 3 and 3 respectively.
It does not matter what you leave beyond the returned k (hence they are underscores).
 

Constraints:
 - 1 <= nums.length <= 3 * 10^4
 - -10^4 <= nums[i] <= 10^4
 - nums is sorted in non-decreasing order.
 */

/**
 * @param {number[]} nums
 * @return {number}
 */
/* 
Runtime: 54 ms Beats 90.11%
Memory: 51.46 MB Beats 83.19%
*/
var removeDuplicates = function (nums) {
  let i = 1;
  //count of current element occurence
  let count = 1;
  for (let j = 1; j < nums.length; j++) {
    //if prev element is same and count is less than 2 then continue
    if (nums[j] == nums[j - 1]) {
      count++;
    } else {
      count = 1;
    }
    if (count <= 2) {
      nums[i++] = nums[j];
    }
  }
  return i;
};

/* 
Runtime: 49 ms Beats 97.45%
Memory: 51.73 MB Beats 69.69%
*/
var removeDuplicates = function (nums) {
  let i = 1; // Pointer to iterate through the array
  let j = 1; // Pointer to track position for valid elements
  let count = 1; // Count of occurrences of the current element
  while (i < nums.length) {
    //prev element is same
    if (nums[i] == nums[i - 1]) {
      count++;
      //if count is more than 2 then we don't move j but only i
      if (count > 2) {
        i++;
        continue;
      }
    } else count = 1;
    nums[j] = nums[i];
    i++;
    j++;
  }
  return j;
};
