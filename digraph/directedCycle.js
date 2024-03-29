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
    this.G = G;
  }

  hasCycle() {
    for (let v = 0; v < this.G.vertices(); v++) {
      if (!this.marked[v] && this.dfs(this.G, v)) {
        return true;
      }
    }
    return false;
  }

  //perform DFS
  dfs(G, v) {
    this.marked[v] = true;
    this.onStack[v] = true;
    for (let w of G.adjacent(v)) {
      if (!this.marked[w] && this.dfs(G, w)) {
        return true;
      } else if (this.onStack[w]) {
        //if dfs on 'w' is not yet completed and encountered
        // again it means there is cycle
        return true;
      }
    }
    //mark it false once done the dfs
    this.onStack[v] = false;
    return false;
  }
}
