class MaxPQ {

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
        while (k > 1 && this.less(parseInt(k / 2), k)) {
            this.swap(k, parseInt(k / 2));
            k = parseInt(k / 2);
        }
    }

    deleteMax() {
        const max = this.items[1];
        // move last item at 1st position
        this.items[1] = this.items[this.n];
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
        while (2 * k <= this.n) {
            let j = 2 * k;
            //find the max of the child
            if (j < this.n && this.less(j, j + 1)) j++;
            // if the parent is not less than the max of the child node then stop 
            // sinking as heap is ordered now
            if (!this.less(k, j)) break;
            // swap the parent with max of the child
            this.swap(k, j);
            k = j;
        }
    }

    less(a, b) {
        return this.items[a] < this.items[b];
    }

    swap(i, j) {
        [this.items[i], this.items[j]] = [this.items[j], this.items[i]];
    }
}