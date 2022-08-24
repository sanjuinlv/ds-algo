/*
Insertion Sort is stable sort as we will never swap an element later in the list
with an equal element earlier in the list.
Insertion sort is choice of sorting for small arrays (< 15). Java's Array.sort() usage it 
for small array sorting.
Also when the number of inversions is small (the list is almost sorted), insertion sort
is quite efficient, since there aren't many insertion operations required.

Time: O (N^2)
Space: O(1)
*/
function insertionSort(arr) {
  const N = arr.length;
  const swap = (i, j, A) => {
    [A[i], A[j]] = [A[j], A[i]];
  };
  for (let i = 1; i < N; i++) {
    let currentIndex = i;
    //until the left element is higher than current element keep swapping
    while (currentIndex > 0 && arr[currentIndex - 1] > arr[currentIndex]) {
      swap(currentIndex, currentIndex - 1, arr);
      currentIndex--;
    }
  }
}
