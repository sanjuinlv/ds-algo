/* 
Design a search autocomplete system for a search engine. 
Users may input a sentence (at least one word and end with a special character '#').
You are given a string array sentences and an integer array times both of length n 
where sentences[i] is a previously typed sentence and times[i] is the corresponding
number of times the sentence was typed. For each input character except '#', 
return the top 3 historical hot sentences that have the same prefix as the part 
of the sentence already typed.

Here are the specific rules:
 - The hot degree for a sentence is defined as the number of times a user typed
   the exactly same sentence before.
 - The returned top 3 hot sentences should be sorted by hot degree 
   (The first is the hottest one). If several sentences have the same hot degree, 
   use ASCII-code order (smaller one appears first).
 - If less than 3 hot sentences exist, return as many as you can.
 - When the input is a special character, it means the sentence ends, 
   and in this case, you need to return an empty list.

Implement the AutocompleteSystem class:
 - AutocompleteSystem(String[] sentences, int[] times) Initializes the object with
the sentences and times arrays.
 - List<String> input(char c) This indicates that the user typed the character c.
    - Returns an empty array [] if c == '#' and stores the inputted sentence in the system.
    - Returns the top 3 historical hot sentences that have the same prefix as the part of
    the sentence already typed. If there are fewer than 3 matches, return them all.   

Example 1: 
Input
["AutocompleteSystem", "input", "input", "input", "input"]
[[["i love you", "island", "iroman", "i love leetcode"], [5, 3, 2, 2]], ["i"], [" "], ["a"], ["#"]]
Output
[null, ["i love you", "island", "i love leetcode"], ["i love you", "i love leetcode"], [], []]

Explanation
AutocompleteSystem obj = new AutocompleteSystem(["i love you", "island", "iroman", "i love leetcode"], [5, 3, 2, 2]);
obj.input("i"); // return ["i love you", "island", "i love leetcode"]. There are four sentences that have prefix "i". Among them, "ironman" and "i love leetcode" have same hot degree. Since ' ' has ASCII code 32 and 'r' has ASCII code 114, "i love leetcode" should be in front of "ironman". Also we only need to output top 3 hot sentences, so "ironman" will be ignored.
obj.input(" "); // return ["i love you", "i love leetcode"]. There are only two sentences that have prefix "i ".
obj.input("a"); // return []. There are no sentences that have prefix "i a".
obj.input("#"); // return []. The user finished the input, the sentence "i a" should be saved as a historical sentence in system. And the following input will be counted as a new search.    

autocompleteSystem = new AutocompleteSystem(["i love you", "island", "iroman", "i love leetcode"], [5, 3, 2, 2]);
autocompleteSystem.input("i")
*/
/**
 * @param {string[]} sentences
 * @param {number[]} times
 */
var AutocompleteSystem = function (sentences, times) {
  this.root = new Node();

  function Node() {
    this.times = 0;
    this.isWord = false;
    this.children = new Map();
  }

  this.insert = function (key, times = 1) {
    let curr = this.root;
    for (const c of key) {
      if (!curr.children.has(c)) {
        curr.children.set(c, new Node());
      }
      curr = curr.children.get(c);
    }
    curr.times = curr.times + times;
    curr.isWord = true;
  };

  this.getNode = function (key) {
    let curr = this.root;
    for (const c of key) {
      if (!curr.children.has(c)) return null;
      curr = curr.children.get(c);
    }
    return curr;
  };

  //DFS search to collect key, score?
  this.collect = function (node, prefix, results) {
    // console.log(`prefix: ${prefix}`);
    if (node.isWord) {
      // console.log(`prefix: ${prefix} is word`);
      if (!results[node.times]) results[node.times] = [];
      results[node.times].push(prefix); // e.g, {3: ["bat", "bad"]}
      // console.log(`results: ${JSON.stringify(results, null, 2)}`);
      results[node.times].sort(); //sort the strings for given times
      // console.log(`results after local sorting: ${JSON.stringify(results, null, 2)}`);
    }

    //what do we need to return?
    for (const c of node.children.keys()) {
      //store the result
      this.collect(node.children.get(c), prefix + c, results);
    }
  };

  /**
   * @param {character} c
   * @return {string[]}
   */
  this.input = function (c) {
    console.log(`input: ${c}`);
    //end of sentence
    if (c === "#") {
      //enter the so far entered word
      this.insert(this.inputString, 1);
      this.inputString = "";
      return [];
    }
    this.inputString += c;
    // console.log(`inputString: ${this.inputString}`);
    let node = this.getNode(this.inputString);
    //no match found, return empty result
    if (node == null) return [];
    let results = {};
    //perform DFS from this matched prefix node
    this.collect(node, this.inputString, results);
    // console.log(`results after dfs: ${JSON.stringify(results, null, 2)}`);
    //sort and filter
    //sort by descending order
    const sortedKeys = [...Object.keys(results)].sort((a, b) => b - a);
    // console.log(`sortedKeys: ${sortedKeys}`);
    const sorted = [];
    for (const key of sortedKeys) sorted.push(...results[key]);
    return sorted.slice(0, 3);
  };

  this.inputString = "";
  for (let i = 0; i < sentences.length; i++) {
    this.insert(sentences[i], times[i]);
  }
};

// For submission
/* 
Your runtime beats 54.22 % of javascript submissions.
Your memory usage beats 60.24 % of javascript submissions.
*/
var AutocompleteSystem = function (sentences, times) {
  this.root = new Node();

  function Node() {
    this.times = 0;
    this.isWord = false;
    this.children = new Map();
  }

  this.insert = function (key, times = 1) {
    let curr = this.root;
    for (const c of key) {
      if (!curr.children.has(c)) {
        curr.children.set(c, new Node());
      }
      curr = curr.children.get(c);
    }
    curr.times = curr.times + times;
    curr.isWord = true;
  };

  this.getNode = function (key) {
    let curr = this.root;
    for (const c of key) {
      if (!curr.children.has(c)) return null;
      curr = curr.children.get(c);
    }
    return curr;
  };

  //DFS search to collect key, score?
  this.collect = function (node, prefix, results) {
    if (node.isWord) {
      if (!results[node.times]) results[node.times] = [];
      results[node.times].push(prefix); // e.g, {3: ["bat", "bad"]}
      results[node.times].sort(); //sort the strings for given times
    }

    for (const c of node.children.keys()) {
      //store the result
      this.collect(node.children.get(c), prefix + c, results);
    }
  };

  /**
   * @param {character} c
   * @return {string[]}
   */
  this.input = function (c) {
    //end of sentence
    if (c === "#") {
      //insert the so far entered word
      this.insert(this.inputString, 1);
      this.inputString = "";
      return [];
    }
    this.inputString += c;
    let node = this.getNode(this.inputString);
    //no match found, return empty result
    if (node == null) return [];
    let results = {};
    //perform DFS from this matched prefix node
    this.collect(node, this.inputString, results);
    //sort and filter
    const sortedKeys = [...Object.keys(results)].sort((a, b) => b - a); //sort by descending order
    const sorted = [];
    for (const key of sortedKeys) sorted.push(...results[key]);
    return sorted.slice(0, 3);
  };

  this.inputString = "";
  for (let i = 0; i < sentences.length; i++) {
    this.insert(sentences[i], times[i]);
  }
};

/**
 * Your AutocompleteSystem object will be instantiated and called as such:
 * var obj = new AutocompleteSystem(sentences, times)
 * var param_1 = obj.input(c)
 */
