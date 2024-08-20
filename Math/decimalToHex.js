/* 
https://leetcode.com/problems/convert-a-number-to-hexadecimal/
Type: Given an integer num, return a string representing its hexadecimal representation. For negative integers, two’s complement method is used.
All the letters in the answer string should be lowercase characters, and there should not be any leading zeros in the answer except for the zero itself.
Note: You are not allowed to use any built-in library method to directly solve this problem.

Example 1:

Input: num = 26
Output: "1a"

Example 2:

Input: num = -1
Output: "ffffffff"

Constraint:
-2^31 <= num <= 2^31 - 1

*/
/**
 * @param {number} num
 * @return {string}
 */
//For positive number, using math
var toHex = function (num) {
  if (num == 0) return "0";
  const hexMap = "0123456789abcdef";
  let hexStr = "";
  while (num > 0) {
    const rem = num % 16;
    num = parseInt(num / 16);
    hexStr = hexMap[rem] + hexStr;
  }
  return hexStr;
};

// Solution reference
/*
each time we take a look at the last four digits of binary verion of the input,
and maps that to a hex char shift the input to the right by 4 bits, do it again
until input becomes 0

Runtime: 72 ms, faster than 84.38% of JavaScript online submissions for Convert a Number to Hexadecimal.
Memory Usage: 38.8 MB, less than 36.46% of JavaScript online submissions for Convert a Number to Hexadecimal.
 */
var toHex = function (num) {
  if (num == 0) return "0";
  let result = "";
  const hexMap = "0123456789abcdef";
  while (num != 0 && result.length < 8) {
    //num & 15 is same as num % 16
    result = hexMap[num & 15] + result;
    //num >> 4 is same as num / 16 (2*2*2*2)
    num = num >> 4;
  }
  return result;
};
