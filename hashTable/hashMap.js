/*
Design a HashMap without using any built-in hash table libraries.

Implement the MyHashMap class:
    - MyHashMap() initializes the object with an empty map.
    - void put(int key, int value) inserts a (key, value) pair into the HashMap. If the key already exists in the map, update the corresponding value.
    - int get(int key) returns the value to which the specified key is mapped, or -1 if this map contains no mapping for the key.
    - void remove(key) removes the key and its corresponding value if the map contains the mapping for the key.=

Input
["MyHashMap", "put", "put", "get", "get", "put", "get", "remove", "get"]
[[], [1, 1], [2, 2], [1], [3], [2, 1], [2], [2], [2]]
Output
[null, null, null, 1, -1, null, 1, null, -1]

Explanation
MyHashMap myHashMap = new MyHashMap();
myHashMap.put(1, 1); // The map is now [[1,1]]
myHashMap.put(2, 2); // The map is now [[1,1], [2,2]]
myHashMap.get(1);    // return 1, The map is now [[1,1], [2,2]]
myHashMap.get(3);    // return -1 (i.e., not found), The map is now [[1,1], [2,2]]
myHashMap.put(2, 1); // The map is now [[1,1], [2,1]] (i.e., update the existing value)
myHashMap.get(2);    // return 1, The map is now [[1,1], [2,1]]
myHashMap.remove(2); // remove the mapping for 2, The map is now [[1,1]]
myHashMap.get(2);    // return -1 (i.e., not found), The map is now [[1,1]]    

Constraints:
    - 0 <= key, value <= 10^6
    - At most 10^4 calls will be made to put, get, and remove.
*/

/*
Runtime: 283 ms, faster than 37.27% of JavaScript online submissions for Design HashMap.
Memory Usage: 49.5 MB, less than 44.18% of JavaScript online submissions for Design HashMap.
 */
var MyHashMap = function () {
  this.capacity = 769;
  this.bucket = new Array(this.capacity);

  function Node(key, val) {
    this.key = key;
    this.val = val;
    this.next = null;
  }

  this.hash = function (key) {
    return key % this.capacity;
  };

  this.contains = function (key) {
    const hash = this.hash(key);
    let head = this.bucket[hash];
    //no node found
    if (!head) return false;
    head = head.next;
    //search all node in this bucket
    while (head != null) {
      if (head.key === key) return true;
      head = head.next;
    }
    return false;
  };

  this.put = function (key, value) {
    const hash = this.hash(key);
    const head = this.bucket[hash];
    //node already exists for this bucket, which means entry exists for some key or this key
    if (head) {
      //iterate all nodes to
      let prev = head;
      let curr = head.next;
      while (curr != null) {
        if (curr.key === key) {
          //replace value if entry already exists
          curr.val = value;
          return;
        }
        prev = curr;
        curr = curr.next;
      }
      prev.next = new Node(key, value);
    } else {
      //no node exists. add this entry
      const node = new Node(0, -1); //dummy node
      node.next = new Node(key, value);
      this.bucket[hash] = node;
    }
  };

  this.get = function (key) {
    const hash = this.hash(key);
    let head = this.bucket[hash];
    if (!head) return -1;
    head = head.next;
    while (head != null) {
      if (head.key === key) return head.val;
      head = head.next;
    }
    return -1;
  };

  this.remove = function (key) {
    const hash = this.hash(key);
    const head = this.bucket[hash];
    if (!head) return null;
    let prev = head;
    let curr = head.next;
    while (curr != null) {
      if (curr.key === key) {
        prev.next = curr.next;
        return curr.val;
      }
      prev = curr;
      curr = curr.next;
    }
    return null;
  };
};

/* 
Others Java solution

class MyHashMap {
        final ListNode[] nodes = new ListNode[10000];

        public void put(int key, int value) {
            int i = idx(key);
            if (nodes[i] == null)
                nodes[i] = new ListNode(-1, -1);
            ListNode prev = find(nodes[i], key);
            if (prev.next == null)
                prev.next = new ListNode(key, value);
            else prev.next.val = value;
        }

        public int get(int key) {
            int i = idx(key);
            if (nodes[i] == null)
                return -1;
            ListNode node = find(nodes[i], key);
            return node.next == null ? -1 : node.next.val;
        }

        public void remove(int key) {
            int i = idx(key);
            if (nodes[i] == null) return;
            ListNode prev = find(nodes[i], key);
            if (prev.next == null) return;
            prev.next = prev.next.next;
        }

        int idx(int key) { return Integer.hashCode(key) % nodes.length;}

        ListNode find(ListNode bucket, int key) {
            ListNode node = bucket, prev = null;
            while (node != null && node.key != key) {
                prev = node;
                node = node.next;
            }
            return prev;
        }

        class ListNode {
            int key, val;
            ListNode next;

            ListNode(int key, int val) {
                this.key = key;
                this.val = val;
            }
        }
    }
*/
