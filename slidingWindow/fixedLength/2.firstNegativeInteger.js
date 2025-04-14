/* 
First negative in every window of size k
https://www.geeksforgeeks.org/problems/first-negative-integer-in-every-window-of-size-k3345/1
Type - Medium

Given an array A[] of size N and a positive integer K, find the first negative integer for each and every window(contiguous subarray) of size K.

Note: If a window does not contain a negative integer, then return 0 for that window.

Example 1:
Input: arr[] = [-8, 2, 3, -6, 10] , k = 2
Output: [-8, 0, -6, -6]
Explanation:
Window [-8, 2] First negative integer is -8.
Window [2, 3] No negative integers, output is 0.
Window [3, -6] First negative integer is -6.
Window [-6, 10] First negative integer is -6.
 
Example 2:
Input: arr[] = [12, -1, -7, 8, -15, 30, 16, 28] , k = 3
Output: [-1, -1, -7, -15, -15, 0] 
Explanation:
Window [12, -1, -7] First negative integer is -1.
Window [-1, -7, 8] First negative integer is -1.
Window [-7, 8, -15] First negative integer is -7.
Window [8, -15, 30] First negative integer is -15.
Window [-15, 30, 16] First negative integer is -15.
Window [30, 16, 28] No negative integers, output is 0. 

Example 3:
Input: arr[] = [12, 1, 3, 5] , k = 3
Output: [0, 0] 
Explanation:
Window [12, 1, 3] No negative integers, output is 0.
Window [1, 3, 5] No negative integers, output is 0.

Expected Time Complexity: O(N)
Expected Auxiliary Space: O(K)

Constraints:
 - 1 <= arr.size() <= 10^6
 - -10^5 <= arr[i] <= 10^5
 - 1 <= k <= arr.size()
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
  firstNegInt(arr, k) {
    const N = arr.length;
    let i = 0;
    let j = 0;
    const result = [];
    const Q = [];
    while (j < N) {
      if (arr[j] < 0) Q.push(arr[j]);
      if (j - i + 1 < k) j++;
      else {
        //if no item in queue then push 0
        if (Q.length === 0) result.push(0);
        else {
          //add the fisr negative number from queue to the output
          result.push(Q[0]);
          //if the queue front element is same as left element then remove it
          if (arr[i] == Q[0]) Q.shift();
        }
        i++;
        j++;
      }
    }
    return result;
  }
}
