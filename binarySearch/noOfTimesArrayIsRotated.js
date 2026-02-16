/* 
Find Kth Rotation
https://www.geeksforgeeks.org/problems/rotation4723/1
Type: Medium

Given an increasing sorted rotated array arr of distinct integers. The array is right-rotated k times. Find the value of k.
Let's suppose we have an array arr = [2, 4, 6, 9], so if we rotate it by 2 times so that it will look like this:
After 1st Rotation : [9, 2, 4, 6]
After 2nd Rotation : [6, 9, 2, 4]

Examples:

Input: arr = [5, 1, 2, 3, 4]
Output: 1
Explanation: The given array is 5 1 2 3 4. The original sorted array is 1 2 3 4 5. We can see that the array was rotated 1 times to the right.
Input: arr = [1, 2, 3, 4, 5]
Output: 0
Explanation: The given array is not rotated.
Expected Time Complexity: O(log(n))
Expected Auxiliary Space: O(1)

Constraints:
1 <= n <=105
1 <= arri <= 107

*/

/* 
Approach: This is extension of finding the min in rotated array. 
The index of min element is number of times array is rotated.

Time Taken: 0.22
*/
class Solution {
  findKRotation(arr) {
    const N = arr.length;
    let lo = 0;
    let hi = N - 1;
    if (N == 1) return lo;
    let ans = { min: Infinity, index: -1 };
    while (lo <= hi) {
      //array is sorted between lo and hi then lo will be smallest
      if (arr[lo] <= arr[hi]) {
        if (arr[lo] < ans.min) {
          ans.min = arr[lo];
          ans.index = lo;
        }
        break;
      }
      console.log(`should not come here`)
      const mid = lo + Math.floor((hi - lo) / 2);
      //check if array is sorted between lo and mid, if so record the lo as min
      //  and move to right half as min might be right side
      if (arr[lo] <= arr[mid]) {
        if (arr[lo] < ans.min) {
          ans.min = arr[lo];
          ans.index = lo;
        }
        lo = mid + 1;
      } else {
        //if array is not sorted between lo and mid then min will be between lo and mid
        if (arr[mid] < ans.min) {
          ans.min = arr[mid];
          ans.index = mid;
        }
        hi = mid - 1;
      }
    }
    return ans.index;
  }
}
