/*  Given an array nums and a value val, remove all instances of that value in-place
    and return the new length. Do not allocate extra space for another array,
    you must do this by modifying the input array in -place with O(1) extra memory.
    The order of elements can be changed.It doesn't matter what you leave beyond the new length.
*/
//Exp1
/*
Given nums = [3,2,2,3], val = 3,
Your function should return length = 2, with the first two elements of nums being 2.
It doesn't matter what you leave beyond the returned length.
*/
//Exp2
/*
Given nums = [0,1,2,2,3,0,4,2], val = 2,
Your function should return length = 5, with the first five elements of nums containing 0, 1, 3, 0, and 4.
Note that the order of those five elements can be arbitrary.
It doesn't matter what values are set beyond the returned length.
*/

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
// nums = [0,1,2,2,3,0,4,2], val = 2  => Passed
// removeElement(nums, val)
// nums = [3,2,2,3], val = 3        => Passed
// nums = [0,0,2,3], val = 0        => Passed
var removeElement = function (nums, val) {
  let currentPointer = 0,
    insertPointer = 0;
  while (currentPointer < nums.length) {
    if (nums[currentPointer] == val) {
      currentPointer++;
    } else {
      nums[insertPointer++] = nums[currentPointer++];
    }
  }
  console.log(`insertPointer: ${insertPointer}`);
  console.log(`the updated array: ${nums}`);
  return insertPointer;
};

//For submission
// Time complexity: O(n)
// Space complexity: O(1)
// Runtime: 68 ms
// Memory Usage: 36.7 MB
// Your runtime beats 95.24 % of javascript submissions.
var removeElement = function (nums, val) {
  let currentPointer = 0;
  let insertPointer = 0;
  while (currentPointer < nums.length) {
    if (nums[currentPointer] == val) {
      currentPointer++;
    } else {
      nums[insertPointer++] = nums[currentPointer++];
    }
  }
  return insertPointer;
};

/**
Approach 2: Two Pointers - when elements to remove are rare
Intuition
Now consider cases where the array contains few elements to remove. 
For example, nums = [1,2,3,5,4], val = 4.
The previous algorithm will do unnecessary copy operation of the first four elements. 
Another example is nums = [4,1,2,3,5], val = 4. It seems unnecessary to move elements [1,2,3,5]
one step left as the problem description mentions that the order of elements could be changed.
Algorithm
When we encounter nums[i] = val, we can swap the current element out with the last element
and dispose the last one. This essentially reduces the array's size by 1.
Note that the last element that was swapped in could be the value you want to remove itself.
But don't worry, in the next iteration we will still check this element.

Runtime: 73 ms, faster than 65.71% of JavaScript online submissions for Remove Element.
Memory Usage: 42.1 MB, less than 47.36% of JavaScript online submissions for Remove Element.
 */
var removeElement = function (nums, val) {
  let i = 0;
  let n = nums.length;
  while (i < n) {
    if (nums[i] == val) {
      nums[i] = nums[n - 1];
      // reduce array size by one
      n--;
    } else {
      i++;
    }
  }
  return n;
};

//12/Jun/2022;
/* 
Runtime: 88 ms, faster than 38.24% of JavaScript online submissions for Remove Element.
Memory Usage: 42 MB, less than 69.89% of JavaScript online submissions for Remove Element.
*/
var removeElement = function (nums, val) {
  let k = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] == val) continue;
    //cop element only when i & k are different
    if (i !== k) {
      console.log(`copying ${i}`);
      nums[k++] = nums[i];
    } else {
      k++;
    }
  }
  return k;
};
