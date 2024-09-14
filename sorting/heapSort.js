/**
 *  The class provides a static method to sort an array using heapsort
 *
 *  This implementation takes O(N Log N) time to sort any array
 *  of length n (assuming comparisons take constant time).
 *  It makes at most 2NLog2N compares.
 *  This sorting algorithm is not stable.
 *  It uses O(1) extra memory (not including the input array).
 */

/* 
Usage
let arr = [4,5,2,9,10];
Heap.sort(arr);
arr = [1,-2,3,-5,10];
Heap.sort(arr);

*/
class Heap {
  /**
   * @param {Array} A - Input array to sort
   */
  static sort(A) {
    const N = A.length; 
    //phase I: heapify
    for (let k = parseInt(N / 2); k >= 1; k--) {
      Heap.sink(A, k, N);
    }
    console.log(`heapified array: ${A}`);
    let k = N;
    //phase II: sorting phase
    while (k > 1) {
      //exchange first element with last element
      Heap.swap(A, 1, k--);
      //heapify
      Heap.sink(A, 1, k);
    }
    console.log(`sorted array: ${A}`);
  }

  static sink(A, k, N) {
    while (2 * k <= N) {
      //child level
      let j = 2 * k;
      // find the largest of the childs
      if (j < N && Heap.less(A, j, j + 1)) j++;
      if (!Heap.less(A, k, j)) break;
      // if parent is smaller than largest of child, then swap
      Heap.swap(A, k, j);
      k = j;
    }
  }

  //convert 1 based index to 0 based
  static less(A, a, b) {
    return A[a - 1] < A[b - 1];
  }

  //convert 1 based index to 0 based
  static swap(A, i, j) {
    [A[i - 1], A[j - 1]] = [A[j - 1], A[i - 1]];
  }
}
