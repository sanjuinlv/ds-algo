/* 
Runtime: 811 ms, faster than 9.39% of JavaScript online submissions for LRU Cache.
Memory Usage: 119.9 MB, less than 13.44% of JavaScript online submissions for LRU Cache.

Getting timeout now with submission
*/
function LRUCache(capacity) {
  this.size = 0;
  this.capacity = capacity;
  this.cache = new Map();
  const head = new DLinkedNode();
  const tail = new DLinkedNode();
  head.next = tail;
  tail.next = head;

  function DLinkedNode(key, value) {
    this.key = key;
    this.value = value;
    this.prev = null;
    this.next = null;
  }

  /**
   * Always add node to the head
   */
  this.addNode = (node) => {
    // console.log(head)
    node.prev = head;
    node.next = head.next;
    head.next.prev = node;
    head.next = node;
  };

  this.removeNode = (node) => {
    const prev = node.prev;
    const next = node.next;
    prev.next = next;
    next.prev = prev;
  };

  this.moveToHead = (node) => {
    this.removeNode(node);
    this.addNode(node);
  };

  this.popTail = () => {
    const tailNode = tail.prev;
    this.removeNode(tailNode);
    return tailNode;
  };

  this.get = (key) => {
    const node = this.cache.get(key);
    if (node == null) return -1;
    //remove this node from list add it to the list tail
    this.moveToHead(node);
    return node.value;
  };

  this.put = (key, value) => {
    //key already exist, so update the value and move to head
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      node.value = value;
      //move to head
      this.moveToHead(node);
    } else {
      // new entry
      const newNode = new DLinkedNode(key, value);
      this.cache.set(key, newNode);
      //add node to head
      this.addNode(newNode);
      this.size++;
      //check if capacity has exceeded
      if (this.size > capacity) {
        //remove from tail
        const tailNode = this.popTail();
        this.cache.delete(tailNode.key);
        this.size--;
      }
    }
  };
}

/* 
With ES6
We are utilizing the map key sequence to add it at tail and delete from front
Runtime: 682 ms, faster than 70.43% of JavaScript online submissions for LRU Cache.
Memory Usage: 95.8 MB, less than 87.17% of JavaScript online submissions for LRU Cache.
 */
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map();
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const val = this.map.get(key);
    //delete from map
    this.map.delete(key);
    //add it to map. it gets added at the end(tail) of the map list
    this.map.set(key, val);
    return val;
  }

  put(key, value) {
    //deleting the key is required to put it at the end(tail), if it exists
    if (this.map.has(key)) this.map.delete(key);
    this.map.set(key, value);
    //check if we have exceeded the map capacity
    if (this.map.size > this.capacity) {
      //find the fist entry and delete it
      const firstItem = this.map.keys().next().value;
      this.map.delete(firstItem);
    }
  }
}

/*
Using Object and Doubly Linked list
NOte: This gets timed out
*/
class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}

class DoublyLinkedList {
  constructor() {
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.next = this.head;
    this.length = 0;
  }

  addNode(node) {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next.prev = node;
    this.head.next = node;
    this.length++;
  }

  removeNode(node) {
    const prev = node.prev;
    const next = node.next;
    prev.next = next;
    next.prev = prev;
    this.length--;
  }

  moveToHead(node) {
    this.removeNode(node);
    this.addNode(node);
  }

  popTail() {
    const tail = this.tail.prev;
    this.removeNode(tail);
    return tail;
  }
}

class LRUCache {
  constructor(capacity) {
    this.map = new Map();
    this.linkedList = new DoublyLinkedList();
    this.capacity = capacity;
  }

  get(key) {
    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);
    //move this item as least recently used, by moving it to head of the linked list
    this.moveToHead(node);
    return node.val;
  }

  put(key, value) {
    //if cache already has it then remove it from list to move it at head
    if (this.map.has(key)) this.linkedList.removeNode(this.map.get(key));
    const node = new Node(key, value);
    this.map.set(key, node);
    this.linkedList.addNode(node);
    //check if we have exceeded the cache capacity
    if (this.linkedList.length > this.capacity) {
      const tailNode = this.linkedList.popTail();
      this.map.delete(tailNode.key);
    }
  }
}
