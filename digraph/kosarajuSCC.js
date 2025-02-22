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

kosarajuSCC = new KosarajuSCC(g);
kosarajuSCC.toString()
--------------- output ---------
5 components
1 
0 2 3 4 5 
9 10 11 12 
6 8 
52 7
*/
/**
 * Phase I: Run DFS on reversed graph, to compute the reverse postorder.
 * Phase II: Run DFS on graph, considering the vertices in order given by first DFS.
 */
class KosarajuSCC {
  constructor(G) {
    //reached vertices
    this.marked = new Array(G.vertices()).fill(false);
    // component identifier
    this.scc = new Array(G.vertices());
    //number of strong component
    this.count = 0;
    // reverse postorder on reversed graph
    const reversePostOrder = new DepthFirstOrder(G.reverse()).getReversePost();
    //run DFS on D^R
    for (let v = reversePostOrder.length - 1; v >= 0; v--) {
      if (!this.marked[reversePostOrder[v]]) {
        this.dfs(G, reversePostOrder[v]);
        this.count++;
      }
    }
  }

  dfs(G, v) {
    this.marked[v] = true;
    this.scc[v] = this.count;
    for (let w of G.adjacent(v)) {
      if (!this.marked[w]) {
        this.dfs(G, w);
      }
    }
  }

  stronglyConnected(v, w) {
    return this.scc[v] == this.scc[w];
  }

  id(v) {
    return this.scc[v];
  }

  getCount() {
    return this.count;
  }

  toString() {
    console.log(`${this.count} components`);
    for (let i = 0; i < this.count; i++) {
      let connectedComponent = "";
      for (let v = 0; v < this.scc.length; v++) {
        if (i == this.scc[v]) {
          connectedComponent += `${v} `;
        }
      }
      console.log(`${connectedComponent}`);
    }
  }
}
