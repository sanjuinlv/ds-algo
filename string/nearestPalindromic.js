/* 
https://leetcode.com/problems/find-the-closest-palindrome/solution/
Category: Hard

Given a string n representing an integer, return the closest integer (not including itself), 
which is a palindrome. If there is a tie, return the smaller one.

The closest is defined as the absolute difference minimized between two integers.

Example 1:

Input: n = "123"
Output: "121"
Example 2:

Input: n = "1"
Output: "0"
Explanation: 0 and 2 are the closest palindromes but we return the smallest which is 0.

Constraints:

 - 1 <= n.length <= 18
 - n consists of only digits.
 - n does not have leading zeros.
 - n is representing an integer in the range [1, 10^18 - 1].

*/
/**
 * @param {string} n
 * @return {string}
 */
/*
Approach I: Brute Force

*/
var nearestPalindromic = function (n) {
  const isPalindrome = (num) => {
    let rev = 0;
    let x = num;
    while (x > 0) {
      rev = rev * 10 + (x % 10);
      x = parseInt(x / 10);
    }
    return num === rev;
  };
  const num = parseInt(n);
  for (let i = 1; ; i++) {
    if (isPalindrome(num - i)) return "" + (num - i);
    if (isPalindrome(num + i)) return "" + (num + i);
  }
};

/* 
Approach 2: 
*/
var nearestPalindromic = function (n) {
  const reverse = (s) => {
    let rev = "";
    for (let i = s.length - 1; i >= 0; i--) rev += s[i];
    return rev;
  };
  const mirroring = (s) => {
    const half = s.substring(0, parseInt(s.length / 2));
    return (
      half + (s.length % 2 == 1 ? s.charAt(s.length / 2) : "") + reverse(half)
    );
  };
  if (n === "1") return "0";
  //Case 1:
  //create the mirror of string
  const mirror = mirroring(n);
  console.log(`mirror: ${mirror}`);
  let diff1 = Number.MAX_SAFE_INTEGER;
  diff1 = parseInt(n) - parseInt(mirror);
  if (diff1 === 0) diff1 = Number.MAX_SAFE_INTEGER;
  //Case 2:
  //Case 3:
};
