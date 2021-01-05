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

reachable = new DirectedBFS(g, 2);

for(let v = 0; v < g.vertices(); v++){
    if (reachable.marked[v]) {
        console.log(`${v}`);
    }
}

*/
class DirectedBFS {
    constructor(G, s) {
        this.marked = new Array(G.vertices());
        this.count = 0;
        this.s = s;
        this.bfs(G, s);
    }

    bfs(G, s) {
        this.marked[s] = true;
        const queue = [];
        queue.push(s);
        while(queue.length){
            let v = queue.shift();
            for (let w of G.adjacent(v)) {
                if (!this.marked[w]) {
                    this.marked[w] = true;
                    queue.push(w);
                }
            }
        }
    }

    marked(v){
        return this.marked[v];
    }
}