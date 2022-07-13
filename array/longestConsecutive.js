/* 
Medium 
https://leetcode.com/problems/longest-consecutive-sequence/

Given an unsorted array of integers nums, return the length of the longest consecutive elements sequence.
You must write an algorithm that runs in O(n) time.

Example 1:

Input: nums = [100,4,200,1,3,2]
Output: 4
Explanation: The longest consecutive elements sequence is [1, 2, 3, 4]. Therefore its length is 4.
Example 2:

Input: nums = [0,3,7,2,5,8,4,6,0,1]
Output: 9

Constraints:

0 <= nums.length <= 10^5
-109 <= nums[i] <= 10^9

*/

/* 
Approach I: Sorting
Time: O(N Log N)
Space: O(N)

Runtime: 209 ms, faster than 54.42% of JavaScript online submissions for Longest Consecutive Sequence.
Memory Usage: 50.5 MB, less than 93.09% of JavaScript online submissions for Longest Consecutive Sequence.
*/
var longestConsecutive = function (nums) {
  if (!nums.length) return 0;
  nums.sort((a, b) => a - b);
  console.log(nums);
  let maxConsecutive = 1;
  let currCount = 1;
  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i + 1] == nums[i]) continue;
    if (nums[i + 1] - nums[i] == 1) currCount++;
    else currCount = 1;
    maxConsecutive = Math.max(currCount, maxConsecutive);
  }
  return maxConsecutive;
};

/* 
Approach II: Set
we only attempt to build sequences from numbers that are not already part of a longer
sequence. This is accomplished by first ensuring that the number that would immediately
precede the current number in a sequence is not present, as that number would necessarily
be part of a longer sequence.

Time: O(N)
Space: O(N)

Runtime: 769 ms, faster than 12.26% of JavaScript online submissions for Longest Consecutive Sequence.
Memory Usage: 57.9 MB, less than 50.12% of JavaScript online submissions for Longest Consecutive Sequence
*/
var longestConsecutive = function (nums) {
  if (!nums.length) return 0;
  const numSet = new Set();
  for (let num of nums) {
    numSet.add(num);
  }
  let maxConsecutive = 0;
  for (let num of nums) {
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;
      while (numSet.has(currentNum)) {
        currentNum += 1;
        currentStreak += 1;
      }
      maxConsecutive = Math.max(maxConsecutive, currentStreak);
    }
  }
  return maxConsecutive;
};
