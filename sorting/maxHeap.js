class heap {
  constructor(capacity) {
    //we use 1based indices so need n+1 space
    this.pq = new Array(n + 1);
    this.n = 0;
  }

  insert(key) {
    //TODO: add resize logic
    //add it at the end of the array
    this.pq[++this.n] = key;
    //place this key at right position in the heap
    this.swim(this.n);
  }

  deleteMax() {
    if (this.isEmpty()) throw Error("PQ is empty");
    const max = this.pq[this.n];
    //swap root with last element
    this.exchange(1, this.n--);
    //move new root element at right place by sinking it
    this.sink(1);
    //set it for garbage collection
    this.pq[this.n + 1] = null;
    return max;
  }

  max() {
    if (this.isEmpty()) throw Error("PQ is empty");
    return this.pq[1];
  }

  isEmpty() {
    return this.n === 0;
  }

  size() {
    return this.n;
  }

  swim(k) {
    //until child is smaller than parent or we reach root, keep exchanging
    while (k > 1 && less(parseInt(k / 2), k)) {
      this.exchange(parseInt(k / 2), k);
      k = parseInt(k / 2);
    }
  }

  sink(k) {
    while (2 * k <= this.n) {
      //child level
      const j = 2 * k;
      //find the larger child
      if (j < this.n && this.less(j, j + 1)) j++;
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
