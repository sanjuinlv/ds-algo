/* 
Given an array of integers nums and an integer k, return the total number of continuous 
subarrays whose sum equals to k.

Input: nums = [1,1,1], k = 2
Output: 2

Input: nums = [1,2,3], k = 3
Output: 2

Constraints:

1 <= nums.length <= 2 * 104
-1000 <= nums[i] <= 1000
-107 <= k <= 107

*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
// nums = [2,3,2,3,3,5,6],  k=5
// nums = [1,1,1,1,2,3,1,1,2],  k=3
// nums = [1,1,1], k=2
// nums = [1,2,3], k=3
// nums = [-1,1,0,2,3,-2,1,1], k=0
// Fails for input nums = [0,0,0], k=0. Expected output 6, but this one gives 3
var subarraySum = function(nums, k) {
    const N = nums.length;
    let noOfSums = 0;
    let kSum = 0;
    let i = 0, j = 0;
    while (i < N && j < N) {
        console.log(`i: ${i}, j: ${j}`);
        kSum += nums[j];
        console.log(`kSum: ${kSum}`);
        //sum is equal to k
        if (kSum === k) {
            noOfSums++;
            j++;
            console.log(`noOfSums: ${noOfSums}`);
            // sum is greater than k            
        } else if (kSum > k) {
            kSum = 0;
            i++;
            j = i; // start over again (can we optimize it?)
        } else {// sum is less than k
            j++;
        }
    }
    console.log(`noOfSums: ${noOfSums}`);
    return noOfSums;
};

// From Solution
// Without space and O(N^2) time complexity
var subarraySum = function(nums, k) {
    const N = nums.length;
    let count = 0;
    for (let start = 0; start < N; start++) {
        let sum = 0;
        for (let end = start; end < N; end++) {
            sum += nums[end];
            if (sum == k) count++;
        }
    }
    return count;
}


// Using hashmap
// Time complexity: O(N)
// Space complexity: O(N)
/* 
Runtime: 112 ms, faster than 69.93% of JavaScript online submissions for Subarray Sum Equals K.
Memory Usage: 46 MB, less than 12.75% of JavaScript online submissions for Subarray Sum Equals K.
*/
/* 
The idea behind this approach is as follows: If the cumulative sum(repreesnted by sum[i]sum[i] for 
sum upto i th index) upto two indices is the same, the sum of the elements lying in between those 
indices is zero. Extending the same thought further, if the cumulative sum upto two indices, say i and j 
is at a difference of k i.e. if sum[i] - sum[j] = ksum[i]−sum[j]=k, the sum of elements lying between 
indices i and j is k.
Based on these thoughts, we make use of a hashmap map which is used to store the cumulative sum upto all 
the indices possible along with the number of times the same sum occurs. We store the data in the 
form: (sum_i, no. of occurences of sum_i). We traverse over the array nums and keep on finding the 
cumulative sum. Every time we encounter a new sum, we make a new entry in the hashmap corresponding to 
that sum. If the same sum occurs again, we increment the count corresponding to that sum in the hashmap. 
Further, for every sum encountered, we also determine the number of times the sum sum-k has occured already, 
since it will determine the number of times a subarray with sum kk has occured upto the current index. 
We increment the count by the same amount.
After the complete array has been traversed, the count gives the required result
*/
var subarraySum = function(nums, k) {
    const N = nums.length;
    let count = 0, sum = 0;
    const countMap = new Map();
    for (let i = 0; i < N; i++) {
        sum += nums[i];
        if (sum == k) count++;
        if (countMap.has(sum - k)) {
            count += countMap.get(sum - k);
        }
        countMap.set(sum, (countMap.get(sum) || 0) + 1);
    }
    return count;
}