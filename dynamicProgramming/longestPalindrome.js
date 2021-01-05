/**
Given a string s, return the longest palindromic substring in s.
1 <= s.length <= 1000
s consist of only digits and English letters (lower-case and/or upper-case),
 * @param {string} s
 * @return {string}
 */
// This solution works fine but the time complexity will be of O(N^3), where N = length of string
var longestPalindrome = function(s) {
    const isPalindrome = (s) => {
        console.log(`checking for s: ${s}`)
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
    }

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

function isPalindrome(s) {
    const N = s.length;
    const middle = N / 2;
    let returnVal = true;
    for (let i = 0; i < middle; i++) {
        if (s.charAt(i) !== s.charAt(N - 1 - i)) {
            returnVal = false;
            break;
        }
    }
    return returnVal;
}

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
var longestPalindrome = function(s) {
    const N = s.length;
    let maxLengthPalindrome = s.charAt(0);
    // initialize the 2-D array and fill with zeros
    const dp = [...Array(N)].map(x => Array(N).fill(0));
    // if we want to only create 2-D array
    // const dp = [...Array(N)].map(x=>Array(N));
    console.log(`initial dp: ${dp}`);
    // set all entry dp[i][j] with 1 with i = j;
    for (let i = 0; i < N; i++) {
        dp[i][i] = 1;
    }
    console.log(`dp after step I: ${dp}`);
    // check for 2 chars from beginning till end and set dp[i][i+1] 
    for (let i = 0; i < N - 1; i++) {
        if (s.charAt(i) === s.charAt(i + 1)) {
            dp[i][i + 1] = 1;
            if (maxLengthPalindrome.length < 2) {
                //last index is exclusive so we need to add +1 to include i+1 char
                maxLengthPalindrome = s.substring(i, i + 1 + 1);
            }
        } else {
            // no need to do this as we by default have all filled with 0
            dp[i][i + 1] = 0;
        }
    }
    console.log(`dp after step II: ${dp}`);
    // now check for string longer than 3, N >=3
    if (N < 3) return maxLengthPalindrome;
    let k = 3;
    for (let k = 3; k <= N; k++) {
        for (let i = 0; i <= N - k; i++) {
            // end index of string of size 'k'
            const j = i + k - 1; // -1 to convert it zero based index
            if (dp[i + 1][j - 1]
                && s.charAt(i) === s.charAt(j)
            ) {
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
    console.log(`dp after step II: ${dp}`);
    return maxLengthPalindrome;
}

// for submission
/*
Runtime: 1360 ms, faster than 7.73% of JavaScript online submissions for Longest Palindromic Substring.
Memory Usage: 79.3 MB, less than 5.48% of JavaScript online submissions for Longest Palindromic Substring.
*/
var longestPalindrome = function(s) {
    const N = s.length;
    let maxLengthPalindrome = s.charAt(0);
    // initialize the 2-D array and fill with zeros
    const dp = [...Array(N)].map(x => Array(N).fill(0));
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
            if (dp[i + 1][j - 1]
                && s.charAt(i) === s.charAt(j)
            ) {
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
}