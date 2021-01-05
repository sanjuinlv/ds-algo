function LinkedList(){
    this.N = 0;
    this.head = null;

    function Node(data) {
        this.data = data;
        this.next = null;
    }

    this.length = () => {
        // should we implement iterative method?
        return this.N;
    }

    this.insert = function(data, position = 1){
        console.log(`data: ${data}`);
        if (position > this.N + 1 || position < 1) return null;
        const newNode = new Node(data);
        if (position == 1){
            //insert at begining
            //copy the head node
            const temp = this.head;
            newNode.next = temp;
            this.head = newNode;
        } else {
            //find the node where we need to insert
            let prevNode = this.head;
            let count = 1;     
            //traverse till previous node whose next we want to insert the new node       
            while (count < position - 1){
                prevNode = prevNode.next;
                count++;
            }
            currentNode = prevNode.next;
            newNode.next = currentNode;
            prevNode.next = newNode;
        }
        this.N++;
        return this.head;
    }

    this.delete = function(position = 1){
        if (position > this.N || position < 1) return null;
        if (position == 1) {
            //deleting the node in begining
            let temp = this.head;
            this.head = temp.next;
            temp = null; // eligible for garbage collector
        } else {
            let prevNode = this.head;
            let count = 1;
            while (count < position - 1){
                prevNode = prevNode.next;
                count++;
            }
            let currentNode = prevNode.next;
            prevNode.next = currentNode.next;
            currentNode = null;//eligible for garbage collector
        }
        this.N--;
        return this.head;
    }
}