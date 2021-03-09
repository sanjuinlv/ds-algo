/* 
Type: Medium

Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? 
Find all unique triplets in the array which gives the sum of zero.
Notice that the solution set must not contain duplicate triplets.

Input: nums = [-1,0,1,2,-1,-4]
Output: [[-1,-1,2],[-1,0,1]]

Input: nums = []
Output: []

Input: nums = [0]
Output: []


Constraints:
0 <= nums.length <= 3000
-105 <= nums[i] <= 105

*/
/**
 * Medium
 * @param {number[]} nums
 * @return {number[][]}
 */
/* 
Brute Force
Time Complexity: O(N ^ 3)
Space Complexity: O(1)
This will produce duplicate results: [[-1,0,1],[-1,2,-1],[0,1,-1]]
*/
var threeSum = function(nums) {
    const result  = []
    const N = nums.length;
    const target = 0;
    for(let i = 0; i < N; i++){
        for(let j = i + 1; j < N; j++){
            for(let k = j + 1; k < N; k++){
                if (nums[i] + nums[j] + nums[k] == target) {
                    result.push([nums[i], nums[j], nums[k]]);
                }
            }
        }
    }
    return result;
}

// Brrute force with Map
// Lets assume the sum of triplet is K, so a+b+c = K
// or a+b = K-c
// Approach is to create sum of all possible pairs of numbers, i.e,, a+b, a+c, b+c and store in a Map
// then look in the map if there exist any entry in map with value =K-nums[i] 
// The above solution gives duplicate entries for input: [-1,0,1,2,-1,-4]
/*
0: [-1, 2, -1]
1: [0, 1, -1]
2: [1, 0, -1]
3: [2, 2, -4]
4: [-1, 2, -1]
*/
var threeSum = function(nums) {
    const K = 0;
    const N = nums.length;
    const sumMap = new Map();
    result = [];
    for (let i = 0; i < N; i++) {
        for (let j = i + 1; j < N; j++) {
            const pairSum = nums[i] + nums[j];
            // the same pairSum can override another one
            // this problem can be resolved by storing value in linked list for same key
            sumMap.set(pairSum, [nums[i], nums[j]]);
        }
    }
    console.log(sumMap);
    for (let i = 0; i < N; i++) {
        const lookupValue = K - nums[i];
        console.log(`lookup value: ${lookupValue}`);
        if (sumMap.has(lookupValue)) {
            const match = [nums[i], ...sumMap.get(lookupValue)];
            // console.log(`match: ${match}, match length: ${match.length}`);
            console.log(`updated match: ${match}`)
            result.push(match);
        }
    }
    console.log(`result: ${result}`);
    return result;
};

// With hint
// generates duplicate
/*
[[-1, 1, 0],[0, 1, -1],[1, 0, -1],[2, -1, -1]]
*/
var threeSum = function(nums) {
    const N = nums.length;
    const K = 0;
    const result = [];
    // x + y + z = K
    //create a new array with K-A[i] (K-z)
    const Z = [nums.length];
    for (let i = 0; i < N; i++) {
        Z[i] = K - nums[i];
    }
    console.log(`Z: ${Z}`);
    // perform two sum
    const seen = new Set();
    for (let i = 0; i < N; i++) {
        if (seen.has(Z[i])) continue;
        const map = new Map();
        for (let j = 0; j < N; j++) {
            console.log(`i: ${i}, j: ${j}`);
            if (i == j) continue;
            const compliment = Z[i] - nums[j];
            console.log(`compliment: ${compliment}`);
            if (map.has(compliment)) {
                console.log(`compliment: ${compliment} found in map`);
                console.log(`3 sum found for: i:${i}, j:${j}, k:${map.get(compliment)}`);
                result.push([nums[i], nums[j], nums[map.get(compliment)]]);
                seen.add(Z[i]);
                console.log(`updated result: ${result}`);
                break;
            }
            map.set(nums[j], j);
        }
    }
    console.log(`result: ${result}`);
    return result;
}

// Solution reference
// Approach I: Two pointers
/* 
Time complexity: O(N^2) 
Sorting Array: O(NLogN) 
twoSum is O(N) and we call it N times so its O(N^2)
total complexity: O(NlogN+ N^2) = O(N^2)
Space complexity: O(logN) to O(N) based on sorting algorithm 
*/
// We can take twoSumSort approach and using two pointer
// nums = [-1,0,1,2,-1,-4]
var threeSum = function(nums) {
    const N = nums.length;
    //sort the array (NLogN)
    nums = nums.sort((a, b) => a - b);
    console.log(`nums: ${nums}`);
    const result = [];
    for (let pivot = 0; pivot < N; pivot++) {
        let left = pivot + 1;
        let right = N - 1;
        if (pivot > 0 && nums[pivot] == nums[pivot - 1]) continue;
        const target = -1 * nums[pivot];
        console.log(`pivot: ${pivot}, pivot value: ${nums[pivot]} `);
        while (left < right) {
            console.log(`left: ${left}, value: ${nums[left]}, rigth: ${right}, value: ${nums[right]}`);
            const sum = nums[left] + nums[right];
            console.log(`sum: ${sum}`);
            // 3 sum found
            if (sum == target) {
                console.log(`match found`);
                console.log(`pivot: ${pivot}, left: ${left}, right: ${right}`);
                result.push([-target, nums[left], nums[right]]);
                console.log(`result: ${result}`);
                // move the pivot pointer and reset left and right pointer
                left++;
                right--;
            } else if (sum > target) {
                right--;
            } else {
                left++;
            }
        }
    }
    console.log(`final result: ${result}`);
    return result;
}

/* for submission (cleaner code)
Time complexity: O(N^2) 
Sorting Array: O(NLogN) 
twoSum is O(N) and we call it N times so its O(N^2)
total complexity: O(NlogN+ N^2) = O(N^2)
Space complexity: O(logN) to O(N) based on sorting algorithm 

Runtime: 136 ms, faster than 96.49% of JavaScript online submissions for 3Sum.
Memory Usage: 48.8 MB, less than 6.20% of JavaScript online submissions for 3Sum.
*/
var threeSum = function(nums) {
    const twoSumSorted = (nums, i, result) => {
        let left = i + 1;
        let right = nums.length - 1;
        while (left < right) {
            const sum = nums[i] + nums[left] + nums[right];
            if (sum == 0) {
                result.push([nums[i], nums[left], nums[right]]);
                //move the pointer to look up other combination
                left++;
                right--;
                // Increment left pointer while the next value is the same as before to avoid duplicates in the result.
                while (left < right && nums[left] == nums[left - 1])
                    left++;
            } else if (sum > 0) {
                right--;
            } else {
                left++;
            }
        }
    }
    const N = nums.length;
    //sort the array
    nums = nums.sort((a, b) => a - b);
    const result = [];
    //If the current value is greater than zero, break from the loop. Remaining values cannot sum to zero.
    for (let i = 0; i < nums.length && nums[i] <= 0; i++) {
        //If the current value is the same as the one before, skip it.
        if (i == 0 || nums[i] != nums[i - 1]) {
            twoSumSorted(nums, i, result);
        }
    }
    return result;
}

// Approach 2: Hashset
/*
Time complexity: O(N ^ 2)
Sorting Array: O(NLogN)
twoSum is O(N) and we call it N times so its O(N ^ 2)
total complexity: O(NlogN + N ^ 2) = O(N ^ 2)
Space complexity: O(N) for hashset
*/

var threeSum = function(nums) {
    const twoSum = (nums, i, result) => {
        const seen = new Set();
        for (let j = i + 1; j < nums.length; j++) {
            // a + b + c = k (=0) => a + b = k - c = 0 - c = -c;
            // we are getting c from index i (nums[i]). So we need to solve the two sum for a+b and target as -c
            // so a = -c - b, i.e, a = -nums[i] - nums[j];
            const compliment = -nums[i] - nums[j];
            if (seen.has(compliment)) {
                result.push([nums[i], nums[j], compliment]);
                // Increment the pointer while the next value is the same as before to avoid duplicates in the result.
                while (j + 1 < nums.length && nums[j] == nums[j + 1])
                    j++;
            }
            seen.add(nums[j])
        }
    }
    const N = nums.length;
    //sort the array
    nums = nums.sort((a, b) => a - b);
    const result = [];
    //If the current value is greater than zero, break from the loop. Remaining values cannot sum to zero.
    for (let i = 0; i < nums.length && nums[i] <= 0; i++) {
        //If the current value is the same as the one before, skip it.
        if (i == 0 || nums[i] != nums[i - 1]) {
            twoSum(nums, i, result);
        }
    }
    return result;
}

// Approach 3: "No Sort"
// nums = [-1,0,1,2,-1,-4]
// This solution produces the duplicate result. 
// Java has easy way to declare the result as Set and store the value as sorted values so that duplicates are removed
/* 
0: (3) [-1, 0, 1]
1: (3) [-1, -1, 2]
2: (3) [-1, 0, 1]
*/
var threeSum = function(nums) {
    const N = nums.length;
    const result = [];
    // checks if we are not re-visiting the same number again
    const dups = new Set();
    const seen = new Map();
    //If the current value is greater than zero, break from the loop. Remaining values cannot sum to zero.
    for (let i = 0; i < nums.length; i++) {
        //If the current value is the same as the one before, skip it.
        console.log(`i: ${i}`);
        if (dups.has(nums[i])) continue;
        dups.add(nums[i]);
        for (let j = i + 1; j < nums.length; j++) {
            // a + b + c = k (=0) => a + b = k - c = 0 - c = -c;
            // we are getting c from index i (nums[i]). So we need to solve the two sum for a+b and target as -c
            // so a = -c - b, i.e, a = -nums[i] - nums[j];
            console.log(`i: ${i}, j: ${j}`);
            const compliment = -nums[i] - nums[j];
            console.log(`compliment: ${compliment}`);
            if (seen.has(compliment) && seen.get(compliment) == i) {
                result.push([nums[i], nums[j], compliment].sort());
                console.log(`result: ${result}`);
            }
            seen.set(nums[j], i);
            console.log(seen);
        }
        console.log(`dup sets`);
        console.log(dups);
    }
    console.log(`final result: ${result}`);
    return result;
}

/* 
Brute Force:
Time Complexity: O(N ^ 3)
Space Complexity: O(1)
This will produce duplicate results: [[-1,0,1],[-1,2,-1],[0,1,-1]]
*/
var threeSum = function(nums) {
    const result  = []
    const N = nums.length;
    const target = 0;
    for(let i = 0; i < N; i++){
        for(let j = i + 1; j < N; j++){
            for(let k = j + 1; k < N; k++){
                if (nums[i] + nums[j] + nums[k] == target) {
                    result.push([nums[i], nums[j], nums[k]]);
                }
            }
        }
    }
    return result;
}