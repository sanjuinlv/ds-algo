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
var wordBreak = function (s, wordDict) {
  const wordSet = new Set();
  const N = s.length;
  let matchedLength = 0;
  wordDict.forEach((word) => wordSet.add(word));
  for (k = 1; k <= N; k++) {
    let i = 0;
    while (i <= N - k) {
      let j = i + k;
      console.log(`i: ${i}, j: ${j}`);
      const word = s.substring(i, j);
      // console.log(`word: ${word}`);
      if (wordSet.has(word)) {
        matchedLength += k;
        console.log(`matched word: ${word}, matchedLength: ${matchedLength}`);
        if (matchedLength > N) return false;
        i += k;
        //if a word match is found then jump the i by match size
        if (matchedLength == N) {
          console.log(`toal match found`);
          return true;
        }
      } else {
        i++;
      }
    }
  }
  console.log(`final matchedLength: ${matchedLength}`);
  return matchedLength == N;
};
/*
Approach II: Brute force (Check from max length strings)
Fails for 
s = "catsandydogi", wordDict = ["cats", "dogi", "sandy", "and", "cat"]
 */
var wordBreak = function (s, wordDict) {
  const wordSet = new Set();
  const N = s.length;
  let matchedLength = 0;
  wordDict.forEach((word) => wordSet.add(word));
  for (k = N; k >= 0; k--) {
    let i = 0;
    while (i <= N - k) {
      let j = i + k;
      console.log(`i: ${i}, j: ${j}`);
      const word = s.substring(i, j);
      console.log(`word: ${word}`);
      if (wordSet.has(word)) {
        matchedLength += k;
        console.log(`matched word: ${word}, matchedLength: ${matchedLength}`);
        if (matchedLength > N) return false;
        i += k;
        //if a word match is found then jump the i by match size
        if (matchedLength == N) {
          console.log(`toal match found`);
          return true;
        }
      } else {
        i++;
      }
    }
  }
  console.log(`final matchedLength: ${matchedLength}`);
  return matchedLength == N;
};

var wordBreak = function (s, wordDict) {
  let matchCount = 0;
  let N = s.length;
  for (let word of wordDict) {
    console.log(`dictionary word: ${word}`);
    let wordLength = word.length;
    let dictWordCharMatchCount = 0;
    let dictCharPos = 0;
    for (let char of s) {
      console.log(
        `char: ${char}, j: ${dictCharPos}, wordChar: ${word[dictCharPos]}`
      );
      //charcter matches with dictionary word char
      if (char == word[dictCharPos]) {
        dictWordCharMatchCount++;
        dictCharPos++;
        console.log(`count: ${dictWordCharMatchCount}`);
        //whole word from dictionary matches
        if (dictWordCharMatchCount == wordLength) {
          matchCount += dictWordCharMatchCount;
          console.log(`matchCount: ${matchCount}`);
          if (matchCount == N) return true;
          if (matchCount > N) return false;
          dictCharPos = 0;
          matchCount = 0;
        }
      } else {
        //reset counter
        dictWordCharMatchCount = 0;
        //start over again for dictionar word from begining
        dictCharPos = 0;
      }
    }
  }
  return matchCount == N;
};

// Using Solution reference

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

Runtime: 84 ms, faster than 78.49% of JavaScript online submissions for Word Break.
Memory Usage: 40.8 MB, less than 34.08% of JavaScript online submissions for Word Break.

*/
var wordBreak = function (s, wordDict) {
  const wordDictSet = new Set(wordDict);
  const N = s.length;
  const memo = new Array(N);
  function backtrack(start) {
    //we reached at the end of string
    if (start == N) return true;
    if (memo[start] != null) {
      return memo[start];
    }
    //check for other combination
    for (let end = start + 1; end <= N; end++) {
      if (wordDictSet.has(s.substring(start, end)) && backtrack(end)) {
        return (memo[start] = true);
      }
    }
    return (memo[start] = false);
  }
  return backtrack(0);
};

/* 
Approach 3: Breadth Search
Time Complexity: O(N^3): For every starting index, the search can continue till the 
end of the given string.
Space Complexity: O(N). The depth of the recursion tree can go upto n.

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
Approach 4: Using Dynamic Programming
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

//30/03/2022
/* 
Approach: Recursion 

*/
var wordBreak = function (s, wordDict) {
  const wordSet = new Set(wordDict);
  const N = s.length;
  const backtrack = (start) => {
    console.log(`start: ${start}`);
    if (start == N) return true;
    for (let end = start + 1; end <= N; end++) {
      const str = s.substring(start, end);
      console.log(`start: ${start}, end: ${end}, str: ${str}`);
      if (wordSet.has(str) && backtrack(end)) {
        return true;
      }
    }
    return false;
  };
  return backtrack(0);
};

/* 
Approach: Recursion with Memoization
Time: O(N^3): Size of recursion tree can go up to n^2.
Space: O(N)The depth of recursion tree can go up to n.
*/
var wordBreak = function (s, wordDict) {
  const wordSet = new Set(wordDict);
  const N = s.length;
  const memo = new Array(N).fill(null);
  const backtrack = (start) => {
    if (start == N) return true;
    if (memo[start] != null) return memo[start];
    for (let end = start + 1; end <= N; end++) {
      if (wordSet.has(s.substring(start, end)) && backtrack(end)) {
        memo[start] = true;
        return memo[start];
      }
    }
    memo[start] = false;
    return memo[start];
  };
  return backtrack(0);
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
