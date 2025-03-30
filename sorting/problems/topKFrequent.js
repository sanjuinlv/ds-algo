/* 
347. Top K Frequent Elements
https://leetcode.com/problems/top-k-frequent-elements/
Type: Medium

Given an integer array nums and an integer k, return the k most frequent elements. You may return the answer in any order.

Example 1:
Input: nums = [1,1,1,2,2,3], k = 2
Output: [1,2]

Example 2:
Input: nums = [1], k = 1
Output: [1]

Constraints:

1 <= nums.length <= 10^5
k is in the range [1, the number of unique elements in the array].
It is guaranteed that the answer is unique.
 

Follow up: Your algorithm's time complexity must be better than O(n log n), where n is the array's size.

*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
/* 
Approach: Using Map and max PQ
Time: O(NLogN)
Space: O(N)
Runtime: 100 ms, faster than 61.13% of JavaScript online submissions for Top K Frequent Elements.
Memory Usage: 46.8 MB, less than 34.03% of JavaScript online submissions for Top K Frequent Elements.
*/
var topKFrequent = function (nums, k) {
  const numMap = new Map();
  for (let num of nums) {
    if (!numMap.has(num)) {
      numMap.set(num, 1);
    } else {
      numMap.set(num, numMap.get(num) + 1);
    }
  }
  const maxPQ = new MaxPriorityQueue({
    compare: (a, b) => {
      return b.count - a.count;
    },
  });
  for (const key of numMap.keys()) {
    maxPQ.enqueue({ num: key, count: numMap.get(key) });
  }
  const result = new Array(k);
  for (let i = 0; i < k; i++) {
    result[i] = maxPQ.front().num;
    maxPQ.dequeue();
  }
  return result;
};

/* 
(Optimized) Using Map and min PQ (to store only k element)
Time: O(N Log k)
Space: O(N + k) to store hashmap and a heap with k elements
Runtime: 95 ms, faster than 9.64% of JavaScript online submissions for Top K Frequent Elements.
Memory Usage: 56.07 MB, less than 29.10% of JavaScript online submissions for Top K Frequent Elements.
*/
var topKFrequent = function (nums, k) {
  const numCountMap = new Map();
  for (let num of nums) {
    numCountMap.set(num, (numCountMap.get(num) || 0) + 1);
  }
  const minPQ = new MinPriorityQueue({
    compare: (a, b) => {
      return a.count - b.count;
    },
  });
  //with this changes we only need to store upto k elements
  for (const key of numCountMap.keys()) {
    if (minPQ.size() < k) {
      minPQ.enqueue({ num: key, count: numCountMap.get(key) });
    } else {
      if (minPQ.front().count < numCountMap.get(key)) {
        minPQ.dequeue();
        minPQ.enqueue({ num: key, count: numCountMap.get(key) });
      }
    }
  }
  const result = new Array(k);
  let i = 0;
  while (minPQ.size()) {
    result[i++] = minPQ.front().num;
    minPQ.dequeue();
  }
  return result;
};

/* 
Approach: Using bucket sort
Time: O(N)
Space: O(N) to store hashmap and a heap with k elements
Runtime: 6 ms Beats 94.04%
Memory Usage: 57.76 MB Beats 56.59% 
*/
var topKFrequent = function (nums, k) {
  const N = nums.length;
  let countMap = new Map();
  //create num count map
  for (let num of nums) {
    countMap.set(num, (countMap.get(num) || 0) + 1);
  }
  //create frequency bucket
  const bucket = [];
  for (let [key, frequency] of countMap) {
    //we store in array for a given freq so that we can avoid
    //overriding for same freq numbers
    if (!bucket[frequency]) bucket[frequency] = [];
    bucket[frequency].push(key);
  }
  const result = [];
  //most freq elements are located at the end & least freq elemnts at the begining
  for (let i = bucket.length - 1; i >= 0; i--) {
    if (bucket[i]) result.push(...bucket[i]);
    if (result.length == k) break;
  }
  return result;
};
/* 
Approach III: using quick select
Time: O(N) in average case, O(N^2) in worst case
Space: O(N) to store hashmap and unique elements

Runtime: 10 ms Beats 78.29%
Memory: 58.33 MB Beats 50.19%
*/
var topKFrequent = function (nums, k) {
  const N = nums.length;
  let countMap = new Map();
  //create num count map
  for (let num of nums) {
    countMap.set(num, (countMap.get(num) || 0) + 1);
  }
  //unique elements
  const n = countMap.size;
  const unique = new Array(n);
  let i = 0;
  for (const key of countMap.keys()) {
    unique[i++] = key;
  }
  console.log(`unique elements`, unique);
  // kth top frequent element is (n - k)th less frequent.
  // Do a partial sort: from less frequent to the most frequent, till
  // (n - k)th less frequent element takes its place (n - k) in a sorted array.
  // All elements on the left are less frequent.
  // All the elements on the right are more frequent.
  quickSelect(0, n - 1, n - k, unique, countMap);
  //return element from n-k position
  return unique.slice(n - k);
};

function quickSelect(left, right, kSmallest, arr, freqMap) {
  /*
  Sort a list within left..right till kth less frequent element
  takes its place. 
  */
  //base case
  if (left == right) return;
  //find pivot position in sorted array
  const pivotIndex = partition(left, right, arr, freqMap);
  //pivot is in its final sorting psotion
  if (pivotIndex == kSmallest) return;
  else if (pivotIndex < kSmallest) {
    //go right
    quickSelect(pivotIndex + 1, right, kSmallest, arr, freqMap);
  } else {
    //go left
    quickSelect(left, pivotIndex - 1, kSmallest, arr, freqMap);
  }
}

function partition(lo, hi, arr, freqMap) {
  //find random pivot point
  const pivotIndex = lo + Math.floor(Math.random() * (hi - lo + 1));
  swap(arr, lo, pivotIndex);
  const pivotFreq = freqMap.get(arr[lo]);
  let i = lo + 1;
  let j = hi;
  while (true) {
    // moved towards right until we find an item greater than pivot
    while (i <= j && freqMap.get(arr[i]) < pivotFreq) i++;
    // moved towards left until we find an item less than pivot
    while (i <= j && freqMap.get(arr[j]) > pivotFreq) j--;    
    if (i > j) break;    
    swap(arr, i, j);
    i++;
    j--;
  }  
  swap(arr, lo, j);
  return j;
}

function swap(A, i, j) {
  [A[i], A[j]] = [A[j], A[i]];
}


/* 
Other way to do partitioning
function partition(left, right, pivotIndex, arr, freqMap) {
  const pivotFreq = freqMap.get(arr[pivotIndex]);
  //1. move pivot to end
  swap(arr, pivotIndex, right);
  let storeIndex = left;
  //2. move all lest frequent to the left
  for (let i = left; i <= right; i++) {
    if (freqMap.get(arr[i]) < pivotFreq) {
      swap(arr, storeIndex, i);
      storeIndex++;
    }
  }
  //move the pivot to its final position
  swap(arr, storeIndex, right);
  return storeIndex;
}
*/

