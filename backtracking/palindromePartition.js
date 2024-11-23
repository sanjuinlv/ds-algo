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

Runtime: 21 ms Beats 87.70%
Memory: 74.09 MB Beats 61.04%
*/
var partition = function (s) {
  const isPalindrome = (s) => {
    let left = 0;
    let right = s.length - 1;
    while (left < right) {
      if (s[left++] != s[right--]) return false;
    }
    return true;
  };
  const backtrack = (s, path, result) => {
    // console.log(`s: ${s}, path`, path);
    //base case
    if (s == null || s.length == 0) {
      result.push([...path]);
      return;
    }
    for (let i = 0; i < s.length; i++) {
      const curr = s.substring(0, i + 1);
      //do backtracking only when current string is palindrome
      if (!isPalindrome(curr)) continue;
      path.push(curr); //choose
      backtrack(s.substring(i + 1), path, result); //explore
      path.pop(); //unchoose
    }
  };
  const result = [];
  backtrack(s, [], result);
  return result;
};
