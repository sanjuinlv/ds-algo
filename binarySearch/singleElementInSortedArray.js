/* 
540. Single Element in a Sorted Array
https://leetcode.com/problems/single-element-in-a-sorted-array
Type: Medium

You are given a sorted array consisting of only integers where every element appears exactly twice, except for one element which appears exactly once.

Return the single element that appears only once.

Your solution must run in O(log n) time and O(1) space.

Example 1:
Input: nums = [1,1,2,3,3,4,4,8,8]
Output: 2

Example 2:
Input: nums = [3,3,7,7,10,11,11]
Output: 10

Constraints:
 - 1 <= nums.length <= 10^5
 - 0 <= nums[i] <= 10^5
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
/* 
Approach I: Brute Force
Starting with the first element, we iterate over every 2nd element, checking whether or not the next element is the same as the current. If it's not, then we know this must be the single element.
If we get as far as the last element, we know that it must be the single element. We need to treat it as a special case after the loop, because otherwise we'll be going over the end of the array.
*/
var singleNonDuplicate = function (nums) {
  const N = nums.length;
  for (let i = 0; i < N - 1; i += 2) {
    if (nums[i] !== nums[i + 1]) return nums[i];
  }
  return nums[N - 1];
};

/* 
Approach II : Odd, even index
[1,1,2,3,3,4,4,8,8]
The idea is the numbers are paired in (even, odd) index to the left of single element
and (odd,even) to the right of single element. We can use this property to perform
binary search to locate the element

Runtime: 0 ms Beats 100.00%
Memory: 56.66 MB Beats 81.52%
*/
var singleNonDuplicate = function (nums) {
  const N = nums.length;
  if (N == 1) return nums[0];
  //check if first and second item is same
  if (nums[0] != nums[1]) return nums[0];
  //check last two items of the array. This will save us with boundar coindition check
  if (nums[N - 1] != nums[N - 2]) return nums[N - 1];
  let lo = 1;
  let hi = N - 2;
  while (lo <= hi) {
    const mid = lo + Math.floor((hi - lo) / 2);
    //check if this is single element
    if (nums[mid] !== nums[mid - 1] && nums[mid] !== nums[mid + 1])
      return nums[mid];
    //if mid is odd index and mid element is equal to mid-1 or
    //mid is even index and mid element is equal to mid+1 then single
    //element is towards right
    if (
      (mid % 2 == 1 && nums[mid] == nums[mid - 1]) ||
      (mid % 2 == 0 && nums[mid] == nums[mid + 1])
    ) {
      lo = mid + 1;
    } else {
      //we are in right side, go left
      hi = mid - 1;
    }
  }
  //no match found
  return -1;
};

//Fails
var singleNonDuplicate = function (nums) {
  const N = nums.length;
  if (N == 1) return nums[0];
  let lo = 0;
  let hi = N - 1;
  while (lo <= hi) {
    if (lo == hi) return nums[lo];
    const mid = lo + Math.floor((hi - lo) / 2);
    //mid is equal to mid-1
    if (nums[mid] == nums[mid - 1]) {
      //if length between mid - lo is even that means single elment is in left
      if ((mid - lo) % 2 == 0) hi = mid - 2;
      else lo = mid + 2;
    } else {
      //if length between hi - lo is even that means single elment is in right
      if ((hi - mid) % 2 == 0) lo = mid + 2;
      else hi = mid - 2;
    }
  }
};
