/* 
208. Implement Trie (Prefix Tree)
https://leetcode.com/problems/implement-trie-prefix-tree
Type: Medium
A trie (pronounced as "try") or prefix tree is a tree data structure used to efficiently store and retrieve keys in a dataset of strings. There are various applications of this data structure, such as autocomplete and spellchecker.

Implement the Trie class:

 - Trie() Initializes the trie object.
 - void insert(String word) Inserts the string word into the trie.
 - boolean search(String word) Returns true if the string word is in the trie (i.e., was inserted before), and false otherwise.
 - boolean startsWith(String prefix) Returns true if there is a previously inserted string word that has the prefix prefix, and false otherwise.
 
Example 1:
Input
["Trie", "insert", "search", "search", "startsWith", "insert", "search"]
[[], ["apple"], ["apple"], ["app"], ["app"], ["app"], ["app"]]
Output
[null, null, true, false, true, null, true]

Explanation
Trie trie = new Trie();
trie.insert("apple");
trie.search("apple");   // return True
trie.search("app");     // return False
trie.startsWith("app"); // return True
trie.insert("app");
trie.search("app");     // return True
 
Constraints:
 - 1 <= word.length, prefix.length <= 2000
 - word and prefix consist only of lowercase English letters.
 - At most 3 * 10^4 calls in total will be made to insert, search, and startsWith.

*/
/*
Runtime: 54 ms Beats 100.00%
Memory: 71.29 MB Beats 28.92%
 */
function Node() {
  this.children = new Map();
  this.isWord = false;
}

var Trie = function () {
  this.root = new Node();
};

/**
 * @param {string} word
 * @return {void}
 */
Trie.prototype.insert = function (word) {
  let curr = this.root;
  for (let c of word) {
    //child node doesn't exist for this character so create new node
    if (!curr.children.has(c)) curr.children.set(c, new Node());
    curr = curr.children.get(c);
  }
  //reached end of the word so mark this node as true
  curr.isWord = true;
};

/**
 * @param {string} word
 * @return {boolean}
 */
Trie.prototype.search = function (word) {
  let curr = this.root;
  for (let c of word) {
    if (!curr.children.has(c)) return false;
    curr = curr.children.get(c);
  }
  return curr.isWord;
};

/**
 * @param {string} prefix
 * @return {boolean} Returns true if there is a previously inserted string
 *  word that has the prefix `prefix`, and false otherwise.
 */
Trie.prototype.startsWith = function (prefix) {
  let curr = this.root;
  for (let c of prefix) {
    if (!curr.children.has(c)) return false;
    curr = curr.children.get(c);
  }
  return true;
};

//using function syntax with recursive methods
function Trie() {
  this.root = new Node();

  function Node() {
    this.children = new Map();
    this.isWord = false;
  }

  /**
   * Inserts a word into the trie.
   * @param {string} word
   * @return {void}
   */
  //iterative
  this.insert = function (word) {
    let curr = this.root;
    for (let c of word) {
      if (!curr.children.has(c)) curr.children.set(c, new Node());
      curr = curr.children.get(c);
    }
    curr.isWord = true;
  };

  //Recursive implementation
  //   this.insert = function (word) {
  //     if (word == null) return;
  //     this.root = this.insertNode(this.root, word, 0);
  //   };

  this.insertNode = function (node, word, d) {
    //root not yet created
    if (node == null) node = new Node();
    //reached till of word
    if (word.length === d) {
      node.isWord = true;
      return node;
    }
    //get character at index d
    const c = word[d];
    //if no children found with this character then create one
    if (!node.children.has(c)) node.children.set(c, new Node());
    //get nodes at dth character
    let childNode = node.children.get(c);
    childNode = this.insertNode(childNode, word, d + 1);
    return node;
  };

  /**
   * Returns if the word is in the trie.
   * @param {string} word
   * @return {boolean}
   */
  this.search = function (word) {
    let curr = this.root;
    for (let c of word) {
      if (!curr.children.has(c)) return false;
      curr = curr.children.get(c);
    }
    return curr.isWord;
  };

  /**
   * Returns if there is any word in the trie that starts with the given prefix.
   * @param {string} prefix
   * @return {boolean}
   */
  this.startsWith = function (prefix) {
    let curr = this.root;
    for (let c of prefix) {
      if (!curr.children.has(c)) return false;
      curr = curr.children.get(c);
    }
    return true;
  };
}
