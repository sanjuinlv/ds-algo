/* 
https://leetcode.com/problems/power-of-two/
Easy

Given an integer n, return true if it is a power of two. Otherwise, return false.

An integer n is a power of two, if there exists an integer x such that n == 2^x.

Example 1:

Input: n = 1
Output: true
Explanation: 2^0 = 1

Example 2:

Input: n = 16
Output: true
Explanation: 2^4 = 16

Example 3:

Input: n = 3
Output: false
 
Constraints:
-2^31 <= n <= 2^31 - 1

Follow up: Could you solve it without loops/recursion?
*/
/**
 * @param {number} n
 * @return {boolean}
 */
/* 
Approach I: Basic LogN Iterative Solution
Time: O(LogN)
Space: O(1)

Runtime: 100 ms, faster than 45.50% of JavaScript online submissions for Power of Two.
Memory Usage: 40.2 MB, less than 22.92% of JavaScript online submissions for Power of Two.
*/
var isPowerOfTwo = function (n) {
  if (n <= 0) return false;
  //Keep dividing the number by 2 until remainder is zero
  while (n % 2 == 0) {
    n = Math.floor(n / 2);
  }
  return n == 1;
};

/* 
Approach 2: Bitwise Operators : Get the Rightmost 1-bit
With -x all bits are reverted except rightmost 1-bit
and x & (-x) keeps the rightmost 1-bit and sets all bits to 0.
So let's do x & (-x) to keep the rightmost 1-bit and to set all the others bits to zero.
For the power of two it would result in x itself, since a power of two contains just one 1-bit.
Other numbers have more than 1-bit in their binary representation and hence for
them x & (-x) would not be equal to x itself.

Hence a number is a power of two if x & (-x) == x.

Time: O(1)
Space: O(1)

Runtime: 117 ms, faster than 37.29% of JavaScript online submissions for Power of Two.
Memory Usage: 43.3 MB, less than 80.43% of JavaScript online submissions for Power of Two.

*/
var isPowerOfTwo = function (n) {
  if (n <= 0) return false;
  return (n & -n) === n;
};

/* 
Approach 3: Bitwise operators : Turn off the Rightmost 1-bit
Time: O(1)
Space: O(1)
Runtime: 135 ms, faster than 17.91% of JavaScript online submissions for Power of Two.
Memory Usage: 43.3 MB, less than 75.45% of JavaScript online submissions for Power of Two.
*/
var isPowerOfTwo = function (n) {
  if (n <= 0) return false;
  return (n & (n - 1)) == 0;
};

/* 
Approach 2: 
Time: O(1)
Space: O(1)
 */
var isPowerOfTwo = function (n) {
  if (n <= 0) return false;
  const maxPowerOfTwoNumber = Math.pow(2, 31);
  return maxPowerOfTwoNumber % n == 0;
};

/* 
Runtime: 108 ms, faster than 14.09% of JavaScript online submissions for Power of Two.
Memory Usage: 40.2 MB, less than 22.92% of JavaScript online submissions for Power of Two.
*/
var isPowerOfTwo = function (n) {
  if (n <= 0) return false;
  return 2147483648 % n == 0;
};
