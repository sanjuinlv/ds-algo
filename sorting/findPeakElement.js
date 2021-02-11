/* 
A peak element is an element that is strictly greater than its neighbors.
Given an integer array nums, find a peak element, and return its index. 
If the array contains multiple peaks, return the index to any of the peaks.

You may imagine that nums[-1] = nums[n] = -∞.

Example 1:
Input: nums = [1,2,3,1]
Output: 2
Explanation: 3 is a peak element and your function should return the index number 2.

Example 2:
Input: nums = [1,2,1,3,5,6,4]
Output: 5
Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.

Constraints:
1 <= nums.length <= 1000
-231 <= nums[i] <= 231 - 1
nums[i] != nums[i + 1] for all valid i.

*/
/**
 * @param {number[]} nums
 * @return {number}
 */
/* 
Approach: Brute Force (Linear)
Time Complexity: O(N)
Space Complexity: O(1)

Runtime: 80 ms, faster than 58.62% of JavaScript online submissions for Find Peak Element.
Memory Usage: 38.3 MB, less than 90.86% of JavaScript online submissions for Find Peak Element.
*/
var findPeakElement = function(nums) {
    const N = nums.length;
    for (let i = 0; i < N; i++){
        //nums[i-1] < nums[i] < nums[i+1]
        const prev = i == 0 ? Number.NEGATIVE_INFINITY: nums[i-1];
        const next = i == N - 1 ? Number.NEGATIVE_INFINITY: nums[i + 1];
        if (prev < nums[i] && nums[i] > next){
            return i;
        }
    }
    return -1;
};

//Solution reference
/* 
Case 1. All the numbers appear in a descending order. In this case, the first element
corresponds to the peak element. We start off by checking if the current element is 
larger than the next one. The first element satisfies this criteria, and is hence 
identified as the peak correctly. In this case, we didn't reach a point where we needed 
to compare nums[i] with nums[i-1] also, to determine if it is the peak element or not.

case 2: All the elements appear in ascending order. In this case, we keep on comparing nums[i]
with nums[i+1] to determine if nums[i] is the peak element or not. None of the elements 
satisfy this criteria, indicating that we are currently on a rising slope and not on a 
peak. Thus, at the end, we need to return the last element as the peak element, which 
turns out to be correct. In this case also, we need not compare nums[i] with nums[i-1], 
since being on the rising slope is a sufficient condition to ensure that nums[i] isn't 
the peak element.

case 3: The peak appears somewhere in the middle. In this case, when we are traversing
on the rising edge, as in Case 2, none of the elements will satisfy nums[i] > nums[i + 1].
We need not compare nums[i] with nums[i-1] on the rising slope as discussed above. When 
we finally reach the peak element, the condition nums[i] > nums[i + 1] is satisfied. 
We again, need not compare nums[i] with nums[i-1]. This is because, we could reach nums[i]
as the current element only when the check nums[i] > nums[i + 1] failed for the previous 
(i-1)th element, indicating that nums[i-1] < nums[i]. Thus, we are able to identify the 
peak element correctly in this case as well.
*/
var findPeakElement = function(nums) {
    const N = nums.length;
    for (let i = 0; i < N - 1; i++){
        //nums[i] > nums[i+1]
        if (nums[i] > nums[i+1]){
            return i;
        }
    }
    return -1;
};

/* 
Approach II: Recursive Binary Search
Time Complexity: O(log N)
Space Complexity: O(log N) (recursive call stack)
*/
var findPeakElement = function(nums) {
    const N = nums.length;
    const search = (lo, hi) => {
        //we are left with only one element which means all other check has failed, 
        // or there is only one element in array
        if (lo == hi) return lo;
        const mid = lo + parseInt((hi - lo) / 2);
        //mid is on descending slope
        if (nums[mid] > nums[mid + 1]){
            //look into left side, as peak will be in left side
            return search(lo, mid);
        } else {//mid is descending slope
            //look into right side, as peak will be on right side
            return search(mid + 1, hi);
        }
    }
    return search(0, N - 1);
};


/* 
Approach III: Iterative Binary Search
Time Complexity: O(log N)
Space Complexity: O(1) (recursive call stack)

Runtime: 80 ms, faster than 58.62% of JavaScript online submissions for Find Peak Element.
Memory Usage: 38.8 MB, less than 35.34% of JavaScript online submissions for Find Peak Element.
*/
var findPeakElement = function(nums) {
    const N = nums.length;
    let lo = 0, hi = N -1;
    while (lo < hi){
        const mid = lo + parseInt((hi - lo) / 2);
        //mid is on descending slope
        if (nums[mid] > nums[mid + 1]){
            //the peak must be on left side
            hi = mid;
        } else {//mid is on ascending slope
            //the peak must be on right side
            lo = mid + 1;
        }
    }
    return lo;
};


