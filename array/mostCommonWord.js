/*
https://leetcode.com/problems/most-common-word/solution/

Given a string paragraph and a string array of the banned words banned, return the most frequent
word that is not banned. It is guaranteed there is at least one word that is not banned, 
and that the answer is unique.

The words in paragraph are case-insensitive and the answer should be returned in lowercase.

Example 1:

Input: paragraph = "Bob hit a ball, the hit BALL flew far after it was hit.", banned = ["hit"]
Output: "ball"
Explanation: 
"hit" occurs 3 times, but it is a banned word.
"ball" occurs twice (and no other word does), so it is the most frequent non-banned word in the paragraph. 
Note that words in the paragraph are not case sensitive,
that punctuation is ignored (even if adjacent to words, such as "ball,"), 
and that "hit" isn't the answer even though it occurs more because it is banned.
Example 2:

Input: paragraph = "a.", banned = []
Output: "a"

Constraints:

1 <= paragraph.length <= 1000
paragraph consists of English letters, space ' ', or one of the symbols: "!?',;.".
0 <= banned.length <= 100
1 <= banned[i].length <= 10
banned[i] consists of only lowercase English letters.

 */
/**
 * @param {string} paragraph
 * @param {string[]} banned
 * @return {string}
 */
var mostCommonWord = function (paragraph, banned) {
  //1. create set for banned words for quick look up
  const bannedSet = new Set();
  for (const word in banned) bannedSet.add(word);
  //2. created words array from paragraph
  const words = paragraph.split(" ");
  //3. create PQ for word count
  const wordCountMap = new Map();
  for (let word of words) {
    //replace special characters
    word = word.replace(/!|\?|'|,|;|\./g, "").toLocaleLowerCase();
    if (!bannedSet.has(word))
      wordCountMap.set(word, (wordCountMap.get(word) || 0) + 1);
  }
  //   console.log(wordCountMap);
  let result = "";
  let max = -Infinity;
  for (const key of wordCountMap.keys()) {
    if (wordCountMap.get(key) > max) {
      max = wordCountMap.get(key);
      result = key;
    }
  }
  return result;
};

//cleaner code with regex to split
/* 
Approach: Two pass
Runtime: 108 ms, faster than 26.42% of JavaScript online submissions for Most Common Word.
Memory Usage: 43.9 MB, less than 87.68% of JavaScript online submissions for Most Common Word.
*/

var mostCommonWord = function (paragraph, banned) {
  //1. create set for banned words for quick look up
  const bannedSet = new Set();
  for (const word of banned) bannedSet.add(word);
  //2. created words array from paragraph by word character, ignoring non word characters
  // /\W+/ is same as [^a-zA-Z0-9]
  const words = paragraph.toLowerCase().split(/\W+/);
  //3. create map for word count
  const wordCountMap = new Map();
  const ans = { count: 0, word: "" };
  for (let word of words) {
    //skip banned word
    if (!bannedSet.has(word)) {
      wordCountMap.set(word, (wordCountMap.get(word) || 0) + 1);
      if (wordCountMap.get(word) > ans.count) {
        ans.count = wordCountMap.get(word);
        ans.word = word;
      }
    }
  }
  return ans.word;
};
//23/07/2022
/* 
Runtime: 96 ms, faster than 59.78% of JavaScript online submissions for Most Common Word.
Memory Usage: 44.6 MB, less than 35.80% of JavaScript online submissions for Most Common Word.
*/
var mostCommonWord = function (paragraph, banned) {
  //1. create set for banned words for quick look up
  const bannedSet = new Set();
  for (const word of banned) bannedSet.add(word);
  //2. created words array from paragraph by word character, ignoring non word characters
  // /\W+/ is same as [^a-zA-Z0-9]
  const words = paragraph.toLowerCase().split(/\W+/);
  //3. create map for word count
  const wordCountMap = new Map();
  const ans = { count: 0, word: "" };
  for (let word of words) {
    //skip banned word
    if (!bannedSet.has(word)) {
      let wordCount = wordCountMap.get(word) || 0;
      wordCountMap.set(word, wordCount + 1);
      wordCount++; //indicates current count
      if (wordCount > ans.count) {
        ans.count = wordCount;
        ans.word = word;
      }
    }
  }
  return ans.word;
};
