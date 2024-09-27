/* 
https://leetcode.com/problems/find-first-and-last-position-of-element-in-sorted-array
Type: Medium

Given an array of integers nums sorted in non-decreasing order, find the starting and ending position of a given target value.

If target is not found in the array, return [-1, -1].

You must write an algorithm with O(log n) runtime complexity.

Example 1:
    Input: nums = [5,7,7,8,8,10], target = 8
    Output: [3,4]    
    
Example 2:
    Input: nums = [5,7,7,8,8,10], target = 6
    Output: [-1,-1]

Example 3:
    Input: nums = [], target = 0
    Output: [-1,-1]
 
Constraints:

 - 0 <= nums.length <= 10^5
 - -10^9 <= nums[i] <= 10^9
 - nums is a non-decreasing array.
 - -10^9 <= target <= 10^9
*/

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
/* 
Approach: Linear Search
Time Complexity: O(N)
Space Complexity: O(1)
Runtime: 88 ms, faster than 24.13% of JavaScript online submissions for Find First and Last Position of Element in Sorted Array.
Memory Usage: 39.9 MB, less than 38.73% of JavaScript online submissions for Find First and Last Position of Element in Sorted Array.
*/
var searchRange = function (nums, target) {
  let start = -1;
  let end = -1;
  for (let i = 0; i < nums.length; i++) {
    if (target == nums[i]) {
      //we have already found start point so update end now
      if (start >= 0) end = i;
      else start = i;
    }
  }
  if (start >= 0) {
    end = end >= 0 ? end : start;
  }
  return [start, end];
};

/* 
Approach: Binary Search
Time: O(N)
Space: O(1)

Runtime: 63 ms, faster than 8.83% of JavaScript online submissions for Find First and Last Position of Element in Sorted Array.
Memory Usage: 50.14 MB, less than 12.54% of JavaScript online submissions for Find First and Last Position of Element in Sorted Array.
*/

var searchRange = function (nums, target) {
  const N = nums.length;
  let start = -1;
  let end = -1;
  const binarySearch = (left, right) => {
    while (left <= right) {
      const mid = left + parseInt((right - left) / 2);
      if (nums[mid] == target) return mid;
      if (nums[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
    return -1;
  };
  let matchIndex = binarySearch(0, N - 1);
  if (matchIndex == -1) return [start, end];
  start = matchIndex;
  end = matchIndex;
  //look in left side for any other match
  let leftMatchIndex = matchIndex;
  while (leftMatchIndex != -1) {
    leftMatchIndex = binarySearch(0, leftMatchIndex - 1);
    if (leftMatchIndex != -1) start = leftMatchIndex;
  }
  //look in right side for any other match
  let rightMatchIndex = matchIndex;
  while (rightMatchIndex != -1) {
    rightMatchIndex = binarySearch(rightMatchIndex + 1, N - 1);
    if (rightMatchIndex != -1) end = rightMatchIndex;
  }
  return [start, end];
};

/* 
Approach: Binary search to find first matching index and then linear scan
Time: O(N)
Space: O(1)

Runtime: 56 ms Beats 39.07%
Memory: 49.79 MB Beats 54.96%
*/
var searchRange = function (nums, target) {
  const N = nums.length;
  let left = 0;
  let right = N - 1;
  let foundIndex = -1;
  while (left <= right) {
    const mid = left + parseInt((right - left) / 2);
    if (nums[mid] == target) {
      foundIndex = mid;
      break;
    }
    if (nums[mid] < target) left = mid + 1;
    else right = mid - 1;
  }
  if (foundIndex == -1) return [-1, -1];
  left = foundIndex;
  right = foundIndex;
  while (left >= 0 && nums[left] == target) left--;
  while (right < N && nums[right] == target) right++;
  return [left + 1, right - 1];
};

//Usr solution reference
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var searchRange = function(nums, target) {
    let ans = [-1,-1];
    if(nums.length === 0) return ans;
  
    ans[0] = leftBound(nums,target);
    ans[1] = rightBound(nums,target);
    return ans;
  };
  
  var leftBound = function(nums,target){
    let start = 0;
    let end = nums.length - 1 ;
    let ans = -1;
    
    while(start <= end){
      let mid = Math.floor((start+end)/2);
  
      if(nums[mid] === target){
          ans = mid;
          end = mid - 1;
      } else if(nums[mid] < target) start = mid + 1;
      else end = mid -1;
    }
    return ans;
  }
  
  var rightBound = function(nums,target){
    let start = 0;
    let end = nums.length - 1 ;
    let ans = -1;
    
    while(start <= end){
      let mid = Math.floor((start+end)/2);
      
      if(nums[mid] === target){
          ans = mid;
          start = mid + 1;
      } else if(nums[mid] < target) start = mid + 1;
      else end = mid -1;
    }
    return ans;
  }
  