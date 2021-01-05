class Queue {
    constructor(capacity){
        this.N = 0;
        this.a = [capacity || 1];
    }
    //TODO: implement it
    enqueue(item){
        this.N++;
    }

    dequeue() {
        if (this.isEmpty()) return null;
        const item = this.a[this.N--];
        this.a[this.N] = null;
        return item;
    }

    size() {
        return this.N;
    }

    isEmpty(){
        return (this.N === 0);
    }
}