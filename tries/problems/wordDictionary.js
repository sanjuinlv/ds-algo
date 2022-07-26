/* 
Design a data structure that supports adding new words and finding if a string 
matches any previously added string.
Implement the WordDictionary class:
 - WordDictionary() Initializes the object.
 - void addWord(word) Adds word to the data structure, it can be matched later.
 - bool search(word) Returns true if there is any string in the data structure that 
matches word or false otherwise. word may contain dots '.' where dots can be matched 
with any letter.

Input
["WordDictionary","addWord","addWord","addWord","search","search","search","search"]
[[],["bad"],["dad"],["mad"],["pad"],["bad"],[".ad"],["b.."]]
Output
[null,null,null,null,false,true,true,true]

Explanation
let wordDictionary = new WordDictionary();
wordDictionary.addWord("bad");
wordDictionary.addWord("dad");
wordDictionary.addWord("mad");
wordDictionary.search("pad"); // return False
wordDictionary.search("bad"); // return True
wordDictionary.search(".ad"); // return True
wordDictionary.search("b.."); // return True
*/

/* 
Runtime: 224 ms, faster than 97.59% of JavaScript online submissions for Design Add and Search Words Data Structure.
Memory Usage: 60.6 MB, less than 42.59% of JavaScript online submissions for Design Add and Search Words Data Structure.
*/
var WordDictionary = function() {
    this.root = new Node();
    
    function Node(){
        this.isWord = false;
        this.children = new Map();
    }        

    this.addWord = function(word) {
        let curr = this.root;
        for (const c of word){
            if (!curr.children.has(c)) {
                curr.children.set(c, new Node());
            }
            curr = curr.children.get(c);
        }
        curr.isWord = true;
    };
    
    this.search = function(word) {
        return this.searchByNode(word, this.root);
    }

    this.searchByNode = function(word, node) {
        for (let i = 0; i < word.length; i++) {
            // console.log(`c: ${word[i]}`)
            if (word[i] === ".") {
                //wildcard character. check for all child nodes 
                for (const child of node.children.values()){
                    if (this.searchByNode(word.slice(i+1, word.length), child)) return true;
                }
                return false;
            } else {
                if (!node.children.has(word[i])) return false;
            }
            node = node.children.get(word[i]);    
        }
        return node.isWord;
    };
};
/** 
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */