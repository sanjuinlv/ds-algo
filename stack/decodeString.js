/* 
https://leetcode.com/problems/decode-string/
Category - Medium

Given an encoded string, return its decoded string.

The encoding rule is: k[encoded_string], where the encoded_string inside the square
brackets is being repeated exactly k times. Note that k is guaranteed to be a positive integer.

You may assume that the input string is always valid; there are no extra white spaces,
square brackets are well-formed, etc. Furthermore, you may assume that the original
data does not contain any digits and that digits are only for those repeat numbers, k.
For example, there will not be input like 3a or 2[4].

The test cases are generated so that the length of the output will never exceed 10^5.

Example 1:

Input: s = "3[a]2[bc]"
Output: "aaabcbc"

Example 2:

Input: s = "3[a2[c]]"
Output: "accaccacc"

Example 3:

Input: s = "2[abc]3[cd]ef"
Output: "abcabccdcdcdef"

Constraints:

1 <= s.length <= 30
s consists of lowercase English letters, digits, and square brackets '[]'.
s is guaranteed to be a valid input.
All the integers in s are in the range [1, 300].
*/
/**
 * @param {string} s
 * @return {string}
 */
/*
Approach : Using Stack
Time Complexity: O(maxK^countK * n), where maxK is the maximum value of k,
countK is the count of nested k values and n is the maximum length of encoded string.
Example, for s = 20[a10[bc]], maxK is 20, countK is 2 as there are 2 nested k values
(20 and 10) . Also, there are 2 encoded strings a and bc with maximum length of
encoded string ,n as 2.

Space: O(sum(maxK^countK * n)), where maxK is the maximum value of k, countK is
the count of nested k values and n is the maximum length of encoded string.

Runtime: 74 ms, faster than 72.57% of JavaScript online submissions for Decode String.
Memory Usage: 41.7 MB, less than 87.50% of JavaScript online submissions for Decode String.
 */
var decodeString = function (s) {
  var stack = [];
  const top = (s) => s[s.length - 1];
  for (let i = 0; i < s.length; i++) {
    //keep adding to stack until we get closing braces
    if (s[i] !== "]") {
      stack.push(s[i]);
    } else {
      //step 1. take out the character from the stack
      let charStr = "";
      while (top(stack) !== "[") charStr = stack.pop() + charStr;
      //step 2. remove the opening bracket
      stack.pop();
      //step 3. get the number
      let numStr = ""; //23
      while (parseInt(top(stack)) || parseInt(top(stack)) == 0) {
        numStr = stack.pop() + numStr;
      }
      const k = parseInt(numStr);
      for (let i = 0; i < k; i++) {
        stack.push(charStr);
      }
    }
  }
  return stack.join("");
};
