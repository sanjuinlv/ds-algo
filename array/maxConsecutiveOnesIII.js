/**
 * @param {number[]} A
 * @param {number} K
 * @return {number}
 */
var longestOnes = function(A, K) {
    let start = 0, zeroCount = 0, maxConsecutiveOnes = 0;
    for (let end = 0; end < A.length; end++) {
        if (A[end] === 0) {
            zeroCount++;
        }
        //evict the extra zeros, and move the start pointer
        while (zeroCount > K) {
            if (A[start] === 0) {
                zeroCount--;
            }
            start++;
        }
        maxConsecutiveOnes = Math.max(maxConsecutiveOnes, end - start + 1);
    }
    return maxConsecutiveOnes;
};