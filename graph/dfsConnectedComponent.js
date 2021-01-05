class CC {
    /**
     * 
     * @param {Graph} G 
     */
    constructor(G){
        this.marked = new Array(G.vertices());
        this.id = new Array(G.vertices());
        this.count = 0;
        for(let s = 0; s < G.vertices(); s++){
            if (!this.marked[s]){
                this.dfs(G, s);
                this.count++;
            }
        }
    }

    dfs(G, v) {
        this.marked[v] = true;
        this.id[v] = count;
        for (let w of G.adjacent(v)){
            if (!this.marked[w]) {
                this.dfs(G, w);
            }
        }
    }

    /**
     * Returns true if v and w is connected
     * @param {Vertex} v 
     * @param {Vertex} w 
     */
    connected(v, w){
        return id[v] == id[w];
    }

    /**
     * number of connected component
     */
    count() {
        return this.count;
    }

    /**
     * Component identifier for v, between 0 and count()-1
     * @param {Vertex} v 
     */
    id(v){
        return this.id[v];
    }
}