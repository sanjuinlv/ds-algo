/* 
108. Convert Sorted Array to Binary Search Tree
https://leetcode.com/problems/convert-sorted-array-to-binary-search-tree/
Type: Easy

Given an integer array nums where the elements are sorted in ascending order, convert it to a height-balanced binary search tree.
A height-balanced binary tree is a binary tree in which the depth of the two subtrees of every node never differs by more than one.
 
Example 1:
Input: nums = [-10,-3,0,5,9]
Output: [0,-3,9,-10,null,5]
Explanation: [0,-10,5,null,-3,null,9] is also accepted:

Example 1:
Input: nums = [1,3]
Output: [3,1]
Explanation: [1,null,3] and [3,1] are both height-balanced BSTs.

Constraints:
 - 1 <= nums.length <= 10^4
 - -10^4 <= nums[i] <= 10^4
 - nums is sorted in a strictly increasing order.

*/
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
/*
Approach: Recursive (Pre-order)
Time: O(N) since we visit each node exactly once
Space: O(Log N) The recursion stack requires O(logN) space because the tree is height-balanced.

Runtime: 67 ms Beats 51.99%
Memory Usage: 53.22 MB Beats 14.82%
 */
var sortedArrayToBST = function (nums) {
  const arrayToBST = (nums, low, high) => {
    if (low > high) return null;
    if (low === high) return new TreeNode(nums[low]);
    const mid = parseInt(low + (high - low) / 2);
    console.log(`low: ${low}, high:${high}, mid: ${mid}`);
    const node = new TreeNode(nums[mid]);
    node.left = arrayToBST(nums, low, mid - 1);
    node.right = arrayToBST(nums, mid + 1, high);
    return node;
  };
  return arrayToBST(nums, 0, nums.length - 1);
};
