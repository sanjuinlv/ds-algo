/* 
Given two arrays, write a function to compute their intersection.

Example 1:
Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [4,9]

Note:
Each element in the result should appear as many times as it shows in both arrays.
The result can be in any order.
Follow up:

- What if the given array is already sorted? How would you optimize your algorithm?
- What if nums1's size is small compared to nums2's size? Which algorithm is better?
- What if elements of nums2 are stored on disk, and the memory is limited such that you 
cannot load all elements into the memory at once?

*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
/* 
Appproach 1: Using hashtable
Time complexity: O(N) (total O(N)+ O(N) => 2 O(N) => O(N))
Space complexity: O(N) (for Set)
nums1 = [], nums2 = [] - PASS
nums1 = [1], nums2 = [] - PASS
nums1 = [1], nums2 = [1] - PASS
nums1 = [1,2,2,1], nums2 = [2,2] - PASS
nums1 = [4,9,5], nums2 = [9,4,9,8,4] - PASS
nums1 = [1,2], nums2 = [1,1]  - FAILS
    Output: [1,1], Expected: [1]
 */
var intersect = function (nums1, nums2) {
  if (nums2.length > nums1.length) {
    return intersect(nums2, nums1);
  }
  const set = new Set();
  const intersection = [];
  for (let i = 0; i < nums1.length; i++) {
    set.add(nums1[i]);
  }
  for (let i = 0; i < nums2.length; i++) {
    if (set.has(nums2[i])) {
      intersection.push(nums2[i]);
    }
  }
  return intersection;
};

//with fix
/* 
Appproach 1: Using hashtable
Since the element should appear same number of times we need to check the count as well
in both array. For this purpose we need to use map with count of items instead of Set.
Time complexity: O(n + m), where m & n are the length of the array
Space complexity: O(min(n,m)), for map

Runtime: 80 ms, faster than 80.75% of JavaScript online submissions for Intersection of Two Arrays II.
Memory Usage: 41 MB, less than 17.95% of JavaScript online submissions for Intersection of Two Arrays II.
*/
var intersect = function (nums1, nums2) {
  // if nums1 is larger than nums2 then swap the array,
  // this will save us space when one input is very large
  if (nums1.length > nums2.length) {
    return intersect(nums2, nums1);
  }
  const map = new Map();
  const intersection = [];
  for (let i = 0; i < nums1.length; i++) {
    map.set(nums1[i], (map.get(nums1[i]) || 0) + 1);
  }
  for (let i = 0; i < nums2.length; i++) {
    if (map.has(nums2[i])) {
      if (map.get(nums2[i]) > 0) {
        //we can also use the nums1 array to store the value and return the range, to save the space
        intersection.push(nums2[i]);
        map.set(nums2[i], map.get(nums2[i]) - 1);
      }
    }
  }
  return intersection;
};

/* 
Approach: HashMap (without using aurxilary array)
Runtime: 119 ms, faster than 19.37% of JavaScript online submissions for Intersection of Two Arrays II.
Memory Usage: 43.7 MB, less than 49.74% of JavaScript online submissions for Intersection of Two Arrays II.
*/
var intersect = function (nums1, nums2) {
  // if nums1 is larger than nums2 then swap the array,
  // this will save us space when one input is very large
  if (nums1.length > nums2.length) {
    return intersect(nums2, nums1);
  }
  const map = new Map();
  let k = 0;
  for (let i = 0; i < nums1.length; i++) {
    map.set(nums1[i], (map.get(nums1[i]) || 0) + 1);
  }
  for (let i = 0; i < nums2.length; i++) {
    if (map.has(nums2[i])) {
      if (map.get(nums2[i]) > 0) {
        nums1[k++] = nums2[i];
        map.set(nums2[i], map.get(nums2[i]) - 1);
      }
    }
  }
  return nums1.slice(0, k);
};

/* 
Appproach 2: Sorting
Sort the arrays and traverse both and compare the items
use one of the array to copy the data

nums1 = [61,24,20,58,95,53,17,32,45,85,70,20,83,62,35,89,5,95,12,86,58,77,30,64,46,13,5,92,67,40,20,38,31,18,89,85,7,30,67,34,62,35,47,98,3,41,53,26,66,40,54,44,57,46,70,60,4,63,82,42,65,59,17,98,29,72,1,96,82,66,98,6,92,31,43,81,88,60,10,55,66,82,0,79,11,81]
nums2 = [5,25,4,39,57,49,93,79,7,8,49,89,2,7,73,88,45,15,34,92,84,38,85,34,16,6,99,0,2,36,68,52,73,50,77,44,61,48]
output:   [0,4,5,6,7,34,38,44,45,57,61,77,79,85,88,89,92]

Runtime: 80 ms, faster than 80.75% of JavaScript online submissions for Intersection of Two Arrays II.
Memory Usage: 39.2 MB, less than 71.43% of JavaScript online submissions for Intersection of Two Arrays II.
*/
var intersect = function (nums1, nums2) {
  nums1 = nums1.sort((a, b) => a - b);
  nums2 = nums2.sort((a, b) => a - b);
  let i = 0,
    j = 0,
    k = 0;
  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] == nums2[j]) {
      nums1[k++] = nums1[i];
      i++, j++;
    } else if (nums1[i] < nums2[j]) {
      i++;
    } else {
      j++;
    }
  }
  return nums1.slice(0, k);
};
