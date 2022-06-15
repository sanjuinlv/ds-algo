/*
 *  An edge-weighted undirected graph, implemented using adjacency lists.
 *  Parallel edges and self-loops are permitted.
 *
 *  Kruskal algorithm construct MST in time proportional to E log E (in worst case)
 *  Build PQ - E log E (frequency 1)
 *  Delete Min - Log E (Frequency E)
 *  Union - Log V (frequency - V)
 *  connected - Log V (frequency - V)
 */
class KruskalMST {
  /**
   *
   * @param {EdgeWeightedGraph} G
   */
  constructor(G) {
    //MST of edges
    this.mst = [];
    this.buildMST(G);
  }

  buildMST(G) {
    //Add edges to min PQ
    /*while queue is not empty or no of edges is < V-1, remove entry from
     Min PQ. Check if vertices of the edge is not connected already, then
     add it to MST and connect vertices of edge (v, w)
     */
    //1. Build Priority Queue
    const pq = new MinPQ(); //with comparable
    for (let edge of G.edges()) {
      pq.insert(edge);
    }
    const uf = new RankUF(G.vertices());
    while (!pq.isEmpty() && this.mst.size() < G.vertices() - 1) {
      const e = pq.deleteMin();
      const v = e.either();
      const w = e.other(v);
      //check if v-w are not connected already, to avoid cycle
      if (!uf.isConnected(v, w)) {
        uf.union(v, w); //merge sets
        this.mst.push(e); //add edge to MST
      }
    }
  }

  edges() {
    return mst;
  }
}
