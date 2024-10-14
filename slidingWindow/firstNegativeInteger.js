/* 
First negative in every window of size k
https://www.geeksforgeeks.org/problems/first-negative-integer-in-every-window-of-size-k3345
Type - Medium

Given an array A[] of size N and a positive integer K, find the first negative integer for each and every window(contiguous subarray) of size K.

Example 1:
    Input : 
    N = 5
    A[] = {-8, 2, 3, -6, 10}
    K = 2
    Output : 
    -8 0 -6 -6
    Explanation :
    First negative integer for each window of size k
    {-8, 2} = -8
    {2, 3} = 0 (does not contain a negative integer)
    {3, -6} = -6
    {-6, 10} = -6
 
Example 2:
    Input : 
    N = 8
    A[] = {12, -1, -7, 8, -15, 30, 16, 28}
    K = 3
    Output :
    -1 -1 -7 -15 -15 0 
 

Your Task:  
You don't need to read input or print anything. Your task is to complete the function printFirstNegativeInteger() which takes the array A[], its size N and an integer K as inputs and returns the first negative number in every window of size K starting from the first till the end. If a window does not contain a negative integer , then return 0 for that window.

Expected Time Complexity: O(N)
Expected Auxiliary Space: O(K)

Constraints:
 - 1 <= N <= 105
 - -10^5 <= A[i] <= 10^5
 - 1 <= K <= N
*/

/* 
Brute Force
This will exceed time limit
*/
class Solution {
  /**
    * @param number n
    * @param number k
    * @param number[] arr
    
    * @returns number[]
    */
  printFirstNegativeInteger(n, k, arr) {
    const result = [];
    for (let i = 0; i <= n - k; i++) {
      let firstNegative = 0;
      for (let j = i; j < i + k; j++) {
        if (arr[j] < 0) {
          firstNegative = arr[j];
          break;
        }
      }
      result.push(firstNegative);
    }
    return result;
  }
}

/* 
Approach -  Sliding Window
Time: O(N)
Space: O(K)

Time Taken: 0.91
*/
class Solution {
  printFirstNegativeInteger(n, k, arr) {
    const result = [];
    let i = 0;
    let j = 0;
    const queue = [];
    while (j < n) {
      if (arr[j] < 0) queue.push(arr[j]);
      //window size is less than k, then expand the window
      if (j - i + 1 < k) j++;
      //window size == k
      else {
        //queue is empty that means there is no negative number
        if (queue.length == 0) result.push(0);
        else {
          //add the fisr negative number from queue to the output
          result.push(queue[0]);
          //if the queue front element is same as left element then remove it
          if (arr[i] == queue[0]) queue.shift();
        }
        i++;
        j++;
      }
    }
    return result;
  }
}
