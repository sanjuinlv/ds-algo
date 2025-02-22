class Edge {
    constructor(v, w, weight) {
        this.v = v;
        this.w = w;
        this.edgeWeight = weight;
    }

    either(){
        return this.v;
    }

    other(v){
        if (this.v == v) return this.w;
        return this.v;
    }

    weight(){
        return this.edgeWeight;
    }

    //compare
    compareTo(that){
        if (this.edgeWeight < that.weight) return -1;
        else if (this.edgeWeight > that.weight) return 1;
        else return 0;
    }

    toString(){
        const s = `${this.v}-${this.w} ${this.edgeWeight}`;
        return s;
    }
}