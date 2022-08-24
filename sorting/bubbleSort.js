/*
Time Complexity: O(N^2)
Space Complexity: O(1)
arr = [4,2,3,4,1]
bubbleSort(arr)
 */
function bubbleSort(arr) {
  let hasSwapped = true;
  const swap = (i, j, arr) => {
    [arr[i], arr[j]] = [arr[j], arr[i]];
  };
  while (hasSwapped) {
    hasSwapped = false;
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        swap(i, i + 1, arr);
        hasSwapped = true;
      }
    }
  }
}

[1, 1, 4, 2, 1, 3][(1, 1, 2, 4, 1, 3)][(1, 1, 2, 1, 4, 3)][(1, 1, 2, 1, 3, 4)][
  (1, 1, 1, 2, 3, 4)
];
