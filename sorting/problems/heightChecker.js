/**
https://leetcode.com/explore/learn/card/sorting/694/comparison-based-sorts/4484

    Students are asked to stand in non-decreasing order of heights for an annual photo.
    Return the minimum number of students that must move in order for all students to be standing in non-decreasing order of height.
    Notice that when a group of students is selected they can reorder in any possible way between themselves and the non selected students remain on their seats.

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
  const sorted = [...heights].sort((a, b) => a - b);
  let wrongPositions = 0;
  for (let i in heights) {
    if (heights[i] != sorted[i]) {
      wrongPositions++;
    }
  }
  return wrongPositions;
};

/* 
Approach II: Linear Scan
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

//this will even count extra swaps
// var heightChecker = function (heights) {
//   let wrongPositions = 0;
//   let hasSwapped = true;
//   const swap = (i, j, arr) => {
//     [arr[i], arr[j]] = [arr[j], arr[i]];
//   };

//   while (hasSwapped) {
//     hasSwapped = false;
//     for (let i = 0; i < heights.length - 1; i++) {
//       if (heights[i] > heights[i + 1]) {
//         swap(i, i + 1, heights);
//         hasSwapped = true;
//         wrongPositions++;
//       }
//     }
//   }
//   return wrongPositions - 1;
// };

[1, 1, 4, 2, 1, 3];
