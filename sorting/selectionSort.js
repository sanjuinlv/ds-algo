/*
Time Complexity: O(N^2)
 */
/* 
const arr = [4,2,3,4,1];
selectionSort(arr);
*/
function selectionSort(arr) {
  const N = arr.length;
  let minIndex;
  for (let i = 0; i < N; i++) {
    minIndex = i;
    //find the min element index in the array i+1 to N-1
    for (let j = i + 1; j < N; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
      }
    }
    //swap the current element and minIndex element
    const temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
    console.log(arr);
  }
}
