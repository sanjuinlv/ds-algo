/* 
785. Is Graph Bipartite?
https://leetcode.com/problems/is-graph-bipartite/description/
Type: Medium

Given an undirected graph, return true if and only if it is bipartite.

Recall that a graph is bipartite if we can split its set of nodes into
two independent subsets A and B, such that every edge in the graph has 
one node in A and another node in B.

The graph is given in the following form: graph[i] is a list of indexes 
j for which the edge between nodes i and j exists.  Each node is an integer 
between 0 and graph.length - 1.  
There are no self edges or parallel edges: graph[i] does not contain i, 
and it doesn't contain any element twice.

Example 1:
(0)---------(1)
 |           |
 |           |
 |           |
(3)---------(2)

Input: graph = [[1,3],[0,2],[1,3],[0,2]]
Output: true
Explanation: We can divide the vertices into two groups: {0, 2} and {1, 3}.

(0)---(1)
 | \   |
 |  \  |
 |   \ |
(3)---(2)
Example 2:
Input: graph = [[1,2,3],[0,2],[0,1,3],[0,2]]
Output: false
Explanation: We cannot find a way to divide the set of nodes into two independent subsets.

Constraint:
1 <= graph.length <= 100
0 <= graph[i].length < 100
0 <= graph[i][j] <= graph.length - 1
graph[i][j] != i
All the values of graph[i] are unique.
The graph is guaranteed to be undirected. 
*/
/**
 * @param {number[][]} graph
 * @return {boolean}
 */
/* 
Time complexity: O(N+E)
Space complexity: O(N)

/* 
Approach I: DFS
Time: O(N + E), where N is the number of nodes in the graph, and E is the number of edges. 
We explore each node once when we transform it from uncolored to colored, traversing all
its edges in the process.
Space: O(N), the space used to store the color/visited

Runtime: 1 ms Beats 91.59%
Memory Usage: 50.03 MB Beats 100.00%
 */
var isBipartite = function (graph) {
  const N = graph.length;
  const visited = new Array(N).fill(false);
  const color = new Array(N).fill(false);
  const dfs = (G, v, visited, color) => {
    visited[v] = true;
    //visit the neighbors
    for (let w of G[v]) {
      //neighbor is not yet visited
      if (!visited[w]) {
        //color this node opposite color of 'v' and perform dfs
        color[w] = !color[v];
        if (!dfs(G, w, visited, color)) return false;
        //'v' and 'w' color is same so this graph can not be biPartite
      } else if (color[w] == color[v]) {
        return false;
      }
    }
    return true;
  };

  for (let s = 0; s < N; s++) {
    if (!visited[s]) {
      if (!dfs(graph, s, visited, color)) return false;
    }
  }
  return true;
};


/* 
DFS: without using auxiliary array 'marked'
Runtime: 76 ms, faster than 98.60% of JavaScript online submissions for Is Graph Bipartite?.
Memory Usage: 41.3 MB, less than 64.34% of JavaScript online submissions for Is Graph Bipartite?.
*/
var isBipartite = function (graph) {
  //-1: not colored, 1: Blue, 0: Red
  const colors = new Array(graph.length).fill(-1);
  const dfs = (graph, v, color) => {
    colors[v] = color;
    for (let w of graph[v]) {
      //vertex is not yet colored
      if (colors[w] == -1) {
        //pass the compliment of the vertex 'v' color
        if (!dfs(graph, w, colors[v] ^ 1)) return false;
      } else if (colors[w] == colors[v]) {
        // color of two vertex connected with the edge are same, so its not bipartite
        return false;
      }
    }
    return true;
  };
  //process each component one by one
  for (let s = 0; s < graph.length; s++) {
    if (colors[s] == -1 && !dfs(graph, s, 0)) {
      return false;
    }
  }
  return true;
};

/* 
Approach II: BFS
PASS - [[1,3],[0,2],[1,3],[0,2]]
PASS - [[1,2,3],[0,2],[0,1,3],[0,2]]
PASS - [[],[2,4,6],[1,4,8,9],[7,8],[1,2,8,9],[6,9],[1,5,7,8,9],[3,6,9],[2,3,4,6,9],[2,4,5,6,7,8]]
*/
var isBipartite = function (graph) {
  //-1: not colored, 1: Blue, 0: Red
  const marked = new Array(graph.length).fill(false);
  const colors = new Array(graph.length).fill(false);
  //process each component one by one
  for (let s = 0; s < graph.length; s++) {
    //already colored
    if (marked[s]) continue;
    marked[s] = true;
    colors[s] = true;
    const queue = [s];
    while (queue.length > 0) {
      v = queue.shift();
      for (let w of graph[v]) {
        if (!marked[w]) {
          colors[w] = !colors[v];
          marked[w] = true;
          queue.push(w);
        } else if (colors[w] == colors[v]) {
          return false;
        }
      }
    }
  }
  return true;
};

/* 
BFS without auxilary array for marked
PASS - [[1,3],[0,2],[1,3],[0,2]]
PASS - [[1,2,3],[0,2],[0,1,3],[0,2]]
PASS - [[],[2,4,6],[1,4,8,9],[7,8],[1,2,8,9],[6,9],[1,5,7,8,9],[3,6,9],[2,3,4,6,9],[2,4,5,6,7,8]]
*/
var isBipartite = function (graph) {
  //-1: not colored, 1: Blue, 0: Red
  const colors = new Array(graph.length).fill(-1);
  //process each component one by one
  for (let s = 0; s < graph.length; s++) {
    //already colored
    if (colors[s] != -1) continue;
    colors[s] = 0;
    const queue = [s];
    while (queue.length > 0) {
      v = queue.shift();
      for (let w of graph[v]) {
        if (colors[w] == -1) {
          colors[w] = colors[v] ^ 1;
          queue.push(w);
        } else if (colors[w] == colors[v]) {
          return false;
        }
      }
    }
  }
  return true;
};
