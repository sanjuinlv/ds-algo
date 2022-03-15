/* 
You are given two integer arrays nums and multipliers of size n and m respectively,
 where n >= m. The arrays are 1-indexed.

You begin with a score of 0. You want to perform exactly m operations.
 On the ith operation (1-indexed), you will:

Choose one integer x from either the start or the end of the array nums.
Add multipliers[i] * x to your score.
Remove x from the array nums.
Return the maximum score after performing m operations.

Example 1:
Input: nums = [1,2,3], multipliers = [3,2,1]
Output: 14
Explanation: An optimal solution is as follows:
- Choose from the end, [1,2,3], adding 3 * 3 = 9 to the score.
- Choose from the end, [1,2], adding 2 * 2 = 4 to the score.
- Choose from the end, [1], adding 1 * 1 = 1 to the score.
The total score is 9 + 4 + 1 = 14.

Example 2:
Input: nums = [-5,-3,-3,-2,7,1], multipliers = [-10,-5,3,4,6]
Output: 102
Explanation: An optimal solution is as follows:
- Choose from the start, [-5,-3,-3,-2,7,1], adding -5 * -10 = 50 to the score.
- Choose from the start, [-3,-3,-2,7,1], adding -3 * -5 = 15 to the score.
- Choose from the start, [-3,-2,7,1], adding -3 * 3 = -9 to the score.
- Choose from the end, [-2,7,1], adding 1 * 4 = 4 to the score.
- Choose from the end, [-2,7], adding 7 * 6 = 42 to the score. 
The total score is 50 + 15 - 9 + 4 + 42 = 102.

*/
/**
 * @param {number[]} nums
 * @param {number[]} multipliers
 * @return {number}
 */
/* 
Approach - Top-Down
Time: O(M^2), where M is the length of multiplier array
Space: O(M^2)
Runtime: 1119 ms, faster than 19.82% of JavaScript online submissions for Maximum Score from Performing Multiplication Operations.
Memory Usage: 87.1 MB, less than 28.75% of JavaScript online submissions for Maximum Score from Performing Multiplication Operations.
*/
var maximumScore = function (nums, multipliers) {
  const n = nums.length;
  const m = multipliers.length;
  const memo = [...Array(m)].map((x) => Array(m).fill(null));
  const dp = (i, left) => {
    //finished with elements in multipliers (base case)
    if (i === m) return 0;
    if (memo[i][left] !== null) return memo[i][left];

    const right = n - 1 - (i - left);
    const leftProd = multipliers[i] * nums[left] + dp(i + 1, left + 1);
    const rightProd = multipliers[i] * nums[right] + dp(i + 1, left);

    memo[i][left] = Math.max(leftProd, rightProd);
    return memo[i][left];
  };
  return dp(0, 0);
};

/* 
Approach - Bottom-Up
Time: O(M^2), where M is the length of multiplier array
Space: O(M^2)

Runtime: 325 ms, faster than 93.96% of JavaScript online submissions for Maximum Score from Performing Multiplication Operations.
Memory Usage: 85.8 MB, less than 52.42% of JavaScript online submissions for Maximum Score from Performing Multiplication Operations.
*/
var maximumScore = function (nums, multipliers) {
  const n = nums.length;
  const m = multipliers.length;
  const dp = [...Array(m + 1)].map((x) => Array(m + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    console.log(`i: ${i}`);
    for (let left = i; left >= 0; left--) {
      const right = n - 1 - (i - left);
      console.log(`left: ${left}, right: ${right}`);
      dp[i][left] = Math.max(
        multipliers[i] * nums[left] + dp[i + 1][left + 1],
        multipliers[i] * nums[right] + dp[i + 1][left]
      );
    }
  }
  return dp[0][0];
};
