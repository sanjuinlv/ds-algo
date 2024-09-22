/*
Counting sort
key assumption in the below version of counting sort is that the minimum possible
value in the array is 0 (no negative numbers) and the maximum value is some positive
integer K. If this is not the case, it's possible to perform a mapping step at the
beginning and then remap the values to the original array at the end. For example,
an array with values between -5 and 10 can be mapped to values between 0 and 15,
perform counting sort, and then remap to the original -5 to 10 range.

Time Complexity: O(N+K), where N is size of input array and K is max value in the array.
Space: O(K)
 */
/* 
Sorts an array of integers where minimum value is 0 and maximum value is K
let arr = [5,4,5,5,1,1,3]
countingSort(arr);
*/
function countingSort(arr) {
  //1. find the max of the array;
  let K = Math.max(...arr);
  //2. create counting array
  const counts = new Array(K + 1).fill(0);
  for (let num of arr) counts[num]++;
  console.log(counts);
  //2. create start index
  // we now overwrite our original counts with the starting index
  // of each element in the final sorted array
  let startingIndex = 0;
  for (let i = 0; i <= K; i++) {
    const count = counts[i];
    counts[i] = startingIndex;
    startingIndex += count;
  }
  const sortedArray = new Array(arr.length);
  for (let num of arr) {
    sortedArray[counts[num]] = num;
    counts[num]++;
  }
  return sortedArray;
}

/* 
Handle negative values
arr = [-5,4,-5,6,1,10,3]
countingSort(arr);
*/
function countingSort(arr) {
  //1. find the max of the array;
  const shift = Math.min(...arr);
  const K = Math.max(...arr) - shift;
  console.log(`shift: ${shift}, K after shift: ${K}`);
  //2. create counting array
  const counts = new Array(K + 1).fill(0);
  for (let num of arr) counts[num - shift]++;
  console.log(counts);
  //2. create start index
  // we now overwrite our original counts with the starting index
  // of each element in the final sorted array
  let startingIndex = 0;
  for (let i = 0; i <= K; i++) {
    const count = counts[i];
    counts[i] = startingIndex;
    startingIndex += count;
  }
  const sortedArray = new Array(arr.length);
  for (let num of arr) {
    sortedArray[counts[num - shift]] = num;
    counts[num - shift]++;
  }
  return sortedArray;
}

let arr = [3,6,9,1]
countingSort(arr);