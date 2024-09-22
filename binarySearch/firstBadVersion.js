/*
https://leetcode.com/problems/first-bad-version
Type: Easy

You are a product manager and currently leading a team to develop a new product. 
Unfortunately, the latest version of your product fails the quality check. 
Since each version is developed based on the previous version, all the versions after a bad version are also bad.

Suppose you have n versions [1, 2, ..., n] and you want to find out the first bad one, 
which causes all the following ones to be bad.

You are given an API bool isBadVersion(version) which returns whether version is bad. 
Implement a function to find the first bad version. You should minimize the number of calls to the API.

Example 1:

Input: n = 5, bad = 4
Output: 4
Explanation:
call isBadVersion(3) -> false
call isBadVersion(5) -> true
call isBadVersion(4) -> true
Then 4 is the first bad version.

Example 2:
Input: n = 1, bad = 1
Output: 1

Constraints:
 - 1 <= bad <= n <= 2^31 - 1
 */
/**
 * Definition for isBadVersion()
 *
 * @param {integer} version number
 * @return {boolean} whether the version is bad
 * isBadVersion = function(version) {
 *     ...
 * };
 */

/**
 * @param {function} isBadVersion()
 * @return {function}
 */
/* 
Approach: Using Binary Search (Recursive)
Runtime: 48 ms, faster than 68.63% of JavaScript online submissions for First Bad Version.
Memory Usage: 48.95 MB, less than 22.01% of JavaScript online submissions for First Bad Version.
*/
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    const helper = (left, right) => {
      if (left >= right) return right;
      const mid = left + parseInt((right - left) / 2);
      if (isBadVersion(mid)) return helper(left, mid);
      else return helper(mid + 1, right);
    };
    return helper(1, n);
  };
};
/* 
Iterative: Binary search
Runtime: 46 ms, faster than 78.74% of JavaScript online submissions for First Bad Version.
Memory Usage: 48.79 MB, less than 49.10% of JavaScript online submissions for First Bad Version.
*/
var solution = function (isBadVersion) {
  /**
   * @param {integer} n Total versions
   * @return {integer} The first bad version
   */
  return function (n) {
    let left = 1;
    let right = n;
    while (left < right) {
      const mid = left + parseInt((right - left) / 2);
      if (isBadVersion(mid)) right = mid;
      else left = mid + 1;
    }
    return right;
  };
};
