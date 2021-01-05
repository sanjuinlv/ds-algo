/**
Given an array of integers, 1 ≤ a[i] ≤ n (n = size of array), some elements appear twice and others appear once.
Find all the elements that appear twice in this array.
Could you do it without extra space and in O(n) runtime?
Example:
    Input:
    [4,3,2,7,8,2,3,1]

    Output:
    [2,3]
 * @param {number[]} nums
 * @return {number[]}
 */
/* 
Runtime: 112 ms, faster than 79.46% of JavaScript online submissions for Find All Duplicates in an Array.
Memory Usage: 46.4 MB, less than 6.08% of JavaScript online submissions for Find All Duplicates in an Array.
*/
var findDuplicates = function(nums) {
    const N = nums.length - 1;
    const duplicates = [];
    for (let i = 0; i <= N; i++) {
        const newIndex = Math.abs(nums[i]) - 1;
        //already visited item
        if (nums[newIndex] < 0) {
            duplicates.push(Math.abs(nums[i]));
        } else {
            // mark it visited
            nums[newIndex] *= -1;
        }
    }
    return duplicates;
};