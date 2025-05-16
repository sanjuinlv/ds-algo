/* 
212. Word Search II
https://leetcode.com/problems/word-search-ii
Type: Hard

Given an m x n board of characters and a list of strings words, return all words on the board.
Each word must be constructed from letters of sequentially adjacent cells, where adjacent cells are horizontally or vertically neighboring. The same letter cell may not be used more than once in a word.

Example 1:
Input: board = [["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], words = ["oath","pea","eat","rain"]
Output: ["eat","oath"]

Input: board = [["a","b"],["c","d"]], words = ["abcb"]
Output: []

Constraint:
    -   m == board.length
    -   n == board[i].length
    -   1 <= m, n <= 12
    -   board[i][j] is a lowercase English letter.
    -   1 <= words.length <= 3 * 104
    -   1 <= words[i].length <= 10
    -   words[i] consists of lowercase English letters.
    -   All the strings of words are unique.
*
/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
/* 
findWords([["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], ["oath","pea","eat","rain"])
findWords([["a","b"],["c","d"]], ["abcb"]) => []
findWords([["a","b"],["c","d"]], ["abdc"]) => [ "abdc" ]
*/

/* 
Approach: Using trie  
Different approach than previous. Make the try from dictionary instead of board matrix.
Failed for:

Runtime: 5326 ms, faster than 12.41% of JavaScript online submissions for Word Search II.
Memory Usage: 45.6 MB, less than 27.04% of JavaScript online submissions for Word Search II.

findWords([["o","a","b","n"],["o","t","a","e"],["a","h","k","r"],["a","f","l","v"]], ["oa","oaa"]) => [ "oa", "oaa" ]
findWords([["a","a"]],["aaa"]) => []
*/
var findWords = function (board, words) {
  this.root = new Node();
  const rows = board.length;
  const columns = board[0].length;
  this.visited = [...Array(rows)].map((x) => Array(columns).fill(false));

  function Node() {
    this.children = new Map();
    this.isWord = false;
  }

  this.insert = function (word) {
    let curr = this.root;
    for (const c of word) {
      if (!curr.children.has(c)) {
        curr.children.set(c, new Node());
      }
      curr = curr.children.get(c);
    }
    curr.isWord = true;
  };

  this.getPrefixNode = function (prefix) {
    let curr = this.root;
    for (const c of prefix) {
      if (!curr.children.has(c)) return null;
      curr = curr.children.get(c);
    }
    return curr;
  };

  this.backtrack = function (i, j, prefix, result) {
    if (i < 0 || j < 0 || i >= rows || j >= columns || this.visited[i][j])
      return;
    //   console.log(`i: ${i}, j: ${j}, prefix: ${prefix}, c: ${board[i][j]}`)
    prefix += board[i][j];
    const prefixNode = this.getPrefixNode(prefix);
    if (!prefixNode) return;
    if (prefixNode.isWord) {
      result.push(prefix);
      //this will avoid giving duplicate result
      prefixNode.isWord = false;
    }
    this.visited[i][j] = true;
    //same row, next column
    this.backtrack(i, j + 1, prefix, result);
    //same row, prev column
    this.backtrack(i, j - 1, prefix, result);
    //prev row, same column
    this.backtrack(i - 1, j, prefix, result);
    //next row, same column
    this.backtrack(i + 1, j, prefix, result);
    this.visited[i][j] = false;
  };

  //1. create trie from words dictionary
  for (const word of words) {
    this.insert(word);
  }

  const result = [];
  //2. backtrack for all combination from board letters
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < columns; j++) {
      if (this.root.children.has(board[i][j])) {
        this.backtrack(i, j, "", result);
      }
    }
  }
  return result;
};

/* 
Approach : Trie with optimization.
i) No extra space required for storing the visited board letter
ii) not performing the prefix search again and again. Only node is enough to navigate. 
iii) Storing the word at node so that we can get the word immediately

Runtime: 627 ms Beats 81.53%
Memory: 52.97 MB Beats 73.36%
*/
var findWords = function (board, words) {
  const rows = board.length;
  const cols = board[0].length;
  //root of Trie
  this.root = new Node();
  //Trie node
  function Node() {
    this.children = new Map();
    this.word = null;
  }
  //insert word to Trie
  this.insert = function (word) {
    let curr = this.root;
    for (let c of word) {
      if (!curr.children.has(c)) curr.children.set(c, new Node());
      curr = curr.children.get(c);
    }
    curr.word = word;
  };
  const backtrack = (i, j, node) => {
    //check if i and j is in boundary
    if (i < 0 || j < 0 || i >= rows || j >= cols || board[i][j] == "#") return;
    //board character to restore back
    const boardChar = board[i][j];
    //get node in trie for curr board char
    const childNode = node.children.get(boardChar);
    //if no node found then backtrack and try other path
    if (childNode == null) return;
    if (childNode.word != null) {
      result.push(childNode.word);
      //reset word to avoid duplicate
      childNode.word = null;
    }
    //mark board cell as visited
    board[i][j] = "#";
    backtrack(i + 1, j, childNode); //next row
    backtrack(i - 1, j, childNode); //prev row
    backtrack(i, j + 1, childNode); //next col
    backtrack(i, j - 1, childNode); //next row
    //restore board character to try other word combination
    board[i][j] = boardChar;
  };
  //1. create trie from words dictionary
  for (const word of words) {
    this.insert(word);
  }
  const result = [];
  //2. try for all combination from board letters
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      backtrack(i, j, this.root);
    }
  }
  return result;
};
