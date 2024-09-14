/* 
- Quicksort is in-place sorting 
- It is not stable sort
- Compare: Worst Case: 1/2N^2, Avg Case: NLogN
- Time: O(NLogN)
- Space: O(LogN), no aux array but depth of recursion
- 
*/
/*  
let A = [10,16,8,12,15,6,3,9,5];
QuickSort.sort(A);
 */
class QuickSort {
  //since method overloading doesn't work in JS, for first call we can initialized the args
  static sort(A, lo = 0, hi = A.length - 1) {
    if (lo >= hi) return;
    const j = QuickSort.partition(A, lo, hi);
    console.log(`pivot: ${j}`);
    console.log(`array after first partition: ${A}`);
    //sort the array items left to in place item (A[j])
    QuickSort.sort(A, lo, j - 1);
    //sort the array items right to in place item (A[j])
    QuickSort.sort(A, j + 1, hi);
  }

  static partition(A, lo, hi) {
    //lo is pivot point in our case
    let i = lo;
    let j = hi + 1;
    while (i < j) {
      // scan until we find an item lower than low
      //A[++i] < A[lo]
      while (QuickSort.less(A, ++i, lo)) {
        if (i == hi) break;
      }
      // scan until we find an item greater than low
      while (QuickSort.less(A, lo, --j)) {
        if (j == lo) break;
      }
      console.log(`i: ${i}, j: ${j}`);
      if (i >= j) break;
      QuickSort.swap(A, i, j);
    }
    //swap pivot and element at j
    QuickSort.swap(A, lo, j);
    return j;
  }

  static less(A, i, j) {
    return A[i] < A[j];
  }

  static swap(a, i, j) {
    [a[i], a[j]] = [a[j], a[i]];
  }
}

//Randomised Quicksort
class QuickSort {
  
  static sort(A) {
    QuickSort._sort(A, 0, A.length - 1);
  }

  static _sort(A, lo, hi) {
    if (lo >= hi) return;
    //randomise
    QuickSort.swap(A, low + Math.random() % (hi - lo + 1), lo);
    //find the partition
    const j = QuickSort._partition(A, lo, hi);
    //sort lo to pivot
    QuickSort._sort(A, lo, j - 1);
    //sort pivot+1 to hi
    QuickSort._sort(A, j + 1, hi);
  }

  static _partition(A, lo, hi) {
    const pivot = A[lo];
    let i = lo;
    let j = hi + 1;
    while (i < j) {
      // moved towards right until we find an item greater than pivot
      while (A[i++] < pivot) if (i == hi) break;
      // moved towards left until we find an item less than pivot
      while (A[--j] > pivot) if (j == lo) break;
      if (i >= j) break;
      //swap i & j
      QuickSort.swap(A, i, j);
    }
    //swap pivot element with index 'j'
    QuickSort.swap(A, lo, j);
    return j;
  }

  static swap(a, i, j) {
    [a[i], a[j]] = [a[j], a[i]];
  }
}
