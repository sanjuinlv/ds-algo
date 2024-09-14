/*
https://leetcode.com/problems/sort-an-array
Type: Medium 

Given an array of integers nums, sort the array in ascending order.

Example 1:
  Input: nums = [5,2,3,1]
  Output: [1,2,3,5]

Example 2:
  Input: nums = [5,1,1,2,0,0]
  Output: [0,0,1,1,2,5]

Constraints:
 - 1 <= nums.length <= 5 * 10^4
 - -5 * 104 <= nums[i] <= 5 * 10^4
 
*/
/**
 * @param {number[]} nums
 * @return {number[]}
 */
/*
Approach II: Merge Sort
Time: O(NLogN)
Space: O(N), for auxilary array

Runtime: 196 ms Beats 68.60%
Memory: 66.42 MB Beats 98.04%
*/
var sortArray = function (nums) {
  const aux = new Array(nums.length);
  const merge = (A, aux, lo, mid, hi) => {
    //copy to aux array
    for (let k = lo; k <= hi; k++) {
      aux[k] = A[k];
    }
    const LESS = (a, b) => a < b;
    let left = lo;
    let right = mid + 1;
    for (let k = lo; k <= hi; k++) {
      // if left has crossed mid
      if (left > mid) {
        A[k] = aux[right++];
      } else if (right > hi) {
        //right has crossed hi
        A[k] = aux[left++];
      } else if (LESS(aux[left], aux[right])) {
        A[k] = aux[left++];
      } else {
        A[k] = aux[right++];
      }
    }
  };
  const sort = (A, aux, lo, hi) => {
    if (lo < hi) {
      const mid = lo + Math.floor((hi - lo) / 2);
      //sort two half of the array
      sort(A, aux, lo, mid);
      sort(A, aux, mid + 1, hi);
      //merge the sorted array
      merge(A, aux, lo, mid, hi);
    }
  };
  sort(nums, aux, 0, nums.length - 1);
};


/*
Approach I: Quick Sort
Your runtime 2936 ms beats 24.72 % of javascript submissions.
Your memory usage 66.1 MB beats 32.22 % of javascript submissions.
*/
var sortArray = function (nums) {
  const N = nums.length;
  const exchange = (A, i, j) => {
    [A[i], A[j]] = [A[j], A[i]];
  };
  const partition = (A, lo, hi) => {
    let i = lo;
    let j = hi + 1;
    //pivot
    let pivot = A[lo];
    while (i < j) {
      //find the element larger than pivot from left
      while (A[++i] < pivot) if (i === hi) break;
      //find the element smaller than pivot from right
      while (A[--j] > pivot) if (j === lo) break;
      //check if 'i' and 'j' have not crossed
      if (i >= j) break;
      //exchange 'i' & 'j'
      exchange(A, i, j);
    }
    //finally exchange the pivot with 'j'
    exchange(A, lo, j);
    //return new pivot position, i.e, 'j'
    return j;
  };

  const quickSort = (A, lo, hi) => {
    if (lo > hi) return;
    const j = partition(A, lo, hi);
    quickSort(A, lo, j - 1);
    quickSort(A, j + 1, hi);
  };
  quickSort(nums, 0, N - 1);
  return nums;
};
