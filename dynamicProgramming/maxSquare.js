/**
Given a 2D binary matrix filled with 0's and 1's, find the largest square containing only 1's 
and return its area.

Input: [["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]]
1 0 1 0 0
1 0 1 1 1
1 1 1 1 1
1 0 0 1 0

Output: 4

 * @param {character[][]} matrix
 * @return {number}
 */
matrix = [["1", "0", "1", "0", "0"], ["1", "0", "1", "1", "1"], ["1", "1", "1", "1", "1"], ["1", "0", "0", "1", "0"]]
var maximalSquare = function(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const dp = [...Array(rows + 1)].map(x => Array(cols + 1).fill(0));
    let maxSide = 0;
    for (let i = 1; i <= rows; i++) {
        for (j = 1; j <= cols; j++) {
            if (matrix[i - 1][j - 1] === '1') {
                dp[i][j] = Math.min(dp[i - 1][j], dp[i - 1][j], dp[i][j - 1]) + 1;
            }
            maxSide = Math.max(maxSide, dp[i][j]);
        }
    }
    return maxSide * maxSide;
};