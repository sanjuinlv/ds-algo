/* 
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

n == nums.length
1 <= n <= 300
nums[i] is either 0, 1, or 2.
 
*/
/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
/* 
Approach: Two pass counting sort
Time: O(N)
Space: O(N)
Runtime: 63 ms, faster than 91.31% of JavaScript online submissions for Sort Colors.
Memory Usage: 41.6 MB, less than 97.23% of JavaScript online submissions for Sort Colors.
*/
var sortColors = function (nums) {
  const countMap = new Map();
  for (let i = 0; i < nums.length; i++) {
    countMap.set(nums[i], (countMap.get(nums[i]) || 0) + 1);
  }
  const colorOrder = [0, 1, 2];
  let k = 0;
  for (let color of colorOrder) {
    const colorCount = countMap.get(color);
    while (colorCount > 0) {
      nums[k++] = color;
      colorCount--;
    }
  }
};

/* 
Approach: One pass
The problem is known as Dutch National Flag Problem and first was proposed by Edsger W. Dijkstra.
The idea is to attribute a color to each number and then to arrange them following the
order of colors on the Dutch flag.

Time: O(N)
Space: O(1)
Runtime: 108 ms, faster than 13.93% of JavaScript online submissions for Sort Colors.
Memory Usage: 41.7 MB, less than 88.91% of JavaScript online submissions for Sort Colors.
*/
var sortColors = function (nums) {
  //pointer for 0's
  let p0 = 0;
  //pointer for 1's
  let curr = 0;
  //pointer for 2's
  let p2 = nums.length - 1;
  while (curr <= p2) {
    //0 encountered, swap it with p0 pointer
    if (nums[curr] == 0) {
      const temp = nums[p0];
      nums[p0++] = nums[curr];
      nums[curr++] = temp;
    } else if (nums[curr] == 2) {
      const temp = nums[p2];
      nums[p2--] = nums[curr];
      nums[curr] = temp;
    } else {
      curr++;
    }
  }
};

/* 
Approach: One pass (cleaner code)
Runtime: 68 ms, faster than 81.00% of JavaScript online submissions for Sort Colors.
Memory Usage: 42.3 MB, less than 30.09% of JavaScript online submissions for Sort Colors.
*/
var sortColors = function (nums) {
  //pointer for 0's
  let p0 = 0;
  //pointer for 1's
  let curr = 0;
  //pointer for 2's
  let p2 = nums.length - 1;

  const swap = (i, j, arr) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };

  while (curr <= p2) {
    //0 encountered, swap it with p0 pointer
    if (nums[curr] == 0) {
      swap(p0++, curr++, nums);
    } else if (nums[curr] == 2) {
      swap(curr, p2--, nums);
    } else {
      curr++;
    }
  }
};
