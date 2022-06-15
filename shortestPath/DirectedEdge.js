class DirectedEdge {
  constructor(v, w, weight) {
    this.v = v;
    this.w = w;
    this.edgeWeight = weight;
  }

  from() {
    return this.v;
  }

  to() {
    return this.w;
  }

  weight() {
    return this.edgeWeight;
  }
}
