/**
https://leetcode.com/problems/height-checker/description/
Type: Easy

A school is trying to take an annual photo of all the students. The students are asked to stand in a single file line in non-decreasing order by height. Let this ordering be represented by the integer array expected where expected[i] is the expected height of the ith student in line.

You are given an integer array heights representing the current order that the students are standing in. Each heights[i] is the height of the ith student in line (0-indexed).

Return the number of indices where heights[i] != expected[i].

Example 1:
  Input: heights = [1,1,4,2,1,3]
  Output: 3
  Explanation:
  Current array : [1,1,4,2,1,3]
  Target array  : [1,1,1,2,3,4]
  On index 2 (0-based) we have 4 vs 1 so we have to move this student.
  On index 4 (0-based) we have 1 vs 3 so we have to move this student.
  On index 5 (0-based) we have 3 vs 4 so we have to move this student.

Example 2:
    Input: heights = [5,1,2,3,4]
    Output: 5

Example 3:
    Input: heights = [1,2,3,4,5]
    Output: 0

Constraints:     
    - 1 <= heights.length <= 100
    - 1 <= heights[i] <= 100

*/

/**
 * @param {number[]} heights
 * @return {number}
 */

/*
Approach: Sorting
Time: O(NLogN)
Space: O(logN) space taken by of sorting
Runtime: 76 ms
Memory Usage: 36.2 MB
Your runtime beats 72.36 % of javascript submissions.
Your memory usage beats 97.44 % of javascript submissions.
*/
var heightChecker = function (heights) {
  const sortedHeights = [...heights].sort((a, b) => a - b);
  let wrongPositions = 0;
  for (let i in heights) {
    if (heights[i] != sortedHeights[i]) {
      wrongPositions++;
    }
  }
  return wrongPositions;
};
/* 
Approach II: Using Count sort
Time: O(N + K), where K = 100
Space: O(N)

Runtime: 47 ms Beats 89.84%
Memory: 50.58 MB Beats 13.75%
*/
var heightChecker = function (heights) {
  let heightFreqCount = [...Array(101)].fill(0);
  //create height frequency count array
  for (const height of heights) {
    heightFreqCount[height]++;
  }
  //create sorted array based on the counts
  const expectedHeights = [];
  for (let i = 1; i <= 100; i++) {
    const heightCounts = heightFreqCount[i];
    for (let j = 0; j < heightCounts; j++) {
      expectedHeights.push(i);
    }
  }
  //now compare sorted array from wrong positioned array
  let wrongPositions = 0;
  for (let i in heights) {
    if (heights[i] != expectedHeights[i]) {
      wrongPositions++;
    }
  }
  return wrongPositions;
};

/* 
Approach III: Using count and Linear Scan
Your runtime 95 ms beats 46.40 % of javascript submissions.
Your memory usage 42.3 MB beats 39.74 % of javascript submissions.
*/
var heightChecker = function (heights) {
  let wrongPositions = 0;
  const N = heights.length;
  let heightFreqCount = [...Array(101)].fill(0);
  for (const height of heights) {
    heightFreqCount[height]++;
  }
  let currHeight = 0;
  for (let i = 0; i < N; i++) {
    //until we find a count with number skip it, i.e,
    // skip zero count number which is not present in the input array
    while (heightFreqCount[currHeight] == 0) currHeight++;
    //check if the currentHeight same as height at index i
    if (currHeight !== heights[i]) wrongPositions++;
    //reduce the count of currHeight frequency
    heightFreqCount[currHeight]--;
  }
  return wrongPositions;
};
