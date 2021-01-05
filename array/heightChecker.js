/**
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
 */

/**
* @param {number[]} heights
* @return {number}
*/

/* 
heights = [1,1,4,2,1,3] => PASSED
heights = [5,1,2,3,4]   => PASSED
heights = [1,2,3,4,5]   => PASSED
*/
var heightChecker = function(heights) {
    const copy = Array.from(heights);
    copy.sort();
    console.log(`copy: ${copy}`);
    let wrongPositions = 0;
    for (let i = 0; i < heights.length; i++) {
        if (heights[i] !== copy[i]) {
            wrongPositions++;
        }
    }
    console.log(`wrongPositions: ${wrongPositions}`);
    return wrongPositions;
};


/*
Runtime: 76 ms
Memory Usage: 36.2 MB
Your runtime beats 72.36 % of javascript submissions.
Your memory usage beats 97.44 % of javascript submissions.
*/
var heightChecker = function(heights) {
    const sorted = [...heights].sort((a, b) => a - b);
    let wrongPositions = 0;
    for (let i in heights) {
        if (heights[i] != sorted[i]) {
            wrongPositions++;
        }
    }
    return wrongPositions;
};