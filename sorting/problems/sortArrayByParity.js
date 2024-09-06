/* 
https://leetcode.com/problems/sort-array-by-parity/
Type: Easy

Given an integer array nums, move all the even integers at the beginning of the array followed by all the odd integers.

Return any array that satisfies this condition.

Example 1:
Input: nums = [3,1,2,4]
Output: [2,4,3,1]
Explanation: The outputs [4,2,3,1], [2,4,1,3], and [4,2,1,3] would also be accepted.

Example 2:
Input: nums = [0]
Output: [0]
 
Constraints:
 - 1 <= nums.length <= 5000
 - 0 <= nums[i] <= 5000
*/
/**
 * @param {number[]} A
 * @return {number[]}
 */

/*
Aproach I : Using odd and even property 
Your runtime beats 84.74 % of javascript submissions.
Your memory usage beats 77.01 % of javascript submissions.
Runtime: 92 ms
Memory Usage: 38.8 MB
*/
var sortArrayByParity = function(A) {
    let slowPointer = 0;
    for (let fastPointer = 1; fastPointer < A.length; fastPointer++) {
        // Left side element is even, move the slow pointer
        if (A[slowPointer] % 2 == 0) {
            slowPointer++;
        } else if ((A[slowPointer] + A[fastPointer]) % 2 != 0) {
            //left is not even, and both element is not even
            // swap the elements
            let temp = A[fastPointer];
            A[fastPointer] = A[slowPointer];
            A[slowPointer++] = temp;
        }
    }
    return A;
}

/* 
Approach II: Using two pointers
Time: O(N)
Space: O(1)

Runtime: 69 ms Beats 42.41%
Memory: 52.15 MB Beats 48.25%
*/
var sortArrayByParity = function (nums) {
    //slow pointer
    let i = 0;
    for (let j = 0; j < nums.length; j++) {
      if (nums[j] % 2 == 0) {
        //swap element
        const temp = nums[i];
        nums[i] = nums[j];
        nums[j] = temp;
        i++;
      }
    }
    return nums;
  };