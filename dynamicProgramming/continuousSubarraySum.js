/* 
Given a list of non-negative numbers and a target integer k, write a function to check 
if the array has a continuous subarray of size at least 2 that sums up to a multiple of k, 
that is, sums up to n*k where n is also an integer.

Example 1:
Input: [23, 2, 4, 6, 7],  k=6
Output: True
Explanation: Because [2, 4] is a continuous subarray of size 2 and sums up to 6.

Example 2:
Input: [23, 2, 6, 4, 7],  k=6
Output: True
Explanation: Because [23, 2, 6, 4, 7] is an continuous subarray of size 5 and sums up to 42.

Constraint: 
    - The length of the array won't exceed 10,000.
    - You may assume the sum of all the numbers is in the range of a signed 32-bit integer.
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {boolean}
 */
/* 
Approach I: Using Recursion and backtracking
Time: 
Space: 
*/
var checkSubarraySum = function(nums, k) {
    const N = nums.length;
    //how do we check continuos sub-array
    const dfs = (sum, start, subarrayCount) =>{
        console.log(`start, ${start}, sum: ${sum}`);
        if (subarrayCount > 1 && sum % k == 0) return true;
        //we can terminate early if can check this and prev element sum
        if (N > 1 && nums[start] + nums[start-1] % k == 0) return true;
        //reach end, but didn't find multiple of k 
        if (start == N) return false;
        return dfs(sum + nums[start], start + 1, subarrayCount + 1);
    }

    for (let i = 0; i < N; i++){
        if (dfs(nums[i], i + 1, 1)){
            return true;
        }
    }
    return false;
};

/*
Approach:  Dynamic Progragramming 
Using 2-D matrix
Fails for large input data 
(FATAL ERROR: Scavenger: semi-space copy Allocation failed - JavaScript heap out of memory)
*/
var checkSubarraySum = function(nums, k) {
    const N = nums.length;
    const dp = [...Array(N)].map(x => new Array(N));
    for(let i = 0; i < N; i++){
        dp[i][i] = nums[i];
    }
    for (let l = 2; l <= N; l++){
        for (let i = 0; i <= N - l; i++){
            let j = i + l - 1; // zero based
            dp[i][j] = dp[i][j-1] + nums[j];
            if (dp[i][j] == k || (k != 0 && dp[i][j] % k == 0)) return true;
        }
    }
    return false;
}

/*
Approach:  Brute Force
Time Complexity: O(N^3)
Space Complexity: O(1)

Runtime: 3416 ms, faster than 5.08% of JavaScript online submissions for Continuous Subarray Sum.
Memory Usage: 40.7 MB, less than 89.27% of JavaScript online submissions for Continuous Subarray Sum.
*/
var checkSubarraySum = function(nums, k) {
    const N = nums.length;
    for (let l = 2; l <= N; l++){
        for (let i = 0; i <= N-l; i++){
            let sum = 0;
            for (j = i; j < i + l; j++){
                sum += nums[j];
            }
            if (sum == k || (k != 0 && sum %k == 0)) {
                return true;
            }
        }
    }
    return false;
}
/*
Approach:  Brute Force 
Changed the way to scan the elememt (start the sum for first two, then first three
till end then again start from 2nd to 3rd and increase the range) 
Time Complexity: O(N^3)
Space Complexity: O(1)
*/
var checkSubarraySum = function(nums, k) {
    const N = nums.length;
    for(let start = 0; start < N - 1; start++){
        for (let end = start + 1; end < N; end ++){
            console.log(`start: ${start}, end: ${end}`);
            let sum = 0;
            for (let i = start; i <= end; i++){
                console.log(`i: ${i}`);
                sum += nums[i];
            }
            if (sum == k || (k != 0 && sum %k == 0)) return true;
        }
    }
    return false;
}

/*
Approach: Better Brute Force 
Time Complexity: O(N^2)
Space Complexity: O(N)

Runtime: 164 ms, faster than 9.89% of JavaScript online submissions for Continuous Subarray Sum.
Memory Usage: 41.4 MB, less than 63.56% of JavaScript online submissions for Continuous Subarray Sum.
*/
var checkSubarraySum = function(nums, k) {
    const N = nums.length;
    let sums = new Array(N);
    //note: we are ignoring the first element value because if we add it, its sum will get added to 
    //each element, and when do sums[end] - sums[start], it will have zero effect. So we can start with 0 at index 0
    sums[0] = 0;
    for (let i = 1; i < N; i++){
        sums[i] = sums[i-1] + nums[i];
    }
    for(let start = 0; start < N - 1; start++){
        for (let end = start + 1; end < N; end ++){
            let sum = sums[end] - sums[start] + nums[start];
            if (sum == k || (k != 0 && sum % k == 0)) return true;
        }
    }
    return false;
}

/*
Approach: Using HashMap
Time Complexity: O(N)
Space Complexity: O(N)

Runtime: 108 ms, faster than 41.53% of JavaScript online submissions for Continuous Subarray Sum.
Memory Usage: 41.7 MB, less than 44.63% of JavaScript online submissions for Continuous Subarray Sum.

*/
var checkSubarraySum = function(nums, k) {
    const N = nums.length;
    let sum = 0;
    const map = new Map();
    //base case handling
    map.set(0, -1);
    for (let i = 0; i < N; i++){
        sum += nums[i];
        if (k != 0){
            sum = sum % k;
        }
        console.log(`i: ${i}, nums[${i}]: ${nums[i]}, sum: ${sum}`);
        if (map.has(sum)){
            console.log(`sum ${sum} found in map at ${map.get(sum)}`);
            //entry exist for this sum, check if its not same index
            if (i - map.get(sum) > 1) return true;
        } else {
            map.set(sum, i);
        }
    }
    return false;
}
