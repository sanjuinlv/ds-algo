/*
Test code:
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

for (let v = 0; v < g.vertices(); v++){
    for (let w of g.adjacent(v)){
        console.log(`${v} -> ${w}`);
    }
}
 */
class Digraph {
    constructor(V) {
        //number of vertices
        this.V = V;
        //number of edges
        this.E = 0;
        //adjacency list
        this.adj = new Array(V);        
        this._initializeGraph(V);
    }
    
    //private method
    _initializeGraph(V){
        for (let v = 0; v < V; v++){
            this.adj[v] = new Bag();
        }
    }

    addEdge(v, w){
        this.adj[v].add(w);
        this.E++;
    }

    adjacent(v) {
        return this.adj[v];
    }

    vertices(){
        return this.V;
    }

    edges() {
        return this.E;
    }

    reverse() {
        const R = new Digraph(this.V);
        for (let v = 0; v < this.V; v++){
            for (let w of this.adjacent(v)){
                R.addEdge(w, v);
            }
        }
        return R;
    }

    toString() {
        let s = `${this.V} vertices, ${this.E} edges \n`;
        for (let v = 0; v < this.V; v++){
            s += `${v}: `;
            for (let w of this.adjacent(v)){
                s += `${w} `;
            }
            s += `\n`;
        }
        return s;
    }
}