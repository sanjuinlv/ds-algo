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

/* 
Another problem where user can take either 1, 2 or 3 steps
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

n=5 => 7 + 4 +2 = 13
11111
2111
1211
1121
221
311
131

1112
212
122
32

113
23

*/

/* 
Count ways to reach the Nth stair using multiple 1 or 2 steps and a single step 3
Given an integer N number of stairs, the task is count the number ways to reach the
Nth stair by taking 1 or 2 step any number of times but taking a step of 3 exactly once.

N = 1 => 1
1

N = 2 => 2
11
2

N = 3 => 1
3

N = 4 => 2
13
31

N = 5 => 5
131
311

113
23

32

N = 6 => 
1311
3111

1131
231

321

33

1113
1311
213

*/