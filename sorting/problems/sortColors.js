/* 
75. Sort Colors
https://leetcode.com/problems/sort-colors/
Type: Medium

Given an array nums with n objects colored red, white, or blue, sort them in-place so that
objects of the same color are adjacent, with the colors in the order red, white, and blue.

We will use the integers 0, 1, and 2 to represent the color red, white, and blue, respectively.

You must solve this problem without using the library's sort function.
 
Example 1:
  Input: nums = [2,0,2,1,1,0]
  Output: [0,0,1,1,2,2]

Example 2:
  Input: nums = [2,0,1]
  Output: [0,1,2]

Constraints:
 - n == nums.length
 - 1 <= n <= 300
 - nums[i] is either 0, 1, or 2.
 
*/
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/* 
Approach I : Two pass counting sort
Time: O(N)
Space: O(N)

Runtime: 0 ms Beats 100.00%
Memory Usage: 53.72 MB Beats 14.74%
*/
var sortColors = function (nums) {
  const countMap = new Map();
  for (let num of nums) {
    countMap.set(num, (countMap.get(num) || 0) + 1);
  }
  const colors = [0, 1, 2];
  let k = 0;
  for (let color of colors) {
    let colorCount = countMap.get(color);
    while (colorCount > 0) {
      nums[k++] = color;
      colorCount--;
    }
  }
};

/* 
Same as above but using array instead of map for color coding
Time: O(N)
Space: O(1)

Runtime: 55 ms Beats 46.18%
Memory: 48.82 MB Beats 71.45%
*/
var sortColors = function (nums) {
  const N = nums.length;
  //find count of each color
  const colors = [0, 0, 0];
  for (let i = 0; i < N; i++) {
    colors[nums[i]]++;
  }
  //pointer to update the value
  let k = 0;
  //loop through all colors
  for (let i = 0; i < 3; i++) {
    //color counts
    for (j = 0; j < colors[i]; j++) {
      //fill color
      nums[k++] = i;
    }
  }
};

/* 
Approach II: One pass (cleaner code)
The problem is known as Dutch National Flag Problem and first was proposed by Edsger W. Dijkstra.
The idea is to attribute a color to each number and then to arrange them following the
order of colors on the Dutch flag.
Algorithm:
1. Initialize three pointers:
 - low = 0
 - mid = 0
 - high = n - 1 (where n is the length of the array)
2. Traverse the array using the mid pointer, and perform the following steps:
 - If arr[mid] == 0:
   - Swap arr[low] and arr[mid].
   - Increment both low and mid.
 - If arr[mid] == 1:
  - Simply move mid forward by 1.
 - If arr[mid] == 2:
    - Swap arr[mid] and arr[high].
    - Decrement high.
    - Do not increment mid, because the element swapped from the end may still need to be processed.
3. Continue this process until mid exceeds high.

Runtime: 1 ms Beats 27.92%
Memory Usage: 53.62 MB Beats 16.78%
*/
var sortColors = function (nums) {
  //pointer for 0's (Red)
  let red = 0;
  //pointer for 1's (White)
  let white = 0;
  //pointer for 2's (Blue)
  let blue = nums.length - 1;
  const swap = (i, j, arr) => { 
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  //iterate until white pointer is less than blue pointer
  while (white <= blue) {
    //red encountered, swap it with white pointer
    if (nums[white] == 0) {
      swap(red++, white++, nums);
    } else if (nums[white] == 2) {
      //white pointer is blue, swap with latest unclassified element
      swap(white, blue--, nums);
    } else {
      //if the pointer is already white then its in correction position, we just move pointer
      white++;
    }
  }
};
