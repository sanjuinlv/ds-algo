/* 
Quick Union is too slow
Time complexity:
Initialize  Union    Find
  N           N       N

Quick Union cons:
- Trees can get tall
- Find too expensive (could be N array access)

*/
class QuickFindUF {
  constructor(N) {
    this.id = new Array(N);
    this.N = N;
    for (let i = 0; i < N; i++) {
      this.id[i] = i;
    }
  }

  root(i) {
    while (i != this.id[i]) i = this.id[i];
    return i;
  }

  connected(p, q) {
    return this.root(p) === this.root(q);
  }

  union(p, q) {
    const pRoot = this.root(p);
    const qRoot = this.root(q);
    //change root of p to point root of q (depth of p and q array accesses)
    this.id[pRoot] = qRoot;
  }
}
