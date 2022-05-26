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
    this.sz = new Array(N).fill(1);
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
    const i = this.root(p);
    const j = this.root(q);
    if (this.sz[i] < this.sz[j]) {
      this.id[i] = j;
      this.sz[j] += this.sz[i];
    } else {
      this.id[j] = i;
      this.sz[i] += this.sz[j];
    }
  }
}
