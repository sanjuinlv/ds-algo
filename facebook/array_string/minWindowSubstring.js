/* 
Given two strings s and t, return the minimum window in s which will contain all
the characters in t. If there is no such window in s that covers all characters in t, 
return the empty string "".
Note that If there is such a window, it is guaranteed that there will always be 
only one unique minimum window in s.

Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"

Input: s = "a", t = "a"
Output: "a"
*/
/**
 * @param {string} s
 * @param {string} t - substring to find
 * @return {string}
 */
// s = "ADOBECODEBANC", t = "ABC"
var minWindow = function(s, t) {
    //set of characters which needs to be present in s
    const m = s.length, n = t.length;
    let lookupChar = new Set(t);
    let minWindow = "";
    let minWindowLength = Number.MAX_VALUE;
    let startIndex = 0, endIndex = 0;
    while (startIndex <= m - n && endIndex < m) {
        console.log(`startIndex: ${startIndex}, endIndex: ${endIndex}`);
        if (lookupChar.has(s[endIndex])) {
            console.log(`char ${s[endIndex]} mathes with substring char`);
            //first match
            if (lookupChar.size == n) startIndex = endIndex;
            lookupChar.delete(s[endIndex]);
            //last match
            if (lookupChar.size == 0) {
                console.log(`last char match`);
                //reinitialize the look up set
                lookupChar = new Set(t);
                if (endIndex - startIndex + 1 < minWindowLength) {
                    minWindow = s.substring(startIndex, endIndex + 1);
                    minWindowLength = minWindow.length;
                };
                console.log(`minWindow: ${minWindow}`);
                //change the window size
                endIndex = startIndex;
            }
        }
        endIndex++;
    }
    console.log(`minWindow: ${minWindow}`);
    return minWindow;
};
// problem with above solution is it will not work for duplicate entries
// E.g., s = "ab", t="aa"

// Fix duplicate?
var minWindow = function(s, t) {
    //set of characters which needs to be present in s
    const m = s.length, n = t.length;
    // let lookupChar = new Set(t);
    // let lookupChar = new Map(t.split('').map(x => [x, 0]));
    let lookupChar = new Map();
    const CREATE_MAP = () => {
        [...t].forEach(x => {
            if (myMap.has(x)) {
                myMap.set(x, myMap.get(x) + 1);
            } else {
                myMap.set(x, 1);
            }
        });
    }
    let minWindow = "";
    let minWindowLength = Number.MAX_VALUE;
    let startIndex = 0, endIndex = 0;
    while (startIndex <= m - n && endIndex < m) {
        console.log(`startIndex: ${startIndex}, endIndex: ${endIndex}`);
        if (lookupChar.has(s[endIndex])) {
            console.log(`char ${s[endIndex]} mathes with substring char`);
            //first match
            if (lookupChar.size == n) startIndex = endIndex;
            // lookupChar.delete(s[endIndex]);
            lookupChar.set(s[endIndex], lookupChar.get(s[endIndex] - 1));
            //last match
            if (lookupChar.size == 0) {
                console.log(`last char match`);
                //reinitialize the look up set
                // lookupChar = new Set(t);
                lookupChar = new Map(t.split('').map(x => [x, 0]));
                if (endIndex - startIndex + 1 < minWindowLength) {
                    minWindow = s.substring(startIndex, endIndex + 1);
                    minWindowLength = minWindow.length;
                };
                console.log(`minWindow: ${minWindow}`);
                //change the window size
                endIndex = startIndex;
            }
        }
        endIndex++;
    }
    console.log(`minWindow: ${minWindow}`);
    return minWindow;
};

// with other reference
// s = "ADOBECODEBANC", t = "ABC"
var minWindow = function(s, t) {
    if (s.length == 0 || t.length == 0) {
        return "";
    }
    let m = s.length, n = t.length;
    let min = "";
    let left = 0; right = -1;
    const ans = {min: -1, left: 0, right: 0};
    // create a map of characters in 't'. We store the character and its count, 
    // to handle the duplicate chars.E.g., 't' can "AABC".
    let charMap = {};
    [...t].forEach(char => {
        if (charMap[char] == null) charMap[char] = 1;
        else charMap[char]++;
    });
    console.log(`charMap: ${JSON.stringify(charMap, null, 2)}`);
    // sets how many different characters we still have
    // for example: given the input "BAAC", we still have 3 different characters need to check
    let counter = Object.keys(charMap).length;
    console.log(`unique char size: ${counter}`);
    while (right <= m) {
        console.log(`left: ${left}, right: ${right}, counter: ${counter}`);
        // found a valid substring
        if (counter == 0) {
            // try to shift left boundary to the right, this means the very left character will be removed
            // because of this, we need to check whats the affect by removing that character, 
            const current = s[left];
            console.log(`current char: ${current}`);
            // if this character is in our map, it means we ll need to find another one in the future
            if (charMap[current] != null) charMap[current]++;
            console.log(`L: char map updated: ${JSON.stringify(charMap)}`);
            // * we must have the condition `>0` because for case like "BBBA...", count for B could be negative
            if (charMap[current] > 0) counter++;
            if (ans.min == -1 || right - left + 1 < ans.min) {
                ans.min = right - left + 1;
                ans.left = left;
                ans.right = right;
                console.log(`answer: ${JSON.stringify(ans)}`);
            }
            left++;
        } else {
            right++;
            const current = s[right];
            console.log(`current char: ${current}`);
            if (charMap[current] != null) charMap[current]--;
            if (charMap[current] == 0) counter--;
            console.log(`R: char map updated: ${JSON.stringify(charMap)}`);
            // right++;
        }
    }
    console.log(`answer: ${JSON.stringify(ans)}`);
    return ans.min > 0 ? s.substring(ans.left, ans.right + 1) : "";
};

// for submission
/*
Runtime: 100 ms, faster than 75.25% of JavaScript online submissions for Minimum Window Substring.
Memory Usage: 41.4 MB, less than 5.45% of JavaScript online submissions for Minimum Window Substring. 
*/
var minWindow = function(s, t) {
    if (s.length == 0 || t.length == 0) {
        return "";
    }
    let m = s.length, n = t.length;
    let left = 0; right = -1;
    const ans = {min: -1, left: 0, right: 0};
    let charMap = {};
    [...t].forEach(char => {
        if (charMap[char] == null) charMap[char] = 1;
        else charMap[char]++;
    });
    let counter = Object.keys(charMap).length;
    while (right <= m) {
        if (counter == 0) {
            const current = s[left];
            if (charMap[current] != null) charMap[current]++;
            if (charMap[current] > 0) counter++;
            if (ans.min == -1 || right - left + 1 < ans.min) {
                ans.min = right - left + 1;
                ans.left = left;
                ans.right = right;
            }
            left++;
        } else {
            right++;
            const current = s[right];
            if (charMap[current] != null) charMap[current]--;
            if (charMap[current] == 0) counter--;
        }
    }
    return ans.min > 0 ? s.substring(ans.left, ans.right + 1) : "";
};
