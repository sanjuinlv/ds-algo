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
class DirctedDFS{
    constructor(G, s){
        this.marked = new Array(G.vertices());
        //number of vertices reachable from 's'
        this.count = 0;
        this.dfs(G, s);
    } 

    dfs(G, v) {
        this.count++;
        this.marked[v] = true;
        for (let w of G.adjacent(v)) {
            if (!this.marked[w]){
                this.dfs(G, w);
            }
        }
    }

    isMarked(v){
        return this.marked[v];
    }

    count() {
        return this.count;
    }
}