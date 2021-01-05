class MinPQ {

    constructor() {
        this.items = [];
        this.n = 0;
    }


    insert(key) {
        //insert at the end of array
        this.items[++this.n] = key;
        //swim it up
        this.swim(this.n);
        console.log(`final array: ${this.items}`);
    }

    // APIs
    swim(k) {
        while (k > 1 && this.greater(parseInt(k / 2), k)) {
            this.swap(k, parseInt(k / 2));
            k = parseInt(k / 2);
        }
    }

    deleteMin() {
        const max = this.items[1];
        // move last item at 1st position
        this.items[1] = this.items[this.n];
        console.log(`array after moving last element at top: ${this.items}`);
        // set the last item reference to null
        // optionally, we can retain the deleted items for sorting the array, if we want
        this.items[this.n] = null;
        this.n--;
        //sink the item
        this.sink(1);
        console.log(`final array: ${this.items}`);
        return max;
    }

    sink(k) {
        console.log(`k: ${k}, n: ${this.n}`)
        while (2 * k <= this.n) {
            let j = 2 * k;
            console.log(`j: ${j}`);
            //find the max of the child
            if (j < this.n && this.greater(j, j + 1)) j++;
            // if the parent is not less than the max of the child node then stop 
            // sinking as heap is ordered now
            if (!this.greater(k, j)) break;
            // swap the parent with max of the child
            console.log(`j of max child: ${j}`);
            this.swap(k, j);
            k = j;
        }
    }

    greater(a, b) {
        return this.items[a] > this.items[b];
    }

    swap(i, j) {
        [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }
}