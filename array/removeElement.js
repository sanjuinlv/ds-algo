/* 
https://leetcode.com/problems/remove-element/description/
Type: Easy

Given an integer array nums and an integer val, remove all occurrences of val in 
nums in-place. The order of the elements may be changed. Then return the number 
of elements in nums which are not equal to val.

Consider the number of elements in nums which are not equal to val be k, to get 
accepted, you need to do the following things:

Change the array nums such that the first k elements of nums contain the elements which are not equal to val. The remaining elements of nums are not important as well as the size of nums.
Return k.

Custom Judge:

The judge will test your solution with the following code:

int[] nums = [...]; // Input array
int val = ...; // Value to remove
int[] expectedNums = [...]; // The expected answer with correct length.
                            // It is sorted with no values equaling val.

int k = removeElement(nums, val); // Calls your implementation

assert k == expectedNums.length;
sort(nums, 0, k); // Sort the first k elements of nums
for (int i = 0; i < actualLength; i++) {
    assert nums[i] == expectedNums[i];
}

If all assertions pass, then your solution will be accepted.


Example 1:
Input: nums = [3,2,2,3], val = 3
Output: 2, nums = [2,2,_,_]
Explanation: Your function should return k = 2, with the first two elements of nums being 2.
It does not matter what you leave beyond the returned k (hence they are underscores).

Example 2:
Input: nums = [0,1,2,2,3,0,4,2], val = 2
Output: 5, nums = [0,1,4,0,3,_,_,_]
Explanation: Your function should return k = 5, with the first five elements of nums containing 0, 0, 1, 3, and 4.
Note that the five elements can be returned in any order.
It does not matter what you leave beyond the returned k (hence they are underscores).

Constraints:
 - 0 <= nums.length <= 100
 - 0 <= nums[i] <= 50
 - 0 <= val <= 100

*/

/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 */
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
  let j = nums.length - 1;
  while (i <= j) {
    if (nums[i] == val) {
      nums[i] = nums[j];
      // reduce array size by one
      j--;
    } else {
      i++;
    }
  }
  return j + 1;
};

/*
Approach 3: Two pointer with slight variance to above
This approach will only swap element when required
Time: O(N)
Space: O(1)

Runtime: 51 ms Beats 69.63% 
Memory: 48.91 ms Beats 56.00% 
*/
var removeElement = function (nums, val) {
  const N = nums.length;
  let i = 0;
  let j = N - 1;
  while (i <= j) {
    if (nums[i] == val) {
      //move towards right until we find a number to swap, which is other than val
      while (j >= i && nums[j] == val) j--;
      //swap this number to ith position
      if (i < j) nums[i] = nums[j--];
    }
    i++;
  }
  return j + 1;
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
    //copy element only when i & k are different
    if (i !== k) {
      nums[k++] = nums[i];
    } else {
      k++;
    }
  }
  return k;
};
