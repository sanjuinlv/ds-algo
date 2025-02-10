/* 
g = new Digraph(13)
g.addEdge(4,2);
g.addEdge(2,3);
g.addEdge(3,2);
g.addEdge(6,0);
g.addEdge(0,1);
g.addEdge(2,0);
g.addEdge(11,12);
g.addEdge(12,9);
g.addEdge(9,10);
g.addEdge(9,11);
g.addEdge(7,9);
g.addEdge(10,12);
g.addEdge(11,4);
g.addEdge(4,3);
g.addEdge(3,5);
g.addEdge(6,8);
g.addEdge(8,6);
g.addEdge(5,4);
g.addEdge(0,5);
g.addEdge(6,4);
g.addEdge(6,9);
g.addEdge(7,6);

cycle = new DirectedCycle(g);
cycle.hasCycle(); // true
cycle.getCycle(); //[3, 4, 5, 3]
*/
class DirectedCycle {
  constructor(G) {
    this.marked = new Array(G.vertices()).fill(false);
    this.onStack = new Array(G.vertices()).fill(false);
    this.edgeTo = new Array(G.vertices());
    this.cycle = [];
    for (let v = 0; v < G.vertices(); v++) {
      if (!this.marked[v]) this.dfs(G, v);
    }
  }

  dfs(G, v) {
    this.marked[v] = true;
    this.onStack[v] = true;
    for (let w of G.adjacent(v)) {
      if (this.hasCycle()) return;
      if (!this.marked[w]) {
        this.edgeTo[w] = v;
        this.dfs(G, w);
      } else if (this.onStack[w]) {
        //if dfs on 'w' is not yet completed and encountered
        // again it means there is cycle
        this.cycle = [];
        for (let x = v; x != w; x = this.edgeTo[x]) {
          this.cycle.push(x);
        }
        this.cycle.push(w);
        this.cycle.push(v);
      }
    }
    //mark it false once done the dfs
    this.onStack[v] = false;
  }

  /**
   * Does G have a directed cycle?
   */
  hasCycle() {
    return this.cycle.length > 0;
  }

  /**
   * vertices on a cycle (if exist)
   * @returns iterable of vertices
   */
  getCycle() {
    return this.cycle;
  }
}

class Digraph {
  constructor(V) {
    //number of vertices
    this.V = V;
    //number of edges
    this.E = 0;
    //adjacency list
    this.adj = new Array(V);
    this.initializeGraph(V);
  }

  //private method
  initializeGraph(V) {
    for (let v = 0; v < V; v++) {
      this.adj[v] = [];
    }
  }

  addEdge(v, w) {
    this.adj[v].push(w);
    this.E++;
  }

  adjacent(v) {
    return this.adj[v];
  }

  vertices() {
    return this.V;
  }

  edges() {
    return this.E;
  }

  reverse() {
    const R = new Digraph(this.V);
    for (let v = 0; v < this.V; v++) {
      for (let w of this.adjacent(v)) {
        R.addEdge(w, v);
      }
    }
    return R;
  }

  toString() {
    let s = `${this.V} vertices, ${this.E} edges \n`;
    for (let v = 0; v < this.V; v++) {
      s += `${v}: `;
      for (let w of this.adjacent(v)) {
        s += `${w} `;
      }
      s += `\n`;
    }
    return s;
  }
}

function runTests() {
  // Test Case 1: Graph with a cycle
  console.log("Test Case 1: Graph with a cycle");
  g = new Digraph(13);
  g.addEdge(4,2);
  g.addEdge(2,3);
  g.addEdge(3,2);
  g.addEdge(6,0);
  g.addEdge(0,1);
  g.addEdge(2,0);
  g.addEdge(11,12);
  g.addEdge(12,9);
  g.addEdge(9,10);
  g.addEdge(9,11);
  g.addEdge(7,9);
  g.addEdge(10,12);
  g.addEdge(11,4);
  g.addEdge(4,3);
  g.addEdge(3,5);
  g.addEdge(6,8);
  g.addEdge(8,6);
  g.addEdge(5,4);
  g.addEdge(0,5);
  g.addEdge(6,4);
  g.addEdge(6,9);
  g.addEdge(7,6);  
  const dc = new DirectedCycle(g);
  console.log("has cycle:", dc.hasCycle()); //true
  //TODO: giving output [3,2,3]
  console.log("has cycle:", dc.getCycle()); //[3, 4, 5, 3]
}
//run the test
runTests();