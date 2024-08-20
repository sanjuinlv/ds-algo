/* 
Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.
Note: For the purpose of this problem, we define empty string as valid palindrome.

Input: "A man, a plan, a canal: Panama"
Output: true

Input: "race a car"
Output: false
 */
/**
 * @param {string} s
 * @return {boolean}
 */
/* 
Time complexity: O(N)
Space complexity: O(1)
Runtime: 96 ms
Memory Usage: 43.2 MB
Your runtime beats 60.11 % of javascript submissions.
*/

var isPalindrome = function(s) {
    const N = s.length;
    let leftIndex = 0; rightIndex = N - 1;
    let isPalindrome = true;
    const isAlphanumeric = char => {
        return ('a' <= char && char <= 'z')
            || ('0'.codePointAt(0) <= char.codePointAt(0) && char.codePointAt(0) <= '9'.codePointAt(0));
    }

    while (leftIndex <= rightIndex) {
        const leftChar = s[leftIndex].toLowerCase();
        const rightChar = s[rightIndex].toLowerCase();
        if (!(isAlphanumeric(leftChar))) {
            leftIndex++;
            continue;
        }
        if (!(isAlphanumeric(rightChar))) {
            rightIndex--;
            continue;
        }
        if (leftChar !== rightChar) {
            isPalindrome = false;
            break;
        }
        leftIndex++;
        rightIndex--;
    }
    return isPalindrome;
};


/* 2nd try
Sorter solution, using regex
Runtime: 96 ms, faster than 66.61% of JavaScript online submissions for Valid Palindrome.
Memory Usage: 40.7 MB, less than 90.13% of JavaScript online submissions for Valid Palindrome.
*/ 
var isPalindrome = function(s) {
    s = s.replace(/[^a-z0-9]/gi,'').toLowerCase();
    const N = s.length;
    let left = 0, right = N-1;
    while (left <= right){
        if (s[left] != s[right]) return false;
        left++;
        right--;
    }
    return true;
};