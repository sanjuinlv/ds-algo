/* 
You have a graph of n nodes. You are given an integer n and an array edges where edges[i] = [ai, bi] indicates that there is an edge between ai and bi in the graph.

Return the number of connected components in the graph.

Example 1:
(0)---(1)
       |
       |
      (2)

(3)----(4)      
Input: n = 5, edges = [[0,1],[1,2],[3,4]]
Output: 2

Example 2:
(0)---(1) (3)
       |  /|
       | / |
      (2) (4)
Input: n = 5, edges = [[0,1],[1,2],[2,3],[3,4]]
Output: 1

*/
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number}
 */
/* 
Approach I: Using UF
Time: O(E * α(N)), Iterating over every edge requires O(E) operations, and for every operation,
we are performing the combine method which is O(α(n)), where α(n) is the inverse Ackermann function.
Space: O(V), Storing the representative/immediate-parent of each vertex takes O(V) space. 
Furthermore, storing the size of components also takes O(V) space.

Runtime: 119 ms, faster than 35.32% of JavaScript online submissions for Number of Connected Components in an Undirected Graph.
Memory Usage: 45.4 MB, less than 78.17% of JavaScript online submissions for Number of Connected Components in an Undirected Graph.
*/
class UnionFind {
  constructor(n) {
    this.root = new Array(n);
    this.rank = new Array(n);

    for (let i = 0; i < n; i++) {
      this.root[i] = i;
      this.rank[i] = i;
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
    if (xRoot === yRoot) return 0;
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
    return 1;
  }
}
var countComponents = function (n, edges) {
  let componentCount = n;
  const uf = new UnionFind(n);
  for (let edge of edges) {
    if (uf.union(edge[0], edge[1])) componentCount--;
  }
  return componentCount;
};

/* 
Approach I: Using DFS
Time: O(E + V), Building the adjacency list will take O(E) operations, as we iterate over the
list of edges once, and insert each edge into two lists.

During the DFS traversal, each vertex will only be visited once. This is because we mark each
vertex as visited as soon as we see it, and then we only visit vertices that are not marked as visited.
In addition, when we iterate over the edge list of each vertex, we look at each edge once. 
This has a total cost of O(E+V).
Space: O(E+V), Building the adjacency list will take O(E) space. To keep track of visited vertices,
 an array of size O(V) is required. Also, the run-time stack for DFS will use O(V) space.

Runtime: 139 ms, faster than 20.37% of JavaScript online submissions for Number of Connected Components in an Undirected Graph.
Memory Usage: 47.1 MB, less than 41.00% of JavaScript online submissions for Number of Connected Components in an Undirected Graph.
*/
class Graph {
  constructor(n) {
    this.adj = new Array(n);
    this.initializeGraph(n);
  }

  initializeGraph(V) {
    for (let i = 0; i < V; i++) {
      this.adj[i] = [];
    }
  }

  addEdge(v, w) {
    this.adj[v].push(w);
    this.adj[w].push(v);
  }

  adjacent(v) {
    return this.adj[v];
  }
}

var countComponents = function (n, edges) {
  let componentCount = n;
  const G = new Graph(n);
  for (let edge of edges) {
    G.addEdge(edge[0], edge[1]);
  }

  const dfs = (v, G, visited) => {
    visited[v] = true;
    for (let w of G.adjacent(v)) {
      if (!visited[w]) dfs(w, G, visited);
    }
  };

  const visited = new Array(n).fill(false);
  for (let i = 0; i < n; i++) {
    if (!visited[i]) {
      dfs(i, G, visited);
      componentCount++;
    }
  }
  return componentCount;
};
