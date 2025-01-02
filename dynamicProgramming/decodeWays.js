/* 
91. Decode Ways
https://leetcode.com/problems/decode-ways/description/
Type: Medium

You have intercepted a secret message encoded as a string of numbers. The message is decoded via the following mapping:

"1" -> 'A'
"2" -> 'B'
...
"25" -> 'Y'
"26" -> 'Z'

However, while decoding the message, you realize that there are many different ways you can decode the message because some codes are contained in other codes ("2" and "5" vs "25").

For example, "11106" can be decoded into:
"AAJF" with the grouping (1, 1, 10, 6)
"KJF" with the grouping (11, 10, 6)
The grouping (1, 11, 06) is invalid because "06" is not a valid code (only "6" is valid).
Note: there may be strings that are impossible to decode.

Given a string s containing only digits, return the number of ways to decode it. If the entire string cannot be decoded in any valid way, return 0.

The test cases are generated so that the answer fits in a 32-bit integer.

Example 1:
  Input: s = "12"
  Output: 2
  Explanation: "12" could be decoded as "AB" (1 2) or "L" (12).

Example 2:
  Input: s = "226"
  Output: 3
  Explanation: "226" could be decoded as "BZ" (2 26), "VF" (22 6), or "BBF" (2 2 6).

Example 3:
  Input: s = "06"
  Output: 0
  Explanation: "06" cannot be mapped to "F" because of the leading zero ("6" is different from "06"). In this case, the string is not a valid encoding, so return 0.


Constraints:
 - 1 <= s.length <= 100
 - s contains only digits and may contain leading zero(s).
*/
/**
 * @param {string} s
 * @return {number}
 */

/*
Approach I : Recursion + Memo
Time: O(N), where N is length of sting
Space: O(N)

Runtime: 0 ms Beats 100.00%
Memory: 48.74 MB Beats 97.76%
 */
var numDecodings = function (s) {
  const N = s.length;
  const memo = new Array(N);
  const decode = (i) => {
    //reached end of input
    if (i == N) return 1;
    if (memo[i] != null) return memo[i];
    let count = 0;
    const singleDigit = parseInt(s.charAt(i));
    if (singleDigit != 0) {
      count += decode(i + 1);
    }
    if (i + 1 < N) {
      const doubleDigit = parseInt(s.substring(i, i + 2));
      if (doubleDigit > 9 && doubleDigit < 27) {
        count += decode(i + 2);
      }
    }
    return (memo[i] = count);
  };
  return decode(0);
};

/* 
Approach II: Tabulation
Time: O(N)
Space: O(N)

Runtime: 1 ms Beats 63.06%
Memory: 49.10 MB Beats 92.29%
*/
var numDecodings = function (s) {
  const N = s.length;
  const dp = new Array(N + 1).fill(0);
  dp[N] = 1;
  for (let i = N - 1; i >= 0; i--) {
    const singleDigit = parseInt(s.charAt(i));
    if (singleDigit != 0) dp[i] = dp[i + 1];
    if (i + 1 < N) {
      const doubleDigit = parseInt(s.substring(i, i + 2));
      if (doubleDigit > 9 && doubleDigit < 27) {
        dp[i] += dp[i + 2];
      }
    }
  }
  return dp[0];
};

/* 
Approach III: Bottom Up DP
Time Complexity: O(N), where N is length of the string. We iterate the length of dp array 
which is N+1.

Space: O(N) - The length of the DP array.

Runtime: 72 ms, faster than 99.06% of JavaScript online submissions for Decode Ways.
Memory Usage: 39.2 MB, less than 69.24% of JavaScript online submissions for Decode Ways.
 */
var numDecodings = function (s) {
  const N = s.length;
  const dp = new Array(N + 1).fill(0);
  dp[0] = 1;
  dp[1] = s[0] == "0" ? 0 : 1;
  for (let i = 2; i < N + 1; i++) {
    //check if single digit decode is possible
    if (s[i - 1] != "0") {
      dp[i] = dp[i - 1];
    }
    //check if two digit decode is possible
    const twoDigits = parseInt(s[i - 2] + s[i - 1]);
    if (twoDigits >= 10 && twoDigits <= 26) {
      dp[i] += dp[i - 2];
    }
  }
  return dp[N];
};
