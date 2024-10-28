/*
677. Map Sum Pairs
https://leetcode.com/problems/map-sum-pairs/description/
Type: Medium

Design a map that allows you to do the following:
 - Maps a string key to a given value.
 - Returns the sum of the values that have a key with a prefix equal to a given string.

Implement the MapSum class:
- MapSum() Initializes the MapSum object.
- void insert(String key, int val) Inserts the key-val pair into the map. 
    If the key already existed, the original key-value pair will be overridden
    to the new one. 
- int sum(string prefix) Returns the sum of all the pairs' value whose key starts with the prefix.
 
Example 1: 
    Input
    ["MapSum", "insert", "sum", "insert", "sum"]
    [[], ["apple", 3], ["ap"], ["app", 2], ["ap"]]
    Output
    [null, null, 3, null, 5]

    Explanation
    MapSum mapSum = new MapSum();
    mapSum.insert("apple", 3);  
    mapSum.sum("ap");           // return 3 (apple = 3)
    mapSum.insert("app", 2);    
    mapSum.sum("ap");           // return 5 (apple + app = 3 + 2 = 5)

Constraint:
  - 1 <= key.length, prefix.length <= 50
  - key and prefix consist of only lowercase English letters.
  - 1 <= val <= 1000
  - At most 50 calls will be made to insert and sum.
 */
/* 
Approach 1: Brute Force: 
Time Complexity: 
    insert: O(1)
    sum: O(N * P), where N is the no of items in the map and P is length of prefix string
Space: The space used by map is linear in the size of all input key and val values combined.
*/
function MapSum() {
  this.map = new Map();
  this.insert = function (key, val) {
    this.map.set(key, val);
  };

  this.sum = function (prefix) {
    let sum = 0;
    for (let key of this.map.keys()) {
      if (key.startsWith(prefix)) {
        sum += this.map.get(key);
      }
    }
    return sum;
  };
}
/*
Approach 2: Prefix Hashmap: 

Time Complexity: Every insert operation is O(K^2), where K is the length of the key, 
as K strings are made of an average length of K. Every sum operation is O(1).

Space Complexity: The space used by map and score is linear in the size of all input
key and val values combined.
*/
function MapSum() {
  this.map = new Map();
  this.score = new Map();
  this.insert = function (key, val) {
    const delta = val - (this.map.get(key) || 0);
    console.log(`key: ${key}, val: ${val}, delta: ${delta}`);
    this.map.set(key, val);
    let prefix = "";
    for (const c of key) {
      prefix += c;
      console.log();
      this.score.set(prefix, (this.score.get(prefix) || 0) + delta);
    }
  };

  this.sum = function (prefix) {
    return this.score.get(prefix);
  };
}

/* 
Approach : Tries
Time Complexity: Every insert operation is O(K), where K is the length of the key.
Every sum operation is O(K).
Space Complexity: The space used is linear in the size of the total input.

Runtime: 0 ms Beats 100.00%
Memory Usage: 51.00 MB Beats 35.29%
*/
function Node() {
  this.children = new Map();
  this.isWord = false;
  this.val = null;
}

var MapSum = function () {
  this.root = new Node();
};

/**
 * @param {string} key
 * @param {number} val
 * @return {void}
 */
MapSum.prototype.insert = function (key, val) {
  let curr = this.root;
  for (const c of key) {
    if (!curr.children.has(c)) curr.children.set(c, new Node());
    curr = curr.children.get(c);
  }
  curr.val = val;
};

/**
 * @param {string} prefix
 * @return {number}
 */
MapSum.prototype.sum = function (prefix) {
  //get the node for this prefix;
  const node = this.findNode(prefix, this.root);
  if (node == null) return 0;
  const sum = this.collect(node);
  return sum;
};

MapSum.prototype.findNode = function (prefix, node) {
  let curr = node;
  for (const c of prefix) {
    if (!curr.children.has(c)) return null;
    curr = curr.children.get(c);
  }
  return curr;
};

MapSum.prototype.collect = function (node) {
  let sum = node.val ? node.val : 0;
  for (const child of node.children.values()) {
    sum += this.collect(child);
  }
  return sum;
};

/* 
Approach 4: Using Trie with score
Runtime: 76 ms, faster than 56.09% of JavaScript online submissions for Map Sum Pairs.
Memory Usage: 40.2 MB, less than 35.10% of JavaScript online submissions for Map Sum Pairs.

Time Complexity: Every insert operation is O(K), where K is the length of the key.
Every sum operation is O(K).
Space Complexity: The space used is linear in the size of the total input
*/
function MapSum() {
  this.root = new Node();
  this.map = new Map();

  function Node() {
    this.score = 0;
    this.children = new Map();
  }

  this.insert = function (key, val) {
    let curr = this.root;
    const delta = val - (this.map.get(key) || 0);
    this.map.set(key, val);
    for (let c of key) {
      if (!curr.children.has(c)) {
        curr.children.set(c, new Node());
      }
      curr = curr.children.get(c);
      curr.score = delta + curr.score;
    }
  };

  /**
   * @param {string} prefix
   * @return {number}
   */
  this.sum = function (prefix) {
    //find the prefix node
    let curr = this.root;
    for (const c of prefix) {
      if (!curr.children.has(c)) return 0;
      curr = curr.children.get(c);
    }
    //return the score of this node
    return curr.score;
  };
}
/**
 * Your MapSum object will be instantiated and called as such:
 * var obj = new MapSum()
 * obj.insert(key,val)
 * var param_2 = obj.sum(prefix)
 */
