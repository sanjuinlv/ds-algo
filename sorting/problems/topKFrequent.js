/* 
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
Runtime: 104 ms, faster than 55.65% of JavaScript online submissions for Top K Frequent Elements.
Memory Usage: 45.1 MB, less than 69.45% of JavaScript online submissions for Top K Frequent Elements.
*/
var topKFrequent = function (nums, k) {
  const countMap = new Map();
  //create count map
  for (let num of nums) {
    countMap.set(num, (countMap.get(num) || 0) + 1);
  }
  //create frequency bucket
  const bucket = new Array(nums.length);
  for (let key of countMap.keys()) {
    const frequency = countMap.get(key);
    //we store in array for a given freq so that we can avoid
    //overriding for same freq numbers
    if (!bucket[frequency]) bucket[frequency] = [];
    bucket[frequency].push(key);
  }
  //If we look at bucket then we can find that most frequent elements are located 
  //at the end of arr and least frequent elemnts at the begining
  //so we can iterate from end to the begining of the arr and add element to the result array
  const result = [];
  for (let i = bucket.length - 1; i >= 0 && result.length < k; i--) {
    if (bucket[i]) result.push(...bucket[i]);
  }
  return result;
};

