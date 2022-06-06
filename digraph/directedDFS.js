/**
 *  Determine single-source or multiple-source reachability in a digraph
 *  using depth first search.
 *  Runs in O(E + V) time.
 */

/*
Test code for this class
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

reachable = new DirctedDFS(g, 2);
reachableVertices = () => {
    let result = "";
    for(let v = 0; v < g.vertices(); v++){
        if (reachable.isMarked(v)) {
            result += `${v} `;
        }
    }
    console.log(`${result}`);
}
reachableVertices();
Output: 0 1 2 3 4 5 
 */
class DirctedDFS {
  /**
   * Computes the vertices in digraph {@code G} that are
   * reachable from the source vertex {@code s}.
   * @param {*} G
   * @param {*} s
   */
  constructor(G, s) {
    // marked[v] = true if v is reachable from source(s)
    this.marked = new Array(G.vertices()).fill(false);
    // number of vertices reachable from source(s)
    this.count = 0;
    this.dfs(G, s);
  }

  /**
   * Computes the vertices in digraph {@code G} that are
   * connected to any of the source vertices {@code sources}.
   * @param {*} G
   * @param {*} s
   */
  constructor2(G, sources) {
    // marked[v] = true if v is reachable from source(s)
    this.marked = new Array(G.vertices());
    // number of vertices reachable from source(s)
    this.count = 0;
    for (let s of sources) {
      if (!this.marked[s]) this.dfs(G, s);
    }
  }

  dfs(G, v) {
    this.count++;
    this.marked[v] = true;
    for (let w of G.adjacent(v)) {
      if (!this.marked[w]) {
        this.dfs(G, w);
      }
    }
  }

  /**
   * Is there a directed path from the source vertex (or any
   * of the source vertices) and vertex {@code v}?
   * @param {*} v
   * @returns
   */
  isMarked(v) {
    return this.marked[v];
  }

  /**
   * Returns the number of vertices reachable from the source vertex
   * (or source vertices).
   * @returns
   */
  count() {
    return this.count;
  }
}
