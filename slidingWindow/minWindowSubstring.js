/* 
76. Minimum Window Substring
https://leetcode.com/problems/minimum-window-substring/
Type: Hard

Given two strings s and t, return the minimum window in s which will contain all
the characters in t. If there is no such window in s that covers all characters in t, 
return the empty string "".
Note that If there is such a window, it is guaranteed that there will always be 
only one unique minimum window in s.

Example 1:
Input: s = "ADOBECODEBANC", t = "ABC"
Output: "BANC"

Example 2:
Input: s = "a", t = "a"
Output: "a"

Example 3:
Input: s = "a", t = "aa"
Output: ""
Explanation: Both 'a's from t must be included in the window.
Since the largest window of s only has one 'a', return empty string.

Constraints:
 - m == s.length
 - n == t.length
 - 1 <= m, n <= 105
 - s and t consist of uppercase and lowercase English letters.
*/
/**
 * @param {string} s
 * @param {string} t - substring to find
 * @return {string}
 */
/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
/* 
Approach : Sliding Window
Time: O(N)
Space: O(K), where K is size of t

Runetime: 92 ms Beats 42.70%
Memory: 52.06 MB Beats 91.56%
*/
var minWindow = function (s, t) {
  if (s.length == "" || t.length == "") return "";
  const ans = { min: -1, left: 0, right: 0 };
  const N = s.length;
  let i = 0;
  let j = 0;
  const charMap = new Map();
  for (let c of t) charMap.set(c, (charMap.get(c) || 0) + 1);
  let count = charMap.size;
  while (j < N) {
    //if this character exists in t then reduce the match count
    const char = s[j];
    if (charMap.has(char)) {
      charMap.set(char, (charMap.get(char) || 0) - 1);
      //if all occurance has been found then reduce the count
      if (charMap.get(char) == 0) count--;
    }
    //until we have all matched characters matched shrink the window for next match
    while (count == 0) {
      const outChar = s[i];
      if (charMap.has(outChar)) {
        if (charMap.get(outChar) == 0) count++;
        charMap.set(outChar, charMap.get(outChar) + 1);
      }
      //record the window size
      if (ans.min == -1 || ans.min > j - i + 1) {
        ans.min = j - i + 1;
        ans.left = i;
        ans.right = j;
      }
      i++; //increment left
    }
    j++;
  }
  return ans.min > 0 ? s.slice(ans.left, ans.right + 1) : "";
};

//General Template for substring problems
//For most substring problem, we are given a string and need to find a substring of it which satisfy some restrictions. A general way is to use a hashmap assisted with two pointers. The template is given below.
/* 
int findSubstring(string s){
  vector<int> map(128,0);
  int counter; // check whether the substring is valid
  int begin=0, end=0; //two pointers, one point to tail and one  head
  int d; //the length of substring

  //initialize the hash map here
  for() {  }

  while(end<s.size()){

      if(map[s[end++]]-- ?){  // modify counter here 
      }

      while(// counter condition //){ 
           
           // update d here if finding minimum

          //increase begin to make it invalid/valid again
          
          if(map[s[begin++]]++ ?){ //modify counter here 
          }
      }  

      //update d here if finding maximum
  }
  return d;
}

#The code of solving Longest Substring with At Most Two Distinct Characters is below:
int lengthOfLongestSubstringTwoDistinct(string s) {
        vector<int> map(128, 0);
        int counter=0, begin=0, end=0, d=0; 
        while(end<s.size()){
            if(map[s[end++]]++==0) counter++;
            while(counter>2) if(map[s[begin++]]--==1) counter--;
            d=max(d, end-begin);
        }
        return d;
    }
    
#The code of solving Longest Substring Without Repeating Characters is below:
int lengthOfLongestSubstring(string s) {
        vector<int> map(128,0);
        int counter=0, begin=0, end=0, d=0; 
        while(end<s.size()){
            if(map[s[end++]]++>0) counter++; 
            while(counter>0) if(map[s[begin++]]-->1) counter--;
            d=max(d, end-begin); //while valid, update d
        }
        return d;
    }
*/