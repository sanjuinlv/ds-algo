/* 
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
wordSquares(["area","lead","wall","lady","ball"]) 
PASS => [["wall","area","lead","lady"],["ball","area","lead","lady"]]

wordSquares(["abat","baba","atan","atal"]) 
FAILS =>[["baba","abat","atan","atal"]]
Expected: [["baba","abat","baba","atal"],["baba","abat","baba","atan"]]

wordSquares(["ball","area","lead","lady"]) 

*/
/**
 * @param {string[]} words
 * @return {string[][]}
 */
var wordSquares = function(words) {
    this.root = new Node();

    function Node() {
        this.children = new Map();
        this.isWord = false;        
    }
    
    this.insert = function(word){
        let curr = this.root;
        for(const c of word) {
            if (!curr.children.has(c)) curr.children.set(c, new Node());
            curr = curr.children.get(c);
        }
        curr.word = word;
    }

    this.search = function(prefix) {
        let curr = this.root;
        for (const c of prefix){
            if (!curr.children.has(c)) return null;
            curr = curr.children.get(c);
        }
        return curr;
    }

    this.collect = function(node, result){
        if (!node) return;
        if (node.word != null) result.push(node.word);
        for (const child of node.children.values()){
            this.collect(child, result);
        }
    }

    const result = [];
    //1. create trie from given words 
    for (const word of words){
        this.insert(word);
    }

    //2. try to find word square for each given word
    for (const word of words){
        console.log(`new word: ${word},`);
        prefix = "";
        let temp = [];
        temp.push(word);
        console.log(`temp with first word: ${temp}`);
        for (let i = 1; i < word.length; i++){
            prefix = word[i];
            if (temp.length > 1){ // more words than current word
                //skip the first word
                for (let j = 1; j < temp.length; j++){
                    prefix+= temp[j][i];
                }
            }
            console.log(`prefix: ${prefix}`);
            //check if node exist with given prefix
            const node = this.search(prefix);
            if (node == null) break; //no match found exist
            if (node != null){
                //how to handle multiple nodes?
                this.collect(node, temp);
                console.log(`temp: ${temp}`);
            }
        }
        if (temp.length == word.length) {
            result.push(temp);
            console.log(`result: ${JSON.stringify(result)}`);
        }
    }
    return result;
};

// Solution Reference
/*
Approach : Trie with Backtracking 

wordSquares(["area","lead","wall","lady","ball"]) 
PASS => [["wall","area","lead","lady"],["ball","area","lead","lady"]]

wordSquares(["abat","baba","atan","atal"]) 
FAILS =>[["baba","abat","atan","atal"]]
Expected: [["baba","abat","baba","atal"],["baba","abat","baba","atan"]]

wordSquares(["ball","area","lead","lady"]) 
=> [["ball","area","lead","lady"]]
*/

/* 
Runtime: 156 ms, faster than 98.95% of JavaScript online submissions for Word Squares.
Memory Usage: 50.6 MB, less than 66.32% of JavaScript online submissions for Word Squares.
*/
var wordSquares = function(words) {
    this.root = new Node();
    
    function Node(){
        this.children = new Map();
        this.wordList = [];
    }

    this.buildTrie = function(words) {
        for (let i = 0; i < words.length; i++){
            this.insert(words[i], i)
        }
    }

    this.insert = function(word, wordIndex){
        let curr = this.root;
        for(const c of word) {
            if (!curr.children.has(c)) curr.children.set(c, new Node());
            curr = curr.children.get(c);
            curr.wordList.push(wordIndex);
        }
    }

    this.getWordsWithPrefix = function(prefix){
        let curr = this.root;
        for (const c of prefix){
            if (!curr.children.has(c)) return [];
            curr = curr.children.get(c);
        }
        return curr.wordList;
    }

    this.backtrack = function(d, wordSquares, result) {
        //reached to the end of word length
        if (d == this.N) {
            //store copy of wordSquares as it gets modified during backtracking
            result.push([...wordSquares]);
            return;
        }   
        let prefix = "";
        //create prefix for look up
        for (word of wordSquares){
            prefix+= word[d];
        }
        // find words with given prefix
        for (const wordIndex of this.getWordsWithPrefix(prefix)){
            wordSquares.push(this.words[wordIndex]);
            this.backtrack(d + 1, wordSquares, result);
            wordSquares.pop();
        }
    }

    this.N = words[0].length;
    this.words = words;
    
    //1. build tries
    this.buildTrie(words);
    const result = [];
    //2. do backtracking for all word combination
    for (const word of words) {
        const wordSquaresList = [];
        wordSquaresList.push(word);
        this.backtrack(1, wordSquaresList, result);
    }
    return result;
}
