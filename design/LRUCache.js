/* From leetcode */
class LRUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = {};
    this.cache_vals = new LinkedList();
  }

  set(key, value) {
    if (this.cache[key]) {
      // key already exist
      const node = this.cache[key];
      node.data = value;
      this.cache_vals.remove(node);
      this.cache_vals.insert_at_tail(node);
    } else { // new entry
      this.evictIfNeeded();
      const node = new LinkedListNode(key, value);
      this.cache_vals.insert_at_tail(node);
      this.cache[key] = node;
    }
  }

  get(key) {
    //key found
    if (this.cache[key]) {
      const node = this.cache[key];
      this.cache_vals.remove(node);
      this.cache_vals.insert_at_tail(node);
      return node.data;
    } else {
      // cache miss
      return -1;
    }
  }

  evictIfNeeded(){
    //capacity is full
    if (this.cache_vals.size >= this.capacity) { 
        const node = this.cache_vals.remove_head();
        delete this.cache[node.key];
    }
  }

  print() {
    let result = "";
    let node = this.cache_vals.head;
    while (node) {
      result += "(" + node.key + ":" + node.data + "),";
      node = node.next;
    }
    return result;
  }
}
