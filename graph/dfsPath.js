/*
// test client
g = new Graph(13)  
g.addEdge(0,5);
g.addEdge(4,3);
g.addEdge(0,1);
g.addEdge(9,12);
g.addEdge(6,4);
g.addEdge(5,4);
g.addEdge(0,2);
g.addEdge(11,12);
g.addEdge(9,10);
g.addEdge(0,6);
g.addEdge(7,8);
g.addEdge(9,11);
g.addEdge(5,3);

dfsPath = new DepthFirstPath(g, 0)
path = dfsPath.pathTo(3);

function printPath(path) {
    let pathTo = "";
    for(let v of path) {
        pathTo += `${v} `;
    };
    console.log(pathTo);
}
*/

/**
 * Depth first path
 */
class DepthFirstPath {
    /**
     * @param {Graph} G - Graph
     * @param {int} s - source 
     */
    constructor(G, s){
        this.marked = new Array(G.vertices());
        this.edgeTo = new Array(G.vertices());
        this.s = s;
        this.dfs(G,s);
    }

    /**
     * @param {Graph} G - Graph
     * @param {int} s - source 
     */
    dfs(G, v){
        this.marked[v] = true;
        for (let w of G.adjacent(v)){
            if (!this.marked[w]){
                this.edgeTo[w] = v;
                this.dfs(G, w);    
            }
        }
    }

    /**
     * is there a path from s to v?
     * @param {int} v - vertex to which path exist from souce s
     */
    hasPathTo(v){
        return this.marked[v];
    }

    /**
     * path from s to v; null if no such path
     * @param {int} v 
     * @returns iterable (Stack with path)
     */
    pathTo(v){
        if (!this.hasPathTo(v)) return null;
        const path = new Stack();
        for (let x = v; x != this.s; x = this.edgeTo[x]) {
            path.push(x);
        }
        path.push(this.s);
        return path;
    }
}