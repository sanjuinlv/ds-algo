/* 
N Digit numbers with digits in increasing order
https://www.geeksforgeeks.org/problems/n-digit-numbers-with-digits-in-increasing-order5903/1
Type: Medium

Given an integer n, print all the n digit numbers in increasing order, such that their digits are in strictly increasing order(from left to right).

Example 1:
Input: n = 1
Output: 0 1 2 3 4 5 6 7 8 9
Explanation:
Single digit numbers are considered to be strictly increasing order.

Example 2:
Input: n = 2
Output: 12 13 14 15 16 17 18 19 23....79 89
Explanation:
For n = 2, the correct sequence is 12 13 14 15 16 17 18 19 23 and so on up to 89.

Your Task:  
You don't need to read input or print anything. Your task is to complete the function increasingNumbers() which takes an integer n as an input parameter and returns the list of numbers such that their digits are in strictly increasing order.

Expected Time Complexity: O(9^n)
Expected Auxiliary Space: O(n)

Constraints:
1 <= n <= 9
*/
/* 
Approach: Backtracking
Time: O(9^n)
Space: O(N)

Time taken: 0.08 
*/
class Solution {
  /**
   * @param number n
   * @returns number[]
   */
  increasingNumbers(n) {
    const result = [];
    const backtrack = (num, k) => {
      //base case
      if (k == n) {
        result.push(num);
        return;
      }
      //options
      for (let i = 0; i <= 9; i++) {
        let lastDigit = num % 10;
        if (i > lastDigit) {
          num = num * 10 + i;
          backtrack(num, k + 1);
          //reset num value to try with other options
          num = num - i;
          num = num / 10;
        }
      }
    };
    if (n == 1) result.push(0);
    backtrack(0, 0);
    return result;
  }
}

/* 
Approach II: Using string instead of number
Time: 0.09
*/
class Solution {
  /**
   * @param number n
   * @returns number[]
   */
  increasingNumbers(n) {
    const result = [];
    const backtrack = (start, numStr, k) => {
      // base case
      if (k == 0) {
        result.push(parseInt(numStr));
        return;
      }
      //options
      for (let i = start; i <= 9; i++) {
        backtrack(i + 1, numStr + i, k - 1);
      }
    };
    if (n == 1) result.push(0);
    backtrack(1, "", n);
    return result;
  }
}
