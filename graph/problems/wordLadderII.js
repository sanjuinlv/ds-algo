/* 
126. Word Ladder II
https://leetcode.com/problems/word-ladder-ii/
Type: Hard
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
  for (let i = 0; i < wordList.length; i++) {
    const word = wordList[i];
    for (let j = 0; j < L; j++) {
      const newWord = word.substring(0, j) + "*" + word.substring(j + 1, L);
      if (!wordMap.has(newWord)) wordMap.set(newWord, []);
      // add this words which has the intermediate generic word 'newWord'.
      wordMap.get(newWord).push(i);
    }
  }
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
      for (let wordIndex of wordMap.get(newWord) || []) {
        const neighbor = wordList[wordIndex];
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
