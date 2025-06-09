/* 
146. LRU Cache
https://leetcode.com/problems/lru-cache
Type: Medium

Design a data structure that follows the constraints of a Least Recently Used (LRU) cache.

Implement the LRUCache class:

    LRUCache(int capacity) Initialize the LRU cache with positive size capacity.
    int get(int key) Return the value of the key if the key exists, otherwise return -1.
    void put(int key, int value) Update the value of the key if the key exists. Otherwise, add the key-value pair to the cache. If the number of keys exceeds the capacity from this operation, evict the least recently used key.

The functions get and put must each run in O(1) average time complexity.


Example 1:
Input
["LRUCache", "put", "put", "get", "put", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, null, -1, 3, 4]
Explanation
LRUCache lRUCache = new LRUCache(2);
lRUCache.put(1, 1); // cache is {1=1}
lRUCache.put(2, 2); // cache is {1=1, 2=2}
lRUCache.get(1);    // return 1
lRUCache.put(3, 3); // LRU key was 2, evicts key 2, cache is {1=1, 3=3}
lRUCache.get(2);    // returns -1 (not found)
lRUCache.put(4, 4); // LRU key was 1, evicts key 1, cache is {4=4, 3=3}
lRUCache.get(1);    // return -1 (not found)
lRUCache.get(3);    // return 3
lRUCache.get(4);    // return 4

Constraints:
 - 1 <= capacity <= 3000
 - 0 <= key <= 10^4
 - 0 <= value <= 10^5
 - At most 2 * 10^5 calls will be made to get and put.

*/
/* 
Approach: Using doubly linked list and map
Time: O(1) for both get and put
Space: O(capacity)

Runtime: 111 ms Beats 54.75%
Memory: 107.57 MB Beats 24.96%
*/
class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.dic = new Map();
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    if (!this.dic.has(key)) return -1;
    const node = this.dic.get(key);
    //delete this node from list
    this.removeNode(node);
    //add it to the tail
    this.addNode(node);
    return node.val;
  }

  removeNode(node) {
    //next of this node
    const next = node.next;
    const prev = node.prev;
    //detach this node
    prev.next = next;
    next.prev = prev;
  }

  addNode(node) {
    const prev = this.tail.prev;
    prev.next = node;
    node.prev = prev;
    node.next = this.tail;
    this.tail.prev = node;
  }

  put(key, value) {
    //if cache already has it then remove it from list to move it at tail
    if (this.dic.has(key)) this.removeNode(this.dic.get(key));
    const node = new Node(key, value);
    this.dic.set(key, node);
    this.addNode(node);
    //check if capacity is left
    if (this.dic.size > this.capacity) {
      //least recently used node to be removed
      const nodeToRemove = this.head.next;
      //remove from list
      this.removeNode(nodeToRemove);
      //delete from map as well
      this.dic.delete(nodeToRemove.key);
    }
  }
}

/*
Minor optimization

Runtime: 123 ms Beats 21.33%
Memory: 105.02 MB Beats 75.76%
*/
class Node {
  constructor(key, val) {
    this.key = key;
    this.val = val;
    this.next = null;
    this.prev = null;
  }
}
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.dic = new Map();
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  get(key) {
    if (!this.dic.has(key)) return -1;
    const node = this.dic.get(key);
    this.moveToTail(node);
    return node.val;
  }

  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
  }

  addNode(node) {
    const prev = this.tail.prev;
    prev.next = node;
    node.prev = prev;
    node.next = this.tail;
    this.tail.prev = node;
  }

  moveToTail(node) {
    this.removeNode(node);
    this.addNode(node);
  }

  put(key, value) {
    //if key already exists
    if (this.dic.has(key)) {
      const node = this.dic.get(key);
      //update value
      node.val = value;
      this.moveToTail(node);
    } else {
      const node = new Node(key, value);
      this.dic.set(key, node);
      this.addNode(node);
      //capacity is over
      if (this.dic.size > this.capacity) {
        //least recently used node to be removed
        const nodeToRemove = this.head.next;
        //remove from list
        this.removeNode(nodeToRemove);
        //delete from map as well
        this.dic.delete(nodeToRemove.key);
      }
    }
  }
}

/* 
Approach II : With ES6
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
/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */