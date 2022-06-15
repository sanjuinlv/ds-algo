class EdgeWeightedGraph {
  constructor(V) {
    //number of vertices
    this.V = V;
    // number of edges
    this.E = 0;
    //Bag of Edges
    this.adj = new Array(V);
    this.initializeGraph(V);
  }

  //private method
  initializeGraph(V) {
    for (let v = 0; v < V; v++) {
      this.adj[v] = new Bag();
    }
  }

  /**
   * Add weighted Edge e to this graph
   * @param {*} e
   */
  addEdge(e) {
    const v = e.either();
    const w = e.other(v);
    this.adj[v].add(e);
    this.adj[w].add(e);
    this.E++;
  }

  /**
   * Returns adjacent edges to v
   * @param {*} v
   */
  adjacent(v) {
    return this.adj[v];
  }

  /**
   * Provides iterable list of edges (ignoring any self loops)
   */
  edges() {
    const allEdges = new Bag();
    for (let v = 0; v < this.V; v++) {
      for (let e of this.adj[v]) {
        if (e.other(v) > v) allEdges.add(e);
      }
    }
    return allEdges;
  }

  /**
   * Returns no of vertices
   */
  vertices() {
    return this.V;
  }

  /**
   * Returns the no of edges
   */
  edgeCount() {
    return this.E;
  }

  /**
   * toString implementation of this graph
   */
  toString() {
    let s = `${this.V} vertices, ${this.E} edges \n`;
    for (let v = 0; v < this.V; v++) {
      s += `${v}: `;
      for (let e of this.adjacent(v)) {
        s += `${e.toString()} `;
      }
      s += `\n`;
    }
    return s;
  }
}
