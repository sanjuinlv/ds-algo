/*
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

dfsPath = new BreadthFirstPath(g, 0)
path = dfsPath.pathTo(3);

function printPath(path) {
    let pathTo = "";
    for(let v of path) {
        pathTo += `${v} `;
    };
    console.log(pathTo);
}
 */
class BreadthFirstPath {
    constructor(G, s){
        this.marked = new Array(G.vertices());
        this.edgeTo = new Array(G.vertices());
        this.s = s;
        this.bfs(G, s)
    }

    bfs(G, s) {
        const Q = new Queue();
        //mark the source
        this.marked[s] = true;
        //put it on the queue
        Q.enqueue(s);
        while(!Q.isEmpty()){
            //remove next vertex from queue
            let v = Q.dequeue();
            for (let w of G.adjacent(v)){
                //for every unmarked adjacent vertex
                if (!this.marked[w]){
                    // save last edge on a shortes path
                    this.edgeTo[w] = v;
                    //mark it as path is known
                    this.marked[w] = true;
                    // add it to queue
                    Q.enqueue(w);
                }                   
            }
        }

    }

    hasPathTo(v){
        return this.marked[v];
    }

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