class DirectedEdge {
    constructor(v, w, weight){
        this.v = v;
        this.w = w;
        this.weight = weight;
    }

    /**
     * Vertex this edge points from
     */
    from() {
        return this.v;
    }

    /**
     * Vertex this edge points to
     */
    to() {
        return this.w;
    }

    /**
     * Weight of this edge
     */
    weight(){
        return this.weight;
    }

    /**
     * String representation
     */
    toString(){
        const s = `${this.v}-${this.w} ${this.weight}`;
        return s;
    }
}