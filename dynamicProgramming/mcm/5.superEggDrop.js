/*
887. Super Egg Drop 
https://leetcode.com/problems/super-egg-drop/
Type: Hard

You are given k identical eggs and you have access to a building with n floors labeled from 1 to n.

You know that there exists a floor f where 0 <= f <= n such that any egg dropped at a floor higher than f will break, and any egg dropped at or below floor f will not break.

Each move, you may take an unbroken egg and drop it from any floor x (where 1 <= x <= n). If the egg breaks, you can no longer use it. However, if the egg does not break, you may reuse it in future moves.

Return the minimum number of moves that you need to determine with certainty what the value of f is.

Example 1:
  Input: k = 1, n = 2
  Output: 2
  Explanation: 
    Drop the egg from floor 1. If it breaks, we know that f = 0.
    Otherwise, drop the egg from floor 2. If it breaks, we know that f = 1.
    If it does not break, then we know f = 2.
    Hence, we need at minimum 2 moves to determine with certainty what the value of f is.

Example 2:
  Input: k = 2, n = 6
  Output: 3

Example 3:
Input: k = 3, n = 14
Output: 4

Constraints:
 - 1 <= k <= 100
 - 1 <= n <= 10^4

*/
/**
 * @param {number} k
 * @param {number} n
 * @return {number}
 */
/*
Approach: Recursion
Solution explanation: https://www.youtube.com/watch?v=S49zeUjeUL0&list=PL_z_8CaSLPWekqhdCPmFohncHwz8TY2Go&index=42&ab_channel=AdityaVerma
 */
var superEggDrop = function (k, n) {
  const solve = (e, f) => {
    //if we have no floor or only one floor
    if (f == 0 || f == 1) return f;
    //if we have only one egg then we need to try from each floor
    if (e == 1) return f;
    let minMove = Number.MAX_VALUE;
    //we will try from each floor
    for (let k = 1; k <= f; k++) {
      //If egg breaks. Then we will try floor below k, i.e, k-1
      const breaks = solve(e - 1, k - 1);
      //if egg breaks then we need check from rest of the floors, i.e, f-k
      const doesNotBreak = solve(e, f - k);
      //since we have taken one move we add 1 and then max move required
      //we take the max because we want to find the worst case scenario
      const tempMoves = 1 + Math.max(breaks, doesNotBreak);
      //Now find min of current move and earlier moves
      minMove = Math.min(minMove, tempMoves);
    }
    return minMove;
  };
  return solve(k, n);
};

/*
Approach II: Recursion with Memoization
Gives TLE
 */
var superEggDrop = function (k, n) {
  const memo = Array.from({ length: k + 1 }, () => Array(n + 1));
  const solve = (e, f) => {
    //if we have no floor or only one floor
    if (f == 0 || f == 1) return f;
    //if we have only one egg then we need to try from each floor
    if (e == 1) return f;
    if (memo[e][f] != null) return memo[e][f];
    let minMove = Number.MAX_VALUE;
    //we will try from each floor
    for (let k = 1; k <= f; k++) {
      //If egg breaks. Then we will try floor below k, i.e, k-1
      const breaks = solve(e - 1, k - 1);
      //if egg breaks then we need check from rest of the floors, i.e, f-k
      const doesNotBreak = solve(e, f - k);
      //since we have taken one move we add 1 and then max move required
      //we take the max because we want to find the worst case scenario
      const tempMoves = 1 + Math.max(breaks, doesNotBreak);
      //Now find min of current move and earlier moves
      minMove = Math.min(minMove, tempMoves);
    }
    return (memo[e][f] = minMove);
  };
  return solve(k, n);
};

/*
Approach III: Recursion + Memoization + Binary Search

Runtime: 100 ms Beats 30.77%
Memory: 63.12 MB Beats 61.54%
 */
var superEggDrop = function (k, n) {
  const memo = Array.from({ length: k + 1 }, () => Array(n + 1));
  const solve = (e, f) => {
    //if we have no floor or only one floor
    if (f == 0 || f == 1) return f;
    //if we have only one egg then we need to try from each floor
    if (e == 1) return f;
    if (memo[e][f] != null) return memo[e][f];
    let minMove = Number.MAX_VALUE;
    let low = 1;
    let high = f;
    while (low <= high) {
      const mid = Math.floor((low + high) / 2);
      //egg broken, check for down floors of mid
      const breaks = solve(e - 1, mid - 1);
      //egg not broken, check for up floors of mid
      const doesNotBreak = solve(e, f - mid);
      // max of both cases
      const tempMoves = 1 + Math.max(breaks, doesNotBreak);
      minMove = Math.min(minMove, tempMoves);
      //binary search
      if (breaks > doesNotBreak) {
        // If breaks is greater, reduce the range
        high = mid - 1;
      } else {
        // If doesNotBreak is greater, increase the range
        low = mid + 1;
      }
    }
    //store and return min attempts
    return (memo[e][f] = minMove);
  };
  return solve(k, n);
};


//TODO: Bottom Up DP