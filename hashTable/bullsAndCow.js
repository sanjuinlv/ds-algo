/* 
299. Bulls and Cows
https://leetcode.com/problems/bulls-and-cows/description/
Type: Medium

You are playing the Bulls and Cows game with your friend.

You write down a secret number and ask your friend to guess what the number is. When your friend makes a guess, you provide a hint with the following info:

The number of "bulls", which are digits in the guess that are in the correct position.
The number of "cows", which are digits in the guess that are in your secret number but are located in the wrong position. Specifically, the non-bull digits in the guess that could be rearranged such that they become bulls.
Given the secret number secret and your friend's guess guess, return the hint for your friend's guess.

The hint should be formatted as "xAyB", where x is the number of bulls and y is the number of cows. Note that both secret and guess may contain duplicate digits.

Example 1:
Input: secret = "1807", guess = "7810"
Output: "1A3B"
Explanation: Bulls are connected with a '|' and cows are underlined:
"1807"
  |
"7810"

Example 2:
Input: secret = "1123", guess = "0111"
Output: "1A1B"
Explanation: Bulls are connected with a '|' and cows are underlined:
"1123"        "1123"
  |      or     |
"0111"        "0111"
Note that only one of the two unmatched 1s is counted as a cow since the non-bull digits can only be rearranged to allow one 1 to be a bull.
 
Constraints:
1 <= secret.length, guess.length <= 1000
secret.length == guess.length
secret and guess consist of digits only.
*/
/**
 * @param {string} secret
 * @param {string} guess
 * @return {string}
 */
/* 
Approach: Hashtable + count
Time: O(N)
Space: O(1), we store only 1-9 digits count

Runtime: 12 ms Beats 13.11%
Memory: 52.20 MB Beats 34.43%
*/
var getHint = function (secret, guess) {
  //map of digits count
  const digitMap = new Map();
  //result
  const hints = { A: 0, B: 0 };
  //count the frequency of digits
  for (let i = 0; i < secret.length; i++) {
    const secretDigit = secret[i];
    const guessDigit = guess[i];
    if (secretDigit == guessDigit) hints["A"]++;
    else digitMap.set(secretDigit, (digitMap.get(secretDigit) || 0) + 1);
  }
  //now find the bulls and cow
  for (let i = 0; i < secret.length; i++) {
    const secretDigit = secret[i];
    const guessDigit = guess[i];
    if (secretDigit != guessDigit) {
      if (digitMap.has(guessDigit)) {
        hints["B"]++;
        digitMap.set(guessDigit, digitMap.get(guessDigit) - 1);
        if (digitMap.get(guessDigit) == 0) digitMap.delete(guessDigit);
      }
    }
  }
  return `${hints["A"]}A${hints["B"]}B`;
};
//Solution reference
/* 
Approach II: Two pass
Time: O(N)
Space: O(1)

Runtime: 7 ms Beats 49.18%
Memory: 50.78 MB Beats 55.74%
*/
var getHint = function (secret, guess) {
  const N = secret.length;
  const charMap = new Map();
  let cows = 0;
  let bulls = 0;
  //created frequency map
  for (let i = 0; i < N; i++) {
    const d = secret[i];
    charMap.set(d, (charMap.get(d) || 0) + 1);
  }
  for (let i = 0; i < N; i++) {
    let d = guess[i];
    if (charMap.has(d)) {
      //this character is same as secret
      if (d == secret[i]) {
        bulls++;
        //update the cows if all the d chars from secret were used up
        if (charMap.get(d) <= 0) cows--;
      } else {
        //we still have matching chars from secret
        if (charMap.get(d) > 0) cows++;
      }
      //char was used
      charMap.set(d, charMap.get(d) - 1);
    }
  }
  return `${bulls}A${cows}B`;
};

/* 
Approach III: One pass
Time: O(N)
Space: O(1)

Runtime: 3 ms Beats 88.52%
Memory: 50.26 MB Beats 73.77%
*/
var getHint = function (secret, guess) {
  const N = secret.length;
  const charMap = new Map();
  let cows = 0;
  let bulls = 0;
  let nums1 = new Array(10).fill(0);
  let nums2 = new Array(10).fill(0);
  for (let i = 0; i < N; i++) {
    const s = secret[i];
    const g = guess[i];
    if (d == s) {
      bulls++;
    } else {
      nums1[s - "0"]++;
      nums2[g - "0"]++;
    }
  }
  for (let i = 0; i < 10; i++) {
    cows += Math.min(nums1[i], nums2[i]);
  }
  return `${bulls}A${cows}B`;
};
