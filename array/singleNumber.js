/*
Type: Easy
Given a non-empty array of integers nums, every element appears twice except for one. 
Find that single one.
Follow up: Could you implement a solution with a linear runtime complexity and without 
using extra memory?

Example 1:
Input: nums = [2,2,1]
Output: 1

Example 2:
Input: nums = [4,1,2,1,2]
Output: 4

Example 3:
Input: nums = [1]
Output: 1

Constraint:
1 <= nums.length <= 3 * 104
-3 * 104 <= nums[i] <= 3 * 104
Each element in the array appears twice except for one element which appears only once.

 */
/**
 * @param {number[]} nums
 * @return {number}
 */
/*
Approach 1: using extra space
Time complexity O(N)
Space complexity: O(N)
nums = [2,2,1] -  PASS
nums = [4,1,2,1,2] - PASS
nums = [1] - PASS
Runtime: 88 ms
Memory Usage: 43.2 MB
Your runtime beats 73.74 % of javascript submissions.
Your memory usage beats 44.41 % of javascript submissions.
 */
var singleNumber = function(nums) {
    const countMap = new Map();
    //create number and its count map 
    for (let i = 0; i< nums.length; i++){
        countMap.set(nums[i], (countMap.get(nums[i]) || 0) + 1);
    }
    //look up for number having count only 1
    for (let i = 0; i < nums.length; i++){
        if (countMap.get(nums[i]) == 1) return nums[i];
    }
};
//variant of above
var singleNumber = function(nums) {
    const set = new Set();
    //create number and its count map 
    for (let i = 0; i< nums.length; i++){
        if (set.has(nums[i])){
            set.delete(nums[i]);
        } else {
            set.add(nums[i])
        }
    }
    return Array.from(set)[0];
};

/*
Approach 1: without using extra space
i) sort the array (time complexity: O(N Log N), space: O(1) -heap sort)
ii) loop through the items and compare current and next items, if
they don't match then current item is not duplicate.
Time complexity O(N Log N)
Space complexity: O(1)
[2,2,1] -> [1,2,2]
[4,1,2,1,2] -> [1,1,2,2,4]
nums = [2,2,1] -  PASS
nums = [4,1,2,1,2] - PASS
nums = [1] - PASS

Runtime: 100 ms
Memory Usage: 41.7 MB
Your runtime beats 39.97 % of javascript submissions.
Your memory usage beats 60.84 % of javascript submissions.
 */
var singleNumber = function(nums) {
    const N = nums.length;
    if (N == 1) return nums[0];
    nums = nums.sort();
    for (let i = 0; i < N; i = i + 2){
        //reached at the end, without finding single num
        if (i == N -1) return nums[i];
        if (nums[i] != nums[i + 1]) return nums[i];
    }   
};

// 
/* 
Approach 3: using Math
Concept:  2 ∗ (a+b+c) − (a+a+b+b+c) = c
i) We can add up all entries representing sumOfNums = (a+a+b+b+c)
ii) if element is not present in Set add it to set and then keep adding num 
to create unique sum of numbers to represet: setSum = (a+b+c)
return 2 * setSum - sumOfNums
Time complexity O(NN)
Space complexity: O(N)


Java code from solution:
class Solution {
  public int singleNumber(int[] nums) {
    int sumOfSet = 0, sumOfNums = 0;
    Set<Integer> set = new HashSet();

    for (int num : nums) {
      if (!set.contains(num)) {
        set.add(num);
        sumOfSet += num;
      }
      sumOfNums += num;
    }
    return 2 * sumOfSet - sumOfNums;
  }
}
*/


/*
Approach 4: Bit Manipulation
Concept

If we take XOR of zero and some bit, it will return that bit
a ⊕ 0 = a
If we take XOR of two same bits, it will return 0
a ⊕ a = 0
a ⊕ b ⊕ a = (a ⊕ a) ⊕ b = 0 ⊕ b = b
So we can XOR all bits together to find the unique number.
class Solution {
  public int singleNumber(int[] nums) {
    int a = 0;
    for (int i : nums) {
      a ^= i;
    }
    return a;
  }
}
 */