/*
https://leetcode.com/problems/missing-number/solution/

Given an array nums containing n distinct numbers in the range [0, n], return the only number
 in the range that is missing from the array.

Example 1:

Input: nums = [3,0,1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3]. 
2 is the missing number in the range since it does not appear in nums.
Example 2:

Input: nums = [0,1]
Output: 2
Explanation: n = 2 since there are 2 numbers, so all numbers are in the range [0,2]. 
2 is the missing number in the range since it does not appear in nums.
Example 3:

Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
Explanation: n = 9 since there are 9 numbers, so all numbers are in the range [0,9]. 
8 is the missing number in the range since it does not appear in nums.

Constraints:

n == nums.length
1 <= n <= 10^4
0 <= nums[i] <= n
All the numbers of nums are unique.
 

Follow up: Could you implement a solution using only O(1) extra space complexity and O(n) runtime complexity?
 */
/**
 * @param {number[]} nums
 * @return {number}
 */
/* 
Approach I: Using Set (O(N) space)
Time: O(N)
Space: O(N)
Runtime: 146 ms, faster than 16.33% of JavaScript online submissions for Missing Number.
Memory Usage: 49.3 MB, less than 5.05% of JavaScript online submissions for Missing Number.

*/
var missingNumber = function (nums) {
  const seen = new Set();
  for (let i = 0; i <= nums.length; i++) {
    seen.add(i);
  }
  for (let i = 0; i < nums.length; i++) {
    if (seen.has(nums[i])) seen.delete(nums[i]);
  }
  console.log(seen);
  return [...seen][0];
};

/* 
Approach: Using Set (Optimized than above)
Time: O(N)
Space: O(N)
Runtime: 71 ms, faster than 88.28% of JavaScript online submissions for Missing Number.
Memory Usage: 48.4 MB, less than 5.05% of JavaScript online submissions for Missing Number.
*/
var missingNumber = function (nums) {
  const numSet = new Set();
  for (let i = 0; i < nums.length; i++) {
    numSet.add(nums[i]);
  }
  for (let i = 0; i <= nums.length; i++) {
    if (!numSet.has(i)) return i;
  }
  return -1;
};

/* 
Approach II: Without using Set
Time: O(N)
Space: O(1)
Runtime: 72 ms, faster than 87.13% of JavaScript online submissions for Missing Number.
Memory Usage: 44.2 MB, less than 80.85% of JavaScript online submissions for Missing Number.
*/
var missingNumber = function (nums) {
  const N = nums.length;
  let sum = (N * (N + 1)) / 2;
  for (let i = 0; i < N; i++) {
    sum = sum - nums[i];
  }
  return sum;
};
