/* 
https://leetcode.com/problems/reverse-words-in-a-string/
Type: Easy

Given an input string s, reverse the order of the words.
A word is defined as a sequence of non-space characters. The words in s will be separated
by at least one space.

Return a string of the words in reverse order concatenated by a single space.

Note that s may contain leading or trailing spaces or multiple spaces between two words.
The returned string should only have a single space separating the words. Do not include
any extra spaces.

Example 1:
Input: s = "the sky is blue"
Output: "blue is sky the"

Example 2:
Input: s = "  hello world  "
Output: "world hello"
Explanation: Your reversed string should not contain leading or trailing spaces.

Example 3:
Input: s = "a good   example"
Output: "example good a"
Explanation: You need to reduce multiple spaces between two words to a single space in the reversed string.

Constraints:
 - 1 <= s.length <= 104
 - s contains English letters (upper-case and lower-case), digits, and spaces ' '.
 - There is at least one word in s.
 
Follow-up: If the string data type is mutable in your language, can you solve it in-place with O(1) extra space?
*/
/**
 * @param {string} s
 * @return {string}
 */
/* 
Approach I: Brute force (Split & revers)
Time: O(N), where N is a number of characters in the input string
Space: O(N), to store the result of split by spaces

Runtime: 85 ms, faster than 55.24% of JavaScript online submissions for Reverse Words in a String.
Memory Usage: 43.5 MB, less than 95.82% of JavaScript online submissions for Reverse Words in a String.
*/
var reverseWords = function (s) {
  return s.trim().split(/\W+/).reverse().join(" ");
};

/* 
Approach I: Using two pointers
Time: O(N)
Space: O(1)
Runtime: 64 ms Beats 17.37%
Memory: 51.99 MB Beats 10.36%
*/
var reverseWords = function (s) {
  const N = s.length;
  if (N == 0) return s;
  const result = [];
  let j = N;
  for (let i = N - 1; i >= 0; i--) {
    if (s[i] == " ") {
      //check if we have already scanned a word
      if (j - i - 1 > 0) {
        if (result.length) result.push(" ");
        result.push(s.slice(i + 1, j));
      }
      //move j to ith position
      j = i;
    }
  }
  //add last word 
  if (j > 0) {
    if (result.length) result.push(" ");
    result.push(s.slice(0, j));
  } 
  return result.join("");
};
/* 
Approach II: Using two pointers
Time: O(N)
Space: O(1)
Runtime: 92 ms, faster than 44.92% of JavaScript online submissions for Reverse Words in a String.
Memory Usage: 44.3 MB, less than 35.54% of JavaScript online submissions for Reverse Words in a String
*/
var reverseWords = function (s) {
  s = s.trim();
  let result = "";
  let i = s.length - 1;
  while (s[i] == " " && i > 0) i--;
  let j = i;
  while (j > 0) {
    if (s[j] == " ") {
      //space found, add current word to the result
      if (result.length) result += " ";
      result += s.substring(j + 1, i + 1);
      j--;
      //skip all other white spaces
      while (s[j] == " ") j--;
      i = j;
    }
    j--;
  }
  //add result fo first word, if not added already
  if (i - j >= 0) {
    if (result.length) result += " ";
    result += s.substring(j, i + 1);
  }
  return result;
};

/* 
Approach II: Two pointer (Without Trim)
Time: O(N)
Space: O(1)
Runtime: 94 ms, faster than 41.92% of JavaScript online submissions for Reverse Words in a String.
Memory Usage: 44.1 MB, less than 50.99% of JavaScript online submissions for Reverse Words in a String.
*/
var reverseWords = function (s) {
  const chars = Array.from(s);
  const n = s.length;
  const reverse = (a, left, right) => {
    while (left < right) {
      const temp = a[left];
      a[left++] = a[right];
      a[right--] = temp;
    }
  };
  const reverseWords = (a, n) => {
    let i = 0;
    let j = 0;
    while (i < n) {
      //skip leading space
      //(condition i < j is for next iteration when word is reversed and i is still at starting index )
      while (i < j || (i < n && a[i] == " ")) i++;
      //skip non space
      while (j < i || (j < n && a[j] != " ")) j++;
      reverse(a, i, j - 1);
    }
  };
  const cleanSpace = (a, n) => {
    let i = 0;
    let j = 0;
    while (j < n) {
      //skip leading space
      while (j < n && a[j] == " ") j++;
      //keep non space
      while (j < n && a[j] !== " ") a[i++] = a[j++];
      //skip space
      while (j < n && a[j] == " ") j++;
      //keep only one space
      if (j < n) a[i++] = " ";
    }
    console.log(a);
    return a.join("").substring(0, i);
  };
  //step 1. Reverse the array
  reverse(chars, 0, n - 1);
  //step 2. Reverse each word
  reverseWords(chars, n);
  //step 3. Clean spaces
  return cleanSpace(chars, n);
};
