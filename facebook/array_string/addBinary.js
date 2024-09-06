/* 
Given two binary strings, return their sum (also a binary string).
The input strings are both non-empty and contains only characters 1 or 0.

Input: a = "11", b = "1"
Output: "100"

Input: a = "1010", b = "1011"
Output: "10101"

Constraint:
Each string consists only of '0' or '1' characters.
1 <= a.length, b.length <= 10^4
Each string is either "0" or doesn't contain any leading zero.

*/
/**
 * @param {string} a
 * @param {string} b
 * @return {string}
 */
/* 
Approach I
Time: O(N)
Space: O(N)

Runtime: 64 ms Beats 24.38%
Memory: 51.36 MB Beats 33.57%
*/
var addBinary = function (a, b) {
  const M = a.length;
  const N = b.length;
  const maxLength = Math.max(M, N);
  const result = new Array(maxLength);
  let carryOver = 0;
  for (let i = 0; i < maxLength; i++) {
    const digit1 = i < M ? a[M - i - 1] - "0" : 0;
    const digit2 = i < N ? b[N - i - 1] - "0" : 0;
    const sum = digit1 + digit2 + carryOver;
    result.push(sum % 2);
    carryOver = Math.floor(sum / 2);
  }
  if (carryOver > 0) result.push(carryOver);
  return result.reverse().join("");
};

/* 
Approach II
Time: O(N), where N is max character of two strings
Space: O(N)

Runtime:57 ms Beats 57.86%
Memory: 50.94 MB Beats 53.98%
*/
var addBinary = function (a, b) {
    let i = a.length - 1;
    let j = b.length - 1;
    const result = [];
    let carry = 0;
    while (i >= 0 || j >= 0) {
      let sum = carry;
      sum += i >= 0 ? a.charAt(i--) - "0" : 0;
      sum += j >= 0 ? b.charAt(j--) - "0" : 0;
      result.push(sum % 2);
      carry = Math.floor(sum / 2);
    }
    if (carry > 0) result.push(carry);
    return result.reverse().join("");
  };


/*
Approach III: Using array element for carry over 
// Your runtime beats 20.70 % of javascript submissions.
*/
var addBinary = function (a, b) {
  const m = a.length;
  const n = b.length;
  const p = new Array(m + n).fill("0");
  let i = m - 1;
  let j = n - 1;
  for (let k = p.length - 1; k >= 0; k--) {
    if (!(i >= 0 || j >= 0)) break;
    let sum = p[k] - "0" + (a.charAt(i--) - "0") + (b.charAt(j--) - "0");
    p[k] = "" + (sum % 2);
    p[k - 1] = "" + (p[k - 1] - "0" + parseInt(sum / 2));
  }
  let result = "";
  p.forEach((char) => {
    if (!(result.length == 0 && char == "0")) result += char;
  });
  return result.length ? result : "0";
};
