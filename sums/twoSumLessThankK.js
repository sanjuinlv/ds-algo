/**
 * Given an array A of integers and integer K, return the maximum S such that there exists i < j 
 * with A[i] + A[j] = S and S < K. If no i, j exist satisfying this equation, return -1.
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
//using sorting and left, right pointer
var twoSumLessThanK = function (A, K) {
    //sort the array first
    A = A.sort((a, b) => a - b);
    left = 0; right = A.length - 1, max = -1, sum = 0;
    while (left < right) {
        sum = A[left] + A[right];
        console.log(`left: ${left}, right: ${right}, sum: ${sum}, S: ${max}`)
        if (sum < K) {
            if (max < sum) { // max of (max, sum)
                max = sum; // reassign the max to this
            }
            left++;
        } else {
            right--;
        }
    }
    return max;
};