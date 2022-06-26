/*
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
Runtime: 72 ms, faster than 87.67% of JavaScript online submissions for First Bad Version.
Memory Usage: 38.8 MB, less than 5.15% of JavaScript online submissions for First Bad Version.
*/
var solution = function(isBadVersion) {
    /**
     * @param {integer} n Total versions
     * @return {integer} The first bad version
     */
    return function(n) {
        let badVersionNo;
        const helper = (low, high) => {
            if (low > high) return;
            const middle = low + parseInt((high-low) / 2);
            badVersion = isBadVersion(middle);
            // if bad version, then find the middle of left half and check again
            if (badVersion){
                badVersionNo = middle;
                helper(low, middle - 1);
            } else {
                // if false, then find the middle from right half and check again
                helper(middle + 1, high);
            }
        }
        helper(1, n);
        return badVersionNo;
    };
};
/* 
Iterative: Binary search
Runtime: 80 ms, faster than 38.51% of JavaScript online submissions for First Bad Version.
Memory Usage: 38.2 MB, less than 75.69% of JavaScript online submissions for First Bad Version.
*/
var solution = function(isBadVersion) {
    return function(n) {
        let left = 1;
        let right = n;
        while (left < right) {
            let mid = left + Math.floor((right - left ) / 2);
            if (isBadVersion(mid)){
                right = mid;
            } else {
                left = mid + 1;
            }
        }
        // left will be equal to right when reach this line
        return left; 
    };
};
