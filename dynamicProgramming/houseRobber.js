/* 
You are a professional robber planning to rob houses along a street. 
Each house has a certain amount of money stashed, the only constraint stopping 
you from robbing each of them is that adjacent houses have security system 
connected and it will automatically contact the police if two adjacent houses 
were broken into on the same night.
Given a list of non-negative integers representing the amount of money of each house, 
determine the maximum amount of money you can rob tonight without alerting the police.

Example 1:
Input: nums = [1,2,3,1]
Output: 4
Explanation: Rob house 1 (money = 1) and then rob house 3 (money = 3).
             Total amount you can rob = 1 + 3 = 4.

Example 1:
Input: nums = [2,7,9,3,1]
Output: 12
Explanation: Rob house 1 (money = 2), rob house 3 (money = 9) and rob house 5 (money = 1).
             Total amount you can rob = 2 + 9 + 1 = 12.

Constraint:             
    0 <= nums.length <= 100
    0 <= nums[i] <= 400             
*/
/**
 * @param {number[]} nums
 * @return {number}
 */

/* 
This particular problem and most of others can be approached using the following sequence:

Find recursive relation
Recursive (top-down)
Recursive + memo (top-down)
Iterative + memo (bottom-up)
Iterative + N variables (bottom-up)

Step 1. Figure out recursive relation.
A robber has 2 options: a) rob current house i; b) don't rob current house.
If an option "a" is selected it means she can't rob previous i-1 house but can safely proceed to the one before previous i-2 and gets all cumulative loot that follows.
If an option "b" is selected the robber gets all the possible loot from robbery of i-1 and all the following buildings.
So it boils down to calculating what is more profitable:

 - robbery of current house + loot from houses before the previous
 - loot from the previous house robbery and any loot captured before that

 rob(i) = Math.max( rob(i - 2) + currentHouseValue, rob(i - 1) )

Step 2. Recursive (top-down)
Converting the recurrent relation from Step 1 shound't be very hard.

*/

/* 
Approach 1 - Top Down (Recursive with Memoization)
Time: O(N), Since we process at most N recursive calls, thanks to caching, and during
each of these calls, we make an O(1) computation which is simply making two other
recursive calls, finding their maximum, and populating the cache based on that.
Space: O(N), Cache
Runtime: 111 ms, faster than 22.78% of JavaScript online submissions for House Robber.
Memory Usage: 41.9 MB, less than 38.01% of JavaScript online submissions for House Robber.
*/
var rob = function (nums) {
  const N = nums.length;
  const memo = new Array(N).fill(-1);
  memo[0] = nums[0];
  memo[1] = Math.max(nums[0], nums[1]);
  const dp = (i) => {
    //base case
    if (i <= 1) return memo[i];
    if (memo[i] == -1) {
      //recurrence relation
      memo[i] = Math.max(nums[i] + dp(i - 2), dp(i - 1));
    }
    return memo[i];
  };
  return dp(N - 1);
};

/* 
Approach 2 - Bottom-up (Iterative)
Time: O(N)
Space: O(N)
Runtime: 96 ms, faster than 40.79% of JavaScript online submissions for House Robber.
Memory Usage: 42.1 MB, less than 28.63% of JavaScript online submissions for House Robber.
*/
var rob = function (nums) {
  const N = nums.length;
  const dp = new Array(N);
  //base case
  dp[0] = nums[0];
  dp[1] = Math.max(nums[0], nums[1]);
  for (let i = 2; i < N; i++) {
    dp[i] = Math.max(nums[i] + dp[i - 2], dp[i - 1]);
  }
  return dp[N - 1];
};

/* 
Approach 3 - Bottom-up (Iterative using variables)
Time: O(N)
Space: O(1)
Runtime: 79 ms, faster than 63.31% of JavaScript online submissions for House Robber.
Memory Usage: 41.6 MB, less than 48.29% of JavaScript online submissions for House Robber.
*/
var rob = function (nums) {
  const N = nums.length;
  //base case
  first = nums[0];
  if (N == 1) return first;
  second = Math.max(nums[0], nums[1]);
  for (let i = 2; i < N; i++) {
    third = Math.max(nums[i] + first, second);
    first = second;
    second = third;
  }
  return second;
};
