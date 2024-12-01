/* 
https://www.geeksforgeeks.org/count-of-subsets-with-sum-equal-to-x/

Given a set of positive integers and an integer k, check if there is any non-empty
subset that sums to k.

Input: arr[] = {1, 2, 3, 3}, X = 6 
Output: 3 
All the possible subsets are {1, 2, 3}, 
{1, 2, 3} and {3, 3}


Input: arr[] = {1, 1, 1, 1}, X = 1 
Output: 4 

*/

/* 
Approach I: Recursion
countOfSubsetSum([2, 3, 5, 6, 8, 10], 10)
*/
function countOfSubsetSum(arr, k) {
  const n = arr.length;
  let totalCount = 0;
  const helper = (i, remaining) => {
    //sum became 0, return true
    if (remaining == 0) {
      totalCount++;
      return;
    }
    if (i < 0 || remaining < 0) return;
    // Case 1. Include the current item `arr[n]` in the subset and recur
    // for the remaining items `n-1` with the remaining total `k-arr[n]`
    helper(i - 1, remaining - arr[i]);
    // Case 2. Exclude the current item `arr[n]` from the subset and recur for
    // the remaining items `n-1`
    helper(i - 1, remaining);
  };
  helper(n - 1, k);
  return totalCount;
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
    if (remaining == 0) return 1;
    if (i < 0 || remaining < 0) return 0;
    if (memo[i][remaining] !== null) return memo[i][remaining];
    // Case 1. Include the current item `arr[n]` in the subset and recur
    // for the remaining items `n-1` with the remaining total `k-arr[n]`
    const include = helper(i - 1, remaining - arr[i]);
    // Case 2. Exclude the current item `arr[n]` from the subset and recur for
    // the remaining items `n-1`
    const exclude = helper(i - 1, remaining);
    memo[i][remaining] = include + exclude;
    return memo[i][remaining];
  };
  return helper(n - 1, k);
}

/* 
Approach II: Bottom up
countOfSubsetSum([2, 3, 5, 6, 8, 10], 10)
*/
function countOfSubsetSum(arr, k) {
  const n = arr.length;
  const dp = [...Array(n + 1)].map((x) => Array(k + 1).fill(0));
  //we can get sum=0 for any combination of set by considering the empty set
  //so fill first column as 1
  for (let i = 0; i <= n; i++) dp[i][0] = 1;
  //base case
  for (let i = 1; i <= n; i++) {
    // consider all sum from 1 to sum
    for (let j = 1; j <= k; j++) {
      //if the current arr element can fit in k.
      //Note: we need to do i-1 as arr is zero based
      if (arr[i - 1] <= j) {
        // find the subset with sum `j` by excluding or including
        // the i'th item
        dp[i][j] = dp[i - 1][j - arr[i - 1]] + dp[i - 1][j];
      } else {
        dp[i][j] = dp[i - 1][j];
      }
    }
  }
  //   console.log(dp);
  return dp[n][k];
}
