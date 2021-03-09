/**
 * Detects if the given Graph has cycle
 * There is a cycle in a graph only if there is a back edge present in the graph. 
 * A back edge is an edge that is joining a node to itself (self-loop) 
 * or one of its ancestor in the tree produced by DFS. 
 * To find the back edge to any of its ancestor keep a visited array and if there
 * is a back edge to any visited node then there is a loop and return true.
 */
class Cycle {
    constructor(G){
        this.marked = new Array(G.vertices());
        this.cycle = false;
        for(let s = 0; s < G.vertices(); s++){
            this.dfs(G, s, s);
        }
    }

    /**
     * 
     * @param {Graph} G 
     * @param {Vertex} v - current vertex
     * @param {Vertex} parent - path from which we went to 'v'
     */
    dfs(G, v, parent){
        this.marked[v] = true;
        console.log(`v: ${v}, u: ${parent}`);
        for(let w of G.adjacent(v)){
            console.log(`w: ${w}`);
            //if the vertex is not visited
            if (!this.marked[w]){
                this.dfs(G, w, v);
            /* If an adjacent is visited and not parent of current vertex, 
                then there is a cycle */                
            } else if(w != parent){
                console.log(`cycle at vertex ${w}`);
                this.cycle = true;
            }
        }
    }

    hasCycle(){
        return this.cycle;
    }
}