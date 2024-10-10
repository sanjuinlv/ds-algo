/* 
49. Group Anagrams
https://leetcode.com/problems/group-anagrams/description/
Type - Medium

Given an array of strings strs, group the anagrams together. You can return the answer in any order.
An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase, 
typically using all the original letters exactly once.

Example 1:
  Input: strs = ["eat","tea","tan","ate","nat","bat"]
  Output: [["bat"],["nat","tan"],["ate","eat","tea"]]
  Explanation:
  There is no string in strs that can be rearranged to form "bat".
  The strings "nat" and "tan" are anagrams as they can be rearranged to form each other.
  The strings "ate", "eat", and "tea" are anagrams as they can be rearranged to form each other.

Example 2:
  Input: strs = [""]
  Output: [[""]]

Example 3:
  Input: strs = ["a"]
  Output: [["a"]]

Constraints:
 - 1 <= strs.length <= 104
 - 0 <= strs[i].length <= 100
 - strs[i] consists of lowercase English letters.  
*/
/* 
Approach I : Categorized by Sorted String
Time: O(N*K*LogK), where N is input array size and K is longest word length
Space: O(N*K)
Runtime: 106 ms Beats 83.10%
Memory Usage: 61.41 MB Beats 96.37%
*/
var groupAnagrams = function (strs) {
  const anagramMap = new Map();
  for (const str of strs) {
    const sortedWord = str.split("").sort().join("");
    if (anagramMap.has(sortedWord)) {
      anagramMap.get(sortedWord).push(str);
    } else anagramMap.set(sortedStr, [str]);
  }
  return Array.from(anagramMap.values());
};

/* 
Approach II : Categorized by Count
Time: O(N*K), where N is input array size and K is longest word length
Space: O(N*K)
Runtime: 115 ms Beats 60.57%
Memory Usage: 64.66 MB Beats 11.87%
*/
var groupAnagrams = function (strs) {
  if (strs.length == 0) return [];
  const result = {};
  for (const s of strs) {
    //only english lowercase characters
    const count = Array(26).fill(0);
    for (let c of s) count[c.charCodeAt(0) - "a".charCodeAt(0)]++;
    let key = "";
    for (let i = 0; i < 26; i++) {
      key += "#" + count[i];
    }
    if (!result[key]) result[key] = [];
    result[key].push(s);
  }
  return Object.values();
};
