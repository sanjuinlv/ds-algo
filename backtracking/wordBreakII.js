/* 
140. Word Break II
https://leetcode.com/problems/word-break-ii/
Type: Hard

Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word. Return all such possible sentences in any order.

Note that the same word in the dictionary may be reused multiple times in the segmentation.

Example 1:
Input: s = "catsanddog", wordDict = ["cat","cats","and","sand","dog"]
Output: ["cats and dog","cat sand dog"]

Example 2:
Input: s = "pineapplepenapple", wordDict = ["apple","pen","applepen","pine","pineapple"]
Output: ["pine apple pen apple","pineapple pen apple","pine applepen apple"]
Explanation: Note that you are allowed to reuse a dictionary word.

Example 3:
Input: s = "catsandog", wordDict = ["cats","dog","sand","and","cat"]
Output: []
 
Constraints:
 - 1 <= s.length <= 20
 - 1 <= wordDict.length <= 1000
 - 1 <= wordDict[i].length <= 10
 - s and wordDict[i] consist of only lowercase English letters.
 - All the strings of wordDict are unique.
 - Input is generated in a way that the length of the answer doesn't exceed 105.
*/
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
/* 
Backtracking
Time: O(N * 2^N)
The algorithm explores all possible ways to break the string into words. In the worst case, where each character can be treated as a word, the recursion tree has 2^n leaf nodes, resulting in an exponential time complexity. For each leaf node, O(n) work is performed, so the overall complexity is O(n * 2^n).

Space: O(2^N)
The recursion stack can grow up to a depth of n, where each recursive call consumes additional space for storing the current state.

Since each position in the string can be a split point or not, and for n positions, there are 2^n possible combinations of splits. Thus, in the worst case, each combination generates a different sentence that needs to be stored, leading to exponential space complexity.

Runtime: 0 ms Beats 100.00%
Memory: 49.29 MB Beats 13.59%
*/
var wordBreak = function (s, wordDict) {
  const resutl = [];
  const N = s.length;
  const dict = new Set(wordDict);
  const backtrack = (start, path) => {
    //base condition: we reached end of the string
    if (start == N) {
      resutl.push(path.join(" "));
      return;
    }
    for (let end = start + 1; end <= N; end++) {
      const curr = s.substring(start, end);
      if (dict.has(curr)) {
        path.push(curr);
        backtrack(end, path);
        path.pop();
      }
    }
  };
  backtrack(0, []);
  return resutl;
};
