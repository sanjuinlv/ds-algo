/**
 * @param {number[]} nums
 * @return {number}
 */
/* 
Approach: Sorting
Time: O(NLogN)- Sorting takes N*LogN
Space: O(LogN), space required for sorting (Quicksort for primitive)
Runtime: 210 ms, faster than 14.47% of JavaScript online submissions for Array Partition I.
Memory Usage: 48 MB, less than 22.84% of JavaScript online submissions for Array Partition I.
*/
var arrayPairSum = function (nums) {
  //sort the array
  nums.sort((a, b) => a - b);
  let maxSum = 0;
  for (let i = 0; i < nums.length; i += 2) {
    maxSum += Math.min(nums[i], nums[i + 1]);
  }
  return maxSum;
};

var arrayPairSum = function (nums) {
  //sort the array
  nums.sort((a, b) => a - b);
  let maxSum = 0;
  for (let i = 0; i < nums.length; i += 2) {
    //value at ith index will be always smaller than i+1, so we can just take num[i]
    maxSum += nums[i];
  }
  return maxSum;
};
