/*
1071. Greatest Common Divisor of Strings
https://leetcode.com/problems/greatest-common-divisor-of-strings
Type: Easy

For two strings s and t, we say "t divides s" if and only if s = t + t + t + ... + t + t (i.e., t is concatenated with itself one or more times).

Given two strings str1 and str2, return the largest string x such that x divides both str1 and str2.

Example 1:
  Input: str1 = "ABCABC", str2 = "ABC"
  Output: "ABC"

Example 2:
  Input: str1 = "ABABAB", str2 = "ABAB"
  Output: "AB"

Example 3:
  Input: str1 = "LEET", str2 = "CODE"
  Output: ""
 
Constraints:
 - 1 <= str1.length, str2.length <= 1000
 - str1 and str2 consist of English uppercase letters.
*/
/**
 * @param {string} str1
 * @param {string} str2
 * @return {string}
 */
/* 
Approach: Using Euclidean Algorithm:
1. Given two integers a and b (a>b), divide a by b and compute the remainder r
 r = a mod b
2. Replace 'a' witb 'b' and 'b' with 'r'
3. Repeat the process until b becomes 0. The GCD is the last non-zero remainder.

Time: O(m+n)
Space: O(m+n)

Runtime: 0 ms Beats 100.00%
Memory: 49.36 MB Beats 60.94%
*/
var gcdOfStrings = function (str1, str2) {
  const gcd = (p, q) => {
    if (q == 0) return p;
    return gcd(q, p % q);
  };
  // Check if they have non-zero GCD string, ie., s1+s2=s2+s1
  if (str1 + str2 != str2 + str1) return "";
  const gcdLength = gcd(str1.length, str2.length);
  return str1.substring(0, gcdLength + 1);
};
