/* 
131. Palindrome Partitioning
https://leetcode.com/problems/palindrome-partitioning/
Type: Medium

Given a string s, partition s such that every  substring of the partition is a 
palindrome. Return all possible palindrome partitioning of s.

Example 1:
Input: s = "aab"
Output: [["a","a","b"],["aa","b"]]

Example 2:
Input: s = "a"
Output: [["a"]]
 

Constraints:
 - 1 <= s.length <= 16
 - s contains only lowercase English letters.

*/
/**
 * @param {string} s
 * @return {string[][]}
 */
/* 
Time: O(N * 2^N), N is the length of the string.
O(N) for substring and palindrome check. 2^N possible substring.
                         "aaa"
                  /        |       \
            ["a"]"aa"   ["aa"]"a"   ["aaa"]""
            /        \          \
    ["a","a"]"a" ["a", "aa"]""  ["aa", "a"]""
        /   
   ["a", "a", "a"] ""

for N=3
Total nodes = 2^N = 8   

Space: (N)

Runtime: 25 ms Beats 57.74%
Memory: 79.46 MB Beats 92.58%
*/
var partition = function (s) {
  const result = [];
  const isPalindrome = (s) => {
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
      if (s[left++] != s[right--]) return false;
    }
    return true;
  };
  const backtrack = (s, path, result) => {
    //we reached end of string, add the curr path to result
    if (s == null || s.length == 0) {
      result.push([...path]);
      return;
    }
    //try for all string length to check the palindrome
    for (let i = 0; i < s.length; i++) {
      const str = s.substring(0, i + 1);
      //check if the string is palindrome
      if (!isPalindrome(str)) continue;
      //add this string to partition path
      path.push(str);
      //check rest of the string
      backtrack(s.substring(i + 1), path, result);
      //remove this string to try with other string combination
      path.pop();
    }
  };
  backtrack(s, [], result);
  return result;
};

/*
Approach II: Backtracking with DP

Time: O(N * 2^N)
where N is the length of the string s. In the worst case, there could be 2^N possible
substrings and it will take O(N) to generate each substring using substr as in Approach 1.
However, we are eliminating one additional iteration to check if the substring is a 
palindrome or not.
Space: O(N * N)

Runtime: 25 ms Beats 57.74%
Memory: 79.97 MB Beats 81.26%
 */
var partition = function (s) {
  const result = [];
  const N = s.length;
  const dp = Array.from({ length: N }, () => Array(N).fill(false));
  const backtrack = (s, start, path, result, dp) => {
    //we reached end of string, add the curr path to result
    if (start >= s.length) {
      result.push([...path]);
      return;
    }
    //try for all string length to check the palindrome
    for (let end = start; end < s.length; end++) {
      //a string is plandrome if first (start) and last (end) char is same
      //and substring between start+1 and end-1 is also palindrome
      if (
        s[start] == s[end] &&
        (end - start <= 2 || dp[start + 1][end - 1] == true)
      ) {
        dp[start][end] = true;
        path.push(s.slice(start, end + 1));
        backtrack(s, end + 1, path, result, dp);
        path.pop();
      }
    }
  };
  backtrack(s, 0, [], result, dp);
  return result;
};
