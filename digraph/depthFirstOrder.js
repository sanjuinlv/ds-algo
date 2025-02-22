/* 
g = new Digraph(7)
g.addEdge(0,5);
g.addEdge(0,2);
g.addEdge(0,1);
g.addEdge(3,6);
g.addEdge(3,5);
g.addEdge(3,4);
g.addEdge(5,2);
g.addEdge(6,4);
g.addEdge(6,0);
g.addEdge(6,0);
g.addEdge(3,2);
g.addEdge(1,4);

dfsOrder = new DepthFirstOrder(g);

order = dfsOrder.getReversePost();
let printOrder = (order) => {
    const N = order.length;
    //since data is stored as stack
    for(let i = N-1; i >= 0; i--){
        console.log(order[i]);
    } 
} 
printOrder(order);

*/
/**
 * We can get topological sort order of directed acyclic grap (DAG)
 */
class DepthFirstOrder {
  constructor(G) {
    this.marked = new Array(G.vertices()).fill(false);
    this.reversePost = [];
    //run DFS from each vertices
    for (let v = 0; v < G.vertices(); v++) {
      if (!this.marked[v]) this.dfs(G, v);
    }
  }

  dfs(G, v) {
    this.marked[v] = true;
    for (let w of G.adjacent(v)) {
      if (!this.marked[w]) {
        this.dfs(G, w);
      }
    }
    //done with this vertex. Add in reverse postorder array
    this.reversePost.push(v);
  }

  getReversePost() {
    return this.reversePost;
  }
}
