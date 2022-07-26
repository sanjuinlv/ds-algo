/* 
https://leetcode.com/problems/powx-n/

Implement pow(x, n), which calculates x raised to the power n (i.e. x^n).

Example 1:
Input: x = 2.00000, n = 10
Output: 1024.00000

Example 2:
Input: x = 2.10000, n = 3
Output: 9.26100

Example 3:
Input: x = 2.00000, n = -2
Output: 0.25000
Explanation: 2^-2 = 1/2^2 = 1/4 = 0.25

Constraint:
-100.0 < x < 100.0
-2^31 <= n <= 2^31-1
-10^4 <= x^n <= 10^4
*/

// 3 ^ 2  = 3 * 3
// 3 ^ 3 = 3 * 3 *3
/**
 * @param {number} x
 * @param {number} n
 * @return {number}
 */
/* 
Approach: Brute force
Time complexity: O(N)
Space: O(1)

Time Limit Exceeded

-1.00000
2147483647
*/
var myPow = function (x, n) {
  if (n == 0) return 1;
  let result = x;
  const power = Math.abs(n);
  for (let i = 1; i < power; i++) {
    result *= x;
  }
  return n > 0 ? result : 1 / result;
};

/*
Approach 2: Fast Power Algorithm Recursive
3 ^ 4 = (3^2) * (3^2) 
      = (3^1 * 3^1) * (3^1 * 3^1)
f(n) = f(n/2) * f(n/2)       

Time: O(LogN), Each time we apply the formula (x ^ n) ^ 2 = x ^ {2 * n}, n is reduced by half.
Thus we need at most O(logn) computations to get the result.
Space: O(logN), For each computation, we need to store the result of x ^ {n / 2}.
We need to do the computation for O(logn) times, so the space complexity is O(logn).

Runtime: 80 ms, faster than 79.70% of JavaScript online submissions for Pow(x, n).
Memory Usage: 38.8 MB, less than 66.39% of JavaScript online submissions for Pow(x, n).
*/
var myPow = function (x, n) {
  const fastPow = (x, n) => {
    if (n == 0) return 1;
    if (n == 1) return x;
    const half = fastPow(x, Math.floor(n / 2));
    if (n % 2 == 0) {
      return half * half;
    } else {
      return half * half * x;
    }
  };
  if (n < 0) {
    n = -n;
    x = 1 / x;
  }
  return fastPow(x, n);
};

/* 
Approach 3: Fast Power Algorithm Iterative
 
Runtime: 76 ms, faster than 92.35% of JavaScript online submissions for Pow(x, n).
Memory Usage: 38.9 MB, less than 67.33% of JavaScript online submissions for Pow(x, n).
*/
var myPow = function (x, n) {
  let result = 1;
  if (n < 0) {
    n = -n;
    x = 1 / x;
  }
  while (n > 0) {
    if (n % 2 == 1) result *= x;
    if (n == 1) break;
    x *= x;
    n = Math.floor(n / 2); // n = n >> 1; reduce the number by half, i.e. divide by 2
  }
  return result;
};

//only for postive numbers
// Recursive
var pow = function (a, b) {
  if (b == 0) return 1;
  let half = pow(a, Math.floor(b / 2));
  result = half * half;
  if (b % 2 === 1) result *= a;
  return result;
};

// Iterative
var pow = function (a, b) {
  if (b == 0) return 1;
  let result = 1;
  while (b > 0) {
    if (b % 2 === 1) result *= a;
    a = a * a;
    b = Math.floor(b / 2);
  }
  return result;
};
