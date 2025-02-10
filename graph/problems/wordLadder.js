/*
127. Word Ladder
https://leetcode.com/problems/word-ladder
Type: Hard

A transformation sequence from word beginWord to word endWord using a dictionary
wordList is a sequence of words beginWord -> s1 -> s2 -> ... -> sk such that:

Every adjacent pair of words differs by a single letter.
Every si for 1 <= i <= k is in wordList. Note that beginWord does not need to be in wordList.
sk == endWord
Given two words, beginWord and endWord, and a dictionary wordList, return the number of
words in the shortest transformation sequence from beginWord to endWord, or 0 if no such
sequence exists.

Example 1:
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log","cog"]
Output: 5
Explanation: One shortest transformation sequence is "hit" -> "hot" -> "dot" -> "dog" -> cog", 
which is 5 words long.

Example 2:
Input: beginWord = "hit", endWord = "cog", wordList = ["hot","dot","dog","lot","log"]
Output: 0
Explanation: The endWord "cog" is not in wordList, therefore there is no valid transformation sequence.

 */
/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
/*
Approach: BFS
Time Complexity: O(M^2 * N), where M is the length of each word and N is the total number
 of words in the input word list.

For each word in the word list, we iterate over its length to find all the intermediate
words corresponding to it. Since the length of each word is M and we have N words, the
total number of iterations the algorithm takes to create all_combo_dict is M×N. 
Additionally, forming each of the intermediate word takes O(M) time because of the substring
operation used to create the new string. This adds up to a complexity of O(M^2 * N)).

Breadth first search in the worst case might go to each of the N words. For each word, 
we need to examine M possible intermediate words/combinations. Notice, we have used the substring
operation to find each of the combination. Thus, M combinations take O(M^ 2) time.
As a result, the time complexity of BFS traversal would also be  O(M^2 * N))

Space Complexity: O(M^2 * N))
Each word in the word list would have M intermediate combinations. To create the
dictionary we save an intermediate word as the key and its corresponding original words
as the value. Note, for each of M intermediate words we save the original word of length M.
This simply means, for every word we would need a space of M^2 to save all the
transformations corresponding to it. Thus, dictionary would need a total space of 
O(M^2 * N).
Visited dictionary would need a space of O(M*N) as each word is of length M.
Queue for BFS in worst case would need a space for all O(N) words and this would
also result in a space complexity of (M×N).

Optimization: We can definitely reduce the space complexity of this algorithm by storing
the indices corresponding to each word instead of storing the word itself.

Runtime: 74 ms Beats 90.51%
Memory Usage: 71.62 MB Beats 10.98%
 */
var ladderLength = function (beginWord, endWord, wordList) {
  const L = beginWord.length;
  const wordMap = new Map();
  //create generic word dictionary for each word
  for (let word of wordList) {
    for (let i = 0; i < L; i++) {
      const newWord = word.substring(0, i) + "*" + word.substring(i + 1, L);
      if (!wordMap.has(newWord)) wordMap.set(newWord, []);
      // add this words which has the intermediate generic word 'newWord'.
      wordMap.get(newWord).push(word);
    }
  }
  const Q = [];
  const visited = new Set();
  Q.push([beginWord, 1]);
  visited.add(beginWord);
  while (Q.length) {
    const [word, level] = Q.shift();
    if (word == endWord) return level;
    //create variation of this word
    for (let i = 0; i < L; i++) {
      const newWord = word.substring(0, i) + "*" + word.substring(i + 1, L);
      if (wordMap.has(newWord)) {
        for (let neighbour of wordMap.get(newWord) || []) {
          if (!visited.has(neighbour)) {
            visited.add(neighbour);
            Q.push([neighbour, level + 1]);
          }
        }
      }
    }
  }
  return 0;
};

/* 
Approach II
Runtime: 300 ms Beats 27.88%
Memory: 59.26 MB Beats 37.04%
*/
var ladderLength = function (beginWord, endWord, wordList) {
  const L = beginWord.length;
  const wordSet = new Set(wordList);
  //remove the start word form set, if present in the word set
  wordSet.delete(beginWord);
  const Q = [];
  Q.push([beginWord, 1]);
  while (Q.length) {
    const [word, level] = Q.shift();
    //end word found
    if (word == endWord) return level;
    //try all combination of word
    const chars = Array.from(word);
    for (let i = 0; i < word.length; i++) {
      const orgChar = chars[i];
      for (let c = "a".charCodeAt(0); c <= "z".charCodeAt(0); c++) {
        chars[i] = String.fromCharCode(c);
        const newWord = chars.join("");
        //check if word exist in set, if so push in the queue
        if (wordSet.has(newWord)) {
          Q.push([newWord, level + 1]);
          //remove this word from set as we have now visited it
          //and can not find shorter path than current
          wordSet.delete(newWord);
        }
      }
      chars[i] = orgChar;
    }
  }
  return 0;
};
