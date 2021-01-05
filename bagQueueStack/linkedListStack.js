function Stack() {
    this.N = 0;
    this.first = null;

    function Node(item) {
        this.item = item;
        //TODO: need to correct it
        let next = null;
    }

    this.push = function(item) {
        //copy old node
        const oldNode = this.first;
        //create new node
        this.first = new Node(item);
        // assign old node as link with new node
        this.first.next = oldNode;
        this.N++;
    }

    this.pop = function() {
        if (this.isEmpty()) return null;
        //copy the first node (top) reference which value needs to be returned
        const item = this.first.item;
        this.first = this.first.next;
        this.N--;
        return item;
    }

    this.top = function() {
        if (this.isEmpty()) return null;
        return this.first.item;
    }

    this.size = function() {
        return this.N;
    }

    this.isEmpty = function() {
        return this.N == 0;
    }
    
    //Iterator implementation
    this[Symbol.iterator] = function() {
        this.current = this.first;
        return this;
    }

    //The next method which will be called by iterator 
    this.next = function() {
        if (this.current != null) {
            const value = this.current.item;
            this.current = this.current.next;
            return {done: false, value: value}
        } else {
            return {done: true};
        }
    }

}