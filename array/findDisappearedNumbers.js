/**
Given an array of integers where 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.
Find all the elements of [1, n] inclusive that do not appear in this array.
Could you do it without extra space and in O(n) runtime? You may assume the returned list does not count as extra space.
Example: 
    Input:
    [4,3,2,7,8,2,3,1]

    Output:
    [5,6]
Approach:
We will be negating the numbers seen in the array and use the sign of each of the 
numbers for finding our missing numbers. We will be treating numbers in the array
as indices and mark corresponding locations in the array as negative.
 * @param {number[]} nums
 * @return {number[]}
 */
// nums = [4,3,2,7,8,2,3,1]
/* 
Runtime: 108 ms, faster than 88.79% of JavaScript online submissions for Find All Numbers Disappeared in an Array.
Memory Usage: 46.9 MB, less than 6.71% of JavaScript online submissions for Find All Numbers Disappeared in an Array.
*/
var findDisappearedNumbers = function(nums) {
    const N = nums.length;
    for (let i = 0; i <= N; i++) {
        const index = Math.abs(nums[i]) - 1;
        //if the element is not visited then mark it visited
        if (nums[index] > 0) {
            nums[index] *= -1;
        }
    }
    let missing = [];
    for (let i = 0; i <= N; i++) {
        if (nums[i] > 0) {
            missing.push(i + 1);
        }
    }
    return missing;
};