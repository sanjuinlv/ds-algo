/**
 * Time complexity: O(n)
 * Space complexity: O(1)
 * @param {number} n
 * @return {number}
 */
var climbStairs = function(n) {
    if (n <= 1) return 1;
    let prev2 = 1, prev1 = 2, curr = 0;
    for (let i = 3; i <= n; i++) {
        curr = prev1 + prev2;
        prev2 = prev1;
        prev1 = curr;
    }
    return prev1;
};
//Result
// Your runtime beats 72.64 % of javascript submissions

/** Dynamic programming approach */
/**
One can reach ith step in one of the two ways:

1. Taking a single step from (i−1)th step.
2. Taking a step of 2 from (i−2)th step.

So, the total number of ways to reach ith is equal to sum of 
ways of reaching (i−1)th step and ways of reaching (i−2)th step.

Let dp[i] denotes the number of ways to reach on i^{th}ith step:

dp[i]=dp[i-1]+dp[i-2]
 */

/*
2nd try (4/1/21)
Runtime: 76 ms, faster than 71.30% of JavaScript online submissions for Climbing Stairs.
Memory Usage: 38.2 MB, less than 77.97% of JavaScript online submissions for Climbing Stairs.
 */
var climbStairs = function(n) {
  if (n <= 1) return n;  
  let second = 1;
  let first = 1;
  for (i = 2; i <= n; i++){
      let third = second + first;
      first = second;
      second = third;
  }
  return second;
};

n =1 = > 1
1

n = 2 => 2
11
2

n = 3 => 4
111
21
12
3

n = 4 => 7
1111
211
121
112
22
31
13

