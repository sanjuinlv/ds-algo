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
