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
Time: O(N^2 * L), where L is length of word as we are concatenating the words for checking palindrome 
Space: O(L), we need to create string by combining two string to check it is a palindrome

palindromePairs(["abcd","dcba","lls","s","sssll"]);
PASS all test cases
*/
var palindromePairs = function (words) {
  const isPalindrome = (word) => {
    let i = 0,
      j = word.length - 1;
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

//Doesn't work. This will produce duplicate result as even "lls" & "s" will result in palindrome
var palindromePairs = function (words) {
  //"bat" + "tab" => battab
  // "abcd" + "lls" => "abcdlls"
  const isPalindrome = (word1, word2) => {
    if (word1.length > word2.length) {
      return isPalindrome(word2, word1);
    }
    //word 1 is always smaller than word2
    //"lls" , "abcd" or "s" & "lls"
    console.log(`word1: ${word1} , word2: ${word2}`);
    let i = 0,
      j = word2.length - 1;
    const N = word1.length,
      M = word2.length;
    while (i < N && j < M) {
      if (word1[i++] != word2[j--]) return false;
    }
    //check for remaining character in word2, starting from 0th position for word2
    i = 0;
    while (i < j) {
      if (word2[i++] != word2[j--]) return false;
    }
    console.log(`${word1} + ${word2}  is palindrome`);
    return true;
  };

  const result = [];
  for (let i = 0; i < words.length; i++) {
    for (let j = 0; j < words.length; j++) {
      if (i == j) continue;
      if (isPalindrome(words[i], words[j])) {
        result.push([i, j]);
      }
    }
  }
  console.log(`result: ${result}`);
  return result;
};

/* 
Approach 2: Using Trie

palindromePairs(["abcd","dcba","lls","s","sssll"]);
PASS

palindromePairs(["bat","tab","cat"]);
PASS

palindromePairs(["mo","m"]);
FAILS

palindromePairs(["a",""]);
FAILS (expected [[0,1],[1,0]])
*/
var palindromePairs = function (words) {
  this.root = new Node();
  this.words = words;
  function Node() {
    this.wordIndexes = [];
    this.children = new Map();
  }

  this.buildTrie = function (words) {
    for (let i = 0; i < words.length; i++) {
      this.insert(words[i], i);
    }
    console.log(this.root);
  };

  this.insert = function (word, wordIndex) {
    //create the Tire with letters in reverse order
    let curr = this.root;
    for (let i = word.length - 1; i >= 0; i--) {
      if (!curr.children.has(word[i])) {
        curr.children.set(word[i], new Node());
      }
      curr = curr.children.get(word[i]);
      curr.wordIndexes.push(wordIndex);
    }
  };

  this.wordsIndexWithPrefix = function (prefix) {
    let curr = this.root;
    for (let c of prefix) {
      if (!curr.children.has(c)) return [];
      curr = curr.children.get(c);
    }
    return curr.wordIndexes;
  };

  const isPalindrome = (word) => {
    let i = 0,
      j = word.length - 1;
    while (i < j) {
      if (word[i++] != word[j--]) return false;
    }
    return true;
  };

  this.backtrack = function (word, i) {
    if (!(word && word.length > 0)) return;
    //"mo", "m", "om"
    //mo + om = moom, mo + m=mom
    const wordsIndex = this.wordsIndexWithPrefix(word);
    console.log(
      `for prefix: ${word}, index: ${i}, word Indexes: ${wordsIndex}`
    );
    for (const index of wordsIndex) {
      if (index === i) continue; //ignore same word
      console.log(`word at index: ${index}: ${this.words[index]}`);
      //check for palindrome
      if (isPalindrome(this.words[i] + this.words[index]))
        result.push([i, index]);
    }
    this.backtrack(word.slice(0, word.length - 2), i);
  };

  const result = [];
  //build trie
  this.buildTrie(words);
  //for each word check for possible palindrome
  for (let i = 0; i < words.length; i++) {
    //find entry in trie for this word
    this.backtrack(words[i], i);
    // let prefix = words[i];
    // const wordsIndex = this.wordsIndexWithPrefix(prefix);
    // console.log(`for prefix: ${prefix}, word Indexes: ${wordsIndex}`);
    // for (const index of wordsIndex) {
    //     if (index === i) continue; //ignore same word
    //     console.log(`word at index: ${index}: ${words[index]}`);
    //     //check for plaindrome
    //     if (isPalindrome(prefix+words[index])) result.push([i, index]);
    // }
  }
  console.log(`result: ${result}`);
  return result;
};

//Solution Reference
/*
Approach 2: Hashing

palindromePairs(["abcd","dcba","lls","s","sssll"]);
Output: [[0,1],[1,0],[3,2],[2,4]]
PASS

palindromePairs(["bat","tab","cat"]);
Output: [[0,1],[1,0]]
PASS

palindromePairs(["mo","m"]);
Output: [[0,1]]
PASS

palindromePairs(["a",""]);
Output: [[0,1],[1,0]]
PASS
 */
var palindromePairs = function (words) {
  const isPalindromeBetween = (word, front, back) => {
    while (front < back) {
      if (word[front++] != word[back--]) return false;
    }
    return true;
  };

  const reverse = function (word) {
    let reverse = "";
    for (let i = word.length - 1; i >= 0; i--) {
      reverse += word[i];
    }
    return reverse;
  };

  this.allValidPrefixes = function (word) {
    const validPrefixes = [];
    for (let i = word.length - 1; i >= 0; i--) {
      if (isPalindromeBetween(word, i, word.length - 1)) {
        validPrefixes.push(word.slice(0, i));
      }
    }
    console.log(`validPrefixes for ${word}: ${JSON.stringify(validPrefixes)}`);
    return validPrefixes;
  };

  this.allValidSuffixes = function (word) {
    const validSuffixes = [];
    for (let i = 0; i < word.length; i++) {
      if (isPalindromeBetween(word, 0, i)) {
        validSuffixes.push(word.slice(i + 1, word.length));
      }
    }
    console.log(`validSuffixes for ${word}: ${JSON.stringify(validSuffixes)}`);
    return validSuffixes;
  };

  this.findPalindromePairs = function (words, result) {
    //build a word, index mapping
    const wordMap = new Map();
    for (let i = 0; i < words.length; i++) {
      wordMap.set(words[i], i);
    }

    for (const word of wordMap.keys()) {
      const currWordIndex = wordMap.get(word);

      //Case 1: Check if revere of this words exists
      const reversedWord = reverse(word);
      if (
        wordMap.has(reversedWord) &&
        currWordIndex != wordMap.get(reversedWord)
      ) {
        result.push([currWordIndex, wordMap.get(reversedWord)]);
      }

      //Build solutions of case #2. This word will be word 2.
      //prefix is be palindrome and reverse of suffix we need to look up.
      for (const suffix of this.allValidSuffixes(word)) {
        const reversedSuffix = reverse(suffix);
        console.log(`reversedSuffix: ${reversedSuffix}`);
        if (wordMap.has(reversedSuffix)) {
          result.push([wordMap.get(reversedSuffix), currWordIndex]);
        }
      }

      //Build solutions of case #3. This word will be word 1.
      //suffix is palindrome and reverse of prefix we need to look up.
      for (const prefix of this.allValidPrefixes(word)) {
        const reversedPrefix = reverse(prefix);
        console.log(`reversedPrefix: ${reversedPrefix}`);
        if (wordMap.has(reversedPrefix)) {
          result.push([currWordIndex, wordMap.get(reversedPrefix)]);
        }
      }
    }
  };
  let result = [];
  this.findPalindromePairs(words, result);
  console.log(`result: ${result}`);
  return result;
};
