/* 
Given a list of unique words, return all the pairs of the distinct indices (i, j) in
the given list, so that the concatenation of the two words words[i] + words[j] is a palindrome.

Example 1:
Input: words = ["abcd","dcba","lls","s","sssll"]
Output: [[0,1],[1,0],[3,2],[2,4]]
Explanation: The palindromes are ["dcbaabcd","abcddcba","slls","llssssll"]

Example 2:
Input: words = ["bat","tab","cat"]
Output: [[0,1],[1,0]]
Explanation: The palindromes are ["battab","tabbat"]

Example 3:
Input: words = ["a",""]
Output: [[0,1],[1,0]]
*/
/**
 * @param {string[]} words
 * @return {number[][]}
 */
/* 
Approach I: Brute Force
Time: O(N^2 * L) - There are N^2 pair of words. L is length of word as we are concatenating the words for checking palindrome. 
Space: O(L), we need to create string by combining two string to check it is a palindrome

palindromePairs(["abcd","dcba","lls","s","sssll"]);
PASS all test cases
*/
var palindromePairs = function (words) {
  const isPalindrome = (word) => {
    let i = 0;
    let j = word.length - 1;
    while (i < j) {
      if (word[i++] != word[j--]) return false;
    }
    return true;
  };

  const result = [];
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if (i == j) continue;
      if (isPalindrome(words[i] + words[j])) {
        result.push([i, j]);
      }
    }
  }
  return result;
};

/*
Approach 2: Hashing
Time: O(k^2 * n)
Building the hash table takes O(n * k) time. Each word takes O(k) time to insert and there are n words.
Space: O((k+n)^2)
there are n words, with a length of up to k each. This gives us O(n * k). We are then building a hash table with n keys of size k. The hash table is the same size as the original input, so it too is O(n * k).

Runtime: 7466 ms Beats 5.51%
Memory: 72.50 MB Beats 48.62%
*/
var palindromePairs = function (words) {
  /* 
    We'll call a suffix a "valid suffix" of a word if the remainder (prefix)
    of the word forms a palindrome. The function allValidSuffixes finds all
    such suffixes. For example, the "valid suffixes" of the word "exempt" 
    are "xempt" (remove "e") and "mpt" (remove 'exe').
  */
  const allValidSuffixes = (word) => {
    const validSuffixes = [];
    for (let i = 0; i < word.length; i++) {
      if (isPalindrome(word, 0, i))
        validSuffixes.push(word.slice(i + 1, word.length));
    }
    console.log(`valid suffixes for word: ${word}`, validSuffixes);
    return validSuffixes;
  };
  /* 
    We'll call a prefix a "valid prefix" of a word if the remainder (suffix) of the word forms a palindrome. 
  */
  const allValidPrefixes = (word) => {
    const validPrefixes = [];
    for (let i = 0; i < word.length; i++) {
      if (isPalindrome(word, i, word.length - 1))
        validPrefixes.push(word.slice(0, i));
    }
    console.log(`valid prefixes for word: ${word}`, validPrefixes);
    return validPrefixes;
  };

  const isPalindrome = (word, left, right) => {
    while (left < right) {
      if (word[left++] !== word[right--]) return false;
    }
    return true;
  };

  //create word map
  const wordMap = new Map();
  for (let i = 0; i < words.length; i++) {
    wordMap.set(words[i], i);
  }

  const pairs = [];
  for (let word of wordMap.keys()) {
    const currWordIndex = wordMap.get(word);
    const reversedWord = Array.from(word).reverse().join("");
    //case 1: words are of equal - This will be word 1.
    if (
      wordMap.has(reversedWord) &&
      wordMap.get(reversedWord) != currWordIndex
    ) {
      pairs.push([currWordIndex, wordMap.get(reversedWord)]);
    }
    //case 2: words are uneuqal length. This will be word 2
    for (let suffix of allValidSuffixes(word)) {
      //reverse the suffix to find if there exist an entry in map
      const reversedSuffix = Array.from(suffix).reverse().join("");
      if (wordMap.has(reversedSuffix)) {
        pairs.push([wordMap.get(reversedSuffix), currWordIndex]);
      }
    }
    //case 2: words are uneuqal length. This will be word 1
    for (let prefix of allValidPrefixes(word)) {
      const reversedPrefix = Array.from(prefix).reverse().join("");
      if (wordMap.has(reversedPrefix)) {
        pairs.push([currWordIndex, wordMap.get(reversedPrefix)]);
      }
    }
  }
  return pairs;
};
/* 
Approach 3: Trie
Time: O(k^2 * n)
There were 2 major steps to the algorithm. Firstly, we needed to build the Trie. Secondly, we needed to look up each word in the Trie.
Inserting each word into the Trie takes O(k) time. As well as inserting the word, we also checked at each letter whether or not the remaining part of the word was a palindrome. These checks had a cost of O(k), and with k of them, gave a total cost of O(k^2). With n words to insert, the total cost of building the Trie was therefore O(k^2*n).
Checking for each word in the Trie had a similar cost. Each time we encountered a node with a word ending index, we needed to check whether or not the current word we were looking up had a palindrome remaining. In the worst case, we'd have to do this k times at a cost of k for each time. So like before, there is a cost of k^2 for looking up a word, and an overall cost of k2*n for all the checks.

This is the same as for the hash table approach.

Space: O((k+n)^2)
The Trie is the main space usage. In the worst case, each of the O(n*k) letters in the input would be on separate nodes, and each node would have up to n indexes in its list. This gives us a worst case of O(n^2*k), which is strictly larger than the input or the output.

Inserting and looking up words only takes k space though, because we're not generating a list of prefixes like we were in approach 2. This is insignificant compared to the size of the Trie itself.

So in total, the size of the Trie has a worst case of O(k * n^2). In practice however, it'll use a lot less, as we based this on the worst case. Tries are difficult to analyze in the general case, because their performance is so dependent on the type of data going into them. As n gets really, really, big, the Trie approach will eventually beat the hash table approach on both time and space. For the values of n that we're dealing with in this question though, you'll probably notice that the hash table approach performs better.

Runetime: 2556 ms Beats 34.91%
Memory: 371.62 MB Beats 5.66%
*/
var palindromePairs = function (words) {
  function Node() {
    this.children = new Map();
    this.wordIndex = -1;
    this.palindromePrefixRemaining = [];
  }
  // Is the given string a palindrome after index i?
  this.hasPalindromeRemaining = (s, i) => {
    let left = i;
    let right = s.length - 1;
    while (left < right) {
      if (s[left] != s[right]) return false;
      left++;
      right--;
    }
    console.log(`string ${s.slice(i, s.length)} is palindrome`);
    return true;
  };

  this.insert = (word, wordId) => {
    let curr = this.root;
    for (let j = 0; j < word.length; j++) {
      const c = word[j];
      //check if the substring at index j is palindrome
      if (this.hasPalindromeRemaining(word, j)) {
        curr.palindromePrefixRemaining.push(wordId);
      }
      if (!curr.children.has(c)) curr.children.set(c, new Node());
      curr = curr.children.get(c);
    }
    curr.wordIndex = wordId;
  };

  this.root = new Node();
  //Build the Trie
  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const reversedWord = Array.from(word).reverse().join("");
    this.insert(reversedWord, i);
  }
  //Find Pairs
  const pairs = [];
  for (let wordId = 0; wordId < words.length; wordId++) {
    const word = words[wordId];
    let curr = this.root;
    for (let j = 0; j < word.length; j++) {
      // case 2: When 1st word is longer than the 2nd word
      if (curr.wordIndex != -1 && this.hasPalindromeRemaining(word, j)) {
        pairs.push([wordId, curr.wordIndex]);
      }
      //move down to the next level of Trie
      const c = word[j];
      curr = curr.children.get(c);
      if (curr == null) break;
    }
    if (curr == null) continue;
    // Check for pairs of case 1. Note the check to prevent non distinct pairs.
    if (curr.wordIndex != -1 && curr.wordIndex != wordId) {
      pairs.push([wordId, curr.wordIndex]);
    }
    //Case 2: When 1st word is shorter than the 2nd word.
    //E.g,, TAC & LOLCAT (reversed: TACLOL), the substring after match should be palindrome
    //and we have already calculated and stored the palindrome indexes
    for (let i of curr.palindromePrefixRemaining) {
      pairs.push([wordId, i]);
    }
  }
  return pairs;
};

/* Solutions from User */
var palindromePairs = function (words) {
  const wordMap = new Map();
  const set = new Set();
  const n = words.length;

  for (let i = 0; i < n; i++) {
    wordMap.set(words[i], i);
    set.add(words[i].length);
  }

  const lengths = Array.from(set).sort((a, b) => a - b);
  const ans = [];

  for (let i = 0; i < n; i++) {
    let length = words[i].length;

    if (length === 1) {
      if (wordMap.has("")) {
        ans.push([i, wordMap.get("")]);
        ans.push([wordMap.get(""), i]);
      }
    } else {
      const reverse = words[i].split("").reverse().join("");

      if (wordMap.has(reverse) && wordMap.get(reverse) != i)
        ans.push([i, wordMap.get(reverse)]);

      for (const k of lengths) {
        if (k === length) break;

        if (isPalindrome(reverse, 0, length - 1 - k)) {
          const s1 = reverse.substring(length - k);

          if (wordMap.has(s1)) ans.push([i, wordMap.get(s1)]);
        }

        if (isPalindrome(reverse, k, length - 1)) {
          const s2 = reverse.substring(0, k);

          if (wordMap.has(s2)) ans.push([wordMap.get(s2), i]);
        }
      }
    }
  }

  return ans;
};

var isPalindrome = function (s, left, right) {
  while (left < right) if (s[left++] !== s[right--]) return false;

  return true;
};
