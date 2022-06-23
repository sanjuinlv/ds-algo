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
Runtime: 97 ms, faster than 32.23% of JavaScript online submissions for Combination Sum IV.
Memory Usage: 44 MB, less than 25.12% of JavaScript online submissions for Combination Sum IV.
*/
var combinationSum4 = function (nums, target) {
  const memo = new Map();
  const compute = (remain) => {
    if (remain === 0) return 1;
    if (memo.has(remain)) return memo.has(remain);
    let result = 0;
    for (const num of nums) {
      if (remain - num >= 0) {
        result += compute(remain - num);
      }
    }
    memo.set(remain, result);
    return result;
  };
  return compute(target);
};
