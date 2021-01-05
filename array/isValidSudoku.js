/**
 * @param {character[][]} board
 * @return {boolean}
 */
// Approach 1: using hash table 
/* 
Runtime: 88 ms, faster than 96.96% of JavaScript online submissions for Valid Sudoku.
Memory Usage: 41.6 MB, less than 71.99% of JavaScript online submissions for Valid Sudoku.
*/
var isValidSudoku = function(board) {
    let visited = new Set();
    //validate all the 3 X 3 grids
    let gridSize = 3;
    for (let row = 0; row < board.length; row += gridSize){
        for (let column = 0; column < board[0].length; column += gridSize){
            visited.clear();
            for (let i = row; i < row + gridSize; i++){            
                for (let j = column; j < column + gridSize; j++){
                    if (board[i][j] == ".") continue;
                    if (visited.has(board[i][j])) return false;
                    visited.add(board[i][j]);
                }
            }    
        }
    }
    console.log(`3 X 3 matrix are valid`);
    //validate the rows 
    for (let i = 0; i < board.length; i++){
        visited.clear();
        for (let j = 0; j < board[0].length; j++){
            if (board[i][j] == ".") continue;
            if (visited.has(board[i][j])) return false;
            visited.add(board[i][j]);
        }
    }
    console.log(`rows are valid`);
    //validate the columns  
    for (let i = 0; i < board[0].length; i++){
        visited.clear();
        for (let j = 0; j < board.length; j++){
            if (board[j][i] == ".") continue;
            if (visited.has(board[j][i])) return false;
            visited.add(board[j][i]);
        }
    }
    return true;    
};

// Using solution reference
/* 
Runtime: 88 ms, faster than 96.96% of JavaScript online submissions for Valid Sudoku.
Memory Usage: 42.9 MB, less than 42.06% of JavaScript online submissions for Valid Sudoku.
*/
var isValidSudoku = function(board) {
    let rows = [];
    let colums = [];
    let boxes = [];
    for (let i = 0; i < 9; i++){
        rows[i] = new Map();
        colums[i] = new Map();
        boxes[i] = new Map();
    }
    for (let i = 0 ; i < 9; i++){
        for (let j = 0; j < 9; j++){
            if (board[i][j] != '.'){
                let value = board[i][j];
                boxIndex = parseInt((i / 3)) * 3 + parseInt(j / 3);
                rows[i].set(value, (rows[i].get(value)|| 0) + 1);
                colums[j].set(value, (colums[j].get(value)|| 0) + 1);
                boxes[boxIndex].set(value, (boxes[boxIndex].get(value)|| 0) + 1);
                if (rows[i].get(value) > 1 || colums[j].get(value) > 1
                    || boxes[boxIndex].get(value) > 1){
                    return false;
                }
            }
        }
    }
    return true;
}

[["5","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]

[["8","3",".",".","7",".",".",".","."],["6",".",".","1","9","5",".",".","."],[".","9","8",".",".",".",".","6","."],["8",".",".",".","6",".",".",".","3"],["4",".",".","8",".","3",".",".","1"],["7",".",".",".","2",".",".",".","6"],[".","6",".",".",".",".","2","8","."],[".",".",".","4","1","9",".",".","5"],[".",".",".",".","8",".",".","7","9"]]



boxIndex = (row / 3) * 3 + col /3

row = 2, col = 4
(2 / 3 ) * 3 + 4/3
0 * 3 + 1
1

item = 9 
row = 2, col = 1
(2/3)*3 + 1/3
0 *3 + 0
= 0 