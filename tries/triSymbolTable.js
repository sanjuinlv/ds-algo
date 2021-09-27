/*
tri = new TriesST();
tri.put("she", 0);
tri.put("sells", 1);
tri.put("sea", 2);
tri.put("shells", 3);
tri.put("by", 4);
tri.put("the", 5);

tri.get("sea"); // 2
tri.put("sea", 6);
tri.get("sea"); // 6
tri.put("shore", 6);

 */
/**
 * A string symbol table for extended ASCII strings, implemented
 * using a 256-way trie.
 */
function TriesST() {
    this.root = null;
    this.n = 0;

    function Node() {
        this.val = null;
        this.R = 256; //radix
        this.next = new Array(this.R);
    }

    /**
     * 
     * @param {String} key 
     * @returns 
     */
    this.get = function(key){
        console.log(`key: ${key}`);
        const x = this.getNode(key, this.root, 0);
        if (x == null) return null;
        return x.val;
    }

    /**
     * 
     * @param {String} key 
     * @param {Node} node 
     * @param {int} d 
     * @returns Node
     */
    this.getNode = function(key, node, d){
        if (node == null) return null;
        if (d === key.length) return node;
        //use the dth char to identify subtrie
        const c = key.charCodeAt(d);
        return this.getNode(key, node.next[c], d + 1);
    }
    
    this.put = function(key, value){
        if (!key) throw Error("key must not be null");
        if (value == null) {
            this.delete(key);
        }else {
            this.root = this.putNode(key, value, this.root, 0);    
        }
    }

    /**
     * 
     * @param {String} key 
     * @param {String/Int} value 
     * @param {Node} node 
     * @param {int} d 
     */
    this.putNode = function(key, value, node, d){
        //change the value associate with key if in subtrie rooted at node
        if (node == null) node = new Node();
        //reached at the depth of the key length 
        if (d == key.length) {
            if (node.val != null) this.n++;
            node.val = value;
            return node;
        }
        //use the dth char to identify sub tri
        const c = key.charCodeAt(d);
        node.next[c] = this.putNode(key, value, node.next[c], d + 1);
        return node;
    }

    this.delete = function(key){
        if (!key) throw Error("key to delete must not be null");
        this.root = this.deleteNode(key, this.root, 0);
    }

    this.deleteNode = function(key, node, d){
        if (node == null) return null;
        if (d == key.length){
            if (node.val != null) this.n--;
            node.val = null;
        } else {
            const c = key.charCodeAt(d);
            x.next[c] = this.deleteNode(key, x.node[c], d + 1);
        }
        // remove subtrie rooted at x if it is completely empty
        if (node.val != null) return node;
        for(let c = 0; c < this.R; c++){
            if (node.next[c] != null) return node;
        }
        return null;
    }

    this.size = function(){
        return this.n;
    }

    this.isEmpty = function(){
        return this.size() == 0;
    }

    this.keys = function(){
        return this.keysWithPrefix("");
    }

    /**
     * Returns all of the keys in the set that start with prefix
     * @param {String} prefix 
     * @returns array of matching keys
     */
    this.keysWithPrefix = function(prefix){
        const results = [];
        const x = this.getNode(prefix, this.root, 0);
        this.collect(x, prefix, results);
        return results;
    }

    this.collect = function(node, prefix, results){
        if (node == null) return;
        if (node.val != null) results.push(prefix);
        for(let c = 0; c < this.R; c++){
            this.collect(node.next[c], prefix+String.fromCharCode(c), results);
        }
    }

    /**
     * Returns all of the keys in the symbol table that match 'pattern'
     * where '.' is treated as wildcard character.
     * @param {*} pattern 
     */
    this.keysThatMatch = function(pattern){
        const results = [];
        this.collectKeys(this.root, "", pattern, results);
        return results;
    }

    this.collectKeys = function(x, prefix, pattern, results) {
        console.log(x);
        if (x == null) return;
        if (x.val != null) results.unshift(prefix);
        const d = prefix.length;
        if (d == pattern.length) return;
        const c = pattern.charAt(d);
        if (c == ".") {
            for(let ch = 0; ch < this.R; ch++){
                this.collectKeys(x.next[ch], prefix+String.fromCharCode(ch), pattern, results);    
            }
        } else {
            this.collectKeys(x.next[c], prefix+c, pattern, results);
        }
    }

    /**
     * Returns the string in the symbol table that is the longest prefix of 'query'
     * or null if no such string
     * @param {String} query 
     * @returns {String}
     */
    this.longestPrefixOf = function(query){
        if (!query) throw new Error("The query must not be null");
        const length = this.longestPrefixByNode(this.root, query, 0, -1);
        if (length == -1) return null;
        return query.slice(0, length);
    }

    // returns the length of the longest string key in the subtrie
    // rooted at x that is a prefix of the query string,
    // assuming the first d character match and we have already
    // found a prefix match of given length (-1 if no such match)
    this.longestPrefixByNode = function(node, query, d, length){
        // console.log(node);
        //reached null node
        if (node == null) return length;
        //found non null node value. Update the longest match 
        if (node.val != null) length = d;
        //reached to the end of the query string length
        if (d == query.length) return length;
        const c = query.charCodeAt(d);
        return this.longestPrefixByNode(node.next[c], query, d + 1, length);
    }
}