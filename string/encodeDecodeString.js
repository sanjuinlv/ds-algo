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
