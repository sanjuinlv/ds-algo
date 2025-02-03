class EdgeWeightedDigraph {
  constructor(V) {
    this.V = V;
    this.E = 0;
    this.adj = new Array(V).fill(new Bag());
  }

  /**
   *
   * @param {DirectedEdge} e
   */
  addEdge(e) {
    const v = e.from();
    this.adj[v].add(e);
    this.E++;
  }

  /**
   * Returns the iterable adjacent edges from vertex v
   * @param {int} v
   */
  adjacent(v) {
    return this.adj[v];
  }

  /**
   * number of vertices
   */
  vertices() {
    return this.V;
  }

  /**
   * number of edges
   */
  edgeCount() {
    this.E;
  }

  /**
   * All edges to this digraph
   */
  edges() {
    const allEdges = new Bag();
    for (let v = 0; v < this.V; v++) {
      for (let e of this.adj[v]) {
        // if (e.other(v) > v) allEdges.add(e);
        allEdges.add(e);
      }
    }
    return allEdges;
  }

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
