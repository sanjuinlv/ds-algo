/* 
215. Kth Largest Element in an Array
https://leetcode.com/problems/kth-largest-element-in-an-array/
Category - Medium

Find the kth largest element in an unsorted array. Note that it is the kth largest element
in the sorted order, not the kth distinct element.

Example 1:
Input: [3,2,1,5,6,4] and k = 2
Output: 5

Example 2:
Input: [3,2,3,1,2,4,5,5,6] and k = 4
Output: 4

onstraints:
 - 1 <= k <= nums.length <= 10^5
 - -10^4 <= nums[i] <= 10^4
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
/* 
Approach I: Sort:
We can sort the array and return the kth element from the end. 
That would be an algorithm of O(NlogN) time complexity and O(1) space complexity.
*/

/* 
Approach I: Heap
Maintain a min Heap of size K and return the front element which will be kth largest

Time: O(N logK)
Space: O(LogK)

Runtime: 57 ms Beats 67.66%
Memory Usage: 69.96 MB Beats 33.76%
*/
var findKthLargest = function (nums, k) {
  //Use min heap to get the kth largest
  const minPQ = new MinPriorityQueue();
  for (const num of nums) {
    //PQ size is less than k then add num to PQ
    if (minPQ.size() < k) {
      minPQ.enqueue(num);
    } else {
      //front of the Q is less than curr num
      if (minPQ.front() < num) {
        //remove the front entry
        minPQ.dequeue();
        //add new value 'num'
        minPQ.enqueue(num);
      }
    }
  }
  //return front entry which is kth largest
  return minPQ.front();
};

/* 
Approach II: Quick Select
Runtime: 19 ms Beats 87.45%
Memory; 64.36 MB Beats 71.20%
*/
var findKthLargest = function (nums, k) {
  const N = nums.length;
  const indx = quickSelect(0, N - 1, N - k, nums);
  return nums[indx];
};

function quickSelect(lo, hi, kthSmallest, nums) {
  // if (lo > hi) return -1;
  const pivot = partition(lo, hi, nums);
  if (pivot == kthSmallest) return pivot;
  //go right
  if (pivot < kthSmallest) return quickSelect(pivot + 1, hi, kthSmallest, nums);
  //go left
  else return quickSelect(lo, pivot - 1, kthSmallest, nums);
}

function partition(lo, hi, nums) {
  //choose random index as pivot index
  const pivotIndex = lo + Math.floor(Math.random() * (hi - lo + 1));
  //swap the random pivot point with lo point
  swap(lo, pivotIndex, nums);
  const pivot = nums[lo];
  let i = lo + 1;
  let j = hi;
  while (true) {
    //move to right until we find a element greater than pivot
    while (i <= j && nums[i] < pivot) i++;
    //move to left until we find a element smaller than pivot
    while (i <= j && nums[j] > pivot) j--;
    //swap i & j if i has not crossed j
    if (i >= j) break;
    swap(i++, j--, nums);
  }
  swap(lo, j, nums);
  return j;
}

function swap(i, j, A) {
  [A[i], A[j]] = [A[j], A[i]];
}


/*
Approach III: Quick Select - Iterative

Time complexity : O(N) in the average case, (N^2) in the worst case.
Space complexity : O(1).

Runtime: 96 ms Beats 84.35%
Memory: 58.46 MB Beats 93.57%
*/
var findKthLargest = function (nums, k) {
  const swap = (a, i, j) => {
    [a[i], a[j]] = [a[j], a[i]];
  };
  const partition = (A, lo, hi) => {
    let i = lo;
    let j = hi + 1;
    const pivot = A[lo];
    while (true) {
      //find an element greater than pivot towards right
      while (A[++i] < pivot) if (i === hi) break;
      //find an element less than pivot towards left
      while (A[--j] > pivot) if (j === lo) break;
      //if pointers crossed then stop
      if (i >= j) break;
      //else swap the element
      swap(A, i, j);
    }
    //finally swap pivot position with j
    swap(A, lo, j);
    return j;
  };
  const select = (A, k) => {
    const N = nums.length;
    //kth largest element is the same as N - kth smallest element, hence one
    // could implement kth smallest algorithm for this problem
    k = N - k;
    let lo = 0;
    let hi = N - 1;
    if (lo == hi) return A[lo];
    while (lo <= hi) {
      let p = partition(A, lo, hi);
      if (p < k) lo = p + 1; 
      else if (p > k) hi = p - 1;
      else return A[p];
    }
  };
  return select(nums, k);
};

