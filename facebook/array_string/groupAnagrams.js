/* 
Given an array of strings strs, group the anagrams together. You can return the answer in any order.
An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, 
typically using all the original letters exactly once.

Input: strs = ["eat","tea","tan","ate","nat","bat"]
Output: [["bat"],["nat","tan"],["ate","eat","tea"]]

Input: strs = [""]
Output: [[""]]

Input: strs = ["a"]
Output: [["a"]]
*/
/**
 * Medium
 * @param {string[]} strs
 * @return {string[][]}
 */
// strs = ["eat","tea","tan","ate","nat","bat"]
var groupAnagrams = function (strs) {
  const N = strs.length;
  // Map of sorted string and possible anagram values
  const anagramMap = new Map();
  for (let i = 0; i < N; i++) {
    //sorted the entry
    const word = strs[i];
    const sortedWord = strs[i].split("").sort().join("");
    console.log(`word: ${word}, sorted word: ${sortedWord}`);
    if (anagramMap.has(sortedWord)) {
      anagramMap.get(sortedWord).push(word);
    } else {
      anagramMap.set(sortedWord, [word]);
    }
    console.log(anagramMap);
  }
  console.log(`final Map`);
  console.log(anagramMap);
  return Array.from(anagramMap.values());
};

// for submission
// Time Complexity: O(NKLogK), where N is input array size and K is longest word length
// Space complexity: O(NK)
/* 
Runtime: 120 ms, faster than 89.74% of JavaScript online submissions for Group Anagrams.
Memory Usage: 48.5 MB, less than 5.20% of JavaScript online submissions for Group Anagrams.
*/
var groupAnagrams = function (strs) {
  const N = strs.length;
  const anagramMap = new Map();
  for (let i = 0; i < N; i++) {
    const sortedWord = strs[i].split("").sort().join("");
    if (anagramMap.has(sortedWord)) {
      anagramMap.get(sortedWord).push(strs[i]);
    } else {
      anagramMap.set(sortedWord, [strs[i]]);
    }
  }
  return Array.from(anagramMap.values());
};
