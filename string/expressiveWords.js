/* 
https://leetcode.com/explore/interview/card/google/59/array-and-strings/3056/

Sometimes people repeat letters to represent extra feeling. For example:

"hello" -> "heeellooo"
"hi" -> "hiiii"
In these strings like "heeellooo", we have groups of adjacent letters that are all
the same: "h", "eee", "ll", "ooo".

You are given a string s and an array of query strings words. A query word is stretchy
if it can be made to be equal to s by any number of applications of the following
extension operation: choose a group consisting of characters c, and add some number
of characters c to the group so that the size of the group is three or more.

For example, starting with "hello", we could do an extension on the group "o" to get
"hellooo", but we cannot get "helloo" since the group "oo" has a size less than three. 
Also, we could do another extension like "ll" -> "lllll" to get "helllllooo".
If s = "helllllooo", then the query word "hello" would be stretchy because of these
two extension operations: query = "hello" -> "hellooo" -> "helllllooo" = s.

Return the number of query strings that are stretchy.

Constraints:

1 <= s.length, words.length <= 100
1 <= words[i].length <= 100
s and words[i] consist of lowercase letters.
*/
/**
 * @param {string} s
 * @param {string[]} words
 * @return {number}
 */
/* 
Approach I: Using two pointers
s="helllllooo" || "heeellooo"
word: "hello"
*/
//buggy with edge cases
var expressiveWords = function (s, words) {
  let count = 0;
  const canStretch = (word, s) => {
    console.log(`word: ${word}`);
    let i = 0;
    let char = word[0];
    let charCount = 1;
    for (let j = 1; j < word.length; j++) {
      console.log(`prev char: ${char}, curr char word[${j}] : ${word[j]}`);
      //same character, continue counting
      if (char === word[j]) {
        charCount++;
      } else {
        console.log(`got diff char. s[${i}]: ${s[i]}`);
        let sCharCount = 0;
        //encountered the different word
        if (s[i] !== char) return false;
        //count the this character count in 's'
        while (s[i] === char) {
          sCharCount++;
          i++;
        }
        console.log(
          `s[${i}]: ${s[i]}, charCount: ${charCount}, sCharCount: ${sCharCount}`
        );
        if (sCharCount !== charCount && sCharCount - charCount < 3) {
          return false;
        }
        char = word[j];
      }
    }
    console.log(`j: ${j}`);
    return true;
  };
  for (let word of words) {
    const can = canStretch(word, s);
    console.log(`can stretch: '${word}' => ${can}`);
    if (can) count++;
  }
  return count;
};

/* 
Approach: Using two pointers
Time: O(N)
Space: O(1)
Your runtime beats 11.11 % of javascript submissions.
Your memory usage beats 53.33 % of javascript submissions.
*/
var expressiveWords = function (s, words) {
  let count = 0;

  const getRepeatedLength = (word, start) => {
    let end = start;
    while (end < word.length && word[start] === word[end]) end++;
    return end - start;
  };
  const canStretch = (word, s) => {
    let i = 0;
    let j = 0;
    let m = word.length;
    let n = s.length;
    while (i < m && j < n) {
      if (word[i] !== s[j]) return false;
      //get repeated character count from word
      const repeated1 = getRepeatedLength(word, i);
      const repeated2 = getRepeatedLength(s, j);
      if (repeated1 !== repeated2 && (repeated1 >= repeated2 || repeated2 < 3))
        return false;
      i += repeated1;
      j += repeated2;
    }
    //check if we compared all character
    return i === m && j === n;
  };
  for (let word of words) {
    if (canStretch(word, s)) count++;
  }
  return count;
};
