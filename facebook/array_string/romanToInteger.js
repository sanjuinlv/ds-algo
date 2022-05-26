/*
Roman numerals are represented by seven different symbols: I, V, X, L, C, D and M.

Symbol       Value
I             1
V             5
X             10
L             50
C             100
D             500
M             1000

For example, 2 is written as II in Roman numeral, just two one's added together. 
12 is written as XII, which is simply X + II. The number 27 is written as XXVII, which is XX + V + II.

Roman numerals are usually written largest to smallest from left to right. 
However, the numeral for four is not IIII. Instead, the number four is written as IV.
Because the one is before the five we subtract it making four. 
The same principle applies to the number nine, which is written as IX. There are six instances 
where subtraction is used:

I can be placed before V (5) and X (10) to make 4 and 9. 
X can be placed before L (50) and C (100) to make 40 and 90. 
C can be placed before D (500) and M (1000) to make 400 and 900.
Given a roman numeral, convert it to an integer.

Input: s = "III"
Output: 3

Input: s = "IV"
Output: 4

Input: s = "IX"
Output: 9

Input: s = "LVIII"
Output: 58
Explanation: L = 50, V= 5, III = 3.

Input: s = "MCMXCIV"
Output: 1994
Explanation: M = 1000, CM = 900, XC = 90 and IV = 4.

1 <= s.length <= 15
s contains only the characters ('I', 'V', 'X', 'L', 'C', 'D', 'M').
It is guaranteed that s is a valid roman numeral in the range [1, 3999].

*/
/**
 * @param {string} s
 * @return {number}
 */
s = "LVIII";
s = "MCMXCIV";
//to test on leet code
s = "LVIIIII";
var romanToInt = function (s) {
  const N = s.length;
  //define the symobls mapping
  const symbolMap = new Map();
  symbolMap.set("I", 1);
  symbolMap.set("V", 5);
  symbolMap.set("X", 10);
  symbolMap.set("L", 50);
  symbolMap.set("C", 100);
  symbolMap.set("D", 500);
  symbolMap.set("M", 1000);
  let sum = 0;
  let i = 0;
  while (i < N) {
    console.log(
      `char at i=${i}: ${s.charAt(i)} and at i+1=${i + 1}: ${s.charAt(i + 1)} `
    );
    if (
      i == N - 1 ||
      symbolMap.get(s.charAt(i)) >= symbolMap.get(s.charAt(i + 1))
    ) {
      console.log(
        `value for char: ${s.charAt(i)}: ${symbolMap.get(s.charAt(i))}`
      );
      sum += symbolMap.get(s.charAt(i));
      i++;
    } else {
      sum += symbolMap.get(s.charAt(i + 1)) - symbolMap.get(s.charAt(i));
      i = i + 2;
    }
    console.log(`sum: ${sum}`);
  }
  console.log(`final sum: ${sum}`);
  return sum;
};

// for submission
// Your runtime beats 47.64 % of javascript submissions.
var romanToInt = function (s) {
  const N = s.length;
  const symbolMap = new Map();
  symbolMap.set("I", 1);
  symbolMap.set("V", 5);
  symbolMap.set("X", 10);
  symbolMap.set("L", 50);
  symbolMap.set("C", 100);
  symbolMap.set("D", 500);
  symbolMap.set("M", 1000);
  let sum = 0;
  let i = 0;
  while (i < N) {
    if (
      i == N - 1 ||
      symbolMap.get(s.charAt(i)) >= symbolMap.get(s.charAt(i + 1))
    ) {
      sum += symbolMap.get(s.charAt(i));
      i++;
    } else {
      sum += symbolMap.get(s.charAt(i + 1)) - symbolMap.get(s.charAt(i));
      i = i + 2;
    }
  }
  return sum;
};

//re-try: 22-05-2022

/*
Runtime: 179 ms, faster than 54.17% of JavaScript online submissions for Roman to Integer.
Memory Usage: 46.8 MB, less than 82.20% of JavaScript online submissions for Roman to Integer.
*/
var romanToInt = function (s) {
  const romanMap = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 };
  const N = s.length;
  let intVal = 0;
  let i = 0;
  while (i < N) {
    const val = romanMap[s[i]];
    if (i === N - 1 || val >= romanMap[s[i + 1]]) {
      intVal += val;
      i++;
    } else {
      intVal += romanMap[s[i + 1]] - val;
      i += 2;
    }
  }
  return intVal;
};
