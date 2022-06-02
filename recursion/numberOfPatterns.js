/*
Android devices have a special lock screen with a 3 x 3 grid of dots. Users can set an
"unlock pattern" by connecting the dots in a specific sequence, forming a series of joined 
line segments where each segment's endpoints are two consecutive dots in the sequence. 
A sequence of k dots is a valid unlock pattern if both of the following are true:

All the dots in the sequence are distinct.
If the line segment connecting two consecutive dots in the sequence passes through the center
of any other dot, the other dot must have previously appeared in the sequence. No jumps through
the center non-selected dots are allowed.
For example, connecting dots 2 and 9 without dots 5 or 6 appearing beforehand is valid because the
line from dot 2 to dot 9 does not pass through the center of either dot 5 or 6.
However, connecting dots 1 and 3 without dot 2 appearing beforehand is invalid because the line 
from dot 1 to dot 3 passes through the center of dot 2.
Here are some example valid and invalid unlock patterns:


 - The 1st pattern [4,1,3,6] is invalid because the line connecting dots 1 and 3 pass through dot 2, but dot 2 did not previously appear in the sequence.
 - The 2nd pattern [4,1,9,2] is invalid because the line connecting dots 1 and 9 pass through dot 5, but dot 5 did not previously appear in the sequence.
 - The 3rd pattern [2,4,1,3,6] is valid because it follows the conditions. The line connecting dots 1 and 3 meets the condition because dot 2 previously appeared in the sequence.
 - The 4th pattern [6,5,4,1,9,2] is valid because it follows the conditions. The line connecting dots 1 and 9 meets the condition because dot 5 previously appeared in the sequence.

Given two integers m and n, return the number of unique and valid unlock patterns of the Android grid
 lock screen that consist of at least m keys and at most n keys.

Two unlock patterns are considered unique if there is a dot in one sequence that is not in the other,
 or the order of the dots is different.
 
Example 1:

Input: m = 1, n = 1
Output: 9

Example 2:

Input: m = 1, n = 2
Output: 65
 */
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
/*
0,0
2,2
*/
var numberOfPatterns = function (m, n) {
  let noOfPatterns = 0;
  const matrix = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ];
  const rows = matrix.length;
  const columns = matrix[0].length;

  const backtrack = (i, j, currLength, minLength, maxLength) => {
    if (i < 0 || j < 0 || i >= rows || j >= columns) return;
    if (currLength > maxLength) return;
    if (currLength == minLength) noOfPatterns++;
    if (minLength !== maxLength && currLength === maxLength) {
      noOfPatterns++;
      return;
    }
    //up
    backtrack(i - 1, j, currLength + 1, minLength, maxLength);
    //down
    backtrack(i + 1, j, currLength + 1, minLength, maxLength);
    //left
    backtrack(i, j - 1, currLength + 1, minLength, maxLength);
    //right
    backtrack(i, j + 1, currLength + 1, minLength, maxLength);
    //left up diagonal
    backtrack(i - 1, j - 1, currLength + 1, minLength, maxLength);
    //right up diagonal
    backtrack(i - 1, j + 1, currLength + 1, minLength, maxLength);
    //left down diagonal
    backtrack(i + 1, j - 1, currLength + 1, minLength, maxLength);
    //right down diagonal
    backtrack(i + 1, j + 1, currLength + 1, minLength, maxLength);
  };
  //try for each length
  for (let patternLength = m; patternLength <= n; patternLength++) {
    //check from each digits
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < columns; j++) {
        backtrack(i, j, 1, m, n);
      }
    }
  }
  return noOfPatterns;
};
//Reference
/* 
Approach: DFS + Backtracking
Your memory usage beats 86.08 % of javascript submissions.
*/
var numberOfPatterns = function (m, n) {
  const dfs = (num, length, count, min, max) => {
    if (length >= min) count++;
    length++;
    if (length > max) return count;
    visited[num] = true;
    //check the combination with rest of the numbers
    for (let next = 1; next <= 9; next++) {
      const jump = jumps[num][next];
      // if `next` number is not visited and this is not jump number or jump
      // number is already visited in the path
      if (!visited[next] && (jump == 0 || visited[jump])) {
        count = dfs(next, length, count, min, max);
      }
    }
    visited[num] = false;
    return count;
  };

  const jumps = [...Array(10)].map(() => new Array(10).fill(0));
  const visited = new Array(10).fill(false);

  jumps[1][3] = jumps[3][1] = 2;
  jumps[1][7] = jumps[7][1] = 4;
  jumps[7][9] = jumps[9][7] = 8;
  jumps[3][9] = jumps[9][3] = 6;
  jumps[1][9] =
    jumps[9][1] =
    jumps[4][6] =
    jumps[6][4] =
    jumps[3][7] =
    jumps[7][3] =
    jumps[2][8] =
    jumps[8][2] =
      5;

  let count = 0;
  count += dfs(1, 1, 0, m, n) * 4; //1, 3, 7, 9 are symmetrical
  count += dfs(2, 1, 0, m, n) * 4; //2, 4, 6, 8 are symmetrical
  count += dfs(5, 1, 0, m, n);
  return count;
};
