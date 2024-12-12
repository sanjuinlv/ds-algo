/*
228. Summary Ranges
https://leetcode.com/problems/summary-ranges
Type: Easy

You are given a sorted unique integer array nums.
A range [a,b] is the set of all integers from a to b (inclusive).
Return the smallest sorted list of ranges that cover all the numbers in the array exactly. That is, each element of nums is covered by exactly one of the ranges, and there is no integer x such that x is in one of the ranges but not in nums.

Each range [a,b] in the list should be output as:
"a->b" if a != b
"a" if a == b

Example 1:
  Input: nums = [0,1,2,4,5,7]
  Output: ["0->2","4->5","7"]
  Explanation: The ranges are:
  [0,2] --> "0->2"
  [4,5] --> "4->5"
  [7,7] --> "7"

Example 2:
  Input: nums = [0,2,3,4,6,8,9]
  Output: ["0","2->4","6","8->9"]
  Explanation: The ranges are:
  [0,0] --> "0"
  [2,4] --> "2->4"
  [6,6] --> "6"
  [8,9] --> "8->9" 

Constraints:
 - 0 <= nums.length <= 20
 - -2^31 <= nums[i] <= 2^31 - 1
 - All the values of nums are unique.
 - nums is sorted in ascending order.

 */
/**
 * @param {number[]} nums
 * @return {string[]}
 */
/* 
Approach I: Two pointers
Time: O(N)
Space: O(1), no extra memory

Runtime: 0 ms Beats 100.00%
Memory: 48.58 MB Beats 81.35%
*/
var summaryRanges = function (nums) {
  if (nums.length == 0) return [];
  let i = 0;
  let j = 1;
  let result = [];
  const getRange = (i, j, A) => {
    if (i != j - 1) return `${A[i]}->${A[j - 1]}`;
    else return `${A[i]}`;
  };

  while (j < nums.length) {
    if (nums[j - 1] + 1 !== nums[j]) {
      //check if i and j are diff
      result.push(getRange(i, j, nums));
      i = j;
      j = i + 1;
    } else {
      j++;
    }
  }
  result.push(getRange(i, j, nums));
  return result;
};

/* 
Solution Reference

Runtime: 0 ms Beats 100.00%
Memory: 48.46 MB Beats 86.77%
*/
var summaryRanges = function (nums) {
  let ranges = [];
  const N = nums.length;
  for (let i = 0; i < N; i++) {
    let start = nums[i];
    //keep iterating until the next element is one more than current elem
    while (i + 1 < N && nums[i] + 1 == nums[i + 1]) {
      i++;
    }
    //a == b
    if (start == nums[i]) {
      ranges.push(`${start}`);
    } else {
      //a != b
      ranges.push(`${start}->${nums[i]}`);
    }
  }
  return ranges;
};
