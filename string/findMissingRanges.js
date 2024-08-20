/* 
https://leetcode.com/problems/missing-ranges
Category - Easy

You are given an inclusive range [lower, upper] and a sorted unique integer array nums,
where all elements are in the inclusive range.

A number x is considered missing if x is in the range [lower, upper] and x is not in nums.

Return the smallest sorted list of ranges that cover every missing number exactly.
That is, no element of nums is in any of the ranges, and each missing number is in
one of the ranges.

Each range [a,b] in the list should be output as:

"a->b" if a != b
"a" if a == b
 
Example 1:

Input: nums = [0,1,3,50,75], lower = 0, upper = 99
Output: ["2","4->49","51->74","76->99"]
Explanation: The ranges are:
[2,2] --> "2"
[4,49] --> "4->49"
[51,74] --> "51->74"
[76,99] --> "76->99"

Example 2:

Input: nums = [-1], lower = -1, upper = -1
Output: []
Explanation: There are no missing ranges since there are no missing numbers. 

Constraints:
- -10^9 <= lower <= upper <= 10^9
- 0 <= nums.length <= 100
- lower <= nums[i] <= upper
All the values of nums are unique.
*/
/**
 * @param {number[]} nums
 * @param {number} lower
 * @param {number} upper
 * @return {string[]}
 */
/*
Linear Scan
Time: O(N)
Space: O(1)
Runtime: 65 ms, faster than 89.23% of JavaScript online submissions for Missing Ranges.
Memory Usage: 42 MB, less than 69.89% of JavaScript online submissions for Missing Ranges.
 */
var findMissingRanges = function (nums, lower, upper) {
  const result = [];
  const N = nums.length;

  const addRange = (lower, upper, result) => {
    if (lower > upper) return;
    if (upper === lower) result.push(`${lower}`);
    else result.push(`${lower}->${upper}`);
  };

  for (let i = 0; i <= N; i++) {
    //find the range between current num and previous num
    //lower range will be (prev num + 1), upper range will be (curr num -1),
    //except for starting and ending num which need special handling
    const lt = i == 0 ? lower : nums[i - 1] + 1;
    const gt = i == N ? upper : nums[i] - 1;
    addRange(lt, gt, result);
  }
  return result;
};

// Input: nums = [0,1,3,50,75], lower = 0, upper = 99
// Output: ["2","4->49","51->74","76->99"]

var findMissingRanges = function (nums, lower, upper) {
  const result = [];
  const N = nums.length;

  const addRange = (lower, upper, result) => {
    if (lower > upper) return;
    if (upper === lower) result.push(`${lower}`);
    else result.push(`${lower}->${upper}`);
  };

  for (let i = 0; i <= N; i++) {
    const lt = i == 0 ? lower : nums[i - 1] + 1;
    const gt = i == N ? upper : nums[i] - 1;
    console.log(`i: ${i}, lt: ${lt}, gt: ${gt}`);
    addRange(lt, gt, result);
  }
  return result;
};
