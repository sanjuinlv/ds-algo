//A = [10,16,8,12,15,6,3,9,5]
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
    let i = lo,
      j = hi + 1;
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

//update
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
    console.log(A);
  }

  static partition(A, lo, hi) {
    let i = lo;
    let j = hi + 1;
    const pivot = A[lo];
    while (i < j) {
      //find the number larger than pivot from left
      while (A[++i] < pivot) if (i === hi) break;
      //find the number smaller than pivot from right
      while (A[--j] > pivot) if (j === lo) break;
      if (i >= j) break;
      //swap element at i and j
      SWAP(A, i, j);
    }
    //swap pivot element with index 'j'
    SWAP(A, lo, j);
    //return pivot index (now j)
    return j;
  }

  static swap(a, i, j) {
    [a[i], a[j]] = [a[j], a[i]];
  }
}
