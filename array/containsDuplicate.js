/* 
Given an array of integers, find if the array contains any duplicates.
Your function should return true if any value appears at least twice in the array, 
and it should return false if every element is distinct.

Example 1:
Input: [1,2,3,1]
Output: true

Example 2:
Input: [1,2,3,4]
Output: false

Example 3: 
Input: [1,1,1,3,3,4,3,2,4,2]
Output: true
*/


/**
 * @param {number[]} nums
 * @return {boolean}
 */
/*
Approach 1: Using hashtable

Time complexity: O(N)
Space complexity: O(N)

Runtime: 96 ms
Memory Usage: 44.8 MB
Your runtime beats 43.31 % of javascript submissions.
Your memory usage beats 61.20 % of javascript submissions.
*/
var containsDuplicate = function(nums) {
    const N = nums.length;
    let visited = new Set();
    for (let i = 0; i < N; i++){
        if (visited.has(nums[i])){
            return true;
        }
        visited.add(nums[i]);
    }
    return false;
};

/* 
Approach 3: Using sorting
Time complexity; O(N Log N) (total sorting: N Log N + traversal: N)
Space complexity: O(1) (considering sorting usage heap sort)
Note: Here sorting will modify the array. If that is not allowed then we may copy it to another array.
Runtime: 88 ms, faster than 72.35% of JavaScript online submissions for Contains Duplicate.
Memory Usage: 42.9 MB, less than 75.95% of JavaScript online submissions for Contains Duplicate.
*/
var containsDuplicate = function (nums) {
  nums.sort((a, b) => a - b);
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] == nums[i + 1]) return true;
  }
  return false;
};

/* Approach 3: 
i) visit each index item and mark the corresponding index item as negative 
marking that its visited
ii) duing this process if we find an item already marked -ve then we have found duplicate
iii) return true if duplicate found elase 
Note: for index lookup use positive value of current index value, i.e, Math.abs()

Time complexity: O(N)
Space complexity: O(1)
        
i=0 => nums[0] => nums[1] => 2 => -2:  [1,-2,3,1]
i=1 => nums[1] => nums[2] => 3 => -3: [1,-2,-3,1]
i=2 => nums[2] => nums[3] => 1 => -1: [1,-2,-3,-1]
i=3 => nums[3] => nums[1] => -ve => already visited
There is problem with item whose index valu will be out of the array size, though it works with?
*/
