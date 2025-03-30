/* 
69. Sqrt(x)
https://leetcode.com/problems/sqrtx/
Type: Easy

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

Constraints:
 - 0 <= x <= 2^31 - 1
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
Runtime: 63 ms, faster than 93.00% of JavaScript online submissions for Sqrt(x).
Memory Usage: 53.64 MB, less than 6.52% of JavaScript online submissions for Sqrt(x).
*/
var mySqrt = function (x) {
  if (x < 2) return x;
  let left = 2;
  let right = parseInt(x / 2);
  while (left <= right) {
    mid = left + parseInt((right - left) / 2);
    const sqr = mid * mid;
    if (sqr == x) return mid;
    if (sqr < x) left = mid + 1;
    else right = mid - 1;
  }
  return right;
};

/* 
If we are asked to find upto a given precision, e.g., upto 8 decimal positio
*/
/**
 * @param {number} x
 * @param {number} precision - Number of decimal places (default: 0 for integer part only)
 * @return {number}
 */
function mySqrt(x, precision = 0) {
  if (x === 0) return 0;
  // For decimal precision (follow-up)
  let left = 0;
  let right = x;
  // Binary search with precision
  for (let i = 0; i < 100; i++) { // 100 iterations should be enough for convergence
      const mid = (left + right) / 2;
      const square = mid * mid;
      //Number.EPSILON: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/EPSILON
      if (Math.abs(square - x) < Number.EPSILON) {
          return mid;
      } else if (square > x) {
          right = mid;
      } else {
          left = mid;
      }
  }
  // Round to specified precision
  const multiplier = Math.pow(10, precision);
  return Math.round((left + right) / 2 * multiplier) / multiplier;
}

// Test cases
console.log(mySqrt(4, 0));      // 2 (integer part only)
console.log(mySqrt(8, 0));      // 2 (integer part only)
console.log(mySqrt(2, 8));      // 1.41421356 (8 decimal places)
console.log(mySqrt(10, 8));     // 3.16227766 (8 decimal places)}