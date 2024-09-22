/* 
https://leetcode.com/problems/continuous-subarray-sum/description/
Type: Medium

Given an integer array nums and an integer k, return true if nums has a good subarray or false otherwise.

A good subarray is a subarray where:

 - its length is at least two, and
 - the sum of the elements of the subarray is a multiple of k.

Note that:
 - A subarray is a contiguous part of the array.
 - An integer x is a multiple of k if there exists an integer n such that x = n * k. 0 is always a multiple of k.

Example 1:
  Input: [23, 2, 4, 6, 7],  k=6
  Output: True
  Explanation: Because [2, 4] is a continuous subarray of size 2 and sums up to 6.

Example 2:
  Input: [23, 2, 6, 4, 7],  k=6
  Output: True
  Explanation: Because [23, 2, 6, 4, 7] is an continuous subarray of size 5 and sums up to 42.

Example 3:

Input: nums = [23,2,6,4,7], k = 13
Output: false

Constraint: 
 - 1 <= nums.length <= 10^5
 - 0 <= nums[i] <= 10^9
 - 0 <= sum(nums[i]) <= 2^31 - 1
 - 1 <= k <= 2^31 - 1

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
var checkSubarraySum = function (nums, k) {
  const N = nums.length;
  //how do we check continuos sub-array
  const dfs = (sum, start, subarrayCount) => {
    console.log(`start, ${start}, sum: ${sum}`);
    if (subarrayCount > 1 && sum % k == 0) return true;
    //we can terminate early if can check this and prev element sum
    if (N > 1 && nums[start] + (nums[start - 1] % k) == 0) return true;
    //reach end, but didn't find multiple of k
    if (start == N) return false;
    return dfs(sum + nums[start], start + 1, subarrayCount + 1);
  };

  for (let i = 0; i < N; i++) {
    if (dfs(nums[i], i + 1, 1)) {
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
var checkSubarraySum = function (nums, k) {
  const N = nums.length;
  const dp = [...Array(N)].map((x) => new Array(N));
  for (let i = 0; i < N; i++) {
    dp[i][i] = nums[i];
  }
  for (let l = 2; l <= N; l++) {
    for (let i = 0; i <= N - l; i++) {
      let j = i + l - 1; // zero based
      dp[i][j] = dp[i][j - 1] + nums[j];
      if (dp[i][j] == k || (k != 0 && dp[i][j] % k == 0)) return true;
    }
  }
  return false;
};

/*
Approach:  Brute Force
One brute force approach for this problem can be to find out the sum of all subarrays
of the array and check if there exists a subarray with a sum divisible by k. Since the
number of subarrays in an array of size n is n * (n - 1) / 2, the time complexity to
calculate all possible subarrays is O(n^2), and calculating the sum for each subarray 
takes O(n). Therefore, the total time complexity is O(n^3), which will give a Time Limit Exceeded judgment.

Time Complexity: O(N^3)
Space Complexity: O(1)

Runtime: 3416 ms, faster than 5.08% of JavaScript online submissions for Continuous Subarray Sum.
Memory Usage: 40.7 MB, less than 89.27% of JavaScript online submissions for Continuous Subarray Sum.
*/
var checkSubarraySum = function (nums, k) {
  const N = nums.length;
  for (let l = 2; l <= N; l++) {
    for (let i = 0; i <= N - l; i++) {
      let sum = 0;
      for (j = i; j < i + l; j++) {
        sum += nums[j];
      }
      if (sum == k || (k != 0 && sum % k == 0)) {
        return true;
      }
    }
  }
  return false;
};
/*
Approach:  Brute Force 
Changed the way to scan the element (start the sum for first two, then first three
till end then again start from 2nd to 3rd and increase the range) 
Time Complexity: O(N^3)
Space Complexity: O(1)
*/
var checkSubarraySum = function (nums, k) {
  const N = nums.length;
  for (let start = 0; start < N - 1; start++) {
    for (let end = start + 1; end < N; end++) {
      console.log(`start: ${start}, end: ${end}`);
      let sum = 0;
      for (let i = start; i <= end; i++) {
        console.log(`i: ${i}`);
        sum += nums[i];
      }
      if (sum == k || (k != 0 && sum % k == 0)) return true;
    }
  }
  return false;
};

/*
Approach: Better Brute Force 
Time Complexity: O(N^2)
Space Complexity: O(N)

Runtime: 164 ms, faster than 9.89% of JavaScript online submissions for Continuous Subarray Sum.
Memory Usage: 41.4 MB, less than 63.56% of JavaScript online submissions for Continuous Subarray Sum.
*/
var checkSubarraySum = function (nums, k) {
  const N = nums.length;
  let sums = new Array(N);
  //note: we are ignoring the first element value because if we add it, its sum will get added to
  //each element, and when do sums[end] - sums[start], it will have zero effect. So we can start with 0 at index 0
  sums[0] = 0;
  for (let i = 1; i < N; i++) {
    sums[i] = sums[i - 1] + nums[i];
  }
  for (let start = 0; start < N - 1; start++) {
    for (let end = start + 1; end < N; end++) {
      let sum = sums[end] - sums[start] + nums[start];
      if (sum == k || (k != 0 && sum % k == 0)) return true;
    }
  }
  return false;
};

/* 
Approach: Using HashMap
Time Complexity: O(N)
Space Complexity: O(N)

Intuition for the solution is as below:
c(i,j) = c(0,j) - c(0,i-1) (j > i) -> now let's take mod of both sides
c(i,j) % k = (c(0,j) - c(0,i-1)) % k -> we know that the result is a multiple of k hence its remainder is going to be 0
0 = c(0,j) % k - c(0,i-1) % k
c(0,i-1) % k = c(0, j) % k
Therefore, we just have to go through the array and save those c(0,i-1) % k. 
If we're standing on c(0,j) % k we have to find if there has already been such a
number. If yes, then the relation works and we have found 2 such numbers.
We're left to check that the interval length is >= 2.

Runtime: 103 ms, faster than 83.07% of JavaScript online submissions for Continuous Subarray Sum.
Memory Usage: 79.59 MB, less than 6.35% of JavaScript online submissions for Continuous Subarray Sum.
*/
var checkSubarraySum = function (nums, k) {
  const prefixModMap = new Map();
  //base case handling, to ensure we have minimum of length two when we do i-j
  prefixModMap.set(0, -1);
  let prefixModSum = 0;
  for (let i = 0; i < nums.length; i++) {
    prefixModSum += nums[i];
    prefixModSum = prefixModSum % k;
    if (prefixModMap.has(prefixModSum)) {
      //since we need min two size length, check if the found index and curr index has diff of 2
      if (i - prefixModMap.get(prefixModSum) > 1) return true;
    } else prefixModMap.set(prefixModSum, i);
  }
  return false;
};
