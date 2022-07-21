/* 
Given an integer x, return true if x is palindrome integer.
An integer is a palindrome when it reads the same backward as forward.
For example, 121 is a palindrome while 123 is not.
 
Example 1:

Input: x = 121
Output: true
Explanation: 121 reads as 121 from left to right and from right to left.

Example 2:

Input: x = -121
Output: false
Explanation: From left to right, it reads -121. From right to left, it becomes 121-. Therefore it is not a palindrome.

Example 3:

Input: x = 10
Output: false
Explanation: Reads 01 from right to left. Therefore it is not a palindrome.

Constraints:

-2$=^31 <= x <= 2^31 - 1

Follow up: Could you solve it without converting the integer to a string?
*/
/**
 * @param {number} x
 * @return {boolean}
 */
/*
Approach I: compare digits of the number
Time: O(log10(n)) (Log N base 10)
Space: O(log10(n)) - number of digits

Runtime: 271 ms, faster than 53.14% of JavaScript online submissions for Palindrome Number.
Memory Usage: 50.6 MB, less than 78.26% of JavaScript online submissions for Palindrome Number.
 */
var isPalindrome = function (x) {
  if (x < 0) return false;
  const digits = [];
  while (x > 0) {
    digits.push(x % 10);
    x = Math.floor(x / 10);
  }
  let left = 0;
  let right = digits.length - 1;
  while (left < right) {
    if (digits[left++] !== digits[right--]) return false;
  }
  return true;
};

/*
Approach I: compare digits of the number
Time: O(log_{10}(n))=> (Log N base 10) - We divided the input by 10 for every iteration,
so the time complexity is O(log_{10}(n))
Space: O(1) 

Runtime: 219 ms, faster than 78.11% of JavaScript online submissions for Palindrome Number.
Memory Usage: 50.1 MB, less than 91.96% of JavaScript online submissions for Palindrome Number.
 */
var isPalindrome = function (x) {
  if (x < 0 || (x % 10 === 0 && x != 0)) return false;
  let reversedNumber = 0;
  while (x > reversedNumber) {
    reversedNumber = reversedNumber * 10 + (x % 10);
    x = Math.floor(x / 10);
  }
  return x === reversedNumber || x === Math.floor(reversedNumber / 10);
};
