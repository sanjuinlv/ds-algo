/**
 * @param {number[]} nums
 * @return {number}
 */
/* 
nums = [1,0,1,1,0] => 4  => Passed
nums = [1,0,1,0,1,1,1] => 5  => Passed
nums = [1,1,0,0,1,1,1] => 4 => Passed
nums = [1,0,1,1,0,1,1,0,0,1,1,0,1,1,1] => 6 => Passed
nums= [1] => 1  => Passed
nusm = [1,1] => 2 => Passed
*/
var findMaxConsecutiveOnes = function(nums) {
    console.log(`input: ${nums}`);
    if (nums.length == 1) return 1;
    let left = 0, right = 0, max = 0;
    let N = nums.length;
    for (let i = 0; i < N; i++) {
        if (nums[i] === 0) {
            max = Math.max(max, left + right + 1);
            left = right;
            right = 0;
        } else {
            right++;
        }
        console.log(`i: ${i}`);
        console.log(`left: ${left}, right: ${right}, max: ${max}`);
    }
    //where there are only 1's
    if (right >= N) return N;
    return Math.max(max, left + right + 1);
}

// for submission
/* 
Your runtime beats 84.12 % of javascript submissions.
Runtime: 80 ms
Memory Usage: 39.6 MB
*/
var findMaxConsecutiveOnes = function(nums) {
    if (nums.length == 1) return 1;
    let left = 0, right = 0, max = 0;
    let N = nums.length;
    for (let i = 0; i < N; i++) {
        if (nums[i] === 0) {
            max = Math.max(max, left + right + 1);
            left = right;
            right = 0;
        } else {
            right++;
        }
    }
    if (right >= N) return N;
    return Math.max(max, left + right + 1);
}

// Using Sliding window approach
var findMaxConsecutiveOnes = function(nums) {
    let start = 0, zeroCount = 0, maxConsecutiveOnes = 0;
    // number of zeros which can be flipped, in this case only 1 
    let k = 1;
    for (let end = 0; end < nums.length; end++) {
        if (nums[end] === 0) {
            zeroCount++;
        }
        //evict the extra zeros, and move the start pointer
        while (zeroCount > k) {
            if (nums[start] === 0) {
                zeroCount--;
            }
            start++;
        }
        maxConsecutiveOnes = Math.max(maxConsecutiveOnes, end - start + 1);
    }
    return maxConsecutiveOnes;
}
