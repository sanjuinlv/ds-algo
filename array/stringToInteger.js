/* 
https://leetcode.com/problems/string-to-integer-atoi/
Category: Medium

Implement the myAtoi(string s) function, which converts a string to a 32-bit signed integer.

The algorithm for myAtoi(string s) is as follows:

1. Whitespace: Ignore any leading whitespace (" ").
2. Signedness: Determine the sign by checking if the next character is '-' or '+', assuming positivity is neither present.
3. Conversion: Read the integer by skipping leading zeros until a non-digit character is encountered or the end of the string is reached. If no digits were read, then the result is 0.
4. Rounding: If the integer is out of the 32-bit signed integer range [-2^31, 2^31 - 1], then round the integer to remain in the range. Specifically, integers less than -2^31 should be rounded to -2^31, and integers greater than 2^31 - 1 should be rounded to 2^31 - 1.


Example 1:
Input: str = "42"
Output: 42

Example 2:
Input: str = "   -42"
Output: -42
Explanation: The first non-whitespace character is '-', which is the minus sign. 
Then take as many numerical digits as possible, which gets 42.

Example 3:
Input: str = "4193 with words"
Output: 4193
Explanation: Conversion stops at digit '3' as the next character is not a numerical digit.

Example 4:
Input: str = "words and 987"
Output: 0
Explanation: The first non-whitespace character is 'w', which is not a numerical digit or a +/- sign. 
Therefore no valid conversion could be performed.

Input: str = "-91283472332"
Output: -2147483648
Explanation: The number "-91283472332" is out of the range of a 32-bit signed integer. 
Therefore INT_MIN (−2^31) is returned.
*/

/**
 * @param {string} s
 * @return {number}
 */
/*
Time: O(N)
Space: O(1)

Runtime: 96 ms, faster than 80.65% of JavaScript online submissions for String to Integer (atoi).
Memory Usage: 40.5 MB, less than 5.04% of JavaScript online submissions for String to Integer (atoi).
*/
var myAtoi = function (s) {
  //JS MAX_INT and MIN_INT are different so create const equivalent of 2^31-1 & -2^31
  const MAX_INT = Math.pow(2, 31) - 1;
  const MIN_INT = Math.pow(-2, 31);
  const N = s.length;
  let i = 0;
  let sign = 1;
  let result = 0;
  //1. Handle empty string
  if (!s.length) return 0;
  //2. Skip the leading zeros
  while (i < N && s.charAt(i) == " ") {
    i++;
  }
  //3. Handle sign
  if ((i < N && s.charAt(i) == "-") || s.charAt(i) == "+") {
    sign = s.charAt(i) == "+" ? 1 : -1;
    i++;
  }
  //convert number and avoid overflow
  //process only digits between 0 and 9
  //case I: result > Math.floor(MAX_INT / 10), e.g, result=214748363: handle the
  //case II: result == Math.floor(MAX_INT / 10),
  //case III: result is less than MAXINT%10, e.g, result=214748363: No problem
  while (i < N && s.charAt(i) >= "0" && s.charAt(i) <= "9") {
    if (
      result > Math.floor(MAX_INT / 10) ||
      (result === Math.floor(MAX_INT / 10) && s.charAt(i) - "0" > MAX_INT % 10)
    ) {
      return sign === 1 ? MAX_INT : MIN_INT;
    }
    result = result * 10 + (s.charAt(i) - "0");
    i++;
  }
  return result * sign;
};

/* 
Approach II: Deterministic Finite Automaton (DFA)
Time: O(N)
Space: O(1)
Runtime: 106 ms, faster than 47.57% of JavaScript online submissions for String to Integer (atoi).
Memory Usage: 44.4 MB, less than 66.96% of JavaScript online submissions for String to Integer (atoi).
*/
class StateMachine {
  State;
  constructor() {
    this.State = { q0: 1, q1: 1, q2: 2, q3: 3 };
    this.currentState = this.State.q0;
    this.result = 0;
    this.sign = 1;
    this.MAX_INT = Math.pow(2, 31) - 1;
    this.MIN_INT = Math.pow(-2, 31);
  }

  toStateQ1(ch) {
    this.currentState = this.State.q1;
    this.sign = ch === "+" ? 1 : -1;
  }

  toStateQ2(digit) {
    this.currentState = this.State.q2;
    this.appendDigit(digit);
  }

  toStateQd() {
    this.currentState = this.State.qd;
  }

  // Append digit to result, if out of range return clamped value.
  appendDigit(digit) {
    if (
      this.result > Math.floor(this.MAX_INT / 10) ||
      (this.result === Math.floor(this.MAX_INT / 10) &&
        digit > this.MAX_INT % 10)
    ) {
      this.result = this.sign === 1 ? this.MAX_INT : this.MIN_INT;
      this.sign = 1;
      // When the 32-bit int range is exceeded, a dead state is reached.
      this.toStateQd();
    } else {
      this.result = this.result * 10 + digit;
    }
  }

  transition(char) {
    console.log(`char: ${char}, state: ${this.currentState}`);
    if (this.currentState === this.State.q0) {
      if (char == " ") {
        return;
      } else if (char === "+" || char === "-") {
        // Current character is a sign.
        this.toStateQ1(char);
      } else if (this.isDigit(char)) {
        // Current character is a digit.
        this.toStateQ2(char - "0");
      } else {
        // Current character is not a space/sign/digit.
        // Reached a dead state.
        this.toStateQd();
      }
    } else if (
      this.currentState === this.State.q1 ||
      this.currentState === this.State.q2
    ) {
      if (this.isDigit(char)) {
        // Current character is a digit.
        this.toStateQ2(char - "0");
      } else {
        // Current character is not a digit.
        // Reached a dead state.
        this.toStateQd();
      }
    }
  }

  isDigit(char) {
    return char >= "0" && char <= "9";
  }

  getState() {
    return this.currentState;
  }

  getInteger() {
    return this.result * this.sign;
  }
}

var myAtoi = function (s) {
  let Q = new StateMachine();
  console.log(Q.State);
  for (let i = 0; i < s.length && Q.getState() != Q.State.qd; i++) {
    Q.transition(s[i]);
  }

  return Q.getInteger();
};
