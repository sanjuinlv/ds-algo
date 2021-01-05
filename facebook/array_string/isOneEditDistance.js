/* 
Given two strings s and t, return true if they are both one edit distance apart, otherwise return false.
A string s is said to be one distance apart from a string t if you can:

Insert exactly one character into s to get t.
Delete exactly one character from s to get t.
Replace exactly one character of s with a different character to get t.

Examples:

Input: s = "ab", t = "acb"
Output: true
Explanation: We can insert 'c' into s to get t.

Input: s = "", t = ""
Output: false
Explanation: We cannot get t from s by only one step.

Input: s = "a", t = ""
Output: true

Input: s = "", t = "A"
Output: true
*/
/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
//TODO: check for use case: 
// s = "abcde", t = "abcde"  - PASS
// s = "ab", t = "acb"       - PASS
// s = "teacher", t = "detacher" -  FAILED
var isOneEditDistance = function(s, t) {
    const m = s.length, n = t.length;
    if (m == 0 && n == 0) return false;
    console.log(`m: ${m}, n: ${n}`);
    // check if size diff is for Inert/Delete OR Replace
    if (!(Math.abs(m - n) == 1 || m == n)) return false;
    const charMap = new Map();
    for (let i = 0; i < n; i++) {
        const char = t[i];
        if (charMap.has(char)) {
            charMap.set(char, charMap.get(char) + 1);
        } else {
            charMap.set(char, 1);
        }
    }
    console.log(`map of t`);
    console.log(charMap);
    // perform look up from s and if match found decrease the count
    [...s].forEach(char => {
        if (charMap.has(char)) {
            let charCount = charMap.get(char);
            if (charCount == 1) charMap.delete(char);
            else charMap.set(char, charCount - 1);
        }
    });
    console.log(`map of t after update`);
    console.log(charMap);
    let totalCharCount = 0;
    // const mapIterator = charMap.values();
    for (let charCount of charMap.values()) {
        totalCharCount += charCount;
    }
    console.log(`total count: ${totalCharCount}`);
    // Insert
    if (m < n) {
        if (totalCharCount == 1) return true;
    } else if (m > n) { // Delete
        if (totalCharCount == 0) return true;
    } else if (m == n) {//replace
        if (totalCharCount == 1) return true;
    }
    return false;
};

// for submission
var isOneEditDistance = function(s, t) {
    const m = s.length, n = t.length;
    if (m == 0 && n == 0) return false;
    // check if size diff is for Inert/Delete OR Replace
    if (!(Math.abs(m - n) == 1 || m == n)) return false;
    const charMap = new Map();
    for (let i = 0; i < n; i++) {
        const char = t[i];
        if (charMap.has(char)) {
            charMap.set(char, charMap.get(char) + 1);
        } else {
            charMap.set(char, 1);
        }
    }
    // perform look up from s and if match found decrease the count
    [...s].forEach(char => {
        if (charMap.has(char)) {
            let charCount = charMap.get(char);
            if (charCount == 1) charMap.delete(char);
            else charMap.set(char, charCount - 1);
        }
    });
    let totalCharCount = 0;
    for (let charCount of charMap.values()) {
        totalCharCount += charCount;
    }
    if (m < n) { //insert
        if (totalCharCount == 1) return true;
    } else if (m > n) { // Delete
        if (totalCharCount == 0) return true;
    } else if (m == n) {//replace
        if (totalCharCount == 1) return true;
    }
    return false;
};

/* Wrong understanding of problem that it can be one edit in any order. 
 i.e s = "teacher" can be be same as t = "detacher" by adding "d" to it. 
But thats not the case. we need to also ensure the order*/
// re- write the logic
//s = "teacher", t = "detacher"
// s = "ba", t="a"
// s = "abxcd", t = "abycd"
var isOneEditDistance = function(s, t) {
    const m = s.length, n = t.length;
    //ensure that s is shorter than t
    if (m > n) return isOneEditDistance(t, s);
    if (n - m > 1) return false;
    // string length are equal length (s="abxcd", t="abycd") - REPLACE
    // string length are equal length (s="abcd", t="abcd") - Not one edit away
    // string length are different length (s="abcd", t="abcde")
    console.log(`s: ${s}, t: ${t}`);
    console.log(`m: ${m}, n: ${n}`);
    for (let i = 0; i < m; i++) {
        if (s[i] != t[i]) {
            let j = i;
            if (m == n) {
                j = j + 1;
                // all character from s(i+1, n) and t(i+1, n) should be same
                while (j < n) {
                    if (s[j] != t[j]) return false;
                    j++;
                }
                return true;
            } else {
                // all character from s(j, n) and t(j+1, n) should be same
                while (j < n) {
                    if (s[j] != t[j + 1]) return false;
                    j++
                }
                return true;
            }

        }
    }
    // If there is no diffs on ns distance
    // the strings are one edit away only if
    // t has one more character. 
    return m + 1 == n;
}

// for submission
/* 
Runtime: 92 ms, faster than 36.36% of JavaScript online submissions for One Edit Distance.
Memory Usage: 39.6 MB, less than 5.91% of JavaScript online submissions for One Edit Distance.
*/
var isOneEditDistance = function(s, t) {
    const m = s.length, n = t.length;
    //ensure that s is shorter than t
    if (m > n) return isOneEditDistance(t, s);
    if (n - m > 1) return false;
    for (let i = 0; i < m; i++) {
        if (s[i] != t[i]) {
            let j = i;
            if (m == n) {
                j = j + 1;
                // all character from s(i+1, n) and t(i+1, n) should be same
                while (j < n) {
                    if (s[j] != t[j]) return false;
                    j++;
                }
                return true;
            } else {
                // all character from s(j, n) and t(j+1, n) should be same
                while (j < n) {
                    if (s[j] != t[j + 1]) return false;
                    j++
                }
                return true;
            }

        }
    }
    // If there is no diffs on ns distance the strings are one edit away 
    // only if t has one more character. 
    return m + 1 == n;
}
