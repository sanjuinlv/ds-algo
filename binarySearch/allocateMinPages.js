/* 
Allocate Minimum Pages
https://www.geeksforgeeks.org/problems/allocate-minimum-number-of-pages0937/1
Type: Medium

You are given an array arr[] of integers, where each element arr[i] represents the number of pages in the ith book. You also have an integer k representing the number of students. The task is to allocate books to each student such that:

 - Each student receives atleast one book.
 - Each student is assigned a contiguous sequence of books.
 - No book is assigned to more than one student.

The objective is to minimize the maximum number of pages assigned to any student. In other words, out of all possible allocations, find the arrangement where the student who receives the most pages still has the smallest possible maximum.

Note: Return -1 if a valid assignment is not possible, and allotment should be in contiguous order (see the explanation for better understanding).

Examples:

Input: arr[] = [12, 34, 67, 90], k = 2
Output: 113
Explanation: Allocation can be done in following ways:
[12] and [34, 67, 90] Maximum Pages = 191
[12, 34] and [67, 90] Maximum Pages = 157
[12, 34, 67] and [90] Maximum Pages = 113.
Therefore, the minimum of these cases is 113, which is selected as the output.
Input: arr[] = [15, 17, 20], k = 5
Output: -1
Explanation: Allocation can not be done.
Input: arr[] = [22, 23, 67], k = 1
Output: 112
Constraints:
 - 1 <=  arr.size() <= 10^6
 - 1 <= arr[i] <= 10^3
 - 1 <= k <= 10^3 
*/
/**
 * @param {number[]} arr
 * @param {number} k
 * @returns {number}
 */

/* 
Brute force
*/

class Solution {
  // Function to find minimum number of pages.
  findPages(arr, k) {
    const N = arr.length;
    if (N < k) return -1;
    // Minimum and maximum possible page limits
    const minPageLimit = Math.max(...arr);
    const maxPageLimit = arr.reduce((acc, currVal) => acc + currVal, 0);
    // Iterating over all possible page limits
    for (let i = minPageLimit; i <= maxPageLimit; i++) {
      // Return the first page limit with we can
      // allocate books to all k students
      if (this.isValid(arr, k, i)) return i;
    }
    return -1;
  }

  isValid(arr, k, pageLimit) {
    // Starting from the first student
    let students = 1;
    let pageSum = 0;
    for (let i = 0; i < arr.length; i++) {
      pageSum += arr[i];
      // If adding the current book exceeds the page
      // limit, assign the book to the next student
      if (pageSum > pageLimit) {
        students++;
        pageSum = arr[i];
      }
      //if books have to be assigned more than k students then return false
      if (students > k) return false;
    }
    return true;
  }
}

/*
Approach II: Binary Search
Time: O(N * LogN)
Space: O(1)

Time taken: 0.63 
*/
class Solution {
  // Function to find minimum number of pages.
  findPages(arr, k) {
    const N = arr.length;
    //if array size is less than k then we can not distribute books to students
    if (N < k) return -1;
    // your code here
    //find sum and max of the element
    let minPageLimit = -Infinity;
    let maxPageLimit = 0;
    for (let i = 0; i < N; i++) {
      maxPageLimit += arr[i];
      minPageLimit = Math.max(minPageLimit, arr[i]);
    }
    //perform binary search
    let left = minPageLimit;
    let right = maxPageLimit;
    let result = -1;
    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2);
      //check if this number of pages is suitable to assign students
      if (this.isValid(arr, mid, N, k)) {
        result = mid;
        //try now smaller number of pages
        right = mid - 1;
      } else {
        //curr no of pages is too small so move towards to increase the number of pages
        left = mid + 1;
      }
    }
    return result;
  }

  isValid(arr, pageLimit, n, k) {
    let students = 1;
    let sum = 0;
    for (let i = 0; i < n; i++) {
      sum += arr[i];
      //check if sum exceeded k
      if (sum > pageLimit) {
        students++;
        //reset the sum to current element
        sum = arr[i];
      }
      //if student counts exceed the given count k
      if (students > k) return false;
    }
    return true;
  }
}
