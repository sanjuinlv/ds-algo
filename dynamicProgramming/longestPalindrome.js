/**
Given a string s, return the longest palindromic substring in s.

Example 1:
Input: s = "babad"
Output: "bab"
Explanation: "aba" is also a valid answer.

Example 2:
Input: s = "cbbd"
Output: "bb"

Constraints:
1 <= s.length <= 1000
s consist of only digits and English letters.

 * @param {string} s
 * @return {string}
 */
// This solution works fine but the time complexity will be of O(N^3), where N = length of string
var longestPalindrome = function (s) {
  const isPalindrome = (s) => {
    console.log(`checking for s: ${s}`);
    const N = s.length;
    const middle = N / 2;
    let returnVal = true;
    for (let i = 0; i < middle; i++) {
      if (s.charAt(i) !== s.charAt(N - 1 - i)) {
        returnVal = false;
        break;
      }
    }
    console.log(`is ${s} palindrome: ${returnVal}`);
    return returnVal;
  };

  const N = s.length;
  let maxLengthPalindrome = s.charAt(0);
  for (let i = 1; i < N; i++) {
    console.log(`i: ${i}`);
    for (let j = i - 1; j >= 0; j--) {
      console.log(`j: ${j}, i: ${i}`);
      const subString = s.substring(j, i + 1); //last index is exclusive so we need to add +1 to include current char
      if (isPalindrome(subString)) {
        if (maxLengthPalindrome.length < subString.length) {
          maxLengthPalindrome = subString;
          console.log(`longestPalindrome: ${maxLengthPalindrome}`);
        }
      }
    }
  }
  console.log(`final longestPalindrome: ${maxLengthPalindrome}`);
  return maxLengthPalindrome;
};

// Other approach (From other)
/*
    Maintain a boolean table[n][n] that is filled in bottom up manner.
    The value of table[i][j] is true, if the substring is palindrome, otherwise false.
    To calculate table[i][j], check the value of table[i+1][j-1], if the value is true and str[i] is same as str[j], then we make table[i][j] true.
    Otherwise, the value of table[i][j] is made false.
    We have to fill table previously for substring of length = 1 and length =2 because
    as we are finding , if table[i+1][j-1] is true or false , so in case of
    (i) length == 1 , lets say i=2 , j=2 and i+1,j-1 doesn’t lies between [i , j]
    (ii) length == 2 ,lets say i=2 , j=3 and i+1,j-1 again doesn’t lies between [i , j].
*/
// Time Complexity O(N^2)
// Space complexity O(N^2)
// Tabulation method
/*
Runtime: 1360 ms, faster than 7.73% of JavaScript online submissions for Longest Palindromic Substring.
Memory Usage: 79.3 MB, less than 5.48% of JavaScript online submissions for Longest Palindromic Substring.
*/
var longestPalindrome = function (s) {
  const N = s.length;
  let maxLengthPalindrome = s.charAt(0);
  // initialize the 2-D array and fill with zeros
  const dp = [...Array(N)].map((x) => Array(N).fill(0));
  // set all entry dp[i][j] with 1 with i = j;
  for (let i = 0; i < N; i++) {
    dp[i][i] = 1;
  }
  // check for 2 chars from beginning till end and set dp[i][i+1]
  for (let i = 0; i < N - 1; i++) {
    if (s.charAt(i) === s.charAt(i + 1)) {
      dp[i][i + 1] = 1;
      if (maxLengthPalindrome.length < 2) {
        //last index is exclusive so we need to add +1 to include i+1 char
        maxLengthPalindrome = s.substring(i, i + 1 + 1);
      }
    } else {
      dp[i][i + 1] = 0;
    }
  }
  for (let k = 3; k <= N; k++) {
    for (let i = 0; i <= N - k; i++) {
      // end index of string of size 'k'
      const j = i + k - 1; // -1 to convert it zero based index
      if (dp[i + 1][j - 1] && s.charAt(i) === s.charAt(j)) {
        dp[i][j] = 1;
        //set the max length palindrome to this one
        if (k > maxLengthPalindrome.length) {
          maxLengthPalindrome = s.substring(i, j + 1);
        }
      } else {
        dp[i][j] = 0;
      }
    }
  }
  return maxLengthPalindrome;
};

var longestPalindrome = function (s) {
  const N = s.length;
  let maxLengthPalindrome = s.charAt(0);
  // initialize the 2-D array and fill with zeros
  const dp = [...Array(N)].map((x) => Array(N).fill(0));
  // set all entry dp[i][j] with 1 with i = j;
  for (let i = 0; i < N; i++) {
    dp[i][i] = 1;
  }
  // check for 2 chars from beginning till end and set dp[i][i+1]
  for (let i = 0; i < N - 1; i++) {
    if (s.charAt(i) === s.charAt(i + 1)) {
      dp[i][i + 1] = 1;
      if (maxLengthPalindrome.length < 2) {
        //last index is exclusive so we need to add +1 to include i+1 char
        maxLengthPalindrome = s.substring(i, i + 1 + 1);
      }
    } else {
      dp[i][i + 1] = 0;
    }
  }
  for (let k = 3; k <= N; k++) {
    for (let i = 0; i <= N - k; i++) {
      // end index of string of size 'k'
      const j = i + k - 1; // -1 to convert it zero based index
      if (dp[i + 1][j - 1] && s.charAt(i) === s.charAt(j)) {
        dp[i][j] = 1;
        //set the max length palindrome to this one
        if (k > maxLengthPalindrome.length) {
          maxLengthPalindrome = s.substring(i, j + 1);
        }
      } else {
        dp[i][j] = 0;
      }
    }
  }
  return maxLengthPalindrome;
};

/* 
2nd Try
*/
var longestPalindrome = function (s) {
  const N = s.length;
  let maxLengthPalindrome = s.charAt(0);
  //initialize a 2D array
  const dp = [...Array(N)].map((x) => Array(N).fill(0));
  //mark for i=j as 1, as char is palindrom to itself
  for (let i = 0; i < N; i++) {
    dp[i][i] = 1;
  }
  // check for i & i+1, if s[i]==s[i+1]
  for (let i = 0; i < N - 1; i++) {
    if (s[i] == s[i + 1]) {
      dp[i][i + 1] = 1;
      if (maxLengthPalindrome.length < 2) {
        maxLengthPalindrome = s.slice(i, i + 1 + 1);
      }
    }
  }
  //check for all other combination
  for (let k = 3; k <= N; k++) {
    for (let i = 0; i <= N - k; i++) {
      let j = i + k - 1;
      if (s[i] == s[j] && dp[i + 1][j - 1] == 1) {
        dp[i][j] = 1;
        if (k > maxLengthPalindrome.length) {
          maxLengthPalindrome = s.slice(i, j + 1);
        }
      }
    }
  }
  return maxLengthPalindrome;
};

/* 
Combining the loop for k=2 with other
Time Complexity O(N^2) 
Space complexity O(N^2)
*/
var longestPalindrome = function (s) {
  const N = s.length;
  let maxLengthPalindrome = s.charAt(0);
  //initialize a 2D array
  const dp = [...Array(N)].map((x) => Array(N).fill(0));
  //mark for i=j as 1, as char is palindrome to itself
  for (let i = 0; i < N; i++) {
    dp[i][i] = 1;
  }
  //check for all other combination
  for (let k = 2; k <= N; k++) {
    for (let i = 0; i <= N - k; i++) {
      let j = i + k - 1;
      if (k == 2) {
        if (s[i] == s[j]) {
          dp[i][j] = 1;
          if (k > maxLengthPalindrome.length) {
            maxLengthPalindrome = s.slice(i, j + 1);
          }
        }
      } else {
        if (s[i] == s[j] && dp[i + 1][j - 1] == 1) {
          dp[i][j] = 1;
          if (k > maxLengthPalindrome.length) {
            maxLengthPalindrome = s.slice(i, j + 1);
          }
        }
      }
    }
  }
  return maxLengthPalindrome;
};

/* 
Time Complexity O(N^2) 
Space complexity O(1)

Runtime: 164 ms, faster than 53.90% of JavaScript online submissions for Longest Palindromic Substring.
Memory Usage: 39.4 MB, less than 98.67% of JavaScript online submissions for Longest Palindromic Substring.
*/
var longestPalindrome = function (s) {
  let start = 0,
    end = 0;
  const N = s.length;
  const expand = (s, left, right) => {
    while (left >= 0 && right < s.length && s[left] == s[right]) {
      left--;
      right++;
    }
    //size of the palindrom
    // -1 to reduce the size as pointer gets moved further even last border char are not matched
    return right - left - 1;
  };
  for (let i = 0; i < N; i++) {
    const len1 = expand(s, i, i); // for odd size palindrome
    const len2 = expand(s, i, i + 1); // for odd size palindrome
    const maxPalindromLength = Math.max(len1, len2);
    if (maxPalindromLength > end - start) {
      start = i - Math.floor((maxPalindromLength - 1) / 2);
      end = i + Math.floor(maxPalindromLength / 2);
    }
  }
  //since end is excluded we add 1 to include that character
  return s.slice(start, end + 1);
};

//25/03/2022
var longestPalindrome = function (s) {
  const N = s.length;
  const dp = [...Array(N)].map((X) => new Array(N).fill(0));
  let longestStr = s[0];
  //set diagonal as 1
  for (let i = 0; i < N; i++) {
    dp[i][i] = 1;
  }
  console.log(dp);
  for (let i = 0; i < N - 1; i++) {
    const j = i + 1;
    if (s[i] == s[j]) {
      dp[i][j] = 1;
      longestStr = s.substring(i, j + 1);
    }
  }
  console.log(dp);
  for (let k = 3; k <= N; k++) {
    for (let i = 0; i <= N - k; i++) {
      const j = i + k - 1;
      if (s[i] == s[j] && dp[i + 1][j - 1] == 1) {
        dp[i][j] = 1;
        longestStr = s.substring(i, j + 1);
      }
    }
  }
  console.log(dp);
  return longestStr;
};
