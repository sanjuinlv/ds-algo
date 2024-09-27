/* 
367. Valid Perfect Square
https://leetcode.com/problems/valid-perfect-square
Type: Easy

Given a positive integer num, return true if num is a perfect square or false otherwise.

A perfect square is an integer that is the square of an integer. In other words, it is the product of some integer with itself.

You must not use any built-in library function, such as sqrt.

Example 1:
    Input: num = 16
    Output: true
    Explanation: We return true because 4 * 4 = 16 and 4 is an integer.

Example 2:
    Input: num = 14
    Output: false
    Explanation: We return false because 3.742 * 3.742 = 14 and 3.742 is not an integer.
 

Constraints:

1 <= num <= 2^31 - 1
*/
/**
 * @param {number} num
 * @return {boolean}
 */
//16
//1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16
/* 
Approach: Binary Search
Time: O(LogN)
Space: O(1)

Runtime: 58 ms Beats 25.32%
Memory: 49.10 MB Beat 20.54%
*/
var isPerfectSquare = function (num) {
  if (num == 1) return true;
  if (num < 4) return false;
  let left = 2;
  let right = parseInt(num / 2);
  while (left <= right) {
    const mid = left + parseInt((right - left) / 2);
    console.log(`left: ${left}, right: ${right}, mid: ${mid}`);
    const sqr = mid * mid;
    if (sqr == num) return true;
    if (sqr < num) left = mid + 1;
    else right = mid - 1;
  }
  console.log(`left: ${left}, right: ${right}`);
  return false;
};
