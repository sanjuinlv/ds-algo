/* 
https://leetcode.com/problems/sqrtx/

Given a non-negative integer x, compute and return the square root of x.
Since the return type is an integer, the decimal digits are truncated, and only
the integer part of the result is returned.

Note: You are not allowed to use any built-in exponent function or operator, 
such as pow(x, 0.5) or x ** 0.5.

Example 1:

Input: x = 4
Output: 2
Example 2:

Input: x = 8
Output: 2
Explanation: The square root of 8 is 2.82842..., and since the decimal part is truncated, 2 is returned.

*/
/**
 * @param {number} x
 * @return {number}
 */
/* 
Approach: Using Binary Search
For x≥2 the square root is always smaller than x/2 and larger than 0 : 0 < a < x / 2.
Since a is an integer, the problem goes down to the iteration over the sorted set of
integer numbers. Here the binary search enters the scene.

Time: O(LogN)
Space: O(1)
Runtime: 76 ms, faster than 92.36% of JavaScript online submissions for Sqrt(x).
Memory Usage: 43.5 MB, less than 70.61% of JavaScript online submissions for Sqrt(x).
*/
var mySqrt = function (x) {
  if (x < 2) return x;
  let left = 2;
  let right = parseInt(x / 2);
  while (left <= right) {
    const mid = left + parseInt((right - left) / 2);
    const prod = mid * mid;
    if (prod == x) return mid;
    else if (prod > x) {
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return right;
};
