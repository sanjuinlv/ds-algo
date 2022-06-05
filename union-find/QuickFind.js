/* 
Time Complexity:
Initialization: O(N)
Find: O(1)
Union: O(N)
Connected: O(1)

Space: O(N) to store the array of size N

Quick Find is too slow

Quick Union cons:
- Union too expensive
- Trees are flat, but too expensive to keep them flat
*/
class QuickFind {
  constructor(N) {
    this.root = new Array(N);
    this.N = N;
    for (let i = 0; i < N; i++) {
      this.root[i] = i;
    }
  }

  find(p) {
    this.root[p];
  }

  connected(p, q) {
    return this.root[p] === this.root[q];
  }

  union(p, q) {
    const pRoot = this.root[p];
    const qRoot = this.root[q];
    if (pRoot == qRoot) return;
    for (let i = 0; i < this.N; i++) {
      //change all entries with id[p] with id[q]
      if (this.root[i] == pRoot) this.root[i] = qRoot;
    }
  }
}
