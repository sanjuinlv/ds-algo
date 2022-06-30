/* 
Given a rows x cols binary matrix filled with 0's and 1's, find the largest
rectangle containing only 1's and return its area.

Example 1:
1,0,1,0,0
1,0,1,1,1
1,1,1,1,1
1,0,0,1,0

Input: matrix = [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
Output: 6
Explanation: The maximal rectangle is shown in the above picture.

Example 2:
Input: matrix = [["0"]]
Output: 0

Example 3:
Input: matrix = [["1"]]
Output: 1

*/
/**
 * @param {character[][]} matrix
 * @return {number}
 */
/*
Approach: Using Histograms - Stack
Time: O(M*N) 
Space: O(N) - colmns data needs to be stored
Runtime: 170 ms, faster than 29.52% of JavaScript online submissions for Maximal Rectangle.
Memory Usage: 49.9 MB, less than 21.43% of JavaScript online submissions for Maximal Rectangle.
 */
var maximalRectangle = function (matrix) {
  function MAH(arr) {
    let stack = [];
    const N = arr.length;
    const NSLIndex = new Array(N);
    const NSRIndex = new Array(N);
    const top = (A) => A[A.length - 1];
    //1. Calculate NSLIndexes
    stack.push([arr[0], 0]);
    NSLIndex[0] = -1;
    for (let i = 1; i < N; i++) {
      //if top of stack is smaller than current then we found NSL
      if (top(stack)[0] < arr[i]) {
        NSLIndex[i] = top(stack)[1];
      } else {
        //until top of stack is greater than curr pop it
        while (stack.length !== 0 && top(stack)[0] >= arr[i]) stack.pop();
        //nothing left in stack
        if (stack.length == 0) NSLIndex[i] = -1;
        else NSLIndex[i] = top(stack)[1];
      }
      stack.push([arr[i], i]);
    }
    //2. Calculate NSRIndexes
    stack = [];
    stack.push([arr[N - 1], N - 1]);
    NSRIndex[N - 1] = N;
    for (let i = N - 2; i >= 0; i--) {
      //if the top of the stack is smaller than curr num then we found NSR
      if (top(stack)[0] < arr[i]) {
        NSRIndex[i] = top(stack)[1];
      } else {
        //until the top of the stack is greater than curr pop it
        while (stack.length !== 0 && top(stack)[0] >= arr[i]) stack.pop();
        //nothing left in stack
        if (stack.length == 0) NSRIndex[i] = N;
        else NSRIndex[i] = top(stack)[1];
      }
      stack.push([arr[i], i]);
    }
    let maxArea = -Infinity;
    for (let i = 0; i < N; i++) {
      maxArea = Math.max(maxArea, (NSRIndex[i] - NSLIndex[i] - 1) * arr[i]);
    }
    return maxArea !== -Infinity ? maxArea : 0;
  }

  let maxArea = -Infinity;
  const rows = matrix.length;
  const cols = matrix[0].length;
  const rowData = new Array(cols).fill(0);
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      //if we found zero that means there is no based for block
      if (matrix[i][j] == "0") {
        rowData[j] = 0;
      } else {
        //add up with previous value
        rowData[j] += 1;
      }
    }
    console.log(rowData);
    maxArea = Math.max(MAH(rowData), maxArea);
  }
  return maxArea !== -Infinity ? maxArea : 0;
};
