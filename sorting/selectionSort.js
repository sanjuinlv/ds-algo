/*
 - Time Complexity: O(N^2)
 - Space Comlexity: O(1)
 - Runtime insensitive to input. Quadratic time, even if input is sorted
 - Data movement is minimal. Linear number of exchanges.
 - Selection Sort is stable sort.

Usage
const arr = [4,2,3,4,1];
selectionSort(arr);
*/

function selectionSort(arr) {
  const N = arr.length;
  let minIndex;
  const swap = (i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  };

  for (let i = 0; i < N; i++) {
    minIndex = i;
    //find the min element index in the array i+1 to N-1
    for (let j = i + 1; j < N; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    //swap the current element and minIndex element
    swap(i, minIndex);
    console.log(arr);
  }
}
