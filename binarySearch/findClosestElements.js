/* 
https://leetcode.com/problems/find-k-closest-elements/
Type: Medium

Given a sorted integer array arr, two integers k and x, return the k closest integers
to x in the array. The result should also be sorted in ascending order.

An integer a is closer to x than an integer b if:

|a - x| < |b - x|, or
|a - x| == |b - x| and a < b

Example 1:
  Input: arr = [1,2,3,4,5], k = 4, x = 3
  Output: [1,2,3,4]

Example 2:
  Input: arr = [1,2,3,4,5], k = 4, x = -1
  Output: [1,2,3,4]

Constraints:
 - 1 <= k <= arr.length
 - 1 <= arr.length <= 10^4
 - arr is sorted in ascending order.
 - -10^4 <= arr[i], x <= 10^4
*/
/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */

/* 
Approach I: Sorting with custom comparator
Time: O(N LogN) + O(K LogK), first sorting N elements and then sorting k elements
Space: O(N)
Runtime: 176 ms, faster than 14.37% of JavaScript online submissions for Find K Closest Elements.
Memory Usage: 49.1 MB, less than 40.11% of JavaScript online submissions for Find K Closest Elements.
*/
var findClosestElements = function (arr, k, x) {
  //custom sort by distant from x
  arr.sort((a, b) => Math.abs(x - a) - Math.abs(x - b));
  //consider only k elements
  const result = arr.slice(0, k);
  //return the sorted array, of this result
  return result.sort((a, b) => a - b);
};

/* 
Approach II: Binary Search + Sliding window
Time: O(LogN + K), Binary search + sliding window loop
Space: O(1)
Runtime: 182 ms, faster than 12.48% of JavaScript online submissions for Find K Closest Elements.
Memory Usage: 48.1 MB, less than 60.89% of JavaScript online submissions for Find K Closest Elements.
*/
var findClosestElements = function (arr, k, x) {
  let left = 0;
  let right = arr.length - 1;
  //base case
  if (arr.length === k) return arr.slice(0, k);
  //do binary search
  while (left < right) {
    const mid = Math.floor((right + left) / 2);
    if (arr[mid] >= x) right = mid;
    else left = mid + 1;
  }
  console.log(`left: ${left}, right: ${right}`);
  //set up sliding window bound
  right = left + 1;
  left = left - 1;
  const result = [];
  while (right - left - 1 < k) {
    //handle case when left == -1
    if (left === -1) {
      right++;
      continue;
    }
    if (
      right === arr.length ||
      Math.abs(arr[left] - x) <= Math.abs(arr[right] - x)
    )
      left--;
    else right++;
  }
  //build the result
  return arr.slice(left + 1, right);
};

/* 
Approach II: Binary Search to find left bound
Let's consider two indices at each binary search operation, the usual mid, and some index
mid + k. The relationship between these indices is significant because only one of them
could possibly be in a final answer. For example, if mid = 2, and k = 3, then arr[2] and
arr[5] could not possibly both be in the answer, since that would require taking 4 elements
[arr[2], arr[3], arr[4], arr[5]].

This leads us to the question: how do we move our pointers left and right? If the element
at arr[mid] is closer to x than arr[mid + k], then that means arr[mid + k], as well as
every element to the right of it can never be in the answer. This means we should move our
right pointer to avoid considering them. The logic is the same vice-versa - if arr[mid + k]
is closer to x, then move the left pointer.

Time: O(Log(N-k) + K), Binary search + substring
Space: O(1)
Runtime: 90 ms, faster than 24.36% of JavaScript online submissions for Find K Closest Elements.
Memory Usage: 55.10 MB, less than 84.51% of JavaScript online submissions for Find K Closest Elements.
*/
var findClosestElements = function (arr, k, x) {
  //binary search bounds
  let left = 0;
  // If there needs to be k elements, then the left bound's upper limit is arr.length - k,
  // because if it were any further to the right, you would run out of elements to include
  // in the final answer.
  let right = arr.length - k;
  while (left < right) {
    const mid = Math.floor((right + left) / 2);
    //if distance of x-A[mid] is less or equal to A[mid+k]-x, we contract right window 
    //as element will not be closet to x on right side
    if (x - arr[mid] <= arr[mid + k] - x) {
      right = mid;
    } else {
      // If x - arr[mid] is greater than arr[mid + k] - x, it means arr[mid] is farther
      // from x than arr[mid + k]. So, move the left pointer to mid + 1.
      left = mid + 1;
    }
  }
  //build the result
  return arr.slice(left, left + k);
};

/* 
Approach II: Priority Queue

*/
var findClosestElements = function (arr, k, x) {
  const minPQ = new MinPriorityQueue({
    compare: (a, b) => {
      return a - b.count;
    },
  });
}