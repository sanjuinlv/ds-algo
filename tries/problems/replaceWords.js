/* 
648. Replace Words
https://leetcode.com/problems/replace-words/description/
Type: Medium

In English, we have a concept called root, which can be followed by some other word to 
form another longer word - let's call this word successor. For example, when the root 
"an" is followed by the successor word "other", we can form a new word "another".
Given a dictionary consisting of many roots and a sentence consisting of words 
separated by spaces, replace all the successors in the sentence with the root forming it.
If a successor can be replaced by more than one root, replace it with the root that has
the shortest length.

Return the sentence after the replacement.

Example 1:
Input: dictionary = ["cat","bat","rat"], sentence = "the cattle was rattled by the battery"
Output: "the cat was rat by the bat"

Example 2:
Input: dictionary = ["a","b","c"], sentence = "aadsfasf absbs bbab cadsfafs"
Output: "a a b c"

Example 3:
Input: dictionary = ["a", "aa", "aaa", "aaaa"], sentence = "a aa a aaaa aaa aaa aaa aaaaaa bbb baba ababa"
Output: "a a a a a a a a bbb baba a"

Example 4:
Input: dictionary = ["catt","cat","bat","rat"], sentence = "the cattle was rattled by the battery"
Output: "the cat was rat by the bat"

Constraint:
    - 1 <= dictionary.length <= 1000
    - 1 <= dictionary[i].length <= 100
    - dictionary[i] consists of only lower-case letters.
    - 1 <= sentence.length <= 10^6
    - sentence consists of only lower-case letters and spaces.
    - The number of words in sentence is in the range [1, 1000]
    - The length of each word in sentence is in the range [1, 1000]
    - Each two consecutive words in sentence will be separated by exactly one space.
    - sentence does not have leading or trailing spaces.
*/

/* 
replaceWords(["cat","bat","rat"], "the cattle was rattled by the battery")
replaceWords(["catt","cat","bat","rat"], "the cattle was rattled by the battery")
replaceWords(["a","b","c"], "aadsfasf absbs bbab cadsfafs")
replaceWords(["a", "aa", "aaa", "aaaa"], "a aa a aaaa aaa aaa aaa aaaaaa bbb baba ababa")

*/

/* 
Approach I: Prefix Hash
Time Complexity: O(∑w_i^2) where w_i is the length of the i-th word. 
We might check every prefix, the i-th of which is O(w_i^2) work.
The O(w) for creating prefix string and that is done w times, which is word length.
Space: O(N) where N is the length of our sentence; the space used by rootset.
*/
var replaceWords = function (dictionary, sentence) {
    const dictionarySet = new Set();
    for (const item of dictionary){
        dictionarySet.add(item);   
    }
    let resultStr = "";
    const sentenceTokens = sentence.split(" ");  
    for (let token of sentenceTokens){
        let prefix = "";
        for (const c of token){
            prefix += c;
            //found entry in set, exit the loop
            if (dictionarySet.has(prefix)) break;
        }
        if (resultStr.length) resultStr += " ";
        resultStr += prefix; //prefix will be either complete token or prefix string
    }
    return resultStr;
}

/*
Approach I: Trie
Let d be the number of words in the dictionary, s be the number of words in the sentence, and w be the average length of each word.

Time Complexity: O(d * w + s * w)
Creating the Trie takes O(d * w). Creating the data structure that stores the words in the sentence takes O(s * w).
The loop in the shortestRoot function runs once for each letter in the word. If a corresponding prefix is found, it creates one substring, which takes O(w). Therefore, the time complexity of finding the shortest root is O(w).
The main loop calls the shortestRoot function once for each word in the sentence, so it takes O(s * w).

Converting the result to a string takes O(s * w).

Therefore, the overall time complexity is O(d * w +2 * s * w), which we can simplify to O(d * w + s * w).

Space Complexity: O(d * w + s * w)
The Trie may store up to O(d * w) nodes. The data structure that stores the words in the sentence uses O(s * w) space.

Runtime: 46 ms Beats 98.48%
Memory: 71.78 MB Beats 15.15%
 */
var replaceWords = function (dictionary, sentence) {
  function Node() {
    this.children = new Map();
    this.isWord = false;
  }
  //root of Trie
  this.root = new Node();
  this.insert = (word) => {
    let curr = this.root;
    for (const c of word) {
      if (!curr.children.has(c)) curr.children.set(c, new Node());
      curr = curr.children.get(c);
    }
    curr.isWord = true;
  };
  this.findPrefix = (word) => {
    let curr = this.root;
    for (let i = 0; i < word.length; i++) {
      const c = word[i];
      curr = curr.children.get(c);
      if (curr == null) return null;
      if (curr.isWord) return word.slice(0, i + 1);
    }
    return null;
  };
  //build trie from the dictionary
  for (const word of dictionary) this.insert(word);
  //create array from sentence
  const words = sentence.split(" ");
  //for each word find the shortest match and replace if found
  for (let i = 0; i < words.length; i++) {
    const prefix = this.findPrefix(words[i]);
    if (prefix != null) words[i] = prefix;
  }
  return words.join(" ");
};

/* 
Trie with recursive methods
Time Complexity: O(N), where N is the length of the sentence. 
Every query of a word is in linear time.
Space Complexity: O(N), the size of our trie.

Runtime: 136 ms, faster than 59.22% of JavaScript online submissions for Replace Words.
Memory Usage: 56.8 MB, less than 21.23% of JavaScript online submissions for Replace Words.
*/
/**
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {string}
 */
var replaceWords = function (dictionary, sentence) {
  this.root = new Node();

  function Node() {
    this.isWord = false;
    this.children = new Map();
  }

  this.insert = function (word) {
    // console.log(this.root);
    let curr = this.root;
    for (let i = 0; i < word.length; i++) {
      const c = word[i];
      if (!curr.children.has(c)) curr.children.set(c, new Node());
      curr = curr.children.get(c);
    }
    curr.isWord = true;
  };

  this.shortestPrefix = function(prefix) {
    const length = this.dfs(this.root, prefix, 0, -1)
    if (length === -1) return null;
    return prefix.slice(0, length);
  }

  this.dfs = function(node, query, d, length){
    //reached null node
    if (!node) return length;
    //found word node. Update the longest match.
    // if (node.isWord) length = d;
    if (node.isWord) return d;
    //reached to the end of the query string length (without any match)
    if (d === query.length) return length;
    return this.dfs(node.children.get(query[d]), query, d + 1, length);
  }

  //insert the dictionary to the tri
  for (let item of dictionary) {
    this.insert(item);
  }

  const sentenceTokens = sentence.split(" ");  
  let resultStr = "";
  for (let token of sentenceTokens){
    const prefixMatch = this.shortestPrefix(token);
    if (resultStr.length) resultStr+= " ";
    if (prefixMatch && prefixMatch.length) {
        resultStr+= prefixMatch; 
    } else {
        resultStr+= token; 
    }
  }
  return resultStr;
};
