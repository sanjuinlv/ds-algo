/* 
1971. Find if Path Exists in Graph
https://leetcode.com/problems/find-if-path-exists-in-graph
Type: Easy

There is a bi-directional graph with n vertices, where each vertex is labeled from 0 to n - 1
(inclusive). The edges in the graph are represented as a 2D integer array edges, where each
edges[i] = [ui, vi] denotes a bi-directional edge between vertex ui and vertex vi. 
Every vertex pair is connected by at most one edge, and no vertex has an edge to itself.

You want to determine if there is a valid path that exists from vertex source to vertex destination.

Given edges and the integers n, source, and destination, return true if there is a valid path 
from source to destination, or false otherwise.

Example 1:
(0)----(1)
 \     /
  \   /
   (2)
Input: n = 3, edges = [[0,1],[1,2],[2,0]], source = 0, destination = 2
Output: true
Explanation: There are two paths from vertex 0 to vertex 2:
- 0 → 1 → 2
- 0 → 2

Example 2:
   (1)      (3)
   /         | \
  /          |  (5)   
(0)          | /
 \          (4) 
  \   
   (2)
Input: n = 6, edges = [[0,1],[0,2],[3,5],[5,4],[4,3]], source = 0, destination = 5
Output: false
Explanation: There is no path from vertex 0 to vertex 5.

Constraints:

1 <= n <= 2 * 105
0 <= edges.length <= 2 * 105
edges[i].length == 2
0 <= ui, vi <= n - 1
ui != vi
0 <= source, destination <= n - 1
There are no duplicate edges.
There are no self edges.

*/
/**
 * @param {number} n
 * @param {number[][]} edges
 * @param {number} source
 * @param {number} destination
 * @return {boolean}
 */
/* 
Approach I: DFS
Time: O(V+E)
Space: O(V)

Runtime: 632 ms Beats 68.37%
Memory Usage: 165.41 MB Beats 49.07%
*/
class Graph {
  constructor(n) {
    this.N = n;
    this.adj = new Array(n);
    this.init();
  }

  init() {
    for (let i = 0; i < this.N; i++) {
      this.adj[i] = [];
    }
  }

  adjacencyList(v) {
    return this.adj[v];
  }

  addEdge(v, w) {
    console.log(`v: ${v}, w: ${w}`);
    this.adj[v].push(w);
    this.adj[w].push(v);
  }
}

var validPath = function (n, edges, source, destination) {
  const G = new Graph(n);
  //create graph from edges
  for (const edge of edges) {
    G.addEdge(edge[0], edge[1]);
  }
  const visisted = new Array[n]();
  //perform dfs
  return dfs(source, destination, G, visisted);
};

function dfs(v, t, G, visisted) {
  if (v == t) return true;
  visisted[v] = true;
  //visit neighbors
  for (let w of G.adjacencyList(v)) {
    if (!visisted[w]) {
      if (dfs(w, t, G, visisted)) return true;
    }
  }
  return false;
}

/* 
Approach II: BFS

Runtime: 908 ms
Memory Usage: 165 MB
Your runtime beats 27.54 % of javascript submissions.
*/

class BFSPath {
  constructor(G, s) {
    this.marked = new Array(G.vertices()).fill(false);
    this.edgeTo = new Array(G.vertices());
    this.s = s;
    this.bfs(G, s);
  }

  bfs(G, s) {
    this.marked[s] = true;
    const Q = [];
    Q.push(s);
    while (Q.length) {
      const v = Q.shift();
      for (const w of G.adjacent(v)) {
        if (!this.marked[w]) {
          this.marked[w] = true;
          this.edgeTo[w] = v;
          Q.push(w);
        }
      }
    }
  }

  hasPathTo(v) {
    return this.marked[v];
  }
}

var validPath = function (n, edges, source, destination) {
  //create the Graph;
  const G = new Graph(n);
  for (const edge of edges) {
    G.connect(edge[0], edge[1]);
  }
  //create DFS path
  const dfsPath = new BFSPath(G, source);
  return dfsPath.hasPathTo(destination);
};

//BFS short code
/* 
Runtime: 789 ms
Memory Usage: 157 MB
Your runtime beats 46.08 % of javascript submissions.
Your memory usage beats 54.47 % of javascript submissions.
*/
var validPath = function (n, edges, source, destination) {
  //create adjacency list
  const adjacency = [...new Array(n)].map((x) => []);
  for (const edge of edges) {
    adjacency[edge[0]].push(edge[1]);
    adjacency[edge[1]].push(edge[0]);
  }
  const visited = new Array(n).fill(false);
  const Q = [];
  Q.push(source);
  visited[source] = true;
  while (Q.length) {
    const v = Q.shift();
    if (v == destination) return true;
    for (let w of adjacency[v]) {
      if (!visited[w]) {
        Q.push(w);
        visited[w] = true;
      }
    }
  }
  return false;
};

/* 
Approach II: UF (with Rank)
Runtime: 255 ms
Memory Usage: 85.6 MB

Your runtime beats 98.04 % of javascript submissions.
Your memory usage beats 95.05 % of javascript submissions.
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
var validPath = function (n, edges, source, destination) {
  //create UnionFind
  const uf = new UnionFind(n);
  for (const edge of edges) {
    uf.union(edge[0], edge[1]);
  }
  return uf.isConnected(source, destination);
};
