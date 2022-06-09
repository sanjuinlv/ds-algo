/* 
Given a directed acyclic graph (DAG) of n nodes labeled from 0 to n - 1, find all possible 
paths from node 0 to node n - 1 and return them in any order.

The graph is given as follows: graph[i] is a list of all nodes you can visit from node i
(i.e., there is a directed edge from node i to node graph[i][j]).

Example 1:
(0)------->(1)
 |          |
 |          |
 |          |
(2)------->(3)

Input: graph = [[1,2],[3],[3],[]]
Output: [[0,1,3],[0,2,3]]
Explanation: There are two paths: 0 -> 1 -> 3 and 0 -> 2 -> 3.

Input: graph = [[4,3,1],[3,2,4],[3],[4],[]]
Output: [[0,4],[0,3,4],[0,1,3,4],[0,1,2,3,4],[0,1,4]]
*/
/**
 * @param {number[][]} graph
 * @return {number[][]}
 */
// class DFSDirectedPath {
//   constructor(G, s) {
//     this.s = s;
//     this.edgeTo = new Array(G.vertices()).fill(-1);
//     this.marked = new Array(G.vertices()).fill(false);
//     this.dfs(G, s);
//   }

//   dfs(G, v) {
//     this.marked[v] = true;
//     for (const w of G.adjacent(v)) {
//       if (!this.marked[w]) {
//         this.edgeTo[w] = v;
//         this.dfs(G, w);
//       }
//     }
//   }

//   hasPathTo(v) {
//     return this.edgeTo[v];
//   }

//   pathTo(v) {
//     if (!this.hasPathTo(v)) return [];
//     const stack = [];
//     for (let w = v; w != this.s; w = this.edgeTo[w]) {
//       stack.push(w);
//     }
//     stack.push(this.s);
//     const path = [];
//     while (stack.length) {
//       path.push(stack.pop());
//     }
//     console.log(`path: ${path}`);
//     return path;
//   }
// }
/* 
Approach I: Using DFS + backtracking
Runtime: 184 ms, faster than 19.76% of JavaScript online submissions for All Paths From Source to Target.
Memory Usage: 51.1 MB, less than 48.75% of JavaScript online submissions for All Paths From Source to Target.

*/
class Diagraph {
  constructor(n) {
    this.V = n;
    this.adj = new Array(n);
    this.initialize(n);
  }

  initialize(n) {
    for (let i = 0; i < n; i++) {
      this.adj[i] = [];
    }
  }

  connect(v, w) {
    this.adj[v].push(w);
  }

  adjacent(v) {
    return this.adj[v];
  }

  vertices() {
    return this.V;
  }
}

class DFSDirectedPath {
  constructor(G, s) {
    this.s = s;
    this.G = G;
    this.marked = new Array(G.vertices()).fill(false);
    this.paths = [];
  }

  pathTo(v) {
    this.dfs(this.s, v, []);
    return this.paths;
  }

  dfs(s, v, path) {
    if (s == v) {
      this.paths.push([...path, s]);
      return;
    }
    this.marked[s] = true;
    path.push(s);
    for (const w of this.G.adjacent(s)) {
      if (!this.marked[w]) {
        this.dfs(w, v, path);
      }
    }
    path.pop();
    this.marked[s] = false;
  }
}

var allPathsSourceTarget = function (graph) {
  //create DAG
  const G = new Diagraph(graph.length);
  for (let i = 0; i < graph.length; i++) {
    graph[i].forEach((node) => G.connect(i, node));
  }
  //create path from source node '0'
  const DFSPath = new DFSDirectedPath(G, 0);
  return DFSPath.pathTo(graph.length - 1);
};

/*
Approach II: DFS + Backtracking (With complete Graph code)
Time: O(2^N * N)
 - There could be at most 2^{N-1} -1 possible paths in the graph.
 - For each path, there could be at most N-2 intermediate nodes, i.e. it takes O(N) time to build a path.

Space: O(2^N * N)
 - Since at most we could have 2^{N-1}-1 paths as the results and each path can contain
up to N nodes, the space we need to store the results would be O(2^N * N).
 - the recursion would require additional O(N) space.

Runtime: 168 ms, faster than 30.29% of JavaScript online submissions for All Paths From Source to Target.
Memory Usage: 48.1 MB, less than 98.48% of JavaScript online submissions for All Paths From Source to Target.
 */
var allPathsSourceTarget = function (graph) {
  const paths = [];
  if (graph == null || graph.length == 0) return paths;

  const backtrack = (v, currPath) => {
    //reached target node
    if (v == graph.length - 1) {
      paths.push([...currPath]);
    }
    //explores the neighbor of node 'v'
    for (let w of graph[v]) {
      //add current node in the path
      currPath.push(w);
      backtrack(w, currPath);
      //remove the previous node choice to try with other nodes
      currPath.pop();
    }
  };

  backtrack(0, [0]);
  return paths;
};
