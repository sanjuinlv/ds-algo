/**
 * Given an array arr, replace every element in that array with the greatest element among the elements to its right, and replace the last element with -1.
    After doing so, return the array.
    Input: arr = [17,18,5,4,6,1]
    Output: [18,6,6,6,1,-1]
    
    Constraint:
    1 <= arr.length <= 10^4
    1 <= arr[i] <= 10^5
 * Solution: Start from the end of the array, keep the max value seen and replace each item with max    
 * @param {number[]} arr
 * @return {number[]}
 */
var replaceElements = function(arr) {
    let max = -1, temp;
    for (let i = arr.length - 1; i >= 0; i--) {
        temp = arr[i];
        arr[i] = max;
        max = Math.max(temp, max);
    }
    return arr;
};