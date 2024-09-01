/* 
https://leetcode.com/problems/duplicate-zeros/
Type: Easy

Given a fixed-length integer array arr, duplicate each occurrence of zero, 
shifting the remaining elements to the right.
Note that elements beyond the length of the original array are not written. 
Do the above modifications to the input array in place and do not return anything.

Example 1:
Input: arr = [1,0,2,3,0,4,5,0]
Output: [1,0,0,2,3,0,0,4]
Explanation: After calling your function, the input array is modified to: [1,0,0,2,3,0,0,4]

Example 2:
Input: arr = [1,2,3]
Output: [1,2,3]
Explanation: After calling your function, the input array is modified to: [1,2,3]

Constraints:

 - 1 <= arr.length <= 10^4
 - 0 <= arr[i] <= 9

*/
/**
 * @param {number[]} arr
 * @return {void} Do not return anything, modify arr in-place instead.
 */

/* 
Approach I: 
Time: O(N^2)
Space: O(1)
Runtime: 73 ms Beats 29.13%
Memory: 52.30 MB Beats 12.72%
*/
var duplicateZeros = function (arr) {
  const N = arr.length;
  let i = 0;
  let j = 0;
  while (i < N) {
    if (arr[i] == 0) {
      //move all items by one index
      for (let j = N - 1; j > i + 1; j--) {
        arr[j] = arr[j - 1];
      }
      if (i + 1 < N) {
        //add one zero to i+1 index
        arr[i + 1] = 0;
        //move pointer to newly added zero item
        i++;
      }
    }
    i++;
  }
};

/* 
Approach II: Two pointer
Time: O(N)
Space: O(1)
Runtime: 66 ms Beats 52.13%
Memory: 51.56 MB Beats 62.82%
*/
var duplicateZeros = function (arr) {
  const N = arr.length;
  let countZero = 0;
  for (let i = 0; i < N; i++) {
    if (arr[i] == 0) countZero++;
  }
  let len = N + countZero;
  //We just need O(1) space if we scan from back
  //i point to the original array, j point to the new location
  for (let i = N - 1, j = len - 1; i < j; i--, j--) {
    if (arr[i] != 0) {
      if (j < N) arr[j] = arr[i];
    } else {
      if (j < N) arr[j] = arr[i];
      j--;
      if (j < N) arr[j] = arr[i]; //copy twice when hit '0'
    }
  }
};

var duplicateZeros = function (arr) {
  let zeroIndexes = [];
  // Time: O(N)
  let insertAtIndex = function (arr, index, item) {
    if (index > arr.length - 1) return;
    console.log(`index ${index}, item to insert: ${item}`);
    for (let i = arr.length - 2; i >= index; i--) {
      arr[i + 1] = arr[i];
    }
    arr[index] = item;
    console.log(`arr after update: ${JSON.stringify(arr)}`);
  };

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
  zeroIndexes.forEach((idx) => {
    insertAtIndex(arr, idx, 0);
  });
};

// TIME complexity:O(N^2)
// space = O(N)
var duplicateZeros = function (arr) {
  let zeroIndexes = [];
  let insertAtIndex = function (arr, index, item) {
    if (index > arr.length - 1) return;
    for (let i = arr.length - 2; i >= index; i--) {
      arr[i + 1] = arr[i];
    }
    arr[index] = item;
  };

  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] === 0) {
      zeroIndexes.push(zeroIndexes.length + i + 1);
    }
  }
  if (zeroIndexes.length === arr.length) return;
  zeroIndexes.forEach((idx) => {
    insertAtIndex(arr, idx, 0);
  });
};
//arr = [1,0,2,3,0,4,5,0]

// using two pointer solution given by leet code
var duplicateZeros = function (arr) {
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
};
