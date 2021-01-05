/* 
Implement next permutation, which rearranges numbers into the lexicographically next greater permutation of numbers.
If such an arrangement is not possible, it must rearrange it as the lowest possible order (i.e., sorted in ascending order).
The replacement must be in place and use only constant extra memory.

Input: nums = [1,2,3]
Output: [1,3,2]

Input: nums = [3,2,1]
Output: [1,2,3]

Input: nums = [1,1,5]
Output: [1,5,1]

Input: nums = [1]
Output: [1]
*/
/**
 * Medium
 * Not very intutive problem
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
// nums = [1, 2, 3]; - PASS
// nums = [1,1,5];   - PASS
// nums = [1,2] => [2,1] - PASS
// nums = [1,3,5,4,2] => [1,4,2,3,5] - PASS
// nums = [1,3,4,5,2] => [1,3,5,2,4] - PASS
// nums = [1,5,1] - FAILED
var nextPermutation = function(nums) {
    const swap = (i, j, A) => {
        const temp = A[i];
        A[i] = A[j];
        A[j] = temp
    }

    const reverse = (start, end, arr) => {
        while (start < end) {
            swap(start++, end--, arr);
        }
    }

    const N = nums.length;
    if (N <= 1) return;
    // 1. start from end and scan left unril we find 'i' such that a[i] < a[i+1]
    let i = N - 2, j = i;
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    console.log(`i: ${i}`);
    // 2. find j such that a[j] > a[i]
    let minDiff = Number.MAX_VALUE;
    for (let k = i + 1; k < N; k++) {
        const diff = nums[k] - nums[i];
        // should we break at diff <=0
        if (diff > 0 && diff < minDiff) {
            minDiff = diff;
            j = k;
        }
    }
    console.log(`j: ${j}`);
    if (j > i) swap(i++, j, nums);
    console.log(`updated array: ${nums}`);
    //3. reverse the remaining part
    console.log(`final i: ${i}`);
    reverse(i, N - 1, nums);
    console.log(`updated array after reverse: ${nums}`);
};

// clean up with solution reference
var nextPermutation = function(nums) {
    const swap = (i, j, A) => {
        const temp = A[i];
        A[i] = A[j];
        A[j] = temp
    }

    const reverse = (start, end, arr) => {
        while (start < end) {
            swap(start++, end--, arr);
        }
    }

    const N = nums.length;
    if (N <= 1) return;
    // 1. start from end and scan left unril we find 'i' such that a[i] < a[i+1]
    let i = N - 2, j = i;
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    console.log(`i: ${i}`);
    // 2. find j such that a[j] > a[i]
    if (i >= 0) {
        let j = N - 1;
        while (j >= 0 && nums[j] < nums[i]) {
            j--;
        }
        console.log(`j: ${j}`);
        if (j > i) swap(i, j, nums);
    }
    console.log(`updated array: ${nums}`);
    //3. reverse the remaining part
    console.log(`final i: ${i}`);
    reverse(i + 1, N - 1, nums);
    console.log(`updated array after reverse: ${nums}`);
};

// for submission
/* 
Runtime: 84 ms, faster than 88.52% of JavaScript online submissions for Next Permutation.
Memory Usage: 40.1 MB, less than 17.16% of JavaScript online submissions for Next Permutation.
*/
var nextPermutation = function(nums) {
    const swap = (i, j, A) => {
        const temp = A[i];
        A[i] = A[j];
        A[j] = temp
    }

    const reverse = (start, end, arr) => {
        while (start < end) {
            swap(start++, end--, arr);
        }
    }

    const N = nums.length;
    if (N <= 1) return;
    // 1. start from end and scan left until we find 'i' such that a[i] < a[i+1]
    let i = N - 2, j = i;
    while (i >= 0 && nums[i] >= nums[i + 1]) i--;
    // 2. find j such that a[j] > a[i]
    if (i >= 0) {
        let j = N - 1;
        while (j >= 0 && nums[j] <= nums[i]) {
            j--;
        }
        if (j > i) swap(i, j, nums);
    }
    //3. reverse the remaining part
    reverse(i + 1, N - 1, nums);
};
