/* 
https://leetcode.com/problems/max-consecutive-ones/
Tyep: Easy

Given a binary array nums, return the maximum number of consecutive 1's in the array.

Example 1:
Input: nums = [1,1,0,1,1,1]
Output: 3
Explanation: The first two digits or the last three digits are consecutive 1s. 
The maximum number of consecutive 1s is 3.

Example 2:
Input: nums = [1,0,1,1,0,1]
Output: 2

Constraints:

1 <= nums.length <= 10^5
nums[i] is either 0 or 1.
*/
/* 
Approach I : Iterative 
Time: O(N)
Space: O(1)

Runtime: 73 ms, faster than 88.27% of JavaScript online submissions for Max Consecutive Ones.
Memory Usage: 44.3 MB, less than 86.22% of JavaScript online submissions for Max Consecutive Ones.
*/
var findMaxConsecutiveOnes = function (nums) {
  let currentCount = 0;
  let maxCount = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 1) {
      currentCount++;
    } else {
      maxCount = Math.max(currentCount, maxCount);
      currentCount = 0;
    }
  }
  // we need to take care about 1's count at the end
  return Math.max(currentCount, maxCount);
};
