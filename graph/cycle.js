/**
 * Detects if the given Graph has cycle
 * There is a cycle in a graph only if there is a back edge present in the graph.
 * A back edge is an edge that is joining a node to itself (self-loop)
 * or one of its ancestor in the tree produced by DFS.
 * To find the back edge to any of its ancestor keep a visited array and if there
 * is a back edge to any visited node then there is a loop and return true.
 */
class Cycle {
  constructor(G) {
    this.marked = new Array(G.vertices());
    this.cycle = false;
    for (let s = 0; s < G.vertices(); s++) {
      this.dfs(G, s, s);
    }
  }

  /**
   *
   * @param {Graph} G
   * @param {Vertex} v - current vertex
   * @param {Vertex} parent - path from which we went to 'v'
   */
  dfs(G, v, parent) {
    this.marked[v] = true;
    console.log(`v: ${v}, u: ${parent}`);
    for (let w of G.adjacent(v)) {
      console.log(`w: ${w}`);
      //if the vertex is not visited
      if (!this.marked[w]) {
        this.dfs(G, w, v);
        /* If an adjacent is visited and not parent of current vertex, 
                then there is a cycle */
      } else if (w != parent) {
        console.log(`cycle at vertex ${w}`);
        this.cycle = true;
      }
    }
  }

  hasCycle() {
    return this.cycle;
  }
}

class UndirectedGraph {
  constructor() {
    this.adjacenyList = new Map();
  }

  addVertex(v) {
    if (!this.adjacenyList.has(v)) this.adjacenyList.set(v, []);
  }

  addEdge(v, w) {
    this.addVertex(v);
    this.addVertex(w);
    this.adjacenyList.get(v).push(w);
    this.adjacenyList.get(w).push(v);
  }

  hasCycleUtil(v, parent, visited) {
    visited[v] = true;
    //traverse adjacent nodes
    for (const neighbor of this.adjacenyList.get(v)) {
      if (!visited[neighbor]) {
        //perform dfs on neighbor
        if (this.hasCycleUtil(neighbor, v, visited)) {
          return true;
        }
        // If an adjacent vertex is visited and not the parent of current vertex,
        // then there is a cycle
      } else if (neighbor != parent) {
        return true;
      }
    }
    return false;
  }

  hasCycle() {
    const visited = new Array(this.adjacenyList.size).fill(false);
    //perform dfs on each nodes in graph to check for cycle
    for (const v of this.adjacenyList.keys()) {
      if (!visited[v]) {
        if (this.hasCycleUtil(v, v, visited)) return true;
      }
    }
    return false;
  }

  findCyclePath(v, parent, visited, path = []) {
    visited[v] = true;
    path.push(v);
    for (const neighbor of this.adjacenyList.get(v)) {
      if (!visited[neighbor]) {
        //perform dfs on neighbor
        const cyclePath = this.findCyclePath(neighbor, v, visited, path);
        if (cyclePath) return cyclePath;
        // If an adjacent vertex is visited and not the parent of current vertex,
        // then there is a cycle
      } else if (neighbor != parent && path.includes(neighbor)) {
        console.log(`cycle found for at ${neighbor}`, path);
        // Found a cycle, return the cycle path
        const cycleStart = path.indexOf(neighbor);
        //adding this to complete the cycle path
        path.push(neighbor);
        return path.slice(cycleStart);
      }
    }
    path.pop();
    return null;
  }

  getCyclePath() {
    const visited = new Array(this.adjacenyList.size).fill(false);
    for (const v of this.adjacenyList.keys()) {
      if (!visited[v]) {
        const cyclePath = this.findCyclePath(v, v, visited);
        if (cyclePath) return cyclePath;
      }
    }
    return null;
  }
}

// Test cases
function runTests() {
  // Test Case 1: Graph with a cycle
  console.log("Test Case 1: Graph with a cycle");
  const graph1 = new UndirectedGraph();
  graph1.addEdge(0, 1);
  graph1.addEdge(1, 2);
  graph1.addEdge(2, 3);
  graph1.addEdge(3, 0); // Creates cycle: 0 - 1 - 2 - 3 - 0
  console.log("Has cycle:", graph1.hasCycle());
  console.log("Cycle path:", graph1.getCyclePath());

  // Test Case 2: Graph without a cycle (tree)
  console.log("\nTest Case 2: Graph without a cycle");
  const graph2 = new UndirectedGraph();
  graph2.addEdge(0, 1);
  graph2.addEdge(1, 2);
  graph2.addEdge(2, 3);
  console.log("Has cycle:", graph2.hasCycle());
  console.log("Cycle path:", graph2.getCyclePath());

  // Test Case 3: Complex graph with multiple cycles
  console.log("\nTest Case 3: Complex graph with multiple cycles");
  const graph3 = new UndirectedGraph();
  graph3.addEdge(0, 1);
  graph3.addEdge(1, 2);
  graph3.addEdge(2, 3);
  graph3.addEdge(3, 4);
  graph3.addEdge(4, 1); // Creates one cycle 1-2-3-4-1
  graph3.addEdge(3, 5);
  graph3.addEdge(5, 6);
  graph3.addEdge(6, 3); // Creates another cycle
  console.log("Has cycle:", graph3.hasCycle());
  console.log("Cycle path:", graph3.getCyclePath());
}

// Run the tests
runTests();
