/* 
Test Code
g = new Graph(7);
g.addEdge(0,1);
g.addEdge(0,2);
g.addEdge(0,5);
g.addEdge(0,6);
g.addEdge(1,3);
g.addEdge(2,3);
g.addEdge(2,4);
g.addEdge(4,5);
g.addEdge(4,6);

twoColor = new TwoColor(g);
twoColor.isBiPartite(); // => true

// for non bipartite test
g.addEdge(5,1);
twoColor = new TwoColor(g);
twoColor.isBiPartite(); // => false
*/
/**
 * This class can tell if the given graph is bipartite
 */
class TwoColor {
    constructor(G) {
        this.marked  = new Array(G.vertices());
        this.color = new Array(G.vertices());
        this.isTwoColorable = true;
        for(let s = 0; s < G.vertices(); s++){
            this.dfs(G, s);
        }
    }

    dfs(G, v) {
        console.log(`v: ${v}`);
        this.marked[v] = true;
        for (let w of G.adjacent(v)){
            if (!this.marked[w]) {
                //set the vertex 'w' color opposite to vertex 'v'
                this.color[w] = !this.color[v];
                this.dfs(G, w);
            } else if(this.color[v] == this.color[w]) {
                //if w is marked and has same color as v then its not bipartite
                console.log(`not bipartite graph`);
                //TODO: stop the recusion once we identify it ?
                this.isTwoColorable = false;
            }
        }
    }   

    isBiPartite() {
        return this.isTwoColorable;
    }
}