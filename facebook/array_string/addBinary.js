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
// a = "11", b = "1"
var addBinary = function(a, b) {
    const m = a.length, n = b.length;
    const p = new Array(m + n).fill('0');
    let i = m - 1, j = n - 1;
    for (let k = p.length - 1; k >= 0; k--) {
        if (!(i >= 0 || j >= 0)) break;
        let sum = (p[k] - '0') + (a.charAt(i--) - '0') + (b.charAt(j--) - '0');
        console.log(`sum: ${sum}`);
        p[k] = "" + sum % 2;
        p[k - 1] = "" + ((p[k - 1] - '0') + parseInt(sum / 2));
        console.log(`p: ${p}`);
    }
    console.log(`final array`);
    console.log(p);
    let result = "";
    p.forEach(char => {
        if (!(result.length == 0 && char == '0')) result += char;
    })
    return result.length ? result : "0";
};

// for submission
// Your runtime beats 20.70 % of javascript submissions.
var addBinary = function(a, b) {
    const m = a.length, n = b.length;
    const p = new Array(m + n).fill('0');
    let i = m - 1, j = n - 1;
    for (let k = p.length - 1; k >= 0; k--) {
        if (!(i >= 0 || j >= 0)) break;
        let sum = (p[k] - '0') + (a.charAt(i--) - '0') + (b.charAt(j--) - '0');
        p[k] = "" + sum % 2;
        p[k - 1] = "" + ((p[k - 1] - '0') + parseInt(sum / 2));
    }
    let result = "";
    p.forEach(char => {
        if (!(result.length == 0 && char == '0')) result += char;
    })
    return result.length ? result : "0";
};