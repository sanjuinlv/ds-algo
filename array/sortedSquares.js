/**
 * @param {number[]} A
 * @return {number[]}
 */
var sortedSquares = function(A) {
    let left = 0; right = A.length - 1;
    let insertPointer = right;
    let sortedSquares = new Array(A.length);
    while (left <= right) {
        let leftVal = A[left];
        let rightVal = A[right];
        if (left === right) {
            sortedSquares[insertPointer] = leftVal * leftVal;
            break;
        }
        if (Math.abs(leftVal) < Math.abs(rightVal)) {
            sortedSquares[insertPointer] = rightVal * rightVal;
            sortedSquares[insertPointer - 1] = leftVal * leftVal;
        } else {
            sortedSquares[insertPointer] = leftVal * leftVal;
            sortedSquares[insertPointer - 1] = rightVal * rightVal;
        }
        left++;
        right--;
        insertPointer = insertPointer - 2;
    }
    return sortedSquares;
};

// The above solution fails when input has repeated number, e.g., 
// input:  [-1,2,2]
// output: [4,1,4]

// Other only right solution would be:
// 1. Loop through the array items and create square of item. 
// After the loop we will only have positive integers, though it will not be sorted.
// Time: N
// 2. Now sort the array:
// Time: O(NLogN)
// so final time complexity : O(NLogN) and Space: O(N)


// Corrected solution with reference
// O(N), Space: O(N)
var sortedSquares = function(A) {
    let left = 0;
    let right = A.length - 1;
    let insertPointer = right;
    let sortedSquares = new Array(A.length);
    while (left <= right) {
        if (Math.abs(A[left]) > Math.abs(A[right])) {
            sortedSquares[insertPointer] = A[left] * A[left];
            left++;
        } else {
            sortedSquares[insertPointer] = A[right] * A[right];
            right--;
        }
        insertPointer--;
    }
    return sortedSquares;
};

// easiest solution given by user ;) 
var sortedSquares = function(A) {
    return A.map(e => e * e).sort((a, b) => a - b);
};