/* 

Time Complexity:
Initialization: O(N)
Find: O(log N) 
Union: O(Log N) 
Connected: O(log N)

*/
class WeightedUF {
  constructor(N) {
    this.root = new Array(N);
    this.sz = new Array(N).fill(1);
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
    if (pRoot == qRoot) return;
    // make smaller root point to larger one
    if (this.sz[pRoot] < this.sz[qRoot]) {
      this.root[pRoot] = qRoot;
      this.sz[qRoot] += this.sz[pRoot];
    } else {
      this.root[qRoot] = pRoot;
      this.sz[pRoot] += this.sz[qRoot];
    }
  }
}

class WeightedPathCompressionUF {
  constructor(N) {
    this.root = new Array(N);
    this.sz = new Array(N).fill(1);
    this.N = N;
    for (let i = 0; i < N; i++) {
      this.root[i] = i;
    }
  }

  find(p) {
    if (p == this.root[p]) return p;
    return (this.root[p] = this.find(this.root[p]));
  }

  connected(p, q) {
    return this.find(p) === this.find(q);
  }

  union(p, q) {
    const pRoot = this.find(p);
    const qRoot = this.find(q);
    if (pRoot == qRoot) return;
    // make smaller root point to larger one
    if (this.sz[pRoot] < this.sz[qRoot]) {
      this.root[pRoot] = qRoot;
      this.sz[qRoot] += this.sz[pRoot];
    } else {
      this.root[qRoot] = pRoot;
      this.sz[pRoot] += this.sz[qRoot];
    }
  }
}
