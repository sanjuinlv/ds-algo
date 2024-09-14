/* 
Insert: O(LogN)
Delete: O(LogN)
Max: O(1)

Usage example:
let heap = new MaxHeap(10);
heap.insert(10)
heap.insert(5)
heap.insert(6)
heap.max(); //10
heap.deleteMax(); //10
heap.max(); //6
*/
class MaxHeap {
  constructor(capacity) {
    //we use 1based indices so need n+1 space
    this.pq = new Array(capacity + 1);
    this.N = 0;
  }

  insert(key) {
    //TODO: add resize logic
    //add it at the end of the array
    this.pq[++this.N] = key;
    //place this key at right position in the heap
    this.swim(this.N);
  }

  deleteMax() {
    if (this.isEmpty()) throw Error("PQ is empty");
    const max = this.pq[1];
    //swap root with last element
    this.exchange(1, this.N--);
    //move new root element at right place by sinking it
    this.sink(1);
    //set it for garbage collection
    this.pq[this.N + 1] = null;
    return max;
  }

  max() {
    if (this.isEmpty()) throw Error("PQ is empty");
    return this.pq[1];
  }

  isEmpty() {
    return this.N === 0;
  }

  size() {
    return this.N;
  }

  swim(k) {
    //until child is smaller than parent or we reach root, keep exchanging
    while (k > 1 && this.less(parseInt(k / 2), k)) {
      this.exchange(parseInt(k / 2), k);
      k = parseInt(k / 2);
    }
  }

  sink(k) {
    while (2 * k <= this.N) {
      //child level
      const j = 2 * k;
      //find the larger child
      if (j < this.N && this.less(j, j + 1)) j++;
      //if k is not smaller than child at 'j' then it is at right position. So we stop sink
      if (!this.less(k, j)) break;
      //sink 'k' to 'j'
      this.exchange(k, j);
      k = j;
    }
  }

  exchange(i, j) {
    [this.pq[i], this.pq[j]] = [this.pq[j], this.pq[i]];
  }

  less(i, j) {
    return this.pq[i] < this.pq[j];
  }
}
