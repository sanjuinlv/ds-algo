/* 
271. Encode and Decode Strings
https://leetcode.com/problems/encode-and-decode-strings/description/
Type: Medium

Design an algorithm to encode a list of strings to a string. The encoded string is then sent over the network and is decoded back to the original list of strings.

Machine 1 (sender) has the function:

string encode(vector<string> strs) {
  // ... your code
  return encoded_string;
}

Machine 2 (receiver) has the function:

vector<string> decode(string s) {
  //... your code
  return strs;
}

So Machine 1 does:
string encoded_string = encode(strs);

and Machine 2 does:
vector<string> strs2 = decode(encoded_string);

strs2 in Machine 2 should be the same as strs in Machine 1.

Implement the encode and decode methods.
You are not allowed to solve the problem using any serialize methods (such as eval).

Example 1:
  Input: dummy_input = ["Hello","World"]
  Output: ["Hello","World"]
  Explanation:
    Machine 1:
    Codec encoder = new Codec();
    String msg = encoder.encode(strs);
    Machine 1 ---msg---> Machine 2

  Machine 2:
    Codec decoder = new Codec();
    String[] strs = decoder.decode(msg);

Example 2:
  Input: dummy_input = [""]
  Output: [""]

Constraints:
  1 <= strs.length <= 200
  0 <= strs[i].length <= 200
  strs[i] contains any possible characters out of 256 valid ASCII characters.

Follow up: Could you write a generalized algorithm to work on any possible set of characters?

*/
/* 
Runtime: 137 ms, faster than 31.24% of JavaScript online submissions for Encode and Decode Strings.
Memory Usage: 49.6 MB, less than 14.15% of JavaScript online submissions for Encode and Decode Strings.
*/
/**
 * Encodes a list of strings to a single string.
 *
 * @param {string[]} strs
 * @return {string}
 */
/* 
Approach I: Non ASCII delimiter
Time: O(N)
Space: O(1)
 */
var encode = function (strs) {
  if (strs.length == 0) return String.fromCodePoint(258);
  const delim = String.fromCodePoint(257);
  let encodedStr = "";
  for (let str of strs) {
    encodedStr += str;
    encodedStr += delim;
  }
  //finally the encoded string without last delimiter character
  return encodedStr.slice(0, encodedStr.length - 1);
};

/**
 * Decodes a single string to a list of strings.
 *
 * @param {string} s
 * @return {string[]}
 */
var decode = function (s) {
  if (s === String.fromCodePoint(258)) return [];
  const delim = String.fromCodePoint(257);
  return s.split(delim);
};

/**
 * Your functions will be called as such:
 * decode(encode(strs));
 */

/* sort example from someone */
var encode = function (strs) {
  return strs.join(String.fromCharCode(257));
};

var decode = function (s) {
  return s.split(String.fromCharCode(257));
};
