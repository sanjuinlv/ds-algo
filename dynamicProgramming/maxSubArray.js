/* 
Given an integer array nums, find the contiguous subarray (containing at least one number) 
which has the largest sum and return its sum.
Follow up: If you have figured out the O(n) solution, try coding another solution 
using the divide and conquer approach, which is more subtle.
Example 1:
    Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
    Output: 6
    Explanation: [4,-1,2,1] has the largest sum = 6.
Example 2:
    Input: nums = [1]
    Output: 1

Example 3:
    Input: nums = [0]
    Output: 0
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxSubArray = function(nums) {
    const N = nums.length;
    // initialize the 2-D array and fill with zeros
    const dp = [...Array(N)].map(x => Array(N).fill(0));
    // console.log(`dp after intialization : ${dp}`)
    maxSum = nums[0];
    //set the values at [i][i] to number itself
    for (let i = 0; i < N; i++) {
        dp[i][i] = nums[i];
        if (nums[i] > maxSum) maxSum = nums[i];
    }
    // console.log(`dp I : ${dp}`)
    console.log(dp);
    // for 
    for (let i = 0; i < N - 1; i++) {
        dp[i][i + 1] = nums[i] + nums[i + 1];
        if (dp[i][i + 1] > maxSum) maxSum = dp[i][i + 1];
    }
    // console.log(`dp II: ${dp}`);
    console.log(dp);
    for (let k = 3; k <= N; k++) {
        console.log(`k: ${k}`);
        for (let i = 0; i <= N - k; i++) {
            j = i + k - 1;//-1 to convert it zero based index
            console.log(`i: ${i}, j: ${j}`);
            dp[i][j] = dp[i][j - 1] + nums[j];
            if (dp[i][j] > maxSum) maxSum = dp[i][j];
            console.log(`maxSum: ${maxSum}`);
        }
        console.log(dp);
    }
    console.log(`maxSum: ${maxSum}`);
    return maxSum;
};

// Using Kadane's algorithms
// Time complexity: O(N)
// Space: O(1)
/*
Runtime: 96 ms, faster than 24.66% of JavaScript online submissions for Maximum Subarray.
Memory Usage: 38.3 MB, less than 8.43% of JavaScript online submissions for Maximum Subarray.
 */
var maxSubArray = function(nums) {
    const N = nums.length;
    let local_max = nums[0];
    let global_max = local_max;

    for (let i = 1; i < N; i++) {
        local_max = Math.max(nums[i], nums[i] + local_max);
        if (local_max > global_max) global_max = local_max;
    }
    return global_max;
}

