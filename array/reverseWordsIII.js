/*
https://leetcode.com/problems/reverse-words-in-a-string-iii
Type: Easy

Given a string s, reverse the order of characters in each word within a sentence while
still preserving whitespace and initial word order.

Example 1:
Input: s = "Let's take LeetCode contest"
Output: "s'teL ekat edoCteeL tsetnoc"

Example 2:
Input: s = "God Ding"
Output: "doG gniD"
 
Constraints:

1 <= s.length <= 5 * 10^4
s contains printable ASCII characters.
s does not contain any leading or trailing spaces.
There is at least one word in s.
All the words in s are separated by a single space.
 */
/**
 * @param {string} s
 * @return {string}
 */
/* 
Approach: Using two pointers with characters array
Runtime: 91 ms, faster than 5.66% of JavaScript online submissions for Reverse Words in a String III.
Memory Usage: 49.58 MB, less than 100% of JavaScript online submissions for Reverse Words in a String III.

*/
var reverseWords = function (s) {
  const n = s.length;
  const reverse = (a, i, j) => {
    while (i < j) {
      const temp = a[i];
      a[i++] = a[j];
      a[j--] = temp;
    }
  };
  const reverseWords = (a, n) => {
    let i = 0;
    let j = 0;
    while (j < n) {
      //skip not white spaces
      while (j < n && a[j] !== " ") j++;
      //reverse the chars between i & j-1
      reverse(a, i, j - 1);
      //skip the white space
      j++;
      //set i to j
      i = j;
    }
    return a.join("");
  };
  //char array
  const chars = Array.from(s);
  return reverseWords(chars, n);
};

/*
Approach II: Using for loop

Runtime: 84 ms Beats 5.66%
Memory: 55.79 MB Beats 46.94%
 */
var reverseWords = function (s) {
  const N = s.length;
  let result = "";
  let i = 0;
  for (let j = 0; j < N; j++) {
    if (s[j] == " "){
        //get the word before space and reverse it
        const word = s.slice(i, j);
        const chars = Array.from(word);
        chars.reverse();
        result+= chars.join("");
        //add space to the result
        result+= " ";
        //reset left pointer
        i = j + 1;
    }
  }
  //add last word
  if (i < N){
    const word = s.slice(i, N);
    const chars = Array.from(word);
    chars.reverse();
    result+= reversedChars.join("");
  }
  return result;
};