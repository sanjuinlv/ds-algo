/* 

*/
/**
 * @param {number} n
 * @return {boolean}
 */
var isPowerOfThree = function (n) {
  if (n == 1) return true;
  //   if (n < 3 )  return false;
  const checkPowerOfThree = (num) => {
    console.log(`num: ${num}`);
    if (num >= 3) checkPowerOfThree(Math.floor(num / 3));
    if (num == 1) return true;
    return false;
    // if (num < 3 && num % 3 == 0) return false;
    // return checkPowerOfThree(Math.floor(num / 3));
  };
  return checkPowerOfThree(n);
};

//Fails for 10, 12
var isPowerOfThree = function (n) {
  if (n == 0) return false;
  if (n == 1) return true;
  const checkPowerOfThree = (n) => {
    if (n > 3) return isPowerOfThree(Math.floor(n / 3));
    if (n % 3 == 0) return true;
    return false;
  };
  return checkPowerOfThree(n);
};

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
Approch: Loop Iteration

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
