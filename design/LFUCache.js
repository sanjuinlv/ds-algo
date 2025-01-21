/* 
460. LFU Cache
https://leetcode.com/problems/lfu-cache
Type: Hard

Design and implement a data structure for a Least Frequently Used (LFU) cache.

Implement the LFUCache class:

LFUCache(int capacity) Initializes the object with the capacity of the data structure.
int get(int key) Gets the value of the key if the key exists in the cache. Otherwise, returns -1.
void put(int key, int value) Update the value of the key if present, or inserts the key if not already present. When the cache reaches its capacity, it should invalidate and remove the least frequently used key before inserting a new item. For this problem, when there is a tie (i.e., two or more keys with the same frequency), the least recently used key would be invalidated.
To determine the least frequently used key, a use counter is maintained for each key in the cache. The key with the smallest use counter is the least frequently used key.

When a key is first inserted into the cache, its use counter is set to 1 (due to the put operation). The use counter for a key in the cache is incremented either a get or put operation is called on it.

The functions get and put must each run in O(1) average time complexity.

Example 1:
Input
["LFUCache", "put", "put", "get", "put", "get", "get", "put", "get", "get", "get"]
[[2], [1, 1], [2, 2], [1], [3, 3], [2], [3], [4, 4], [1], [3], [4]]
Output
[null, null, null, 1, null, -1, 3, null, -1, 3, 4]

Explanation
// cnt(x) = the use counter for key x
// cache=[] will show the last used order for tiebreakers (leftmost element is  most recent)
LFUCache lfu = new LFUCache(2);
lfu.put(1, 1);   // cache=[1,_], cnt(1)=1
lfu.put(2, 2);   // cache=[2,1], cnt(2)=1, cnt(1)=1
lfu.get(1);      // return 1
                 // cache=[1,2], cnt(2)=1, cnt(1)=2
lfu.put(3, 3);   // 2 is the LFU key because cnt(2)=1 is the smallest, invalidate 2.
                 // cache=[3,1], cnt(3)=1, cnt(1)=2
lfu.get(2);      // return -1 (not found)
lfu.get(3);      // return 3
                 // cache=[3,1], cnt(3)=2, cnt(1)=2
lfu.put(4, 4);   // Both 1 and 3 have the same cnt, but 1 is LRU, invalidate 1.
                 // cache=[4,3], cnt(4)=1, cnt(3)=2
lfu.get(1);      // return -1 (not found)
lfu.get(3);      // return 3
                 // cache=[3,4], cnt(4)=1, cnt(3)=3
lfu.get(4);      // return 4
                 // cache=[4,3], cnt(4)=2, cnt(3)=3
 

Constraints:

1 <= capacity <= 104
0 <= key <= 105
0 <= value <= 109
At most 2 * 105 calls will be made to get and put.
*/
/* 
Approach I: Using Hash Table

Runtime: 129 ms Beats 87.65%
Memory: 109.62 MB Beats 6.17%
*/
class Node {
  constructor(key, value) {
    this.key = key;
    this.value = value;
    this.frequency = 1;
    this.next = null;
    this.prev = null;
  }
}

class DoubleLinkedList {
  constructor() {
    this.listSize = 0;
    this.head = new Node();
    this.tail = new Node();
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * Add node into the head of the list increase the list size
   * @param {*} node
   */
  addNode(node) {
    const next = this.head.next;
    node.next = next;
    node.prev = this.head;
    next.prev = node;
    this.head.next = node;
    this.listSize++;
  }

  /**
   * Removes node from the tail and decrese list size
   * @param {*} node
   */
  removeNode(node) {
    node.prev.next = node.next;
    node.next.prev = node.prev;
    this.listSize--;
  }
}

class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.currSize = 0;
    //frequency of the last linked list (the minimum frequency of entire LFU cache)
    this.minFrequency = 0;
    //a hash map that has key to Node mapping, which used for storing all nodes by their keys
    this.cache = new Map();
    //a hash map that has frequency key to linked list mapping, which used for storing all double linked list by their frequencies
    this.frequencyMap = new Map();
  }

  /* Get node value by key, and then update node frequency as well as relocate that node */
  get(key) {
    if (!this.cache.has(key)) return -1;
    const node = this.cache.get(key);
    this.updateNode(node);
    return node.value;
  }

  put(key, value) {
    //corenr case
    if (this.capacity == 0) return;
    //key exists
    if (this.cache.has(key)) {
      const node = this.cache.get(key);
      node.value = value;
      this.updateNode(node);
    } else {
      //key does not exist
      this.currSize++;
      //check if capcity has exceeded
      if (this.currSize > this.capacity) {
        //get min freq list
        const minFreqList = this.frequencyMap.get(this.minFrequency);
        const nodeToDelete = minFreqList.tail.prev;
        //remove least recently used item
        minFreqList.removeNode(nodeToDelete);
        this.cache.delete(nodeToDelete.key);
        if (minFreqList.listSize === 0) {
          this.frequencyMap.delete(this.minFrequency);
        }
        this.currSize--;
      }
      //reste min frequency to 1 as we are adding new node
      this.minFrequency = 1;
      const newNode = new Node(key, value);
      //get the list with freq 1, and then add new node to it
      const currList = this.frequencyMap.get(1) || new DoubleLinkedList();
      currList.addNode(newNode);
      this.frequencyMap.set(1, currList);
      this.cache.set(key, newNode);
    }
  }

  updateNode(node) {
    //frequency of this node
    const currFreq = node.frequency;
    //get list for this frequency
    const currList = this.frequencyMap.get(currFreq);
    //remove this node from the list
    currList.removeNode(node);
    //if no item left in currList then remove from freq map
    if (currList.listSize === 0) {
      this.frequencyMap.delete(currFreq);
    }
    // If current list is the last list which has lowest frequency and current node is the only node in that list
    // we need to remove the entire list and then increase min frequency value by 1
    if (currFreq == this.minFrequency && currList.listSize == 0) {
      this.minFrequency++;
    }
    //increment this node frequency count
    node.frequency++;
    // add current node to another list which has current frequency + 1,
    // if we do not have the list with this frequency, initialize it
    const newList =
      this.frequencyMap.get(node.frequency) || new DoubleLinkedList();
    //add this node to new frequency list
    newList.addNode(node);
    //update or set the frequncy list
    this.frequencyMap.set(node.frequency, newList);
  }
}
