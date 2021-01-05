/**
Time Complexity : O(n).
For each of the n values in the input Array, we insert it into a Set 
for a cost of O(1). We then sometimes find and remove the minimum of the Set. 
Because there are never more than 3 items in the Set, the time complexity of doing 
this is O(1).
In total, we're left with O(n).
Space Complexity : O(1).
Because maximums never holds more than 3 items at a time, it is considered to be constant O(1).
 * @param {number[]} nums
 * @return {number}
 */
/*
nums = [1] => 1 - Passed
nums = [1,2] => 2 - Passed
nums = [1,2,3] => 1 - Passed
nums = [1,1,2,2,3] => 1 - Passed
nums = [12, 3, 8, 9, 12, 12, 7, 8, 12, 4, 3, 8, 1] => 8  -  Passed
*/
var thirdMax = function(nums) {
    console.log(`nums: ${nums}`);
    const seen = new Set();
    const findMin = function(arr) {
        let min = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < min) min = arr[i]
        }
        return min;
    }
    const findMax = function(arr) {
        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) max = arr[i];
        }
        return max;
    }
    for (let num of nums) {
        // console.log(`num: ${num}`);
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

// for submission
/*
Runtime: 84 ms, faster than 44.55% of JavaScript online submissions for Third Maximum Number.
Memory Usage: 41.2 MB, less than 6.43% of JavaScript online submissions for Third Maximum Number.
 */
var thirdMax = function(nums) {
    const seen = new Set();
    const findMin = function(arr) {
        let min = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] < min) min = arr[i]
        }
        return min;
    }
    const findMax = function(arr) {
        let max = arr[0];
        for (let i = 1; i < arr.length; i++) {
            if (arr[i] > max) max = arr[i];
        }
        return max;
    }
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