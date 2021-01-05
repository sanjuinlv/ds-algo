/**
 * @param {string} s
 * @param {string} t
 * @return {boolean}
 */
/* 
Approach I: Using hashtable
Time complexity: O(N)
Space complexity: O(1) (there are only 26 english characters)
Runtime: 96 ms, faster than 66.88% of JavaScript online submissions for Valid Anagram.
Memory Usage: 39.9 MB, less than 90.50% of JavaScript online submissions for Valid Anagram.
*/
var isAnagram = function(s, t) {
    if(s.length != t.length) return false; 
    const visited = new Map();
    for (let i = 0; i < s.length; i++){
      visited.set(s[i], (visited.get(s[i]) || 0 ) +1 );
      visited.set(t[i], (visited.get(t[i]) || 0) -1);
    }
    for (let value of visited.values()){
        if (value != 0) return false;
    }
    return true;
};

/*
Approach II: Sorting
 */
var isAnagram = function(s, t) {
    if(s.length != t.length) return false; 
    const sArr = Array.from(s).sort();
    const tArr = Array.from(t).sort();
    for (let i = 0; i < sArr.length; i++){
        if (sArr[i] != tArr[i]) return false;
    }
    return true;
};
