/* 
https://leetcode.com/problems/delete-and-earn/
Category - Medium

You are given an integer array nums. You want to maximize the number of points
you get by performing the following operation any number of times:

Pick any nums[i] and delete it to earn nums[i] points. Afterwards, you must
delete every element equal to nums[i] - 1 and every element equal to nums[i] + 1.
Return the maximum number of points you can earn by applying the above operation
 some number of times.

Example 1:
Input: nums = [3,4,2]
Output: 6
Explanation: You can perform the following operations:
- Delete 4 to earn 4 points. Consequently, 3 is also deleted. nums = [2].
- Delete 2 to earn 2 points. nums = [].
You earn a total of 6 points.

Example 2:
Input: nums = [2,2,3,3,3,4]
Output: 9
Explanation: You can perform the following operations:
- Delete a 3 to earn 3 points. All 2's and 4's are also deleted. nums = [3,3].
- Delete a 3 again to earn 3 points. nums = [3].
- Delete a 3 once more to earn 3 points. nums = [].
You earn a total of 9 points.

Constraint:
1 <= nums.length <= 2 * 10^4
1 <= nums[i] <= 10^4
*/
/**
 * @param {number[]} nums
 * @return {number}
 */

/*
Approach - Top Down
Time: O(N)
Space: O(N)

Runtime: 91 ms, faster than 69.03% of JavaScript online submissions for Delete and Earn.
Memory Usage: 46.5 MB, less than 13.83% of JavaScript online submissions for Delete and Earn.
*/
var deleteAndEarn = function (nums) {
  const N = nums.length;
  let maxNumber = 0;
  const numCountMap = new Map();
  const points = new Map();
  //create map of number and number * count,
  // e.g., [2,2,2,3,3,3,3] => {2: 6, 3: 12}
  for (let i = 0; i < N; i++) {
    numCountMap.set(nums[i], (numCountMap.get(nums[i]) || 0) + nums[i]);
    maxNumber = Math.max(maxNumber, nums[i]);
  }
  //base cases
  //the max gain we can get from 0 is always 0
  points.set(0, 0);
  //we know that if we arrived at 1, it means that we must not have taken 2,
  //and because 1 times any quantity will be greater than or equal to the number
  //of points we can get from taking 0, we should always take 1 (if there are any).
  points.set(1, numCountMap.get(1) || 0);
  const dp = (num) => {
    if (points.has(num)) return points.get(num);
    const gain = numCountMap.get(num) || 0;
    //recurrence relation
    totalGain = Math.max(gain + dp(num - 2), dp(num - 1));
    points.set(num, totalGain);
    return totalGain;
  };
  return dp(maxNumber);
};

/*
Approach - Bottom up
Time: O(N)
Space: O(N+k) - O(N) space required by Map and O(k) required by dp (max points)
Runtime: 87 ms, faster than 73.14% of JavaScript online submissions for Delete and Earn.
Memory Usage: 45.3 MB, less than 26.17% of JavaScript online submissions for Delete and Earn.
 */
var deleteAndEarn = function (nums) {
  const N = nums.length;
  let maxNumber = Number.MIN_VALUE;
  const numCountMap = new Map();
  //creat map of number and number * count,
  // e.g., [2,2,2,3,3,3,3] => {2: 6, 3: 12}
  for (let i = 0; i < N; i++) {
    numCountMap.set(nums[i], (numCountMap.get(nums[i]) || 0) + nums[i]);
    maxNumber = Math.max(maxNumber, nums[i]);
  }
  const dp = new Array(maxNumber);

  //base case
  dp[0] = 0;
  dp[1] = numCountMap.get(1) || 0;
  for (i = 2; i <= maxNumber; i++) {
    const gain = numCountMap.get(i) || 0;
    dp[i] = Math.max(gain + dp[i - 2], dp[i - 1]);
  }
  return dp[maxNumber];
};

/* 
Approach - Bottom up
Time: O(N)
Space: O(N) - The O(N) space required by Map

Runtime: 60 ms, faster than 99.54% of JavaScript online submissions for Delete and Earn.
Memory Usage: 44.4 MB, less than 51.89% of JavaScript online submissions for Delete and Earn.
*/
var deleteAndEarn = function (nums) {
  const N = nums.length;
  let maxNumber = Number.MIN_VALUE;
  const numCountMap = new Map();
  //creat map of number and number * count,
  // e.g., [2,2,2,3,3,3,3] => {2: 6, 3: 12}
  for (let i = 0; i < N; i++) {
    numCountMap.set(nums[i], (numCountMap.get(nums[i]) || 0) + nums[i]);
    maxNumber = Math.max(maxNumber, nums[i]);
  }
  //base case
  first = 0;
  second = numCountMap.get(1) || 0;
  for (i = 2; i <= maxNumber; i++) {
    const gain = numCountMap.get(i) || 0;
    third = Math.max(gain + first, second);
    first = second;
    second = third;
  }
  return second;
};
