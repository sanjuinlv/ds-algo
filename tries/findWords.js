/* 
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
Approach : Using trie
findWords([["o","a","a","n"],["e","t","a","e"],["i","h","k","r"],["i","f","l","v"]], ["oath","pea","eat","rain"])
findWords([["a","b"],["c","d"]], ["abcb"]) => []
findWords([["a","b"],["c","d"]], ["abdc"]) => [ "abdc" ]
*/
var findWords = function(board, words) {
  this.root = new Node();
  const rows = board.length, columns = board[0].length;
  this.visited = [...Array(rows)].map(x => Array(columns).fill(false));

  function Node(){
      this.children = new Map();
      this.isWord = false;
  }

  this.insert = function(word) {
    let curr = this.root;
    for (const c of word){
        if (!curr.children.has(c)) {
            curr.children.set(c, new Node());
        }
        curr = curr.children.get(c);
    }
    curr.isWord = true;
  }

  this.search = function(word) {
    let curr = this.root;
    for (const c of word) {
        if (!curr.children.has(c)) return false;
        curr = curr.children.get(c);
    }
    console.log(`isWord: ${curr.isWord}`);
    return curr.isWord;
  }

  this.dfs = function(i, j, prefix){
    if (i < 0 || j < 0 || i >= rows || j >= columns || this.visited[i][j]) return;
    console.log(`i: ${i}, j: ${j}, c: ${board[i][j]}`)
    // if (this.visited[i][j]) return;
    this.visited[i][j] = true;
    this.insert(prefix + board[i][j]);
    //same row, next column
    this.dfs(i, j + 1, prefix + board[i][j]); 
    //same row, prev column
    this.dfs(i, j-1, prefix + board[i][j]); 
    //prev row, same column
    this.dfs(i-1, j, prefix + board[i][j]); 
    //next row, same column
    this.dfs(i+1, j, prefix + board[i][j]); 
    //recursively create word from all sides
    this.visited[i][j] = false;
  }

  //1. create trie
  for (let i = 0; i < rows; i++){
      for (let j = 0; j < columns; j++){
          console.log(`i: ${i}, j: ${j}`)
          this.dfs(i, j, "");
      }
  }

  console.log(this.root);
  //2. perform search for words
  const result = [];
  for (const word of words) {
      console.log(`searching word: ${word}`);
      if (this.search(word)) {
        console.log(`word: ${word} exists in trie`);
        result.push(word);
      } 
  }
  return result;
};

//for submission
var findWords = function(board, words) {
    this.root = new Node();
    const rows = board.length, columns = board[0].length;
    this.visited = [...Array(rows)].map(x => Array(columns).fill(false));
  
    function Node(){
        this.children = new Map();
        this.isWord = false;
    }
  
    this.insert = function(word) {
      let curr = this.root;
      for (const c of word){
          if (!curr.children.has(c)) {
              curr.children.set(c, new Node());
          }
          curr = curr.children.get(c);
      }
      curr.isWord = true;
    }
  
    this.search = function(word) {
      let curr = this.root;
      for (const c of word) {
          if (!curr.children.has(c)) return false;
          curr = curr.children.get(c);
      }
      return curr.isWord;
    }
  
    this.dfs = function(i, j, prefix){
      if (i < 0 || j < 0 || i >= rows || j >= columns || this.visited[i][j]) return;
      // if (this.visited[i][j]) return;
      this.visited[i][j] = true;
      this.insert(prefix + board[i][j]);
      //same row, next column
      this.dfs(i, j + 1, prefix + board[i][j]); 
      //same row, prev column
      this.dfs(i, j-1, prefix + board[i][j]); 
      //prev row, same column
      this.dfs(i-1, j, prefix + board[i][j]); 
      //next row, same column
      this.dfs(i+1, j, prefix + board[i][j]); 
      //recursively create word from all sides
      this.visited[i][j] = false;
    }
  
    //1. create trie
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < columns; j++){
            this.dfs(i, j, "");
        }
    }
  
    console.log(this.root);
    //2. perform search for words
    const result = [];
    for (const word of words) {
        if (this.search(word)) {
          result.push(word);
        } 
    }
    return result;
  };

/* 
Approach: Using trie  
Different approach than previous. Make the try from dictionary instead of board matrix.
Failed for:

Runtime: 5326 ms, faster than 12.41% of JavaScript online submissions for Word Search II.
Memory Usage: 45.6 MB, less than 27.04% of JavaScript online submissions for Word Search II.

findWords([["o","a","b","n"],["o","t","a","e"],["a","h","k","r"],["a","f","l","v"]], ["oa","oaa"]) => [ "oa", "oaa" ]
findWords([["a","a"]],["aaa"]) => []
*/  
var findWords = function(board, words) {
    this.root = new Node();
    const rows = board.length, columns = board[0].length;
    this.visited = [...Array(rows)].map(x => Array(columns).fill(false));

    function Node(){
        this.children = new Map();
        this.isWord = false;
    }
  
    this.insert = function(word) {
      let curr = this.root;
      for (const c of word){
          if (!curr.children.has(c)) {
              curr.children.set(c, new Node());
          }
          curr = curr.children.get(c);
      }
      curr.isWord = true;
    }
   
    this.getPrefixNode = function(prefix){
        let curr = this.root;
        for (const c of prefix) {
            if (!curr.children.has(c)) return null;
            curr = curr.children.get(c);
        }
        return curr;
    }

    this.backtrack = function(i, j, prefix, result){
      if (i < 0 || j < 0 || i >= rows || j >= columns || this.visited[i][j]) return;
    //   console.log(`i: ${i}, j: ${j}, prefix: ${prefix}, c: ${board[i][j]}`)
      prefix += board[i][j];
      const prefixNode = this.getPrefixNode(prefix);
      if (!prefixNode) return;
      if (prefixNode.isWord) {
          result.push(prefix);
          //this will avoid giving duplicate result
          prefixNode.isWord = false;
      };
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
    }
  
    //1. create trie from words dictionary
    for (const word of words) {
        this.insert(word);
    }

    const result = [];
    //2. backtrack for all combination from board letters
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < columns; j++){
            if (this.root.children.has(board[i][j])){
                this.backtrack(i, j, "", result);
            }
        }
    }  
    return result;
  };

/* 

*/  
/* 
Using trie with optimization.
i) No extra space required for storing the visited board letter
ii) not performing the prefix search again and again. Only node is enough to navigate. 
iii) Storing the word at node so that we can get the word immediately

Runtime: 420 ms, faster than 81.27% of JavaScript online submissions for Word Search II.
Memory Usage: 41 MB, less than 60.70% of JavaScript online submissions for Word Search II.
*/  
var findWords = function(board, words) {
    this.root = new Node();
    const rows = board.length, columns = board[0].length;    

    function Node(){
        this.children = new Map();
        this.word = null;
    }
  
    this.insert = function(word) {
      let curr = this.root;
      for (const c of word){
          if (!curr.children.has(c)) {
              curr.children.set(c, new Node());
          }
          curr = curr.children.get(c);
      }
      curr.word = word;
    }
  
    this.dfs = function(i, j, node, result){
      if (i < 0 || j < 0 || i >= rows || j >= columns || board[i][j] == "#") return;
    //   console.log(`i: ${i}, j: ${j}, c: ${board[i][j]}`)
      const childNode = node.children.get(board[i][j]);
      if (!childNode) return;
      if (childNode.word != null) { // found word
          result.push(childNode.word);
          //avoid duplicate value
          childNode.word = null;
      };
      const letter = board[i][j];
      //by setting "#", we avoid visiting this again from neighbors  (dfs)
      board[i][j] = "#";
      //same row, next column
      this.dfs(i, j + 1, childNode, result); 
      //same row, prev column
      this.dfs(i, j - 1, childNode, result); 
      //prev row, same column
      this.dfs(i - 1, j, childNode, result); 
      //next row, same column
      this.dfs(i + 1, j, childNode, result); 
      //restore the letter, so that it can be used to make another word from neighboring letter
      board[i][j] = letter;
    }
  
    //1. create trie from words dictionary
    for (const word of words) {
        this.insert(word);
    }

    const result = [];
    //2. backtrack for all combination from board letters
    for (let i = 0; i < rows; i++){
        for (let j = 0; j < columns; j++){
            if (this.root.children.has(board[i][j])){
                this.dfs(i, j, this.root, result);
            }
        }
    }  
    return result;
  };
