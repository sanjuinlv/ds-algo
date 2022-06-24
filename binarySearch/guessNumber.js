/* 
https://leetcode.com/problems/guess-number-higher-or-lower/solution/

We are playing the Guess Game. The game is as follows:
I pick a number from 1 to n. You have to guess which number I picked.
Every time you guess wrong, I will tell you whether the number I picked is higher 
or lower than your guess.

You call a pre-defined API int guess(int num), which returns three possible results:

-1: Your guess is higher than the number I picked (i.e. num > pick).
1: Your guess is lower than the number I picked (i.e. num < pick).
0: your guess is equal to the number I picked (i.e. num == pick).

Return the number that I picked.

Example 1:
Input: n = 10, pick = 6
Output: 6

Example 2:
Input: n = 1, pick = 1
Output: 1

Example 3:
Input: n = 2, pick = 1
Output: 1

Constraints:

1 <= n <= 2^31 - 1
1 <= pick <= n
*/
/**
 * Forward declaration of guess API.
 * @param {number} num   your guess
 * @return 	     -1 if num is higher than the picked number
 *			      1 if num is lower than the picked number
 *               otherwise return 0
 * var guess = function(num) {}
 */

/**
 * @param {number} n
 * @return {number}
 */
/* 
Approach: Binary Search
Time: O(LogN)
Space: O(1)

Runtime: 109 ms, faster than 10.75% of JavaScript online submissions for Guess Number Higher or Lower.
Memory Usage: 41.6 MB, less than 75.65% of JavaScript online submissions for Guess Number Higher or Lower.

Runtime: 74 ms, faster than 63.96% of JavaScript online submissions for Guess Number Higher or Lower.
Memory Usage: 42.1 MB, less than 15.87% of JavaScript online submissions for Guess Number Higher or Lower.

*/
var guessNumber = function (n) {
  let left = 1;
  let right = n;
  while (left <= right) {
    const mid = left + parseInt((right - left) / 2);
    const guessResult = guess(mid);
    if (guessResult == 0) return mid;
    else if (guessResult == 1) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return -1;
};
