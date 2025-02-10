/* 
126. Word Ladder II
https://leetcode.com/problems/word-ladder-ii/
Type: Hard

A transformation sequence from word beginWord to word endWord using a dictionary wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

Every adjacent pair of words differs by a single letter.
Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
sk == endWord
Given two words, beginWord and endWord, and a dictionary wordList, return all the shortest transformation sequences from beginWord to endWord, or an empty list if no such sequence exists. Each sequence should be returned as a list of the words [beginWord, s1, s2, ..., sk].

Example 1:
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]]
Explanation: There are 2 shortest transformation sequences:
"hit" -> "hot" -> "dot" -> "dog" -> "cog"
"hit" -> "hot" -> "lot" -> "log" -> "cog"

Example 2:
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: []
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.

Constraints:
 * 1 <= beginWord.length <= 5
 * endWord.length == beginWord.length
 * 1 <= wordList.length <= 500
 * wordList[i].length == beginWord.length
 * beginWord, endWord, and wordList[i] consist of lowercase English letters.
 * beginWord != endWord
 * All the words in wordList are unique.
 * The sum of all shortest transformation sequences does not exceed 10^5.
*/
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {string[][]}
 */
var findLadders = function (beginWord, endWord, wordList) {
  const L = beginWord.length;
  const pathTo = (edgeTo, source, target) => {
    const path = [];
    for (let word = target; word !== source; word = edgeTo.get(word)) {
      path.push(word);
    }
    path.push(source);
    return path.reverse();
  };
  //1. Create generic word dictionary which differ by one letter
  const wordMap = new Map();
  wordList.forEach((word) => {
    for (let i = 0; i < L; i++) {
      const newWord = word.substring(0, i) + "*" + word.substring(i + 1, L);
      if (!wordMap.has(newWord)) wordMap.set(newWord, []);
      // add this words which has the intermediate generic word 'newWord'.
      wordMap.get(newWord).push(word);
    }
  });
  //2. Perform BFS
  const edgeTo = new Map();
  const paths = [];
  const Q = [];
  const visited = new Map();
  Q.push(beginWord);
  edgeTo.set(beginWord, null);
  visited.set(beginWord, true);
  while (Q.length) {
    const currWord = Q.shift();
    //check for all combination of 'currWord'
    for (let i = 0; i < L; i++) {
      // Intermediate words for current word
      const newWord =
        currWord.substring(0, i) + "*" + currWord.substring(i + 1, L);
      for (let neighbor of wordMap.get(newWord) || []) {
        if (!visited.get(neighbor)) {
          edgeTo.set(neighbor, currWord);
          //found the end word
          if (neighbor === endWord) {
            const pathToThisWord = pathTo(edgeTo, beginWord, endWord);
            paths.push(pathToThisWord);
            continue;
          }
          visited.set(neighbor, true);
          Q.push(neighbor);
        }
      }
    }
  }
  return paths;
};

/* 
This will exceeed time limit 
*/
var findLadders = function (beginWord, endWord, wordList) {
  const wordSet = new Set(wordList);
  const Q = [];
  Q.push([beginWord]);
  const visitedLevel = [];
  visitedLevel.push(beginWord);
  let level = 0;
  const ans = [];
  while (Q.length) {
    const path = Q.shift();
    //delete all word which has been used in previous level
    while (path.length > level) {
      level++;
      for (let word of visitedLevel) wordSet.delete(word);
    }
    // console.log(`path`, path);
    //get the last word in array, i.e, top word on the path
    const word = path[path.length - 1];
    // console.log(`word`, word);
    //check if we found the end word
    if (word == endWord) {
      //the first sequence where we reached end
      if (ans.length == 0) ans.push(path);
      //any other entry with same same as path, indicating shorted path with same level
      else if (ans[0].length == path.length) ans.push(path);
    }
    const chars = Array.from(word);
    // Now, replace each character of ‘word’ with char
    // from a-z then check if ‘word’ exists in wordList.
    for (let i = 0; i < word.length; i++) {
      const orgChar = chars[i];
      //try with all english letters
      for (let c = "a".charCodeAt(0); c <= "z".charCodeAt(0); c++) {
        chars[i] = String.fromCharCode(c);
        //new word with modified char
        const newWord = chars.join("");
        // console.log(`newWord`, newWord);  
        if (wordSet.has(newWord)) {
          path.push(newWord);
          Q.push([...path]);
          //mark as visted on the level
          visitedLevel.push(newWord);
          //remove the last word so that we have other path as well
          path.pop();
        }
      }
      chars[i] = orgChar;
    }
  }
  return ans;
};
