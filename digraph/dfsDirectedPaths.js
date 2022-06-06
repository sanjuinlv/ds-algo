/**
 *  Determine reachability in a digraph from a given vertex using
 *  depth-first search.
 *  Runs in O(E + V) time.
 */
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

reachable = new DepthFirstDirectedPaths(g, 2);

 */
class DepthFirstDirectedPaths {
  constructor(G, s) {
    this.s = s;
    this.marked = new Array(G.vertices()).fill(false);
    this.edgeTo = new Array(G.vertices());
    // this.distTo = new Array(G.vertices());
    this.dfs(G, s);
  }

  dfs(G, v) {
    this.marked[v] = true;
    for (let w of G.adjacent(v)) {
      if (!this.marked[w]) {
        this.edgeTo[w] = v;
        this.dfs(G, w);
      }
    }
  }

  /**
   * Is there a directed path from the source vertex {@code s} to vertex {@code v}?
   * @param {*} v
   * @returns {@code true} if there is a directed path from the source
   *         vertex {@code s} to vertex {@code v}, {@code false} otherwise
   */
  hasPathTo(v) {
    return this.marked[v];
  }

  /**
   * Returns a directed path from the source vertex {@code s} to vertex {@code v}, or
   * {@code null} if no such path.
   * @param  v the vertex
   * @return the sequence of vertices on a directed path from the source vertex
   *         {@code s} to vertex {@code v}, as an Iterable
   */
  pathTo(v) {
    if (!this.hasPathTo(v)) return null;
    const path = [];
    for (let w = v; w != this.s; w = this.edgeTo[w]) {
      path.push(w);
    }
    path.push(this.s);
    return path;
  }
}
