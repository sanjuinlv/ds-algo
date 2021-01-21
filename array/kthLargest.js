/* 
Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Example 1:
Input: [3,2,1,5,6,4] and k = 2
Output: 5

Example 2:
Input: [3,2,3,1,2,4,5,5,6] and k = 4
Output: 4

Note: 
You may assume k is always valid, 1 ≤ k ≤ array's length.
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
/* 
A = [3,2,1,5,6,4], k=2  => 5  (Passed)
A = [3,2,3,1,2,4,5,5,6] ,  k = 4  => 4  (Passed)
*/
var findKthLargest = function(nums, k) {
    // helper function 
    const LESS = (A, i, j) => {
        return A[i] < A[j];
    }

    const SWAP = (a, i, j) => {
        [a[i], a[j]] = [a[j], a[i]];
    }

    const partition = (A, lo, hi) => {
        console.log(`partition:: lo: ${lo}, hi: ${hi}`);
        let i = lo, j = hi + 1;
        while (i < j) {
            while (LESS(A, ++i, lo)) {
                if (i === hi) break;
            }
            while (LESS(A, lo, --j)) {
                console.log(`j: ${j}`);
                if (j === lo) break;
            }
            console.log(`i: ${i}, j: ${j}`);
            if (i >= j) break;
            SWAP(A, i, j)
        }
        SWAP(A, lo, j);
        console.log(`array after partition: ${A}`);
        return j;
    }
    // Implementation code
    const N = nums.length;
    const kSmallest = N - k;
    if (k > N) return;

    const quickSelect = (A, lo, hi) => {
        console.log(`quickselect:: lo: ${lo}, hi: ${hi}`);
        if (lo > hi) return;
        // only one element
        if (lo == hi) return A[lo];
        const p = partition(A, lo, hi);
        console.log(`pivot: ${p}`);
        // the pivot is on (N - k)th smallest position
        if (p === kSmallest) {
            return A[p];
        } else if (p < kSmallest) {// go to the right side
            return quickSelect(A, p + 1, hi);
        } else { // go to the left side
            return quickSelect(A, lo, p - 1);
        }
    }
    return quickSelect(nums, 0, N - 1);
};

// For submission
/*
Time complexity : O(N) in the average case, (N^2) in the worst case.
Space complexity : O(1).

Runtime: 184 ms, faster than 8.53% of JavaScript online submissions for Kth Largest Element in an Array.
Memory Usage: 41.1 MB, less than 6.83% of JavaScript online submissions for Kth Largest Element in an Array.
*/
var findKthLargest = function(nums, k) {
    const LESS = (A, i, j) => {
        return A[i] < A[j];
    }
    const SWAP = (a, i, j) => {
        [a[i], a[j]] = [a[j], a[i]];
    }
    const partition = (A, lo, hi) => {
        let i = lo, j = hi + 1;
        while (i < j) {
            while (LESS(A, ++i, lo)) {
                if (i === hi) break;
            }
            while (LESS(A, lo, --j)) {
                if (j === lo) break;
            }
            if (i >= j) break;
            SWAP(A, i, j)
        }
        SWAP(A, lo, j);
        return j;
    }

    const N = nums.length;
    const kSmallest = N - k;
    if (k > N) return;

    const quickSelect = (A, lo, hi) => {
        if (lo > hi) return;
        // only one element
        if (lo == hi) return A[lo];
        const p = partition(A, lo, hi);
        // the pivot is on (N - k)th smallest position
        if (p === kSmallest) {
            return A[p];
        } else if (p < kSmallest) {// go to the right side
            return quickSelect(A, p + 1, hi);
        } else { // go to the left side
            return quickSelect(A, lo, p - 1);
        }
    }
    return quickSelect(nums, 0, N - 1);
};

    // Using heap