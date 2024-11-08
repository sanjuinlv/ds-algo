/* 
17. Letter Combinations of a Phone Number
https://leetcode.com/problems/letter-combinations-of-a-phone-number/
Type: Medium

Given a string containing digits from 2-9 inclusive, return all possible letter 
combinations that the number could represent. Return the answer in any order.
A mapping of digit to letters (just like on the telephone buttons) is given below.
Note that 1 does not map to any letters.
2 => "abc"
3 => "def"
4 => "ghi"
5 => "jkl"
6 => "mno"
7 => "pqrs"
8 => "tuv"
9 => "wxyz"

Example 1: 
Input: digits = "23"
Output: ["ad","ae","af","bd","be","bf","cd","ce","cf"]

Example 2: 
Input: digits = ""
Output: []

Example 3: 
Input: digits = "2"
Output: ["a","b","c"]

Constraint:
    -   0 <= digits.length <= 4
    -   digits[i] is a digit in the range ['2', '9'].
*/
/**
 * @param {string} digits
 * @return {string[]}
 */

/* 
Approach I: Backtracking
Time: O(4^N * N) - where N is the length of digits. Note that 4 in this expression is referring to the maximum value length in the hash map, and not to the length of the input.
Space: O(N) - where N is the length of digits
Not counting space used for the output, the extra space we use relative to input size is the space occupied by the recursion call stack. It will only go as deep as the number of digits in the input since whenever we reach that depth, we backtrack.

Runtime: 0 ms Beats 100.00% 
Memory: 49.08 MB Beats 38.63%
*/
var letterCombinations = function (digits) {
  const N = digits.length;
  if (N == 0) return [];
  const phone = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };
  const backtrack = (path, i) => {
    //base case
    if (i == N) {
      result.push(path);
      return;
    }
    const digit = digits[i];
    const combination = phone[digit];
    for (let c of combination) {
      backtrack(path + c, i + 1);
    }
  };
  const result = [];
  backtrack("", 0);
  return result;
};


/*
Approach II: Iterative (using queue)
Runtime: 76 ms, faster than 71.58% of JavaScript online submissions for Letter Combinations of a Phone Number.
Memory Usage: 38.5 MB, less than 71.53% of JavaScript online submissions for Letter Combinations of a Phone Number.
 */
var letterCombinations = function (digits) {
  const phone = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };
  //queue
  const result = [];
  if (digits.length == 0) return result;
  //base case
  result.push("");
  for (let i = 0; i < digits.length; i++) {
    const letters = phone[digits[i]];
    //until queue front item lenth and this index is same create new combinations
    while (result[0].length == i) {
      //remove from queue
      const combination = result.shift();
      for (let char of letters) {
        //push new combination from this letters and currrent combination
        result.push(combination + char);
      }
    }
  }
  return result;
};