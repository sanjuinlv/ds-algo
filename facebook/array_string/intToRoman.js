/* 
https://leetcode.com/problems/integer-to-roman

Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000
For example, 2 is written as II in Roman numeral, just two one's added together. 12 is written as XII, 
which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. However, the numeral for
four is not IIII. Instead, the number four is written as IV. Because the one is before the five we
subtract it making four. The same principle applies to the number nine, which is written as IX.
There are six instances where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9. 
X can be placed before L (50) and C (100) to make 40 and 90. 
C can be placed before D (500) and M (1000) to make 400 and 900.
Given an integer, convert it to a roman numeral.

Example 1:

Input: num = 3
Output: "III"
Explanation: 3 is represented as 3 ones.
Example 2:

Input: num = 58
Output: "LVIII"
Explanation: L = 50, V = 5, III = 3.
Example 3:

Input: num = 1994
Output: "MCMXCIV"
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.

Constraints:

1 <= num <= 3999

*/
/**
 * @param {number} num
 * @return {string}
 */
/* 
Approach I: Greedy
Runtime: 183 ms, faster than 45.54% of JavaScript online submissions for Integer to Roman.
Memory Usage: 46.7 MB, less than 92.86% of JavaScript online submissions for Integer to Roman.

*/
var intToRoman = function (num) {
  const values = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];
  const roman = [
    "M",
    "CM",
    "D",
    "CD",
    "C",
    "XC",
    "L",
    "XL",
    "X",
    "IX",
    "V",
    "IV",
    "I",
  ];
  let result = "";
  for (let i = 0; i < values.length; i++) {
    while (values[i] <= num) {
      num = num - values[i];
      result += roman[i];
    }
  }
  return result;
};

/* 
Approach II : HardCoded Digits
Time: O(1) -  The same number of operations is done, regardless of the size of the input. 
Therefore, the time complexity is constant.
Space: O(1) - While we have Arrays, they are the same size, regardless of the size of the input. 
Therefore, they are constant for the purpose of space-complexity analysis.

Note: The downside of this approach is that it is inflexible if Roman Numerals were to be extended
(which is an interesting follow-up question). For example, what if we said the symbol H now represents 5000,
and P now represents 10000, allowing us to represent numbers up to 39999? Approach 1 will be a lot quicker
to modify, as you simply need to add these 2 values to the code without doing any calculations. 
But for Approach 2, you'll need to calculate and hardcode ten new representations. What if we then added 
symbols to be able to go up to 399,999,999? Approach 2 becomes more and more difficult to manage,
the more symbols we add.

Runtime: 251 ms, faster than 13.73% of JavaScript online submissions for Integer to Roman.
Memory Usage: 47.1 MB, less than 77.53% of JavaScript online submissions for Integer to Roman.

*/
var intToRoman = function (num) {
  const thousands = ["", "M", "MM", "MMM"];
  const hundreds = ["", "C", "CC", "CCC", "CD", "D", "DC", "DCC", "DCCC", "CM"];
  const tens = ["", "X", "XX", "XXX", "XL", "L", "LX", "LXX", "LXXX", "XC"];
  const ones = ["", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "VIII"];

  return (
    thousands[Math.floor(num / 1000)] +
    hundreds[Math.floor((num % 1000) / 100)] +
    tens[Math.floor((num % 100) / 10)] +
    ones[num % 10]
  );
};
