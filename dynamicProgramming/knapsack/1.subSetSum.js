/* 
Given a set of positive integers and an integer k, check if there is any non-empty
subset that sums to k.

Input:
 
A = { 7, 3, 2, 5, 8 }
k = 14
 
Output: Subset with the given sum exists
Subset { 7, 2, 5 } sums to 14

*/

/* 
Approach I: Recursion
subsetSum([7, 3, 2, 5, 8], 18)
*/
function countOfSubsetSum(arr, k) {
  const n = arr.length;
  const helper = (i, remaining) => {
    //sum became 0, return true
    if (remaining == 0) return true;
    if (i < 0 || remaining < 0) return false;
    // Case 1. Include the current item `arr[n]` in the subset and recur
    // for the remaining items `n-1` with the remaining total `k-arr[n]`
    const include = helper(i - 1, remaining - arr[i]);
    // Case 2. Exclude the current item `arr[n]` from the subset and recur for
    // the remaining items `n-1`
    const exclude = helper(i - 1, remaining);
    return include || exclude;
  };
  return helper(n - 1, k);
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
