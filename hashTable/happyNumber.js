/* 
Write an algorithm to determine if a number n is happy.

A happy number is a number defined by the following process:

Starting with any positive integer, replace the number by the sum of the 
squares of its digits. Repeat the process until the number equals 1 (where it will stay), 
or it loops endlessly in a cycle which does not include 1.
Those numbers for which this process ends in 1 are happy.
Return true if n is a happy number, and false if not.

Example 1:
    Input: n = 19
    Output: true
    Explanation:
    1^2 + 9^2 = 82
    8^2 + 2^2 = 68
    6^2 + 8^2 = 100
    1^2 + 0^2 + 02 = 1

Example 2:
    Input: n = 2
    Output: false

Constraint:
    1 <= n <= 2^31 - 1
*/

/**
 * @param {number} n
 * @return {boolean}
 */
/*
Approach 1: Using HashSet
Runtime: 84 ms, faster than 58.45% of JavaScript online submissions for Happy Number.
Memory Usage: 41.1 MB, less than 15.65% of JavaScript online submissions for Happy Number.
*/
var isHappy = function (n) {
  const visited = new Set();
  const isHappyNum = (num) => {
    if (num === 1) return true;
    if (visited.has(num)) return false;
    visited.add(num);
    let squareSum = 0;
    while (num > 0) {
      const digit = num % 10;
      num = parseInt(num / 10);
      squareSum += digit * digit;
    }
    return isHappyNum(squareSum);
  };
  return isHappyNum(n);
};

/* 
Using HashSet (Refactored code)
Runtime: 80 ms, faster than 76.01% of JavaScript online submissions for Happy Number.
Memory Usage: 41.2 MB, less than 13.28% of JavaScript online submissions for Happy Number.
*/
var isHappy = function (n) {
  const seen = new Set();
  const getNext = (n) => {
    let squareSum = 0;
    while (n > 0) {
      const digit = n % 10;
      n = parseInt(n / 10);
      squareSum += digit * digit;
    }
    return squareSum;
  };

  while (n != 1 && !seen.has(n)) {
    seen.add(n);
    n = getNext(n);
  }
  return n === 1;
};

/*
Approach 2: Using Floyd's Cycle-Finding Algorithm
 */
var isHappy = function (n) {
  const getNext = (n) => {
    let squareSum = 0;
    while (n > 0) {
      const digit = n % 10;
      n = parseInt(n / 10);
      squareSum += digit * digit;
    }
    return squareSum;
  };
  let slowRunner = n;
  let fastRunner = getNext(n);
  while (fastRunner != 1 && slowRunner != fastRunner) {
    slowRunner = getNext(slowRunner);
    fastRunner = getNext(getNext(fastRunner));
  }
  return fastRunner === 1;
};
