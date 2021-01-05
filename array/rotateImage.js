/* 
You are given an n x n 2D matrix representing an image, rotate the image 
by 90 degrees (clockwise).
You have to rotate the image in-place, which means you have to modify the 
input 2D matrix directly. 
DO NOT allocate another 2D matrix and do the rotation.

Input: matrix = [[1,2,3],[4,5,6],[7,8,9]]
Output: [[7,4,1],[8,5,2],[9,6,3]]

Input: matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]]
Output: [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]

Input: matrix = [[1]]
Output: [[1]]

Input: matrix = [[1,2],[3,4]]
Output: [[3,1],[4,2]]

Constraints:
i) matrix.length == n
ii) matrix[i].length == n
iii) 1 <= n <= 20
iv) -1000 <= matrix[i][j] <= 1000

*/
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
/* 
Approach 1: Using auxilary space
Time complexity: O(N^2)
Space: O(N X N)
Observation: The Row is getting converted into column
matrix = [[1]] - PASS
matrix = [[1,2],[3,4]] - FAIL
matrix = [[1,2,3],[4,5,6],[7,8,9]] - FAIL
matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]] - FAIL
 */
var rotate = function(matrix) {
    const aux = [...Array(matrix.length)].map(x => Array(matrix[0].length).fill(0));
    const n = matrix.length;
    for (let i = 0; i < n; i++){
        for (let j=0; j < n; j++){
            aux[j][n - i -1] = matrix[i][j];
        }
    }
    return aux;
};
/* 
Approach 1: Without auxilary space, in-place modification
Observation: we need to rotate four element at a time (min matrix size 2 X 2)
Time complexity: O(N^2)
Space: O(1)
matrix = [[1]] - PASS
matrix = [[1,2],[3,4]] - PASS
matrix = [[1,2,3],[4,5,6],[7,8,9]] - FAILS
 */
var rotate = function(matrix) {
    if (matrix.length == 1) return;
    for (let i = 0; i < matrix.length-1; i++){
        for (let j = 0; j < matrix[i].length-1; j++){
            colIndex = matrix[i].length - i -1;
            console.log(`i: ${i}, j: ${j}, colIdx: ${colIndex}`);
            temp = matrix[i][colIndex];
            console.log(`temp: ${temp}`);
            matrix[j][colIndex] = matrix[i][j];
            temp2 = matrix[colIndex][matrix[i].length - j -1];
            console.log(`temp2: ${temp2}`);
            matrix[colIndex][matrix[i].length - j -1] = temp;
            temp = matrix[matrix[i].length - j -1][matrix[i].length - colIndex -1];
            console.log(`temp3: ${temp}`);
            matrix[matrix[i].length - j -1][matrix[i].length - colIndex -1] = temp2;
            matrix[i][j] = temp;
        }
    }  
};

/* 
Cleaner code with bug fixes (With solution reference)
matrix = [[1]] - PASS
matrix = [[1,2],[3,4]] - PASS
matrix = [[1,2,3],[4,5,6],[7,8,9]] - PASS
matrix = [[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]] - PASS
Time complexity: O(N^2)
Space complexity: O(1)
Runtime: 84 ms, faster than 27.07% of JavaScript online submissions for Rotate Image.
Memory Usage: 38.6 MB, less than 73.53% of JavaScript online submissions for Rotate Image.
*/
var rotate = function(matrix) {
    if (matrix.length == 1) return;
    const n = matrix.length;
    for (let i = 0; i < parseInt((n + 1) / 2); i++){
        for (let j = 0; j < parseInt(n / 2); j++){            
            temp = matrix[i][j];
            matrix[i][j] = matrix[n - 1 - i][j];
            matrix[n - 1 - i][j] = matrix[n - 1 - i][n - 1 - j];
            matrix[n - 1 - i][n - 1 - j] = matrix[i][n - 1 - j];
            matrix[i][n - 1 - j] = temp;
        }
    }  
};

/*
Approach 2: Transpose and reverse
Runtime: 88 ms, faster than 17.00% of JavaScript online submissions for Rotate Image.
Memory Usage: 41.2 MB, less than 6.26% of JavaScript online submissions for Rotate Image.
 */
var rotate = function(matrix) {
    //1. transpose
    const n = matrix.length;
    for (let i = 0; i < n; i++){
        for (let j = i; j < n; j++){
            temp = matrix[j][i];
            // console.log(`swapping ${temp} with ${matrix[i][j]}`);
            matrix[j][i] = matrix[i][j];
            matrix[i][j] = temp;
        }
    }
    console.log(matrix);
    //2. reverse
    for (let i = 0; i < n; i++){
        for (let j = 0; j < parseInt(n / 2); j++){
            temp = matrix[i][j];
            // console.log(`swapping ${temp} with ${matrix[i][n-1-j]}`);
            matrix[i][j] = matrix[i][n-1-j];
            matrix[i][n-1-j] = temp;
        }
    }
}