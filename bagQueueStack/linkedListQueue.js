//FIFO
/* 
q = new Queue();
q.enqueue(1);
q.enqueue(2);
q.enqueue(3);
q.enqueue(4);
q.enqueue(5);
*/
function Queue() {
    this.N = 0;
    //link to the least recently added node
    this.first = null;
    //link to the most recently added node
    this.last = null;

    function Node(item) {
        this.item = item;
        this.next = null;
    }

    this.enqueue = (item) => {
        const oldLast = this.last;
        const newNode = new Node(item);
        this.last = newNode;
        if (this.isEmpty()) {
            this.first = this.last;
        } else {
            oldLast.next = this.last;
        }
        this.N++;
    }

    this.dequeue = () => {
        if (this.isEmpty()) return null;
        const item = this.first.item;
        this.first = this.first.next;
        if (this.isEmpty()) this.last = null;
        this.N--;
        return item;
    }

    this.top = function() {
        if (this.isEmpty()) return null;
        return this.first.item;
    }

    this.size = () => {
        return this.N;
    }

    this.isEmpty = () => {
        return this.N == 0;
    }
}