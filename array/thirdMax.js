/* 
https://leetcode.com/problems/third-maximum-number/
Type: Easy
Given an integer array nums, return the third distinct maximum number in this array. If the third maximum does not exist, return the maximum number.

Example 1:
Input: nums = [3,2,1]
Output: 1
Explanation:
The first distinct maximum is 3.
The second distinct maximum is 2.
The third distinct maximum is 1.

Example 2:
Input: nums = [1,2]
Output: 2
Explanation:
The first distinct maximum is 2.
The second distinct maximum is 1.
The third distinct maximum does not exist, so the maximum (2) is returned instead.

Example 3:
Input: nums = [2,2,3,1]
Output: 1
Explanation:
The first distinct maximum is 3.
The second distinct maximum is 2 (both 2's are counted together since they have the same value).
The third distinct maximum is 1.
 
Constraints:

- 1 <= nums.length <= 10^4
 - -2^31 <= nums[i] <= 2^31 - 1
 

Follow up: Can you find an O(n) solution?
*/

/* 
Approach I: Using Set and Sorting
Time: O(N*LogN)
Space: O(N)

Runtime: 69 ms Beats 9.40%
Memory: 51.71 MB Beats 16.43%
*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var thirdMax = function (nums) {
  const N = nums.length;
  const unique = new Set();
  for (const num of nums) {
    if (!unique.has(num)) unique.add(num);
  }
  const uniqueArr = Array.from(unique);
  uniqueArr.sort((a, b) => a - b);
  //return 3rd maximum
  if (uniqueArr.length >= 3) return uniqueArr[uniqueArr.length - 3];
  //else maximum
  else return uniqueArr[uniqueArr.length - 1];
};

/* 
Approach II: Priority Queue + Set

Time: O(N)
We iterate on nums array and can push each element in the min heap and hash set once.
Time taken to push and pop elements from min heap depends on number of elements in the heap (or height of the heap), and as here the heap will have at most three elements in it, those operations are considered constant time operations.
Thus, overall it takes O(N) time.

Space: O(1)
Both the min heap and hashset will only have at most three elements in them thus, it is considered as constant space usage.

Runtime: 74 ms Beats 6.95%
Memory: 55.26 MB Beats 5.72%
*/
var thirdMax = function (nums) {
  const minPQ = new MinPriorityQueue();
  const visited = new Set();
  for (const num of nums) {
    if (visited.has(num)) continue;
    //if min heap already has 3 item, pop the smallest if the current number is greater
    if (minPQ.size() == 3) {
      if (minPQ.front().element < num) {
        visited.delete(minPQ.front().element);
        minPQ.dequeue();
        minPQ.enqueue(num);
        //add to set as well
        visited.add(num);
      }
    } else {
      minPQ.enqueue(num);
      //add to set as well
      visited.add(num);
    }
  }
  //if minPQ has 3 element then front is 3rd largest number
  if (minPQ.size() === 3) return minPQ.front().element;
  else {
    //remove from PQ until one item is left
    while (minPQ.size() > 1) minPQ.dequeue();
    return minPQ.front().element;
  }
};
/**
Approach III: Using Set only 
Time Complexity : O(n).
For each of the n values in the input Array, we insert it into a Set 
for a cost of O(1). We then sometimes find and remove the minimum of the Set. 
Because there are never more than 3 items in the Set, the time complexity of doing 
this is O(1).
In total, we're left with O(n).
Space Complexity : O(1).
Because maximums never holds more than 3 items at a time, it is considered to be constant O(1).

Runtime: 84 ms, faster than 44.55% of JavaScript online submissions for Third Maximum Number.
Memory Usage: 41.2 MB, less than 6.43% of JavaScript online submissions for Third Maximum Number.
 */
var thirdMax = function (nums) {
  const seen = new Set();
  const findMin = function (arr) {
    let min = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] < min) min = arr[i];
    }
    return min;
  };
  const findMax = function (arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
      if (arr[i] > max) max = arr[i];
    }
    return max;
  };
  for (let num of nums) {
    seen.add(num);
    // if there are more than three elements then remove the min
    if (seen.size > 3) {
      seen.delete(findMin([...seen]));
    }
  }
  //return the 3rd max
  if (seen.size === 3) {
    return findMin([...seen]);
  }
  // less than 3 elements, return the max of elements
  return findMax([...seen]);
};

/* 
Approach IV: 3 Pointers
Time: O(N)
Space: O(1): We only used three extra variables.

Runtime: 52 ms Beats 75.55%
Memory: 50.57 MB Beats 80.78%
*/
var thirdMax = function (nums) {
  let firstMax = Number.NEGATIVE_INFINITY;
  let secondMax = Number.NEGATIVE_INFINITY;
  let thirdMax = Number.NEGATIVE_INFINITY;
  for (const num of nums) {
    //if num is already used, we skip it
    if (firstMax == num || secondMax == num || thirdMax === num) continue;
    // If current number is greater than first maximum,
    // It means that this is the greatest number and first maximum and second max
    // will become the next two greater numbers.
    if (firstMax <= num) {
      thirdMax = secondMax;
      secondMax = firstMax;
      firstMax = num;
    }
    // When current number is greater than second maximum,
    // it means that this is the second greatest number.
    else if (secondMax <= num) {
      thirdMax = secondMax;
      secondMax = num;
    }
    // It is the third greatest number.
    else if (thirdMax <= num) {
      thirdMax = num;
    }
  }
  if (thirdMax == Number.NEGATIVE_INFINITY) return firstMax;
  return thirdMax;
};
