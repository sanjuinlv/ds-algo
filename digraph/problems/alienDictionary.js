/*
There is a new alien language that uses the English alphabet. However, the order among
the letters is unknown to you.
You are given a list of strings words from the alien language's dictionary, where the
strings in words are sorted lexicographically by the rules of this new language.
Return a string of the unique letters in the new alien language sorted in lexicographically
increasing order by the new language's rules. If there is no solution, return "". 
If there are multiple solutions, return any of them.

A string s is lexicographically smaller than a string t if at the first letter where they differ,
the letter in s comes before the letter in t in the alien language. If the first
min(s.length, t.length) letters are the same, then s is smaller if and only if s.length < t.length.

Example 1:

Input: words = ["wrt","wrf","er","ett","rftt"]
Output: "wertf"

Example 2:
Input: words = ["z","x"]
Output: "zx"

Example 3:
Input: words = ["z","x","z"]
Output: ""
Explanation: The order is invalid, so return "".

Constraints:

1 <= words.length <= 100
1 <= words[i].length <= 100
words[i] consists of only lowercase English letters.
 */
/**
 * @param {string[]} words
 * @return {string}
 */
/*
Approach: DFS with cycle detection (DAG)
Time: O(E+V)
Space: O(1) only english character (26)
*/
//PASSES for Example 1, 2 & 3.
///HOW to handle for words size = 1 ?
var alienOrder = function (words) {
  //1. create diagraph from words
  const adjacency = new Map();
  //how to handle for words size == 1?
  for (let i = 1; i < words.length; i++) {
    const word1 = words[i - 1];
    const word2 = words[i];
    let k = 0;
    while (k < Math.min(word1.length, word2.length)) {
      if (word1[k] != word2[k]) {
        if (!adjacency.has(word1[k])) adjacency.set(word1[k], new Set());
        adjacency.get(word1[k]).add(word2[k]);
      }
      k++;
    }
  }
  console.log(adjacency);
  //2. check for circle while creating post order
  const getReversePostOrder = (adj) => {
    const visited = new Map();
    const onPath = new Set();
    let reversePostOrder = [];
    const dfs = (v, adj) => {
      console.log(`v: ${v}`);
      visited.set(v, true);
      onPath.add(v);
      if (adj.get(v)) {
        for (let w of adj.get(v)) {
          if (!visited.has(w) && dfs(w, adj)) {
            return true;
          } else if (onPath.has(w)) {
            return true;
          }
        }
      }
      onPath.delete(v);
      reversePostOrder.push(v);
      return false;
    };
    for (let v of adj.keys()) {
      if (!visited.has(v) && dfs(v, adj)) return [];
    }
    console.log(reversePostOrder);
    return reversePostOrder;
  };
  return getReversePostOrder(adjacency).reverse().join("");
};

//With Edge case handling
/* 
Approach: DFS
Let N be the total number of strings in the input list.
Let C be the total length of all the words in the input list, added together.
Let U be the total number of unique letters in the alien alphabet. While this is limited to 2626 in the question description, we'll still look at how it would impact the complexity if it was not limited (as this could potentially be a follow-up question).
Time: O(C)
Building the adjacency list has a time complexity of O(C) for the same reason as in Approach 1.
we traverse every "edge", but this time we're using depth-first-search.


Space: O(1) or O(U+min(U^2,N)).
We build an adjacency list. Even though this one is a reversed adjacency list, it still contains the
same number of relations.

Runtime: 87 ms, faster than 77.28% of JavaScript online submissions for Alien Dictionary.
Memory Usage: 46 MB, less than 51.52% of JavaScript online submissions for Alien Dictionary.
*/
var alienOrder = function (words) {
  const adjMap = new Map();
  //1. Initialize adjMap for each character
  for (const word of words) {
    for (const c of word) {
      if (!adjMap.has(c)) adjMap.set(c, []);
    }
  }
  //2. add edges
  for (let i = 1; i < words.length; i++) {
    const word1 = words[i - 1];
    const word2 = words[i];
    //check that word2 is not prefix of word1
    if (word1.length > word2.length && word1.startsWith(word2)) return "";
    // Find the first non match and insert the corresponding relation.
    for (let k = 0; k < Math.min(word1.length, word2.length); k++) {
      if (word1[k] != word2[k]) {
        //we only check for first mismatch, to decide the order.
        //The next character doesn't guarantee if its lexicographically smaller
        adjMap.get(word1[k]).push(word2[k]);
        break;
      }
    }
  }
  //3. DFS
  const getReversePostOrder = (adj) => {
    const visited = new Map();
    const onPath = new Set();
    let reversePostOrder = "";
    const dfs = (v, adj) => {
      visited.set(v, true);
      onPath.add(v);
      if (adj.get(v)) {
        for (let w of adj.get(v)) {
          if (!visited.has(w) && dfs(w, adj)) {
            return true;
          } else if (onPath.has(w)) {
            return true;
          }
        }
      }
      onPath.delete(v);
      reversePostOrder = v + reversePostOrder;
      return false;
    };
    for (let v of adj.keys()) {
      if (!visited.has(v) && dfs(v, adj)) return "";
    }
    return reversePostOrder;
  };
  return getReversePostOrder(adjMap);
};
