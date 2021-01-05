/**
Type: Easy

Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.
Example 1: 
Input: nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
Output: [1,2,2,3,5,6]

Example 2:
Input: nums1 = [1], m = 1, nums2 = [], n = 0
Output: [1]    

Contraint: 
0 <= n, m <= 200
1 <= n + m <= 200
nums1.length == m + n
nums2.length == n
-109 <= nums1[i], nums2[i] <= 109
*/
/**
 * @param {number[]} nums1
 * @param {number} m - The length of array 1
 * @param {number[]} nums2
 * @param {number} n - The length of array 2
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
//version 1
// Time O(m+n), space O(1)
// version II; simpler
// nums1 = [1,2,3,0,0,0], nums2 = [2,5,6] 
// merge(nums1,3,nums2,3) : PASSED: [1,2,2,3,5,6]
// nums1 = [1,2,3,3,5,7,0,0,0,0], nums2 = [2,4,9,10]
// merge(nums1,6,nums2,4) : PASSED => [1,2,2,3,3,4,5,7,9,10]
// nums1 = [2,2,2,0,0,0], nums2 = [2,2,2]
// merge(nums1,3,nums2,3) : PASSED => [2,2,2,2,2,2]
// nums1 = [-1,-2,-3,0,0,0], nums2 = [2,2,2]
// merge(nums1,3,nums2,3) : PASSED => [-1,-2,-3,2,2,2]
// nums1 = [0,0,0,0,0,0], nums2 = [2,2,2]
// merge(nums1,3,nums2,3) : PASSED => [0,0,0,2,2,2]
// nums1 = [-1,0,1,1,0,0,0,0,0], nums2 = [-1,0,2,2,3]
// merge(nums1,4,nums2,5) : PASSED: [-1,-1,0,0,1,1,2,2,3]
// Accepted
// Runtime: 76 ms
// Memory Usage: 37.1 MB
var merge = function(nums1, m, nums2, n) {
    let j = 0;
    let i = 0;
    while (i < m + n && j < n) {
        // reached beyond the last element of first array
        if (i >= m + j) {
            break;
        }
        if (nums2[j] < nums1[i]) {
            nums1.splice(i, 0, nums2[j]);
            nums1.pop();
            j++;
        }
        i++;
    }
    //COPY the items which are not copied from second array
    while (j < n) {
        nums1[i++] = nums2[j++];
    }
    console.log(`updated nums1: ${JSON.stringify(nums1)}`);
};

// With Two pointers / Start from the end Approach
// nums1 = [2,2,2,0,0,0], nums2 = [0,0,0]
// merge(nums1,3,nums2,3): PASSED 
// Time complexity: O(m+n)
// Space: O(1)
var merge = function(nums1, m, nums2, n) {
    let p1 = m - 1, p2 = n - 1, p = m + n - 1;
    while ((p1 >= 0) && (p2 >= 0)) {
        nums1[p--] = nums1[p1] < nums2[p2] ? nums2[p2--] : nums1[p1--];
    }
    // copy remaining items from nums2
    for (let i = 0; i < p2 + 1; i++) {
        nums1[i] = nums2[i];
    }
};

// From other submitter. 
// using in built function
var merge = function(nums1, m, nums2, n) {
    nums2.forEach((num, i) => {
        nums1[i + m] = num;
    });
    nums1.sort((a, b) => a - b);
};

/* 
2nd try (4-Jan-21)

Runtime: 72 ms, faster than 94.99% of JavaScript online submissions for Merge Sorted Array.
Memory Usage: 38.9 MB, less than 23.35% of JavaScript online submissions for Merge Sorted Array.
*/
var merge = function(nums1, m, nums2, n) {
    let p1 = m - 1, p2 = n - 1, curr = m + n - 1;
    while(p1 < m && p2 < n){
        if (nums2[p2] >= nums1[p1]){
            nums1[curr--] = nums2[p2--];
        } else {
            nums1[curr--] = nums1[p1--];
        }
    }
    //copy remaining from p2
    while(p2 > 0) {
        nums1[curr--] = nums2[p2--];
    }
};

nums1 = [1,2,3,0,0,0], m = 3, 
nums2 = [2,5,6], n = 3