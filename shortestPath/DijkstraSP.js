class DijkstraSP {
  /**
   *
   * @param {EdgeWeightedDigraph} G
   * @param {int} s
   */
  constructor(G, s) {
    this.edgeTo = new Array(G.vertices());
    this.distTo = new Array(G.vertices()).fill(Infinity);
    this.distTo[s] = 0;
    this.pq = new IndexMinPQ();
    this.compute(G, s);
  }

  compute(G, s) {
    this.pq.enqueue(s, 0);
    while (this.pq.size()) {
      const v = this.pq.dequeue();
      for (const e of G.adjacent(v)) {
        this.relax(e);
      }
    }
  }

  /**
   *
   * @param {DirectedEdge} e
   */
  relax(e) {
    const v = e.from();
    const w = e.to();
    if (this.distTo[w] > this.distTo[v] + e.weight()) {
      this.distTo[w] = this.distTo[v] + e.weight();
      this.edgeTo[w] = e;
      //update PQ
      if (this.pq.contains(w)) {
        this.pq.decreaseKey(w, this.distTo[w]);
      } else {
        this.pq.enqueue(w, this.distTo[w]);
      }
    }
  }
}
