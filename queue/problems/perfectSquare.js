/*
https://leetcode.com/problems/perfect-squares/solution/
Category - Medium

Given an integer n, return the least number of perfect square numbers that sum to n.

A perfect square is an integer that is the square of an integer; in other words, 
it is the product of some integer with itself. For example, 1, 4, 9, and 16 are perfect
squares while 3 and 11 are not.

Example 1:

Input: n = 12
Output: 3
Explanation: 12 = 4 + 4 + 4.
Example 2:

Input: n = 13
Output: 2
Explanation: 13 = 4 + 9.

Constraints:

1 <= n <= 10^4
*/

/**
 * @param {number} n
 * @return {number}
 */
/* 
Approach I: BFS
Gets time out for input '7168'
*/
var numSquares = function (n) {
  const squares = [];
  for (let i = 1; i * i <= n; i++) {
    squares.push(i * i);
  }
  const queue = [];
  queue.push([n, 0]);
  while (queue.length) {
    const [num, depth] = queue.shift();
    console.log(`num: ${num}, depth: ${depth}`);
    if (num === 0) return depth;
    for (let i = squares.length - 1; i >= 0; i--) {
      if (num - squares[i] >= 0) queue.push([num - squares[i], depth + 1]);
    }
  }
  return -1;
};

/* 
Approach I: BFS with visited set
Runtime: 350 ms, faster than 38.34% of JavaScript online submissions for Perfect Squares.
Memory Usage: 50.2 MB, less than 17.73% of JavaScript online submissions for Perfect Squares.
*/
var numSquares = function (n) {
  const perfSquares = [];
  for (let i = 1; i * i <= n; i++) {
    perfSquares.push(i * i);
  }
  const queue = [];
  const visited = new Set();
  visited.add(0);
  queue.push(n);
  let depth = 0;
  while (queue.length) {
    const queueSize = queue.length;
    depth = depth + 1;
    for (let i = 0; i < queueSize; i++) {
      const num = queue.shift();
      if (num == 0) return depth;
      for (const square of perfSquares) {
        const remainder = num - square;
        if (remainder > 0 && !visited.has(remainder)) {
          queue.push(remainder);
          visited.add(remainder);
        }
      }
    }
  }
  return depth;
};

/* 
Approach II: Recursive (Time Limit Exceeded)
Time: O(N * sqrt{n}) 
Space: O(N)
Runtime: 274 ms, faster than 50.19% of JavaScript online submissions for Perfect Squares.
Memory Usage: 43.6 MB, less than 95.72% of JavaScript online submissions for Perfect Squares.

*/
var numSquares = function (n) {
  const perfSquares = [];
  for (let i = 1; i * i <= n; i++) {
    perfSquares.push(i * i);
  }
  const findMinSquares = (num) => {
    if (num === 0) return 0;
    if (num === 1) return 1;
    let count = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < perfSquares.length; i++) {
      if (num < perfSquares[i]) break;
      count = Math.min(count, findMinSquares(num - perfSquares[i]) + 1);
    }
    return count;
  };
  return findMinSquares(n);
};

/* 
Approach II: Dynamic Programming (Bottom Up)
Time: O(N * sqrt{n}) 
Space: O(N)
Runtime: 274 ms, faster than 50.19% of JavaScript online submissions for Perfect Squares.
Memory Usage: 43.6 MB, less than 95.72% of JavaScript online submissions for Perfect Squares.

*/
var numSquares = function (n) {
  const perfSquares = [];
  for (let i = 1; i * i <= n; i++) {
    perfSquares.push(i * i);
  }
  const dp = new Array(n + 1).fill(Number.MAX_SAFE_INTEGER);
  //base case
  dp[0] = 0;
  for (let i = 1; i <= n; i++) {
    for (let j = 0; j < perfSquares.length; j++) {
      if (i < perfSquares[j]) break;
      dp[i] = Math.min(dp[i - perfSquares[j]] + 1, dp[i]);
    }
  }
  console.log(dp);
  return dp[n];
};
