/* 
https://leetcode.com/problems/next-greater-element-i/
Type: Easy

The next greater element of some element x in an array is the first greater element that is to the right of x in the same array.
You are given two distinct 0-indexed integer arrays nums1 and nums2, where nums1 is a subset of nums2.
For each 0 <= i < nums1.length, find the index j such that nums1[i] == nums2[j] and determine the next greater element of nums2[j] in nums2. If there is no next greater element, then the answer for this query is -1.
Return an array ans of length nums1.length such that ans[i] is the next greater element as described above.

Example 1:

Input: nums1 = [4,1,2], nums2 = [1,3,4,2]
Output: [-1,3,-1]
Explanation: The next greater element for each value of nums1 is as follows:
- 4 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.
- 1 is underlined in nums2 = [1,3,4,2]. The next greater element is 3.
- 2 is underlined in nums2 = [1,3,4,2]. There is no next greater element, so the answer is -1.

Example 2:

Input: nums1 = [2,4], nums2 = [1,2,3,4]
Output: [3,-1]
Explanation: The next greater element for each value of nums1 is as follows:
- 2 is underlined in nums2 = [1,2,3,4]. The next greater element is 3.
- 4 is underlined in nums2 = [1,2,3,4]. There is no next greater element, so the answer is -1.

Constraints:

 - 1 <= nums1.length <= nums2.length <= 1000
 - 0 <= nums1[i], nums2[i] <= 104
 - All integers in nums1 and nums2 are unique.
 - All the integers of nums1 also appear in nums2.

Follow up: Could you find an O(nums1.length + nums2.length) solution?
*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
/* 
Approach: Using Stack
Time: O(N), O(nums1.length + nums2.length)
Space: O(N), for map
Runtime: 90 ms, faster than 59.38% of JavaScript online submissions for Next Greater Element I.
Memory Usage: 45.2 MB, less than 13.37% of JavaScript online submissions for Next Greater Element I.
*/
var nextGreaterElement = function (nums1, nums2) {
  const N = nums2.length;
  const stack = [];
  stack.push(nums2[N - 1]);
  const result = new Array(nums1.length).fill(-1);
  const map = new Map();
  for (let i = 0; i < nums1.length; i++) {
    map.set(nums1[i], i);
  }
  const top = (A) => A[A.length - 1];
  for (i = N - 2; i >= 0; i--) {
    if (top(stack) > nums2[i]) {
      if (map.has(nums2[i])) result[map.get(nums2[i])] = top(stack);
    } else {
      //pop until the stack top is less than current element
      while (stack.length != 0 && top(stack) < nums2[i]) stack.pop();
      // if stack has an element it must be greater that curr element
      if (stack.length) {
        if (map.has(nums2[i])) result[map.get(nums2[i])] = top(stack);
      }
    }
    stack.push(nums2[i]);
  }
  //always add this element to stack to be used for comparing with other number
  return result;
};

/* 
Approach II: Using Stack, but scanning from left to right
Time: O(N), O(nums1.length + nums2.length)
Space: O(N), for map
Runtime: 82 ms, faster than 72.75% of JavaScript online submissions for Next Greater Element I.
Memory Usage: 44.7 MB, less than 19.60% of JavaScript online submissions for Next Greater
*/
var nextGreaterElement = function (nums1, nums2) {
  let stack = [];
  let result = new Array(nums1.length);
  const N = nums2.length;
  //map to store next greater number of given num
  const map = new Map();
  const top = (a) => a[a.length - 1];
  for (let i = 0; i < N; i++) {
    //until stack top is less than curr num, pop and add to map with this num as next greater num
    while (top(stack) < nums2[i]) {
      map.set(stack.pop(), nums2[i]);
    }
    //always add this element to stack to be used for comparing with other number
    stack.push(nums2[i]);
  }
  for (let i = 0; i < nums1.length; i++) {
    result[i] = map.has(nums1[i]) ? map.get(nums1[i]) : -1;
  }
  return result;
};
