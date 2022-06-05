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

  root(p) {
    while (p != this.root[p]) p = this.root[p];
    return p;
  }

  connected(p, q) {
    return this.root(p) === this.root(q);
  }

  union(p, q) {
    const pRoot = this.root(p);
    const qRoot = this.root(q);
    //change root of p to point root of q (depth of p and q array accesses)
    if (pRoot !== qRoot) this.root[pRoot] = qRoot;
  }
}
