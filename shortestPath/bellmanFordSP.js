class BellmanFordSP {
  /**
   *
   * @param {EdgeWeightedDigraph} G
   * @param {source vertex} s
   */
  constructor(G, s) {
    // last edge on shortest s->v path
    this.edgeTo = new Array(G.vertices());
    // distance  of shortest s->v path
    this.distTo = new Array(G.vertices()).fill(Infinity);
    this.distTo[s] = 0;
    this.onQueue = new Array(G.vertices()).fill(false);
    this.queue = [];
    //number of calls to relax()
    this.cost = 0;
    this.compute();
  }

  compute(G, s) {
    this.queue.push(s);
    this.onQueue[s] = true;
    while (queue.length && !this.hasNegativeCycle()) {
      const v = this.queue.shift();
      this.onQueue[v] = false;
      this.relax(G, v);
    }
  }

  // relax vertex v and put other endpoints on queue if changed
  relax(G, v) {
    for (let e of G.adjacent(v)) {
      const w = e.to();
      if (this.distTo[w] > this.distTo[v] + e.weight()) {
        this.distTo[w] = this.distTo[v] + e.weight();
        this.edgeTo[w] = e;
        //if this vertex is not on queue then add it
        if (!this.onQueue[w]) {
          this.queue.push(w);
          this.onQueue[w] = true;
        }
      }
      if (++this.cost % G.vertices() === 0) {
        this.findNegativeCycle();
        // found a negative cycle
        if (this.hasNegativeCycle()) return;
      }
    }
  }

  hasNegativeCycle() {
    return cycle != null;
  }

  findNegativeCycle() {
    const V = this.edgeTo.length;
    const spt = new EdgeWeightedDigraph(V);
    for (let v = 0; v < V; v++) {
      if (this.edgeTo[v] !== null) {
        spt.addEdge(this.edgeTo[v]);
      }
    }
    const cycleFinder = new EdgeWeightedDirectedCycle(spt);
    this.cycle = cycleFinder.cycle();
  }

  hasPathTo() {
    return this.distTo[v] < Infinity;
  }

  pathTo(v) {
    const path = [];
    for (let e = this.edgeTo[v]; e != null; e = this.edgeTo[e.from()]) {
      path.push(e);
    }
    return path;
  }
}
