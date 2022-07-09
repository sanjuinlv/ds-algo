/* 
https://leetcode.com/problems/range-sum-query-immutable/

Given an integer array nums, handle multiple queries of the following type:

Calculate the sum of the elements of nums between indices left and right inclusive where left <= right.
Implement the NumArray class:

NumArray(int[] nums) Initializes the object with the integer array nums.
int sumRange(int left, int right) Returns the sum of the elements of nums between indices left and right inclusive (i.e. nums[left] + nums[left + 1] + ... + nums[right]).

Example 1:

Input
["NumArray", "sumRange", "sumRange", "sumRange"]
[[[-2, 0, 3, -5, 2, -1]], [0, 2], [2, 5], [0, 5]]
Output
[null, 1, -1, -3]

Explanation
NumArray numArray = new NumArray([-2, 0, 3, -5, 2, -1]);
numArray.sumRange(0, 2); // return (-2) + 0 + 3 = 1
numArray.sumRange(2, 5); // return 3 + (-5) + 2 + (-1) = -1
numArray.sumRange(0, 5); // return (-2) + 0 + 3 + (-5) + 2 + (-1) = -3

Constraints:

1 <= nums.length <= 10^4
-105 <= nums[i] <= 10^5
0 <= left <= right < nums.length
At most 10^4 calls will be made to sumRange.
*/
/* 
Time: O(N)
Space: O(N)
Runtime: 189 ms, faster than 53.22% of JavaScript online submissions for Range Sum Query - Immutable.
Memory Usage: 48.5 MB, less than 91.91% of JavaScript online submissions for Range Sum Query - Immutable.
*/
class NumArray {
  constructor(nums) {
    this.nums = nums;
    this.N = nums.length;
    this.sums = new Array(this.N + 1).fill(0);
    this.preComputeSums(nums);
  }

  preComputeSums(nums) {
    this.sums[0] = 0;
    for (let i = 0; i < this.N; i++) {
      this.sums[i + 1] = nums[i] + this.sums[i];
    }
  }

  sumRange(left, right) {
    return this.sums[right + 1] - this.sums[left];
  }
}

/**
 * Your NumArray object will be instantiated and called as such:
 * var obj = new NumArray(nums)
 * var param_1 = obj.sumRange(left,right)
 */
