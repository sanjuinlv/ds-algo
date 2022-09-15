/* 
https://leetcode.com/problems/minimum-absolute-difference/
Category - Easy

Given an array of distinct integers arr, find all pairs of elements with the minimum
absolute difference of any two elements.

Return a list of pairs in ascending order(with respect to pairs), each pair [a, b] follows

 - a, b are from arr
 - a < b
 - b - a equals to the minimum absolute difference of any two elements in arr 

Example 1:

Input: arr = [4,2,1,3]
Output: [[1,2],[2,3],[3,4]]
Explanation: The minimum absolute difference is 1. List all pairs with difference equal to 1 in ascending order.

Example 2:

Input: arr = [1,3,6,10,15]
Output: [[1,3]]

Example 3:

Input: arr = [3,8,-10,23,19,-4,-14,27]
Output: [[-14,-10],[19,23],[23,27]]

Constraints:

 - 2 <= arr.length <= 10^5
 - -10^6 <= arr[i] <= 10^6
*/
/**
 * @param {number[]} arr
 * @return {number[][]}
 */
/* 
Approach I: sort and traversal
Time: O(NLogN)
Space: O(logN), based on sorting algorithm

Runtime: 193 ms, faster than 84.84% of JavaScript online submissions for Minimum Absolute Difference.
Memory Usage: 55.1 MB, less than 27.80% of JavaScript online submissions for Minimum Absolute Difference.
*/
var minimumAbsDifference = function (arr) {
  //sort the array
  arr.sort((a, b) => a - b);
  let result = [];
  let minDiff = Infinity;
  for (let i = 0; i < arr.length - 1; i++) {
    const diff = Math.abs(arr[i + 1] - arr[i]);
    //this diff is less than previous min diff, reset the result
    if (diff < minDiff) {
      minDiff = diff;
      result = [];
    }
    if (diff == minDiff) result.push([arr[i], arr[i + 1]]);
  }
  return result;
};

/* 
Approach II: Counting Sort
Time: O(m + n), 
    - We initialize an auxiliary array of all zeros, which takes O(m) time.
    - We then iterate over arr to inspect each element and increment the
     corresponding element in line; this takes O(n)O(n) time.
    - To check every pair of elements, we must iterate over line; this takes O(m) time.
    - To sum up, the overall time complexity is O(m + n)

Space: O(m + n), based on sorting algorithm

Runtime: 156 ms, faster than 99.64% of JavaScript online submissions for Minimum Absolute Difference.
Memory Usage: 65.7 MB, less than 13.36% of JavaScript online submissions for Minimum Absolute Difference.

*/
var minimumAbsDifference = function (arr) {
  let min = arr[0];
  let max = min;
  //find min and max
  arr.forEach((num) => {
    min = Math.min(min, num);
    max = Math.max(max, num);
  });
  //shift
  const shift = -min;
  const line = new Array(max + shift + 1).fill(0);
  //2.
  // For each integer `num` in `arr`, we set line[num + shift] to 1.
  for (const num of arr) {
    line[num + shift] = 1;
  }
  //3.
  let result = [];
  let minDiff = max - min;
  let prev = 0;
  for (let curr = 1; curr < line.length; curr++) {
    // If line[curr] == 0, meaning there is no occurrence of the integer (curr - shift)
    if (line[curr] == 0) continue;
    if (curr - prev < minDiff) {
      minDiff = curr - prev;
      result = [];
    }
    if (curr - prev == minDiff) result.push([prev - shift, curr - shift]);
    prev = curr;
  }
  return result;
};
