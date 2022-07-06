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
