/* 
Given a non-empty array of decimal digits representing a non-negative integer, increment one to the integer.
The digits are stored such that the most significant digit is at the head of the list, and each element in the array contains a single digit.
You may assume the integer does not contain any leading zero, except the number 0 itself.

Example 1:
Input: digits = [1,2,3]
Output: [1,2,4]
Explanation: The array represents the integer 123.

Example 2:
Input: digits = [4,3,2,1]
Output: [4,3,2,2]
Explanation: The array represents the integer 4321.

Example 3:
Input: digits = [0]
Output: [1]

Constraints:
    -> 1 <= digits.length <= 100
    -> 0 <= digits[i] <= 9
*/

/**
 * @param {number[]} digits
 * @return {number[]}
 */
/* 
Time Complexity: O(N)
Space Complexity: O(1)
Runtime: 76 ms, faster than 82.01% of JavaScript online submissions for Plus One.
Memory Usage: 38.5 MB, less than 65.24% of JavaScript online submissions for Plus One.
digits = [9,9,9,9] - PASS
*/
var plusOne = function (digits) {
  let carryOver = 1;
  for (let i = digits.length - 1; i >= 0; i--) {
    let digitSum = digits[i] + carryOver;
    carryOver = parseInt(digitSum / 10);
    console.log(
      `digitSum: ${digitSum}, carry Over: ${carryOver}, digitval: ${
        digitSum % 10
      }`
    );
    digits[i] = digitSum % 10;
    //TODO: break when carryover is 0
  }
  if (carryOver > 0) {
    digits = [carryOver, ...digits];
  }
  return digits;
};
