/*
https://leetcode.com/problems/integer-to-english-words/

Convert a non-negative integer num to its English words representation.

Example 1:

Input: num = 123
Output: "One Hundred Twenty Three"
Example 2:

Input: num = 12345
Output: "Twelve Thousand Three Hundred Forty Five"
Example 3:

Input: num = 1234567
Output: "One Million Two Hundred Thirty Four Thousand Five Hundred Sixty Seven"
 

Constraints:

0 <= num <= 2^31 - 1
 */
/**
 * @param {number} num
 * @return {string}
 */
/* 
Time: O(N) Intuitively the output is proportional to the number N of digits in the input
Space: O(1)
Runtime: 154 ms, faster than 5.01% of JavaScript online submissions for Integer to English Words.
Memory Usage: 43.2 MB, less than 79.81% of JavaScript online submissions for Integer to English Words.

*/
var numberToWords = function (num) {
  const values = [
    1000000000, 1000000, 1000, 100, 90, 80, 70, 60, 50, 40, 30, 20, 19, 18, 17,
    16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1,
  ];
  const word = [
    "Billion",
    "Million",
    "Thousand",
    "Hundred",
    "Ninety",
    "Eighty",
    "Seventy",
    "Sixty",
    "Fifty",
    "Forty",
    "Thirty",
    "Twenty",
    "Nineteen",
    "Eighteen",
    "Seventeen",
    "Sixteen",
    "Fifteen",
    "Fourteen",
    "Thirteen",
    "Twelve",
    "Eleven",
    "Ten",
    "Nine",
    "Eight",
    "Seven",
    "Six",
    "Five",
    "Four",
    "Three",
    "Two",
    "One",
  ];

  const intToWord = (num) => {
    if (num == 0) return "Zero";
    let result = "";
    for (let i = 0; i < values.length; i++) {
      while (values[i] <= num) {
        if (num <= 99) {
          num = num - values[i];
          if (result.length) result += " ";
          result += word[i];
        } else {
          const times = parseInt(num / values[i]);
          const timesWord = intToWord(times);
          num = num - values[i] * times;
          if (result.length) result += " ";
          result += timesWord + " " + word[i];
        }
      }
    }
    return result;
  };
  return intToWord(num);
};
