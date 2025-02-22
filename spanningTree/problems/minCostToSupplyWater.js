/* 
1168. Optimize Water Distribution in a Village
https://leetcode.com/problems/optimize-water-distribution-in-a-village/solution/
Category - Hard

There are n houses in a village. We want to supply water for all the houses by
building wells and laying pipes.

For each house i, we can either build a well inside it directly with cost wells[i - 1]
(note the -1 due to 0-indexing), or pipe in water from another well to it. 
The costs to lay pipes between houses are given by the array pipes where each
pipes[j] = [house1j, house2j, costj] represents the cost to connect house1j and house2j 
together using a pipe. Connections are bidirectional, and there could be multiple
valid connections between the same two houses with different costs.

Return the minimum total cost to supply water to all houses.

Example 1:

Input: n = 3, wells = [1,2,2], pipes = [[1,2,1],[2,3,1]]
Output: 3
Explanation: The image shows the costs of connecting houses using pipes.
The best strategy is to build a well in the first house with cost 1 and connect the other houses to it with cost 2 so the total cost is 3.

Example 1:

Input: n = 2, wells = [1,1], pipes = [[1,2,1],[1,2,2]]
Output: 2
Explanation: We can supply water with cost two using one of the three options:
Option 1:
  - Build a well inside house 1 with cost 1.
  - Build a well inside house 2 with cost 1.
The total cost will be 2.
Option 2:
  - Build a well inside house 1 with cost 1.
  - Connect house 2 with house 1 with cost 1.
The total cost will be 2.
Option 3:
  - Build a well inside house 2 with cost 1.
  - Connect house 1 with house 2 with cost 1.
The total cost will be 2.
Note that we can connect houses 1 and 2 with cost 1 or with cost 2 but we will always choose the cheapest option. 

Constraints:

 - 2 <= n <= 10^4
 - wells.length == n
 - 0 <= wells[i] <= 10^5
 - 1 <= pipes.length <= 10^4
 - pipes[j].length == 3
 - 1 <= house1j, house2j <= n
 - 0 <= costj <= 10^5
 - house1j != house2j

*/
/**
 * @param {number} n
 * @param {number[]} wells
 * @param {number[][]} pipes
 * @return {number}
 */

/* 
Approach I: Krushkal's Algorithm with UnionFind

Let N be the number of houses, and M be the number of pipes from the input.

Time: O((N + M) * Log (M + N))
  - First, we build a list of edges, which takes O(N + M) time.
  - We then sort the list of edges, which takes O((N + M)* log(N + M)) time.
  - At the end, we iterate through the sorted edges. For each iteration, 
   we invoke a Union-Find operation. Hence, the time complexity for iteration
   is O((N + M) * α(N)).
  - overall O((N + M)* log(N + M)).

Space: O(N + M)
  - The space complexity of our Union-Find data structure is O(N).
  - The space required by the list of edges is O( N + M).
  - Space complexity for sorting O(log N)
  - so overall O (N + M)

Runtime: 133 ms, faster than 97.50% of JavaScript online submissions for Optimize Water Distribution in a Village.
Memory Usage: 51.7 MB, less than 67.50% of JavaScript online submissions for Optimize Water Distribution in a Village.
*/
class RankUF {
  constructor(N) {
    this.root = new Array(N);
    this.rank = new Array(N).fill(1);
    for (let i = 0; i < N; i++) {
      this.root[i] = i;
    }
  }

  find(p) {
    if (p === this.root[p]) return p;
    return (this.root[p] = this.find(this.root[p]));
  }

  union(p, q) {
    const pRoot = this.find(p);
    const qRoot = this.find(q);
    if (pRoot === qRoot) return false;
    if (this.rank[pRoot] > this.rank[qRoot]) {
      this.root[qRoot] = pRoot;
    } else if (this.rank[pRoot] < this.rank[qRoot]) {
      this.root[pRoot] = qRoot;
    } else {
      //height of both tree is same
      this.root[qRoot] = pRoot;
      //increase the xRoot node height by one
      this.rank[pRoot] += 1;
    }
    return true;
  }
}

var minCostToSupplyWater = function (n, wells, pipes) {
  const pq = new MinPriorityQueue({
    compare: (a, b) => {
      return a[2] - b[2];
    },
  });
  //from all the vertices create and edge to a dummy vertex '0'
  for (let i = 0; i < n; i++) {
    pq.enqueue([i + 1, 0, wells[i]]);
  }
  //add all edges to min priority queue
  for (const pipe of pipes) {
    const [v, w, cost] = pipe;
    pq.enqueue([v, w, cost]);
  }
  let totalCost = 0;
  //edges in MST can be max v-1
  let counter = n;
  const UF = new RankUF(n);
  while (pq.size() > 0 && counter > 0) {
    const [v, w, cost] = pq.dequeue();
    if (UF.union(v, w)) {
      totalCost += cost;
      counter--;
    }
  }
  return totalCost;
};


/* 
Approach II: Without using Min PQ (using sorting instead)
Runtime: 58 ms Beats 61.36% 
Memory: 61.04 MB Beats 56.82%
*/
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
    return this.v == v ? this.w : this.v;
  }

  get weight() {
    return this.edgeWeight;
  }
}

var minCostToSupplyWater = function (n, wells, pipes) {
  const edges = [];
  // Create an edge from all vertices to dummy vertex '0'
  for (let i = 0; i < n; i++) {
    edges.push(new Edge(i + 1, 0, wells[i]));
  }
  // Add all edges from pipes
  for (const pipe of pipes) {
    const [v, w, weight] = pipe;
    edges.push(new Edge(v, w, weight));
  }
  //sort the edges by weight
  edges.sort((a, b) => a.weight - b.weight);
  const UF = new RankUF(n);
  let totalCost = 0;
  let count = n; // Total nodes (villages + dummy node)
  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i];
    const p = edge.either();
    const q = edge.other(p);
    if (UF.union(p, q)) {
      totalCost += edge.weight;
      count--;
    }
    if (count == 0) break;
  }
  return totalCost;
};
