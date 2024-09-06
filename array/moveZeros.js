/**
https://leetcode.com/problems/move-zeroes
Type: Easy
Given an integer array nums, move all 0's to the end of it while maintaining the relative order of the non-zero elements.
Note that you must do this in-place without making a copy of the array.

Example 1:
Input: nums = [0,1,0,3,12]
Output: [1,3,12,0,0]

Example 2:
Input: nums = [0]
Output: [0]

Constraints:
 - 1 <= nums.length <= 10^4
 - -2^31 <= nums[i] <= 2^31 - 1

Follow up: Could you minimize the total number of operations done?
*/

/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */

/*
Time complexity: O(N)
Space: O(N)

Runtime: 80 ms
Memory Usage: 38.6 MB
Your runtime beats 82.25 % of javascript submissions.
Your memory usage beats 38.61 % of javascript submissions.
*/
var moveZeroes = function (nums) {
  const N = nums.length;
  let i = 0;
  let j = 0;
  while (i < N) {
    if (nums[i] !== 0) {
      if (i === j) j++;
      else nums[j++] = nums[i];
    }
    i++;
  }
  while (j < N) {
    nums[j++] = 0;
  }
};

// Using pointer with swap approach
/* 
The total number of operations of the previous approach is sub-optimal. 
For example, the array which has all (except last) leading zeroes: [0, 0, 0, ..., 0, 1].
How many write operations to the array? For the previous approach, it writes 0's n−1 times, 
which is not necessary. We could have instead written just once.
 How? ..... By only fixing the non-0 element,i.e., 1.
The optimal approach is again a subtle extension of above solution. 
A simple realization is if the current element is non-0, its' correct position 
can at best be it's current position or a position earlier. 
If it's the latter one, the current position will be eventually occupied by a non-0 ,
or a 0, which lies at a index greater than 'cur' index. 
We fill the current position by 0 right away,so that unlike the previous solution, 
we don't need to come back here in next iteration.

Time: O(N)
Space: O(1)

Runtime: 69 ms Beats 83.41%
Memory: 53.76 MB Beats 78.28%

*/
var moveZeroes = function (nums) {
  //slow pointer
  let i = 0;
  const N = nums.length;
  for (let j = 0; j < N; j++) {
    if (nums[j] != 0) {
      //swap elements
      let temp = nums[i];
      nums[i++] = nums[j];
      nums[j] = temp;
    }
  }
};

/*
nums = [0,1,0,3,12] - PASS
nums = [1,1,0,0,2,3] - PASS

Runtime: 84 ms
Memory Usage: 40.2 MB
Your runtime beats 80.37 % of javascript submissions.
Your memory usage beats 64.94 % of javascript submissions.
 */
var moveZeroes = function (nums) {
  let N = nums.length;
  let i = 0,
    j = 0,
    zeroCount = 0;
  while (j < N && i < N) {
    if (nums[j] == 0) {
      zeroCount += 1;
      j++;
    } else {
      //copy j value to i
      if (i != j) nums[i] = nums[j];
      i++;
      j++;
    }
  }
  //fill the zeros
  if (zeroCount > 0) {
    for (let i = N - zeroCount; i < N; i++) {
      nums[i] = 0;
    }
  }
};


/* 
without using zeroCount variable
Runtime: 80 ms
Memory Usage: 40.4 MB
Your runtime beats 92.10 % of javascript submissions.
Your memory usage beats 48.50 % of javascript submissions.
*/
var moveZeroes = function (nums) {
  let N = nums.length;
  //slow pointer
  let i = 0;
  //fast pointer
  let j = 0;
  while (j < N) {
    if (nums[j] != 0) {
      //copy item at index j to index i
      if (i != j) nums[i] = nums[j];
      i++;
    }
    j++;
  }
  //fill the zeros
  while (i < N) {
    nums[i++] = 0;
  }
};

//9-Sep-2021
/**
 Runtime: 79 ms, faster than 75.03% of JavaScript online submissions for Move Zeroes.
 Memory Usage: 40.5 MB, less than 42.56% of JavaScript online submissions for Move Zeroes.
 */
var moveZeroes = function (nums) {
  const N = nums.length;
  let i = 0;
  let j = 0;
  while (j < N) {
    if (nums[j] != 0) {
      if (i != j) {
        nums[i] = nums[j]; //copy non zero value
        nums[j] = 0; // set copied value as 0
      }
      i++;
    }
    j++;
  }
  return nums;
};

/* 
18/Jun/2022
Optimal swap solution
Runtime: 98 ms, faster than 88.43% of JavaScript online submissions for Move Zeroes.
Memory Usage: 46.6 MB, less than 59.65% of JavaScript online submissions for Move Zeroes.
*/
var moveZeroes = function (nums) {
  let i = 0;
  //find first index of zero
  while (i < nums.length && nums[i] !== 0) i++;
  for (let j = i; j < nums.length; j++) {
    //swap non-zero with zero
    if (nums[j] !== 0) {
      nums[i++] = nums[j];
      nums[j] = 0;
    }
  }
};

/* 
//Sep 1, 2024
Time: O(N^2 ?), since we move the i pointer again from j this can turn out to be expensive
Space: O(1)
Runtime: 111 ms Beats 10.71%
Memory: 54.10 MB Beats 63.74%
*/
var moveZeroes = function (nums) {
  const N = nums.length;
  //pointer to track non '0'
  let i = 0;
  //insert pointer
  let j = 0;
  while (j < N && i < N) {
    //find the '0' element index
    while (j < N && nums[j] !== 0) j++;
    i = j;
    //find non '0' to swap
    while (i < N && nums[i] == 0) i++;
    //swap element to zero index
    if (i != j && i < N) {
      nums[j] = nums[i];
      nums[i] = 0;
    }
    j++;
  }
};
