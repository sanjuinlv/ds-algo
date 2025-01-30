/* 
261. Graph Valid Tree
https://leetcode.com/problems/graph-valid-tree/
Tyope: Medium

You have a graph of n nodes labeled from 0 to n - 1. You are given an integer n and
a list of edges where edges[i] = [ai, bi] indicates that there is an undirected edge
between nodes ai and bi in the graph.
Return true if the edges of the given graph make up a valid tree, and false otherwise.

Example 1:
      0
    / | \ 
   1  2  3
   |
   4 
Input: n = 5, edges = [[0,1],[0,2],[0,3],[1,4]]
Output: true

Example 2:
0 --- 1 -- 2
      |  \ |
      4    3 
Input: n = 5, edges = [[0,1],[1,2],[2,3],[1,3],[1,4]]
Output: false

Constraints:
  * 1 <= n <= 2000
  * 0 <= edges.length <= 5000
  * edges[i].length == 2
  * 0 <= ai, bi < n
  * ai != bi
  * There are no self-loops or repeated edges.
*/
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {boolean}
 */
/* 
Approach I: Union Find

Time: O(N * α(N)), where N is number of nodes. 
And α is the Inverse Ackermann Function. The incredible thing about this function is that it grows 
so slowly that N will never go higher than 4 in the universe as we know it.
Space: O(N) space to the store the arrays it uses

Runtime: 76 ms, faster than 86.82% of JavaScript online submissions for Graph Valid Tree.
Memory Usage: 44.2 MB, less than 90.09% of JavaScript online submissions for Graph Valid Tree.
*/
class UnionFind {
  constructor(n) {
    this.root = new Array(n);
    this.rank = new Array(n);

    for (let i = 0; i < n; i++) {
      this.root[i] = i;
      this.rank[i] = 1;
    }
  }

  find(x) {
    if (x == this.root[x]) return x;
    return (this.root[x] = this.find(this.root[x]));
  }

  isConnected(x, y) {
    return this.find(x) === this.find(y);
  }

  union(x, y) {
    const xRoot = this.find(x);
    const yRoot = this.find(y);
    if (xRoot === yRoot) return;
    if (this.rank[xRoot] > this.rank[yRoot]) {
      this.root[yRoot] = xRoot;
    } else if (this.rank[xRoot] < this.rank[yRoot]) {
      this.root[xRoot] = yRoot;
    } else {
      //height of both tree is same
      this.root[yRoot] = xRoot;
      //increase the xRoot node height by one
      this.rank[xRoot] += 1;
    }
  }
}

var validTree = function (n, edges) {
  // Condition 1: The graph must contain n - 1 edges.
  if (edges.length !== n - 1) return false;
  // Condition 2: The graph must contain a single connected component.
  // Create a new UnionFind object with n nodes.
  const uf = new UnionFind(n);
  // Add each edge. Check if a merge can happen, because if it
  // didn't, there must be a cycle.
  for (let i = 0; i < edges.length; i++) {
    const [x, y] = edges[i];
    // console.log(`x: ${x}, y: ${y}, isConnected: ${uf.isConnected(x, y)}`);
    if (uf.isConnected(x, y)) return false;
    uf.union(x, y);
  }
  // If we got this far, there's no cycles!
  return true;
};

/* 
Approach II: DFS
Time: O(N+E) = O(N + N) = O(N), when E!=N we return false, therefore worst case is E = N-1, so E = N
Space: O(N+E) = O(N + N) = O(N)
Runtime: 99 ms, faster than 53.38% of JavaScript online submissions for Graph Valid Tree.
Memory Usage: 45.2 MB, less than 70.15% of JavaScript online submissions for Graph Valid Tree.
*/
class Graph {
  constructor(V) {
    //number of vertices
    this.V = V;
    //adjaceny list
    this.adj = new Array(V);
    this.initializeGraph(V);
  }

  initializeGraph(V) {
    //initialize all lists to empty
    for (let v = 0; v < V; v++) {
      this.adj[v] = [];
    }
  }

  vertices() {
    return this.V;
  }

  addEdge(v, w) {
    this.adj[v].push(w);
    this.adj[w].push(v);
  }

  adjacent(v) {
    return this.adj[v];
  }
}

var validTree = function (n, edges) {
  // Condition 1: The graph must contain n - 1 edges.
  if (edges.length !== n - 1) return false;
  //create adjacency list
  const graph = new Graph(n);
  for (let edge of edges) {
    graph.addEdge(edge[0], edge[1]);
  }

  //DFS
  const hasCycle = (G, v, parent) => {
    visited.add(v);
    //explore all neighbor of v
    for (let w of G.adjacent(v)) {
      if (!visited.has(w)) {
        //lets see if non explored node has a cycle, if it does we exit the recursion
        if (hasCycle(G, w, v)) return true;
      } else if (w !== parent) {
        //we've seen this neighbor before, it has to be its parent, or else we got a cycle
        return true;
      }
    }
    return false;
  };

  const visited = new Set();
  // We return true iff no cycles were detected,
  // AND the entire graph has been reached.
  return !hasCycle(graph, 0, 0) && visited.size == n;
};
