/* 
128. Longest Consecutive Sequence
https://leetcode.com/problems/longest-consecutive-sequence/
Type: Medium

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
 - 0 <= nums.length <= 10^5
 - -10^9 <= nums[i] <= 10^9

*/

/* 
Approach I: Brute Force
Time: O(N^3)
Space: O(1)
*/
var longestConsecutive = function (nums) {
  let longestStreak = 0;
  for (let num of nums) {
    let currentStreak = 1;
    let currentNum = num;
    while (nums.includes(currentNum + 1)) {
      currentNum++;
      currentStreak++;
    }
    longestStreak = Math.max(longestStreak, currentStreak);
  }
  return longestStreak;
};
/* 
Approach II: Sorting
Time: O(N Log N)
Space: O(N)

Runtime: 35 ms Beats 80.19%
Memory Usage: 60.16 MB Beats 90.76%
*/
var longestConsecutive = function (nums) {
  if (!nums.length) return 0;
  let longestStreak = 1;
  let currentStreak = 1;
  //sort the numbers
  nums.sort((a, b) => a - b);
  for (let i = 1; i < nums.length; i++) {
    //if prev num is same as curr then continue
    if (nums[i] == nums[i - 1]) continue;
    //curr num is next consecutive of prev
    if (nums[i] == nums[i - 1] + 1) currentStreak++;
    else currentStreak = 1;
    longestStreak = Math.max(longestStreak, currentStreak);
  }
  return longestStreak;
};

/* 
Approach III: Set
we only attempt to build sequences from numbers that are not already part of a longer
sequence. This is accomplished by first ensuring that the number that would immediately
precede the current number in a sequence is not present, as that number would necessarily
be part of a longer sequence.

Time: O(N)
Space: O(N)

Runtime: 38 ms Beats 61.82%
Memory Usage: 74.73 MB Beats 31.63%
*/
var longestConsecutive = function (nums) {
  if (!nums.length) return 0;
  const numSet = new Set(nums);
  let longestStreak = 1;
  for (let num of numSet) {
    //attempt to build the sequence from numbers that are 
    //not already part of a longer sequence.
    if (!numSet.has(num - 1)) {
      let currentNum = num;
      let currentStreak = 1;
      while (numSet.has(currentNum + 1)) {
        currentNum++;
        currentStreak++;
      }
      longestStreak = Math.max(longestStreak, currentStreak);
    }
  }
  return longestStreak;
};
