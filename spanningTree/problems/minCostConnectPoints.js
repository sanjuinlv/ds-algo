/* 
You are given an array points representing integer coordinates of some points on
a 2D-plane, where points[i] = [xi, yi].
The cost of connecting two points [xi, yi] and [xj, yj] is the manhattan distance
between them: |xi - xj| + |yi - yj|, where |val| denotes the absolute value of val.

Return the minimum cost to make all points connected. All points are connected if 
there is exactly one simple path between any two points.

Input: points = [[0,0],[2,2],[3,10],[5,2],[7,0]]
Output: 20
Explanation: 
We can connect the points as shown above to get the minimum cost of 20.
Notice that there is a unique path between every pair of points.

Example 2:

Input: points = [[3,12],[-2,5],[-4,1]]
Output: 18

Constraints:

1 <= points.length <= 1000
-106 <= xi, yi <= 10^6
All pairs (xi, yi) are distinct.
*/
/**
 * @param {number[][]} points
 * @return {number}
 */
/* 
Approach: Kruskal's Algorithm
Time: O(N^2 * LogN)
First, we store N⋅(N−1)/2≈N^2 edges of our complete graph in the allEdges array which will
take O(N^2) time, and sorting this array will take O(N^2 * log(N^2))time.

Then, we iterate over the allEdges array, and for each element, we perform a union-find operation.
The amortized time complexity for union-find by rank and path compression is O(α(N)),
where α(N) is Inverse Ackermann Function, which is nearly constant, even for large values of N.
Thus, the overall time complexity is 
O(N^2 + N^2 * log(N^2) + N^2 * α(N)) ≈ O(N^2 * log(N^2) ≈ O(N^2 * log(N)).

Space: O(N^2)
Space to store all edges = N * (N-1) / 2 ≈ N^2 edges of our graph.
UnionFind object uf uses two arrays each of size N to store the group id and rank of all the nodes.
Thus, the overall space complexity is O(N^2 + N) ≈ O(N^2).

*/
class UnionFind {
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

class Edge {
  constructor(v, w, weight) {
    this.v = v;
    this.w = w;
    this.edgeWeight = weight;
  }

  either() {
    return this.v;
  }

  other(v) {
    if (this.v === v) return this.w;
    return this.v;
  }

  weight() {
    return this.edgeWeight;
  }
}

var minCostConnectPoints = function (points) {
  if (!points || points.length == 0) return 0;
  const vertices = points.length;
  const pq = new MinPriorityQueue({
    compare: (a, b) => {
      // console.log(`a weiht: ${a.weight()}, b weight: ${b.weight()}`)
      return a.weight() - b.weight();
    },
  });
  const uf = new UnionFind(vertices);
  //1. add edges to PQ (sorted in ascending order)
  for (let i = 0; i < vertices; i++) {
    const point1 = points[i];
    //calculate edge for each points from this point
    for (let j = i + 1; j < vertices; j++) {
      const point2 = points[j];
      const cost =
        Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);
      pq.enqueue(new Edge(i, j, cost));
    }
  }
  //2. process the edges
  let minCost = 0;
  //edges can be max v-1
  let counter = vertices - 1;
  //process edges until pq is empty and counter is zero (v-1 edges obtained)
  while (pq.size() > 0 && counter > 0) {
    const edge = pq.dequeue();
    const v = edge.either();
    const w = edge.other(v);
    //check if the points are not already connected, to avoid cycle
    if (!uf.connected(v, w)) {
      //connect v and w
      uf.union(v, w);
      minCost += edge.weight();
      counter--;
    }
  }
  return minCost;
};
