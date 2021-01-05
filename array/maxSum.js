/* 
Given an array of integers of size ‘n’.
Our aim is to calculate the maximum sum of ‘k’ consecutive elements in the array.
We can solve this problem using the sliding window approach.
*/
/*
A = [5,2,-1,0,3], k=3 => 6 Passed
A = [100, 200, 300, 400], k=2 => 700 => Passed
A = [1, 4, 2, 10, 23, 3, 1, 0, 20], k=4 => 39 => Passed
A = [2, 3], k=3 => -1 => Passed
*/
var maxSum = function(A, k) {
    if (k > A.length) return -1;
    let maxSum = 0;
    for (let i = 0; i < k; i++) {
        maxSum += A[i];
    }
    let windowSum = maxSum;
    console.log(`maxSum for first ${k} window: ${maxSum}`);
    for (let i = k; i < A.length; i++) {
        windowSum = windowSum + A[i] - A[i - k];
        maxSum = Math.max(maxSum, windowSum);
    }
    console.log(`maxSum: ${maxSum}`);
    return maxSum;
}