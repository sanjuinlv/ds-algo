/* 
740. Delete and Earn
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
Time: O(N + k) 
To populate points, we need to iterate through nums once, which costs O(N) time. Then, we call maxPoints(maxNumber). This call will repeatedly call maxPoints until we get down to our base cases. Because of cache, already solved sub-problems will only cost O(1) time. Since maxNumber = k, we will solve k unique sub-problems so, this recursion will cost O(k) time. Our final time complexity is O(N+k).

Space: O(N + k)
The extra space we use is the hash table points, the recursion call stack needed to find maxPoints(maxNumber), and the hash table cache.

Runtime: 7 ms Beats 82.86%
Memory Usage: 54.89 MB Beats 13.92%
*/
var deleteAndEarn = function (nums) {
  const points = new Map();
  const memo = new Map();
  let maxNumber = 0;
  for (let num of nums) {
    //create map of number and number * count
    points.set(num, (points.get(num) || 0) + num);
    //keep recording the max number found so far
    maxNumber = Math.max(maxNumber, num);
  }
  //base cases
  //the max gain we can get from 0 is always 0
  memo.set(0, 0);
  //we know that if we arrived at 1, it means that we must not have taken 2,
  //and because 1 times any quantity will be greater than or equal to the number
  //of points we can get from taking 0, we should always take 1 (if there are any).
  memo.set(1, points.get(1) || 0);
  const maxPoints = (x) => {
    if (!memo.has(x)) {
      const gain = points.get(x) || 0;
      const notDeleted = maxPoints(x - 1);
      const deleted = gain + maxPoints(x - 2);
      memo.set(x, Math.max(deleted, notDeleted));
    }
    return memo.get(x);
  };
  return maxPoints(maxNumber);
};


/*
Approach - Bottom up
Time: O(N)
Space: O(N + k) - O(N) space required by Map and O(k) required by dp (max points)

Runtime: 11 ms Beats 64.29%
Memory Usage: 53.28 MB Beats 43.81%
*/
var deleteAndEarn = function (nums) {
  const points = new Map();
  let maxNumber = 0;
  for (let num of nums) {
    //create map of number and number * count
    points.set(num, (points.get(num) || 0) + num);
    //keep recording the max number found so far
    maxNumber = Math.max(maxNumber, num);
  }
  const maxPoints = new Array(maxNumber + 1).fill(0);
  //Base case
  maxPoints[1] = points.get(1) || 0;
  for (let i = 2; i <= maxNumber; i++) {
    const gain = points.get(i) || 0;
    maxPoints[i] = Math.max(maxPoints[i - 1], maxPoints[i - 2] + gain);
  }
  return maxPoints[maxNumber];
};

/* 
Approach - Bottom-Up costance space
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
