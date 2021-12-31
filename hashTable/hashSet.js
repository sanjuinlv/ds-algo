/*
Design a HashSet without using any built-in hash table libraries.
Implement MyHashSet class:

void add(key) Inserts the value key into the HashSet.
bool contains(key) Returns whether the value key exists in the HashSet or not.
void remove(key) Removes the value key in the HashSet. If key does not exist in the HashSet, do nothing.
 */

//Simple Solution
var MyHashSet = function () {
  this.data = [];
  this.add = function (key) {
    this.data[key] = key;
  };

  this.remove = function (key) {
    this.data[key] = null;
  };

  this.contains = function (key) {
    if (this.data[key]) return true;
    return false;
  };
};

//handling collision with capacity limit
/*
Using Linked List as Bucket 
Note: Using the bucket size as prime number is better, e.g. 769
Time Complexity: O(N/K), where N is number of all possible values and K is bucket size
Space Complexity: O(K + M), where K is number of pre-defined bucket and M is number of unique values inserted in to HashSet.

Runtime: 188 ms, faster than 56.12% of JavaScript online submissions for Design HashSet.
Memory Usage: 48.8 MB, less than 39.33% of JavaScript online submissions for Design HashSet. 
*/
var MyHashSet = function () {
  this.data = [];
  //Using the bucket size as prime number is better, e.g. 769
  this.capacity = 769;
  function Node(key) {
    this.val = key;
    this.next = null;
  }

  this.add = function (key) {
    const hash = key % this.capacity;
    //entry already exists
    if (this.data[hash]) {
      let head = this.data[hash];
      let prev = head;
      while (head != null) {
        //key already exists
        if (head.val === key) return;
        prev = head;
        head = head.next;
      }
      prev.next = new Node(key);
    } else {
      //no entry found
      const node = new Node(0);
      this.data[hash] = node;
      node.next = new Node(key);
    }
  };

  this.remove = function (key) {
    const hash = key % this.capacity;
    const head = this.data[hash];
    if (!head) return;
    let prev = head;
    let curr = head.next;
    while (curr != null) {
      if (curr.val == key) {
        prev.next = curr.next;
        return;
      }
      prev = curr;
      curr = curr.next;
    }
  };

  this.contains = function (key) {
    const hash = key % this.capacity;
    let head = this.data[hash];
    if (!head) return false;
    head = head.next;
    while (head != null) {
      if (head.val === key) return true;
      head = head.next;
    }
    return false;
  };
};
