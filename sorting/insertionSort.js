/*
 - Insertion Sort is stable sort as we will never swap an element later in the list
with an equal element earlier in the list.
 - Insertion sort is choice of sorting for small arrays (< 15). Java's Array.sort() usage it 
for small array sorting.
 - Also when the number of inversions is small (the list is almost sorted), insertion sort
is quite efficient, since there aren't many insertion operations required.

Best Case: If the array is ascending order, insertion sort makes N-1 compares and 0 exchanges
Worst Case: If the array is ascending order (and no duplicates), insert osrt makes ~1/2*N^2
compares and ~1/2*N^2 echanges.

Time: O (N^2)
Space: O(1)
*/
function insertionSort(arr) {
  const swap = (i, j, A) => {
    [A[i], A[j]] = [A[j], A[i]];
  };
  for (let i = 0; i < arr.length; i++) {
    //until the left element is higher than current element keep swapping
    for (let j = i; j > 0; j--) {
      if (arr[j] < arr[j - 1]) swap(j, j - 1, arr);
      else break;
    }
  }
  console.log(arr);
}

function insertionSort(arr) {
  const N = arr.length;
  const swap = (i, j, A) => {
    [A[i], A[j]] = [A[j], A[i]];
  };
  for (let i = 1; i < N; i++) {
    let j = i;
    //until the left element is higher than current element keep swapping
    while (j > 0 && arr[j] < arr[j - 1]) {
      swap(j, j - 1, arr);
      j--;
    }
  }
  console.log(arr);
}
