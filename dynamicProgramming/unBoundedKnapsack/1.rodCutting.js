/* 
Rod Cutting
https://www.geeksforgeeks.org/problems/rod-cutting0840/1
Type: Medium

Given a rod of length arr.length inches and an array of prices, price. price[i] denotes the value of a piece of length i. Determine the maximum value obtainable by cutting up the rod and selling the pieces.

Example 1:
  Input: price[] = [1, 5, 8, 9, 10, 17, 17, 20]
  Output: 22
  Explanation: The maximum obtainable value is 22 by cutting in two pieces of lengths 2 and 6, i.e., 5+17=22.

Example 2:
  Input: price[] = [3, 5, 8, 9, 10, 17, 17, 20]
  Output: 24
  Explanation: The maximum obtainable value is 24 by cutting the rod into 8 pieces of length 1, i.e, 8*price[1]= 8*3 = 24.

Example 3:
  Input: price[] = [1, 10, 3, 1, 3, 1, 5, 9]
  Output: 40

Constraints:
 - 1 ≤ price.size() ≤ 10^3
 - 1 ≤ price[i] ≤ 10^6
*/
/**
 * @param {number[]} price
 * @returns {number}
 */
//Recursive
class Solution {
  // Function to find the maximum possible value of the function.
  cutRod(price) {
    const N = price.length;
    const helper = (i, length) => {
      //base case
      //we reached end of the input array
      if (length == N || i == N) return 0;
      //do not cut the rod with current length
      const notCut = helper(i + 1, length);
      //cut the rod with current length
      let cut = 0;
      //if we cut then new length will be current length + current index
      //(length is represented as index) + 1 (as index is zero based)
      if (length + i + 1 <= N) {
        cut = price[i] + helper(i, length + i + 1);
      }
      return Math.max(cut, notCut);
    };
    return helper(0, 0);
  }
}

//Memoization
/* 
Approach: Recursion with Memoization
Time taken: 0.66
*/
class Solution {
  // Function to find the maximum possible value of the function.
  cutRod(price) {
    const N = price.length;
    const memo = Array.from({ length: N }, () => Array(N + 1));
    const helper = (i, length) => {
      //base case
      //we reached end of the input array
      if (length == N || i == N) return 0;
      if (memo[i][length] != null) return memo[i][length];
      //do not cut the rod with current length
      const notCut = helper(i + 1, length);
      //cut the rod with current length
      let cut = 0;
      //if we cut then new length will be current length + current index
      //(length is represented as index) + 1 (as index is zero based)
      if (length + i + 1 <= N) {
        cut = price[i] + helper(i, length + i + 1);
      }
      return (memo[i][length] = Math.max(cut, notCut));
    };
    return helper(0, 0);
  }
}
/* 
Recursion top down
Time Taken: 0.32
*/
class Solution {
  // Function to find the maximum possible value of the function.
  cutRod(price) {
    const N = price.length;
    const memo = Array.from({ length: N }, () => Array(N + 1));
    const helper = (i, length) => {
      //base case
      // if i==0, it mean all remaining rod pieces are of length 1, we can sell them
      // with price associated with length 1, i.e, price[0]
      if (i == 0) return length * price[0];
      //we can not cut rod anymore
      if (length == 0) return 0;
      if (memo[i][length] != null) return memo[i][length];
      //do not cut the rod with current length
      const notCut = helper(i - 1, length);
      //cut the rod with current length
      let cut = 0;
      let rodLengthToCut = i + 1;
      //check if we can cut the new peice or not
      if (rodLengthToCut <= length) {
        cut = price[i] + helper(i, length - rodLengthToCut);
      }
      return (memo[i][length] = Math.max(cut, notCut));
    };
    return helper(N - 1, N);
  }
}

/*
Approach III: Bottom up DP
Time Taken: 0.22
*/
class Solution {
  // Function to find the maximum possible value of the function.
  cutRod(price) {
    const N = price.length;
    let length = new Array(N);
    //create length array (similar to knapsack weight array)
    for (let i = 0; i < N; i++) length[i] = i + 1;
    // console.log(`length`, length);
    const dp = Array.from({ length: N + 1 }, () => Array(N + 1).fill(0));

    for (let i = 1; i <= N; i++) {
      for (let j = 1; j <= N; j++) {
        if (length[i - 1] <= j) {
          dp[i][j] = Math.max(
            price[i - 1] + dp[i][j - length[i - 1]],
            dp[i - 1][j]
          );
        } else {
          dp[i][j] = dp[i - 1][j];
        }
      }
    }
    // console.log(`dp`, dp)
    return dp[N][N];
  }
}
