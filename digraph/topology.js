class Topology {
  constructor(G) {
    this.order = null;
    const directedCycle = new DirectedCycle(G);
    if (!directedCycle.hasCycle()) {
      const dfs = new DepthFirstOrder();
      this.order = dfs.getReversePost();
    }
  }

  getOrder() {
    return this.order;
  }

  isDAG() {
    return this.order == null;
  }
}
