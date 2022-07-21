/* 
Time Complexity:
Initialization: O(N)
Find: O(N) (worst case)
Union: O(N) 
Connected: O(N)

Space: O(N) to store the array of size N

Quick Union is too slow

Quick Union cons:
- Trees can get tall
- Find too expensive (could be N array access)

*/
class QuickUnion {
  constructor(N) {
    this.root = new Array(N);
    this.N = N;
    for (let i = 0; i < N; i++) {
      this.root[i] = i;
    }
  }

  find(p) {
    while (p != this.root[p]) p = this.root[p];
    return p;
  }

  connected(p, q) {
    return this.find(p) === this.find(q);
  }

  union(p, q) {
    const pRoot = this.find(p);
    const qRoot = this.find(q);
    //change root of p to point root of q (depth of p and q array accesses)
    if (pRoot !== qRoot) this.root[pRoot] = qRoot;
  }
}
