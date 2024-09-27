/*
349. Intersection of Two Arrays
https://leetcode.com/problems/intersection-of-two-arrays
Type: Easy

Given two arrays, write a function to compute their intersection.

Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4]

Note:
    - Each element in the result must be unique.
    - The result can be in any order.
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
/*
Approach 1: Hastable 
Runtime: 44 ms Beats 96.61%
Memory:  51.20 MB Beats 18.35
*/
var intersection = function (nums1, nums2) {
  if (nums1.length < nums2.length) return intersection(nums2, nums1);
  const unique = new Set(nums1);
  const result = [];
  for (const num of nums2) {
    if (unique.has(num)) {
      result.push(num);
      unique.delete(num);
    }
  }
  return result;
};

/*
Approach 2: Using hashtable, without extra space
Time complexity: O(n + m)
Space Complexity: O(min(n,m)) 
Runtime: 61 ms, faster than 28.63% of JavaScript online submissions for Intersection of Two Arrays.
Memory Usage: 51.33 MB, less than 14.07% of JavaScript online submissions for Intersection of Two Arrays.
 */
var intersection = function (nums1, nums2) {
  if (nums1.length < nums2.length) return intersection(nums2, nums1);
  const unique = new Set(nums1);
  const result = [];
  let k = 0;
  for (const num of nums2) {
    if (unique.has(num)) {
      nums1[k++] = num;
      //we found match now remove it from set
      unique.delete(num);
    }
  }
  return nums1.slice(0, k);
};

/*
Approach 3: Sorting and two pointers
Time: O(NLogN + MLogM)
Space: O(N + M) in the worst case when all elements of array are different
Runtime: 65 ms Beats 14.70%
Memory:  51.30 MB Beats 14.70
*/
var intersection = function (nums1, nums2) {
  nums1.sort((a, b) => a - b);
  nums2.sort((a, b) => a - b);
  let N = nums1.length;
  let M = nums2.length;
  let i = 0;
  let j = 0;
  const result = new Set();
  while (i < N && j < M) {
    if (nums1[i] == nums2[j]) {
      result.add(nums1[i]);
      i++;
      j++;
    } else if (nums1[i] < nums2[j]) i++;
    else j++;
  }
  return Array.from(result);
};
