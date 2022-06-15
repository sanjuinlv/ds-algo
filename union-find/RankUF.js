/* 
Time Complexity:
Initialization: O(N)
Find: O(log N) 
Union: O(Log N) 
Connected: O(log N)

Space: O(N)
*/
//The difference between weighted and rank is we don't count the size of nodes,
// rather the height of the tree

class RankUF {
  constructor(N) {
    this.root = new Array(N);
    this.rank = new Array(N).fill(1);
    this.N = N;
    for (let i = 0; i < N; i++) {
      this.root[i] = i;
    }
  }

  find(i) {
    while (i != this.root[i]) i = this.root[i];
    return i;
  }

  connected(p, q) {
    return this.find(p) === this.find(q);
  }

  union(p, q) {
    const pRoot = this.find(p);
    const qRoot = this.find(q);
    if (pRoot == qRoot) return;
    if (this.rank[pRoot] > this.rank[qRoot]) {
      this.find[qRoot] = pRoot;
    } else if (this.rank[pRoot] < this.rank[qRoot]) {
      this.find[pRoot] = qRoot;
    } else {
      //height of both tree is same
      this.find[qRoot] = pRoot;
      //increase the height by one of pRoot
      this.rank[pRoot] += 1;
    }
  }
}

// With path compression
/* 
Time Complexity:
Initialization: O(N)
Find: O(k(N)), k refers to constant. O(k(N)) is O(1) on average
Union: O(k(N))
Connected: O(k(N))
*/
class PathCompressionRankUF {
  constructor(N) {
    this.root = new Array(N);
    this.rank = new Array(N).fill(1);
    this.N = N;
    for (let i = 0; i < N; i++) {
      this.root[i] = i;
    }
  }

  find(p) {
    if (p === this.root[p]) return p;
    return (this.root[p] = this.find(this.root[p]));
  }

  connected(p, q) {
    return this.find(p) === this.find(q);
  }

  union(p, q) {
    const pRoot = this.find(p);
    const qRoot = this.find(q);
    if (pRoot == qRoot) return;
    if (this.rank[pRoot] > this.rank[qRoot]) {
      this.root[qRoot] = pRoot;
    } else if (this.rank[pRoot] < this.rank[qRoot]) {
      this.root[pRoot] = qRoot;
    } else {
      //height of both tree is same
      this.root[qRoot] = pRoot;
      //increase the height by one of pRoot
      this.rank[pRoot] += 1;
    }
  }
}
