class EdgeWeightedDirectedCycle {
  /**
   *
   * @param {EdgeWeightedDigraph} G
   */
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
    for (let e of G.adjacency(v)) {
      const w = e.to();
      if (this.cycle.length) return;
      // found new vertex, so recur
      if (!this.marked[w]) {
        this.edgeTo[w] = e;
        this.dfs(G, w);
      } else if (this.onStack[w]) {
        //cycle found, trace back directed cycle
        const f = e;
        while (f.from() != w) {
          this.cycle.push(f);
          f = this.edgeTo[f.from()];
        }
        this.cycle.push(f);
        return;
      }
    }
    this.onStack[v] = false;
  }
}
