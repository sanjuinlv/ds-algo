/*
647. Palindromic Substrings
https://leetcode.com/problems/palindromic-substrings/
Type: Medium

Given a string s, return the number of palindromic substrings in it.
A string is a palindrome when it reads the same backward as forward.
A substring is a contiguous sequence of characters within the string.

Example 1:
Input: s = "abc"
Output: 3
Explanation: Three palindromic strings: "a", "b", "c".

Example 2:
Input: s = "aaa"
Output: 6
Explanation: Six palindromic strings: "a", "a", "a", "aa", "aa", "aaa".

Constraint:
    - 1 <= s.length <= 1000
    - s consists of lowercase English letters.
 */
/**
 * @param {string} s
 * @return {number}
 */
/* 
Approach I : Brute Force
Time: O(N^3)
Space: O(1)
*/
var countSubstrings = function (s) {
  const isPalindrom = (str) => {
    let N = str.length;
    let i = 0;
    let j = N - 1;
    while (i < j) {
      if (str[i++] != str[j--]) return false;
    }
    return true;
  };
  let palindromCount = 0;
  const N = s.length;
  for (let i = 0; i < N; i++) {
    for (let j = i + 1; j <= N; j++) {
      const subString = s.slice(i, j);
      if (isPalindrom(subString)) palindromCount++;
    }
  }
  return palindromCount;
};

/* 
Approach II: Dynamic Programming
Lets define dp(i,j) which tells whether substring composed of the ith to jth characters of the input string is palindrome or not.
base Case: 
 - single letters are palindrome, ie., dp(i,i) = true
 - double letters composed of same characters are palindrome, i.e,
 dp(i, i+1) = true, if s(i) = s(i+1)
              false otherwise
Optimal Substructure: A string is palindrome if 
  - Its first and last character are same, and
  - The rest of the string (excluding boundary character) is also palindrome
So now we can define the recurrence relations:
  dp(i, j) = true, if dp(i+1, j-1) & s(i) == s(j)
             false, otherwise 

Time: O(N^2)
Space: O(N^2)

Runtime: 70 ms Beats 58.57%
Memory Usage: 77.20 MB Beats 12.42%
*/
var countSubstrings = function (s) {
  const N = s.length;
  const dp = [...Array(N)].map((X) => new Array(N).fill(0));
  let palindromeCount = 0;
  //each character of string will be palindrome itself
  for (let i = 0; i < N; i++) {
    dp[i][i] = 1;
    palindromeCount++;
  }
  //double letters compose of same characters are plaindrome
  for (let i = 0; i < N - 1; i++) {
    if (s[i] == s[i + 1]) {
      dp[i][i + 1] = 1;
      palindromeCount++;
    }
  }
  //check for string with characters 3 or more
  for (let k = 3; k <= N; k++) {
    for (let i = 0; i <= N - k; i++) {
      let j = i + k - 1;
      if (s[i] == s[j] && dp[i + 1][j - 1]) {
        dp[i][j] = 1;
        palindromeCount++;
      }
    }
  }
  return palindromeCount;
};

/*
Approach II: Expand From center
Multiple palindromes have the same centers. If we choose a center, we can continue to expand around it as long as we can make larger and larger palindromes.
Let's take the string "lever" as an example: if you choose the character 'v' as the center, one can see that the palindromes "v" and "eve" are possible. However, the final expansion "lever" is not a palindrome (the first and last characters don't match).

Time: O(N^2) - 
Time Complexity: O(N2) for input string of length N. The total time taken in this approach is dictated by two variables:

  - The number of possible palindromic centers we process.
  - How much time we spend processing each center.

The number of possible palindromic centers is 2N−1: there are N single character centers and N−1 consecutive character pairs as centers.

Each center can potentially expand to the length of the string, so time spent on each center is linear on average. Thus total time spent is N⋅(2N−1)≃N^2.

Space: O(1) - No extra space used

Runetime: 12 ms Beats 100.00%
Memory: 50.56 MB Beats 52.77%
 */
var countSubstrings = function (s) {
  const countPalindrom = (s, lo, hi) => {
    let ans = 0;
    while (lo >= 0 && hi < s.length) {
      if (s[lo] != s[hi]) break;
      lo--; //move towards left
      hi++; //move towards right
      ans++; //so far palindrom so increase count
    }
    return ans;
  };
  let count = 0;
  const N = s.length;
  for (let i = 0; i < N; i++) {
    //odd length palindromes, single character center
    count += countPalindrom(s, i, i);
    //even length palindromes, consecutive characters center
    count += countPalindrom(s, i, i + 1);
  }
  return count;
};
