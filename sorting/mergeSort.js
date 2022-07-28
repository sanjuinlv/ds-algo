class MergeSort {
  static sort(A, lo = 0, hi = A.length - 1) {
    // merge left and right
    console.log(`sort:: lo: ${lo}, hi: ${hi}`);
    if (lo < hi) {
      const middle = lo + parseInt((hi - lo) / 2);
      console.log(`sort:: mid: ${middle}`);
      MergeSort.sort(A, lo, middle);
      MergeSort.sort(A, middle + 1, hi);
      MergeSort.merge(A, lo, middle, hi);
    }
  }

  static merge(A, lo, mid, hi) {
    let left = lo,
      right = mid + 1;
    console.log(`merge:: lo: ${lo}, mid: ${mid}, hi: ${hi}`);
    let aux = new Array(hi - lo);
    const LESS = (a, b) => a - b < 0;
    //copy item to aux array
    for (let k = lo; k <= hi; k++) {
      aux[k] = A[k];
    }

    for (let k = lo; k <= hi; k++) {
      // if left pointer has crossed the mid then copy remaining right items until done (K==hi)
      if (left > mid) {
        A[k] = aux[right++];
      } else if (right > hi) {
        // if right pointer has crossed the hi then copy remaining left items until done (K==hi)
        A[k] = aux[left++];
      } else if (LESS(aux[left], aux[right])) {
        A[k] = aux[left++];
      } else {
        A[k] = aux[right++];
      }
    }
  }
}
// A = [0] => [0]
// A = [1,1] => [1,1]
// A = [2,1] => [1, 2]
// A = [-1, -2] => [-2, -1]
// A = [2, 1, 4] => [1, 2, 4]
// A = [10,16,8,12,15,6,3,9,5,7] => [3, 5, 6, 7, 8, 9, 10, 12, 15, 16]
// A = [9,3,7,5,6,4,8,2]
// MergeSort.sort(A);
class MergeSort {
  static sort(A, lo = 0, hi = A.length - 1) {
    if (lo < hi) {
      const mid = lo + parseInt((hi - lo) / 2);
      MergeSort.sort(A, lo, mid);
      MergeSort.sort(A, mid + 1, hi);
      MergeSort.merge(A, lo, mid, hi);
    }
  }

  static merge(A, lo, mid, hi) {
    console.log(`lo: ${lo}, mid: ${mid}, hi: ${hi}`);
    let left = lo,
      right = mid + 1;
    let k = lo;
    // copy data to aux array
    const aux = new Array(hi - lo + 1);
    for (let k = lo; k <= hi; k++) {
      aux[k] = A[k];
    }
    console.log(`aux : ${aux}`);
    while (left <= mid && right <= hi) {
      if (aux[left] < aux[right]) {
        A[k++] = aux[left++];
      } else {
        A[k++] = aux[right++];
      }
    }
    console.log(`left: ${left}, right: ${right}`);
    console.log(`array after merge: ${A}`);
    //copy remaining data
    while (left <= mid) {
      A[k++] = aux[left++];
    }
    while (right <= hi) {
      A[k++] = aux[right++];
    }
    console.log(`array after complete merge: ${A}`);
  }
}
