/* 
https://leetcode.com/problems/maximum-gap/description/
Type: Medium

Given an integer array nums, return the maximum difference between two successive elements in its sorted form. If the array contains less than two elements, return 0.

You must write an algorithm that runs in linear time and uses linear extra space.

 
Example 1:
    Input: nums = [3,6,9,1]
    Output: 3
    Explanation: The sorted form of the array is [1,3,6,9], either (3,6) or (6,9) has the maximum difference 3.

Example 2:
    Input: nums = [10]
    Output: 0
    Explanation: The array contains less than 2 elements, therefore return 0.
 

Constraints:
 - 1 <= nums.length <= 10^5
 - 0 <= nums[i] <= 10^9

*/
/**
 * @param {number[]} nums
 * @return {number}
 */
/* 
Approach I: Using sorting
Time: O(NLogN)
Space: O(1), assuming quicksort used for integers by JS

Runtime: 233 ms Beats 27.79%
Memory: 61.54 MB Beats 98.08%
*/
var maximumGap = function (nums) {
  const N = nums.length;
  if (N < 2) return 0;
  let maxGap = -Infinity;
  nums.sort((a, b) => a - b);
  for (let i = 1; i < N; i++) {
    maxGap = Math.max(maxGap, nums[i] - nums[i - 1]);
  }
  return maxGap;
};

/* 
Approach II: Using Bucket sort
Time: O(K)
Space: O(N), assuming quicksort used for integers by JS

Runtime: 112 ms Beats 97.44%
Memory: 76.62 MB Beats 23.32%
*/
//explained the below solution nicely here: https://www.youtube.com/watch?v=21XhR6r5jU8
var maximumGap = function (nums) {
  const N = nums.length;
  if (N < 2) return 0;
  const maxNum = Math.max(...nums);
  const minNum = Math.min(...nums);
  //both elements are equal
  if (maxNum == minNum) return 0;
  //calculate bucket size
  //we create N-1 buckets for for N-2 numbers, as min and max is already known/calculated
  const bucketSize = Math.ceil((maxNum - minNum) / N);
  //min bucket to store min of that bucket
  const minBuckets = new Array(N).fill(Infinity);
  //max bucket to store max of that bucket
  const maxBuckets = new Array(N).fill(-Infinity);
  //put the numbers in appropriate buckets
  for (let num of nums) {
    const index = Math.floor((num - minNum) / bucketSize);
    if (index >= N) {
      // put the max value in the last bucket
      index = index - 1;
    }
    minBuckets[index] = Math.min(minBuckets[index], num);
    maxBuckets[index] = Math.max(maxBuckets[index], num);
  }
  let maxGap = 0;
  let prevMax = maxBuckets[0];
  for (let i = 1; i < N; i++) {
    // Skip empty buckets
    if (maxBuckets[i] == -Infinity) continue;
    maxGap = Math.max(maxGap, minBuckets[i] - prevMax);
    prevMax = maxBuckets[i];
  }
  return maxGap;
};

/* 
Approach II: Using Bucket sort
Time: O(NLogN)
Space: O(1), assuming quicksort used for integers by JS

Runtime: 319 ms Beats 9.26%
Memory: 82.48 MB Beats 10.86%
*/
//explained the below solution nicely here: https://www.youtube.com/watch?v=21XhR6r5jU8
var maximumGap = function (nums) {
  const N = nums.length;
  if (N < 2) return 0;
  const maxNum = Math.max(...nums);
  const minNum = Math.min(...nums);
  //both elements are equal
  if (maxNum == minNum) return 0;
  //calculate bucket size
  //we create N-1 buckets for for N-2 numbers, as min and max is already known/calculated
  const bucketSize = Math.max(1, Math.floor((maxNum - minNum) / (N - 1)));
  const bucketCount = Math.floor((maxNum - minNum) / bucketSize) + 1;
  //using Array.map() will creat issue as object min and max will be shared with each entry
  const buckets = Array.from({ length: bucketCount }, () => ({
    min: Infinity,
    max: -Infinity,
  }));
  //place numbers in appropriate place
  for (let num of nums) {
    const index = Math.floor((num - minNum) / bucketSize);
    buckets[index].min = Math.min(buckets[index].min, num);
    buckets[index].max = Math.max(buckets[index].max, num);
  }
  let maxGap = 0;
  let prevMax = minNum;
  for (let bucket of buckets) {
    // Skip empty buckets
    if (bucket.min == Infinity) continue;
    maxGap = Math.max(maxGap, bucket.min - prevMax);
    prevMax = bucket.max;
  }
  return maxGap;
};

//with debugger to understand the logic
var maximumGap = function (nums) {
  const N = nums.length;
  if (N < 2) return 0;
  const maxNum = Math.max(...nums);
  const minNum = Math.min(...nums);
  //both elements are equal
  if (maxNum == minNum) return 0;
  console.log(`maxNum: ${maxNum}, minNum: ${minNum}, N: ${N}`);
  //calculate bucket size
  const bucketSize = Math.max(1, Math.floor((maxNum - minNum) / (N - 1)));
  const bucketCount = Math.floor((maxNum - minNum) / bucketSize) + 1;
  console.log(`bucket size: ${bucketSize}, bucketCount: ${bucketCount}`);
  const buckets = Array.from({ length: bucketCount }, () => ({
    min: Infinity,
    max: -Infinity,
  }));
  //place numbers in appropriate place
  for (let num of nums) {
    const index = Math.floor((num - minNum) / bucketSize);
    console.log(`num: ${num}, indxe: ${index}`);
    buckets[index].min = Math.min(buckets[index].min, num);
    buckets[index].max = Math.max(buckets[index].max, num);
  }
  console.log(`buckets`, buckets);
  let maxGap = 0;
  let prevMax = minNum;
  for (let bucket of buckets) {
    // Skip empty buckets
    if (bucket.min == Infinity) continue;
    maxGap = Math.max(maxGap, bucket.min - prevMax);
    prevMax = bucket.max;
  }
  return maxGap;
};

//III: Count short (exceeds timit limit)
// var maximumGap = function (nums) {
//   const N = nums.length;
//   if (N < 2) return 0;
//   let maxGap = -Infinity;
//   //1. find the max of the array;
//   const K = Math.max(...nums);
//   //2. create counting array
//   const counts = new Array(K + 1).fill(0);
//   for (let num of nums) counts[num]++;
//   console.log(`counts array:`, counts);
//   //3. update counts array with insert positions for numbers
//   for (let r = 1; r < counts.length; r++) {
//     counts[r] += counts[r - 1];
//   }
//   console.log(`counts array with insertion position:`, counts);
//   const sortedArray = new Array(N);
//   console.log(`sorted array before:`, sortedArray);
//   for (let i=0; i< N; i++){
//     sortedArray[counts[nums[i]] - 1] = nums[i];
//     counts[nums[i]]++;
//   }
//   console.log(`sorted array:`, sortedArray);
//   for (let i = 1; i < N; i++) {
//     maxGap = Math.max(maxGap, sortedArray[i] - sortedArray[i - 1]);
//   }
//   return maxGap;
// };

//from other users
/* 
Approach III: Using JS object keys which gets sorted by default
Runtime: 207 ms Beats 83.71%
Runtime: 78.10 MB Beats 20.45%
*/
const maximumGap = function (nums) {
  let counts = {};
  for (let num of nums) {
    counts[num] = true;
  }
  const elements = Object.keys(counts);
  let maxDifference = 0;
  for (let i = 1; i < elements.length; i++) {
    maxDifference = Math.max(maxDifference, elements[i] - elements[i - 1]);
  }
  return maxDifference;
};
