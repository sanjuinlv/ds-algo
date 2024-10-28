/*
409. Longest Palindrome
https://leetcode.com/problems/longest-palindrome/
Type: Easy

Given a string s which consists of lowercase or uppercase letters, return the length of the longest 
palindrome that can be built with those letters.

Letters are case sensitive, for example, "Aa" is not considered a palindrome.

Example 1:
    Input: s = "abccccdd"
    Output: 7
    Explanation: One longest palindrome that can be built is "dccaccd", whose length is 7.

Example 2:
    Input: s = "a"
    Output: 1
    Explanation: The longest palindrome that can be built is "a", whose length is 1.
 
Constraints:
 - 1 <= s.length <= 2000
 - s consists of lowercase and/or uppercase English letters only.

*/

/**
 * @param {string} s
 * @return {number}
 */

/* 
Approach I: Hash Table
Time: O(L)
Space: O(1) - Since there are only 52 english characters, the space is O(1)

Runtime: 1 ms Beats 99.84%
Memory: 50.78 MB Beats 60.46%
*/
var longestPalindrome = function (s) {
  const charMap = new Map();
  for (const c of s) {
    charMap.set(c, (charMap.get(c) || 0) + 1);
  }
  let palLength = 0;
  let hasOddFrequency = false;
  for (let count of charMap.values()) {
    if (count % 2 == 0) palLength += count;
    else {
      // If the frequency is odd, one occurrence of the
      // character will remain without a match
      palLength += count - 1;
      hasOddFrequency = true;
    }
  }
  // If hasOddFrequency is true, we have at least one unmatched
  // character to make the center of an odd length palindrome.
  return hasOddFrequency ? palLength + 1 : palLength;
};

/* 
Approach II: Hash Set
Time: O(L)
Space: O(1) - Since there are only 52 english characters, the space is O(1)

Runtime: 1 ms Beats 99.84%
Memory: 51.16 MB Beats 40.97%
*/
var longestPalindrome = function (s) {
  let charSet = new Set();
  let result = 0;
  for (let c of s) {
    //if set contains the character, match found
    if (charSet.has(c)) {
      //add the two occurence to our palindrome
      result += 2;
      charSet.delete(c);
    } else {
      charSet.add(c);
    }
  }
  //if any character remains, we have at least one unmatched
  //character to make the center of the odd length palindrome.
  if (charSet.size) result++;
  return result;
};
