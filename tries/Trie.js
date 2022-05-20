/*
tri = new Trie();
tri.insert("sell") 
tri.insert("shells") 
tri.insert("by");
tri.insert("the");
 */
/* 
Runtime: 208 ms, faster than 72.01% of JavaScript online submissions for Implement Trie (Prefix Tree).
Memory Usage: 59.9 MB, less than 23.36% of JavaScript online submissions for Implement Trie (Prefix Tree).
*/
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
  this.insert = function (word) {
    let curr = this.root;
    for (let i = 0; i < word.length; i++) {
      const c = word[i];
      if (!curr.children.has(c)) {
        //child node doesn't exist for this character so create new node
        curr.children.set(c, new Node());
      }
      //move to current character node
      curr = curr.children.get(c);
    }
    //reached end of the word so mark this node as true
    curr.isWord = true;
  };

  this.insertRecursive = function (word) {
    if (word == null) return;
    this.root = this.insertNode(this.root, word, 0);
  };

  this.insertNode = function (node, word, d) {
    console.log(`d: ${d}`);
    console.log(`node: ${JSON.stringify(node)}`);
    // if node is null create new node
    if (!node) node = new Node();
    //reached at the end of word length
    if (d == word.length) {
      node.isWord = true;
      return node;
    }
    const c = word[d]; //char at index d
    console.log(`c: ${c}`);
    if (!node.children.has(c)) node.children.set(c, new Node());
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
    for (let i = 0; i < word.length; i++) {
      const c = word[i];
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
    for (let i = 0; i < prefix.length; i++) {
      const c = prefix[i];
      if (!curr.children.has(c)) return false;
      curr = curr.children.get(c);
    }
    return true;
  };
}

//Re-try (15/May-2022)
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
