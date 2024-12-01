/* 
Subset Sum Problem
https://www.geeksforgeeks.org/subset-sum-problem-dp-25/
Type: Medium

Given an array of positive integers, arr[] and a value, target, determine if there is a subset of the given set with sum equal to given target. 

Example 1:
Input: arr[] = [3, 34, 4, 12, 5, 2], target = 9
Output: true 
Explanation: Here there exists a subset with target sum = 9, 4+3+2 = 9.

Example 2:
Input: arr[] = [3, 34, 4, 12, 5, 2] target = 30
Output: false
Explanation: There is no subset with target sum 30.

Example 3:
Input: arr[] = [1, 2, 3], sum = 6
Output: true
Explanation: The entire array can be taken as a subset, giving 1 + 2 + 3 = 6.

Constraints:
 - 1 <= arr.size() <= 200
 - 1<= arr[i] <= 200
 - 1<= sum <= 4*10^4


*/

/* 
Approach I: recursion
*/
class Solution {
  isSubsetSum(arr, target) {
    const N = arr.length;
    const helper = (i, remain) => {
      //Base case
      if (remain == 0) return true;
      if (i == N || remain < 0) return false;
      const include = helper(i + 1, remain - arr[i]);
      const exclude = helper(i + 1, remain);
      return include || exclude;
    };
    return helper(0, target);
  }
}

/* 
Approach II: Recursion with memoisation (Top Down)
*/
class Solution {
  isSubsetSum(arr, target) {
    const N = arr.length;
    const memo = [...Array(N + 1)].map((x) => new Array(target + 1).fill(-1));
    const helper = (i, remain) => {
      //Base case
      if (remain == 0) return true;
      if (i == N || remain < 0) return false;
      if (memo[i][remain] !== -1) return memo[i][remain];
      const include = helper(i + 1, remain - arr[i]);
      const exclude = helper(i + 1, remain);
      return (memo[i][remain] = include || exclude);
    };
    return helper(0, target);
  }
}

/* 
Approach III: Bottom Up DP
*/
class Solution {
  isSubsetSum(arr, target) {
    const N = arr.length;
    const dp = [...Array(N + 1)].map((x) => new Array(target + 1));
    //we can get sum=0 for any combination of set by considering the empty set
    //so fill first column as True
    for (let i = 0; i <= N; i++) {
      dp[i][0] = true;
    }
    for (let i = 1; i <= N; i++) {
      // consider all sum from 1 to sum
      for (let j = 1; j <= target; j++) {
        //if the current arr element can fit in target.
        //Note: we need to do i-1 as arr is zero based
        if (arr[i - 1] <= j) {
          // find the subset with sum `j` by excluding or including
          // the i'th item
          dp[i][j] = dp[i - 1][j - arr[i - 1]] || dp[i - 1][j];
        } else {
          dp[i][j] = dp[i - 1][j];
        }
      }
    }
    return dp[N][target];
  }
}

/* 
Approach IV: DP using 1D array
*/
class Solution {
  isSubsetSum(arr, target) {
    const N = arr.length;
    // Use a 1D array for space optimization
    const dp = new Array(target + 1).fill(false);
    // Base case: Subset sum of 0 is always possible (empty set)
    dp[0] = true;
    // Fill the DP table
    for (let i = 0; i < N; i++) {
      for (let j = target; j >= arr[i]; j--) {
        dp[j] = dp[j] || dp[j - arr[i]];
      }
    }
    return dp[target];
  }
}


/* 
Approach II: Top-Down
subsetSum([7, 3, 2, 5, 8], 18)
*/
function countOfSubsetSum(arr, k) {
  const n = arr.length;
  const memo = [...Array(n)].map((x) => Array(k + 1).fill(null));
  const helper = (i, remaining) => {
    //sum became 0, return true
    if (remaining == 0) return true;
    if (i < 0 || remaining < 0) return false;
    if (memo[i][remaining] !== null) return memo[i][remaining];
    // Case 1. Include the current item `arr[n]` in the subset and recur
    // for the remaining items `n-1` with the remaining total `k-arr[n]`
    const include = helper(i - 1, remaining - arr[i]);
    // Case 2. Exclude the current item `arr[n]` from the subset and recur for
    // the remaining items `n-1`
    const exclude = helper(i - 1, remaining);
    memo[i][remaining] = include || exclude;
    return memo[i][remaining];
  };
  return helper(n - 1, k);
}

/* 
Approach II: Bottom up
subsetSum([7, 3, 2, 5, 8], 18)
*/
function countOfSubsetSum(arr, k) {
  const n = arr.length;
  const dp = [...Array(n + 1)].map((x) => Array(k + 1).fill(false));
  //we can get sum=0 for any combination of set by considering the empty set
  //so fill first column as True
  for (let i = 0; i <= n; i++) {
    dp[i][0] = true;
  }
  //base case
  for (let i = 1; i <= n; i++) {
    // consider all sum from 1 to sum
    for (let j = 1; j <= k; j++) {
      //if the current arr element can fit in k.
      //Note: we need to do i-1 as arr is zero based
      if (arr[i - 1] <= j) {
        // find the subset with sum `j` by excluding or including
        // the i'th item
        dp[i][j] = dp[i - 1][j - arr[i - 1]] || dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  //   console.log(dp);
  return dp[n][k];
}
