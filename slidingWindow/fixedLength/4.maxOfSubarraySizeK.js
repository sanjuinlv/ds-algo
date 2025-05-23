/*
Maximum of all subarrays of size k 
https://www.geeksforgeeks.org/problems/maximum-of-all-subarrays-of-size-k3101/1
Type - Medium

Given an array arr[] and an integer k. Find the maximum for each and every contiguous subarray of size k.

Example 1:
  Input: k = 3, arr[] = [1, 2, 3, 1, 4, 5, 2, 3, 6]
  Output: [3, 3, 4, 5, 5, 5, 6] 
  Explanation: 
  1st contiguous subarray = [1 2 3] max = 3
  2nd contiguous subarray = [2 3 1] max = 3
  3rd contiguous subarray = [3 1 4] max = 4
  4th contiguous subarray = [1 4 5] max = 5
  5th contiguous subarray = [4 5 2] max = 5
  6th contiguous subarray = [5 2 3] max = 5
  7th contiguous subarray = [2 3 6] max = 6

Example 2:    
  Input: k = 4, arr[] = [8, 5, 10, 7, 9, 4, 15, 12, 90, 13]
  Output: [10, 10, 10, 15, 15, 90, 90]
  Explanation: 
  1st contiguous subarray = [8 5 10 7], max = 10
  2nd contiguous subarray = [5 10 7 9], max = 10
  3rd contiguous subarray = [10 7 9 4], max = 10
  4th contiguous subarray = [7 9 4 15], max = 15
  5th contiguous subarray = [9 4 15 12], max = 15
  6th contiguous subarray = [4 15 12 90], max = 90
  7th contiguous subarray = {15 12 90 13}, max = 90
  Expected Time Complexity: O(n)
  Expected Auxiliary Space: O(k)

Constraints:
 - 1 ≤ sizeof(arr) ≤ 106
 - 1 ≤ k ≤ sizeof(arr)
 - 0 ≤ arr[i] ≤ 109
*/

/*
Approach : Sliding Window
Time: O(N)
Space: O(K) - sliding window size
*/
class Solution {
  max_of_subarrays(k, arr) {
    const N = arr.length;
    let i = 0;
    let j = 0;
    let queue = [];
    let result = [];
    const top = (A) => A[A.length - 1];
    while (j < N) {
      //until top is smaller than current element remove it
      while (queue.length && top(queue) < arr[j]) queue.pop();
      queue.push(arr[j]);
      //window size is stll < B
      if (j - i + 1 < k) j++;
      else {
        //push the max
        result.push(queue[0]);
        //move the left pointer and remove the left item from stack if they are same
        if (queue[0] == arr[i]) queue.shift();
        i++;
        j++;
      }
    }
    return result.join(" ");
  }
}
