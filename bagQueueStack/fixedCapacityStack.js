class FixedSizeStack {
    constructor(capacity) {
        this.N = 0;
        this.a = [capacity || 1];
    }

    push(item) {
        //javascript array or dynamic, i.e., the size will be expanded 
        // automatically when they are full
        this.a[this.N++] = item;
    }

    pop() {
        if (this.isEmpty()) return null;
        const item = this.a[--this.N];
        //Avoid loitering
        this.a[this.N] = null;
        return item;
    }

    top() {
        return this.a[this.N - 1];
    }

    size() {
        return this.N;
    }

    isEmpty() {
        return this.N == 0;
    }
}