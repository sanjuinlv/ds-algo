/*
Matrix Chain Multiplication
https://www.geeksforgeeks.org/problems/matrix-chain-multiplication0303/1
Type: Hard

Given a sequence of matrices, find the most efficient way to multiply these matrices together. The efficient way is the one that involves the least number of multiplications. The dimensions of the matrices are given in an array arr[] of size n (such that n = number of matrices + 1) where the ith matrix has the dimensions (arr[i-1] x arr[i]).

Example 1:
  Input: arr[] = [2, 1, 3, 4]
  Output: 20
  Explanation: There are 3 matrices of dimensions 2×1, 1×3, and 3×4, Let the input 3 matrices be M1, M2, and M3. There are two ways to multiply ((M1 x M2) x M3) and (M1 x (M2 x M3)), Please note that the result of M1 x M2 is a 2 x 3 matrix and result of (M2 x M3) is a 1 x 4 matrix.
  ((M1 x M2) x M3)  requires (2 x 1 x 3)  + (0) +  (2 x 3 x 4) = 30 
  (M1 x (M2 x M3))  requires (0)  + (1 x 3 x 4) +  (2 x 1 x 4) = 20 
  The minimum of these two is 20.

Example 2:
  Input: arr[] = [1, 2, 3, 4, 3]
  Output: 30
  Explanation: There are 4 matrices of dimensions 1×2, 2×3, 3×4, 4×3. Let the input 4 matrices be M1, M2, M3 and M4. The minimum number of multiplications are obtained by ((M1M2)M3)M4. The minimum number is 1*2*3 + 1*3*4 + 1*4*3 = 30.

Example 3:  
  Input: arr[] = [3, 4]
  Output: 0
  Explanation: As there is only one matrix so, there is no cost of multiplication.

Constraints: 
 - 2 ≤ arr.size() ≤ 100
 - 1 ≤ arr[i] ≤ 500
*/
/* 
Approach I: Recursion
*/
class Solution {
  matrixMultiplication(arr) {
    const solve = (i, j) => {
      //base case
      //if either i crosses j or there is only one matrix
      if (i >= j) return 0;
      let minProd = Infinity;
      for (let k = i; k <= j - 1; k++) {
        const currCost =
          solve(i, k) + solve(k + 1, j) + arr[i - 1] * arr[k] * arr[j];
        minProd = Math.min(minProd, currCost);
      }
      return minProd;
    };
    return solve(1, arr.length - 1);
  }
}

/* 
Approach II: Recursion with memoization
Time: O(N^2)
Space: O(N^2)

Space: 
Time Taken: .09
*/
class Solution {
  matrixMultiplication(arr) {
    const N = arr.length;
    const memo = Array.from({ length: N }, () => Array(N));
    const solve = (i, j) => {
      //base case
      //if either i crosses j or there is only one matrix
      if (i >= j) return 0;
      if (memo[i][j] != null) return memo[i][j];
      let minProd = Infinity;
      for (let k = i; k < j; k++) {
        const currCost =
          solve(i, k) + solve(k + 1, j) + arr[i - 1] * arr[k] * arr[j];
        minProd = Math.min(minProd, currCost);
      }
      return (memo[i][j] = minProd);
    };
    return solve(1, N - 1);
  }
}

/* 
Approach: Bottom UP DP

Time Taken: .09
*/
class Solution {
  matrixMultiplication(arr) {
    const N = arr.length;
    const dp = Array.from({ length: N }, () => Array(N).fill(0));
    //for 1 size matrix the product will be zero
    //length of matrix
    for (let l = 2; l < N; l++) {
      //start of matrix
      for (let i = 1; i <= N - l; i++) {
        //zero based
        let j = i + l - 1;
        dp[i][j] = Infinity;
        for (let k = i; k <= j - 1; k++) {
          let currCost = dp[i][k] + dp[k + 1][j] + arr[i - 1] * arr[k] * arr[j];
          dp[i][j] = Math.min(dp[i][j], currCost);
        }
      }
    }
    return dp[1][N - 1];
  }
}
