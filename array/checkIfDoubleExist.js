/**
 * @param {number[]} arr
 * @return {boolean}
 */
// arr = [10,2,5,3] => PASSED
// checkIfExist(arr)
// arr = [7,1,14,11] => PASSED
// arr = [3,1,7,11]
var checkIfExist = function(arr) {
    const doubleMap = new Map();
    for (let i = 0; i < arr.length; i++) {
        if (doubleMap.has(arr[i] * 2) || doubleMap.has(arr[i] / 2)) {
            return true;
        } else {
            doubleMap.set(arr[i], i);
        }
        console.log(doubleMap);
    }
    return false;
};

// for submission
/*  
    Runtime: 72 ms
    Memory Usage: 37.6 MB
    Your runtime beats 91.57 % of javascript submissions.
    Your memory usage beats 35.62 % of javascript submissions.
*/
var checkIfExist = function(arr) {
    const doubleMap = new Map();
    for (let i = 0; i < arr.length; i++) {
        if (doubleMap.has(arr[i] * 2) || doubleMap.has(arr[i] / 2)) {
            return true;
        } else {
            doubleMap.set(arr[i], i);
        }
    }
    return false;
};

// Using Set
var checkIfExist = function(arr) {
    const seen = new Set();
    for (let i = 0; i < arr.length; i++) {
        // we should also exclude any entry which half return decimal value as that wont be present in array.
        // E.g. 13/2= 6.5. There wont be any entry with this value so its not worth to look for in set.
        if (seen.has(arr[i] * 2) || arr[i] % 2 == 0 && seen.has(arr[i] / 2)) {
            return true;
        } else {
            seen.add(arr[i]);
        }
    }
    return false;
}