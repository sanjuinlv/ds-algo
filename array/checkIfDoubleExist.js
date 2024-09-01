/* 
https://leetcode.com/problems/check-if-n-and-its-double-exist/
Type: Easy

Given an array arr of integers, check if there exist two indices i and j such that :

 - i != j
 - 0 <= i, j < arr.length
 - arr[i] == 2 * arr[j]

Example 1:
Input: arr = [10,2,5,3]
Output: true
Explanation: For i = 0 and j = 2, arr[i] == 10 == 2 * 5 == 2 * arr[j]

Example 2:
Input: arr = [3,1,7,11]
Output: false
Explanation: There is no i and j that satisfy the conditions.

Constraints:
 - 2 <= arr.length <= 500
 - -10^3 <= arr[i] <= 10^3

*/
/**
 * @param {number[]} arr
 * @return {boolean}
 */

/*  
Approach I: using Map
Runtime: 72 ms, Your runtime beats 91.57 % of javascript submissions.
Memory Usage: 37.6 MB, Your memory usage beats 35.62 % of javascript submissions.
*/
var checkIfExist = function(arr) {
    const doubleMap = new Map();
    for (let i = 0; i < arr.length; i++) {
        if (doubleMap.has(arr[i] * 2) || doubleMap.has(arr[i] / 2)) {
            return true;
        } else {
            doubleMap.set(arr[i], i);
        }
    }
    return false;
};

/*  
Approach I: Using Set
Runtime: 59 ms Beats 37.07%
Memory: 50.06 MB Beats 44.66%
*/
var checkIfExist = function (arr) {
    const doubleSet = new Set();
    for (let i = 0; i < arr.length; i++) {
      if (doubleSet.has(arr[i] * 2) || doubleSet.has(Amth.floor(arr[i] / 2)))
        return true;
      doubleSet.add(arr[i]);
    }
    return false;
  };

// Improved Set
var checkIfExist = function(arr) {
    const seen = new Set();
    for (let i = 0; i < arr.length; i++) {
        // we should also exclude any entry which half return decimal value as that wont be present in array.
        // E.g. 13/2= 6.5. There wont be any entry with this value so its not worth to look for in set.
        if (seen.has(arr[i] * 2) || (arr[i] % 2 == 0 && seen.has(arr[i] / 2))) {
            return true;
        } else {
            seen.add(arr[i]);
        }
    }
    return false;
}