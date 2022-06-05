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

// Test client to print the connected vertices for a given vertex
for (let v of g.adjacent(0)) {
    console.log(`v: ${v}`);
}

// print out each edge twice

for (let v = 0; v < g.vertices(); v++){
    for (let w of g.adjacent(v)) {
        console.log(`${v}-${w}`);
    }
}

 */
class Graph {
  constructor(V) {
    //number of vertices
    this.V = V;
    //number of edges
    this.E = 0;
    //adjaceny list
    this.adj = new Array(V);
    this.initializeGraph(V);
  }

  initializeGraph(V) {
    //initialize all lists to empty
    for (let v = 0; v < V; v++) {
      this.adj[v] = new Bag();
    }
  }

  vertices() {
    return this.V;
  }

  edges() {
    return this.E;
  }

  addEdge(v, w) {
    this.adj[v].add(w);
    this.adj[w].add(v);
    this.E++;
  }

  adjacent(v) {
    return this.adj[v];
  }

  degree(v) {
    return this.adjacent[v].size();
  }

  toString() {
    let s = `${this.V} vertices, ${this.E} edges \n`;
    for (let v = 0; v < this.V; v++) {
      s += `${v}: `;
      for (let w of this.adjacent(v)) {
        s += `${w} `;
      }
      s += `\n`;
    }
    return s;
  }
}

// Class declaration is good for testing
// Firefox doesn't allow re-declaration of same class (in case we fix some bug and run it again)

function Graph(V) {
  //number of vertices
  this.V = V;
  //number of edges
  this.E = 0;
  //adjaceny list
  this.adj = [V];
  for (let v = 0; v < V; v++) {
    this.adj[v] = new Bag();
  }

  this.test = function () {
    console.log(`intitalized`);
  };

  this.vertices = function () {
    return this.V;
  };

  this.edges = function () {
    return this.E;
  };

  this.addEdge = function (v, w) {
    this.adj[v].add(w);
    this.adj[w].add(v);
    this.E++;
  };

  this.adjacent = function (v) {
    return this.adj[v];
  };
}
