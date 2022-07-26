/* 
https://leetcode.com/problems/power-of-three/
Easy 

Given an integer n, return true if it is a power of three. Otherwise, return false.

An integer n is a power of three, if there exists an integer x such that n == 3^x.

Example 1:

Input: n = 27
Output: true

Example 2:

Input: n = 0
Output: false

Example 3:

Input: n = 9
Output: true

Constraints:
-2^31 <= n <= 2^31 - 1
 
Follow up: Could you solve it without loops/recursion?
*/
/**
 * @param {number} n
 * @return {boolean}
 */

/* 
Using multiple of 3 to check if num is equal to any multiple of 3
Runtime: 412 ms
Memory Usage: 49.4 MB
Your runtime beats 6.63 % of javascript submissions.
Your memory usage beats 40.34 % of javascript submissions.
*/
var isPowerOfThree = function (n) {
  for (i = 1; i <= n; i = i * 3) {
    if (n == i) return true;
  }
  return false;
};

//Other solutions
/* 
Approach I : Loop Iteration

Time complexity : O(logb(n)), where b is base. 
In our case that is O(log3n) (3 is base). The number of divisions is given by that logarithm.
Space Complexity: O(1)

Runtime: 396 ms, faster than 8.00% of JavaScript online submissions for Power of Three.
Memory Usage: 48.8 MB, less than 89.83% of JavaScript online submissions for Power of Three.
*/
var isPowerOfThree = function (n) {
  if (n < 1) return 0;
  //Keep dividing n until remainder is 0
  while (n % 3 == 0) {
    n = Math.floor(n / 3);
  }
  //if the number left is 1 then number is divisible by 3 else false
  return n == 1;
};

/* 
Approach II : Mathematics
n = 3^i
i = log{base 3}(n)
i = log{b}(n) / log{b}(3)

n is a power of three if and only if i is an integer. In Java, we check if a number is
an integer by taking the decimal part (using % 1) and checking if it is 0.

Time complexity : Unknown. The expensive operation here is Math.log, which upper
bounds the time complexity of our algorithm. The implementation is dependent on
the language we are using and the compiler.

Space Complexity: O(1), O(1). We are not using any additional memory. The epsilon variable can be inlined.

Runtime: 242 ms, faster than 85.43% of JavaScript online submissions for Power of Three.
Memory Usage: 50.9 MB, less than 75.93% of JavaScript online submissions for Power of Three.
*/
var isPowerOfThree = function (n) {
  if (n < 1) return 0;
  return (Math.log10(n) / Math.log10(3)) % 1 === 0;
};

/* 
Approach: Integer Limitations
In particular, n is of type int. In Java, this means it is a 4 byte, signed integer. 
The maximum value of this data type is 2147483647. 

Knowing the limitation of n, we can now deduce that the maximum value of n that is also
a power of three is 1162261467. We calculate this as:
3^[log3(MAX_INT)] = 3 ^ [19.56] = 3 ^ 19 = 1162261467

Therefore, the possible values of n where we should return true are 3^0, 3^1... 3^19.
Since 3 is a prime number, the only divisors of 3^19 are 3^0, 3^1... 3^19, 
therefore all we need to do is divide 3^19 by n. 
A remainder of 0 means n is a divisor of 3^19 and therefore a power of three.

Time complexity: O(1)
Space Complexity: O(1)

Runtime: 360 ms, faster than 10.40% of JavaScript online submissions for Power of Three.
Memory Usage: 50.2 MB, less than 5.83% of JavaScript online submissions for Power of Three.
*/
var isPowerOfThree = function (n) {
  if (n <= 0) return false;
  //max integer number with power of 3
  //find the max power of 3, in integer range (2^31 - 1)
  //3^[log3(MAX_INT)] = 3 ^ [19.56] = 3 ^ 19 = 1162261467
  //log3(MAX_INT) => log(MAX_INT) / log3 => Math.log(2^31-1) / Math.log(3)
  const maxPowerOfThree = Math.floor(
    Math.log(Math.pow(2, 31) - 1) / Math.log(3)
  );
  // console.log(`maxPowerOfThree: ${maxPowerOfThree}`);
  const maxInt = Math.pow(3, maxPowerOfThree);
  //if n is factor of maxInt then its divisible by 3
  return maxInt % n == 0;
};

/* 
Runtime: 224 ms, faster than 98.29% of JavaScript online submissions for Power of Three.
Memory Usage: 49.3 MB, less than 56.91% of JavaScript online submissions for Power of Three.
*/
var isPowerOfThree = function (n) {
  if (n <= 0) return false;
  return 1162261467 % n == 0;
};
