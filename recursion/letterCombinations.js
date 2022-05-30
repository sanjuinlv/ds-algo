/* 
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
Approach I: Iterative (using queue)
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

/*
Approach II: DFS + backtracking 
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
  const dfs = (nextDigits, path) => {
    //we are done with all digits, add the current combination to the result and return
    if (nextDigits.length == 0) {
      result.push(path);
      return;
    }
    //if there are still digits to to check
    //iterate over all letters which map to next available digits
    const letters = phone[nextDigits[0]];
    for (let i = 0; i < letters.length; i++) {
      //combine this letter with current combination and check for rest of letters
      dfs(nextDigits.slice(1, nextDigits.length), `${path}${letters[i]}`);
    }
  };
  const result = [];
  if (digits.length) {
    dfs(digits, "");
  }
  return result;
};

//30-May-2022
/* 
Approach II: DFS + Backtracking
Runtime: 98 ms, faster than 16.55% of JavaScript online submissions for Letter Combinations of a Phone Number.
Memory Usage: 42.1 MB, less than 48.16% of JavaScript online submissions for Letter Combinations of a Phone Number.
*/
var letterCombinations = function (digits) {
  if (digits.length == 0) return [];
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
  const backtrack = (digits, index, path) => {
    //we reached end of the
    if (index == digits.length) {
      if (path.length) result.push(path);
      return;
    }
    const combination = phone[digits[index]];
    //try with all combination
    for (let i = 0; i < combination.length; i++) {
      backtrack(digits, index + 1, `${path}${combination[i]}`);
    }
  };
  const result = [];
  backtrack(digits, 0, "");
  return result;
};
