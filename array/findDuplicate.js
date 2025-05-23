/* 
287. Find the Duplicate Number
https://leetcode.com/problems/find-the-duplicate-number/
Category - Medium

Given an array of integers nums containing n + 1 integers where each integer
is in the range [1, n] inclusive.
There is only one repeated number in nums, return this repeated number.
You must solve the problem without modifying the array nums and uses only 
constant extra space.

Example 1:
Input: nums = [1,3,4,2,2]
Output: 2

Example 2:
Input: nums = [3,1,3,4,2]
Output: 3

Example 3:
Input: nums = [3,3,3,3,3]
Output: 3

Constraint:
 - 1 <= n <= 10^5
 - nums.length == n + 1
 - 1 <= nums[i] <= n
 - All the integers in nums appear only once except for precisely one integer 
which appears two or more times.

Follow up:
How can we prove that at least one duplicate number must exist in nums?
Can you solve the problem in linear runtime complexity?
*/
/**
 * @param {number[]} nums
 * @return {number}
 */

/* 
Approach 1: Sort

Time Complexity: O(nlogn)
Sorting takes O(nlogn) time. This is followed by a linear scan, resulting
in a total of O(nlogn) + O(n) = O(nlogn) time.

Space Complexity: O(logn) or O(n)
The space complexity of the sorting algorithm depends on the implementation of each programming language.

Runtime: 430 ms, faster than 5.72% of JavaScript online submissions for Find the Duplicate Number.
Memory Usage: 54.3 MB, less than 41.67% of JavaScript online submissions for Find the Duplicate Number.

*/
var findDuplicate = function (nums) {
  //sort the array
  nums.sort();
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] == nums[i - 1]) {
      return nums[i];
    }
  }
  return -1;
};

/* 
Approach 2: Set
Time: O(N)
Space: O(N)

Runtime: 101 ms, faster than 88.22% of JavaScript online submissions for Find the Duplicate Number.
Memory Usage: 61.1 MB, less than 24.58% of JavaScript online submissions for Find the Duplicate Number.
*/
var findDuplicate = function (nums) {
  const visited = new Set();
  for (let num of nums) {
    if (visited.has(num)) {
      return num;
    }
    visited.add(num);
  }
  return -1;
};

/* 
Approach 3: Negative marking
Time: O(N)
Space: O(1)

Runtime: 64 ms, faster than 88.16% of JavaScript online submissions for Find the Duplicate Number.
Memory Usage: 58.76 MB, less than 58.02% of JavaScript online submissions for Find the Duplicate Number.
*/
var findDuplicate = function (nums) {
  for (let i = 0; i < nums.length; i++) {
    const curr = Math.abs(nums[i]);
    if (nums[curr] < 0) return Math.abs(curr);
    nums[curr] = nums[curr] * -1;
  }
  return -1;
};

/* 
Approach 4: Floyd's Tortoise and Hare (Cycle Detection)

Time Complexity: O(n)
Space Complexity: O(1)

Runtime: 6 ms Beats 85.97%
Memory Usage: 63.14 MB Beats 75.57% 

findDuplicate([1,3,4,2,2])
findDuplicate([3,1,3,4,2])
findDuplicate([2,2,2,2,2])
findDuplicate([2,6,4,1,3,1,5])
findDuplicate([2,5,9,6,9,3,8,9,7,1])
*/
var findDuplicate = function (nums) {
  let tortoise = nums[0];
  let hare = nums[0];
  // Move slow by one step and fast by two steps until they meet
  do {
    tortoise = nums[tortoise];
    hare = nums[nums[hare]];
  } while (hare != tortoise);
  //reset slow to start
  tortoise = nums[0];
  // Move slow and fast one step at a time until they meet again
  while (tortoise != hare) {
    hare = nums[hare];
    tortoise = nums[tortoise];
  }
  // The duplicate number is where slow and fast meet
  return tortoise;
};

/* 
Approach 5: Sum of Set Bits

Let n be the length of nums and m be the bit-length of n.
Time Complexity: O(nlogn)
The outer loop runs a maximum of m times (once for each bit in n). 
The inner loop goes over all n elements in nums, resulting in a total time
 complexity of O(m⋅n).
It is a common misconception to treat m as a constant because it is small and
thus consider this to be a linear time complexity algorithm. 
Setting the problem constraints aside, the value of m depends on n. 
More specifically, m is the bit-length of n which is approximately equal to log2(n).
Thus this algorithm has linearithmic time complexity.

Space Complexity: O(1)
No additional storage is needed (barring a few variables), resulting in a constant O(1) space complexity.

Runtime: 301 ms, faster than 13.87% of JavaScript online submissions for Find the Duplicate Number.
Memory Usage: 67.3 MB, less than 5.00% of JavaScript online submissions for Find the Duplicate Number. 
*/
var findDuplicate = function (nums) {
  const findMaxNum = (nums) => {
    let max = Number.MIN_VALUE;
    for (num in nums) {
      max = Math.max(num, max);
    }
    return max;
  };
  const maxNum = findMaxNum(nums);
  const maxBits = parseInt(Math.log(maxNum) / Math.log(2)) + 1;
  let duplicate = 0;
  //iterate bit by bit
  for (let bit = 0; bit < maxBits; bit++) {
    //check for each numbers
    let baseCount = 0,
      numCount = 0;
    let mask = 1 << bit;
    for (let i = 0; i < nums.length; i++) {
      // If bit is set in number (i) then add 1 to base_count
      if ((i & mask) > 0) {
        baseCount++;
      }
      // If bit is set in nums[i] then add 1 to nums_count
      if ((nums[i] & mask) > 0) {
        numCount++;
      }
    }
    //
    if (numCount > baseCount) {
      duplicate = duplicate | mask;
    }
  }
  return duplicate;
};

