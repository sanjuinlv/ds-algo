/* 
Runtime: 811 ms, faster than 9.39% of JavaScript online submissions for LRU Cache.
Memory Usage: 119.9 MB, less than 13.44% of JavaScript online submissions for LRU Cache.
*/

function LRUCache(capacity) {

    this.size = 0;
    this.capacity = capacity;
    this.cache = new Map();
    const head = new DLinkedNode();
    const tail = new DLinkedNode();
    head.next = tail;
    tail.next = head;
    
    function DLinkedNode(key, value){
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }

    /**
     * Always add node to the head
     */
    this.addNode = (node) => {
        console.log(head)
        node.prev = head;
        node.next = head.next;
        head.next.prev = node;
        head.next = node;
    }

    this.removeNode = (node) => {
        const prev = node.prev;
        const next = node.next;
        prev.next = next;
        next.prev = prev;
    }

    this.moveToHead = (node) => {
        this.removeNode(node);
        this.addNode(node);
    }

    this.popTail = () => {
        const tailNode = tail.prev;
        this.removeNode(tailNode);
        return tailNode;
    }

    this.get = (key) => {
        const node = this.cache.get(key);
        if (node == null) return -1;
        //remove this node from list add it to the list tail
        this.moveToHead(node);
        return node.value;
    }

    this.put = (key, value) => {
        //key already exist, so update the value and move to head
        if (this.cache.has(key)){
            const node = this.cache.get(key);
            node.value = value;
            //move to head
            this.moveToHead(node);
        } else {// new entry
            const newNode = new DLinkedNode(key, value);
            this.cache.set(key, newNode);
            //add node to head
            this.addNode(newNode);
            this.size++;
            //check if capacity has exceeded
            if (this.size > capacity){
                //remove from tail
                const tailNode = this.popTail();
                this.cache.delete(tailNode.key);
                this.size--;
            }
        }
    }
}