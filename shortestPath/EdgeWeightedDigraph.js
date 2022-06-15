/* 
let g = new EdgeWeightedDigraph(5);
g.addEdge(new DirectedEdge(0, 1, .5))
g.addEdge(new DirectedEdge(1, 2, 1.5))
g.addEdge(new DirectedEdge(2, 3, 3.5))

*/
class EdgeWeightedDigraph {
  constructor(V) {
    this.V = V;
    this.E = 0;
    this.indegree = new Array(V).fill(0);
    this.adj = [...Array(V)].map(() => []);
  }

  addEdge(e) {
    const v = e.from();
    this.adj[v].push(e);
    const w = e.to();
    this.indegree[w]++;
    this.E++;
  }

  adjacency(v) {
    return this.adj[v];
  }

  vertices() {
    return this.V;
  }

  edges() {
    const edgeList = [];
    for (let v = 0; v < this.V; v++) {
      for (let e of this.adj[v]) {
        edgeList.push(e);
      }
    }
    return edgeList;
  }

  E() {
    return this.E;
  }

  outDegree(v) {
    return this.adj[v].length;
  }

  inDegree(v) {
    return this.indegree[v];
  }
}
