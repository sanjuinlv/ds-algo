/*
Given a non-empty string s, you may delete at most one character. 
Judge whether you can make it a palindrome.

Example:
Input: "aba"
Output: True

Input: "abca"
Output: True
Explanation: You could delete the character 'c'.

Note: 
The string will only contain lowercase characters a-z. The maximum length of the string is 50000.

 */
/**
 * Easy
 * @param {string} s
 * @return {boolean}
 */
var validPalindrome = function(s) {
    const N = s.length;
    let left = 0; right = N - 1;
    const isPalindrome = (s, left, right) => {
        console.log(`left: ${left} right: ${right}`);
        while (left <= right) {
            if (s[left] !== s[right]) return false;
            left++; right--;
        }
        console.log(`s: ${s} from index ${left} to ${right} is palindrome`);
        return true;
    }
    while (left <= right) {
        if (s[left] !== s[right]) {
            result = isPalindrome(s, left + 1, right)
                || isPalindrome(s, left, right - 1);
            console.log(`isPalindrom: ${result}`);
            return result;
        }
        left++;
        right--;
    }
    return true;
};

// for submission
/* 
Time Complexity: O(N)
Space complexity: O(1)
Your runtime beats 45.13 % of javascript submissions.
Runtime: 104 ms
Memory Usage: 45.7 MB
*/
var validPalindrome = function(s) {
    const N = s.length;
    let left = 0; right = N - 1;
    const isPalindrome = (s, left, right) => {
        while (left <= right) {
            if (s[left] !== s[right]) return false;
            left++; right--;
        }
        return true;
    }
    while (left <= right) {
        if (s[left] !== s[right]) {
            result = isPalindrome(s, left + 1, right)
                || isPalindrome(s, left, right - 1);
            return result;
        }
        left++;
        right--;
    }
    return true;
};