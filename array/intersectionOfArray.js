/*
Given two arrays, write a function to compute their intersection.

Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2]

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [9,4]

Note:
    - Each element in the result must be unique.
    - The result can be in any order.
 */
/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
/*
Approach 1: Using hashtable
Time complexity: O(n + m)
Space Complexity: O(min(n,m)) 
Runtime: 84 ms, faster than 51.95% of JavaScript online submissions for Intersection of Two Arrays.
Memory Usage: 39.4 MB, less than 63.06% of JavaScript online submissions for Intersection of Two Arrays.
 */
var intersection = function(nums1, nums2) {
    if (nums1.length > nums2.length) {
        return intersection(nums2, nums1);
    }
    let set = new Set();
    let k = 0;
    for (let i = 0; i < nums1.length; i++){
        set.add(nums1[i]);
    }
    for (let i = 0; i < nums2.length; i++){
        if (set.has(nums2[i])){
            nums1[k++] = nums2[i];
            set.delete(nums2[i]);
        }
    }
    return nums1.slice(0, k);
};