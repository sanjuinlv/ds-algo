/* 
377. Combination Sum IV
https://leetcode.com/problems/combination-sum-iv/
Type: Medium

Given an array of distinct integers nums and a target integer target, return the number of possible combinations that add up to target.

The test cases are generated so that the answer can fit in a 32-bit integer.
 
Example 1:
  Input: nums = [1,2,3], target = 4
  Output: 7
  Explanation:
    The possible combination ways are:
    (1, 1, 1, 1)
    (1, 1, 2)
    (1, 2, 1)
    (1, 3)
    (2, 1, 1)
    (2, 2)
    (3, 1)
    Note that different sequences are counted as different combinations.

Example 2:
Input: nums = [9], target = 3
Output: 0
 
Constraints:
 - 1 <= nums.length <= 200
 - 1 <= nums[i] <= 1000
 - All the elements of nums are unique.
 - 1 <= target <= 1000
 
Follow up: What if negative numbers are allowed in the given array? How does it change the problem? What limitation we need to add to the question to allow negative numbers?
*/
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
/* 
Recursion
*/
var combinationSum4 = function (nums, target) {
  let combinationsCount = 0;
  const compute = (remain) => {
    if (remain == 0) {
      combinationsCount++;
      //we are done with this path
      return;
    }
    for (const num of nums) {
      if (remain - num >= 0) {
        compute(remain - num);
      }
    }
  };
  compute(target);
  return combinationsCount;
};

/* 
Dynamic Programming: Top down
Time: O(T * N), where T is the target value and N is number of elements input array
Space: O(T)
Due to the recursive function, the algorithm will incur additional memory consumption
in the function call stack. In the worst case, the recursive function can pile up to
T times. As a result, we would need O(T) space for the recursive function.
In addition, since we applied the memoization technique where we keep the intermediate 
results in the cache, we would need additionally O(T) space.
So total O(T)+O(T)=O(T).

Runtime: 50 ms Beats 93.16%
Memory Usage: 50.60 MB Beats 78.33%
*/
var combinationSum4 = function (nums, target) {
  const memo = new Map();
  const compute = (remain) => {
    if (remain == 0) return 1;
    if (memo.has(remain)) return memo.get(remain);
    let count = 0;
    for (const num of nums) {
      if (remain - num < 0) continue;
      count += compute(remain - num);
    }
    memo.set(remain, count);
    return count;
  };
  return compute(target);
};

/* 
Dynamic Programming: Top down
Time: O(T * N), where T is the target value and N is number of elements input array
Space: O(T)

Runtime: 65 ms Beats 28.14%
Memory Usage: 52.69 MB Beats 25.48%
*/
var combinationSum4 = function (nums, target) {
  const dp = new Array(target + 1);
  //base case
  dp[0] = 1;
  for (let sum = 1; sum <= target; sum++) {
    for (const num of nums) {
      if (sum - num >= 0) {
        dp[sum] += dp[sum - num];
      }
    }
  }
  return dp[target];
};
