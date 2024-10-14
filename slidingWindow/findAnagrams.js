/* 
438. Find All Anagrams in a String
https://leetcode.com/problems/find-all-anagrams-in-a-string/
Type - Medium

Given two strings s and p, return an array of all the start indices of p's 
anagrams in s. You may return the answer in any order.

 
Example 1:
    Input: s = "cbaebabacd", p = "abc"
    Output: [0,6]
    Explanation:
    The substring with start index = 0 is "cba", which is an anagram of "abc".
    The substring with start index = 6 is "bac", which is an anagram of "abc".

Example 2:
    Input: s = "abab", p = "ab"
    Output: [0,1,2]    
    Explanation:
    The substring with start index = 0 is "ab", which is an anagram of "ab".
    The substring with start index = 1 is "ba", which is an anagram of "ab".
    The substring with start index = 2 is "ab", which is an anagram of "ab".
 

Constraints:
 - 1 <= s.length, p.length <= 3 * 10^4
 - s and p consist of lowercase English letters.
*/

/*
Approach - Sliding Window
Time: O(N)
Space: O(1) - We sotre only 26 characters in map

Runtime: 81 ms Beats 77.39%
Memory: 53.46 MB Beats 87.67%
*/
var findAnagrams = function (s, p) {
  const pCharCount = new Map();
  for (let c of p) {
    pCharCount.set(c, (pCharCount.get(c) || 0) + 1);
  }
  const K = p.length;
  const N = s.length;
  let count = pCharCount.size;
  let i = 0;
  let j = 0;
  let result = [];
  while (j < N) {
    const char = s[j];
    // update character count
    if (pCharCount.has(char)) {
      //if char fount in 'pat' then reduce the char count, marking it as found
      pCharCount.set(char, pCharCount.get(char) - 1);
      //if unique count has reduced to 0, that means all occurance of same char found
      //so reduce the total char to be matched
      if (pCharCount.get(char) == 0) count--;
    }
    if (j - i + 1 < K) j++;
    else {
      //if count is zero then all char are found in this window
      if (count == 0) result.push(i);
      const charOut = s[i];
      if (pCharCount.has(charOut)) {
        const outCharCount = pCharCount.get(charOut);
        // if this char was already matched and if we are removing from curr window
        // then we need to increase the unique chars count to be found
        if (outCharCount == 0) count++;
        pCharCount.set(charOut, outCharCount + 1);
      }
      i++;
      j++;
    }
  }
  return result;
};
