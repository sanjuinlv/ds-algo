/* 
var uf = new QuickUnionPathCompression(10);
// 1-2-5-6-7 3-8-9 4
uf.union(1, 2);
uf.union(2, 5);
uf.union(5, 6);
uf.union(6, 7);
uf.union(3, 8);
uf.union(8, 9);
Console.log(uf.connected(1, 5)); // true
Console.log(uf.connected(5, 7)); // true
Console.log(uf.connected(4, 9)); // false
// 1-2-5-6-7 3-8-9-4
uf.union(9, 4);
Console.log(uf.connected(4, 9)); // true

Time Complexity:
Initialization: O(N)
Find: O(log N) 
Union: O(Log N) 
Connected: O(log N)

*/
class QuickUnionPathCompression {
  constructor(N) {
    this.root = new Array(N);
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
    //change root of p to point root of q (depth of p and q array accesses)
    if (pRoot !== qRoot) this.root[pRoot] = qRoot;
  }
}
