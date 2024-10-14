/* 
Max Sum Subarray of size K
https://www.geeksforgeeks.org/problems/max-sum-subarray-of-size-k5313/1
Type Easy

Given an array of integers Arr of size N and a number K. Return the maximum sum of a subarray of size K.

NOTE: A subarray is a contiguous part of any given array.

Example 1:
    Input:
    N = 4, K = 2
    Arr = [100, 200, 300, 400]
    Output:
    700
    Explanation:
    Arr3  + Arr4 =700,
    which is maximum.

Example 2:
    Input:
    N = 4, K = 4
    Arr = [100, 200, 300, 400]
    Output:
    1000
    Explanation:
    Arr1 + Arr2 + Arr3 + Arr4 =1000,
    which is maximum.

Your Task:
You don't need to read input or print anything. Your task is to complete the function maximumSumSubarray() which takes the integer K, vector Arr with size N, containing the elements of the array and returns the maximum sum of a subarray of size K.

Expected Time Complexity: O(N)
Expected Auxiliary Space: O(1)

Constraints:
 - 1 <= N <= 10^5
 - 1 <= Arri <= 10^5
 - 1 <= K <= N

*/
/**
 * @param {number} K
 * @param {number[]} Arr
 * @param {number} N - array size
 * @return {number}
 */

/*
Approach : Sliding Window 
Time: O(N)
Space: O(1)
*/
class Solution {
  maximumSumSubarray(K, Arr, N) {
    let i = 0;
    let j = 0;
    let maxSum = -Infinity;
    let localSum = 0;
    while (j < N) {
      localSum += Arr[j];
      // until window size is less than k, keep expanding window
      if (j - i + 1 < K) j++;
      //window size is == K      
      else {
        //store the maxSum
        maxSum = Math.max(maxSum, localSum);
        //remove the left index value from current window
        localSum -= Arr[i++];
        j++;
      }
    }
    return maxSum;
  }
}
