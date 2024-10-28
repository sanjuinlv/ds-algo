/* 
425. Word Squares
https://leetcode.com/problems/word-squares/
Type: Hard

Given an array of unique strings words, return all the word squares you can build from words. 
The same word from words can be used multiple times. You can return the answer in any order.
A sequence of strings forms a valid word square if the kth row and column read the same string,
where 0 <= k < max(numRows, numColumns).
    - For example, the word sequence ["ball","area","lead","lady"] forms a word square because 
    each word reads the same both horizontally and vertically

Example 1:
Input: words = ["area","lead","wall","lady","ball"]
Output: [["ball","area","lead","lady"],["wall","area","lead","lady"]]
Explanation:
The output consists of two word squares. The order of output does not matter (just the order of words in each word square matters).

Example 2:
Input: words = ["abat","baba","atan","atal"]
Output: [["baba","abat","baba","atal"],["baba","abat","baba","atan"]]
Explanation:
The output consists of two word squares. The order of output does not matter 
(just the order of words in each word square matters).

Constraint: 
  -   1 <= words.length <= 1000
  -   1 <= words[i].length <= 5
  -   All words[i] have the same length.
  -   words[i] consists of only lowercase English letters.
  -   All words[i] are unique.
*/

/* 
Approach: Backtracking with Trie
Time: O(N * L), where N is the number of input words and L is the length of a single word.
Space: O(N * L)

Runtime: 69 ms Beats 100.00%
Memory Usage: 86.94 MB Beats 59.26%
*/
var wordSquares = function (words) {
  this.root = new Node();
  this.words = words;

  function Node() {
    this.children = new Map();
    this.wordList = [];
  }

  this.insert = (word, wordIndex) => {
    let curr = this.root;
    for (const c of word) {
      if (!curr.children.has(c)) curr.children.set(c, new Node());
      curr = curr.children.get(c);
      curr.wordList.push(wordIndex);
    }
  };

  this.searchPrefix = (prefix) => {
    let curr = this.root;
    for (const c of prefix) {
      if (!curr.children.has(c)) return [];
      curr = curr.children.get(c);
    }
    return curr.wordList;
  };

  this.backtrack = (d, wordList, result) => {
    if (d == this.N) {
      result.push([...wordList]); //store copy of wordlist
      return;
    }
    let prefix = "";
    for (let word of wordList) {
      prefix += word[d]; //append character from each word at index d
    }

    for (const wordIndex of this.searchPrefix(prefix)) {
      wordList.push(this.words[wordIndex]);
      this.backtrack(d + 1, wordList, result);
      wordList.pop(); //remove the last word to try with other words
    }
  };

  this.N = words[0].length;
  const result = [];

  //build tree
  for (let i = 0; i < this.words.length; i++) {
    this.insert(this.words[i], i);
  }

  //check for each combination
  for (const word of words) {
    this.backtrack(1, [word], result);
  }
  return result;
};
