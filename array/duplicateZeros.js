/**
 * @param {number[]} arr
 * @return {void} Do not return anything, modify arr in-place instead.
 * Note: 
 * 1 <= arr.length <= 10000
 * 0 <= arr[i] <= 9
 */
var duplicateZeros = function(arr) {
    let zeroIndexes = [];
    // Time: O(N)
    let insertAtIndex = function(arr, index, item) {
        if (index > arr.length - 1) return;
        console.log(`index ${index}, item to insert: ${item}`);
        for (let i = arr.length - 2; i >= index; i--) {
            arr[i + 1] = arr[i];
        }
        arr[index] = item;
        console.log(`arr after update: ${JSON.stringify(arr)}`);
    }

    //capture the index of all zeros
    // Time complexity: O(N)
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === 0) {
            //the duplicate zero index is next index from current zero 
            // with additional duplicate index sizes
            zeroIndexes.push(zeroIndexes.length + i + 1);
        }
    }

    // if all entries are zeros then no change required
    if (zeroIndexes.length === arr.length) return;
    // for each zero insert the zero at next index
    // Time complexity: O(N^2)
    zeroIndexes.forEach(idx => {
        insertAtIndex(arr, idx, 0);
    })
};
// TIME complexity:O(N^2)
// space = O(N)

var duplicateZeros = function(arr) {
    let zeroIndexes = [];
    let insertAtIndex = function(arr, index, item) {
        if (index > arr.length - 1) return;
        for (let i = arr.length - 2; i >= index; i--) {
            arr[i + 1] = arr[i];
        }
        arr[index] = item;
    }

    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === 0) {
            zeroIndexes.push(zeroIndexes.length + i + 1);
        }
    }
    if (zeroIndexes.length === arr.length) return;
    zeroIndexes.forEach(idx => {
        insertAtIndex(arr, idx, 0);
    })
};
//arr = [1,0,2,3,0,4,5,0]

// using two pointer solution given by leet code
var duplicateZeros = function(arr) {
    //count the number of duplicate zero
    let duplicateZeros = 0;
    for (let i = 0; i < arr.length - 1; i++) {
        if (arr[i] === 0) duplicateZeros++;
    }
    if (duplicateZeros === 0) return;
    //now move element items and duplicate item with value zero
    let copyTo = arr.length - 1;
    let copyFrom = copyTo - duplicateZeros;
    // console.log(`copyFrom: ${copyFrom}, copyTo: ${copyTo}`);
    while (copyFrom >= 0) {
        console.log(`copyFrom: ${copyFrom}, copyTo: ${copyTo}`);
        console.log(`item to copy: ${arr[copyFrom]}`);
        if (arr[copyFrom] === 0) {
            arr[copyTo--] = arr[copyFrom--];
            arr[copyTo--] = 0;
        } else if (copyFrom == 0 && arr[copyFrom !== 0]) {
            arr[copyTo--] = arr[copyFrom--];
        }
        console.log(`arr: ${JSON.stringify(arr)}`);
    }
    console.log(`final arr: ${JSON.stringify(arr)}`);
}
// solution by other folks
const duplicateZeros = arr => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === 0) {
            arr.splice(++i, 0, 0);
            arr.pop();
        }
    }
};
