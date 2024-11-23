/*
Given a non-empty string s and a dictionary wordDict containing a list of non-empty
words, determine if s can be segmented into a space-separated sequence of one or more dictionary words.

Note:
 - The same word in the dictionary may be reused multiple times in the segmentation.
 - You may assume the dictionary does not contain duplicate words.

Example 1:
Input: s = "leetcode", wordDict = ["leet", "code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".

Example 2:
Input: s = "applepenapple", wordDict = ["apple", "pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
             Note that you are allowed to reuse a dictionary word.

Example 3:
Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
Output: false             
*/
/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */

/*
Approach I: Brute force 
Fails for 
s = "catsanddog", wordDict = ["cats", "dog", "sand", "and", "cat"]
 */
/* 
Approach 1: Brute Force (Recursion & backtracking)
Time Complexity: O(2^N): Given a string of length n, there are n + 1 ways to split it
 into two parts. At each step, we have a choice: to split or not to split. In the worse 
 case, when all choices are to be checked, that results in O(2^n).
Space Complexity: O(N). The depth of the recursion tree can go upto n.

Time Limit Exceeded for input:
"aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaab"
["a","aa","aaa","aaaa","aaaaa","aaaaaa","aaaaaaa","aaaaaaaa","aaaaaaaaa","aaaaaaaaaa"]

*/
var wordBreak = function (s, wordDict) {
  const wordDictSet = new Set(wordDict);
  const N = s.length;
  function backtrack(start) {
    //we reached at the end of string
    if (start == N) return true;
    //check for other combination
    for (let end = start + 1; end <= N; end++) {
      if (wordDictSet.has(s.substring(start, end)) && backtrack(end)) {
        return true;
      }
    }
    return false;
  }
  return backtrack(0);
};

/* 
Approach 2: Recursion with memoization
Time Complexity: O(N^3): N(for recursion) X N(for for loop) X N (for substring)
Space Complexity: O(N). The depth of the recursion tree can go upto n.

Runtime: 7 ms Beats 54.37%
Memory Usage: 51.41 MB Beats 47.90%
*/
var wordBreak = function (s, wordDict) {
  const dict = new Set(wordDict);
  const N = s.length;
  const memo = new Array(N);
  const backtrack = (start) => {
    //we reached at the end of string
    if (start == N) return true;
    //check if we have already solved this problem
    if (memo[start] != null) return memo[start];
    //check for other combination
    for (let end = start + 1; end <= N; end++) {
      const curr = s.substring(start, end);
      if (dict.has(curr) && backtrack(end)) {
        return (memo[start] = true);
      }
    }
    return (memo[start] = false);
  };
  return backtrack(0);
};

/* 
Approach 3: Breadth Search
given n length of s, m length of wordDict and k as average length of dict word.
Time Complexity: O(N^3 + m * k): 
There are O(n) nodes. Because of seen, we never visit a node more than once. At each node, we iterate over the nodes in front of the current node, of which there are O(n). For each node end, we create a substring, which also costs O(n).
Therefore, handling a node costs O(n^2), so the BFS could cost up to O(n^3). Finally, we also spent O(m*k) to create the set words.

Space Complexity: O(N + m * k). 
We use O(n) space for queue and seen. We use O(m*k) space for the set words

Runtime: 84 ms, faster than 78.49% of JavaScript online submissions for Word Break.
Memory Usage: 40.1 MB, less than 76.31% of JavaScript online submissions for Word Break.

*/
var wordBreak = function (s, wordDict) {
  const wordDictSet = new Set(wordDict);
  const N = s.length;
  const visited = new Array(N);
  const queue = [];
  queue.push(0);
  while (queue.length) {
    const start = queue.shift();
    //we reach to the end of the string
    // if (start == N) return true;
    if (visited[start]) continue;
    for (let end = start + 1; end <= N; end++) {
      if (wordDictSet.has(s.substring(start, end))) {
        queue.push(end);
        if (end == N) {
          return true;
        }
      }
    }
    visited[start] = true;
  }
  return false;
};

/* 
BFS II
Runtime: 11 ms Beats 26.02% 
Memory: 50.60 MB Beats 90.36%
*/
var wordBreak = function (s, wordDict) {
  const dict = new Set(wordDict);
  const N = s.length;
  const seen = new Set();
  const queue = [0];
  while (queue.length) {
    const start = queue.shift();
    //we reached end of the string
    if (start == N) return true;
    for (let end = start + 1; end <= N; end++) {
      //if we have already visited this then word break exist, try with next index
      if (seen.has(end)) continue;
      if (dict.has(s.substring(start, end))) {
        queue.push(end);
        seen.add(end);
      }
    }
  }
  return false;
};

/* 
Approach 4: Using Dynamic Programming (Bottom Up)
We make use of dp array of size n+1, where n is the length of the given string. 
We also use two index pointers i and j, where i refers to the length of the substring (s') 
considered currently starting from the beginning, and j refers to the index partitioning 
the current substring (s') into smaller substrings s'(0,j) and s'(j+1, i). 
To fill in the dp array, we initialize the element dp[0] as true, since the null string
is always present in the dictionary, and the rest of the elements of dp as false. 
We consider substrings of all possible lengths starting from the beginning by making 
use of index i. For every such substring, we partition the string into two further 
substrings s1' and s2' in all possible ways using the index j
(Note that the i now refers to the ending index of s2'). 
Now, to fill in the entry dp[i], we check if the dp[j] contains true, i.e. if the 
substring s1' fulfills the required criteria. If so, we further check if s2' is present
in the dictionary. If both the strings fulfill the criteria, we make dp[i] as true, 
otherwise as false.

Time complexity: O(N^3)
Space complexity: O(N)

Runtime: 9 ms Beats 37.25%
Memory: 50.50 MB Beats 92.27%
*/
var wordBreak = function (s, wordDict) {
  const wordDictSet = new Set(wordDict);
  const N = s.length;
  const dp = new Array(N + 1).fill(false);
  //base case;
  dp[0] = true;
  //try with all length of the string
  for (let i = 1; i <= N; i++) {
    for (let j = 0; j < i; j++) {
      // console.log(`substring from j: ${j} to i:${i}`, s.substring(j, i));
      if (dp[j] && wordDictSet.has(s.substring(j, i))) {
        dp[i] = true;
      }
    }
  }
  return dp[N];
};

/*
Dynamic Programming
 */
var wordBreak = function (s, wordDict) {
  const wordDictSet = new Set();
  wordDict.forEach((word) => wordDictSet.add(word));
  let dp = new Array(s.length + 1).fill(false);
  dp[0] = true;
  //i is substring length
  for (let i = 1; i <= s.length; i++) {
    for (j = 0; j < i; j++) {
      console.log(`substring from j: ${j}, i:${i} is: ${s.substring(j, i)}`);
      if (dp[j] && wordDictSet.has(s.substring(j, i))) {
        dp[i] = true;
      }
    }
  }
  console.log(dp);
  return dp[s.length];
};
