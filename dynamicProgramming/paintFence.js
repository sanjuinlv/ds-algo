/* 
276. Paint Fence
https://leetcode.com/problems/paint-fence/description/
Type: Medium

You are painting a fence of n posts with k different colors. You must paint the posts following these rules:

 - Every post must be painted exactly one color.
 - There cannot be three or more consecutive posts with the same color.

Given the two integers n and k, return the number of ways you can paint the fence.

Example 1:
  Input: n = 3, k = 2
  Output: 6
  Explanation: All the possibilities are shown.
   Note that painting all the posts red or all the posts green is invalid because there cannot be three posts in a row with the same color.

Example 2:
  Input: n = 1, k = 1
  Output: 1

Example 3:
  Input: n = 7, k = 2
  Output: 42

Constraints:
 * 1 <= n <= 50
 * 1 <= k <= 10^5
 * The testcases are generated such that the answer is in the range [0, 231 - 1] for the given n and k.


*/
/**
 * @param {number} n
 * @param {number} k
 * @return {number}
 */
/* 
Bottom Up DP
Recurrence relation
num_ways(i) = num_ways_diff(i) + num_ways_same(i)
we can caluculate above function as following:
num_ways_diff(i) = num_ways(i-1) * (k-1)
and 
num_ways_same(i) = num_ways_diff(i-1) * 1 = num_ways(i-2) * (k-1)
so 
num_ways(i) = num_ways_diff(i) + num_ways_same(i)
num_ways(i) = num_ways(i-1) * (k-1) + num_ways(i-2) * (k-1)
            = (k-1) * (num_ways(i-1) + num_ways(i-2))

Runtime: 0 ms Beats 100.00%
Memory: 48.64 MB Beats 68.18%
*/

var numWays = function (n, k) {
  // if there is only one post, there are k ways to paint it
  if ((n == 1)) return k;
  let dp = Array(n + 1);
  //base cases
  dp[0] = 0;
  dp[1] = k * 1;
  dp[2] = k * k; // k * 1 + k * (k-1) = k * k
  for (let i = 3; i <= n; i++) {
    dp[i] = (k - 1) * (dp[i - 1] + dp[i - 2]);
  }
  dp[n];
};

/* 
Approach : Iterative + No space

If you are painting the ith post, you have two options:
 - make it different color as i-1th post
 - make it same color as i-1 th post (if you are allowed!)

num_ways(i) = num_ways_diff(i) + num_ways_same(i)
we can caluculate above function as following:
num_ways_diff(i) = num_ways(i-1) * (k-1)
and 
num_ways_same(i) = num_ways_diff(i-1) * 1 = num_ways(i-2) * (k-1)
so 
num_ways(i) = num_ways_diff(i) + num_ways_same(i)
num_ways(i) = num_ways(i-1) * (k-1) + num_ways(i-2) * (k-1)
            = (k-1) * (num_ways(i-1) + num_ways(i-2))
Time: O(N)
Space: O(1)

Runtime: 0 ms Beats 100.00%
Memory: 49.04 MB Beats 31.82%
*/
var numWays = function (n, k) {
  // if there is only one post, there are k ways to paint it
  if ((n == 1)) return k;
  //base colors (n<=2)
  //paint posts with same color
  let same = k * 1;
  //if we use different color then we can paint from previous * k-1 colors
  let diff = k * (k - 1);
  let total = same + diff;
  for (let i = 3; i <= n; i++) {
    //for same color we just append colors to different colors paints
    same = diff * 1;
    // from previous total we can use k-1 different color combination
    diff = total * (k - 1);
    total = same + diff;
  }
  return total;
};
