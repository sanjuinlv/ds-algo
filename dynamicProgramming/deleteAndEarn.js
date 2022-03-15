/* 
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
1 <= nums.length <= 2 * 104
1 <= nums[i] <= 104
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
  let maxNumber = Number.MIN_VALUE;
  const numCountMap = new Map();
  const points = new Map();
  //creat map of number and number * count,
  // e.g., [2,2,2,3,3,3,3] => {2: 6, 3: 12}
  for (let i = 0; i < N; i++) {
    numCountMap.set(nums[i], (numCountMap.get(nums[i]) || 0) + nums[i]);
    maxNumber = Math.max(maxNumber, nums[i]);
  }
  //base case
  points.set(0, 0);
  points.set(1, numCountMap.get(1) || 0);
  const dp = (num) => {
    if (!points.has(num)) {
      const gain = numCountMap.get(num) || 0;
      //recurrence relation
      points.set(num, Math.max(gain + dp(num - 2), dp(num - 1)));
    }
    return points.get(num);
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
