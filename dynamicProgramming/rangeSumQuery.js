/* 
Given a 2D matrix matrix, find the sum of the elements inside the rectangle 
defined by its upper left corner (row1, col1) and lower right corner (row2, col2).

Given matrix = [
  [3, 0, 1, 4, 2],
  [5, 6, 3, 2, 1],
  [1, 2, 0, 1, 5],
  [4, 1, 0, 1, 7],
  [1, 0, 3, 0, 5]
]

sumRegion(2, 1, 4, 3) -> 8
sumRegion(1, 1, 2, 2) -> 11
sumRegion(1, 2, 2, 4) -> 12

Note:
    - You may assume that the matrix does not change.
    - There are many calls to sumRegion function.
    - You may assume that row1 ≤ row2 and col1 ≤ col2.

*/

/** 
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */

/**
 * @param {number[][]} matrix
 */
var NumMatrix = function(matrix) {
    this.matrix = matrix;
};

/** 
 * @param {number} row1 
 * @param {number} col1 
 * @param {number} row2 
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
    let sum = 0;
    for (let row = row1; row <= row2; row++){
        for(let col = col1; col <= col2; col++){
            sum += this.matrix[row][col];
        }
    }
    return sum;
};

/* 
Approach I: Brute Force
*/
class NumMatrix {
    constructor(matrix){
        this.matrix = matrix;
    }
    
    sumRegion(row1, col1, row2, col2) {
        let sum = 0;
        for (let row = row1; row <= row2; row++){
            for(let col = col1; col <= col2; col++){
                sum += this.matrix[row][col];
            }
        }
        return sum;    
    }
}

/* 
Approach I: Caching Rows
Time Complexity: O(m) time per query, O(mn) time pre-computation.
Space Complexity: O(mn) to store the cumulative sum of all rows

["NumMatrix","sumRegion","sumRegion","sumRegion"]
[[[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]],[2,1,4,3],[1,1,2,2],[2,2,2,2]]

["NumMatrix","sumRegion"]
[[[[3,0,1,4,2],[5,6,3,2,1],[1,2,0,1,5],[4,1,0,1,7],[1,0,3,0,5]]],[2,1,4,3]]

Fails for 
["NumMatrix","sumRegion"]
[[[[-1]]],[0,0,0,0]]

Runtime: 108 ms, faster than 69.23% of JavaScript online submissions for Range Sum Query 2D - Immutable.
Memory Usage: 43.6 MB, less than 43.59% of JavaScript online submissions for Range Sum Query 2D - Immutable.
*/
class NumMatrix {
    constructor(matrix){
        this.matrix = matrix;
        if (matrix.length == 0  || matrix[0].length == 0) return;        
        this.sumMatrix = [...Array(matrix.length)].map(x => Array(matrix[0].length).fill(0));
        this.prepareSum();
    }
    
    prepareSum(){
        for (let row = 0; row < this.matrix.length; row++){
            for(let col = 0; col < this.matrix[0].length; col++){
                if (col == 0) { 
                    this.sumMatrix[row][col] = this.matrix[row][col]
                } else {
                    this.sumMatrix[row][col] = this.sumMatrix[row][col-1] 
                    + this.matrix[row][col];
                }
            }
        }
    }
    
    sumRegion(row1, col1, row2, col2) {
        let sum = 0;
        if (row1 >= this.matrix.length || row2 >= this.matrix.length
             || col1 >= this.matrix[0].length || col2 >= this.matrix[0].length){
                 return sum;
        }
        for (let row = row1; row <= row2; row++){
            if (col2 = 0) {
                sum += this.sumMatrix[row][col1];
            } else {
                sum += this.sumMatrix[row][col2] - this.sumMatrix[row][col1-1];    
            }            
        }
        return sum;    
    }
}

/* 
Clean code, wihtout col =0 handling
Runtime: 148 ms, faster than 35.35% of JavaScript online submissions for Range Sum Query 2D - Immutable.
Memory Usage: 43.5 MB, less than 44.44% of JavaScript online submissions for Range Sum Query 2D - Immutable.
*/
class NumMatrix {
    constructor(matrix){
        this.matrix = matrix;
        if (matrix.length == 0  || matrix[0].length == 0) return;        
        //create 2-D with extra column so that we don't need to handle col-1 as negative val
        this.sumMatrix = [...Array(matrix.length)].map(x => Array(matrix[0].length + 1).fill(0));
        this.prepareSumMatric();
    }
    
    prepareSumMatric(){
        for (let row = 0; row < this.matrix.length; row++){
            for(let col = 0; col < this.matrix[0].length; col++){
                this.sumMatrix[row][col + 1] = this.sumMatrix[row][col] 
                + this.matrix[row][col];
            }
        }
    }
    
    sumRegion(row1, col1, row2, col2) {
        let sum = 0;
        for (let row = row1; row <= row2; row++){
            sum += this.sumMatrix[row][col2 + 1] - this.sumMatrix[row][col1];    
        }
        return sum;    
    }
}

/*
Approach III: (Caching Smarter)
Time complexity: O(1) time per query, O(mn) time pre-computation. The pre-computation
in the constructor takes O(mn) time. Each sumRegion query takes O(1) time.
Space complexity : O(mn). The algorithm uses O(mn) space to store the cumulative region sum

Runtime: 124 ms, faster than 45.45% of JavaScript online submissions for Range Sum Query 2D - Immutable.
Memory Usage: 43.4 MB, less than 57.58% of JavaScript online submissions for Range Sum Query 2D - Immutable.
 */
class NumMatrix {
    constructor(matrix){
        this.matrix = matrix;
        if (matrix.length == 0  || matrix[0].length == 0) return;        
        //create 2-D with extra row & column for easy query
        this.dp = [...Array(matrix.length + 1)].map(x => Array(matrix[0].length + 1).fill(0));
        this.prepareSumMatric();
    }
    
    prepareSumMatric(){
        for (let r = 0; r < this.matrix.length; r++){
            for(let c = 0; c < this.matrix[0].length; c++){
                this.dp[r + 1][c + 1] = this.dp[r + 1][c] 
                    + this.dp[r][c + 1] - this.dp[r][c] 
                    + this.matrix[r][c];
            }
        }
    }
    
    sumRegion(row1, col1, row2, col2) {
        return this.dp[row2 + 1][col2 + 1] - this.dp[row1][col2 + 1] - this.dp[row2+1][col1]
            + this.dp[row1][col1];    
    }
}

