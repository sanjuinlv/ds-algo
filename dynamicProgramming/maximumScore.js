/* 
1770. Maximum Score from Performing Multiplication Operations
https://leetcode.com/problems/maximum-score-from-performing-multiplication-operations/
Category - Hard

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

Constraints:

n == nums.length
m == multipliers.length
1 <= m <= 10^3
m <= n <= 10^5
-1000 <= nums[i], multipliers[i] <= 1000
*/
/**
 * @param {number[]} nums
 * @param {number[]} multipliers
 * @return {number}
 */
/* 
Solution approach:
At first glance, a greedy approach looks promising. In step i, out of nums[start] and nums[end], we can pick the integer x that maximizes x * multipliers[i].

This greedy approach works well for one of the given examples.

nums = [1,2,3], multipliers = [3,2,1]

Taking Decision
‣ From multipliers, we have 3, nums is [1, 2, 3], from 3 * 1 and 3 * 3, pick 3, add 3 * 3 = 9.
‣ From multipliers, we have 2, nums is [1, 2], from 2 * 1 and 2 * 2, pick 2, add 2 * 2 = 4.
‣ From multipliers, we have 1, nums is [1], add 1 * 1 = 1.

Total Score is 9+4+1=14, which is correct

However, it fails for the second example.

nums = [-5,-3,-3,-2,7,1], multipliers = [-10,-5,3,4,6]

Taking Decision
‣ From multipliers, we have 10, nums is [-5,-3,-3,-2,7,1], from (-10) * (-5) and (-10) * 1, pick -5, add (-10) * (-5) = 50.   
‣ From multipliers, we have -5, nums is [-3,-3,-2,7,1], from (-5) * (-3) and (-5) * 1, pick -3, add (-5) * (-3) = 15.   
‣ From multipliers, we have 3, nums is [-3,-2,7,1], from 3 * (-3) and 3 * 1, pick 1, add 3 * 1 = 3.   
‣ From multipliers, we have 4, nums is [-3,-2,7], from 4 * (-3) and 4 * 7, pick 7, add 4 * 7 = 28.   
‣ From multipliers, we have 6, nums is [-3,-2], from 6 * (-3) and 6 * (-2), pick -2, add 6 * (-2) = -12.   

Total Score is 50+15+3+28+(-12)=84 which isn't optimal.   
102 is Optimal Solution as given in Problem Example.

*/
/* 
Approach - Top-Down
Time: O(2^M*N), where M is the length of multiplier array
Space: O(??)
*/
var maximumScore = function (nums, multipliers) {
  const n = nums.length;
  const m = multipliers.length;
  //memo
  const dp = (i, left) => {
    //finished with elements in multipliers (base case)
    if (i === m) return 0;
    const right = n - 1 - (i - left);
    const leftProduct = multipliers[i] * nums[left] + dp(i + 1, left + 1);
    const rightProduct = multipliers[i] * nums[right] + dp(i + 1, left);
    return Math.max(leftProduct, rightProduct);
  };
  return dp(0, 0);
};

/* 
Approach - Top-Down (with Memoization)
Time: O(M^2), where M is the length of multiplier array
Space: O(M^2)

Runtime: 35 ms Beats 69.57%
Memory Usage: 62.79 MB Beats 83.67%
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
    //gain from left multiplication
    const leftProd = multipliers[i] * nums[left] + dp(i + 1, left + 1);
    //gain from right multiplication, i.e, we don't take left but take right
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

Runtime: 34 ms Beats 73.91%
Memory Usage: 63.74 MB Beats 67.35%
*/
var maximumScore = function (nums, multipliers) {
  const m = multipliers.length;
  const n = nums.length;
  //we need to initialize the dp with one extra row so that we don't go out of
  // bound for 1st iteration
  const dp = [...Array(m + 1)].map((x) => new Array(m + 1).fill(0));
  for (let i = m - 1; i >= 0; i--) {
    for (let left = i; left >= 0; left--) {
      const right = n - 1 - (i - left);
      const leftTaken = dp[i + 1][left + 1];
      const rightTaken = dp[i + 1][left];
      const mult = multipliers[i];
      dp[i][left] = Math.max(
        mult * nums[left] + leftTaken,
        mult * nums[right] + rightTaken
      );
    }
  }
  return dp[0][0];
};
