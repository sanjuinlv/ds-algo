/* 
Quick Find is too slow
Time complexity:
Initialize  Union    Find
  N           N       1

 
Quick Union cons:
- Union too expensive
- Trees are flat, but too expensive to keep them flat
*/
class QuickFindUF {
  constructor(N) {
    this.id = new Array(N);
    this.N = N;
    for (let i = 0; i < N; i++) {
      this.id[i] = i;
    }
  }

  find(p) {
    this.id[p];
  }

  connected(p, q) {
    return this.id[p] === this.id[q];
  }

  union(p, q) {
    const pId = this.id[p];
    const qId = this.id[q];
    for (let i = 0; i < this.N; i++) {
      //change all entries with id[p] with id[q]
      if (this.id[i] == pId) this.id[i] = qId;
    }
  }
}
